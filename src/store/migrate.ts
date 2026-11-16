/**
 * Progress migration: earlier Study Kit format (key "studykit:<id>", v1) -> Plugga v2.
 *
 * The earlier single-file Study Kit (legacy/study-platform.html) was not available when this
 * was written, so the v1 shape below is the documented assumption; the migration is tolerant
 * and ignores anything it doesn't recognise:
 *
 *   {
 *     v: 1,
 *     done | lessons:  { [lessonId]: true | "YYYY-MM-DD…" } | lessonId[],
 *     known:           cardId[]                    // cards marked "Jag kan den"
 *     cards:           { [cardId]: { box, due? } } // if spaced repetition was used
 *     quiz | best:     { [weekId]: percent }
 *     practice:        { [practiceId]: true }
 *     notes:           { [weekId]: string }
 *     theme:           "light" | "dark" | "system"
 *   }
 *
 * v2 data is sanitised field by field, so a partly broken file still loads.
 */
import { emptyProgress, type Box, type Progress, type Attempt } from "./progress.ts";
import { todayISO } from "../format.ts";

type Obj = Record<string, unknown>;
const isObj = (x: unknown): x is Obj => !!x && typeof x === "object" && !Array.isArray(x);
const isStr = (x: unknown): x is string => typeof x === "string";
const isNum = (x: unknown): x is number => typeof x === "number" && Number.isFinite(x);
const ISO_DAY = /^\d{4}-\d{2}-\d{2}/;

function clampBox(n: unknown): Box {
  const b = isNum(n) ? Math.round(n) : 1;
  return (Math.min(5, Math.max(1, b)) as Box);
}

function stringMap(x: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (isObj(x)) for (const [k, v] of Object.entries(x)) if (isStr(v)) out[k] = v;
  return out;
}

function sanitizeV2(raw: Obj, courseId: string): Progress {
  const p = emptyProgress(courseId);
  p.updatedAt = isStr(raw.updatedAt) ? raw.updatedAt : p.updatedAt;
  p.lastBackupAt = isStr(raw.lastBackupAt) ? raw.lastBackupAt : null;
  p.lessons = stringMap(raw.lessons);
  if (isObj(raw.cards)) {
    for (const [id, c] of Object.entries(raw.cards)) {
      if (!isObj(c)) continue;
      p.cards[id] = { box: clampBox(c.box), due: isStr(c.due) && ISO_DAY.test(c.due) ? c.due.slice(0, 10) : todayISO(), seen: isNum(c.seen) ? c.seen : 0 };
    }
  }
  if (isObj(raw.quiz)) {
    const q = raw.quiz;
    if (Array.isArray(q.attempts)) {
      p.quiz.attempts = q.attempts
        .filter(isObj)
        .filter((a) => isNum(a.correct) && isNum(a.total))
        .map(
          (a): Attempt => ({
            at: isStr(a.at) ? a.at : new Date(0).toISOString(),
            kind: "quiz",
            mode: a.mode === "prov" ? "prov" : "ova",
            scope: isStr(a.scope) ? a.scope : "",
            parts: Array.isArray(a.parts) ? a.parts.filter(isStr) : [],
            correct: a.correct as number,
            total: a.total as number,
            counts: a.counts === true,
          }),
        )
        .slice(-50);
    }
    if (isObj(q.best)) for (const [k, v] of Object.entries(q.best)) if (isNum(v)) p.quiz.best[k] = Math.max(0, Math.min(100, v));
  }
  if (isObj(raw.missed)) for (const [k, v] of Object.entries(raw.missed)) if (isNum(v)) p.missed[k] = v;
  if (isObj(raw.practice)) {
    for (const [k, v] of Object.entries(raw.practice)) {
      if (isObj(v)) p.practice[k] = { solved: v.solved === true, at: isStr(v.at) ? v.at : "" };
    }
  }
  if (isObj(raw.study)) for (const [k, v] of Object.entries(raw.study)) if (v === "kan" || v === "inte-an") p.study[k] = v;
  p.notes = stringMap(raw.notes);
  if (isObj(raw.activity)) for (const k of Object.keys(raw.activity)) if (ISO_DAY.test(k)) p.activity[k.slice(0, 10)] = true;
  if (isObj(raw.session) && isStr(raw.session.route) && isStr(raw.session.kind)) {
    p.session = raw.session as unknown as Progress["session"];
  }
  if (isObj(raw.settings)) {
    const s = raw.settings;
    if (s.theme === "light" || s.theme === "dark" || s.theme === "system") p.settings.theme = s.theme;
    p.settings.introDismissed = s.introDismissed === true;
    if (isObj(s.sessionDefaults)) {
      for (const [mode, vals] of Object.entries(s.sessionDefaults)) if (isObj(vals)) p.settings.sessionDefaults[mode] = stringMap(vals);
    }
  }
  return p;
}

function fromV1(raw: Obj, courseId: string): Progress {
  const p = emptyProgress(courseId);
  const today = todayISO();
  const lessons = raw.lessons ?? raw.done;
  if (Array.isArray(lessons)) for (const id of lessons) if (isStr(id)) p.lessons[id] = today;
  if (isObj(lessons)) {
    for (const [id, v] of Object.entries(lessons)) {
      if (v === true) p.lessons[id] = today;
      else if (isStr(v)) p.lessons[id] = ISO_DAY.test(v) ? v : today;
    }
  }
  if (Array.isArray(raw.known)) for (const id of raw.known) if (isStr(id)) p.cards[id] = { box: 3, due: today, seen: 1 };
  if (isObj(raw.cards)) {
    for (const [id, c] of Object.entries(raw.cards)) {
      if (c === true) p.cards[id] = { box: 3, due: today, seen: 1 };
      else if (isObj(c)) p.cards[id] = { box: clampBox(c.box), due: isStr(c.due) && ISO_DAY.test(c.due) ? c.due.slice(0, 10) : today, seen: isNum(c.seen) ? c.seen : 1 };
    }
  }
  const best = raw.best ?? raw.quiz;
  if (isObj(best)) for (const [k, v] of Object.entries(best)) if (isNum(v)) p.quiz.best[k] = Math.max(0, Math.min(100, v));
  if (isObj(raw.practice)) for (const [k, v] of Object.entries(raw.practice)) if (v === true || (isObj(v) && v.solved === true)) p.practice[k] = { solved: true, at: today };
  p.notes = stringMap(raw.notes);
  if (raw.theme === "light" || raw.theme === "dark" || raw.theme === "system") p.settings.theme = raw.theme;
  if (Object.keys(p.lessons).length || Object.keys(p.cards).length) p.activity[today] = true;
  return p;
}

export function migrate(raw: unknown, courseId: string): Progress {
  if (!isObj(raw)) return emptyProgress(courseId);
  if (raw.v === 2) return sanitizeV2(raw, courseId);
  return fromV1(raw, courseId);
}
