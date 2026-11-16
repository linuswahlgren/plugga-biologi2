/**
 * Quiz session (BUILD.md §4.6).
 * Öva: after each answer "Rätt" or "Inte riktigt", the right option marked with an icon and a word,
 *   "Rätt svar är …", the explanation and "Läs mer: <lesson>" (the session is kept, so the student
 *   can come back). Keys A–D answer, Enter goes on.
 * Provläge: no feedback until "Lämna in". A question navigator, "Markera för att titta igen", ← →
 *   between questions and an optional timer that hands in automatically when time runs out.
 */
import { h, replace } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";
import type { App } from "../app.ts";
import { navigate, to } from "../router.ts";
import { pad2 } from "../format.ts";
import {
  applyMissed,
  countsForPart,
  newQuizRun,
  recordAttempt,
  scoreQuiz,
  shuffle,
  type QuizRun,
} from "../session.ts";
import { sessionHeader } from "../components/SessionHeader.ts";
import { resultSummary } from "../components/ResultSummary.ts";
import { levelTag, supplementTag } from "../components/Tag.ts";
import { endRun, launch, saveRun, type Host } from "./host.ts";

const KEYS = ["A", "B", "C", "D", "E", "F"];

function isTyping(t: EventTarget | null): boolean {
  const el = t as HTMLElement | null;
  return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable);
}
function isControl(t: EventTarget | null): boolean {
  const el = t as HTMLElement | null;
  return !!el && (el.tagName === "BUTTON" || el.tagName === "A" || el.tagName === "SUMMARY");
}

