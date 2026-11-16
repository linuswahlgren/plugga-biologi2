/**
 * Answer matching for typed answers (BUILD.md §6.4).
 * - Ignore case, extra spaces, a final full stop and a leading "en"/"ett".
 * - A list accepts any of its spellings.
 * - Numbers compare numerically; a comma works as a decimal point; tolerance accepts nearby values.
 * - Answers of six letters or more accept one wrong letter, with a spelling note.
 * - Å, ä and ö are letters of their own, never treated as accented a or o.
 */

export interface TextResult {
  correct: boolean;
  /** Set when the answer was accepted with one wrong letter: the right spelling. */
  typoOf?: string;
}

export function normalizeAnswer(input: string): string {
  return input
    .normalize("NFC")
    .toLocaleLowerCase("sv-SE")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.]+$/, "")
    .trim()
    .replace(/^(en|ett)\s+/, "")
    .trim();
}

/** Levenshtein distance, capped: returns limit + 1 as soon as it can't be within limit. */
export function editDistance(a: string, b: string, limit = 2): number {
  const A = Array.from(a);
  const B = Array.from(b);
  if (Math.abs(A.length - B.length) > limit) return limit + 1;
  let prev = Array.from({ length: B.length + 1 }, (_, j) => j);
  for (let i = 1; i <= A.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= B.length; j++) {
      const cost = A[i - 1] === B[j - 1] ? 0 : 1;
      const v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      cur.push(v);
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > limit) return limit + 1;
    prev = cur;
  }
  return prev[B.length];
}

function letterCount(s: string): number {
  return Array.from(s).filter((c) => /\p{L}/u.test(c)).length;
}

export function matchText(input: string, accepted: string | string[]): TextResult {
  const given = normalizeAnswer(input);
  if (!given) return { correct: false };
  const list = Array.isArray(accepted) ? accepted : [accepted];
  for (const a of list) {
    if (normalizeAnswer(a) === given) return { correct: true };
  }
  for (const a of list) {
    const want = normalizeAnswer(a);
    if (letterCount(want) >= 6 && editDistance(given, want, 1) === 1) return { correct: true, typoOf: a.trim().replace(/[.]+$/, "") };
  }
  return { correct: false };
}

/** Parse a typed number: decimal comma, unicode minus, spaces as thousand separators, trailing unit. */
export function parseNumber(input: string): number | null {
  const cleaned = input
    .normalize("NFC")
    .replace(/[−–]/g, "-")
    .replace(/(\d)[\s ](?=\d{3}\b)/g, "$1")
    .trim()
    .replace(",", ".");
  const m = cleaned.match(/^[-+]?(\d+(\.\d+)?|\.\d+)/);
  if (!m) return null;
  const n = Number(m[0]);
  return Number.isFinite(n) ? n : null;
}

export function matchNumber(input: string, answer: number, tolerance = 0): boolean {
  const n = parseNumber(input);
  if (n === null) return false;
  return Math.abs(n - answer) <= Math.max(tolerance, 1e-9);
}
