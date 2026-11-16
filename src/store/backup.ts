/**
 * Saving and loading a copy of the progress (BUILD.md §4.10.4). Pure module, no DOM.
 * - A copy is a small JSON file: { app: "plugga", courseId, v: 2, exportedAt, progress }.
 * - The text code is the same JSON, deflated (CompressionStream where available) and base64url
 *   encoded, prefixed "PLUGGA1." (deflated) or "PLUGGA0." (plain), for moving between devices.
 * - Loading validates the course id and the version, then merges, keeping the best of both.
 */
import { migrate } from "./migrate.ts";
import type { Box, CardState, Progress } from "./progress.ts";

export interface BackupFile {
  app: "plugga";
  courseId: string;
  v: 2;
  exportedAt: string;
  progress: Progress;
}

export type ParseResult = { ok: true; progress: Progress } | { ok: false; reason: "format" | "course" | "version" };

export function makeBackup(p: Progress, now = new Date()): BackupFile {
  return { app: "plugga", courseId: p.courseId, v: 2, exportedAt: now.toISOString(), progress: p };
}

/** Accepts a backup file, a bare v2 progress object or the earlier Study Kit v1 format. */
export function parseBackup(text: string, courseId: string): ParseResult {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return { ok: false, reason: "format" };
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return { ok: false, reason: "format" };
  const obj = raw as Record<string, unknown>;
  const inner = obj.app === "plugga" && obj.progress && typeof obj.progress === "object" ? (obj.progress as Record<string, unknown>) : obj;
  const id = typeof obj.courseId === "string" ? obj.courseId : typeof inner.courseId === "string" ? inner.courseId : null;
  const v = typeof inner.v === "number" ? inner.v : typeof obj.v === "number" ? obj.v : null;
  if (v !== null && v > 2) return { ok: false, reason: "version" };
  if (id !== null && id !== courseId) return { ok: false, reason: "course" };
  const looksLikeProgress = ["lessons", "cards", "quiz", "done", "known", "notes"].some((k) => k in inner);
  if (!looksLikeProgress) return { ok: false, reason: "format" };
  return { ok: true, progress: migrate(inner, courseId) };
}

/** The higher box wins (then the later due date); "seen" counts the most views either copy had. */
function betterCard(a: CardState, b: CardState): CardState {
  const best = a.box !== b.box ? (a.box > b.box ? a : b) : a.due >= b.due ? a : b;
  return { ...best, seen: Math.max(a.seen, b.seen) };
}

function mergeNotes(a: string | undefined, b: string | undefined): string | undefined {
  const x = a?.trim() ?? "";
  const y = b?.trim() ?? "";
  if (!x) return y || undefined;
  if (!y || x.includes(y)) return a;
  if (y.includes(x)) return b;
  return `${a}\n\n${b}`;
}

/**
 * Merge an imported copy into the current progress, keeping the best of both:
 * lessons done in either; the higher card box; the best quiz score; both quiz histories;
 * practice solved in either; "kan" over "inte än"; notes from both; activity from both.
 * Mina missar follows the more recently updated copy (overlaps keep the higher count).
 * Settings and an unfinished session stay as they are on this device.
 */
export function mergeProgress(current: Progress, imported: Progress, now = new Date()): Progress {
  const out: Progress = structuredClone(current);

  for (const [id, at] of Object.entries(imported.lessons)) out.lessons[id] = out.lessons[id] && out.lessons[id] < at ? out.lessons[id] : at;

  for (const [id, st] of Object.entries(imported.cards)) out.cards[id] = out.cards[id] ? betterCard(out.cards[id], st) : { ...st, box: st.box as Box };

  for (const [part, pct] of Object.entries(imported.quiz.best)) out.quiz.best[part] = Math.max(out.quiz.best[part] ?? 0, pct);
  const key = (a: Progress["quiz"]["attempts"][number]) => `${a.at}|${a.scope}|${a.correct}/${a.total}|${a.mode}`;
  const seen = new Set(out.quiz.attempts.map(key));
  for (const a of imported.quiz.attempts) if (!seen.has(key(a))) out.quiz.attempts.push(a);
  out.quiz.attempts.sort((a, b) => a.at.localeCompare(b.at));
  out.quiz.attempts = out.quiz.attempts.slice(-50);

  const newer = imported.updatedAt > current.updatedAt ? imported : current;
  const older = newer === imported ? current : imported;
  out.missed = { ...newer.missed };
  for (const [id, n] of Object.entries(older.missed)) if (id in out.missed) out.missed[id] = Math.max(out.missed[id], n);

  for (const [id, x] of Object.entries(imported.practice)) {
    const prev = out.practice[id];
    out.practice[id] = !prev ? x : { solved: prev.solved || x.solved, at: prev.at > x.at ? prev.at : x.at };
  }
  for (const [id, v] of Object.entries(imported.study)) if (out.study[id] !== "kan") out.study[id] = v;

  for (const id of new Set([...Object.keys(out.notes), ...Object.keys(imported.notes)])) {
    const merged = mergeNotes(out.notes[id], imported.notes[id]);
    if (merged) out.notes[id] = merged;
    else delete out.notes[id];
  }
  for (const day of Object.keys(imported.activity)) out.activity[day] = true;

  const backups = [current.lastBackupAt, imported.lastBackupAt].filter((x): x is string => !!x).sort();
  out.lastBackupAt = backups[backups.length - 1] ?? null;
  out.updatedAt = now.toISOString();
  return out;
}

// ---------------------------------------------------------------- text code

const toBase64Url = (bytes: Uint8Array) => {
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
const fromBase64Url = (text: string) => {
  const b = atob(text.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(b, (c) => c.charCodeAt(0));
};

async function pipe(bytes: Uint8Array, stream: CompressionStream | DecompressionStream): Promise<Uint8Array> {
  const out = new Response(new Blob([bytes as BlobPart]).stream().pipeThrough(stream));
  return new Uint8Array(await out.arrayBuffer());
}

export async function encodeCode(json: string): Promise<string> {
  const bytes = new TextEncoder().encode(json);
  if (typeof CompressionStream === "function") return `PLUGGA1.${toBase64Url(await pipe(bytes, new CompressionStream("deflate-raw")))}`;
  return `PLUGGA0.${toBase64Url(bytes)}`;
}

/** The JSON text inside a code, or null when it isn't a Plugga code. */
export async function decodeCode(code: string): Promise<string | null> {
  const clean = code.replace(/\s+/g, "");
  const m = /^PLUGGA([01])\.([A-Za-z0-9_-]+)$/.exec(clean);
  if (!m) return null;
  try {
    const bytes = fromBase64Url(m[2]);
    const raw = m[1] === "1" ? await pipe(bytes, new DecompressionStream("deflate-raw")) : bytes;
    return new TextDecoder().decode(raw);
  } catch {
    return null;
  }
}
