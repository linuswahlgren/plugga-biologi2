/**
 * Sessions (BUILD.md §4.4–4.6). Pure module, no DOM, so Node can test it:
 * - settings for "Välj omgång", read from and written to the URL, with remembered defaults;
 * - the pool for a selection ("urval") and level filter;
 * - sampling: proportional across parts and interleaved (no more than two in a row from one
 *   part when that can be avoided); "Blandad" also shuffles the options. Cards: due first, then new;
 * - the state of a running session (kept in Progress.session.data) and scoring.
 */
import type { NCard, NCourse, NPart, NQuiz } from "./course.ts";
import type { Exam, Level, Term } from "./types.ts";
import type { Attempt, Progress } from "./store/progress.ts";
import { isDue } from "./srs.ts";
import { sv } from "./i18n/sv.ts";

export type SessionKind = "kort" | "quiz";
export type Order = "blandad" | "ordning";
export type QuizMode = "ova" | "prov";
export type Rng = () => number;

export interface SessionSettings {
  /** "del" · "delar:d2,d3" · "prov:prov1" · "allt" · "missar" (quiz) · "idag" (kort) · "begrepp:prov1" (kort) */
  urval: string;
  antal: number | "alla";
  /** Empty means every level. */
  niva: Level[];
  ordning: Order;
  lage: QuizMode;
  /** Minutes in Provläge; 0 = no timer. */
  tid: number;
  /** Cards: show the back first. */
  vand: boolean;
}

/** Where a builder lives: on a part page (part), in an exam hub (exam), or on its own page (neither). */
export interface SessionScope {
  part?: NPart;
  exam?: Exam;
}

export const COUNT_OPTIONS: Record<SessionKind, readonly number[]> = { kort: [10, 20, 30], quiz: [5, 10, 15, 20] };
export const TIME_OPTIONS: readonly number[] = [0, 10, 20, 30];
export const LEVELS: readonly Level[] = ["E", "C", "A"];

function split(urval: string): [string, string] {
  const i = urval.indexOf(":");
  return i < 0 ? [urval, ""] : [urval.slice(0, i), urval.slice(i + 1)];
}

// ---------------------------------------------------------------- selection

/** Exams that have parts, newest first. */
export function examsWithParts(c: NCourse): Exam[] {
  return c.exams.filter((e) => c.partsOf(e.id).length > 0);
}

/** The scope's exam, else the upcoming exam once it has parts, else the latest done exam. */
export function defaultExam(c: NCourse, scope: SessionScope): Exam | undefined {
  if (scope.exam) return scope.exam;
  if (scope.part?.examRef) return scope.part.examRef;
  const withParts = examsWithParts(c);
  return withParts.find((e) => e.status === "upcoming") ?? withParts.find((e) => e.status === "done") ?? withParts[0];
}

export function termsOfExam(c: NCourse, examId: string): Term[] {
  const parts = new Set(c.partsOf(examId).map((p) => p.id));
  return c.glossary.filter((t) => parts.has(t.week));
}

export function partsOfUrval(c: NCourse, urval: string, scope: SessionScope): NPart[] {
  if (urval === "del") return scope.part ? [scope.part] : [];
  if (urval === "allt") return c.parts;
  const [t, arg] = split(urval);
  if (t === "prov") return c.partsOf(arg);
  if (t === "delar") {
    const ids = new Set(arg.split(","));
    return c.parts.filter((p) => ids.has(p.id));
  }
  return [];
}

export function isValidUrval(kind: SessionKind, urval: string, c: NCourse, scope: SessionScope): boolean {
  if (urval === "del") return !!scope.part;
  if (urval === "allt") return c.parts.length > 0;
  if (urval === "missar") return kind === "quiz";
  if (urval === "idag") return kind === "kort";
  const [t, arg] = split(urval);
  if (t === "prov" || t === "delar") return partsOfUrval(c, urval, scope).length > 0;
  if (t === "begrepp") return kind === "kort" && termsOfExam(c, arg).length > 0;
  return false;
}

