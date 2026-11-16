/**
 * Mina framsteg (BUILD.md §4.9): everything about the student's own work.
 * Activity (last 7 and 28 days), mastery per exam and per part with status tags and study
 * questions, cards per Leitner box and due today / this week, Mina missar, quiz history,
 * where the data lives, saving and loading a copy (file or text code), adding Plugga to the home
 * screen, and reset per part, per exam or everything (each confirmed in words).
 */
import { h } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";
import type { App, ViewResult } from "../app.ts";
import type { NPart } from "../course.ts";
import type { Exam } from "../types.ts";
import { navigate, to } from "../router.ts";
import { boxCounts, cardsDueBy, cardsDueToday, examMastery, partMastery, studyKnown } from "../mastery.ts";
import { addDays } from "../format.ts";
import { pageHead } from "../components/PageHead.ts";
import { progressMeter } from "../components/ProgressMeter.ts";
import { statusTag } from "../components/Tag.ts";
import { statTile } from "../components/StatTile.ts";
import { activityStrip } from "../components/ActivityStrip.ts";
import { quizHistory } from "../components/QuizHistory.ts";
import { emptyProgress, type Progress } from "../store/progress.ts";
import { backupPanel } from "../components/Backup.ts";
import { isPersisted } from "../pwa.ts";

function clearPart(app: App, p: Progress, part: NPart): void {
  for (const l of part.lessons) delete p.lessons[l.id];
  for (const card of part.cards) delete p.cards[card.id];
  for (const t of app.course.termsOf(part.id)) delete p.cards[app.course.termCard(t).id];
  delete p.quiz.best[part.id];
  p.quiz.attempts = p.quiz.attempts.filter((a) => a.scope !== part.id);
  for (const q of part.quiz) delete p.missed[q.id];
  for (const x of part.practice) delete p.practice[x.id];
}

function clearExam(app: App, p: Progress, exam: Exam): void {
  for (const part of app.course.partsOf(exam.id)) clearPart(app, p, part);
  for (const q of exam.studyQuestions ?? []) delete p.study[q.id];
  p.quiz.attempts = p.quiz.attempts.filter((a) => a.scope !== `prov:${exam.id}`);
}

