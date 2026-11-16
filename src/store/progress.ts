/**
 * Progress model v2 (BUILD.md §6.5), stored under "plugga:<courseId>".
 * One store with subscribe; saved debounced (300 ms) and flushed when the page is hidden.
 * Progress is keyed by id, so it survives content updates: unknown ids are kept, not dropped.
 */
import type { KV } from "./storage.ts";
import { migrate } from "./migrate.ts";
import { todayISO } from "../format.ts";

export type Box = 1 | 2 | 3 | 4 | 5;
export type Theme = "system" | "light" | "dark";

export interface CardState {
  box: Box;
  /** YYYY-MM-DD */
  due: string;
  seen: number;
}

export interface Attempt {
  at: string;
  kind: "quiz";
  mode: "ova" | "prov";
  /** Part id, or a selection key such as "prov:prov1", "delar:d2,d3", "missar", "allt". */
  scope: string;
  parts: string[];
  correct: number;
  total: number;
  /** True when the attempt can count towards a part's best score (10+ questions or the whole pool). */
  counts: boolean;
}

export interface ResumableSession {
  kind: "kort" | "quiz" | "ova";
  /** Hash route that reopens the session. */
  route: string;
  label: string;
  at: string;
  /** Session-specific state, owned by session.ts. */
  data: unknown;
}

export interface Progress {
  v: 2;
  courseId: string;
  updatedAt: string;
  lastBackupAt: string | null;
  lessons: Record<string, string>;
  cards: Record<string, CardState>;
  quiz: { attempts: Attempt[]; best: Record<string, number> };
  missed: Record<string, number>;
  practice: Record<string, { solved: boolean; at: string }>;
  study: Record<string, "kan" | "inte-an">;
  notes: Record<string, string>;
  activity: Record<string, true>;
  session: ResumableSession | null;
  settings: {
    theme: Theme;
    sessionDefaults: Record<string, Record<string, string>>;
    introDismissed: boolean;
    /** "Inte nu" on the backup card hides it until this day (YYYY-MM-DD). Additive field. */
    backupSnoozedUntil: string | null;
  };
}

export function emptyProgress(courseId: string): Progress {
  return {
    v: 2,
    courseId,
    updatedAt: new Date().toISOString(),
    lastBackupAt: null,
    lessons: {},
    cards: {},
    quiz: { attempts: [], best: {} },
    missed: {},
    practice: {},
    study: {},
    notes: {},
    activity: {},
    session: null,
    settings: { theme: "system", sessionDefaults: {}, introDismissed: false, backupSnoozedUntil: null },
  };
}

export const storageKey = (courseId: string) => `plugga:${courseId}`;
export const legacyKey = (courseId: string) => `studykit:${courseId}`;

export interface Store {
  get(): Progress;
  /** Change progress. `activity: true` (default) also marks today as a study day. */
  update(mutate: (p: Progress) => void, opts?: { activity?: boolean; silent?: boolean }): void;
  subscribe(listener: (p: Progress) => void): () => void;
  /** Write now (used on pagehide and in tests). */
  flush(): void;
  /** Replace everything (reset, import). */
  replace(next: Progress): void;
  readonly kv: KV;
}

export function loadProgress(kv: KV, courseId: string): Progress {
  const raw = kv.get(storageKey(courseId));
  if (raw) {
    try {
      return migrate(JSON.parse(raw), courseId);
    } catch {
      /* corrupt: start over, but keep the broken copy for recovery */
      kv.set(`${storageKey(courseId)}:skadad`, raw);
    }
  }
  const legacy = kv.get(legacyKey(courseId));
  if (legacy) {
    try {
      const migrated = migrate(JSON.parse(legacy), courseId);
      kv.set(storageKey(courseId), JSON.stringify(migrated));
      return migrated;
    } catch {
      /* ignore an unreadable legacy copy */
    }
  }
  return emptyProgress(courseId);
}

export function createStore(kv: KV, courseId: string, debounceMs = 300): Store {
  let state = loadProgress(kv, courseId);
  const listeners = new Set<(p: Progress) => void>();
  let timer: ReturnType<typeof setTimeout> | null = null;
  let dirty = false;

  const write = () => {
    timer = null;
    if (!dirty) return;
    dirty = false;
    kv.set(storageKey(courseId), JSON.stringify(state));
  };
  const schedule = () => {
    dirty = true;
    if (timer) clearTimeout(timer);
    timer = setTimeout(write, debounceMs);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("pagehide", write);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") write();
    });
  }

  return {
    get: () => state,
    update(mutate, opts = {}) {
      mutate(state);
      state.updatedAt = new Date().toISOString();
      if (opts.activity !== false) state.activity[todayISO()] = true;
      schedule();
      if (!opts.silent) listeners.forEach((l) => l(state));
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    flush() {
      if (timer) clearTimeout(timer);
      dirty = true;
      write();
    },
    replace(next) {
      state = next;
      schedule();
      listeners.forEach((l) => l(state));
    },
    kv,
  };
}
