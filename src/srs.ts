/**
 * Spaced repetition with five Leitner boxes (BUILD.md §4.5). Intervals 0, 1, 3, 7 and 16 days.
 * Every card starts in box 1. "Jag kan den" moves it up one box and sets its due date;
 * "Behöver öva" sends it back to box 1, due today. A card "sitter" in box 3 or higher.
 */
import type { Box, CardState } from "./store/progress.ts";
import { addDays } from "./format.ts";

export const INTERVALS: Record<Box, number> = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 16 };

export function rateCard(prev: CardState | undefined, known: boolean, today: string): CardState {
  const seen = (prev?.seen ?? 0) + 1;
  if (!known) return { box: 1, due: today, seen };
  const box = Math.min(5, (prev?.box ?? 1) + 1) as Box;
  return { box, due: addDays(today, INTERVALS[box]), seen };
}

export function isDue(state: CardState | undefined, today: string): boolean {
  return !!state && state.due <= today;
}
