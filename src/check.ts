/**
 * Content check (BUILD.md §6.6). Runs at build time (npm run check) and at runtime.
 * Students only see errors; warnings show in dev or with ?kontroll in the URL.
 * All messages are Swedish. Pure module: no DOM, no import.meta, so Node can run it.
 */
import type { Course, QuizItem } from "./types.ts";
import { loadCourse, type NCourse } from "./course.ts";
import { lessonLinks } from "./markup.ts";

export interface CheckMessage {
  where: string;
  text: string;
}

export interface CheckResult {
  errors: CheckMessage[];
  warnings: CheckMessage[];
}

export interface CheckOptions {
  /** Diagram ids that exist in src/diagrams. When given, label items must use one of them. */
  diagrams?: string[];
  /** Marker numbers per diagram. When given, a label marker must be one the diagram draws. */
  diagramMarkers?: Record<string, number[]>;
  /** Every string a student can see in the UI (from i18n), scanned for copy rules. */
  uiStrings?: string[];
  /** Minimum cards and quiz questions per part before a warning. */
  minItems?: number;
}

const EMOJI = /\p{Extended_Pictographic}/u;
const UNFORMATTED_CHEM = /(?<![~^\w])(CO2|H2O|O2|CH4|C6H12O6|NADP\+)(?![\w~^])/;
const ENGLISH_UI = /\b(the|and|you|your|click|loading|error|submit|next|back|save|cancel|settings|share|learn|progress|done|review|flashcards?|practice|correct|wrong|hint|answer|start|continue|show|hide|close|open)\b/i;

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (typeof value === "function") {
    try {
      const r = (value as (...a: unknown[]) => unknown)("x", 1, 1);
      collectStrings(r, out);
    } catch {
      /* ignore */
    }
  } else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => collectStrings(v, out));
  return out;
}

export function uiStringsOf(strings: unknown): string[] {
  return collectStrings(strings);
}

