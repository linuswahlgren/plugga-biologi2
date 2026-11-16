/**
 * LabelDiagram: name the numbered parts of a diagram by choosing a term for each number
 * (BUILD.md §4.7). The diagram is an original inline SVG from src/diagrams; only the numbers the
 * item uses are drawn. Choices are the item's terms plus its distractors, sorted alphabetically.
 */
import { h, replace } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";
import type { App } from "../app.ts";
import { plainText } from "../markup.ts";
import { renderDiagram } from "../diagrams/index.ts";

export function labelExercise(
  app: App,
  item: { id: string; diagram: string; markers: { n: number; answer: string }[]; distractors?: string[]; explain?: string },
  onResult: (correct: boolean) => void,
): HTMLElement {
  const markers = item.markers.slice().sort((a, b) => a.n - b.n);
  const terms = [...new Set([...markers.map((m) => m.answer), ...(item.distractors ?? [])])].sort((a, b) => a.localeCompare(b, "sv"));
  const svg = renderDiagram(item.diagram, markers.map((m) => m.n), sv.practice.diagramAlt(markers.length));
  const feedback = h("div", { class: "sk-feedback", role: "status", "aria-live": "polite" });

  const rows = markers.map((m) => {
    const id = `lbl-${item.id}-${m.n}`;
    const select = h(
      "select",
      { class: "sk-select", id, "data-marker": m.n },
      h("option", { value: "" }, sv.practice.choose),
      terms.map((t) => h("option", { value: t }, plainText(t))),
    );
    const state = h("span", { class: "sk-labelrow__state" });
    const row = h(
      "li",
      { class: "sk-labelrow" },
      h("label", { class: "sk-labelrow__num", for: id },
        h("span", { class: "sk-badge sk-num", "aria-hidden": "true" }, String(m.n)),
        h("span", { class: "sk-visually-hidden" }, sv.practice.marker(m.n)),
      ),
      select,
      state,
    );
    select.addEventListener("change", () => {
      row.classList.remove("sk-labelrow--right", "sk-labelrow--wrong");
      replace(state);
    });
    return { m, select, state, row };
  });

  const checkBtn = h("button", { class: "sk-btn sk-btn--primary", type: "button", "data-check": "" }, sv.practice.check);
  checkBtn.addEventListener("click", () => {
    let wrong = 0;
    for (const r of rows) {
      const ok = r.select.value === r.m.answer;
      if (!ok) wrong++;
      r.row.classList.toggle("sk-labelrow--right", ok);
      r.row.classList.toggle("sk-labelrow--wrong", !ok);
      replace(
        r.state,
        icon(ok ? "check" : "x", 16),
        ok ? sv.quiz.right : h("span", null, `${sv.quiz.answerIs} `, h("strong", null, plainText(r.m.answer))),
      );
    }
    const correct = wrong === 0;
    feedback.className = `sk-feedback ${correct ? "sk-feedback--right" : "sk-feedback--wrong"}`;
    replace(
      feedback,
      h("p", { class: "sk-feedback__verdict" }, icon(correct ? "check" : "x", 18), correct ? sv.quiz.right : sv.quiz.wrong),
      h("p", null, correct ? sv.practice.allLabelsRight : sv.practice.someLabelsWrong(wrong)),
      item.explain ? app.md(item.explain) : null,
    );
    onResult(correct);
  });

  return h(
    "div",
    { class: "sk-stack" },
    h("p", { class: "sk-small sk-muted" }, sv.practice.labelIntro),
    h("div", { class: "sk-labelex" },
      svg ? h("figure", { class: "sk-labelex__figure" }, svg) : null,
      h("ol", { class: "sk-plainlist sk-labelrows" }, rows.map((r) => r.row)),
    ),
    h("div", { class: "sk-btnrow" }, checkBtn),
    feedback,
  );
}
