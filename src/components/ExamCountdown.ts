/**
 * ExamCountdown: "Prov 2 om 21 dagar · mån 7 dec". While the exam has no parts it shows the
 * empty state ("Materialet till prov 2 läggs upp här …") and a link to repeat the done exam.
 */
import { h } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";
import type { App } from "../app.ts";
import type { Exam } from "../types.ts";
import { daysBetween, shortDate } from "../format.ts";
import { to } from "../router.ts";
import { doneExams } from "../course.ts";

export function countdownText(exam: Exam, today: string): string {
  if (!exam.date) return exam.title;
  const days = daysBetween(today, exam.date);
  return days < 0 ? sv.countdown.past(exam.title, shortDate(exam.date)) : sv.countdown.title(exam.title, days, shortDate(exam.date));
}

export function examCountdown(app: App, exam: Exam, opts: { headingLevel?: 2 | 3; showEmpty?: boolean } = {}): HTMLElement {
  const hasParts = app.course.partsOf(exam.id).length > 0;
  const review = doneExams(app.course)[0];
  const Heading = opts.headingLevel === 3 ? "h3" : "h2";
  return h(
    "section",
    { class: "sk-card sk-stack", "data-countdown": exam.id },
    h("p", { class: "sk-eyebrow" }, icon("clock", 16), " ", exam.title),
    h(Heading, { class: "sk-title sk-num" }, countdownText(exam, app.today())),
    !hasParts && opts.showEmpty !== false
      ? [
          h("p", null, sv.countdown.emptyText(exam.title.toLowerCase())),
          review
            ? h("div", { class: "sk-btnrow" }, h("a", { class: "sk-btn", href: to.hub(review.id) }, sv.countdown.toReview(review.title.toLowerCase()), icon("right", 18)))
            : null,
        ]
      : null,
  );
}
