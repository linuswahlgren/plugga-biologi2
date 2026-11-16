/**
 * Part page ("Del"), BUILD.md §4.3 and §7.6:
 * eyebrow (course · exam · part · dates), status tag (+ "Repetition"), display title, lead, goals,
 * progress meter, tabs, selected panel, and the notes panel as the third column.
 */
import { h, replace } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";
import type { App, ViewResult } from "../app.ts";
import type { NPart } from "../course.ts";
import { to, type PartTab } from "../router.ts";
import { partMastery } from "../mastery.ts";
import { pageHead } from "../components/PageHead.ts";
import { progressMeter } from "../components/ProgressMeter.ts";
import { repetitionTag, statusTag } from "../components/Tag.ts";
import { availableTabs, partTabs } from "../components/PartTabs.ts";
import { lessonCard, type LessonCard } from "../components/LessonCard.ts";
import { notesPanel } from "../components/NotesPanel.ts";
import { emptyState } from "../components/EmptyState.ts";
import { builderFor, partHost, runningView } from "./sessionHost.ts";
import { savedRun } from "./host.ts";
import { practicePanel } from "./practice.ts";

export const TAB_LABEL: Record<PartTab, string> = {
  lar: sv.tabs.learn,
  kort: sv.tabs.cards,
  quiz: sv.tabs.quiz,
  ova: sv.tabs.practice,
};

export function partLabel(part: NPart): string {
  return `${sv.nav.part(part.n)} · ${part.title}`;
}

/** After "Läs mer" from a running session: a way back to it. */
function returnCard(app: App): HTMLElement | null {
  const s = app.store.get().session;
  if (!s) return null;
  return h("section", { class: "sk-card sk-card--sunken sk-stack sk-stack--2", "data-return": "" },
    h("p", { class: "sk-eyebrow" }, sv.session.returnTitle),
    h("p", null, s.label),
    h("div", { class: "sk-btnrow" }, h("a", { class: "sk-btn sk-btn--primary", href: s.route }, icon("left", 18), sv.session.returnButton)),
  );
}

function learnPanel(app: App, part: NPart, focusLesson: string | undefined, onChange: () => void): HTMLElement {
  if (!part.lessons.length) return emptyState(sv.tabs.learn, sv.part.noLessons);
  const p = app.store.get();
  const firstOpen = focusLesson && part.lessons.some((l) => l.id === focusLesson) ? focusLesson : part.lessons.find((l) => !p.lessons[l.id])?.id;
  const cards: LessonCard[] = [];
  const suggestion = h("div");

  const paintSuggestion = () => {
    const allDone = part.lessons.every((l) => app.store.get().lessons[l.id]);
    if (!allDone) {
      replace(suggestion);
      return;
    }
    const target = part.cards.length ? { href: to.part(part.id, "kort"), label: sv.part.allDoneCards } : part.quiz.length ? { href: to.part(part.id, "quiz"), label: sv.part.allDoneQuiz } : null;
    replace(
      suggestion,
      h("section", { class: "sk-card sk-stack", "data-all-done": "" },
        h("h2", { class: "sk-heading" }, sv.part.allDoneTitle),
        h("p", null, sv.part.allDoneText),
        target ? h("div", { class: "sk-btnrow" }, h("a", { class: "sk-btn sk-btn--primary", href: target.href }, target.label, icon("right", 18))) : null,
      ),
    );
  };

  part.lessons.forEach((lesson, i) => {
    const card = lessonCard(app, part, lesson, i, {
      expanded: lesson.id === firstOpen,
      hasNext: i < part.lessons.length - 1,
      onNext: () => {
        card.setExpanded(false);
        const next = cards[i + 1];
        next.setExpanded(true);
        next.focusHead();
        next.el.scrollIntoView({ block: "start", behavior: "smooth" });
      },
      onDoneChange: () => {
        paintSuggestion();
        onChange();
      },
    });
    cards.push(card);
  });
  paintSuggestion();

  if (focusLesson) {
    const target = cards.find((c) => c.lesson.id === focusLesson);
    if (target) requestAnimationFrame(() => target.el.scrollIntoView({ block: "start" }));
  }

  return h("div", { class: "sk-stack" }, cards.map((c) => c.el), suggestion);
}

