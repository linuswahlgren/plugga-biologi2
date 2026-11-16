/**
 * "Fortsätt plugga": the single recommended next step (BUILD.md §4.9). First match wins.
 *  1. An unfinished session                          -> "Fortsätt där du slutade"
 *  2. 10+ cards due                                  -> "Repetera 12 kort"
 *  3. The upcoming exam has parts: next unread lesson there, then its quiz
 *  4. The upcoming exam is within 14 days and has parts -> exam simulation
 *  5. Weakest part of the latest done exam below 70 %  -> "Repetera del 2"
 *  6. Mina missar not empty                          -> "Öva på missarna"
 *  7. Otherwise                                      -> mixed quiz from the latest done exam
 */
import type { NCourse } from "./course.ts";
import { doneExams, upcomingExam } from "./course.ts";
import type { Progress } from "./store/progress.ts";
import { cardsDueToday, partMastery } from "./mastery.ts";
import { daysBetween, todayISO } from "./format.ts";
import { to } from "./router.ts";
import { sv } from "./i18n/sv.ts";

export interface Recommendation {
  rule: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 0;
  title: string;
  meta?: string;
  href: string;
  button: string;
}

export function recommend(c: NCourse, p: Progress, today = todayISO()): Recommendation {
  if (p.session) {
    return { rule: 1, title: sv.recommend.resume, meta: p.session.label, href: p.session.route, button: sv.recommend.goContinue };
  }

  const due = cardsDueToday(c, p, today);
  if (due >= 10) {
    return { rule: 2, title: sv.recommend.reviewCards(due), href: to.session("kort", { urval: "idag" }), button: sv.recommend.goContinue };
  }

  const upcoming = upcomingExam(c);
  const upcomingParts = upcoming ? c.partsOf(upcoming.id) : [];
  if (upcoming && upcomingParts.length) {
    for (const part of upcomingParts) {
      const next = part.lessons.find((l) => !p.lessons[l.id]);
      if (next) {
        return {
          rule: 3,
          title: sv.recommend.nextLesson(next.title),
          meta: sv.recommend.metaLesson(`${sv.nav.part(part.n)} · ${part.title}`, next.minutes),
          href: to.lesson(part.id, next.id),
          button: sv.recommend.goContinue,
        };
      }
      if (part.quiz.length && !(part.id in p.quiz.best)) {
        return { rule: 3, title: sv.recommend.takeQuiz(part.title), href: to.part(part.id, "quiz"), button: sv.recommend.goContinue };
      }
    }
    if (upcoming.date && daysBetween(today, upcoming.date) <= 14 && daysBetween(today, upcoming.date) >= 0) {
      return {
        rule: 4,
        title: sv.recommend.examSimulation(upcoming.title.toLowerCase()),
        href: to.hub(upcoming.id, "simulering"),
        button: sv.recommend.goContinue,
      };
    }
  }

  const done = doneExams(c)[0];
  if (done) {
    const parts = c.partsOf(done.id);
    const ranked = parts
      .map((part) => ({ part, m: partMastery(part, p, today) }))
      .sort((a, b) => a.m.percent - b.m.percent || a.part.n - b.part.n);
    const weakest = ranked[0];
    if (weakest && weakest.m.percent < 70) {
      const next = weakest.part.lessons.find((l) => !p.lessons[l.id]);
      return {
        rule: 5,
        title: sv.recommend.reviewPart(weakest.part.n),
        meta: weakest.part.title,
        href: next ? to.lesson(weakest.part.id, next.id) : to.part(weakest.part.id),
        button: sv.recommend.goContinue,
      };
    }
  }

  if (Object.keys(p.missed).length > 0) {
    return { rule: 6, title: sv.recommend.practiseMistakes, href: to.session("quiz", { urval: "missar" }), button: sv.recommend.goContinue };
  }

  if (done) {
    return {
      rule: 7,
      title: sv.recommend.mixedQuiz(done.title.toLowerCase()),
      href: to.session("quiz", { urval: `prov:${done.id}`, antal: "10" }),
      button: sv.recommend.goContinue,
    };
  }
  const first = c.parts[0];
  return { rule: 0, title: sv.recommend.startFirst, href: first ? to.part(first.id) : to.overview(), button: sv.recommend.go };
}
