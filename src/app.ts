/** Shared app context passed to every view and component. */
import type { NCourse } from "./course.ts";
import type { Store } from "./store/progress.ts";
import { renderInline, renderMarkup, type RenderOptions } from "./markup.ts";
import { sv } from "./i18n/sv.ts";
import { to } from "./router.ts";
import { todayISO } from "./format.ts";

export interface Crumb {
  label: string;
  href: string;
}

export interface ViewResult {
  el: HTMLElement;
  /** document.title parts before the course, e.g. ["Quiz", "Fotosyntesen"]. */
  title: string[];
  crumbs: Crumb[];
  /** Below 860 px: a back chevron to `href` plus `label`. */
  compact: { href: string; label: string; current: string } | null;
  /** Sidebar item to mark as current: "overview", a part id, "hub:<exam>", "progress". */
  navKey: string;
  /** Optional notes panel rendered as the third column. */
  aside?: HTMLElement;
  dispose?: () => void;
}

export interface App {
  course: NCourse;
  store: Store;
  toast(message: string, action?: { label: string; onClick: () => void }): void;
  confirm(opts: { title: string; text: string; confirm: string; cancel: string }): Promise<boolean>;
  md(src: string): HTMLElement;
  mdInline(src: string): HTMLSpanElement;
  today(): string;
}

export function markupOptions(course: NCourse): RenderOptions {
  return {
    lessonHref: (id) => {
      const hit = course.lessonById.get(id);
      return hit ? to.lesson(hit.part.id, id) : null;
    },
    allowImages: __BUILD_TARGET__ !== "backup",
    headingLevel: 3,
    labels: {
      key: sv.markupLabels.key,
      mistake: sv.markupLabels.mistake,
      supplement: sv.status.supplement,
      supplementTip: sv.status.supplementTip,
      image: sv.markupLabels.image,
    },
  };
}

export function makeRenderers(course: NCourse) {
  const opts = markupOptions(course);
  return {
    md: (src: string) => renderMarkup(src, opts),
    mdInline: (src: string) => renderInline(src, opts),
  };
}

export const today = () => todayISO();
