/**
 * LessonCard: collapsible lesson with minutes, "Markera som klar" and "Nästa lektion".
 * Ends with a Snabbkoll and a source line. Collapsible header uses aria-expanded.
 */
import { h, replace } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";
import type { App } from "../app.ts";
import type { NPart } from "../course.ts";
import type { Lesson } from "../types.ts";
import { quickCheck } from "./QuickCheck.ts";
import { supplementTag } from "./Tag.ts";
import { todayISO } from "../format.ts";

export interface LessonCard {
  el: HTMLElement;
  lesson: Lesson;
  setExpanded(open: boolean): void;
  isExpanded(): boolean;
  focusHead(): void;
}

export function lessonCard(
  app: App,
  _part: NPart,
  lesson: Lesson,
  index: number,
  opts: { expanded: boolean; hasNext: boolean; onNext: () => void; onDoneChange: () => void },
): LessonCard {
  const bodyId = `lesson-body-${lesson.id}`;
  const headId = `lesson-head-${lesson.id}`;
  const isDone = () => !!app.store.get().lessons[lesson.id];

  const circle = h("span", { class: "sk-numcircle", "aria-hidden": "true" });
  const doneText = h("span", { class: "sk-visually-hidden" });
  const meta = h("span", { class: "sk-small sk-muted" });
  const head = h(
    "button",
    { class: "sk-lesson__head", type: "button", id: headId, "aria-expanded": "false", "aria-controls": bodyId },
    circle,
    h("span", { class: "sk-lesson__titlewrap" },
      h("span", { class: "sk-lesson-title" }, lesson.title, doneText),
      meta,
    ),
    h("span", { class: "sk-lesson__chev", "aria-hidden": "true" }, icon("chevron", 18)),
  );

  const doneBtn = h("button", { class: "sk-btn", type: "button" });
  const nextBtn = opts.hasNext
    ? h("button", { class: "sk-btn sk-btn--quiet", type: "button", onclick: opts.onNext }, sv.part.nextLesson, icon("right", 18))
    : null;

  const body = h(
    "div",
    { class: "sk-lesson__body", id: bodyId, role: "region", "aria-labelledby": headId, hidden: true },
    lesson.supplement ? h("div", { class: "sk-tagrow" }, supplementTag()) : null,
    app.md(lesson.body),
    lesson.check ? quickCheck(app, lesson.check) : null,
    lesson.source ? h("p", { class: "sk-source" }, sv.part.source(lesson.source)) : null,
    h("div", { class: "sk-btnrow" }, doneBtn, nextBtn),
  );

  const paint = () => {
    const done = isDone();
    circle.classList.toggle("sk-numcircle--done", done);
    replace(circle, done ? icon("check", 16) : String(index + 1));
    doneText.textContent = done ? ` (${sv.part.lessonDone})` : "";
    replace(meta, sv.part.minutes(lesson.minutes), done ? ` · ${sv.part.lessonDone}` : "");
    replace(doneBtn, done ? icon("reset", 18) : icon("check", 18), done ? sv.part.markNotDone : sv.part.markDone);
    doneBtn.classList.toggle("sk-btn--primary", !done);
  };

  doneBtn.addEventListener("click", () => {
    const done = isDone();
    app.store.update((p) => {
      if (done) delete p.lessons[lesson.id];
      else p.lessons[lesson.id] = todayISO();
    });
    paint();
    opts.onDoneChange();
  });

  let expanded = false;
  const setExpanded = (open: boolean) => {
    expanded = open;
    head.setAttribute("aria-expanded", String(open));
    body.hidden = !open;
  };
  head.addEventListener("click", () => setExpanded(!expanded));

  paint();
  setExpanded(opts.expanded);

  const el = h("article", { class: "sk-card sk-lesson", "data-lesson": lesson.id }, h("h2", { class: "sk-lesson-heading" }, head), body);
  return { el, lesson, setExpanded, isExpanded: () => expanded, focusHead: () => head.focus() };
}
