# Study Kit design system (as used by Plugga)

Authoritative for every visual and copy decision. Copied from BUILD.md §7. Section numbers are kept so references like "§7.2" still work.

Plugga additions are documented in `docs/components.md` (new components) and `CLAUDE.md` (the `+>` Kompletterande box in the text marks).


### 7.1 Principles

- **Content first.** Neutral surfaces, one accent, no decoration. The lesson text is the most important thing on screen.
- **Always show where you are.** Every part shows its progress; the student always knows what's next.
- **Instant, kind, specific feedback.** Say whether an answer is right, give the right answer, then say why.
- **One accent per course.** Nothing else adds colour.
- **Works for any subject.** No component names a subject; content comes only from the data.

### 7.2 Voice and Swedish copy

- **Swedish only.** Every word a student can see is Swedish: buttons, headings, tooltips, `aria-label`s, alt text, error and empty states, toasts, dialogs, print headers, the browser tab title, the manifest and the Teams post. The design system's English string set is not used.
- Talk to the student as "du". Sentence case everywhere, including buttons and headings.
- Buttons start with a verb; labels are one to three words.
- Feedback words are fixed: **"Rätt"** and **"Inte riktigt"**, followed by "Rätt svar är …" and the explanation. Never "Fel!", never exclamation marks, never sarcasm.
- Encourage with facts, not hype: "Starkt jobbat. Den här delen sitter." / "Bra början. Titta på de du missade och försök igen."
- A unit is a **del** ("Del 3 av 6"). Never "Vecka 3". Dates are Swedish: "mån 7 dec", school weeks "v. 46", 24-hour time.
- A non-breaking space before the percent sign ("68 %"). Typed answers accept a decimal comma.
- No emoji anywhere. Use the icon set.
- Part titles name the topic ("Transport genom cellmembranet"), never the format.

| English (code and docs only) | Swedish (UI) |
| --- | --- |
| Part · Current · Review · Coming up | Del · Aktuellt · Repetera · Kommande |
| Learn · Flashcards · Quiz · Practice | Lär dig · Kort · Quiz · Öva |
| Start · Continue learning · Take the quiz | Kom igång · Fortsätt plugga · Gör quizet |
| Mark as done · Next lesson · Test yourself | Markera som klar · Nästa lektion · Testa dig själv |
| I know it · Still learning · Shuffle | Jag kan den · Behöver öva · Blanda |
| Correct · Not quite · Your answer · The answer is … | Rätt · Inte riktigt · Ditt svar · Rätt svar är … |
| Check · Hint · Show answer · Model answer | Rätta · Ledtråd · Visa svar · Exempelsvar |
| I got it · Not yet · Solved | Jag hade rätt · Inte än · Löst |
| Notes · Key points · My notes · Key idea | Anteckningar · Viktigast · Mina anteckningar · Viktigt |
| Needs review · Complete · Not started · Opens later | Behöver repeteras · Klar · Inte påbörjad · Öppnar senare |
| By the end you can | När du är klar kan du |
| Choose session · Start · Hand in · Exam mode | Välj omgång · Starta · Lämna in · Provläge |
| My mistakes · Due today · Share · My progress | Mina missar · Att repetera idag · Dela · Mina framsteg |
| Save a copy · Load a copy · Reload | Spara en kopia · Läs in en kopia · Ladda om |
| Common mistake · Supplementary · Exam prep · Repetition | Vanligt misstag · Kompletterande · Inför provet · Repetition |

### 7.3 Colour tokens

