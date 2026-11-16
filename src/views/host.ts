/**
 * Session hosting. A view that offers a session (a part's Kort or Quiz tab, "#/omgang/…", an exam
 * hub's Provsimulering) is a Host. A running session lives in Progress.session; its route is the
 * host path plus "?fortsatt=1", so it survives reloads and "Läs mer" detours.
 */
import type { App, Crumb, ViewResult } from "../app.ts";
import type { BuilderContext } from "../components/SessionBuilder.ts";
import { navigate, replaceHash, type Query } from "../router.ts";
import { restoreRun, runLabel, type Run } from "../session.ts";

export interface Host extends BuilderContext {
  /** Where "Tillbaka" goes after a session. */
  backHref: string;
  backLabel: string;
  crumbs: Crumb[];
  compact: ViewResult["compact"];
  navKey: string;
  /** document.title parts after the mode label, e.g. ["Fotosyntesen", "Biologi 2"]. */
  titleTail: string[];
}

export const RESUME_KEY = "fortsatt";
export const resumeRoute = (path: string) => `${path}?${RESUME_KEY}=1`;

/** The saved session for this host, when the URL asks to resume it. */
export function savedRun(app: App, host: Host, query: Query): Run | null {
  if (query[RESUME_KEY] !== "1") return null;
  const saved = app.store.get().session;
  if (!saved || saved.route !== resumeRoute(host.path)) return null;
  const run = restoreRun(app.course, saved.data);
  return run && run.type === host.kind ? run : null;
}

/** Save a new session and open it. */
export function launch(app: App, path: string, run: Run): void {
  const route = resumeRoute(path);
  app.store.update((p) => {
    p.session = { kind: run.type, route, label: runLabel(run), at: new Date().toISOString(), data: run };
  });
  navigate(route);
}

/** Keep the running session's state (debounced write like all progress). */
export function saveRun(app: App, path: string, run: Run): void {
  app.store.update(
    (p) => {
      if (!p.session || p.session.route !== resumeRoute(path)) return;
      p.session.data = run;
      p.session.label = runLabel(run);
      p.session.at = new Date().toISOString();
    },
    { silent: true, activity: false },
  );
}

/** The session is over: forget it and point the URL back at the builder (no re-render). */
export function endRun(app: App, path: string): void {
  app.store.update(
    (p) => {
      if (p.session?.route === resumeRoute(path)) p.session = null;
    },
    { activity: false },
  );
  replaceHash(path);
}
