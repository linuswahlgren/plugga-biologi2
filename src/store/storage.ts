/**
 * Storage wrapper. Uses localStorage when it works and falls back to memory when it
 * doesn't (private mode, blocked site data, quota). The app then shows the banner
 * "Dina framsteg sparas inte i den här webbläsaren".
 */

export interface KV {
  get(key: string): string | null;
  set(key: string, value: string): boolean;
  remove(key: string): void;
  keys(): string[];
  /** "local" while localStorage works; "memory" after any failure. */
  readonly mode: "local" | "memory";
  onFallback(listener: () => void): void;
}

export function createStorage(): KV {
  const memory = new Map<string, string>();
  const listeners = new Set<() => void>();
  let mode: "local" | "memory" = "memory";
  let ls: Storage | null = null;

  try {
    ls = window.localStorage;
    const probe = "plugga:probe";
    ls.setItem(probe, "1");
    ls.removeItem(probe);
    mode = "local";
  } catch {
    ls = null;
    mode = "memory";
  }

  const fallBack = () => {
    if (mode === "memory") return;
    mode = "memory";
    listeners.forEach((l) => l());
  };

  return {
    get(key) {
      if (mode === "local" && ls) {
        try {
          return ls.getItem(key);
        } catch {
          fallBack();
        }
      }
      return memory.get(key) ?? null;
    },
    set(key, value) {
      memory.set(key, value);
      if (mode === "local" && ls) {
        try {
          ls.setItem(key, value);
          return true;
        } catch {
          fallBack();
        }
      }
      return false;
    },
    remove(key) {
      memory.delete(key);
      if (mode === "local" && ls) {
        try {
          ls.removeItem(key);
        } catch {
          fallBack();
        }
      }
    },
    keys() {
      if (mode === "local" && ls) {
        try {
          return Array.from({ length: ls.length }, (_, i) => ls!.key(i)).filter((k): k is string => k !== null);
        } catch {
          fallBack();
        }
      }
      return Array.from(memory.keys());
    },
    get mode() {
      return mode;
    },
    onFallback(listener) {
      listeners.add(listener);
    },
  };
}
