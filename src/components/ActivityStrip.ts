/**
 * ActivityStrip: "Pluggat 4 av de senaste 7 dagarna" and a row of 28 squares, one per day, filled
 * when the student studied that day. Factual; no streaks or fireworks.
 */
import { h } from "../dom.ts";
import { sv } from "../i18n/sv.ts";
import type { Progress } from "../store/progress.ts";
import { addDays, shortDate } from "../format.ts";

export function activityStrip(p: Progress, today: string): HTMLElement {
  const days = Array.from({ length: 28 }, (_, i) => addDays(today, i - 27));
  const month = days.filter((d) => p.activity[d]).length;
  const week = days.slice(-7).filter((d) => p.activity[d]).length;
  return h(
    "div",
    { class: "sk-stack sk-stack--2", "data-activity": "" },
    h("p", { class: "sk-heading sk-num" }, sv.progress.activityWeek(week)),
    h(
      "div",
      { class: "sk-activity", role: "img", "aria-label": sv.progress.activityMonth(month) },
      days.map((d) =>
        h("span", {
          class: `sk-activity__day${p.activity[d] ? " sk-activity__day--on" : ""}`,
          title: sv.progress.activityDay(shortDate(d), !!p.activity[d]),
          "data-day": d,
        }),
      ),
    ),
    h("p", { class: "sk-small sk-muted sk-num" }, sv.progress.activityMonth(month)),
  );
}
