/**
 * Exam hub (BUILD.md §4.8): one per exam, in the sidebar above that exam's parts.
 * Sections: Läsanvisningar · Instuderingsfrågor · Begreppslista · Provsimulering · Om materialet.
 * A section is hidden while it has no content. An upcoming exam without parts shows the countdown
 * and the empty state instead.
 */
import { h } from "../dom.ts";
import { sv } from "../i18n/sv.ts";
import type { App, ViewResult } from "../app.ts";
import type { Exam } from "../types.ts";
import { to, type HubSection } from "../router.ts";
import { pageHead } from "../components/PageHead.ts";
import { examCountdown } from "../components/ExamCountdown.ts";
import { emptyState } from "../components/EmptyState.ts";
import { hubLabel } from "../components/Sidebar.ts";
import { longDayMonth } from "../format.ts";

const SECTION_LABEL: Record<HubSection, string> = {
  lasanvisningar: sv.hubTabs.reading,
  fragor: sv.hubTabs.questions,
  begrepp: sv.hubTabs.glossary,
  simulering: sv.hubTabs.simulation,
  om: sv.hubTabs.about,
};

export function hubSections(app: App, exam: Exam): HubSection[] {
  const parts = app.course.partsOf(exam.id);
  const partIds = new Set(parts.map((p) => p.id));
  const out: HubSection[] = [];
  if (exam.readingList?.length || exam.lectures?.length) out.push("lasanvisningar");
  if (exam.studyQuestions?.length) out.push("fragor");
  if (app.course.glossary.some((t) => partIds.has(t.week))) out.push("begrepp");
  if (parts.some((p) => p.quiz.length)) out.push("simulering");
  if (exam.corrections?.length || exam.status === "done") out.push("om");
  return out;
}

function readingSection(exam: Exam): HTMLElement {
  return h("div", { class: "sk-stack sk-stack--4" },
    h("section", { class: "sk-card sk-stack" },
      h("h2", { class: "sk-heading" }, sv.hubTabs.reading),
      h("p", { class: "sk-muted" }, sv.hub.readingIntro),
      exam.readingList?.length ? h("ul", { class: "sk-readinglist" }, exam.readingList.map((r) => h("li", null, r))) : null,
    ),
    exam.lectures?.length
      ? h("section", { class: "sk-card sk-stack" },
          h("h2", { class: "sk-heading" }, sv.hub.lecturesHeading),
          h("ul", { class: "sk-list" }, exam.lectures.map((l) => h("li", null, l))),
        )
      : null,
  );
}

function aboutSection(app: App, exam: Exam): HTMLElement {
  return h("div", { class: "sk-stack sk-stack--4" },
    exam.corrections?.length
      ? h("section", { class: "sk-card sk-stack" },
          h("h2", { class: "sk-heading" }, sv.hubTabs.about),
          h("p", null, sv.hub.aboutIntro),
          h("div", { class: "sk-tablewrap" },
            h("table", { class: "sk-table" },
              h("thead", null, h("tr", null,
                h("th", { scope: "col" }, sv.hub.aboutWhere),
                h("th", { scope: "col" }, sv.hub.aboutMaterial),
                h("th", { scope: "col" }, sv.hub.aboutCorrected),
              )),
              h("tbody", null, exam.corrections.map((k) => h("tr", null,
                h("td", null, app.mdInline(k.where)),
                h("td", null, app.mdInline(k.material)),
                h("td", null, app.mdInline(k.corrected)),
              ))),
            ),
          ),
        )
      : null,
    h("section", { class: "sk-card sk-stack" },
      h("h2", { class: "sk-heading" }, sv.hub.aboutSupplementTitle),
      app.md(sv.hub.aboutSupplementText),
    ),
    h("section", { class: "sk-card sk-stack" },
      h("h2", { class: "sk-heading" }, sv.hub.sourcesTitle),
      h("p", null, sv.hub.sourcesText),
    ),
  );
}

export function hubView(app: App, exam: Exam, requested: HubSection | null): ViewResult {
  const c = app.course;
  const sections = hubSections(app, exam);
  const section = requested && sections.includes(requested) ? requested : (sections[0] ?? null);
  const title = hubLabel(exam);
  const isUpcoming = exam.status === "upcoming";
  const hasParts = c.partsOf(exam.id).length > 0;

  let body: HTMLElement;
  if (!section) body = emptyState(title, sv.hub.leadUpcoming);
  else if (section === "lasanvisningar") body = readingSection(exam);
  else if (section === "om") body = aboutSection(app, exam);
  else body = emptyState(SECTION_LABEL[section], sv.part.comingInPhase);

  const nav = sections.length > 1
    ? h("nav", { class: "sk-tabs", "aria-label": title },
        sections.map((s) =>
          h("a", { class: "sk-tab", href: to.hub(exam.id, s), "aria-current": s === section ? "page" : null }, SECTION_LABEL[s]),
        ),
      )
    : null;

  const page = h(
    "div",
    { class: "sk-page" },
    pageHead({
      eyebrow: sv.hub.eyebrow(c.title, exam.title),
      title: isUpcoming ? sv.hub.titleUpcoming(exam.title.toLowerCase(), exam.date ? longDayMonth(exam.date) : "") : sv.hub.titleDone(exam.title.toLowerCase()),
      lead: isUpcoming ? sv.hub.leadUpcoming : exam.topic ? sv.hub.leadDone(exam.topic) : undefined,
    }),
    isUpcoming ? examCountdown(app, exam) : null,
    isUpcoming && !hasParts ? null : [nav, h("div", { class: "sk-tabpanel", "data-section": section ?? "" }, body)],
  );

  const crumbs = [
    { label: c.title, href: to.overview() },
    { label: exam.title, href: to.hub(exam.id) },
  ];
  if (section && sections.length > 1) crumbs.push({ label: SECTION_LABEL[section], href: to.hub(exam.id, section) });

  return {
    el: page,
    title: [section && sections.length > 1 ? SECTION_LABEL[section] : "", title, c.title],
    crumbs,
    compact: { href: to.overview(), label: c.title, current: title },
    navKey: `hub:${exam.id}`,
  };
}
