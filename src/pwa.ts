/**
 * Installable app and updates (BUILD.md §4.10.2–4). Hosted site only: the backup file runs from
 * file:// with no service worker and no network.
 * - Registers sw.js (network first, cache as offline fallback).
 * - Compares the deployed version.json with this build's time and shows the quiet toast
 *   "Nytt material finns." with "Ladda om" once a newer version is published.
 * - Asks the browser for persistent storage after the first real progress.
 */
import type { App } from "./app.ts";
import { sv } from "./i18n/sv.ts";
import { hasRealProgress } from "./mastery.ts";

const hosted = () => __BUILD_TARGET__ === "site" && /^https?:$/.test(location.protocol);

export function registerServiceWorker(): void {
  if (!hosted() || !("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      /* offline support is a bonus; the app works without it */
    });
  });
}

export function startUpdateCheck(app: App, delayMs = 1500): void {
  if (!hosted()) return;
  let shown = false;
  const check = async () => {
    if (shown) return;
    try {
      const res = await fetch("./version.json", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { build?: unknown };
      if (typeof data.build === "string" && data.build !== __BUILD_TIME__ && data.build > __BUILD_TIME__) {
        shown = true;
        app.toast(sv.update.available, { label: sv.update.reload, onClick: () => location.reload() });
      }
    } catch {
      /* offline: try again later */
    }
  };
  setTimeout(check, delayMs);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") void check();
  });
}

/** Ask once, after the first real progress, that the browser keeps the data (navigator.storage.persist). */
export function requestPersistence(app: App): void {
  if (!navigator.storage?.persist) return;
  let asked = false;
  const maybeAsk = () => {
    if (asked || !hasRealProgress(app.store.get())) return;
    asked = true;
    navigator.storage.persist().catch(() => {});
  };
  maybeAsk();
  app.store.subscribe(maybeAsk);
}

export async function isPersisted(): Promise<boolean> {
  try {
    return (await navigator.storage?.persisted?.()) === true;
  } catch {
    return false;
  }
}

/** The address to share: this page on the hosted site, or the published address from the backup file. */
export function shareUrl(app: App): string {
  const hash = location.hash.replace(/([?&])fortsatt=1(&|$)/, (_m, a, b) => (b ? a : "")).replace(/[?&]$/, "");
  if (hosted()) return `${location.origin}${location.pathname}${hash}`;
  return app.course.url ? `${app.course.url}${hash}` : location.href;
}