CSS custom properties on `:root`, redefined for dark under `prefers-color-scheme: dark` (unless `data-theme="light"`) and under `[data-theme="dark"]`. Light is the default theme; a theme toggle sits in the top bar.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#f6f6f3` | `#111312` | Page background |
| `--surface` | `#ffffff` | `#1a1d1b` | Cards, panels, inputs |
| `--surface-sunken` | `#efefeb` | `#151816` | Sidebar, formula boxes, reveals, hover of quiet buttons |
| `--line` | `#e3e3de` | `#2b2f2c` | Card borders, dividers, progress tracks (decorative only) |
| `--line-strong` | `#8a8f8b` | `#6f7672` | Edges of controls: buttons, inputs, quiz options |
| `--ink` | `#1a1c1b` | `#ecedea` | All headings and body text |
| `--ink-muted` | `#5b605d` | `#a2a8a4` | Meta lines, counts, eyebrows, placeholders |
| `--accent` | `#1d6b4f` | `#5cc49a` | Primary buttons, progress, active tab, done marks, correct, focus |
| `--accent-hover` | `#175a42` | `#74d1aa` | Primary button hover |
| `--on-accent` | `#ffffff` | `#0b1f16` | Text and icons on accent fills (never literal white in dark) |
| `--accent-soft` | `#e4f0ea` | `#1b3027` | Selected nav item, key-idea boxes, correct fills |
| `--accent-ink` | `#155a40` | `#8edcb9` | Accent text: active nav, "Rätt", links |
| `--danger` | `#b3410e` | `#f2946a` | Edge and dot of a wrong answer (not for text) |
| `--danger-soft` | `#fbebe2` | `#3a2219` | Wrong-answer fill, "Behöver repeteras" tag |
| `--danger-ink` | `#93350b` | `#f6ad8c` | Text on danger-soft: "Inte riktigt", "Ditt svar" |
| `--success`, `--success-soft`, `--success-ink`, `--focus` | aliases of accent, accent-soft, accent-ink, accent | | |

This course uses the **green** accent (above). The other presets stay available in code for future courses:

| Preset | Light accent / soft / ink | Dark accent / soft / ink / on-accent |
| --- | --- | --- |
| green (default) | `#1d6b4f` / `#e4f0ea` / `#155a40` | `#5cc49a` / `#1b3027` / `#8edcb9` / `#0b1f16` |
| blue | `#2158a6` / `#e6edf7` / `#1a4785` | `#86b3ee` / `#1c2738` / `#aecbf3` / `#0c1a2c` |
| teal | `#0e6773` / `#e1eff0` / `#0b525c` | `#5ec4cf` / `#16302f` / `#93dbe2` / `#0a1f22` |
| plum | `#7a3d77` / `#f3e9f2` / `#68305f` | `#d99dd5` / `#33222f` / `#e8bfe5` / `#2a1028` |
| slate | `#3d4a5c` / `#e9ecf0` / `#323d4c` | `#a9b6c8` / `#232831` / `#c6d0dd` / `#141a22` |

Never red, orange or yellow accents; they read as "wrong". Every right/wrong state carries an icon **and** a word, so colour is never the only signal.

### 7.4 Type

- **Figtree** for everything, bundled locally (section 5). Stack: `"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif`. Code text: `ui-monospace, SFMono-Regular, Menlo, monospace`.

| Style | Size/line | Weight | Use |
| --- | --- | --- | --- |
| display | 30/36, −0.015em (26/32 below 860 px) | 700 | One per page: overview or part title |
| title | 22/28, −0.01em | 650 | Big cards: hero, countdown |
| card-front | 24/32, −0.01em | 650 | Card front |
| question | 19/28 | 650 | Quiz question |
| heading | 17/24 | 650 | Section headings |
| lead | 16/26 | 400 | Part summary, in ink-muted |
| lesson-title | 16/22 | 650 | Lesson card titles |
| body | 15/24 | 400 | Running text, the default |
| control | 14/20 | 600 | Buttons, tabs, options, nav |
| small | 13/18 | 400 | Meta lines, counts, helper text |
| eyebrow | 12/16, uppercase, 0.06em | 650 | Labels above titles, "Viktigt", "Ledtråd" |
| code | 13/20 mono | 400 | Code blocks |

