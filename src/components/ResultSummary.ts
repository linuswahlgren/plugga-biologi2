/**
 * ResultSummary: the page after a quiz. "7 av 10 · 70 %", an encouraging line that states facts,
 * a breakdown per part and per level, every wrong answer, and the next steps.
 */
import { h, type Child } from "../dom.ts";
import { sv } from "../i18n/sv.ts";
import type { App } from "../app.ts";
import type { QuizScore, Tally } from "../session.ts";
import { percent } from "../format.ts";
import { pageHead } from "./PageHead.ts";
import { progressMeter } from "./ProgressMeter.ts";
import { mistakeList } from "./MistakeList.ts";

export function encouragement(pct: number): string {
  if (pct >= 90) return sv.results.lineTop;
  if (pct >= 70) return sv.results.lineGood;
  if (pct >= 40) return sv.results.lineStart;
  return sv.results.lineLow;
}

function tallyList(rows: { label: string; t: Tally }[]): HTMLElement {
  return h(
    "ul",
    { class: "sk-plainlist sk-stack" },
    rows.map(({ label, t }) =>
      h("li", { class: "sk-stack sk-stack--2" },
        h("div", { class: "sk-sectionhead" }, h("span", null, label), h("span", { class: "sk-small sk-num" }, sv.results.tally(t.correct, t.total))),
        progressMeter(t.total ? (t.correct / t.total) * 100 : 0, `${label}: ${sv.results.tally(t.correct, t.total)}`).el,
      ),
    ),
  );
}

export function resultSummary(app: App, opts: { eyebrow: string; score: QuizScore; timeUp: boolean; notCounted: boolean; actions: Child }): HTMLElement {
  const { score } = opts;
  const c = app.course;
  const pct = score.total ? Math.round((score.correct / score.total) * 100) : 0;
  const partRows = score.perPart.map((pp) => {
    const part = c.partById.get(pp.partId);
    return { label: part ? `${sv.nav.part(part.n)} · ${part.title}` : pp.partId, t: pp };
  });
  const levelRows = score.perLevel.map((pl) => ({ label: sv.status.level(pl.level), t: pl }));
  const wrong = score.wrong.flatMap((w) => {
    const q = c.quizById.get(w.id);
    return q ? [{ q, chosen: w.chosen }] : [];
  });

  return h(
    "div",
    { class: "sk-page sk-results", "data-results": "" },
    pageHead({ eyebrow: opts.eyebrow, title: sv.results.score(score.correct, score.total, percent(pct)), lead: encouragement(pct) }),
    opts.timeUp ? h("p", { class: "sk-banner sk-banner--quiet", role: "status" }, sv.quiz.timeUp) : null,
    h("div", { class: "sk-btnrow" }, opts.actions),
    h("section", { class: "sk-card sk-stack sk-stack--4", "aria-labelledby": "res-breakdown" },
      h("h2", { class: "sk-heading", id: "res-breakdown" }, sv.results.breakdown),
      h("div", { class: "sk-stack" }, h("h3", { class: "sk-eyebrow" }, sv.results.perPart), tallyList(partRows)),
      levelRows.length ? h("div", { class: "sk-stack" }, h("h3", { class: "sk-eyebrow" }, sv.results.perLevel), tallyList(levelRows)) : null,
      opts.notCounted ? h("p", { class: "sk-small sk-muted" }, sv.results.notCounted) : null,
    ),
    h("section", { class: "sk-stack", "aria-labelledby": "res-mistakes" },
      h("h2", { class: "sk-heading", id: "res-mistakes" }, sv.results.mistakesTitle),
      wrong.length ? mistakeList(app, wrong) : h("p", { class: "sk-muted" }, sv.results.noMistakes),
    ),
  );
}