export function checkCourse(input: Course, opts: CheckOptions = {}): CheckResult {
  const errors: CheckMessage[] = [];
  const warnings: CheckMessage[] = [];
  const err = (where: string, text: string) => errors.push({ where, text });
  const warn = (where: string, text: string) => warnings.push({ where, text });
  const minItems = opts.minItems ?? 15;

  let c: NCourse;
  try {
    c = loadCourse(input);
  } catch (e) {
    err("Kursen", `Kursfilen kunde inte läsas: ${(e as Error).message}`);
    return { errors, warnings };
  }

  // ---- Course and exams ----
  if (!c.examById.has(input.currentExam)) err("Kursen", `currentExam pekar på "${input.currentExam}", som inte finns bland proven.`);

  // ---- Duplicate ids (across all kinds) ----
  const seen = new Map<string, string>();
  const claim = (id: string | undefined, where: string) => {
    if (!id) return;
    const prev = seen.get(id);
    if (prev) err(where, `Id "${id}" används två gånger (även i ${prev}).`);
    else seen.set(id, where);
  };
  claim(input.id, "Kursen");
  for (const e of input.exams) {
    claim(e.id, `Prov ${e.id}`);
    for (const q of e.studyQuestions ?? []) claim(q.id, `${e.title}, instuderingsfråga ${q.n}`);
  }

  const lessonExists = (id: string) => c.lessonById.has(id);
  const partOrLessonExists = (id: string) => c.lessonById.has(id) || c.partById.has(id);

  const checkLinksIn = (text: string | undefined, where: string) => {
    if (!text) return;
    for (const id of lessonLinks(text)) if (!lessonExists(id)) err(where, `Länken [[${id}|…]] pekar på en lektion som inte finns.`);
  };
  const checkChem = (text: string | undefined, where: string) => {
    if (!text) return;
    const m = text.match(UNFORMATTED_CHEM);
    if (m) warn(where, `Kemisk formel utan nedsänkta siffror: "${m[1]}". Skriv till exempel CO~2~.`);
  };
  const checkCopy = (text: string | undefined, where: string) => {
    if (!text) return;
    // "!>" opens a "Vanligt misstag" box and "![…](…)" an image; neither is an exclamation mark.
    text = text.replace(/^!>/gm, "").replace(/!\[/g, "[");
    if (/\bFel!/.test(text)) warn(where, `Skriv inte "Fel!". Använd "Inte riktigt".`);
    else if (text.includes("!")) warn(where, "Utropstecken i texten. Plugga använder inga utropstecken.");
    if (EMOJI.test(text)) warn(where, "Emoji i texten. Använd ikonerna i stället.");
  };

  const checkQuiz = (q: QuizItem, where: string, isCheck = false) => {
    if (!q.id) warn(where, "Frågan saknar id.");
    const opts = q.options ?? [];
    if (opts.length < 3) err(where, `Frågan har ${opts.length} svarsalternativ. Minst 3 behövs.`);
    const norm = opts.map((o) => o.trim().toLowerCase());
    if (new Set(norm).size !== norm.length) err(where, "Två svarsalternativ är likadana.");
    if (!opts.includes(q.answer)) err(where, `Rätt svar "${q.answer}" finns inte bland svarsalternativen.`);
    if (!q.explain || !q.explain.trim()) err(where, "Förklaringen saknas.");
    if (q.lesson && !lessonExists(q.lesson)) err(where, `Frågan länkar till lektionen "${q.lesson}", som inte finns.`);
    if (!isCheck && !q.lesson && !q.source) warn(where, "Frågan saknar länk till en lektion och saknar källa.");
    for (const t of [q.q, q.explain, ...opts]) {
      checkLinksIn(t, where);
      checkChem(t, where);
    }
    checkCopy(q.explain, where);
  };

  // ---- Parts ----
  for (const p of c.parts) {
    const pw = `Del ${p.n} (${p.id})`;
    claim(p.id, pw);
    if (!p.examRef) err(pw, `Delen hör till provet "${p.exam}", som inte finns.`);
    if (/vecka/i.test(p.title)) warn(pw, `Rubriken innehåller "Vecka". En enhet heter "del".`);
    if (!p.title.trim()) err(pw, "Delen saknar rubrik.");
    checkCopy(p.summary, `${pw}, sammanfattning`);
    for (const g of p.goals ?? []) checkCopy(g, `${pw}, mål`);
    p.keyPoints.forEach((k, i) => {
      checkCopy(k, `${pw}, viktigast ${i + 1}`);
      checkChem(k, `${pw}, viktigast ${i + 1}`);
      checkLinksIn(k, `${pw}, viktigast ${i + 1}`);
    });

    for (const l of p.lessons) {
      const lw = `${pw}, lektion "${l.title}"`;
      claim(l.id, lw);
      if (!l.body?.trim()) err(lw, "Lektionen saknar text.");
      if (!l.source && !l.supplement) warn(lw, "Lektionen saknar källa.");
      if (!l.check) warn(lw, "Lektionen saknar snabbkoll.");
      if (l.minutes < 1) err(lw, "Lektionens tid saknas.");
      checkLinksIn(l.body, lw);
      checkChem(l.body, lw);
      checkCopy(l.body, lw);
      if (l.check) {
        claim(l.check.id, `${lw}, snabbkoll`);
        checkQuiz(l.check, `${lw}, snabbkoll`, true);
      }
    }

    for (const card of p.cards) {
      const cw = `${pw}, kort "${card.front.slice(0, 40)}"`;
      if (card.generatedId) warn(cw, "Kortet saknar id. Ett tillfälligt id har skapats.");
      claim(card.id, cw);
      if (!card.front.trim() || !card.back.trim()) err(cw, "Kortet saknar fram- eller baksida.");
      if (card.lesson && !lessonExists(card.lesson)) err(cw, `Kortet länkar till lektionen "${card.lesson}", som inte finns.`);
      if (!card.lesson) warn(cw, "Kortet saknar länk till en lektion.");
      checkChem(card.front + " " + card.back, cw);
      checkCopy(card.back, cw);
      checkLinksIn(card.back, cw);
    }

    p.quiz.forEach((q, i) => {
      const qw = `${pw}, quizfråga ${i + 1} (${q.id || "utan id"})`;
      claim(q.id, qw);
      checkQuiz(q, qw);
    });

    for (const x of p.practice) {
      const xw = `${pw}, övning (${x.id})`;
      if (x.generatedId) warn(xw, "Övningen saknar id. Ett tillfälligt id har skapats.");
      claim(x.id, xw);
      if (x.lesson && !lessonExists(x.lesson)) err(xw, `Övningen länkar till lektionen "${x.lesson}", som inte finns.`);
      if (!x.lesson) warn(xw, "Övningen saknar länk till en lektion.");
      checkChem(x.q, xw);
      checkLinksIn(x.q, xw);
      if (x.kind === "order" && x.steps.length < 3) err(xw, `Ordningsövningen har ${x.steps.length} steg. Minst 3 behövs.`);
      if (x.kind === "label") {
        if (opts.diagrams && !opts.diagrams.includes(x.diagram)) err(xw, `Diagrammet "${x.diagram}" finns inte.`);
        for (const m of x.markers) if (!m.answer?.trim()) err(xw, `Markering ${m.n} saknar begrepp.`);
        const known = opts.diagramMarkers?.[x.diagram];
        if (known) for (const m of x.markers) if (!known.includes(m.n)) err(xw, `Diagrammet "${x.diagram}" har ingen markering ${m.n}.`);
        if (new Set(x.markers.map((m) => m.n)).size !== x.markers.length) err(xw, "Två markeringar har samma nummer.");
      }
      if (x.kind === "text" && (Array.isArray(x.answer) ? x.answer.length === 0 : !x.answer.trim())) err(xw, "Övningen saknar rätt svar.");
      if (x.kind === "self" && !x.solution.trim()) err(xw, "Övningen saknar exempelsvar.");
      if ("solution" in x && x.solution) {
        checkCopy(x.solution, xw);
        checkChem(x.solution, xw);
      }
    }

    // Amounts
    if (p.cards.length < minItems) warn(pw, `Delen har ${p.cards.length} kort. Målet är minst ${minItems}.`);
    if (p.quiz.length < minItems) warn(pw, `Delen har ${p.quiz.length} quizfrågor. Målet är minst ${minItems}.`);

    // Correct answers clustered in one position
    if (p.quiz.length >= 8) {
      const counts = new Map<number, number>();
      for (const q of p.quiz) {
        const idx = q.options.indexOf(q.answer);
        counts.set(idx, (counts.get(idx) ?? 0) + 1);
      }
      for (const [idx, n] of counts) {
        if (idx >= 0 && n / p.quiz.length > 0.4) warn(pw, `${n} av ${p.quiz.length} rätta svar står på plats ${idx + 1}. Sprid dem jämnare.`);
      }
    }
  }

  // ---- Exams: study questions ----
  for (const e of c.exams) {
    for (const q of e.studyQuestions ?? []) {
      const qw = `${e.title}, instuderingsfråga ${q.n}`;
      if (!q.modelAnswer?.trim()) err(qw, "Exempelsvaret saknas.");
      for (const r of q.refs) if (!partOrLessonExists(r)) err(qw, `"Svaret finns i" pekar på "${r}", som inte finns.`);
      checkLinksIn(q.modelAnswer, qw);
      checkChem(q.modelAnswer, qw);
      checkCopy(q.modelAnswer, qw);
    }
  }

  // ---- Glossary ----
  for (const t of c.glossary) {
    const tw = `Begrepp "${t.term}"`;
    claim(t.id, tw);
    if (!c.partById.has(t.week)) err(tw, `Begreppet hör till delen "${t.week}", som inte finns.`);
    if (t.lesson && !lessonExists(t.lesson)) err(tw, `Begreppet länkar till lektionen "${t.lesson}", som inte finns.`);
    if (t.card && !c.cardById.has(t.card)) err(tw, `Begreppet länkar till kortet "${t.card}", som inte finns.`);
    const part = c.partById.get(t.week);
    const themes = part?.examRef?.themes;
    if (themes && !themes.includes(t.theme)) err(tw, `Temat "${t.theme}" finns inte i begreppslistan för ${part?.examRef?.title}.`);
    if (!t.lesson) warn(tw, "Begreppet saknar länk till en lektion.");
    checkChem(t.definition, tw);
    checkCopy(t.definition, tw);
  }

  // ---- UI strings ----
  for (const s of opts.uiStrings ?? []) {
    if (EMOJI.test(s)) warn("Gränssnittet", `Emoji i texten: "${s}"`);
    if (s.includes("!")) warn("Gränssnittet", `Utropstecken i texten: "${s}"`);
    const m = s.match(ENGLISH_UI);
    if (m) warn("Gränssnittet", `Engelskt ord i texten: "${m[0]}" i "${s}"`);
  }

  return { errors, warnings };
}