/** "delar:" keeps only existing parts, in course order. */
function normalizeUrval(urval: string, c: NCourse, scope: SessionScope): string {
  return split(urval)[0] === "delar" ? `delar:${partsOfUrval(c, urval, scope).map((p) => p.id).join(",")}` : urval;
}

function listSv(items: string[]): string {
  return items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} ${sv.session.and} ${items[items.length - 1]}`;
}

/** Shown in the session header: "Fotosyntesen", "Hela prov 1", "Del 2 och 3", "Mina missar". */
export function urvalLabel(c: NCourse, urval: string, scope: SessionScope): string {
  if (urval === "del") return scope.part?.title ?? "";
  if (urval === "allt") return sv.session.everything;
  if (urval === "missar") return sv.session.mistakes;
  if (urval === "idag") return sv.session.dueTodayShort;
  const [t, arg] = split(urval);
  const examTitle = (c.examById.get(arg)?.title ?? arg).toLowerCase();
  if (t === "prov") return sv.session.wholeExam(examTitle);
  if (t === "begrepp") return sv.session.glossary(examTitle);
  if (t === "delar") {
    const parts = partsOfUrval(c, urval, scope);
    return parts.length === 1 ? parts[0].title : sv.session.someParts(listSv(parts.map((p) => String(p.n))));
  }
  return urval;
}

/** The scope stored with an attempt: the part id for "Den här delen", else the urval. */
export function scopeKey(urval: string, scope: SessionScope): string {
  return urval === "del" && scope.part ? scope.part.id : urval;
}

/** Label for a stored attempt scope (quiz history). */
export function scopeLabel(c: NCourse, key: string): string {
  const part = c.partById.get(key);
  if (part) return `${sv.nav.part(part.n)} · ${part.title}`;
  return urvalLabel(c, key, {});
}

// ---------------------------------------------------------------- settings

export function defaultSettings(kind: SessionKind, c: NCourse, scope: SessionScope): SessionSettings {
  const exam = defaultExam(c, scope);
  const simulation = kind === "quiz" && !!scope.exam;
  return {
    urval: scope.part ? "del" : exam ? `prov:${exam.id}` : "allt",
    antal: kind === "kort" || simulation ? 20 : 10,
    niva: [],
    ordning: "blandad",
    lage: simulation ? "prov" : "ova",
    tid: simulation ? 20 : 0,
    vand: false,
  };
}

/** Settings from the URL, then remembered choices, then defaults. Invalid values are ignored. */
export function parseSettings(
  kind: SessionKind,
  query: Record<string, string>,
  remembered: Record<string, string> | undefined,
  c: NCourse,
  scope: SessionScope,
): SessionSettings {
  const s = defaultSettings(kind, c, scope);
  const src: Record<string, string> = { ...(remembered ?? {}), ...query };
  if (src.urval && isValidUrval(kind, src.urval, c, scope)) s.urval = normalizeUrval(src.urval, c, scope);
  if (src.antal === "alla") s.antal = "alla";
  else if (src.antal && COUNT_OPTIONS[kind].includes(Number(src.antal))) s.antal = Number(src.antal);
  if (kind === "quiz" && src.niva) {
    const want = src.niva === "alla" ? [] : src.niva.split(",").map((x) => x.trim().toUpperCase());
    s.niva = LEVELS.filter((l) => want.includes(l));
  }
  if (src.ordning === "blandad" || src.ordning === "ordning") s.ordning = src.ordning;
  if (kind === "quiz" && (src.lage === "ova" || src.lage === "prov")) s.lage = src.lage;
  if (kind === "quiz" && src.tid) {
    const n = src.tid === "ingen" ? 0 : Number(src.tid);
    if (TIME_OPTIONS.includes(n)) s.tid = n;
  }
  if (kind === "kort" && src.vand) s.vand = src.vand === "1";
  return s;
}

/** The URL query for the settings, so a shared link opens the same panel pre-filled. */
export function settingsQuery(kind: SessionKind, s: SessionSettings): Record<string, string> {
  const q: Record<string, string> = { urval: s.urval, antal: String(s.antal) };
  if (kind === "quiz") q.niva = s.niva.length ? s.niva.join(",") : "alla";
  q.ordning = s.ordning;
  if (kind === "quiz") {
    q.lage = s.lage;
    if (s.lage === "prov") q.tid = s.tid ? String(s.tid) : "ingen";
  } else if (s.vand) q.vand = "1";
  return q;
}

/** What is remembered per mode: everything except the selection. */
export function rememberedSettings(kind: SessionKind, s: SessionSettings): Record<string, string> {
  const q = settingsQuery(kind, s);
  delete q.urval;
  if (kind === "quiz") q.tid = s.tid ? String(s.tid) : "ingen";
  else q.vand = s.vand ? "1" : "0";
  return q;
}

// ---------------------------------------------------------------- pools

export function quizPool(c: NCourse, p: Progress, urval: string, niva: readonly Level[], scope: SessionScope): NQuiz[] {
  const items =
    urval === "missar"
      ? c.parts.flatMap((part) => part.quiz.filter((q) => q.id in p.missed))
      : partsOfUrval(c, urval, scope).flatMap((part) => part.quiz);
  return niva.length ? items.filter((q) => !!q.level && niva.includes(q.level)) : items;
}

export function cardPool(c: NCourse, p: Progress, urval: string, scope: SessionScope, today: string): NCard[] {
  if (urval === "idag") return [...c.studyCardById.values()].filter((card) => isDue(p.cards[card.id], today));
  const [t, arg] = split(urval);
  if (t === "begrepp") {
    const seen = new Set<string>();
    return termsOfExam(c, arg)
      .map((term) => c.termCard(term))
      .filter((card) => (seen.has(card.id) ? false : (seen.add(card.id), true)));
  }
  return partsOfUrval(c, urval, scope).flatMap((part) => part.cards);
}

export function sessionCount(antal: number | "alla", pool: number): number {
  return antal === "alla" ? pool : Math.min(antal, pool);
}

// ---------------------------------------------------------------- sampling

export function shuffle<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Split n over groups in proportion to their sizes (largest remainder). Never more than a group holds. */
export function allocate(sizes: readonly number[], n: number): number[] {
  const total = sizes.reduce((a, b) => a + b, 0);
  if (n >= total) return sizes.slice();
  if (n <= 0 || total === 0) return sizes.map(() => 0);
  const raw = sizes.map((size) => (n * size) / total);
  const out = raw.map((r) => Math.floor(r));
  let left = n - out.reduce((a, b) => a + b, 0);
  const order = raw
    .map((r, i) => ({ i, frac: r - Math.floor(r) }))
    .sort((a, b) => b.frac - a.frac || sizes[b.i] - sizes[a.i] || a.i - b.i);
  while (left > 0) {
    let moved = false;
    for (const { i } of order) {
      if (left === 0) break;
      if (out[i] < sizes[i]) {
        out[i]++;
        left--;
        moved = true;
      }
    }
    if (!moved) break;
  }
  return out;
}

/**
 * Merge groups so that no more than two items in a row come from the same group, whenever the
 * group sizes allow it. Picks are random, weighted by what each group has left.
 */
export function interleave<T>(groups: readonly T[][], rng: Rng = Math.random): T[] {
  const queues = groups.map((g) => g.slice()).filter((g) => g.length);
  const out: T[] = [];
  const from: number[] = [];
  const left = () => queues.reduce((s, q) => s + q.length, 0);
  // After taking one from `pick`, can the rest still avoid three in a row? (largest ≤ 2 × (others + 1))
  const feasible = (pick: number) => {
    const sizes = queues.map((q, i) => q.length - (i === pick ? 1 : 0));
    const total = sizes.reduce((a, b) => a + b, 0);
    const max = Math.max(0, ...sizes);
    const others = total - max;
    return max <= 2 * (others + 1);
  };
  while (left() > 0) {
    const n = from.length;
    const blocked = n >= 2 && from[n - 1] === from[n - 2] ? from[n - 1] : -1;
    const open = queues.map((_, i) => i).filter((i) => queues[i].length > 0);
    let cand = open.filter((i) => i !== blocked && feasible(i));
    if (!cand.length) cand = open.filter((i) => i !== blocked);
    if (!cand.length) cand = open;
    const weight = cand.reduce((s, i) => s + queues[i].length, 0);
    let r = rng() * weight;
    let pick = cand[cand.length - 1];
    for (const i of cand) {
      r -= queues[i].length;
      if (r < 0) {
        pick = i;
        break;
      }
    }
    out.push(queues[pick].shift()!);
    from.push(pick);
  }
  return out;
}

function sample<T>(items: readonly T[], k: number, rng: Rng, keepOrder: boolean): T[] {
  if (k >= items.length) return keepOrder ? items.slice() : shuffle(items, rng);
  const idx = shuffle(items.map((_, i) => i), rng).slice(0, k);
  if (keepOrder) idx.sort((a, b) => a - b);
  return idx.map((i) => items[i]);
}

function groupByPart<T extends { partId: string }>(items: readonly T[]): T[][] {
  const map = new Map<string, T[]>();
  for (const it of items) {
    const list = map.get(it.partId) ?? [];
    list.push(it);
    map.set(it.partId, list);
  }
  return [...map.values()];
}

export interface PickedQuestion {
  id: string;
  /** Options in the order shown; answers are matched by text. */
  options: string[];
}

export function pickQuiz(pool: readonly NQuiz[], s: SessionSettings, rng: Rng = Math.random): PickedQuestion[] {
  const n = sessionCount(s.antal, pool.length);
  const keep = s.ordning === "ordning";
  const groups = groupByPart(pool);
  const quotas = allocate(groups.map((g) => g.length), n);
  const chosen = groups.map((g, i) => sample(g, quotas[i], rng, keep));
  const seq = keep ? chosen.flat() : interleave(chosen, rng);
  return seq.map((q) => ({ id: q.id, options: keep ? q.options.slice() : shuffle(q.options, rng) }));
}

/** Cards that are due come first, then new cards, then the rest (soonest due first). */
export function pickCards(pool: readonly NCard[], s: SessionSettings, p: Progress, today: string, rng: Rng = Math.random): string[] {
  const n = sessionCount(s.antal, pool.length);
  const rank = (card: NCard) => {
    const st = p.cards[card.id];
    return !st ? 1 : st.due <= today ? 0 : 2;
  };
  const indexed = pool.map((card, i) => ({ card, i, r: rank(card), due: p.cards[card.id]?.due ?? "" }));
  const keyed = s.ordning === "blandad" ? shuffle(indexed, rng) : indexed;
  keyed.sort((a, b) => a.r - b.r || (a.r === 2 ? a.due.localeCompare(b.due) : 0));
  const chosen = keyed.slice(0, n);
  if (s.ordning === "ordning") return chosen.sort((a, b) => a.i - b.i).map((x) => x.card.id);
  return interleave(groupByPart(chosen.map((x) => x.card)), rng).map((card) => card.id);
}

// ---------------------------------------------------------------- running sessions

export interface QuizRun {
  type: "quiz";
  lage: QuizMode;
  /** Part id or urval; stored with the attempt. */
  scope: string;
  /** Selection label at start, for the header. */
  label: string;
  items: PickedQuestion[];
  answers: Record<string, string>;
  flagged: string[];
  index: number;
  startedAt: string;
  /** Epoch ms when Provläge time runs out; null without a timer. */
  deadline: number | null;
}

export interface CardRun {
  type: "kort";
  scope: string;
  label: string;
  /** Card ids in the order shown; cards rated "Behöver öva" are added once more. */
  queue: string[];
  index: number;
  reversed: boolean;
  ratings: Record<string, "kan" | "ova">;
  requeued: string[];
}

export type Run = QuizRun | CardRun;

export function newQuizRun(items: PickedQuestion[], o: { lage: QuizMode; scope: string; label: string; minutes: number; now: number }): QuizRun {
  return {
    type: "quiz",
    lage: o.lage,
    scope: o.scope,
    label: o.label,
    items,
    answers: {},
    flagged: [],
    index: 0,
    startedAt: new Date(o.now).toISOString(),
    deadline: o.lage === "prov" && o.minutes > 0 ? o.now + o.minutes * 60_000 : null,
  };
}

export function newCardRun(ids: string[], o: { scope: string; label: string; reversed: boolean }): CardRun {
  return { type: "kort", scope: o.scope, label: o.label, queue: ids.slice(), index: 0, reversed: o.reversed, ratings: {}, requeued: [] };
}

/** "Behöver öva" brings a card back once, a few cards later. */
export function requeue(run: CardRun, id: string): void {
  if (run.requeued.includes(id)) return;
  run.requeued.push(id);
  run.queue.splice(Math.min(run.queue.length, run.index + 4), 0, id);
}

type Obj = Record<string, unknown>;
const isObj = (x: unknown): x is Obj => !!x && typeof x === "object" && !Array.isArray(x);
const strs = (x: unknown): string[] => (Array.isArray(x) ? x.filter((v): v is string => typeof v === "string") : []);

/**
 * Restore a saved session. Content may have changed since it was saved: unknown ids are dropped
 * and options are refreshed from the course. Returns null when nothing usable is left.
 */
export function restoreRun(c: NCourse, data: unknown): Run | null {
  if (!isObj(data)) return null;
  const label = typeof data.label === "string" ? data.label : "";
  const scope = typeof data.scope === "string" ? data.scope : "";
  const index = typeof data.index === "number" && Number.isFinite(data.index) ? Math.max(0, Math.floor(data.index)) : 0;
  if (data.type === "quiz") {
    const items: PickedQuestion[] = [];
    for (const it of Array.isArray(data.items) ? data.items : []) {
      if (!isObj(it) || typeof it.id !== "string") continue;
      const q = c.quizById.get(it.id);
      if (!q) continue;
      const saved = strs(it.options);
      const same = saved.length === q.options.length && q.options.every((o) => saved.includes(o));
      items.push({ id: q.id, options: same ? saved : q.options.slice() });
    }
    if (!items.length) return null;
    const ids = new Set(items.map((i) => i.id));
    const answers: Record<string, string> = {};
    if (isObj(data.answers)) for (const [k, v] of Object.entries(data.answers)) if (ids.has(k) && typeof v === "string") answers[k] = v;
    return {
      type: "quiz",
      lage: data.lage === "prov" ? "prov" : "ova",
      scope,
      label,
      items,
      answers,
      flagged: strs(data.flagged).filter((id) => ids.has(id)),
      index: Math.min(index, items.length - 1),
      startedAt: typeof data.startedAt === "string" ? data.startedAt : new Date().toISOString(),
      deadline: typeof data.deadline === "number" && Number.isFinite(data.deadline) ? data.deadline : null,
    };
  }
  if (data.type === "kort") {
    const queue = strs(data.queue).filter((id) => c.studyCardById.has(id));
    if (!queue.length) return null;
    const ids = new Set(queue);
    const ratings: Record<string, "kan" | "ova"> = {};
    if (isObj(data.ratings)) for (const [k, v] of Object.entries(data.ratings)) if (ids.has(k) && (v === "kan" || v === "ova")) ratings[k] = v;
    return {
      type: "kort",
      scope,
      label,
      queue,
      index: Math.min(index, queue.length - 1),
      reversed: data.reversed === true,
      ratings,
      requeued: strs(data.requeued).filter((id) => ids.has(id)),
    };
  }
  return null;
}

/** "Quiz · Fotosyntesen · fråga 4 av 10": shown in "Fortsätt där du slutade". */
export function runLabel(run: Run): string {
  if (run.type === "kort") {
    return sv.session.progressLabel(sv.session.modeCards, run.label, sv.session.cardOf(run.index + 1, run.queue.length));
  }
  const mode = run.lage === "prov" ? sv.session.modeExam : sv.session.modeQuiz;
  return sv.session.progressLabel(mode, run.label, sv.session.questionOf(run.index + 1, run.items.length));
}

// ---------------------------------------------------------------- scoring

export interface Tally {
  correct: number;
  total: number;
}

export interface QuizScore extends Tally {
  perPart: (Tally & { partId: string })[];
  perLevel: (Tally & { level: Level })[];
  wrong: { id: string; chosen: string | null }[];
}

export function scoreQuiz(c: NCourse, run: QuizRun): QuizScore {
  const perPart = new Map<string, Tally>();
  const perLevel = new Map<Level, Tally>();
  const wrong: QuizScore["wrong"] = [];
  let correct = 0;
  for (const it of run.items) {
    const q = c.quizById.get(it.id);
    if (!q) continue;
    const chosen = run.answers[it.id] ?? null;
    const right = chosen === q.answer;
    if (right) correct++;
    else wrong.push({ id: it.id, chosen });
    const pt = perPart.get(q.partId) ?? { correct: 0, total: 0 };
    pt.total++;
    if (right) pt.correct++;
    perPart.set(q.partId, pt);
    if (q.level) {
      const lt = perLevel.get(q.level) ?? { correct: 0, total: 0 };
      lt.total++;
      if (right) lt.correct++;
      perLevel.set(q.level, lt);
    }
  }
  const order = new Map(c.parts.map((p, i) => [p.id, i]));
  return {
    correct,
    total: run.items.length,
    perPart: [...perPart.entries()].map(([partId, t]) => ({ partId, ...t })).sort((a, b) => (order.get(a.partId) ?? 0) - (order.get(b.partId) ?? 0)),
    perLevel: LEVELS.filter((l) => perLevel.has(l)).map((level) => ({ level, ...perLevel.get(level)! })),
    wrong,
  };
}

/**
 * Mina missar: a wrong answer puts the question in the bank (count 0). A right answer in a later
 * session adds one; after two it leaves the bank.
 */
export function applyMissed(p: Progress, id: string, correct: boolean): void {
  if (!correct) {
    p.missed[id] = 0;
    return;
  }
  if (!(id in p.missed)) return;
  const n = p.missed[id] + 1;
  if (n >= 2) delete p.missed[id];
  else p.missed[id] = n;
}

/** A part's questions in a session count towards its best score with 10+ of them, or all the part has. */
export function countsForPart(c: NCourse, partId: string, questions: number): boolean {
  const part = c.partById.get(partId);
  return !!part && part.quiz.length > 0 && questions >= Math.min(10, part.quiz.length);
}

/** Store the attempt (last 50) and update each part's best score where the session counts. */
export function recordAttempt(p: Progress, c: NCourse, run: QuizRun, score: QuizScore, at: string): Attempt {
  let counts = false;
  for (const pp of score.perPart) {
    if (!countsForPart(c, pp.partId, pp.total)) continue;
    counts = true;
    const pct = Math.round((pp.correct / pp.total) * 100);
    p.quiz.best[pp.partId] = Math.max(p.quiz.best[pp.partId] ?? 0, pct);
  }
  const attempt: Attempt = {
    at,
    kind: "quiz",
    mode: run.lage,
    scope: run.scope,
    parts: score.perPart.map((x) => x.partId),
    correct: score.correct,
    total: score.total,
    counts,
  };
  p.quiz.attempts.push(attempt);
  if (p.quiz.attempts.length > 50) p.quiz.attempts = p.quiz.attempts.slice(-50);
  return attempt;
}
