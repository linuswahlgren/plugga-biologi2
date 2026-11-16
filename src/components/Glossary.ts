/**
 * Glossary (Begreppslista, BUILD.md §4.8): every term of an exam, grouped under its concept-list
 * theme. A search field that ignores case and diacritics ("vaxt" finds "växt"), the filter
 * "Bara de jag inte kan", and "Öva som kort". A term "sitter" when its card is in box 3 or higher.
 */
import { h } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";
import type { App } from "../app.ts";
import type { Exam, Term } from "../types.ts";
import { to } from "../router.ts";
import { plainText } from "../markup.ts";
import { KNOWN_BOX } from "../mastery.ts";
import { termsOfExam } from "../session.ts";
import { extraTermTag, supplementTag } from "./Tag.ts";
import { printView } from "../print.ts";

/** Lower case without diacritics, for searching only. Answer matching keeps å, ä and ö apart. */
export function searchKey(s: string): string {
  return s.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase("sv-SE");
}

export function glossary(app: App, exam: Exam): HTMLElement {
  const c = app.course;
  const terms = termsOfExam(c, exam.id);
  const themes = [...(exam.themes ?? [])];
  for (const t of terms) if (!themes.includes(t.theme)) themes.push(t.theme);
  const isKnown = (t: Term) => (app.store.get().cards[c.termCard(t).id]?.box ?? 0) >= KNOWN_BOX;

  const searchInput = h("input", { class: "sk-input", id: `gl-search-${exam.id}`, type: "search", autocomplete: "off", spellcheck: "false", placeholder: sv.glossary.searchPlaceholder });
  const onlyUnknown = h("input", { type: "checkbox", class: "sk-choice__input", id: `gl-unknown-${exam.id}` });
  const countLine = h("p", { class: "sk-small sk-muted sk-num", "aria-live": "polite", "data-glossary-count": "" });
  const none = h("p", { class: "sk-muted sk-noprint", hidden: true }, sv.glossary.none);

  const entries = terms.map((t) => {
    const part = c.partById.get(t.week);
    const knownTag = h("span", { class: "sk-tag sk-tag--accent" }, icon("check", 16), sv.glossary.known);
    const el = h(
      "li",
      { class: "sk-term", "data-term": t.id },
      h("div", { class: "sk-tagrow" },
        h("strong", { class: "sk-term__name" }, t.term),
        t.supplement ? supplementTag() : null,
        t.extra ? extraTermTag() : null,
        knownTag,
      ),
      h("span", null, app.mdInline(t.definition)),
      t.lesson && part ? h("a", { class: "sk-small", href: to.lesson(part.id, t.lesson) }, sv.glossary.readLesson) : null,
    );
    return { t, el, knownTag, key: searchKey(`${t.term} ${plainText(t.definition)}`), nameKey: searchKey(t.term) };
  });

  const sections = themes
    .map((theme) => {
      const list = entries.filter((e) => e.t.theme === theme);
      if (!list.length) return null;
      const id = `gl-${exam.id}-${themes.indexOf(theme)}`;
      const el = h("section", { class: "sk-card sk-stack", "aria-labelledby": id }, h("h3", { class: "sk-heading", id }, theme), h("ul", { class: "sk-plainlist sk-terms sk-stack" }, list.map((e) => e.el)));
      return { el, list };
    })
    .filter((x): x is { el: HTMLElement; list: typeof entries } => !!x);

  const paint = () => {
    const q = searchKey(searchInput.value.trim());
    let shown = 0;
    for (const e of entries) {
      const known = isKnown(e.t);
      e.knownTag.hidden = !known;
      const visible = (!q || e.key.includes(q)) && (!onlyUnknown.checked || !known);
      e.el.hidden = !visible;
      if (visible) shown++;
    }
    for (const s of sections) s.el.hidden = s.list.every((e) => e.el.hidden);
    countLine.textContent = sv.glossary.showing(shown, entries.length);
    none.hidden = shown > 0;
  };
  searchInput.addEventListener("input", paint);
  onlyUnknown.addEventListener("change", paint);
  paint();

  return h(
    "div",
    { class: "sk-stack sk-stack--4", "data-glossary": exam.id },
    h("section", { class: "sk-card sk-stack sk-noprint" },
      h("p", { class: "sk-muted" }, sv.glossary.intro),
      h("div", { class: "sk-stack sk-stack--2" },
        h("label", { class: "sk-label", for: searchInput.id }, sv.glossary.search),
        h("span", { class: "sk-inputwrap sk-inputwrap--search" }, h("span", { class: "sk-inputwrap__icon" }, icon("search", 18)), searchInput),
      ),
      h("label", { class: "sk-choice", for: onlyUnknown.id }, onlyUnknown, h("span", { class: "sk-choice__label" }, sv.glossary.onlyUnknown)),
      h("div", { class: "sk-sectionhead" },
        countLine,
        h("div", { class: "sk-btnrow" },
          h("a", { class: "sk-btn", href: to.session("kort", { urval: `begrepp:${exam.id}` }) }, icon("flip", 18), sv.glossary.practise),
          h("button", { class: "sk-btn", type: "button", "data-print-button": "begrepp", onclick: () => printView("begrepp") }, icon("print", 18), sv.print.button),
        ),
      ),
    ),
    none,
    sections.map((s) => s.el),
  );
}
