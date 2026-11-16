# Plugga components

Components that are new compared with the earlier Study Kit. They are built from the same tokens (`docs/design-system.md`) so they can be added to the design system later. Each entry lists its purpose, anatomy, states and Swedish copy. Phase 1 covers the components the shell needs. Phase 2 added the session, practice and progress components (below), and Phase 4 adds the sharing ones. Implementations live in `src/components/`, one file each.

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

## Phase 2: sessions, practice and progress

### SessionBuilder ("Välj omgång") — `SessionBuilder.ts`
- **Purpose:** An inline panel above every card and quiz session (never a modal). It never starts by itself.
- **Anatomy:** a "Du har en omgång som inte är klar" card with "Fortsätt där du slutade" when a session is saved; presets "Snabbquiz 5", "Repetera idag", "Provsimulering 20"; a card with "Välj omgång", Urval (radio rows with pool counts; "Välj delar" opens a checkbox list grouped by exam), Antal (SegmentedControl), Nivå (ChipGroup, quiz), Ordning, Läge with a one-line hint and Tid (quiz; Tid only in Provläge), "Vänd korten (visa baksidan först)" (cards); a footer with the live pool line ("48 frågor finns i urvalet") and a start button that names the result ("Starta 10 frågor").
- **States:** counts larger than the pool are disabled (45 %); when the chosen count is too large, "Alla" is chosen. An empty pool disables the start button and says why ("Inga kort behöver repeteras i dag …"). Urval rows with an empty pool are disabled.
- **URL:** every change is written to the URL (`#/d3/quiz?urval=del&antal=10&niva=E,C&ordning=blandad&lage=prov&tid=20`), so a shared link opens the same panel. The last choice per mode (all but Urval) is remembered. Presets are links to such URLs.

### SegmentedControl — `SegmentedControl.ts`
- **Purpose:** One choice among a few. A native radio group, so arrow keys and screen readers work as usual.
- **Anatomy:** label (`sk-label`), sunken track, segments. **Selected:** surface segment with a line-strong edge. **Disabled:** 45 %, same size and place. **Focus:** 2 px ring on the segment.

### ChipGroup — `Chip.ts`
- **Purpose:** Several choices at once (Nivå: Alla · E · C · A). Native checkboxes styled as 40 px pills.
- **States:** checked = accent-soft fill, accent edge, accent-ink text **and** a check icon. "Alla" is checked exactly when nothing else is.

### SessionHeader — `SessionHeader.ts`
- **Purpose:** Replaces the page head inside a running session, so the student always sees what they are doing.
- **Anatomy:** h1 "Quiz · Fotosyntesen" + " · Fråga 4 av 10" (muted, tabular), an optional timer ("12:34 kvar", clock icon, `role="timer"`, danger-ink in the last minute), "Avsluta" (small button, asks first), progress bar.
- **Copy:** modes "Quiz", "Provläge", "Kort"; counters "Fråga 4 av 10", "Kort 4 av 20".

### Quiz session — `views/quizRun.ts`
- **Öva:** options A–D. After an answer every option is disabled; the right one gets accent-soft + check + "Rätt svar" (or "Ditt svar"), a wrong choice danger-soft + x + "Ditt svar". Feedback (`role="status"`): "Rätt" / "Inte riktigt", "Rätt svar är …", the explanation, "Läs mer: <lektion>" (the session is kept; the lesson page shows "Tillbaka till omgången"). "Nästa fråga" / "Visa resultat". Keys: A–D, Enter.
- **Provläge:** a chosen option shows an accent edge and "Ditt svar" (`aria-pressed`). "Markera för att titta igen" (toggle, flag icon). "Föregående fråga" / "Nästa fråga" and ← →. Navigator: numbered squares (answered = accent-soft; current = 2 px ink inset; flagged = small flag badge), each with an `aria-label` such as "Fråga 3, besvarad, markerad", and "4 av 10 besvarade". "Lämna in" asks first ("Du har 3 obesvarade frågor och 1 markerad fråga. …"). When the time runs out the quiz is handed in and the results say "Tiden är slut. Dina svar har lämnats in."

### ResultSummary — `ResultSummary.ts`
- **Anatomy:** eyebrow "Quiz · Fotosyntesen", h1 "7 av 10 · 70 %", a line that states facts ("Starkt jobbat. Det här sitter." from 90 %, "Bra jobbat. …" from 70 %, "Bra början. …" from 40 %, else "Det här behöver du öva mer på. …"), buttons "Öva på missarna" · "Ny omgång" · "Tillbaka", "Hur det gick" per part and per level (tally and bar), a note when the session does not count toward the part's best score, then the MistakeList.

### MistakeList — `MistakeList.ts`
- **Anatomy:** one card per wrong answer: the question, "Ditt svar: …" (x icon, danger-ink) or "Inget svar", "Rätt svar är …" (check icon, accent-ink), the explanation, "Läs mer: <lektion>".

