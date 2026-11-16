/**
 * Progress maths (BUILD.md §4.9).
 * Mastery per part = lessons done (20) + cards that "sitter" (30) + best quiz (35) + practice solved (15).
 * Components without items are dropped and the rest rescaled.
 */
import type { NCourse, NPart } from "./course.ts";
import type { Progress } from "./store/progress.ts";
import { todayISO } from "./format.ts";

export type PartStatus = "notStarted" | "inProgress" | "needsReview" | "complete";

export interface PartMastery {
  percent: number;
  lessonsDone: number;
  lessonsTotal: number;
  cardsKnown: number;
  cardsTotal: number;
  cardsDue: number;
  bestQuiz: number | null;
  practiceSolved: number;
  practiceTotal: number;
  missed: number;
  status: PartStatus;
}

/** A card "sitter" when it is in box 3 or higher. */
export const KNOWN_BOX = 3;

export function partMastery(part: NPart, p: Progress, today = todayISO()): PartMastery {
  const lessonsTotal = part.lessons.length;
  const lessonsDone = part.lessons.filter((l) => p.lessons[l.id]).length;
  const cardsTotal = part.cards.length;
  let cardsKnown = 0;
  let cardsDue = 0;
  let cardsSeen = 0;
  for (const c of part.cards) {
    const st = p.cards[c.id];
    if (!st) continue;
    cardsSeen++;
    if (st.box >= KNOWN_BOX) cardsKnown++;
    if (st.due <= today) cardsDue++;
  }
  const bestQuiz = part.id in p.quiz.best ? p.quiz.best[part.id] : null;
  const practiceTotal = part.practice.length;
  const practiceSolved = part.practice.filter((x) => p.practice[x.id]?.solved).length;
  const missed = part.quiz.filter((q) => q.id in p.missed).length;

  const components: [number, number][] = [];
  if (lessonsTotal) components.push([20, lessonsDone / lessonsTotal]);
  if (cardsTotal) components.push([30, cardsKnown / cardsTotal]);
  if (part.quiz.length) components.push([35, (bestQuiz ?? 0) / 100]);
  if (practiceTotal) components.push([15, practiceSolved / practiceTotal]);
  const weight = components.reduce((s, [w]) => s + w, 0);
  const percent = weight ? Math.round((components.reduce((s, [w, v]) => s + w * v, 0) / weight) * 100) : 0;

  const attempted = p.quiz.attempts.some((a) => a.parts.includes(part.id));
  const started = lessonsDone > 0 || cardsSeen > 0 || bestQuiz !== null || attempted || part.practice.some((x) => p.practice[x.id]);

  let status: PartStatus;
  if (!started) status = "notStarted";
  else if ((bestQuiz !== null && bestQuiz < 70) || cardsDue >= 5 || missed >= 3) status = "needsReview";
  else if (percent >= 85 && (part.quiz.length === 0 || (bestQuiz ?? 0) >= 80)) status = "complete";
  else status = "inProgress";

  return { percent, lessonsDone, lessonsTotal, cardsKnown, cardsTotal, cardsDue, bestQuiz, practiceSolved, practiceTotal, missed, status };
}

/** Average mastery of an exam's parts (0 when it has none). */
export function examMastery(c: NCourse, examId: string, p: Progress, today = todayISO()): number {
  const parts = c.partsOf(examId);
  if (!parts.length) return 0;
  return Math.round(parts.reduce((s, part) => s + partMastery(part, p, today).percent, 0) / parts.length);
}

export function cardsDueToday(c: NCourse, p: Progress, today = todayISO()): number {
  let n = 0;
  for (const card of c.cardById.values()) {
    const st = p.cards[card.id];
    if (st && st.due <= today) n++;
  }
  return n;
}

export function cardsKnown(c: NCourse, p: Progress): { known: number; total: number } {
  let known = 0;
  for (const card of c.cardById.values()) if ((p.cards[card.id]?.box ?? 0) >= KNOWN_BOX) known++;
  return { known, total: c.cardById.size };
}

export function studyKnown(c: NCourse, examId: string, p: Progress): { known: number; total: number } {
  const qs = c.examById.get(examId)?.studyQuestions ?? [];
  return { known: qs.filter((q) => p.study[q.id] === "kan").length, total: qs.length };
}

/** True once the student has done anything worth keeping. */
export function hasRealProgress(p: Progress): boolean {
  return (
    Object.keys(p.lessons).length > 0 ||
    Object.keys(p.cards).length > 0 ||
    p.quiz.attempts.length > 0 ||
    Object.keys(p.practice).length > 0 ||
    Object.keys(p.study).length > 0
  );
}
