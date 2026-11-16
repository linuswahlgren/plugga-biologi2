/**
 * "#/omgang/kort", "#/omgang/quiz", "#/omgang/ova": sessions across parts. Kort and Quiz show the
 * builder (or the running session); Öva shows practice items from the chosen exam.
 */
import { h } from "../dom.ts";
import { sv } from "../i18n/sv.ts";
import type { App, ViewResult } from "../app.ts";
import type { Query, SessionMode } from "../router.ts";
import { pageHead } from "../components/PageHead.ts";
import { builderFor, pageHost, runningView } from "./sessionHost.ts";
import { savedRun } from "./host.ts";
import { practicePageView } from "./practice.ts";

export function sessionPageView(app: App, mode: SessionMode, query: Query): ViewResult {
  if (mode === "ova") return practicePageView(app, query);
  const host = pageHost(app, mode);
  const run = savedRun(app, host, query);
  if (run) return runningView(app, host, run);
  const c = app.course;
  const title = mode === "kort" ? sv.session.modeCards : sv.session.modeQuiz;
  return {
    el: h(
      "div",
      { class: "sk-page" },
      pageHead({ eyebrow: c.title, title, lead: mode === "kort" ? sv.session.pageLeadCards : sv.session.pageLeadQuiz }),
      builderFor(app, host, query),
    ),
    title: [title, c.title],
    crumbs: host.crumbs,
    compact: host.compact,
    navKey: host.navKey,
  };
}