### Card session — `views/cardRun.ts`
- **Anatomy:** a raised card. Front: "Del 3 · Fotosyntesen" and the front text (`card-front`). Back: "Baksida", the back text (18/28) and "Läs mer". Both faces share one grid cell, so flipping (450 ms, instant with reduced motion) never moves the layout. Below: ← "Föregående kort", "Vänd kortet" or "Behöver öva" [1] · "Jag kan den" [2], → "Nästa kort", and "Tänk ut svaret. Vänd sedan kortet och bedöm dig själv." Below 600 px the arrows sit on one row and the main buttons fill the row below.
- **End screen:** "14 av 20 sitter", "Kort att öva mer på" (front and back), "Öva på de 6 igen", "Tillbaka till delen".

### PracticeCard — `PracticeCard.ts`
- **Anatomy:** eyebrow "Övning 3" (plus "Del 2 · …" across parts), level tag, Kompletterande, "Löst" (accent tag with check), the question, an optional "Visa ledtråd" (sunken box "Ledtråd"), the kind's body, "Läs mer: <lektion>".
- **text / number:** input and "Rätta" (Enter works). Number inputs use `inputmode="decimal"` and show the unit. Feedback: "Rätt", "Rätt – kolla stavningen: fotosyntes", or "Inte riktigt" + "Rätt svar är …" + the solution.
- **self:** "Ditt svar" textarea ("Det du skriver här sparas inte."), "Visa exempelsvar" → sunken "Exempelsvar" box, "Hur gick det?", "Jag hade rätt" / "Inte än".

### OrderExercise — `OrderExercise.ts`
- **Anatomy:** "Dra stegen till rätt ordning, eller flytta dem med pilknapparna." Rows: grip handle (pointer drag; mouse, pen and touch), position circle, text, state, up and down icon buttons ("Flytta upp: …"). Moves are announced ("Flyttat till plats 3 av 6.") and focus stays on the moved row.
- **After "Rätta":** each row accent-soft + "Rätt plats" or danger-soft + "Fel plats" (icon and word), then the verdict, "Rätt ordning" and the explanation. Any move clears the marks.

### LabelDiagram — `LabelDiagram.ts` and `src/diagrams/`
- **Purpose:** Name the numbered parts of a diagram. Diagrams are original inline SVGs in the line style (ink-muted strokes, sunken/surface/line fills, ink number badges), so they follow the theme. Only the numbers an item uses are drawn.
- **Anatomy:** the figure on a sunken panel (`role="img"`, "Bild med 8 numrerade delar"), then one row per number: badge + select "Välj begrepp" (terms and distractors, alphabetical). Side by side from 1180 px.
- **After "Rätta":** each row "Rätt" or "Rätt svar är …", then "Alla nummer har rätt begrepp." or "2 nummer har fel begrepp.".
- **Diagrams and marker numbers:** `cell` 1 cell wall, 2 cell membrane, 3 chloroplast, 4 vacuole, 5 nucleus, 6 mitochondrion, 7 cytoplasm, 8 plasmodesma · `leaf` 1 cuticle, 2 upper epidermis, 3 palisade tissue, 4 spongy tissue, 5 xylem, 6 phloem, 7 lower epidermis, 8 stoma, 9 guard cell · `chloroplast` 1 outer membrane, 2 inner membrane, 3 granum, 4 thylakoid, 5 lumen, 6 stroma · `flower` 1 petal, 2 sepal, 3 anther, 4 filament, 5 stigma, 6 style, 7 ovary, 8 ovule. A new diagram is one file registered in `src/diagrams/index.ts`; the content check rejects unknown diagrams and marker numbers.

### Glossary — `Glossary.ts`
- **Anatomy:** intro, "Sök begrepp" (search icon; ignores case and diacritics; searches terms and definitions), "Bara de jag inte kan", "Visar 9 av 110 begrepp", "Öva som kort"; one card per theme with its terms: name, Kompletterande / "Utöver begreppslistan" / "Kan jag" (card in box 3 or higher), definition, "Läs lektionen".

### StudyQuestion list — `StudyQuestions.ts`
- **Anatomy:** "9 av 17 kan jag" with a bar; collapsible questions (number circle, question, "Kan jag" / "Inte än" tag). Inside: level tag, "Ditt svar" textarea (not saved), "Visa exempelsvar" → sunken box, "Svaret finns i: Del 2 · Floemet", "Jag kan den" / "Inte än".

### ActivityStrip — `ActivityStrip.ts`
- **Anatomy:** "Pluggat 4 av de senaste 7 dagarna", 28 squares (line = not studied, accent = studied, a tooltip with the date), "Pluggat 12 av de senaste 28 dagarna". `role="img"` with the 28-day summary. No streaks.

### QuizHistory — `QuizHistory.ts`
- **Anatomy:** a table Datum ("sön 15 nov 14:05") · Urval ("Del 3 · Fotosyntesen", "Hela prov 1", "Mina missar") · Läge ("Öva" / "Provläge") · Resultat ("12 av 16 · 75 %"); the last 50, newest first.

### ProgressPage — `views/progress.ts`
- **Sections:** Aktivitet · one card per exam (mastery, parts with status tags, "Instuderingsfrågor: 9 av 17 kan jag") · Kort (Låda 1–5, "Att repetera idag", "Att repetera inom en vecka", "Repetera idag") · Mina missar ("5 frågor i Mina missar", "Öva på missarna", how a question leaves the bank) · Quizhistorik · Var dina framsteg sparas · Rensa framsteg ("Vad vill du rensa?": everything, a whole exam or one part; the dialog says exactly what is removed and that notes are kept).
