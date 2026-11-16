/**
 * Öva: practice items as a list the student works through in any order (BUILD.md §4.7).
 * On a part page the list is that part's items; "#/omgang/ova" mixes parts (Urval: an exam or all).
 * A level filter (Alla · E · C · A) narrows the list; filters are kept in the URL.
 */
import { h, replace } from "../dom.ts";
import { sv } from "../i18n/sv.ts";
import type { App, ViewResult } from "../app.ts";
import type { NPractice } from "../course.ts";
import { buildQuery, replaceHash, to, type Query } from "../router.ts";
import { LEVELS, examsWithParts, partsOfUrval } from "../session.ts";
import type { Level } from "../types.ts";
import { practiceCard } from "../components/PracticeCard.ts";
import { chipGroup } from "../components/Chip.ts";
import { segmentedControl } from "../components/SegmentedControl.ts";
import { emptyState } from "../components/EmptyState.ts";
import { pageHead } from "../components/PageHead.ts";

function parseLevels(v: string | undefined): Level[] {
  if (!v || v === "alla") return [];
  const want = v.split(",").map((x) => x.trim().toUpperCase());
  return LEVELS.filter((l) => want.includes(l));
}

/** The list with its level filter. `items` is the full pool; `path` is where filters are written. */
export function practicePanel(app: App, items: NPractice[], opts: { showPart: boolean; path: string; query: Query; extra?: Query; onChange?: () => void }): HTMLElement {
  let levels = parseLevels(opts.query.niva);
  const summary = h("p", { class: "sk-small sk-muted sk-num", "aria-live": "polite", "data-practice-summary": "" });
  const cards = items.map((item, i) => ({ item, el: practiceCard(app, item, i, { showPart: opts.showPart, onChange: () => { paint(); opts.onChange?.(); } }) }));
  const empty = h("p", { class: "sk-muted", hidden: true }, sv.practice.empty);

  const paint = () => {
    const p = app.store.get();
    let shown = 0;
    let solved = 0;
    for (const c of cards) {
      const visible = !levels.length || (!!c.item.level && levels.includes(c.item.level));
      c.el.hidden = !visible;
      if (!visible) continue;
      shown++;
      if (p.practice[c.item.id]?.solved) solved++;
    }
    summary.textContent = sv.practice.summary(shown, solved);
    empty.hidden = shown > 0;
  };

  const hasLevels = items.some((x) => x.level);
  const filter = hasLevels
    ? chipGroup({
        legend: sv.session.level,
        key: "niva",
        allLabel: sv.session.all,
        options: LEVELS.map((l) => ({ value: l, label: l, title: sv.status.levelTip })),
        value: levels,
        onChange: (values) => {
          levels = LEVELS.filter((l) => values.includes(l));
          paint();
          replaceHash(opts.path + buildQuery({ ...(opts.extra ?? {}), niva: levels.length ? levels.join(",") : "" }));
        },
      })
    : null;
  paint();

  return h(
    "div",
    { class: "sk-stack sk-stack--4", "data-practice-list": "" },
    h("div", { class: "sk-practicebar" }, filter?.el ?? null, summary),
    empty,
    cards.map((c) => c.el),
  );
}

/** "#/omgang/ova": practice across parts. */
export function practicePageView(app: App, query: Query): ViewResult {
  const c = app.course;
  const exams = examsWithParts(c).filter((e) => c.partsOf(e.id).some((p) => p.practice.length));
  const options = [...exams.map((e) => ({ value: `prov:${e.id}`, label: sv.session.wholeExam(e.title.toLowerCase()) }))];
  if (exams.length > 1) options.push({ value: "allt", label: sv.session.everything });
  let urval = options.some((o) => o.value === query.urval) ? query.urval : (options[0]?.value ?? "allt");
  const path = to.session("ova");
  const listSlot = h("div");

  const paintList = () => {
    const items = partsOfUrval(c, urval, {}).flatMap((p) => p.practice);
    replace(
      listSlot,
      items.length
        ? practicePanel(app, items, { showPart: true, path, query, extra: { urval } })
        : emptyState(sv.session.modePracticePage, sv.practice.empty),
    );
  };

  const urvalControl =
    options.length > 1
      ? segmentedControl({
          legend: sv.session.selection,
          key: "urval",
          options,
          value: urval,
          onChange: (v) => {
            urval = v;
            query = { ...query, urval: v };
            replaceHash(path + buildQuery({ urval: v, niva: query.niva ?? "" }));
            paintList();
          },
        })
      : null;
  paintList();

  return {
    el: h(
      "div",
      { class: "sk-page" },
      pageHead({ eyebrow: c.title, title: sv.session.modePracticePage, lead: sv.session.pageLeadPractice }),
      urvalControl ? h("div", { class: "sk-card" }, urvalControl.el) : null,
      listSlot,
    ),
    title: [sv.session.modePracticePage, c.title],
    crumbs: [
      { label: c.title, href: to.overview() },
      { label: sv.session.modePracticePage, href: path },
    ],
    compact: { href: to.overview(), label: c.title, current: sv.session.modePracticePage },
    navKey: "",
  };
}
