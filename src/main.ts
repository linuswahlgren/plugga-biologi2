/**
 * Plugga entry point: loads the course, the progress store and the app shell, then renders
 * the view for the current hash route. Subject-agnostic: everything course-specific comes
 * from content/.
 */
import "./styles/tokens.css";
import "./styles/bundle.css";
import "./styles/app.css";
import "./styles/learn.css";
import "./styles/print.css";

import { course as rawCourse } from "../content/index.ts";
import { loadCourse } from "./course.ts";
import { checkCourse, uiStringsOf } from "./check.ts";
import { createStorage } from "./store/storage.ts";
import { createStore, type Theme } from "./store/progress.ts";
import { parseHash, type Route } from "./router.ts";
import { makeRenderers, today, type App, type ViewResult } from "./app.ts";
import { h, replace } from "./dom.ts";
import { sv } from "./i18n/sv.ts";
import { createSidebar } from "./components/Sidebar.ts";
import { createTopBar } from "./components/TopBar.ts";
import { createToaster } from "./components/Toast.ts";
import { confirmDialog } from "./components/ConfirmDialog.ts";
import { openShortcuts } from "./components/ShortcutsDialog.ts";
import { contentReport } from "./components/ContentReport.ts";
import { overviewView } from "./views/overview.ts";
import { partView } from "./views/part.ts";
import { hubView } from "./views/hub.ts";
import { progressView } from "./views/progress.ts";
import { notFoundView } from "./views/simple.ts";
import { sessionPageView } from "./views/sessionPage.ts";
import { DIAGRAM_IDS, DIAGRAM_MARKERS } from "./diagrams/index.ts";

const course = loadCourse(rawCourse);
const kv = createStorage();
const store = createStore(kv, course.id);

// ---------- Content check at runtime ----------
const showWarnings = __BUILD_TARGET__ === "dev" || /[?&]kontroll\b/.test(location.search + location.hash);
const checkResult = checkCourse(rawCourse, { diagrams: DIAGRAM_IDS, diagramMarkers: DIAGRAM_MARKERS, uiStrings: showWarnings ? uiStringsOf(sv) : [] });

// ---------- Theme and accent ----------
const root = document.documentElement;
root.lang = "sv";
root.dataset.accent = course.accent;
const media = window.matchMedia("(prefers-color-scheme: dark)");
const effectiveTheme = (t: Theme): "light" | "dark" => (t === "system" ? (media.matches ? "dark" : "light") : t);
const applyTheme = () => {
  const t = store.get().settings.theme;
  if (t === "system") delete root.dataset.theme;
  else root.dataset.theme = t;
  topbar.setTheme(effectiveTheme(t));
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", effectiveTheme(t) === "dark" ? "#111312" : "#f6f6f3");
};

// ---------- Shell ----------
const toastRegion = h("div", { class: "sk-toastregion", role: "status", "aria-live": "polite" });
const toast = createToaster(toastRegion);
const renderers = makeRenderers(course);
const app: App = {
  course,
  store,
  toast,
  confirm: confirmDialog,
  md: renderers.md,
  mdInline: renderers.mdInline,
  today,
};

const scrim = h("div", { class: "sk-scrim", hidden: true });
const closeDrawers = () => {
  if (sidebar.isOpen()) {
    sidebar.close();
    topbar.menuButton.setAttribute("aria-expanded", "false");
    topbar.menuButton.setAttribute("aria-label", sv.nav.menuOpen);
  }
  const notes = document.querySelector<HTMLElement>(".sk-notes[data-open]");
  if (notes) {
    delete notes.dataset.open;
    document.querySelector<HTMLElement>(".sk-notes__toggle")?.setAttribute("aria-expanded", "false");
  }
  scrim.hidden = true;
};
const sidebar = createSidebar(app, () => closeDrawers());
const topbar = createTopBar({
  onMenu: () => {
    if (sidebar.isOpen()) {
      closeDrawers();
      return;
    }
    sidebar.open();
    scrim.hidden = false;
    topbar.menuButton.setAttribute("aria-expanded", "true");
    topbar.menuButton.setAttribute("aria-label", sv.nav.menuClose);
    sidebar.el.querySelector<HTMLElement>("a")?.focus();
  },
  onTheme: () => {
    const current = effectiveTheme(store.get().settings.theme);
    store.update((p) => { p.settings.theme = current === "dark" ? "light" : "dark"; }, { activity: false });
    applyTheme();
  },
});
scrim.addEventListener("click", closeDrawers);

