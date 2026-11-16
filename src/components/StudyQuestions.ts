/**
 * StudyQuestion list (Instuderingsfrågor, BUILD.md §4.8): each question collapsible, with a place to
 * write, "Visa exempelsvar", "Svaret finns i: …" links and self-grading ("Jag kan den" / "Inte än").
 * Progress at the top: "9 av 17 kan jag".
 */
import { h, replace } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";
import type { App } from "../app.ts";
import type { Exam, StudyQuestion } from "../types.ts";
import { to } from "../router.ts";
import { progressMeter } from "./ProgressMeter.ts";
import { levelTag } from "./Tag.ts";

function refLink(app: App, ref: string): HTMLElement | null {
  const c = app.course;
  const lesson = c.lessonById.get(ref);
  if (lesson) return h("a", { href: to.lesson(lesson.part.id, ref) }, `${sv.nav.part(lesson.part.n)} · ${lesson.lesson.title}`);
  const part = c.partById.get(ref);
  if (part) return h("a", { href: to.part(part.id) }, `${sv.nav.part(part.n)} · ${part.title}`);
  return null;
}

export function studyQuestions(app: App, exam: Exam): HTMLElement {
  const qs = exam.studyQuestions ?? [];
  const summary = h("p", { class: "sk-heading sk-num", "data-study-known": "" });
  const meter = progressMeter(0, sv.hubTabs.questions);
  const paintSummary = () => {
    const p = app.store.get();
    const known = qs.filter((q) => p.study[q.id] === "kan").length;
    summary.textContent = sv.study.known(known, qs.length);
    meter.set(qs.length ? (known / qs.length) * 100 : 0);
  };

  const item = (q: StudyQuestion) => {
    const bodyId = `sq-body-${q.id}`;
    const headId = `sq-head-${q.id}`;
    const areaId = `sq-area-${q.id}`;
    const modelId = `sq-model-${q.id}`;
    const status = h("span", { class: "sk-studyq__status" });
    const paintStatus = () => {
      const v = app.store.get().study[q.id];
      replace(
        status,
        v === "kan"
          ? h("span", { class: "sk-tag sk-tag--accent" }, icon("check", 16), sv.study.statusKnown)
          : v === "inte-an"
            ? h("span", { class: "sk-tag" }, sv.study.statusNotYet)
            : null,
      );
    };
    const head = h(
      "button",
      { class: "sk-lesson__head", type: "button", id: headId, "aria-expanded": "false", "aria-controls": bodyId },
      h("span", { class: "sk-numcircle sk-num", "aria-hidden": "true" }, String(q.n)),
      h("span", { class: "sk-lesson__titlewrap" },
        h("span", { class: "sk-visually-hidden" }, `${sv.study.question(q.n)}: `),
        h("span", { class: "sk-lesson-title" }, app.mdInline(q.q)),
        status,
      ),
      h("span", { class: "sk-lesson__chev", "aria-hidden": "true" }, icon("chevron", 18)),
    );
    const model = h(
      "div",
      { class: "sk-stack", id: modelId, hidden: true },
      h("div", { class: "sk-box sk-box--model" }, h("p", { class: "sk-eyebrow" }, sv.study.modelAnswer), app.md(q.modelAnswer)),
      q.refs.length
        ? h("p", { class: "sk-small" }, `${sv.study.answerIn} `, q.refs.map(refLink.bind(null, app)).filter(Boolean).flatMap((a, i) => (i ? [" · ", a] : [a])))
        : null,
    );
    const showBtn = h("button", { class: "sk-btn", type: "button", "aria-expanded": "false", "aria-controls": modelId }, icon("eye", 18), sv.study.showModel);
    showBtn.addEventListener("click", () => {
      const open = model.hidden;
      model.hidden = !open;
      showBtn.setAttribute("aria-expanded", String(open));
    });
    const grade = (v: "kan" | "inte-an") => {
      app.store.update((p) => {
        p.study[q.id] = v;
      });
      paintStatus();
      paintSummary();
    };
    const body = h(
      "div",
      { class: "sk-lesson__body", id: bodyId, role: "region", "aria-labelledby": headId, hidden: true },
      q.level ? h("div", { class: "sk-tagrow" }, levelTag(q.level)) : null,
      h("label", { class: "sk-label", for: areaId }, sv.study.yourAnswer),
      h("textarea", { class: "sk-textarea sk-textarea--short", id: areaId, lang: "sv", spellcheck: "true" }),
      h("p", { class: "sk-small sk-muted" }, sv.study.notSaved),
      h("div", { class: "sk-btnrow" }, showBtn),
      model,
      h("div", { class: "sk-btnrow" },
        h("button", { class: "sk-btn sk-btn--primary", type: "button", onclick: () => grade("kan") }, icon("check", 18), sv.study.iKnow),
        h("button", { class: "sk-btn", type: "button", onclick: () => grade("inte-an") }, sv.study.notYet),
      ),
    );
    head.addEventListener("click", () => {
      const open = body.hidden;
      body.hidden = !open;
      head.setAttribute("aria-expanded", String(open));
    });
    paintStatus();
    return h("li", { class: "sk-card sk-lesson", "data-study": q.id }, h("h3", { class: "sk-lesson-heading" }, head), body);
  };

  paintSummary();
  return h(
    "div",
    { class: "sk-stack sk-stack--4", "data-study-list": exam.id },
    h("section", { class: "sk-card sk-stack" }, summary, meter.el, h("p", { class: "sk-muted" }, sv.study.intro)),
    h("ol", { class: "sk-plainlist sk-stack" }, qs.map(item)),
  );
}
