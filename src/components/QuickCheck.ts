/**
 * Snabbkoll: one inline multiple-choice question at the end of a lesson. Doesn't count toward
 * the quiz score. Feedback is immediate, kind and specific: "Rätt"/"Inte riktigt", the right
 * answer marked with an icon and a word, then the explanation.
 */
import { h, replace } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";
import type { App } from "../app.ts";
import type { QuizItem } from "../types.ts";
import { plainText } from "../markup.ts";

const KEYS = ["A", "B", "C", "D", "E", "F"];

export function quickCheck(app: App, item: QuizItem): HTMLElement {
  const qId = `qc-${item.id}`;
  const feedback = h("div", { class: "sk-feedback", role: "status", "aria-live": "polite" });
  const buttons: HTMLButtonElement[] = [];

  const reset = () => {
    for (const b of buttons) {
      b.disabled = false;
      b.classList.remove("sk-option--correct", "sk-option--wrong");
      replace(b.querySelector(".sk-option__state")!);
      b.removeAttribute("aria-describedby");
    }
    replace(feedback);
    feedback.className = "sk-feedback";
    buttons[0]?.focus();
  };

  const choose = (chosen: string) => {
    const right = chosen === item.answer;
    for (const b of buttons) {
      const value = b.dataset.value!;
      b.disabled = true;
      const state = b.querySelector(".sk-option__state")!;
      if (value === item.answer) {
        b.classList.add("sk-option--correct");
        replace(state, icon("check", 16), value === chosen ? sv.check.yourAnswer : sv.check.correctAnswer);
      } else if (value === chosen) {
        b.classList.add("sk-option--wrong");
        replace(state, icon("x", 16), sv.check.yourAnswer);
      }
    }
    feedback.className = `sk-feedback ${right ? "sk-feedback--right" : "sk-feedback--wrong"}`;
    replace(
      feedback,
      h("p", { class: "sk-feedback__verdict" }, icon(right ? "check" : "x", 18), right ? sv.check.right : sv.check.wrong),
      right ? null : h("p", null, sv.check.answerIs(""), app.mdInline(item.answer)),
      app.md(item.explain),
      right ? null : h("div", null, h("button", { class: "sk-btn sk-btn--sm", type: "button", onclick: reset }, icon("reset", 16), sv.check.tryAgain)),
    );
    app.store.update(() => {});
  };

  item.options.forEach((opt, i) => {
    const b = h(
      "button",
      { class: "sk-option", type: "button", "data-value": opt, "data-key": KEYS[i], title: plainText(opt) },
      h("span", { class: "sk-option__key", "aria-hidden": "true" }, KEYS[i]),
      h("span", { class: "sk-option__text" }, app.mdInline(opt)),
      h("span", { class: "sk-option__state" }),
    );
    b.addEventListener("click", () => choose(opt));
    buttons.push(b);
  });

  return h(
    "section",
    { class: "sk-check", "aria-labelledby": qId },
    h("div", { class: "sk-stack sk-stack--2" },
      h("p", { class: "sk-eyebrow" }, sv.check.title),
      h("p", { class: "sk-heading", id: qId }, app.mdInline(item.q)),
      h("p", { class: "sk-small sk-muted" }, sv.check.hint),
    ),
    h("div", { class: "sk-options", role: "group", "aria-labelledby": qId }, buttons),
    feedback,
  );
}
