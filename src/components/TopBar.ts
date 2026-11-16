/**
 * Sticky top bar: menu button (below 860 px), breadcrumb (every crumb is a link; below 860 px it
 * collapses to a back chevron plus the current context), theme toggle.
 */
import { h, replace } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";
import type { Crumb } from "../app.ts";

export interface TopBar {
  el: HTMLElement;
  menuButton: HTMLButtonElement;
  setCrumbs(crumbs: Crumb[], compact: { href: string; label: string; current: string } | null): void;
  setTheme(effective: "light" | "dark"): void;
}

export function createTopBar(opts: { onMenu: () => void; onTheme: () => void }): TopBar {
  const menuButton = h(
    "button",
    { class: "sk-iconbtn sk-topbar__menu", type: "button", "aria-label": sv.nav.menuOpen, "aria-controls": "sk-sidebar", "aria-expanded": "false", onclick: opts.onMenu },
    icon("menu"),
  );
  const full = h("nav", { class: "sk-crumbs sk-crumbs--full", "aria-label": sv.nav.breadcrumb });
  const compact = h("nav", { class: "sk-crumbs sk-crumbs--compact", "aria-label": sv.nav.breadcrumb });
  const themeBtn = h("button", { class: "sk-iconbtn", type: "button", onclick: opts.onTheme });

  const el = h("header", { class: "sk-topbar" }, menuButton, full, compact, h("div", { class: "sk-topbar__actions" }, themeBtn));

  return {
    el,
    menuButton,
    setCrumbs(crumbs, compactInfo) {
      const ol = h("ol", null);
      crumbs.forEach((c, i) => {
        const last = i === crumbs.length - 1;
        ol.appendChild(
          h("li", null,
            i > 0 ? h("span", { class: "sk-crumbs__sep", "aria-hidden": "true" }, "›") : null,
            h("a", { href: c.href, "aria-current": last ? "page" : null }, c.label),
          ),
        );
      });
      replace(full, ol);
      if (compactInfo) {
        replace(
          compact,
          h("a", { class: "sk-iconbtn", href: compactInfo.href, "aria-label": `${sv.nav.back}: ${compactInfo.label}`, title: `${sv.nav.back}: ${compactInfo.label}` }, icon("left", 18)),
          h("span", { class: "sk-crumbs__current" }, compactInfo.current),
        );
      } else {
        const last = crumbs[crumbs.length - 1];
        replace(compact, last ? h("a", { href: last.href, "aria-current": "page" }, last.label) : null);
      }
    },
    setTheme(effective) {
      const toDark = effective === "light";
      themeBtn.setAttribute("aria-label", toDark ? sv.topbar.themeToDark : sv.topbar.themeToLight);
      themeBtn.setAttribute("title", toDark ? sv.topbar.themeToDark : sv.topbar.themeToLight);
      replace(themeBtn, icon(toDark ? "moon" : "sun"));
    },
  };
}
