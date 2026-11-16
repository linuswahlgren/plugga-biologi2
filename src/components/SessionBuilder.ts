/**
 * SessionBuilder ("Välj omgång", BUILD.md §4.4): an inline panel above every card and quiz session.
 * Urval, Antal (options larger than the pool are disabled), Nivå (quiz), Ordning, Läge and Tid (quiz),
 * Vänd korten (cards). Shows the pool size live and names the result on the start button.
 * Settings come from the URL first, then the last choice for the mode, then defaults; every change is
 * written back to the URL so a shared link opens the same panel. It never starts by itself.
 */
import { h, replace } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";
import type { App } from "../app.ts";
import { buildQuery, navigate, replaceHash, to, type Query } from "../router.ts";
import {
  COUNT_OPTIONS,
  LEVELS,
  TIME_OPTIONS,
  cardPool,
  defaultExam,
  examsWithParts,
  parseSettings,
  quizPool,
  sessionCount,
  settingsQuery,
  termsOfExam,
  type SessionKind,
  type SessionScope,
  type SessionSettings,
} from "../session.ts";
import { segmentedControl } from "./SegmentedControl.ts";
import { chipGroup } from "./Chip.ts";

export interface BuilderContext {
  kind: SessionKind;
  scope: SessionScope;
  /** Hash path (no query) of the view that hosts the builder. */
  path: string;
  /** Show "Snabbquiz 5 · Repetera idag · Provsimulering 20" above the panel. */
  presets: boolean;
  /** Use and keep the last choice for this mode. */
  remember: boolean;
  /** Optional text above the controls. */
  intro?: string;
}

function presetRow(app: App, ctx: BuilderContext): HTMLElement {
  const c = app.course;
  const part = ctx.scope.part;
  const quizPath = part ? to.part(part.id, "quiz") : to.session("quiz");
  const exam = defaultExam(c, ctx.scope);
  const presets: { label: string; target: string; icon: "bulb" | "flip" | "clock" }[] = [
    {
      label: sv.session.presetQuick,
      icon: "bulb",
      target: quizPath + buildQuery({ urval: part ? "del" : exam ? `prov:${exam.id}` : "allt", antal: "5", niva: "alla", ordning: "blandad", lage: "ova" }),
    },
    { label: sv.session.presetToday, icon: "flip", target: to.session("kort", { urval: "idag", antal: "alla", ordning: "blandad" }) },
  ];
  if (exam) {
    presets.push({
      label: sv.session.presetExam,
      icon: "clock",
      target: quizPath + buildQuery({ urval: `prov:${exam.id}`, antal: "20", niva: "alla", ordning: "blandad", lage: "prov", tid: "20" }),
    });
  }
  return h(
    "div",
    { class: "sk-presets", role: "group", "aria-label": sv.session.presets },
    presets.map((pr) =>
      h("button", { class: "sk-btn sk-btn--sm", type: "button", "data-preset": pr.label, onclick: () => navigate(pr.target) }, icon(pr.icon, 16), pr.label),
    ),
  );
}

