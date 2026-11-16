/** Not-found view. */
import { h } from "../dom.ts";
import { sv } from "../i18n/sv.ts";
import type { App, ViewResult } from "../app.ts";
import { to } from "../router.ts";
import { pageHead } from "../components/PageHead.ts";

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