export function quizRunner(app: App, host: Host, run: QuizRun): { el: HTMLElement; dispose(): void } {
  const c = app.course;
  const exam = run.lage === "prov";
  const modeLabel = exam ? sv.session.modeExam : sv.session.modeQuiz;
  const total = run.items.length;
  let finished = false;
  let timer: ReturnType<typeof setInterval> | null = null;
  let options: string[] = [];

  const header = sessionHeader({ title: `${modeLabel} · ${run.label}`, counter: "", onExit: () => void exit() });
  const stage = h("div", { class: "sk-stack sk-stack--4" });
  const root = h("div", { class: "sk-page sk-session", "data-session": "quiz", "data-lage": run.lage }, header.el, stage);

  const answeredCount = () => run.items.filter((it) => run.answers[it.id] !== undefined).length;
  const save = () => saveRun(app, host.path, run);

  // ---------- Question ----------
  function questionCard(focusHeading: boolean): void {
    const it = run.items[run.index];
    const q = c.quizById.get(it.id)!;
    const part = c.partById.get(q.partId);
    const hit = q.lesson ? c.lessonById.get(q.lesson) : undefined;
    options = it.options;
    header.setCounter(sv.session.questionOf(run.index + 1, total));
    header.setProgress(answeredCount() / total);

    const qId = `quiz-q-${it.id}`;
    const heading = h("h2", { class: "sk-question", id: qId, tabindex: "-1" }, app.mdInline(q.q));
    const feedback = h("div", { class: "sk-feedback", role: "status", "aria-live": "polite" });
    const buttons = it.options.map((opt, i) => {
      const b = h(
        "button",
        { class: "sk-option", type: "button", "data-value": opt, "data-key": KEYS[i] },
        h("span", { class: "sk-option__key", "aria-hidden": "true" }, KEYS[i]),
        h("span", { class: "sk-option__text" }, app.mdInline(opt)),
        h("span", { class: "sk-option__state" }),
      );
      b.addEventListener("click", () => choose(opt));
      return b;
    });

    const paintPractice = () => {
      const chosen = run.answers[it.id];
      if (chosen === undefined) return;
      const right = chosen === q.answer;
      for (const b of buttons) {
        const v = b.dataset.value!;
        b.disabled = true;
        const state = b.querySelector(".sk-option__state")!;
        if (v === q.answer) {
          b.classList.add("sk-option--correct");
          replace(state, icon("check", 16), v === chosen ? sv.quiz.yourAnswer : sv.quiz.correctAnswer);
        } else if (v === chosen) {
          b.classList.add("sk-option--wrong");
          replace(state, icon("x", 16), sv.quiz.yourAnswer);
        }
      }
      feedback.className = `sk-feedback ${right ? "sk-feedback--right" : "sk-feedback--wrong"}`;
      replace(
        feedback,
        h("p", { class: "sk-feedback__verdict" }, icon(right ? "check" : "x", 18), right ? sv.quiz.right : sv.quiz.wrong),
        right ? null : h("p", null, `${sv.quiz.answerIs} `, app.mdInline(q.answer)),
        app.md(q.explain),
        hit ? h("p", null, h("a", { href: to.lesson(hit.part.id, hit.lesson.id, true) }, sv.quiz.readMore(hit.lesson.title))) : null,
      );
      nextBtn.hidden = false;
    };

    const paintExam = () => {
      const chosen = run.answers[it.id];
      for (const b of buttons) {
        const on = b.dataset.value === chosen;
        b.classList.toggle("sk-option--selected", on);
        b.setAttribute("aria-pressed", String(on));
        replace(b.querySelector(".sk-option__state")!, on ? sv.quiz.yourAnswer : "");
      }
      const flagged = run.flagged.includes(it.id);
      flagBtn.setAttribute("aria-pressed", String(flagged));
      flagBtn.classList.toggle("sk-btn--on", flagged);
      paintNavigator();
      header.setProgress(answeredCount() / total);
    };

    const choose = (opt: string) => {
      if (finished) return;
      if (!exam) {
        if (run.answers[it.id] !== undefined) return;
        run.answers[it.id] = opt;
        app.store.update((p) => applyMissed(p, it.id, opt === q.answer));
        save();
        paintPractice();
        header.setProgress(answeredCount() / total);
        nextBtn.focus();
      } else {
        run.answers[it.id] = opt;
        save();
        paintExam();
      }
    };
    current.choose = choose;

    const last = run.index === total - 1;
    const nextBtn = h(
      "button",
      { class: "sk-btn sk-btn--primary", type: "button", hidden: true, "data-next": "" },
      last ? sv.quiz.results : sv.quiz.next,
      icon("right", 18),
    );
    nextBtn.addEventListener("click", () => goNext());

    const flagBtn = h("button", { class: "sk-btn sk-btn--sm sk-btn--toggle", type: "button", "aria-pressed": "false", "data-flag": "" }, icon("flag", 16), sv.quiz.flag);
    flagBtn.addEventListener("click", () => {
      const i = run.flagged.indexOf(it.id);
      if (i >= 0) run.flagged.splice(i, 1);
      else run.flagged.push(it.id);
      save();
      paintExam();
    });

    const card = h(
      "section",
      { class: "sk-card sk-card--raised sk-stack sk-stack--4 sk-quizcard", "aria-labelledby": qId, "data-quiz": it.id },
      h("div", { class: "sk-tagrow" },
        part ? h("span", { class: "sk-eyebrow" }, `${sv.nav.part(part.n)} · ${part.title}`) : null,
        q.level ? levelTag(q.level) : null,
        q.supplement ? supplementTag() : null,
      ),
      heading,
      h("div", { class: "sk-options", role: "group", "aria-labelledby": qId }, buttons),
      exam ? h("div", { class: "sk-btnrow" }, flagBtn) : feedback,
      exam ? null : h("div", { class: "sk-btnrow" }, nextBtn),
    );

    if (exam) {
      const prev = h("button", { class: "sk-btn", type: "button", disabled: run.index === 0 }, icon("left", 18), sv.quiz.previous);
      prev.addEventListener("click", () => move(-1, true));
      const next = h("button", { class: "sk-btn", type: "button", disabled: last }, sv.quiz.next, icon("right", 18));
      next.addEventListener("click", () => move(1, true));
      replace(stage, card, h("div", { class: "sk-btnrow sk-btnrow--split" }, prev, next), navigatorEl, h("div", { class: "sk-btnrow" }, handInBtn));
      paintExam();
    } else {
      replace(stage, card);
      paintPractice();
    }
    if (focusHeading) heading.focus({ preventScroll: true });
  }

  const current: { choose: (opt: string) => void } = { choose: () => {} };

  // ---------- Provläge: navigator, hand-in ----------
  const navList = h("ol", { class: "sk-qnav" });
  const answeredLine = h("p", { class: "sk-small sk-muted sk-num" });
  const navigatorEl = h("nav", { class: "sk-stack sk-stack--2", "aria-label": sv.quiz.navigator }, navList, answeredLine);
  const handInBtn = h("button", { class: "sk-btn sk-btn--primary", type: "button", "data-handin": "" }, icon("check", 18), sv.quiz.handIn);
  handInBtn.addEventListener("click", () => void handIn());

  function paintNavigator(): void {
    replace(
      navList,
      run.items.map((it, i) => {
        const answered = run.answers[it.id] !== undefined;
        const flagged = run.flagged.includes(it.id);
        const b = h(
          "button",
          {
            class: `sk-qnav__dot${answered ? " sk-qnav__dot--answered" : ""}${flagged ? " sk-qnav__dot--flagged" : ""}`,
            type: "button",
            "aria-label": sv.quiz.navItem(i + 1, answered, flagged),
            "aria-current": i === run.index ? "step" : null,
          },
          String(i + 1),
          flagged ? h("span", { class: "sk-qnav__flag" }, icon("flag", 16)) : null,
        );
        b.addEventListener("click", () => {
          run.index = i;
          save();
          questionCard(false);
          (navList.querySelectorAll("button")[i] as HTMLButtonElement | undefined)?.focus();
        });
        return h("li", null, b);
      }),
    );
    answeredLine.textContent = sv.quiz.answered(answeredCount(), total);
  }

  function move(delta: number, focus: boolean): void {
    const i = run.index + delta;
    if (i < 0 || i >= total) return;
    run.index = i;
    save();
    questionCard(focus);
  }

  function goNext(): void {
    if (finished) return;
    if (exam) {
      if (run.index < total - 1) move(1, true);
      else handInBtn.focus();
      return;
    }
    if (run.answers[run.items[run.index].id] === undefined) return;
    if (run.index >= total - 1) finish(false);
    else move(1, true);
  }

  async function handIn(): Promise<void> {
    if (finished) return;
    const ok = await app.confirm({
      title: sv.quiz.handInTitle,
      text: sv.quiz.handInText(total - answeredCount(), run.flagged.length),
      confirm: sv.quiz.handInConfirm,
      cancel: sv.quiz.handInCancel,
    });
    if (ok) finish(false);
  }

  async function exit(): Promise<void> {
    if (finished) return;
    const ok = await app.confirm({
      title: sv.session.exitTitle,
      text: sv.session.exitQuiz(answeredCount(), total),
      confirm: sv.session.exitConfirm,
      cancel: sv.session.exitCancel,
    });
    if (!ok || finished) return;
    stop();
    endRun(app, host.path);
    navigate(host.path);
  }

  // ---------- Timer ----------
  function tick(): void {
    if (finished || run.deadline === null) return;
    const left = run.deadline - Date.now();
    if (left <= 0) {
      header.setTimer(sv.quiz.timeLeft("0:00"), true);
      finish(true);
      return;
    }
    const secs = Math.ceil(left / 1000);
    header.setTimer(sv.quiz.timeLeft(`${Math.floor(secs / 60)}:${pad2(secs % 60)}`), secs <= 60);
  }

  // ---------- Finish and results ----------
  function stop(): void {
    finished = true;
    if (timer) clearInterval(timer);
    timer = null;
    document.removeEventListener("keydown", onKey);
  }

  function finish(timeUp: boolean): void {
    if (finished) return;
    stop();
    const score = scoreQuiz(c, run);
    app.store.update((p) => {
      if (exam) for (const it of run.items) applyMissed(p, it.id, run.answers[it.id] === c.quizById.get(it.id)?.answer);
      recordAttempt(p, c, run, score, new Date().toISOString());
    });
    endRun(app, host.path);
    const notCounted = run.scope !== "missar" && !score.perPart.some((pp) => countsForPart(c, pp.partId, pp.total));

    const wrongIds = score.wrong.map((w) => w.id);
    const again = wrongIds.length
      ? h("button", { class: "sk-btn sk-btn--primary", type: "button", "data-again": "" }, icon("reset", 18), sv.results.practiseMistakes)
      : null;
    again?.addEventListener("click", () => {
      const items = shuffle(wrongIds).map((id) => ({ id, options: shuffle(c.quizById.get(id)!.options) }));
      launch(app, host.path, newQuizRun(items, { lage: "ova", scope: "missar", label: sv.session.mistakes, minutes: 0, now: Date.now() }));
    });
    const newBtn = h("button", { class: wrongIds.length ? "sk-btn" : "sk-btn sk-btn--primary", type: "button" }, sv.results.newSession);
    newBtn.addEventListener("click", () => navigate(host.path));
    const back = h("a", { class: "sk-btn sk-btn--quiet", href: host.backHref }, icon("left", 18), sv.results.back);

    replace(
      root,
      resultSummary(app, {
        eyebrow: sv.results.eyebrow(modeLabel, run.label),
        score,
        timeUp,
        notCounted,
        actions: [again, newBtn, back],
      }),
    );
    root.dataset.done = "true";
    document.title = sv.pageTitle([sv.results.title, modeLabel, ...host.titleTail]);
    window.scrollTo(0, 0);
    root.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
  }

  // ---------- Keyboard ----------
  function onKey(e: KeyboardEvent): void {
    if (finished || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    if (document.querySelector("dialog[open]") || isTyping(e.target)) return;
    const k = e.key.length === 1 ? e.key.toUpperCase() : "";
    const idx = k ? KEYS.indexOf(k) : -1;
    if (idx >= 0 && idx < options.length && idx < 4) {
      e.preventDefault();
      current.choose(options[idx]);
      return;
    }
    if (e.key === "Enter") {
      if (isControl(e.target)) return;
      e.preventDefault();
      goNext();
      return;
    }
    // Buttons and links don't use the arrow keys, so ← → move between questions from anywhere.
    if (exam && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
      e.preventDefault();
      move(e.key === "ArrowLeft" ? -1 : 1, true);
    }
  }

  questionCard(false);
  document.addEventListener("keydown", onKey);
  if (run.deadline !== null) {
    timer = setInterval(tick, 1000);
    setTimeout(tick, 0);
  }

  return { el: root, dispose: stop };
}
