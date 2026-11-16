/** Not-found view, and the placeholder for cross-part sessions until Phase 2 builds them. */
import { h } from "../dom.ts";
import { sv } from "../i18n/sv.ts";
import type { App, ViewResult } from "../app.ts";
import { to } from "../router.ts";
import { pageHead } from "../components/PageHead.ts";
import { emptyState } from "../components/EmptyState.ts";

export function notFoundView(app: App): ViewResult {
  const c = app.course;
  return {
    el: h("div", { class: "sk-page" },
      pageHead({ eyebrow: c.title, title: sv.notFound.title, lead: sv.notFound.text }),
      h("div", { class: "sk-btnrow" }, h("a", { class: "sk-btn sk-btn--primary", href: to.overview() }, sv.notFound.home)),
    ),
    title: [sv.notFound.title, c.title],
    crumbs: [{ label: c.title, href: to.overview() }, { label: sv.notFound.title, href: location.hash || "#/" }],
    compact: { href: to.overview(), label: c.title, current: sv.notFound.title },
    navKey: "",
  };
}

export function sessionPlaceholderView(app: App, label: string): ViewResult {
  const c = app.course;
  return {
    el: h("div", { class: "sk-page" },
      pageHead({ eyebrow: c.title, title: label }),
      emptyState(label, sv.part.comingInPhase, h("a", { class: "sk-btn", href: to.overview() }, sv.notFound.home)),
    ),
    title: [label, c.title],
    crumbs: [{ label: c.title, href: to.overview() }, { label, href: location.hash || "#/" }],
    compact: { href: to.overview(), label: c.title, current: label },
    navKey: "",
  };
}
