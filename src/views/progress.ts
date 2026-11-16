/**
 * Mina framsteg (BUILD.md §4.9). Phase 1: mastery per exam and per part with status tags,
 * where the data lives, and reset everything. Quiz history, cards per box, activity strip,
 * backup and per-part reset follow in Phase 2 and 4.
 */
import { h } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";
import type { App, ViewResult } from "../app.ts";
import { to } from "../router.ts";
import { examMastery, partMastery } from "../mastery.ts";
import { pageHead } from "../components/PageHead.ts";
import { progressMeter } from "../components/ProgressMeter.ts";
import { statusTag } from "../components/Tag.ts";
import { emptyProgress } from "../store/progress.ts";

export function progressView(app: App): ViewResult {
  const c = app.course;
  const p = app.store.get();
  const today = app.today();

  const examBlocks = c.exams
    .filter((e) => c.partsOf(e.id).length > 0)
    .map((exam) =>
      h("section", { class: "sk-card sk-stack", "aria-labelledby": `prog-${exam.id}` },
        h("h2", { class: "sk-heading", id: `prog-${exam.id}` }, exam.title),
        progressMeter(examMastery(c, exam.id, p, today), `${exam.title}: ${sv.part.mastery}`).el,
        h("ul", { class: "sk-plainlist sk-stack" },
          c.partsOf(exam.id).map((part) => {
            const m = partMastery(part, p, today);
            return h("li", { class: "sk-stack sk-stack--2" },
              h("div", { class: "sk-sectionhead" },
                h("a", { href: to.part(part.id) }, `${sv.nav.part(part.n)} · ${part.title}`),
                statusTag(m.status),
              ),
              progressMeter(m.percent, `${sv.nav.part(part.n)}: ${sv.part.mastery}`).el,
            );
          }),
        ),
      ),
    );

  const resetBtn = h("button", { class: "sk-btn", type: "button" }, icon("reset", 18), sv.progress.resetAll);
  resetBtn.addEventListener("click", async () => {
    const ok = await app.confirm({ title: sv.progress.resetConfirmTitle, text: sv.progress.resetConfirmText, confirm: sv.progress.resetConfirm, cancel: sv.progress.cancel });
    if (!ok) return;
    app.store.replace(emptyProgress(c.id));
    app.store.flush();
    app.toast(sv.progress.resetDone);
    location.hash = to.progress();
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });

  const page = h(
    "div",
    { class: "sk-page" },
    pageHead({ eyebrow: c.title, title: sv.progress.title, lead: sv.progress.lead }),
    examBlocks,
    h("section", { class: "sk-card sk-stack", "aria-labelledby": "prog-privacy" },
      h("h2", { class: "sk-heading", id: "prog-privacy" }, sv.progress.privacyTitle),
      h("p", null, sv.progress.privacy),
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
