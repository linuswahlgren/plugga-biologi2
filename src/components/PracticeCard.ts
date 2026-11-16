/**
 * PracticeCard: one Öva item (BUILD.md §4.7). Kinds:
 *  text   typed answer, matched with src/answer.ts (case, "en"/"ett", one-letter typos …)
 *  number numeric answer, decimal comma and tolerance
 *  self   write, "Visa exempelsvar", then "Jag hade rätt" / "Inte än"
 *  order  OrderExercise · label  LabelDiagram
 * Every kind can have a "Ledtråd". Feedback is immediate: right or not, the right answer, why,
 * and where to read more. A solved item shows "Löst" and counts toward the part's mastery.
 */
import { h, replace } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";
import type { App } from "../app.ts";
import type { NPractice } from "../course.ts";
import { to } from "../router.ts";
import { matchNumber, matchText } from "../answer.ts";
import { decimal } from "../format.ts";
import { levelTag, supplementTag } from "./Tag.ts";
import { orderExercise } from "./OrderExercise.ts";
import { labelExercise } from "./LabelDiagram.ts";

export function practiceCard(app: App, item: NPractice, index: number, opts: { showPart: boolean; onChange?: () => void }): HTMLElement {
  const c = app.course;
  const part = c.partById.get(item.partId);
  const hit = item.lesson ? c.lessonById.get(item.lesson) : undefined;
  const qId = `px-q-${item.id}`;
  const solvedTag = h("span", { class: "sk-tag sk-tag--accent", "data-solved": "" }, icon("check", 16), sv.practice.solved);

  const paintSolved = () => {
    solvedTag.hidden = !app.store.get().practice[item.id]?.solved;
  };
  /** Auto-checked kinds never un-solve an item; self-graded ones record the latest answer. */
  const record = (solved: boolean, overwrite = false) => {
    app.store.update((p) => {
      const prev = p.practice[item.id];
      if (solved || overwrite || !prev) p.practice[item.id] = { solved: solved || (!overwrite && !!prev?.solved), at: new Date().toISOString() };
    });
    paintSolved();
    opts.onChange?.();
  };

  const feedback = h("div", { class: "sk-feedback", role: "status", "aria-live": "polite" });
  const verdict = (right: boolean, text?: string) =>
    h("p", { class: "sk-feedback__verdict" }, icon(right ? "check" : "x", 18), text ?? (right ? sv.quiz.right : sv.quiz.wrong));
  const show = (right: boolean, ...rest: (Node | null)[]) => {
    feedback.className = `sk-feedback ${right ? "sk-feedback--right" : "sk-feedback--wrong"}`;
    replace(feedback, ...rest);
  };

  let body: HTMLElement;
  if (item.kind === "text" || item.kind === "number") {
    const inputId = `px-in-${item.id}`;
    const input = h("input", {
      class: "sk-input",
      id: inputId,
      type: "text",
      autocomplete: "off",
      autocapitalize: "off",
      spellcheck: "false",
      lang: "sv",
      inputmode: item.kind === "number" ? "decimal" : null,
      placeholder: item.kind === "number" ? sv.practice.numberPlaceholder : sv.practice.answerPlaceholder,
    });
    const unit = item.kind === "number" && item.unit ? h("span", { class: "sk-unit" }, item.unit) : null;
    const form = h(
      "form",
      { class: "sk-answerrow", novalidate: true },
      h("label", { class: "sk-visually-hidden", for: inputId }, sv.practice.yourAnswer),
      h("span", { class: "sk-inputwrap" }, input, unit),
      h("button", { class: "sk-btn sk-btn--primary", type: "submit" }, sv.practice.check),
    );
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!input.value.trim()) {
        show(false, h("p", null, sv.practice.writeFirst));
        input.focus();
        return;
      }
      const solution = item.solution ? app.md(item.solution) : null;
      if (item.kind === "text") {
        const res = matchText(input.value, item.answer);
        const first = Array.isArray(item.answer) ? item.answer[0] : item.answer;
        if (res.correct) show(true, verdict(true, res.typoOf ? sv.answer.typo(res.typoOf) : undefined), solution);
        else show(false, verdict(false), h("p", null, `${sv.quiz.answerIs} `, app.mdInline(first)), solution);
        record(res.correct);
      } else {
        const right = matchNumber(input.value, item.answer, item.tolerance ?? 0);
        const answer = `${decimal(item.answer)}${item.unit ? ` ${item.unit}` : ""}`;
        if (right) show(true, verdict(true), solution);
        else show(false, verdict(false), h("p", null, `${sv.quiz.answerIs} ${answer}`), solution);
        record(right);
      }
    });
    body = h("div", { class: "sk-stack" }, form, feedback);
  } else if (item.kind === "self") {
    const areaId = `px-ta-${item.id}`;
    const modelId = `px-model-${item.id}`;
    const area = h("textarea", { class: "sk-textarea sk-textarea--short", id: areaId, lang: "sv", spellcheck: "true" });
    const model = h(
      "div",
      { class: "sk-stack", id: modelId, hidden: true },
      h("div", { class: "sk-box sk-box--model" }, h("p", { class: "sk-eyebrow" }, sv.practice.modelAnswer), app.md(item.solution)),
      h("p", { class: "sk-label" }, sv.practice.howDidItGo),
    );
    const showBtn = h("button", { class: "sk-btn", type: "button", "aria-expanded": "false", "aria-controls": modelId }, icon("eye", 18), sv.practice.showModel);
    const gotIt = h("button", { class: "sk-btn sk-btn--primary", type: "button" }, icon("check", 18), sv.practice.gotIt);
    const notYet = h("button", { class: "sk-btn", type: "button" }, sv.practice.notYet);
    const grade = h("div", { class: "sk-btnrow", hidden: true }, gotIt, notYet);
    showBtn.addEventListener("click", () => {
      model.hidden = false;
      grade.hidden = false;
      showBtn.hidden = true;
      showBtn.setAttribute("aria-expanded", "true");
      gotIt.focus();
    });
    gotIt.addEventListener("click", () => {
      record(true, true);
      show(true, h("p", null, sv.practice.savedGotIt));
    });
    notYet.addEventListener("click", () => {
      record(false, true);
      show(false, h("p", null, sv.practice.savedNotYet));
    });
    body = h(
      "div",
      { class: "sk-stack" },
      h("label", { class: "sk-label", for: areaId }, sv.practice.yourAnswer),
      area,
      h("p", { class: "sk-small sk-muted" }, sv.practice.notSaved),
      h("div", { class: "sk-btnrow" }, showBtn),
      model,
      grade,
      feedback,
    );
  } else if (item.kind === "order") {
    body = orderExercise(app, item, (ok) => record(ok));
  } else {
    body = labelExercise(app, item, (ok) => record(ok));
  }

  let hint: HTMLElement | null = null;
  if (item.hint) {
    const hintId = `px-hint-${item.id}`;
    const box = h("div", { class: "sk-box sk-box--mistake", id: hintId, hidden: true }, h("p", { class: "sk-eyebrow" }, sv.practice.hint), app.md(item.hint));
    const btn = h("button", { class: "sk-btn sk-btn--sm sk-btn--quiet", type: "button", "aria-expanded": "false", "aria-controls": hintId }, icon("bulb", 16), sv.practice.showHint);
    btn.addEventListener("click", () => {
      const open = box.hidden;
      box.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
    });
    hint = h("div", { class: "sk-stack sk-stack--2" }, h("div", null, btn), box);
  }

  const eyebrow = opts.showPart && part ? `${sv.practice.title(index + 1)} · ${sv.nav.part(part.n)} · ${part.title}` : sv.practice.title(index + 1);
  const el = h(
    "article",
    { class: "sk-card sk-stack sk-stack--4 sk-practice", "aria-labelledby": qId, "data-practice": item.id, "data-kind": item.kind },
    h("div", { class: "sk-tagrow" },
      h("span", { class: "sk-eyebrow" }, eyebrow),
      item.level ? levelTag(item.level) : null,
      item.supplement ? supplementTag() : null,
      solvedTag,
    ),
    h("h2", { class: "sk-heading", id: qId }, app.mdInline(item.q)),
    hint,
    body,
    hit ? h("p", { class: "sk-small" }, h("a", { href: to.lesson(hit.part.id, hit.lesson.id) }, sv.quiz.readMore(hit.lesson.title))) : null,
  );
  paintSolved();
  return el;
}
