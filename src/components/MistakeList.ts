/**
 * MistakeList: every wrong answer of a quiz with "Ditt svar", "Rätt svar är …", the explanation
 * and a link to the lesson that teaches it. Each line has an icon and a word, not only a colour.
 */
import { h } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";
import type { App } from "../app.ts";
import type { NQuiz } from "../course.ts";
import { to } from "../router.ts";

export function mistakeList(app: App, wrong: { q: NQuiz; chosen: string | null }[]): HTMLElement {
  return h(
    "ol",
    { class: "sk-plainlist sk-stack", "data-mistakes": "" },
    wrong.map(({ q, chosen }) => {
      const hit = q.lesson ? app.course.lessonById.get(q.lesson) : undefined;
      return h(
        "li",
        { class: "sk-card sk-stack sk-mistake", "data-quiz": q.id },
        h("p", { class: "sk-heading" }, app.mdInline(q.q)),
        h("p", { class: "sk-mistake__line sk-mistake__line--wrong" },
          icon("x", 16),
          h("span", null, h("strong", null, `${sv.quiz.yourAnswer}: `), chosen ? app.mdInline(chosen) : sv.quiz.noAnswer),
        ),
        h("p", { class: "sk-mistake__line sk-mistake__line--right" },
          icon("check", 16),
          h("span", null, h("strong", null, `${sv.quiz.answerIs} `), app.mdInline(q.answer)),
        ),
        app.md(q.explain),
        hit ? h("p", null, h("a", { href: to.lesson(hit.part.id, hit.lesson.id) }, sv.quiz.readMore(hit.lesson.title))) : null,
      );
    }),
  );
}
