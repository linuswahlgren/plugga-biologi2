/** PageHead: eyebrow, tags, the page's one display title (h1, focus target on route change) and lead. */
import { h, type Child } from "../dom.ts";

export function pageHead(opts: { eyebrow?: string; title: string; lead?: Child; tags?: Child[]; actions?: Child }): HTMLElement {
  return h(
    "header",
    { class: "sk-pagehead" },
    opts.eyebrow ? h("p", { class: "sk-eyebrow" }, opts.eyebrow) : null,
    opts.tags && opts.tags.length ? h("div", { class: "sk-tagrow" }, opts.tags) : null,
    h("h1", { class: "sk-display", tabindex: "-1" }, opts.title),
    opts.lead ? h("p", { class: "sk-lead" }, opts.lead) : null,
    opts.actions ?? null,
  );
}
