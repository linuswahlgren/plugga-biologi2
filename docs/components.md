# Plugga components

Components that are new compared with the earlier Study Kit. They are built from the same tokens (`docs/design-system.md`) so they can be added to the design system later. Each entry lists its purpose, anatomy, states and Swedish copy. Phase 1 covers the components the shell needs. Phase 2 adds the session and practice components, and Phase 4 adds the sharing ones. Implementations live in `src/components/`, one file each.

## ExamGroup (sidebar) — `Sidebar.ts`
- **Purpose:** Groups the parts in the sidebar by exam, newest first, with that exam's hub link above its parts.
- **Anatomy:** eyebrow ("Prov 2 · 7 dec" / "Prov 1 · Repetera"), hub link (flag or reset icon + "Inför prov 2 · 7 december" / "Repetera prov 1"), part links (number circle, "Del 3", title, mastery bar with a tabular %).
- **States:** current (`aria-current="page"`, accent-soft fill, accent-ink text); part complete (number circle filled with a check); upcoming exam without parts ("Inget material än").

## ExamCountdown — `ExamCountdown.ts`
- **Purpose:** Days left to the upcoming exam. While the exam has no material, it also shows the empty state.
- **Anatomy:** eyebrow with clock icon, `title` line "Prov 2 om 21 dagar · mån 7 dec", empty-state text, "Repetera prov 1" button.
- **Copy:** "Prov 2 i dag", "Prov 2 i morgon", "Prov 2 var mån 7 dec" (past).

## StatTile — `StatTile.ts`
- **Purpose:** One number on the overview.
- **Anatomy:** value in `title` size with tabular figures, optional "av 25", label in `small` ink-muted.
- **Copy:** "Prov 1 repeterat", "Kort som sitter", "Kort att repetera idag", "Instuderingsfrågor jag kan".

## SupplementTag, RepetitionTag, StatusTag, LevelTag — `Tag.ts`
- **Purpose:** Neutral pills. Colour never carries the meaning alone; the word does.
- **SupplementTag:** outline pill "Kompletterande". Tooltip and visually hidden text: "Finns inte i lektionsmaterialet. Jämför med kursboken."
- **RepetitionTag:** outline pill "Repetition" on parts of a done exam.
- **StatusTag:** "Inte påbörjad" (sunken), "Pågår" (sunken), "Behöver repeteras" (danger-soft / danger-ink), "Klar" (accent-soft / accent-ink).
- **LevelTag:** "Nivå E/C/A" with the tooltip "Ungefärlig nivå enligt betygsstegen".

## EmptyState — `EmptyState.ts`
- **Purpose:** Says plainly why something is empty and what to do instead. Plugga never shows an empty list or a broken tab.
- **Anatomy:** card, heading, one sentence, optional action button.

## Toast — `Toast.ts`
- **Purpose:** A short confirmation ("Länken är kopierad", "Dina framsteg är rensade").
- **Anatomy:** ink pill at the bottom centre, `role="status"`, optional single action ("Ladda om").
- **States:** disappears after 4 s unless it has an action.

## ConfirmDialog — `ConfirmDialog.ts`
- **Purpose:** Confirms an irreversible action and says exactly what will happen.
- **Anatomy:** native modal `<dialog>` (traps focus, Esc closes, focus returns), heading, text, primary confirm and secondary "Avbryt" (focused first).

## Snabbkoll (QuickCheck) — `QuickCheck.ts`
- **Purpose:** One retrieval question at the end of a lesson. It doesn't count toward the quiz.
- **Anatomy:** eyebrow "Snabbkoll", question, "Räknas inte in i quizet.", options (key letter, text, state), feedback (`role="status"`).
- **States:** after an answer the right option shows check + "Rätt svar". A wrong choice shows x + "Ditt svar" on danger-soft. The verdict is "Rätt" or "Inte riktigt", then "Rätt svar är …", the explanation and "Försök igen".

## LessonCard — `LessonCard.ts`
- **Purpose:** One lesson as a collapsible card.
- **Anatomy:** header button (`aria-expanded`) with number circle, title, "6 min · Klar", chevron. Body: optional Kompletterande tag, text, Snabbkoll, "Källa: …", "Markera som klar" (primary) / "Markera som inte klar", "Nästa lektion".

## NotesPanel — `NotesPanel.ts`
- **Purpose:** Third column on part pages. Below 1180 px it is an overlay drawer opened with "Visa anteckningar".
- **Anatomy:** "Anteckningar", Viktigast (key points), Mina anteckningar (autosaved textarea, "Sparar …" / "Sparat"), "Begrepp i den här delen" (term, definition, "Läs lektionen").

## IntroCard ("Så funkar Plugga") — `IntroCard.ts`
- **Purpose:** First visit only. Learn, practise, test; privacy line; home-screen tip. "Jag förstår" dismisses it for good.
