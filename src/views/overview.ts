/**
 * Översikt (BUILD.md §4.2), top to bottom: course eyebrow and title, "Fortsätt plugga" hero,
 * countdown to the upcoming exam, four stat tiles, Aktuellt (upcoming exam's parts),
 * Repetera (done exam's parts, weakest first, plus its hub), and the first-visit intro card.
 */
import { h } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";
import type { App, ViewResult } from "../app.ts";
import { to } from "../router.ts";
import { doneExams, upcomingExam } from "../course.ts";
import { cardsDueToday, cardsKnown, examMastery, hasRealProgress, partMastery, studyKnown } from "../mastery.ts";
import { recommend } from "../recommend.ts";
import { percent } from "../format.ts";
import { pageHead } from "../components/PageHead.ts";
import { examCountdown } from "../components/ExamCountdown.ts";
import { statTile } from "../components/StatTile.ts";
import { partCard } from "../components/PartCard.ts";
import { introCard } from "../components/IntroCard.ts";
import { hubLabel } from "../components/Sidebar.ts";

export function overviewView(app: App): ViewResult {
  const c = app.course;
  const p = app.store.get();
  const today = app.today();
  const upcoming = upcomingExam(c);
  const review = doneExams(c)[0];
  const rec = recommend(c, p, today);

  const hero = h(
    "section",
    { class: "sk-card sk-card--raised sk-hero", "aria-labelledby": "hero-title" },
    h("p", { class: "sk-eyebrow" }, sv.overview.continueEyebrow),
    h("h2", { class: "sk-title", id: "hero-title" }, rec.title),
    rec.meta ? h("p", { class: "sk-muted" }, rec.meta) : null,
    h("div", { class: "sk-btnrow" },
      h("a", { class: "sk-btn sk-btn--primary", href: rec.href, "data-rule": rec.rule }, hasRealProgress(p) ? rec.button : sv.recommend.go, icon("right", 18)),
    ),
  );

  const known = cardsKnown(c, p);
  const due = cardsDueToday(c, p, today);
  const study = review ? studyKnown(c, review.id, p) : { known: 0, total: 0 };
  const stats = h(
    "section",
    { class: "sk-section", "aria-labelledby": "stats-title" },
    h("h2", { class: "sk-visually-hidden", id: "stats-title" }, sv.overview.statsHeading),
    h("div", { class: "sk-stats" },
      statTile(review ? percent(examMastery(c, review.id, p, today)) : percent(0), sv.stats.examReviewed(review?.title ?? "")),
      statTile(String(known.known), sv.stats.cardsKnown, known.total ? sv.stats.of(known.total) : undefined),
      statTile(String(due), sv.stats.cardsDue),
      statTile(String(study.known), sv.stats.questionsKnown, study.total ? sv.stats.of(study.total) : undefined),
    ),
  );

  const upcomingParts = upcoming ? c.partsOf(upcoming.id) : [];
  const current = upcoming && upcomingParts.length
    ? h("section", { class: "sk-section", "aria-labelledby": "current-title" },
        h("h2", { class: "sk-heading", id: "current-title" }, sv.overview.currentHeading(upcoming.title)),
        h("div", { class: "sk-stack" }, upcomingParts.map((part) => partCard(part, partMastery(part, p, today)))),
      )
    : null;

  const reviewSection = review
    ? h("section", { class: "sk-section", "aria-labelledby": "review-title" },
        h("h2", { class: "sk-heading", id: "review-title" }, sv.overview.reviewHeading(review.title)),
        h("div", { class: "sk-stack" },
          c.partsOf(review.id)
            .map((part) => ({ part, m: partMastery(part, p, today) }))
            .sort((a, b) => a.m.percent - b.m.percent || a.part.n - b.part.n)
            .map(({ part, m }) => partCard(part, m)),
          h("a", { class: "sk-card sk-partcard", href: to.hub(review.id), "data-hub": review.id },
            h("span", { class: "sk-partcard__main" },
              h("span", { class: "sk-partcard__title" }, hubLabel(review)),
              h("span", { class: "sk-small sk-muted" }, sv.overview.hubCardText),
            ),
            icon("right", 18),
          ),
        ),
      )
    : null;

  const page = h(
    "div",
    { class: "sk-page" },
    pageHead({ eyebrow: c.title, title: c.area, lead: c.teacher ? sv.overview.teacher(c.teacher) : undefined }),
    hero,
    upcoming ? examCountdown(app, upcoming) : null,
    stats,
    current,
    reviewSection,
    p.settings.introDismissed ? null : introCard(app, () => {}),
  );

  return {
    el: page,
    title: [sv.nav.overview, c.title],
    crumbs: [{ label: c.title, href: to.overview() }],
    compact: null,
    navKey: "overview",
  };
}
