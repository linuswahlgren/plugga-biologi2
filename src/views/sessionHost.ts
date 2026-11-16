/**
 * Hosts for card and quiz sessions: a part's Kort and Quiz tabs, the cross-part page "#/omgang/…",
 * and an exam hub's Provsimulering. Each shows the builder until the student starts; a running
 * session then replaces the whole page (session header instead of page head).
 */
import { sv } from "../i18n/sv.ts";
import type { App, ViewResult } from "../app.ts";
import type { NPart } from "../course.ts";
import type { Exam } from "../types.ts";
import { to, type Query } from "../router.ts";
import {
  cardPool,
  newCardRun,
  newQuizRun,
  pickCards,
  pickQuiz,
  quizPool,
  rememberedSettings,
  scopeKey,
  urvalLabel,
  type Run,
  type SessionKind,
  type SessionSettings,
} from "../session.ts";
import { sessionBuilder } from "../components/SessionBuilder.ts";
import { hubLabel } from "../components/Sidebar.ts";
import { launch, type Host } from "./host.ts";
import { quizRunner } from "./quizRun.ts";
import { cardRunner } from "./cardRun.ts";

const MODE_TAB: Record<SessionKind, string> = { kort: sv.tabs.cards, quiz: sv.tabs.quiz };

export function partHost(app: App, part: NPart, kind: SessionKind): Host {
  const c = app.course;
  const label = `${sv.nav.part(part.n)} · ${part.title}`;
  return {
    kind,
    scope: { part },
    path: to.part(part.id, kind),
    presets: true,
    remember: true,
    backHref: to.part(part.id),
    backLabel: sv.session.backToPart,
    crumbs: [
      { label: c.title, href: to.overview() },
      { label, href: to.part(part.id) },
      { label: MODE_TAB[kind], href: to.part(part.id, kind) },
    ],
    compact: { href: to.part(part.id), label, current: `${MODE_TAB[kind]} · ${part.title}` },
    navKey: part.id,
    titleTail: [part.title, c.title],
  };
}

export function pageHost(app: App, kind: SessionKind): Host {
  const c = app.course;
  return {
    kind,
    scope: {},
    path: to.session(kind),
    presets: true,
    remember: true,
    backHref: to.overview(),
    backLabel: sv.session.backToOverview,
    crumbs: [
      { label: c.title, href: to.overview() },
      { label: MODE_TAB[kind], href: to.session(kind) },
    ],
    compact: { href: to.overview(), label: c.title, current: MODE_TAB[kind] },
    navKey: "",
    titleTail: [c.title],
  };
}

export function simulationHost(app: App, exam: Exam): Host {
  const c = app.course;
  const hub = hubLabel(exam);
  return {
    kind: "quiz",
    scope: { exam },
    path: to.hub(exam.id, "simulering"),
    presets: false,
    remember: false,
    intro: sv.simulation.intro,
    backHref: to.hub(exam.id),
    backLabel: sv.session.back,
    crumbs: [
      { label: c.title, href: to.overview() },
      { label: exam.title, href: to.hub(exam.id) },
      { label: sv.hubTabs.simulation, href: to.hub(exam.id, "simulering") },
    ],
    compact: { href: to.hub(exam.id), label: hub, current: sv.hubTabs.simulation },
    navKey: `hub:${exam.id}`,
    titleTail: [sv.hubTabs.simulation, hub, c.title],
  };
}

/** A running session as a whole page. */
export function runningView(app: App, host: Host, run: Run): ViewResult {
  const runner = run.type === "quiz" ? quizRunner(app, host, run) : cardRunner(app, host, run);
  const mode = run.type === "kort" ? sv.session.modeCards : run.lage === "prov" ? sv.session.modeExam : sv.session.modeQuiz;
  return {
    el: runner.el,
    title: [mode, ...host.titleTail],
    crumbs: host.crumbs,
    compact: host.compact,
    navKey: host.navKey,
    dispose: runner.dispose,
  };
}

function start(app: App, host: Host, s: SessionSettings): void {
  const c = app.course;
  const today = app.today();
  if (host.remember) {
    app.store.update((p) => {
      p.settings.sessionDefaults[host.kind] = rememberedSettings(host.kind, s);
    }, { activity: false, silent: true });
  }
  const p = app.store.get();
  const label = urvalLabel(c, s.urval, host.scope);
  const scope = scopeKey(s.urval, host.scope);
  if (host.kind === "quiz") {
    const items = pickQuiz(quizPool(c, p, s.urval, s.niva, host.scope), s);
    if (!items.length) return;
    launch(app, host.path, newQuizRun(items, { lage: s.lage, scope, label, minutes: s.lage === "prov" ? s.tid : 0, now: Date.now() }));
  } else {
    const ids = pickCards(cardPool(c, p, s.urval, host.scope, today), s, p, today);
    if (!ids.length) return;
    launch(app, host.path, newCardRun(ids, { scope, label, reversed: s.vand }));
  }
}

export function builderFor(app: App, host: Host, query: Query): HTMLElement {
  return sessionBuilder(app, host, query, (s) => start(app, host, s));
}
