/**
 * Card session (BUILD.md §4.5). Click or Space flips; ← → move; 1 = "Behöver öva", 2 = "Jag kan den".
 * Ratings move the card between the Leitner boxes at once. "Behöver öva" brings the card back once
 * later in the same session. Both faces share one grid cell, so flipping never shifts the layout.
 * End screen: "14 av 20 sitter", the cards still to practise, "Öva på de 6 igen", "Tillbaka till delen".
 */
import { h, replace } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";
import type { App } from "../app.ts";
import { navigate, to } from "../router.ts";
import { plainText } from "../markup.ts";
import { rateCard } from "../srs.ts";
import { newCardRun, requeue, shuffle, type CardRun } from "../session.ts";
import { sessionHeader } from "../components/SessionHeader.ts";
import { pageHead } from "../components/PageHead.ts";
import { supplementTag } from "../components/Tag.ts";
import { endRun, launch, saveRun, type Host } from "./host.ts";

function isTyping(t: EventTarget | null): boolean {
  const el = t as HTMLElement | null;
  return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable);
}
function isControl(t: EventTarget | null): boolean {
  const el = t as HTMLElement | null;
  return !!el && (el.tagName === "BUTTON" || el.tagName === "A");
}

export function cardRunner(app: App, host: Host, run: CardRun): { el: HTMLElement; dispose(): void } {
  const c = app.course;
  let finished = false;
  let flipped = false;
  let flipTo: (on: boolean) => void = () => {};

  const header = sessionHeader({ title: `${sv.session.modeCards} · ${run.label}`, counter: "", onExit: () => void exit() });
  const stage = h("div", { class: "sk-stack sk-stack--4" });
  const announce = h("p", { class: "sk-visually-hidden", role: "status", "aria-live": "polite" });
  const root = h("div", { class: "sk-page sk-session", "data-session": "kort" }, header.el, stage, announce);

  const unique = () => [...new Set(run.queue)];
  const save = () => saveRun(app, host.path, run);

  function render(focus: boolean): void {
    const id = run.queue[run.index];
    const card = c.studyCardById.get(id)!;
    const part = c.partById.get(card.partId);
    const hit = card.lesson ? c.lessonById.get(card.lesson) : undefined;
    const frontText = run.reversed ? card.back : card.front;
    const backText = run.reversed ? card.front : card.back;
    flipped = false;
    header.setCounter(sv.session.cardOf(run.index + 1, run.queue.length));
    header.setProgress(Object.keys(run.ratings).length / unique().length);

    const readMore = hit ? h("a", { href: to.lesson(hit.part.id, hit.lesson.id, true), tabindex: "-1" }, sv.cards.readMore(hit.lesson.title)) : null;
    const front = h(
      "div",
      { class: "sk-flashcard__face sk-flashcard__face--front" },
      h("p", { class: "sk-eyebrow" }, part ? `${sv.nav.part(part.n)} · ${part.title}` : sv.cards.front),
      h("p", { class: run.reversed ? "sk-cardback" : "sk-card-front" }, app.mdInline(frontText)),
      card.supplement ? h("div", { class: "sk-tagrow" }, supplementTag()) : null,
    );
    const back = h(
      "div",
      { class: "sk-flashcard__face sk-flashcard__face--back", "aria-hidden": "true" },
      h("p", { class: "sk-eyebrow" }, sv.cards.back),
      h("div", { class: run.reversed ? "sk-card-front" : "sk-cardback" }, run.reversed ? app.mdInline(backText) : app.md(backText)),
      readMore,
    );
    const cardEl = h(
      "section",
      { class: "sk-card sk-card--raised sk-flashcard", "data-card": id, "data-flipped": "false" },
      h("div", { class: "sk-flashcard__inner" }, front, back),
    );
    cardEl.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).closest("a")) return;
      flipTo(!flipped);
    });

    const flipBtn = h("button", { class: "sk-btn sk-btn--primary", type: "button", "data-flip": "" }, icon("flip", 18), sv.cards.flip);
    flipBtn.addEventListener("click", () => flipTo(!flipped));
    const needBtn = h("button", { class: "sk-btn", type: "button", "data-rate": "1" }, h("kbd", { class: "sk-kbd", "aria-hidden": "true" }, "1"), sv.cards.needsPractice);
    needBtn.addEventListener("click", () => rate(false));
    const knowBtn = h("button", { class: "sk-btn sk-btn--primary", type: "button", "data-rate": "2" }, h("kbd", { class: "sk-kbd sk-kbd--on-accent", "aria-hidden": "true" }, "2"), sv.cards.know);
    knowBtn.addEventListener("click", () => rate(true));
    const rateRow = h("div", { class: "sk-btnrow sk-rate", hidden: true }, needBtn, knowBtn);
    const hint = h("p", { class: "sk-small sk-muted" }, sv.cards.hint);

    const prev = h("button", { class: "sk-iconbtn sk-iconbtn--outline", type: "button", "aria-label": sv.cards.previous, title: sv.cards.previous, disabled: run.index === 0 }, icon("left"));
    prev.addEventListener("click", () => move(-1));
    const next = h("button", { class: "sk-iconbtn sk-iconbtn--outline", type: "button", "aria-label": sv.cards.next, title: sv.cards.next }, icon("right"));
    next.addEventListener("click", () => move(1));

    flipTo = (on: boolean) => {
      flipped = on;
      cardEl.dataset.flipped = String(on);
      front.setAttribute("aria-hidden", String(on));
      back.setAttribute("aria-hidden", String(!on));
      readMore?.setAttribute("tabindex", on ? "0" : "-1");
      rateRow.hidden = !on;
      flipBtn.hidden = on;
      hint.hidden = on;
      announce.textContent = plainText(on ? backText : frontText);
      if (on) knowBtn.focus({ preventScroll: true });
      else flipBtn.focus({ preventScroll: true });
    };

    replace(
      stage,
      cardEl,
      h("div", { class: "sk-cardnav" }, prev, h("div", { class: "sk-btnrow sk-cardnav__main" }, flipBtn, rateRow), next),
      hint,
    );
    if (focus) flipBtn.focus({ preventScroll: true });
  }

  function rate(known: boolean): void {
    if (finished || !flipped) return;
    const id = run.queue[run.index];
    app.store.update((p) => {
      p.cards[id] = rateCard(p.cards[id], known, app.today());
    });
    run.ratings[id] = known ? "kan" : "ova";
    if (!known) requeue(run, id);
    move(1);
  }

  function move(delta: number): void {
    if (finished) return;
    const i = run.index + delta;
    if (i < 0) return;
    if (i >= run.queue.length) {
      finish();
      return;
    }
    run.index = i;
    save();
    render(true);
  }

  async function exit(): Promise<void> {
    if (finished) return;
    const ok = await app.confirm({ title: sv.session.exitTitle, text: sv.session.exitCards, confirm: sv.session.exitConfirm, cancel: sv.session.exitCancel });
    if (!ok || finished) return;
    stop();
    endRun(app, host.path);
    navigate(host.path);
  }

  function stop(): void {
    finished = true;
    document.removeEventListener("keydown", onKey);
  }

  function finish(): void {
    stop();
    endRun(app, host.path);
    const ids = unique();
    const known = ids.filter((id) => run.ratings[id] === "kan");
    const rest = ids.filter((id) => run.ratings[id] !== "kan");
    const again = rest.length ? h("button", { class: "sk-btn sk-btn--primary", type: "button", "data-again": "" }, icon("reset", 18), sv.cards.again(rest.length)) : null;
    again?.addEventListener("click", () => launch(app, host.path, newCardRun(shuffle(rest), { scope: run.scope, label: run.label, reversed: run.reversed })));
    const back = h("a", { class: rest.length ? "sk-btn" : "sk-btn sk-btn--primary", href: host.backHref }, icon("left", 18), host.backLabel);

    replace(
      root,
      h(
        "div",
        { class: "sk-page sk-results", "data-results": "" },
        pageHead({
          eyebrow: `${sv.session.modeCards} · ${run.label}`,
          title: sv.cards.doneTitle(known.length, ids.length),
          lead: rest.length ? sv.cards.doneSome : sv.cards.doneAll,
        }),
        h("div", { class: "sk-btnrow" }, again, back),
        rest.length
          ? h("section", { class: "sk-stack", "aria-labelledby": "cards-rest" },
              h("h2", { class: "sk-heading", id: "cards-rest" }, sv.cards.toPractise),
              h("ul", { class: "sk-plainlist sk-stack sk-stack--2" },
                rest.map((id) => {
                  const card = c.studyCardById.get(id)!;
                  return h("li", { class: "sk-card sk-restcard" }, h("strong", null, app.mdInline(card.front)), h("span", { class: "sk-small sk-muted" }, app.mdInline(card.back)));
                }),
              ),
            )
          : null,
      ),
    );
    root.dataset.done = "true";
    document.title = sv.pageTitle([sv.results.title, sv.session.modeCards, ...host.titleTail]);
    window.scrollTo(0, 0);
    root.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
  }

  function onKey(e: KeyboardEvent): void {
    if (finished || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    if (document.querySelector("dialog[open]") || isTyping(e.target)) return;
    if (e.key === " " || e.key === "Enter") {
      if (isControl(e.target)) return;
      e.preventDefault();
      if (e.key === " " || !flipped) flipTo(!flipped);
      return;
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      move(e.key === "ArrowLeft" ? -1 : 1);
      return;
    }
    if (e.key === "1" || e.key === "2") {
      e.preventDefault();
      rate(e.key === "2");
    }
  }

  render(false);
  document.addEventListener("keydown", onKey);
  return { el: root, dispose: stop };
}