export function partView(app: App, part: NPart, requestedTab: PartTab, query: Record<string, string>): ViewResult {
  const c = app.course;
  const exam = part.examRef;
  const tabs = availableTabs(part);
  const tab: PartTab = tabs.some((t) => t.tab === requestedTab) ? requestedTab : (tabs[0]?.tab ?? "lar");
  const host = tab === "kort" || tab === "quiz" ? partHost(app, part, tab) : null;
  const run = host ? savedRun(app, host, query) : null;
  if (host && run) return runningView(app, host, run);
  const m = partMastery(part, app.store.get(), app.today());

  const status = h("span", null, statusTag(m.status));
  const meter = progressMeter(m.percent, sv.part.mastery);
  const lessonsLine = h("p", { class: "sk-small sk-muted sk-num" }, sv.part.lessonsDone(m.lessonsDone, m.lessonsTotal));
  const refresh = () => {
    const mm = partMastery(part, app.store.get(), app.today());
    replace(status, statusTag(mm.status));
    meter.set(mm.percent);
    lessonsLine.textContent = sv.part.lessonsDone(mm.lessonsDone, mm.lessonsTotal);
  };

  let notesBtn: HTMLButtonElement;
  const notes = notesPanel(app, part, () => {
    notes.close();
    notesBtn.setAttribute("aria-expanded", "false");
    notesBtn.focus();
  });
  notesBtn = h(
    "button",
    { class: "sk-btn sk-btn--sm sk-notes__toggle", type: "button", "aria-controls": notes.el.id, "aria-expanded": "false", onclick: () => { notes.open(); notesBtn.setAttribute("aria-expanded", "true"); } },
    icon("notes", 16),
    sv.notes.open,
  );

  const eyebrowParts = [sv.part.eyebrow(c.title, exam?.title ?? "", part.n)];
  if (part.dates) eyebrowParts.push(part.dates);

  let panel: HTMLElement;
  if (tab === "lar") {
    const back = query.tillbaka === "1" ? returnCard(app) : null;
    panel = back ? h("div", { class: "sk-stack" }, back, learnPanel(app, part, query.lektion, refresh)) : learnPanel(app, part, query.lektion, refresh);
  } else if (host) panel = builderFor(app, host, query);
  else panel = practicePanel(app, part.practice, { showPart: false, path: to.part(part.id, "ova"), query, onChange: refresh });

  const page = h(
    "div",
    { class: "sk-page" },
    pageHead({
      eyebrow: eyebrowParts.join(" · "),
      tags: [status, exam?.status === "done" ? repetitionTag() : null],
      title: part.title,
      lead: part.summary,
      actions: h("div", { class: "sk-btnrow" }, notesBtn),
    }),
    part.goals?.length
      ? h("section", { class: "sk-card sk-goals", "aria-labelledby": `goals-${part.id}` },
          h("h2", { class: "sk-eyebrow", id: `goals-${part.id}` }, sv.part.goalsTitle),
          h("ul", null, part.goals.map((g) => h("li", null, app.mdInline(g)))),
        )
      : null,
    h("div", { class: "sk-stack sk-stack--2" }, h("p", { class: "sk-label" }, sv.part.mastery), meter.el, lessonsLine),
    tabs.length > 1 ? partTabs(part, tab) : null,
    h("div", { class: "sk-tabpanel", "data-tab": tab }, panel),
  );

  const unsub = app.store.subscribe(refresh);

  return {
    el: h("div", { class: "sk-pagegrid" }, page, notes.el),
    title: [TAB_LABEL[tab], part.title, c.title],
    crumbs: [
      { label: c.title, href: to.overview() },
      { label: partLabel(part), href: to.part(part.id) },
      { label: TAB_LABEL[tab], href: to.part(part.id, tab) },
    ],
    compact: { href: to.overview(), label: c.title, current: partLabel(part) },
    navKey: part.id,
    dispose: unsub,
  };
}