export function progressView(app: App): ViewResult {
  const c = app.course;
  const p = app.store.get();
  const today = app.today();

  // ---------- Mastery per exam and part ----------
  const examBlocks = c.exams
    .filter((e) => c.partsOf(e.id).length > 0)
    .map((exam) => {
      const study = studyKnown(c, exam.id, p);
      return h("section", { class: "sk-card sk-stack", "aria-labelledby": `prog-${exam.id}`, "data-exam": exam.id },
        h("h2", { class: "sk-heading", id: `prog-${exam.id}` }, exam.title),
        progressMeter(examMastery(c, exam.id, p, today), `${exam.title}: ${sv.part.mastery}`).el,
        h("ul", { class: "sk-plainlist sk-stack" },
          c.partsOf(exam.id).map((part) => {
            const m = partMastery(part, p, today);
            return h("li", { class: "sk-stack sk-stack--2", "data-part": part.id },
              h("div", { class: "sk-sectionhead" },
                h("a", { href: to.part(part.id) }, `${sv.nav.part(part.n)} · ${part.title}`),
                statusTag(m.status),
              ),
              progressMeter(m.percent, `${sv.nav.part(part.n)}: ${sv.part.mastery}`).el,
            );
          }),
        ),
        study.total
          ? h("p", { class: "sk-small" },
              h("a", { href: to.hub(exam.id, "fragor") }, `${sv.progress.studyTitle}: ${sv.study.known(study.known, study.total)}`),
            )
          : null,
      );
    });

  // ---------- Cards ----------
  const boxes = boxCounts(c, p);
  const dueToday = cardsDueToday(c, p, today);
  const dueWeek = cardsDueBy(c, p, addDays(today, 6));
  const cardsBlock = h("section", { class: "sk-card sk-stack", "aria-labelledby": "prog-cards", "data-boxes": boxes.join(",") },
    h("h2", { class: "sk-heading", id: "prog-cards" }, sv.progress.cardsTitle),
    h("div", { class: "sk-boxes" }, boxes.map((n, i) => statTile(String(n), sv.progress.box(i + 1)))),
    h("p", { class: "sk-small sk-muted" }, sv.progress.boxNote),
    h("div", { class: "sk-stats sk-stats--2" },
      statTile(String(dueToday), sv.progress.dueToday),
      statTile(String(dueWeek), sv.progress.dueWeek),
    ),
    dueToday ? h("div", { class: "sk-btnrow" }, h("a", { class: "sk-btn sk-btn--primary", href: to.session("kort", { urval: "idag", antal: "alla" }) }, icon("flip", 18), sv.progress.reviewToday)) : null,
  );

  // ---------- Mina missar ----------
  const missed = Object.keys(p.missed).filter((id) => c.quizById.has(id)).length;
  const missedBlock = h("section", { class: "sk-card sk-stack", "aria-labelledby": "prog-missed", "data-missed": missed },
    h("h2", { class: "sk-heading", id: "prog-missed" }, sv.progress.mistakesTitle),
    h("p", null, missed ? sv.progress.mistakesCount(missed) : sv.progress.mistakesEmpty),
    h("p", { class: "sk-small sk-muted" }, sv.progress.mistakesNote),
    missed ? h("div", { class: "sk-btnrow" }, h("a", { class: "sk-btn", href: to.session("quiz", { urval: "missar", antal: "alla" }) }, icon("reset", 18), sv.results.practiseMistakes)) : null,
  );

  // ---------- Quiz history ----------
  const historyBlock = h("section", { class: "sk-card sk-stack", "aria-labelledby": "prog-history" },
    h("h2", { class: "sk-heading", id: "prog-history" }, sv.progress.historyTitle),
    p.quiz.attempts.length ? h("p", { class: "sk-small sk-muted" }, sv.progress.historyNote) : null,
    quizHistory(app, p.quiz.attempts),
  );

  // ---------- Reset ----------
  const select = h("select", { class: "sk-select", id: "reset-what" },
    h("option", { value: "allt" }, sv.progress.resetEverything),
    c.exams
      .filter((e) => c.partsOf(e.id).length > 0)
      .map((e) =>
        h("optgroup", { label: e.title },
          h("option", { value: `prov:${e.id}` }, sv.progress.resetExamOption(e.title.toLowerCase())),
          c.partsOf(e.id).map((part) => h("option", { value: `del:${part.id}` }, `${sv.nav.part(part.n)} · ${part.title}`)),
        ),
      ),
  );
  const resetBtn = h("button", { class: "sk-btn", type: "button", "data-reset": "" }, icon("reset", 18), sv.progress.resetButton);
  resetBtn.addEventListener("click", async () => {
    const v = select.value;
    if (v === "allt") {
      const ok = await app.confirm({ title: sv.progress.resetConfirmTitle, text: sv.progress.resetConfirmText, confirm: sv.progress.resetConfirm, cancel: sv.progress.cancel });
      if (!ok) return;
      app.store.replace(emptyProgress(c.id));
      app.store.flush();
      app.toast(sv.progress.resetDone);
    } else if (v.startsWith("prov:")) {
      const exam = c.examById.get(v.slice(5));
      if (!exam) return;
      const ok = await app.confirm({ title: sv.progress.resetExamTitle(exam.title.toLowerCase()), text: sv.progress.resetExamText(exam.title.toLowerCase()), confirm: sv.progress.resetButton, cancel: sv.progress.cancel });
      if (!ok) return;
      app.store.update((pp) => clearExam(app, pp, exam), { activity: false });
      app.toast(sv.progress.resetPartDone(exam.title));
    } else {
      const part = c.partById.get(v.slice(4));
      if (!part) return;
      const label = `${sv.nav.part(part.n)} · ${part.title}`;
      const ok = await app.confirm({ title: sv.progress.resetPartTitle(label), text: sv.progress.resetPartText(label), confirm: sv.progress.resetButton, cancel: sv.progress.cancel });
      if (!ok) return;
      app.store.update((pp) => clearPart(app, pp, part), { activity: false });
      app.toast(sv.progress.resetPartDone(label));
    }
    app.store.flush();
    navigate(to.progress());
  });

  const persistedLine = h("p", { class: "sk-small sk-muted", hidden: true, "data-persisted": "" }, sv.backup.persisted);
  void isPersisted().then((yes) => {
    persistedLine.hidden = !yes;
  });

  const page = h(
    "div",
    { class: "sk-page" },
    pageHead({ eyebrow: c.title, title: sv.progress.title, lead: sv.progress.lead }),
    h("section", { class: "sk-card sk-stack", "aria-labelledby": "prog-activity" },
      h("h2", { class: "sk-eyebrow", id: "prog-activity" }, sv.progress.activityTitle),
      activityStrip(p, today),
    ),
    examBlocks,
    cardsBlock,
    missedBlock,
    historyBlock,
    h("section", { class: "sk-card sk-stack", "aria-labelledby": "prog-privacy" },
      h("h2", { class: "sk-heading", id: "prog-privacy" }, sv.progress.privacyTitle),
      h("p", null, sv.progress.privacy),
      __BUILD_TARGET__ === "backup" ? h("p", { class: "sk-box sk-box--mistake", "data-backup-file-note": "" }, sv.backup.backupFileNote) : null,
      persistedLine,
    ),
    backupPanel(app),
    __BUILD_TARGET__ === "backup"
      ? null
      : h("section", { class: "sk-card sk-stack", "aria-labelledby": "prog-install", "data-install": "" },
          h("h2", { class: "sk-heading", id: "prog-install" }, sv.install.title),
          h("p", null, sv.install.text),
          h("ul", { class: "sk-list sk-list--2" }, h("li", null, app.mdInline(sv.install.iphone)), h("li", null, app.mdInline(sv.install.android))),
          h("p", { class: "sk-small sk-muted" }, sv.install.iphoneStorage),
        ),
    h("section", { class: "sk-card sk-stack", "aria-labelledby": "prog-reset" },
      h("h2", { class: "sk-heading", id: "prog-reset" }, sv.progress.resetTitle),
      h("div", { class: "sk-stack sk-stack--2" }, h("label", { class: "sk-label", for: "reset-what" }, sv.progress.resetWhat), select),
      h("div", { class: "sk-btnrow" }, resetBtn),
    ),
  );

  return {
    el: page,
    title: [sv.progress.title, c.title],
    crumbs: [
      { label: c.title, href: to.overview() },
      { label: sv.progress.title, href: to.progress() },
    ],
    compact: { href: to.overview(), label: c.title, current: sv.progress.title },
    navKey: "progress",
  };
}
