/** QuizHistory: date, selection, mode and score of the last 50 quiz sessions, newest first. */
import { h } from "../dom.ts";
import { sv } from "../i18n/sv.ts";
import type { App } from "../app.ts";
import type { Attempt } from "../store/progress.ts";
import { percent, shortDate, time24, todayISO } from "../format.ts";
import { scopeLabel } from "../session.ts";

export function quizHistory(app: App, attempts: Attempt[]): HTMLElement {
  if (!attempts.length) return h("p", { class: "sk-muted" }, sv.progress.historyEmpty);
  const rows = attempts.slice(-50).reverse();
  return h(
    "div",
    { class: "sk-tablewrap" },
    h(
      "table",
      { class: "sk-table", "data-history": "" },
      h("thead", null, h("tr", null,
        h("th", { scope: "col" }, sv.progress.colDate),
        h("th", { scope: "col" }, sv.progress.colSelection),
        h("th", { scope: "col" }, sv.progress.colMode),
        h("th", { scope: "col", class: "sk-num" }, sv.progress.colScore),
      )),
      h("tbody", null, rows.map((a) => {
        const d = new Date(a.at);
        const valid = !Number.isNaN(d.getTime());
        return h("tr", null,
          h("td", { class: "sk-num sk-nowrap" }, valid ? `${shortDate(todayISO(d))} ${time24(d)}` : ""),
          h("td", null, scopeLabel(app.course, a.scope)),
          h("td", null, a.mode === "prov" ? sv.session.modeExam : sv.session.modePractice),
          h("td", { class: "sk-num sk-nowrap" }, sv.results.score(a.correct, a.total, percent(a.total ? (a.correct / a.total) * 100 : 0))),
        );
      })),
    ),
  );
}