export function sessionBuilder(app: App, ctx: BuilderContext, query: Query, onStart: (s: SessionSettings) => void): HTMLElement {
  const c = app.course;
  const today = app.today();
  const isQuiz = ctx.kind === "quiz";
  const remembered = ctx.remember ? app.store.get().settings.sessionDefaults[ctx.kind] : undefined;
  const s = parseSettings(ctx.kind, query, remembered, c, ctx.scope);

  const poolOf = (urval: string) =>
    isQuiz ? quizPool(c, app.store.get(), urval, s.niva, ctx.scope).length : cardPool(c, app.store.get(), urval, ctx.scope, today).length;

  // ---------- Urval ----------
  const exams = examsWithParts(c);
  const choices: { value: string; label: string }[] = [];
  if (ctx.scope.part) choices.push({ value: "del", label: sv.session.thisPart });
  if (c.parts.length > 1) choices.push({ value: "delar", label: sv.session.chooseParts });
  for (const e of exams) choices.push({ value: `prov:${e.id}`, label: sv.session.wholeExam(e.title.toLowerCase()) });
  if (exams.length > 1 || s.urval === "allt") choices.push({ value: "allt", label: sv.session.everything });
  if (isQuiz) choices.push({ value: "missar", label: sv.session.mistakes });
  else {
    choices.push({ value: "idag", label: sv.session.dueToday });
    for (const e of exams) if (termsOfExam(c, e.id).length) choices.push({ value: `begrepp:${e.id}`, label: sv.session.glossary(e.title.toLowerCase()) });
  }

  let picked: string[] = s.urval.startsWith("delar:") ? s.urval.slice(6).split(",") : ctx.scope.part ? [ctx.scope.part.id] : [];
  const delarValue = () => `delar:${c.parts.filter((p) => picked.includes(p.id)).map((p) => p.id).join(",")}`;
  const radioValue = () => (s.urval.startsWith("delar:") ? "delar" : s.urval);

  const urvalName = `urval-${ctx.kind}`;
  const choiceEls = choices.map((ch) => {
    const input = h("input", { type: "radio", name: urvalName, value: ch.value, class: "sk-choice__input" });
    input.checked = ch.value === radioValue();
    const count = h("span", { class: "sk-choice__count sk-num" });
    input.addEventListener("change", () => {
      if (!input.checked) return;
      s.urval = ch.value === "delar" ? delarValue() : ch.value;
      update(true);
    });
    return { ch, input, count, el: h("label", { class: "sk-choice" }, input, h("span", { class: "sk-choice__label" }, ch.label), count) };
  });

  const partBoxes = c.parts.map((part) => {
    const input = h("input", { type: "checkbox", value: part.id, class: "sk-choice__input" });
    input.checked = picked.includes(part.id);
    const count = h("span", { class: "sk-choice__count sk-num" });
    input.addEventListener("change", () => {
      picked = c.parts.filter((p) => (p.id === part.id ? input.checked : picked.includes(p.id))).map((p) => p.id);
      s.urval = delarValue();
      update(true);
    });
    return { part, input, count, el: h("label", { class: "sk-choice" }, input, h("span", { class: "sk-choice__label" }, `${sv.nav.part(part.n)} · ${part.title}`), count) };
  });
  const partPick = h(
    "fieldset",
    { class: "sk-partpick", hidden: true },
    h("legend", { class: "sk-visually-hidden" }, sv.session.partsLegend),
    exams.map((e) =>
      h("div", { class: "sk-stack sk-stack--2" },
        h("p", { class: "sk-eyebrow" }, e.title),
        partBoxes.filter((b) => b.part.exam === e.id).map((b) => b.el),
      ),
    ),
  );

  const urvalField = h(
    "fieldset",
    { class: "sk-field", "data-control": "urval" },
    h("legend", { class: "sk-label" }, sv.session.selection),
    h("div", { class: "sk-choices" }, choiceEls.map((x) => x.el)),
    partPick,
  );

  // ---------- Antal ----------
  const counts = COUNT_OPTIONS[ctx.kind];
  const antal = segmentedControl({
    legend: sv.session.count,
    key: "antal",
    options: [...counts.map((n) => ({ value: String(n), label: String(n) })), { value: "alla", label: sv.session.all }],
    value: String(s.antal),
    onChange: (v) => {
      s.antal = v === "alla" ? "alla" : Number(v);
      update(true);
    },
  });

  // ---------- Nivå (quiz) ----------
  const niva = isQuiz
    ? chipGroup({
        legend: sv.session.level,
        key: "niva",
        allLabel: sv.session.all,
        options: LEVELS.map((l) => ({ value: l, label: l, title: sv.status.levelTip })),
        value: s.niva,
        onChange: (values) => {
          s.niva = LEVELS.filter((l) => values.includes(l));
          update(true);
        },
      })
    : null;

  // ---------- Ordning ----------
  const ordning = segmentedControl({
    legend: sv.session.order,
    key: "ordning",
    options: [
      { value: "blandad", label: sv.session.shuffled },
      { value: "ordning", label: sv.session.inOrder },
    ],
    value: s.ordning,
    onChange: (v) => {
      s.ordning = v === "ordning" ? "ordning" : "blandad";
      update(true);
    },
  });

  // ---------- Läge and Tid (quiz) ----------
  const modeHint = h("p", { class: "sk-small sk-muted sk-field__hint" });
  const lage = isQuiz
    ? segmentedControl({
        legend: sv.session.mode,
        key: "lage",
        options: [
          { value: "ova", label: sv.session.modePractice },
          { value: "prov", label: sv.session.modeExamOption },
        ],
        value: s.lage,
        hint: modeHint,
        onChange: (v) => {
          s.lage = v === "prov" ? "prov" : "ova";
          update(true);
        },
      })
    : null;
  const tid = isQuiz
    ? segmentedControl({
        legend: sv.session.time,
        key: "tid",
        options: TIME_OPTIONS.map((n) => ({ value: String(n), label: n ? sv.session.minutes(n) : sv.session.noTime })),
        value: String(s.tid),
        onChange: (v) => {
          s.tid = Number(v);
          update(true);
        },
      })
    : null;

  // ---------- Vänd korten (cards) ----------
  let reverse: HTMLElement | null = null;
  if (!isQuiz) {
    const box = h("input", { type: "checkbox", class: "sk-choice__input" });
    box.checked = s.vand;
    box.addEventListener("change", () => {
      s.vand = box.checked;
      update(true);
    });
    reverse = h(
      "fieldset",
      { class: "sk-field", "data-control": "vand" },
      h("legend", { class: "sk-label" }, sv.session.cardOptions),
      h("label", { class: "sk-choice" }, box, h("span", { class: "sk-choice__label" }, sv.session.reverse)),
    );
  }

  // ---------- Pool, start ----------
  const poolLine = h("p", { class: "sk-small sk-muted sk-num", "aria-live": "polite", "data-pool": "" });
  const emptyLine = h("p", { class: "sk-small", hidden: true });
  const startBtn = h("button", { class: "sk-btn sk-btn--primary", type: "button", "data-start": "" });
  startBtn.addEventListener("click", () => {
    if (startBtn.disabled) return;
    onStart({ ...s, niva: [...s.niva] });
  });

  function update(fromUser: boolean): void {
    const pool = poolOf(s.urval);
    const radio = radioValue();
    for (const x of choiceEls) {
      const n = x.ch.value === "delar" ? poolOf(delarValue()) : poolOf(x.ch.value);
      x.count.textContent = String(n);
      x.input.checked = x.ch.value === radio;
      x.input.disabled = n === 0 && x.ch.value !== radio && x.ch.value !== "delar";
    }
    partPick.hidden = radio !== "delar";
    for (const b of partBoxes) b.count.textContent = String(poolOf(`delar:${b.part.id}`));

    for (const n of counts) antal.setDisabled(String(n), n > pool);
    antal.setDisabled("alla", pool === 0);
    if (typeof s.antal === "number" && s.antal > pool && pool > 0) s.antal = "alla";
    antal.set(String(s.antal));

    if (lage && tid) {
      lage.set(s.lage);
      modeHint.textContent = s.lage === "prov" ? sv.session.modeExamHint : sv.session.modePracticeHint;
      tid.el.hidden = s.lage !== "prov";
    }

    const n = sessionCount(s.antal, pool);
    poolLine.textContent = isQuiz ? sv.session.poolQuiz(pool) : sv.session.poolCards(pool);
    startBtn.disabled = n === 0;
    replace(startBtn, icon("right", 18), isQuiz ? sv.session.startQuiz(n) : sv.session.startCards(n));
    emptyLine.hidden = pool > 0;
    emptyLine.textContent =
      s.urval === "idag" ? sv.session.emptyToday : s.urval === "missar" ? sv.session.emptyMistakes : isQuiz ? sv.session.emptyQuiz : sv.session.emptyCards;

    if (fromUser) replaceHash(ctx.path + buildQuery(settingsQuery(ctx.kind, s)));
  }
  update(false);

  const pending = app.store.get().session;
  const pendingCard = pending
    ? h("section", { class: "sk-card sk-stack", "data-pending": "" },
        h("h2", { class: "sk-heading" }, sv.session.pendingTitle),
        h("p", { class: "sk-muted" }, pending.label),
        h("p", { class: "sk-small sk-muted" }, sv.session.pendingText),
        h("div", { class: "sk-btnrow" }, h("a", { class: "sk-btn", href: pending.route }, icon("reset", 18), sv.session.resume)),
      )
    : null;

  const titleId = `builder-${ctx.kind}`;
  return h(
    "div",
    { class: "sk-stack sk-stack--4" },
    pendingCard,
    ctx.presets ? presetRow(app, ctx) : null,
    h(
      "section",
      { class: "sk-card sk-builder", "aria-labelledby": titleId, "data-builder": ctx.kind },
      h("h2", { class: "sk-heading", id: titleId }, sv.session.builderTitle),
      ctx.intro ? h("p", { class: "sk-muted" }, ctx.intro) : null,
      urvalField,
      antal.el,
      niva?.el ?? null,
      ordning.el,
      lage?.el ?? null,
      tid?.el ?? null,
      reverse,
      h("div", { class: "sk-builder__foot" }, h("div", { class: "sk-stack sk-stack--2" }, poolLine, emptyLine), startBtn),
    ),
  );
}