const bannerSlot = h("div", { class: "sk-bannerslot" });
const showStorageBanner = () => replace(bannerSlot, h("div", { class: "sk-banner", role: "alert", "data-storage-banner": "" }, sv.storage.unavailable));
if (kv.mode === "memory") showStorageBanner();
kv.onFallback(showStorageBanner);

const report = contentReport(checkResult, showWarnings);
const main = h("main", { class: "sk-main", id: "main", tabindex: "-1" });
const shell = h(
  "div",
  { class: "sk-app" },
  h("div", { class: "sk-sidebarcol" }, sidebar.el),
  h("div", { class: "sk-mainwrap" }, topbar.el, bannerSlot, main),
);
const appRoot = document.getElementById("app")!;
replace(appRoot, h("a", { class: "sk-skip", href: "#main", onclick: (e: Event) => { e.preventDefault(); main.focus(); } }, sv.skipToContent), shell, scrim, toastRegion);

applyTheme();
media.addEventListener?.("change", applyTheme);
sidebar.refresh();
store.subscribe(() => sidebar.refresh());

// ---------- Routing ----------
const known = () => ({ parts: new Set(course.partById.keys()), exams: new Set(course.examById.keys()) });
let current: ViewResult | null = null;
let firstRender = true;

function viewFor(route: Route): ViewResult {
  switch (route.view) {
    case "overview":
      return overviewView(app);
    case "part": {
      const part = course.partById.get(route.part)!;
      return partView(app, part, route.tab, route.query);
    }
    case "hub":
      return hubView(app, course.examById.get(route.exam)!, route.section, route.query);
    case "progress":
      return progressView(app);
    case "session":
      return sessionPageView(app, route.mode, route.query);
    case "notfound":
      return notFoundView(app);
  }
}

function render(): void {
  const route = parseHash(location.hash, known());
  current?.dispose?.();
  closeDrawers();
  const view = viewFor(route);
  current = view;
  replace(main, report && route.view === "overview" ? report : checkResult.errors.length ? report : null, view.el);
  sidebar.setCurrent(view.navKey);
  topbar.setCrumbs(view.crumbs, view.compact);
  document.title = sv.pageTitle(view.title);
  if (!firstRender) {
    const heading = main.querySelector<HTMLElement>("h1");
    if (heading && !route.query.lektion) heading.focus({ preventScroll: true });
    if (!route.query.lektion) window.scrollTo(0, 0);
  }
  firstRender = false;
}

window.addEventListener("hashchange", render);
render();

// ---------- Keyboard ----------
document.addEventListener("keydown", (e) => {
  const target = e.target as HTMLElement | null;
  const typing = !!target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
  if (e.key === "Escape") {
    const wasOpen = sidebar.isOpen() || !!document.querySelector(".sk-notes[data-open]");
    if (wasOpen) {
      const reopen = sidebar.isOpen() ? topbar.menuButton : document.querySelector<HTMLElement>(".sk-notes__toggle");
      closeDrawers();
      reopen?.focus();
    }
    return;
  }
  if (!typing && e.key === "?" && !document.querySelector("dialog[open]")) {
    e.preventDefault();
    openShortcuts();
  }
});

// Open the notes drawer also shows the scrim (below 1180 px).
document.addEventListener("click", (e) => {
  const el = e.target as HTMLElement;
  if (el.closest(".sk-notes__toggle") && window.matchMedia("(max-width: 1179px)").matches) scrim.hidden = false;
  if (el.closest(".sk-notes__close") && !sidebar.isOpen()) scrim.hidden = true;
});
