/** Part tabs: Lär dig · Kort · Quiz · Öva, each with a count. A tab is hidden when its list is empty. Tabs are links (routes). */
import { h } from "../dom.ts";
import { sv } from "../i18n/sv.ts";
import type { NPart } from "../course.ts";
import { to, type PartTab } from "../router.ts";

export function availableTabs(part: NPart): { tab: PartTab; label: string; count: number }[] {
  return [
    { tab: "lar" as const, label: sv.tabs.learn, count: part.lessons.length },
    { tab: "kort" as const, label: sv.tabs.cards, count: part.cards.length },
    { tab: "quiz" as const, label: sv.tabs.quiz, count: part.quiz.length },
    { tab: "ova" as const, label: sv.tabs.practice, count: part.practice.length },
  ].filter((t) => t.count > 0);
}

export function partTabs(part: NPart, current: PartTab): HTMLElement {
  return h(
    "nav",
    { class: "sk-tabs", "aria-label": sv.tabs.partSections },
    availableTabs(part).map((t) =>
      h("a", { class: "sk-tab", href: to.part(part.id, t.tab), "aria-current": t.tab === current ? "page" : null },
        t.label,
        h("span", { class: "sk-tab__count" }, String(t.count)),
      ),
    ),
  );
}
