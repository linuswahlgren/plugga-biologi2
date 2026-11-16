/**
 * OrderExercise: put 3–7 steps of a process in the right order (BUILD.md §4.7).
 * Drag a step by its handle (mouse, pen or touch) or use the up and down buttons; everything works
 * by keyboard. Moves are announced ("Flyttat till plats 3 av 6."). "Rätta" marks each step
 * "Rätt plats" or "Fel plats" and shows the right order and the explanation.
 */
import { h, replace } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";
import type { App } from "../app.ts";
import { plainText } from "../markup.ts";
import { shuffle } from "../session.ts";

export function orderExercise(app: App, item: { id: string; steps: string[]; explain?: string }, onResult: (correct: boolean) => void): HTMLElement {
  const n = item.steps.length;
  const range = item.steps.map((_, i) => i);
  let order = shuffle(range);
  for (let tries = 0; n > 1 && order.every((v, i) => v === i) && tries < 10; tries++) order = shuffle(range);
  if (n > 1 && order.every((v, i) => v === i)) order = [...range.slice(1), 0];

  const live = h("p", { class: "sk-visually-hidden", role: "status", "aria-live": "polite" });
  const feedback = h("div", { class: "sk-feedback", role: "status", "aria-live": "polite" });
  const list = h("ol", { class: "sk-order", "data-order": item.id });

  type Row = { li: HTMLLIElement; up: HTMLButtonElement; down: HTMLButtonElement; pos: HTMLElement; state: HTMLElement };
  const rows = new Map<number, Row>();

  const clearMarks = () => {
    for (const r of rows.values()) {
      r.li.classList.remove("sk-order__item--right", "sk-order__item--wrong");
      replace(r.state);
    }
    feedback.className = "sk-feedback";
    replace(feedback);
  };

  const paint = () => {
    order.forEach((step, i) => {
      const r = rows.get(step)!;
      list.appendChild(r.li);
      r.pos.textContent = String(i + 1);
      r.up.disabled = i === 0;
      r.down.disabled = i === n - 1;
    });
  };

  const syncFromDom = () => {
    order = [...list.children].map((li) => Number((li as HTMLElement).dataset.step));
  };

  const moveStep = (step: number, delta: number, focusBtn: "up" | "down") => {
    const i = order.indexOf(step);
    const j = i + delta;
    if (j < 0 || j >= n) return;
    [order[i], order[j]] = [order[j], order[i]];
    clearMarks();
    paint();
    live.textContent = sv.practice.moved(j + 1, n);
    const r = rows.get(step)!;
    const target = focusBtn === "up" ? (r.up.disabled ? r.down : r.up) : r.down.disabled ? r.up : r.down;
    target.focus();
  };

  item.steps.forEach((step, idx) => {
    const name = plainText(step);
    const handle = h("span", { class: "sk-order__handle", "aria-hidden": "true" }, icon("grip", 18));
    const up = h("button", { class: "sk-iconbtn sk-iconbtn--sm", type: "button", "aria-label": sv.practice.moveUp(name), title: sv.practice.moveUp(name) }, icon("up", 18));
    const down = h("button", { class: "sk-iconbtn sk-iconbtn--sm", type: "button", "aria-label": sv.practice.moveDown(name), title: sv.practice.moveDown(name) }, icon("down", 18));
    const pos = h("span", { class: "sk-order__pos sk-num", "aria-hidden": "true" });
    const state = h("span", { class: "sk-order__state" });
    const li = h(
      "li",
      { class: "sk-order__item", "data-step": idx },
      handle,
      pos,
      h("span", { class: "sk-order__text" }, app.mdInline(step)),
      state,
      h("span", { class: "sk-order__btns" }, up, down),
    );
    up.addEventListener("click", () => moveStep(idx, -1, "up"));
    down.addEventListener("click", () => moveStep(idx, 1, "down"));

    // Pointer drag by the handle: the row follows the pointer and the list reorders live.
    handle.addEventListener("pointerdown", (e: PointerEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      handle.setPointerCapture(e.pointerId);
      li.classList.add("sk-order__item--drag");
      clearMarks();
      const onMove = (ev: PointerEvent) => {
        const others = [...list.children].filter((x) => x !== li) as HTMLElement[];
        let target = 0;
        for (const other of others) {
          const r = other.getBoundingClientRect();
          if (ev.clientY > r.top + r.height / 2) target++;
        }
        const ref = others[target] ?? null;
        if (li.nextElementSibling !== ref) {
          list.insertBefore(li, ref);
          syncFromDom();
          paint();
        }
      };
      const onUp = () => {
        li.classList.remove("sk-order__item--drag");
        handle.removeEventListener("pointermove", onMove);
        handle.removeEventListener("pointerup", onUp);
        handle.removeEventListener("pointercancel", onUp);
        live.textContent = sv.practice.moved(order.indexOf(idx) + 1, n);
      };
      handle.addEventListener("pointermove", onMove);
      handle.addEventListener("pointerup", onUp);
      handle.addEventListener("pointercancel", onUp);
    });

    rows.set(idx, { li, up, down, pos, state });
  });
  paint();

  const checkBtn = h("button", { class: "sk-btn sk-btn--primary", type: "button", "data-check": "" }, sv.practice.check);
  checkBtn.addEventListener("click", () => {
    const correct = order.every((v, i) => v === i);
    order.forEach((step, i) => {
      const r = rows.get(step)!;
      const ok = step === i;
      r.li.classList.toggle("sk-order__item--right", ok);
      r.li.classList.toggle("sk-order__item--wrong", !ok);
      replace(r.state, icon(ok ? "check" : "x", 16), ok ? sv.practice.rightPlace : sv.practice.wrongPlace);
    });
    feedback.className = `sk-feedback ${correct ? "sk-feedback--right" : "sk-feedback--wrong"}`;
    replace(
      feedback,
      h("p", { class: "sk-feedback__verdict" }, icon(correct ? "check" : "x", 18), correct ? sv.quiz.right : sv.quiz.wrong),
      correct
        ? null
        : h("div", { class: "sk-stack sk-stack--2" },
            h("p", { class: "sk-eyebrow" }, sv.practice.correctOrder),
            h("ol", { class: "sk-list" }, item.steps.map((s) => h("li", null, app.mdInline(s)))),
          ),
      item.explain ? app.md(item.explain) : null,
    );
    onResult(correct);
  });

  return h(
    "div",
    { class: "sk-stack" },
    h("p", { class: "sk-small sk-muted" }, sv.practice.orderIntro),
    list,
    live,
    h("div", { class: "sk-btnrow" }, checkBtn),
    feedback,
  );
}
