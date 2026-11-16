/**
 * Template for a new part (used by /ny-del). Copy to content/biologi2/<exam>/dN.ts, replace every
 * "dN" with the new id (Prov 2 parts continue from d7), and add the part to that exam's index.ts.
 *
 * Rules (BUILD.md §8.3–8.6):
 * - 3–6 lessons of 4–10 minutes, each with a Snabbkoll (`check`) and a `source` ("Deck, bild N–M").
 * - 18–25 cards, 15–20 quiz questions (about 50 % E, 35 % C, 15 % A), 6–10 practice items
 *   (at least one `order`, two `self`), 5–8 key points.
 * - Every item links to its lesson. Content not in the lesson material gets `supplement: true`.
 * - Ids never change once published.
 */
import type { Week } from "../../src/types.ts";

export const dN: Week = {
  id: "dN",
  exam: "prov2",
  title: "Ämnet, inte formatet",
  summary: "En eller två meningar om vad delen handlar om.",
  goals: ["beskriva …", "förklara …"],
  lessons: [
    {
      id: "dN-l1",
      title: "Lektionens rubrik",
      minutes: 6,
      source: "Presentationens namn, bild 3–5",
      body: `En mening om varför ämnet spelar roll.

## Mellanrubrik

Korta stycken. Ett **begrepp** i fetstil förklaras första gången det används.

> Kärnan i lektionen i en eller två meningar.

!> Ett vanligt missförstånd och varför det inte stämmer.`,
      check: {
        id: "dN-l1-k",
        q: "En fråga som hämtar fram lektionens kärna?",
        options: ["Rätt svar", "Vanlig missuppfattning 1", "Vanlig missuppfattning 2", "Vanlig missuppfattning 3"],
        answer: "Rätt svar",
        explain: "Varför svaret är rätt, och varför det mest lockande felaktiga alternativet inte stämmer.",
        lesson: "dN-l1",
      },
    },
  ],
  cards: [{ id: "dN-k01", front: "Begrepp", back: "En idé, högst 25 ord.", lesson: "dN-l1" }],
  quiz: [
    {
      id: "dN-q01",
      q: "Fråga?",
      options: ["A", "B", "C", "D"],
      answer: "A",
      explain: "En till tre meningar.",
      level: "E",
      lesson: "dN-l1",
    },
  ],
  practice: [
    { id: "dN-p1", kind: "self", q: "Förklara …", solution: "Exempelsvar …", level: "C", lesson: "dN-l1" },
    { id: "dN-p2", kind: "order", q: "Sätt stegen i rätt ordning.", steps: ["Steg 1", "Steg 2", "Steg 3", "Steg 4"], lesson: "dN-l1" },
  ],
  keyPoints: ["Det viktigaste, en mening."],
};
