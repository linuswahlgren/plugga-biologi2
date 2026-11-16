/**
 * Sidebar: "Plugga", the course and topic area on every screen; then Översikt, one ExamGroup per
 * exam (hub link above that exam's parts, each with a mastery bar) and Mina framsteg.
 * Below 860 px it becomes a drawer opened from the top bar.
 */
import { h, replace } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";
import type { App } from "../app.ts";
import { to } from "../router.ts";
import { partMastery } from "../mastery.ts";
import { progressMeter, type ProgressMeter } from "./ProgressMeter.ts";
import { dayMonth, longDayMonth } from "../format.ts";
import type { Exam } from "../types.ts";

export interface Sidebar {
  el: HTMLElement;
  setCurrent(navKey: string): void;
  refresh(): void;
  open(): void;
  close(): void;
  isOpen(): boolean;
}

export function examGroupLabel(exam: Exam): string {
  return exam.status === "done" ? sv.nav.examGroupDone(exam.title) : sv.nav.examGroupUpcoming(exam.title, exam.date ? dayMonth(exam.date) : "");
}

export function hubLabel(exam: Exam): string {
  return exam.status === "done" ? sv.nav.hubDone(exam.title) : sv.nav.hubUpcoming(exam.title, exam.date ? longDayMonth(exam.date) : "");
}

export function createSidebar(app: App, onNavigate: () => void): Sidebar {
  const c = app.course;
  const links = new Map<string, HTMLAnchorElement>();
  const meters = new Map<string, { meter: ProgressMeter; circle: HTMLElement }>();

  const navLink = (key: string, hrefValue: string, ...children: (Node | string)[]) => {
    const a = h("a", { class: "sk-navlink", href: hrefValue, "data-nav": key, onclick: () => onNavigate() }, ...children);
    links.set(key, a);
    return a;
  };

  const groups = c.exams.map((exam) => {
    const parts = c.partsOf(exam.id);
    const groupHeadId = `nav-${exam.id}`;
    return h(
      "div",
      { class: "sk-nav__group", role: "group", "aria-labelledby": groupHeadId },
      h("p", { class: "sk-eyebrow sk-nav__grouphead", id: groupHeadId }, examGroupLabel(exam)),
      navLink(`hub:${exam.id}`, to.hub(exam.id), icon(exam.status === "done" ? "reset" : "flag", 18), h("span", null, hubLabel(exam))),
      parts.length
        ? parts.map((part) => {
            const circle = h("span", { class: "sk-numcircle", "aria-hidden": "true" }, String(part.n));
            const meter = progressMeter(0, `${sv.nav.part(part.n)}: ${sv.part.mastery}`);
            meters.set(part.id, { meter, circle });
            return navLink(
              part.id,
              to.part(part.id),
              h("span", { class: "sk-navpart" },
                circle,
                h("span", { class: "sk-navpart__text" },
                  h("span", { class: "sk-navpart__kicker" }, sv.nav.part(part.n)),
                  h("span", { class: "sk-navpart__title" }, part.title),
                  meter.el,
                ),
              ),
            );
          })
        : exam.status === "upcoming"
          ? h("p", { class: "sk-nav__note" }, sv.nav.noPartsYet)
          : null,
    );
  });

  const el = h(
    "div",
    { class: "sk-sidebar", id: "sk-sidebar" },
    h("div", { class: "sk-sidebar__head" },
      h("a", { class: "sk-brand", href: to.overview(), onclick: () => onNavigate() },
        h("span", { class: "sk-brand__mark", "aria-hidden": "true" }, "P"),
        sv.brand,
      ),
      h("p", { class: "sk-sidebar__course" }, c.title),
      h("p", { class: "sk-sidebar__area" }, c.area),
    ),
    h("nav", { class: "sk-nav", "aria-label": sv.nav.mainNav },
      navLink("overview", to.overview(), icon("home", 18), h("span", null, sv.nav.overview)),
      groups,
      h("div", { class: "sk-nav__group" }, navLink("progress", to.progress(), icon("chart", 18), h("span", null, sv.nav.progress))),
    ),
  );

  const refresh = () => {
    const p = app.store.get();
    const today = app.today();
    for (const part of c.parts) {
      const m = partMastery(part, p, today);
      const entry = meters.get(part.id);
      if (!entry) continue;
      entry.meter.set(m.percent);
      const done = m.status === "complete";
      entry.circle.classList.toggle("sk-numcircle--done", done);
      if (done) replace(entry.circle, icon("check", 16));
      else replace(entry.circle, String(part.n));
    }
  };

  let opened = false;
  return {
    el,
    setCurrent(navKey) {
      for (const [key, a] of links) {
        if (key === navKey) a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
      }
    },
    refresh,
    open() {
      opened = true;
      el.dataset.open = "true";
    },
    close() {
      opened = false;
      delete el.dataset.open;
    },
    isOpen: () => opened,
  };
}