- Changing numbers (percentages, counts, scores, timers) use tabular figures.
- Chemistry and maths use real sub- and superscripts: CO₂, never "CO2".

### 7.5 Space, shape, elevation

- Spacing on a 4 px base: `--space-1` 4, `-2` 8, `-3` 12, `-4` 16, `-5` 24, `-6` 32, `-7` 48 px. Gaps of space-2 between buttons and options, space-3 between stacked cards, space-5 inside cards, space-7 between overview sections.
- Radii: `--radius-sm` 6 px (small buttons, keys), `--radius-md` 10 px (buttons, inputs, options, boxes), `--radius-lg` 14 px (cards), `--radius-pill` 999 px (tags, bars).
- Borders before shadows: every card has a 1 px `--line` border and no shadow. `--shadow-raised` only on cards being studied and floating drawers. Light: `0 1px 2px rgba(17,19,18,.06), 0 6px 16px rgba(17,19,18,.06)`; dark: `0 1px 2px rgba(0,0,0,.5), 0 8px 24px rgba(0,0,0,.35)`.
- No gradients, no coloured side stripes, no background images.

### 7.6 Layout

- Three columns: sidebar `--sidebar-width` 272 px, main column with content max `--content-width` 760 px centred, notes panel `--notes-width` 320 px on part pages. `--control-height` 40 px (32 px for small buttons).
- Below 1180 px the notes panel becomes an overlay drawer. Below 860 px the sidebar becomes a drawer behind the top bar's menu button. Below 520 px tab counts hide.
- A part page reads: eyebrow (subject · exam · part · dates), status tag, display title, lead, goals, progress meter, tabs, selected panel.

### 7.7 States and motion

- Hover: quiet surfaces → surface-sunken; primary buttons → accent-hover.
- Selected: accent-soft + accent-ink (nav), ink text + accent underline (tab), white segment (segmented control).
- Done: number circle fills with accent and shows a check. Disabled: 45 % opacity, same size and place.
- Motion: 150 ms colour, 200 ms chevrons and drawers, 300 ms progress fills, 450 ms card flip. With `prefers-reduced-motion`, all instant.

### 7.8 Icons

Inline SVG line icons, 24 px grid, 1.75 stroke, round caps and joins, `currentColor`; 16 px in small buttons and tags, 18–20 px elsewhere. Set: check, x, chevron, left, right, menu, notes, sun, moon, shuffle, lock, bulb, flip, copy, home, reset, eye, plus the new share, qr, clock, download, upload, search, print, flag, chart. Icons support a word; square icon buttons always have a Swedish `aria-label`. No emoji, icon fonts or illustrations (the diagrams are learning content, not decoration).

### 7.9 Accessibility (WCAG 2.2 AA)

- Text 4.5:1 on its grounds in both themes; control edges, icons and focus ring 3:1. Focus: solid 2 px outline at 2 px offset on every focusable element.
- Everything works by keyboard: Space flips, ← → move, `1`/`2` rate a card, A–D answer, Enter goes on, Esc closes drawers and dialogs, `?` shows the shortcut list.
- Collapsibles use `aria-expanded`; progress bars `role="progressbar"`; feedback `role="status"`; dialogs trap focus and return it.
- Every drag interaction has a button alternative. Touch targets at least 40 px.
- `lang="sv"` on the document.

### 7.10 New components

These don't exist in the earlier kit. Build them from the same tokens and document each in `docs/components.md` (purpose, anatomy, states, Swedish copy) so they can be added to the design system later: SessionBuilder, SegmentedControl, Chip, SessionHeader, ResultSummary, MistakeList, OrderExercise, LabelDiagram, Glossary, StudyQuestion, ExamCountdown, ExamGroup (sidebar), ProgressPage, QuizHistory, ActivityStrip, StatTile, BackupCard, UpdateToast, ShareDialog (with QR), Toast, ConfirmDialog, SupplementTag, RepetitionTag, EmptyState.

---
