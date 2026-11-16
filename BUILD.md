# Plugga — build script for Claude Code

Save this file as `BUILD.md` in an empty project folder, put the Prov 1 course files in `material/prov1/`, open Claude Code in that folder and say: **"Read BUILD.md and follow it from Phase 0."**

---

## 0. Decisions already made

| Setting | Value |
| --- | --- |
| Course | **Biologi 2 – Växtfysiologi och cellbiologi** |
| Prov 1 | Already written. All material in `material/prov1/` is shown as **repetition** ("Repetera") |
| Prov 2 | **Måndag 7 december 2026.** Its material comes later and is added with the `/ny-del` skill (section 9) |
| Platform name | **Plugga** (the design system's internal name, Study Kit, may stay in code and docs) |
| Language | **Swedish only**, everywhere a student can see text |
| Sharing | **One link** on GitHub Pages, posted and pinned in the class's Teams channel. A single offline file as backup |
| Privacy | Everything private. Progress lives only on the student's own device. No accounts, no tracking, no third-party requests |
| `GITHUB_REPO` | `____/____` (if blank: build the deploy workflow, don't push, and give me step-by-step instructions to publish) |
| `TEACHER` | `____` (optional; not shown if blank) |

---

## 1. Role and mission

You are a senior frontend engineer, a learning designer and an experienced Swedish gymnasium biology teacher in one.

Build **Plugga**: a fully interactive study platform for one class studying **Biologi 2 – Växtfysiologi och cellbiologi**. The first content is everything from **Prov 1**, which the class has already written; it is presented as repetition. Material for **Prov 2 on 7 December 2026** will be added later, part by part.

The platform has one purpose: learning. Every screen must help a student understand the material, remember it and test themselves. The student must always see **which subject and which topic** they are working on and **how far they have come**. Nothing on screen is decoration.

Students open it from a link in Teams, on phones and school laptops, with no account. Their progress is private, visible to them, and kept between visits.

---

## 2. How to work

1. **Start in plan mode.** Read this whole file and every file in `material/` before writing code. Then present a plan: folder structure, data schema, the six Prov 1 parts with planned item counts, and your open questions. Wait for my OK.
2. Work phase by phase (section 11). Keep a task list. Stop for my OK at the checkpoints marked ⏸; between them, keep going.
3. When this file is ambiguous, or conflicts with the material, ask me **one** short question instead of guessing.
4. **Never invent facts, page numbers, quotes or sources.** If the material doesn't support a statement, leave it out or mark it as supplementary (section 8.5).
5. Use a separate subagent, which has not seen the content being written, for the fact-check in Phase 3 and the final review in Phase 5, so the work is not grading itself.
6. If the folder is a git repository, commit after each phase with a clear message.
7. Before you say a phase is done, run `npm run check` and `npm test`, and look at the screenshots yourself.
8. Write code, identifiers and comments in English. Everything a student can see is Swedish (section 7.2).

---

## 3. Inputs

### 3.1 Prov 1 material (`material/prov1/`)

| File | What it is |
| --- | --- |
| `Intro kurs, transport över membran.pptx` | Course intro, plant vs animal cell, membrane, diffusion, osmosis (20 slides) |
| `Växtfysiologi del 1.pptx` | Turgor, tissues, xylem, root pressure, transpiration, phloem (20 slides) |
| `Växtfysiologi del 2.pptx` | Chloroplast, light reactions, Calvin cycle, C3/C4/CAM (22 slides) |
| `Växtfysiologi del 3.pptx` | Systematics, flower, reproduction, fungi and lichens (30 slides) |
| `Växtfysiologi och hållbar utveckling (1).pptx` | Sustainability, carbon sinks, climate, biodiversity, eutrophication, toxins (24 slides) |
| `Begrepp, läsanvisningar och frågor inför prov 2026.docx` | The official concept list, reading pages and 17 study questions for Prov 1 |
| `Biologi nivå 2.pptx` | A 71-slide summary deck made from the files above, with corrections and supplementary explanations marked with `*` |

- Extract every file to Markdown with `python-pptx` / `python-docx` into `material/_extracted/prov1/`, keeping slide numbers, so every item can cite its source as "bild N".
- Use `Biologi nivå 2.pptx` for structure and wording, but verify every fact against the original lesson decks. Where they differ, follow section 8.4.
- Prov 2 material will later arrive in `material/prov2/` and is handled by `/ny-del`.

### 3.2 Earlier platform (optional)

If `legacy/study-platform.html` exists, it is the earlier single-file Study Kit built in claude.ai. Reuse its markup renderer, components, icons and Swedish UI strings, and keep its `sk-` class names. If it is missing, build everything from section 7.

### 3.3 Design system

Section 7 is the Study Kit design system, adjusted for this platform. It is authoritative for every visual and copy decision.

---

## 4. What the student experiences

### 4.1 Always know where you are

This is a core requirement.

- **Sidebar header** on every screen: "Plugga", then the course "Biologi 2" and the topic area "Växtfysiologi och cellbiologi".
- **Sticky top bar** with a breadcrumb: `Biologi 2 › Del 3 · Fotosyntesen › Quiz`. Every crumb is a link. Below 860 px it collapses to a back chevron plus `Del 3 · Fotosyntesen`.
- **Page head on every part page:** eyebrow `BIOLOGI 2 · PROV 1 · DEL 3`, the status tag, the topic as the `display` title, the summary as `lead`. Prov 1 parts also carry a neutral tag "Repetition".
- **Inside a running session** (kort, quiz, prov) a compact session header replaces the page head: `Quiz · Fotosyntesen · Fråga 4 av 10`, a progress bar and an "Avsluta" button.
- `document.title` follows the view: `Quiz – Fotosyntesen – Biologi 2 | Plugga`.
- On route change, move focus to the page's `h1` so screen readers announce where the student landed.

### 4.2 Overview ("Översikt")

Top to bottom:

1. Eyebrow "BIOLOGI 2", the title "Växtfysiologi och cellbiologi" (`display`), teacher if set.
2. **"Fortsätt plugga" hero card** with the single recommended next step (4.9) and one primary button.
3. **Prov 2 countdown:** "Prov 2 om 21 dagar · mån 7 dec". While no Prov 2 material exists, the card says "Materialet till prov 2 läggs upp här när ni börjar arbeta med det. Repetera prov 1 så länge." (no empty lists, no broken tabs).
4. Four stat tiles (4.9).
5. **Aktuellt · Prov 2** (the Prov 2 parts, once added).
6. **Repetera · Prov 1** (the six parts, weakest first) and a card linking to the Prov 1 exam hub.
7. A short dismissible "Så funkar Plugga" card on the first visit only (4.10, point 6).

The sidebar groups parts the same way: "Prov 2 · 7 dec" first, then "Prov 1 · Repetera".

### 4.3 Part page ("Del")

- Tabs: **Lär dig · Kort · Quiz · Öva**, each with a count. Hide a tab when its list is empty.
- **Lär dig:** goals ("När du är klar kan du"), then collapsible lesson cards with minutes, "Markera som klar" and "Nästa lektion". Each lesson ends with a **Snabbkoll** (one inline multiple-choice question that doesn't count toward the quiz score) and a source line ("Källa: Växtfysiologi del 2, bild 9–10").
- When all lessons are done, suggest the next step: "Testa dig själv med korten".
- **Notes panel:** Viktigast (key points), Mina anteckningar (autosaved per part), and "Begrepp i den här delen" (glossary terms that belong to this part).

### 4.4 Session builder — choosing amounts

Before every card, quiz or exam session, show an inline **"Välj omgång"** panel above the session (not a modal). It remembers the last choice per mode.

| Control | Options |
| --- | --- |
| Urval | Den här delen · Välj delar (checkbox list) · Hela prov 1 · Hela prov 2 (once it has parts) · Allt · Mina missar · Kort att repetera idag (cards only) |
| Antal | Kort: 10 · 20 · 30 · Alla. Quiz: 5 · 10 · 15 · 20 · Alla. Segmented control; options larger than the pool are disabled |
| Nivå | Alla · E · C · A (chips, quiz and practice only) |
| Ordning | Blandad · I ordning |
| Läge (quiz) | Öva (svar efter varje fråga) · Provläge (svar visas när du lämnar in; tid: Ingen · 10 · 20 · 30 min) |
| Kort | Vänd korten (visa baksidan först) |

- Show the pool size live: "48 frågor finns i urvalet".
- The primary button names the result: "Starta 10 frågor".
- Three one-tap presets above the panel: **Snabbquiz 5**, **Repetera idag**, **Provsimulering 20**.
- When several parts are selected, sample proportionally across parts and avoid more than two questions in a row from the same part (interleaving). With "Blandad", shuffle the options too; answers are matched by text.
- The settings are part of the URL (4.10), so a shared link opens the same panel pre-filled. It never auto-starts.

### 4.5 Kort (flashcards)

- Click or Space flips; ← → move; `1` = "Behöver öva", `2` = "Jag kan den".
- **Spaced repetition** with five Leitner boxes and intervals of 0, 1, 3, 7 and 16 days. "Jag kan den" moves a card up one box and sets its due date. "Behöver öva" sends it to box 1 and brings it back once later in the same session.
- A card "sitter" when it is in box 3 or higher.
- End screen: "14 av 20 sitter", the cards still to practise, and the buttons "Öva på de 6 igen" and "Tillbaka till delen".

### 4.6 Quiz and Provläge

- **Öva:** after each answer show "Rätt" or "Inte riktigt", mark the right option with an icon and a word, then "Rätt svar är …", the explanation and a link "Läs mer: Ljusreaktionerna". The link opens the lesson and keeps the quiz state so the student can come back. Keys A–D answer, Enter goes on.
- **Provläge:** no feedback until "Lämna in". A question navigator (numbered dots), "Markera för att titta igen", and an optional visible timer. When time runs out, submit automatically and say so.
- **Results page:** `7 av 10 · 70 %`, an encouraging line in the voice of section 7.2, a breakdown per part and per level, and every wrong answer with "Ditt svar", "Rätt svar är …", the explanation and the lesson link. Buttons: "Öva på missarna", "Ny omgång", "Tillbaka".
- **Mina missar:** every wrong answer goes into a mistakes bank and leaves it after being answered right in two later sessions.
- A part's **best quiz score** only counts sessions with at least 10 questions or the whole part pool, so a lucky 5-question run can't mark a part as done.

### 4.7 Öva — practice item kinds

| Kind | Behaviour |
| --- | --- |
| `text` | Typed answer, checked automatically (6.4) |
| `number` | Numeric answer with optional tolerance; a decimal comma works |
| `self` | Explain-questions: the student writes, taps "Visa exempelsvar", then grades themselves "Jag hade rätt" / "Inte än" |
| `order` | Put 4–7 steps of a process in the right order. Drag and drop **and** up/down buttons, fully keyboard accessible |
| `label` | Name the numbered parts of a diagram by choosing a term for each number |

- Every kind can have a "Ledtråd".
- `order` exercises are required for: rottrycket, tryckströmsteorin, ljusreaktionen, Calvincykeln, blomväxtens livscykel, basidiesvamparnas livscykel and övergödningen i Östersjön.
- `label` diagrams are original inline SVGs drawn for the platform in the design system's line style (no copied images): **växtcellen** (Del 1), **bladets tvärsnitt** (Del 2), **kloroplasten** (Del 3) and **blomman** (Del 4). Use only terms from the material; extra parts such as kronblad and foderblad are allowed only marked as supplementary. Build the diagram component so cell biology diagrams for Prov 2 can be added the same way.

### 4.8 Exam hubs

One hub per exam, in the sidebar above that exam's parts.

**"Repetera prov 1"**:

- **Läsanvisningar:** the book pages exactly as listed in the course document.
- **Instuderingsfrågor 1–17:** each with an exempelsvar written from the material (80–200 words, short paragraphs or a list), "Svaret finns i: Del 2 · Floemet" links, and self-grading. Progress: "9 av 17 kan jag".
- **Begreppslista:** every term from the course document, grouped under its six themes, with a search field that ignores case and diacritics ("vaxt" finds "växt"), a filter "Bara de jag inte kan", a button "Öva som kort" and a print view.
- **Provsimulering:** the preset session over all Prov 1 parts.
- **Om materialet:** the corrections table (8.4) and what the "Kompletterande" tag means.

**"Inför prov 2 · 7 december"**: the countdown and the same structure, filled in as Prov 2 material arrives. Until then it shows the empty state from 4.2 and links to "Repetera prov 1".

### 4.9 Progress — private, visible, kept

**Per part**, compute a mastery percentage from: lessons done (weight 20), cards that "sitter" (30), best quiz score (35) and practice solved (15). When a part has no items of a kind, drop that component and rescale the rest. Show it as a bar with tabular figures in the sidebar and on the part page. Per exam, show the average of its parts.

**Status tags:**

| Tag | Rule |
| --- | --- |
| Inte påbörjad | Nothing done |
| Pågår | Started, no other rule matches |
| Behöver repeteras | Best quiz under 70 %, or 5+ cards due, or 3+ questions in Mina missar |
| Klar | Mastery 85 % or more **and** best quiz 80 % or more |

**Overview tiles:** Prov 1 repeterat (%), Kort som sitter, Kort att repetera idag, Instuderingsfrågor jag kan.

**"Mina framsteg" page** (in the sidebar, below the parts), where the student sees everything about their own work:

- Mastery per exam and per part, with the status tags.
- Quiz history: date, part or selection, mode, score, newest first (last 50).
- Cards: how many per box, and how many are due today and this week.
- Instuderingsfrågor: how many "kan jag".
- Activity: "Pluggat 4 av de senaste 7 dagarna" and a 28-day row of squares (filled = studied that day). Factual; no streak fireworks.
- Where the data lives and how to keep it (4.10).
- Reset per part, per exam, or everything, behind a confirm dialog that says exactly what will be cleared.

**"Fortsätt plugga" recommendation**, first match wins:

1. An unfinished session → "Fortsätt där du slutade".
2. 10+ cards due → "Repetera 12 kort".
3. Prov 2 has parts: next unread lesson there, then its quiz.
4. Prov 2 is within 14 days and has parts → "Provsimulering prov 2".
5. Weakest Prov 1 part below 70 % → "Repetera Del 2".
6. Mina missar not empty → "Öva på missarna".
7. Otherwise → "Blandat quiz från prov 1".

### 4.10 Sharing and keeping progress

This is a core requirement: a student taps the link in Teams and is studying within seconds, with no install and no account, and their progress is still there next week.

1. **One link.** A GitHub Actions workflow deploys the build to GitHub Pages. That link is posted and pinned in the class's Teams channel. It is the only thing students need. Because progress is stored per web address, **the address must never change**; say so in `CLAUDE.md` and `README.md`.
2. **Updates reach everyone automatically.** When new Prov 2 material is published, students see it at the same link with their progress intact. Show a quiet toast "Nytt material finns. Ladda om" when a newer version is detected.
3. **Installable app (PWA).** A web manifest and a service worker for the hosted version, so students can add Plugga to their home screen and use it offline. Cache with network-first for the page so updates arrive. Give clear Swedish instructions for iPhone ("Dela › Lägg till på hemskärmen") and Android.
4. **Keeping progress safe:**
   - Ask the browser for persistent storage (`navigator.storage.persist()`) after the first real progress.
   - Safari can clear stored data for sites that haven't been visited for a while, unless the site is added to the home screen. Check WebKit's current behaviour and word the iPhone tip on "Mina framsteg" to match.
   - "Spara en kopia" downloads a small `.json`; "Läs in en kopia" imports it, validates the course id and version, and merges, keeping the best of both. Also a copyable text code for moving between phone and computer.
   - When a student has real progress and no copy from the last 14 days, show one quiet card on the overview: "Spara en kopia av dina framsteg", with "Spara" and "Inte nu".
5. **Private by design:** progress is never sent anywhere. No analytics, no cookies, no external fonts or scripts; the page makes no requests to any other site. Add `<meta name="robots" content="noindex">` so the site doesn't show up in search engines. Say this to students in plain Swedish on "Mina framsteg" and in the intro card: "Dina framsteg sparas bara på den här enheten. Ingen annan kan se dem, inte heller läraren."
6. **First-visit intro card** ("Så funkar Plugga"): learn, practise, test; progress is private and saved on this device; tip to add Plugga to the home screen.
7. **"Dela" button** in the top bar: copies the link to the current view (toast "Länken är kopierad") and shows a QR code for projecting in class. Generate the QR code locally with a small inlined MIT-licensed encoder.
8. **Deep links:** hash routes for every view and session preset, for example `#/d3/quiz?antal=10&niva=E,C&lage=prov&tid=20`.
9. **Backup file:** `dist/plugga-biologi2.html`, one self-contained file that works offline from `file://` (no service worker, no fetches). Use it only if the link can't be used; tell students that progress in the file is separate from the link's.
10. **Teams post:** write `docs/teams-inlagg.md`, a short Swedish post for the channel with the link, what Plugga is, the privacy line and the home-screen tip.
11. **Metadata and print:** title, description, Open Graph tags, inline SVG favicon, `theme-color`, app icons; print styles for the begreppslista, the instuderingsfrågor and a part's key points.

### 4.11 Educational rules (everywhere)

- Feedback is immediate in Öva, kind and specific: right or not, the right answer, why, and where to read more.
- Every quiz item, practice item, card and term links back to the lesson that teaches it.
- Retrieval before re-reading: lessons end with a Snabbkoll, and finished lessons lead to cards and the quiz.
- Interleave when parts are mixed; space the cards; keep Mina missar visible.
- Show sources on every lesson. Content that is not in the lesson material carries a neutral **"Kompletterande"** tag with the tooltip "Finns inte i lektionsmaterialet. Jämför med kursboken."
- Plain Swedish at gymnasium level: short sentences, one idea per paragraph, every term in **bold** and defined the first time it appears.

---

## 5. Architecture

- **Vite + TypeScript, no UI framework.** Components are plain functions that return DOM elements, styled by the design system's CSS. `vite-plugin-singlefile` inlines the app into one HTML file.
- **Build output:** `dist/site/` for GitHub Pages (the self-contained `index.html` plus `manifest.webmanifest`, `sw.js` and app icons) and `dist/plugga-biologi2.html` (the backup file, no service worker).
- **Fonts are bundled**, not loaded from Google: Figtree as a variable woff2 (latin subset, which covers å, ä and ö), inlined. Use the system monospace stack for the rare code text.
- **Scripts:** `dev`, `build`, `preview`, `check` (content check; exits 1 on errors), `test` (Playwright), `extract` (material → Markdown).
- **Router:** a small typed hash router; every view and session setting is reachable by URL.
- **State:** one store with subscribe; progress saved debounced (300 ms). The storage wrapper catches errors and falls back to memory with the banner "Dina framsteg sparas inte i den här webbläsaren".
- **Course files stay private:** add `material/` (including `_extracted/`) and `review/` to `.gitignore`. The teacher's original slides and documents, and the text extracted from them, are never committed or pushed: the repository is public. Only the finished study content in `content/` is published.
- **Security:** the text renderer escapes all HTML first and then applies the marks; only `http(s)` links, with `rel="noopener"`; never put unescaped content into `innerHTML`.
- **All strings** a student can see live in one file, `src/i18n/sv.ts`. There is no English string set.
- **Subject-agnostic code:** the code never names biology; everything subject-specific is in `content/`. Build for this one course only; don't build a course picker.
- **Performance budget:** the app file is at most 700 KB uncompressed including fonts; interactive within 1 s on a mid-range phone; no layout shift when a card flips or feedback appears.

Suggested structure (adjust in the plan if you have a better one):

```
material/            prov1/  prov2/  _extracted/   (not bundled)
content/
  biologi2/course.ts      course settings and exams
  biologi2/prov1/d1.ts … d6.ts  hub.ts  glossary.ts
  biologi2/prov2/         (filled later by /ny-del)
  _template/part.ts
src/
  main.ts  router.ts  markup.ts  check.ts  srs.ts  session.ts  recommend.ts
  store/   progress.ts  migrate.ts  storage.ts  backup.ts
  pwa/     sw.ts  register.ts  update.ts
  i18n/    sv.ts
  components/  (one file per component)
  diagrams/    cell.ts  leaf.ts  chloroplast.ts  flower.ts
  styles/  tokens.css  bundle.css  app.css  print.css
  fonts/   figtree-latin.woff2
  icons.ts
scripts/ check-content.ts  extract_material.py
tests/   *.spec.ts
docs/    design-system.md  components.md  teams-inlagg.md
.claude/skills/  ny-del/  publicera/
.github/workflows/deploy.yml
CLAUDE.md  README.md
```

---

## 6. Data

### 6.1 Course schema

This extends the earlier Study Kit schema and stays backward compatible with it (units are still called `weeks` in data and "Del" in the UI). New: exams.

```ts
type Accent = "green" | "blue" | "teal" | "plum" | "slate";
type Level = "E" | "C" | "A";

interface Course {
  id: string;                // "bio2-vaxtfys-cellbio-ht26" — progress key, never change
  subject: string;           // "Biologi"
  title: string;             // "Biologi 2" — first breadcrumb
  area: string;              // "Växtfysiologi och cellbiologi"
  teacher?: string;
  accent: Accent;
  currentExam: string;       // "prov2"
  exams: Exam[];             // newest first
  weeks: Week[];             // all parts, each tied to an exam
  glossary?: Term[];
}

interface Exam {
  id: string;                // "prov1", "prov2"
  title: string;             // "Prov 1", "Prov 2"
  topic?: string;            // "Växtfysiologi och hållbar utveckling"
  date?: string;             // "2026-12-07"
  status: "done" | "upcoming";   // done → parts shown as Repetera
  readingList?: string[];    // book pages, verbatim
  studyQuestions?: StudyQuestion[];
  corrections?: { where: string; material: string; corrected: string }[];
}

interface Week {
  id: string; exam: string; title: string; dates?: string; summary?: string; goals?: string[];
  lessons: Lesson[]; cards: Card[]; quiz: QuizItem[]; practice: PracticeItem[]; keyPoints: string[];
}

interface Lesson {
  id: string; title: string; minutes: number; body: string;
  check?: QuizItem;          // Snabbkoll
  source?: string;           // "Växtfysiologi del 2, bild 9–10"
  supplement?: boolean;
}

type Card =
  | [string, string]         // legacy form, still accepted
  | { id: string; front: string; back: string; lesson?: string; supplement?: boolean };

interface QuizItem {
  id: string; q: string; options: string[]; answer: string; explain: string;
  level?: Level; lesson?: string; source?: string; supplement?: boolean;
}

type PracticeBase = { id: string; q: string; hint?: string; level?: Level; lesson?: string };
type PracticeItem =
  | (PracticeBase & { kind: "text"; answer: string | string[]; solution?: string })
  | (PracticeBase & { kind: "number"; answer: number; tolerance?: number; unit?: string; solution?: string })
  | (PracticeBase & { kind: "self"; solution: string })
  | (PracticeBase & { kind: "order"; steps: string[]; explain?: string })   // steps in correct order
  | (PracticeBase & { kind: "label"; diagram: string;                       // "cell" | "leaf" | "chloroplast" | "flower" | …
                      markers: { n: number; answer: string }[]; distractors?: string[] });

interface StudyQuestion { id: string; n: number; q: string; modelAnswer: string; refs: string[]; level?: Level }

interface Term {
  id: string; term: string; definition: string;
  theme: string;             // one of the themes in that exam's concept list
  week: string; lesson?: string; card?: string; supplement?: boolean;
}
```

Legacy practice items without `kind` are inferred: a number answer → `number`, a text or list answer → `text`, no answer → `self`.

### 6.2 Ids

- Pattern: course `bio2-vaxtfys-cellbio-ht26`; exams `prov1`, `prov2`; Prov 1 parts `d1`–`d6`, Prov 2 parts continue from `d7`; lessons `d3-l2`, cards `d3-k07`, quiz `d3-q12`, practice `d3-p4`, study questions `prov1-iq08`, terms `t-rubisco`.
- Progress is keyed by id. **Never rename or reuse an id once the platform has been shared.** Text, order and titles may change freely.
- Legacy cards and items without an id get a hash-based id, and the content check warns about them.

### 6.3 Text marks

Keep the earlier Study Kit marks and add two:

| Write | Get |
| --- | --- |
| `**bold**`, `*italic*` | bold, italic |
| `H~2~O`, `x^2^` | subscript, superscript |
| `->` | → |
| `[text](https://…)` | external link |
| blank line | new paragraph |
| `- item` / `1. item` | lists |
| `## Heading` | small heading in a lesson |
| `> text` | "Viktigt" box |
| `= formula` | centered formula line |
| lines starting with a pipe | table, first line is the header |
| `~~~` before and after | code block |
| `![bildtext](https://…)` | image (hosted site only) |
| **new:** `!> text` | "Vanligt misstag" box (sunken surface, eyebrow label) |
| **new:** `[[d3-l2\|Ljusreaktionerna]]` | internal link to a lesson |

### 6.4 Answer matching

- Ignore case, extra spaces, a final full stop and a leading "en"/"ett".
- A list accepts any of its spellings.
- Numbers compare numerically; a comma works as a decimal point; `tolerance` accepts nearby values.
- For answers of six letters or more, one wrong letter still counts as right, with the note "Rätt – kolla stavningen: fotosyntes".
- Å, ä and ö are letters of their own, never treated as accented a or o.

### 6.5 Progress storage

Key `plugga:<courseId>`, versioned JSON:

```ts
{
  v: 2, courseId, updatedAt, lastBackupAt,
  lessons:  { [lessonId]: doneAtISO },
  cards:    { [cardId]: { box: 1|2|3|4|5, due: "YYYY-MM-DD", seen: number } },
  quiz:     { attempts: Attempt[] /* last 50 */, best: { [partId]: percent } },
  missed:   { [quizId]: rightCountSince },
  practice: { [practiceId]: { solved: boolean, at } },
  study:    { [studyQuestionId]: "kan" | "inte-an" },
  notes:    { [partId]: string },
  activity: { [YYYY-MM-DD]: true },
  session:  ResumableSession | null,
  settings: { theme: "system" | "light" | "dark", sessionDefaults: {...}, introDismissed: boolean }
}
```

Write a migration from the earlier Study Kit format (`studykit:<id>`, v1) to v2.

### 6.6 Content check

Run at build time (`npm run check`) and at runtime. Students only see errors; warnings show in dev or with `?kontroll` in the URL. All messages are in Swedish.

- **Errors:** duplicate ids; a part without a valid `exam`; a quiz `answer` that isn't one of the options; fewer than 3 options or duplicate options; an empty explanation; a link to a missing lesson or part; an `order` item with fewer than 3 steps; a `label` marker without a term; `currentExam` pointing nowhere.
- **Warnings:** missing ids; "Vecka" in a title; "Fel!", exclamation marks or emoji in feedback or UI copy; English words in student-facing UI strings; unformatted chemistry (`CO2`, `H2O`, `O2`) outside sub/superscript; a part with fewer than 15 cards or 15 quiz questions; correct answers clustered in one position; an item without a lesson link or source.

---

## 7. Design system: Study Kit (authoritative)

Also save this section as `docs/design-system.md`.

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

## 8. Course content

### 8.1 Course settings

```ts
{
  id: "bio2-vaxtfys-cellbio-ht26",
  subject: "Biologi",
  title: "Biologi 2",
  area: "Växtfysiologi och cellbiologi",
  teacher: TEACHER || undefined,
  accent: "green",
  currentExam: "prov2",
  exams: [
    { id: "prov2", title: "Prov 2", date: "2026-12-07", status: "upcoming" },
    { id: "prov1", title: "Prov 1", topic: "Växtfysiologi och hållbar utveckling", status: "done",
      readingList: ["s. 47–51", "s. 150–154", "s. 155–156", "s. 159–163", "s. 165–167",
                    "s. 171–177", "s. 178–180", "s. 183–190", "Kapitel 11, s. 215–245"] }
  ]
}
```

### 8.2 The six Prov 1 parts

All have `exam: "prov1"` and are shown under "Repetera · Prov 1".

| Id | Title | Main sources | Must cover | Study questions |
| --- | --- | --- | --- | --- |
| d1 | Växtcellen och transport över membran | Intro kurs bild 4–20; del 1 bild 2–3 | Plant vs animal cell, plastids, cell wall, plasmodesmata, vacuole; membrane and phospholipids; semipermeability; diffusion; concentration gradient; osmosis and aquaporins; hypo-, iso- and hypertonic; turgor and plasmolysis | 1 |
| d2 | Växtens vävnader och transport | Del 1 bild 4–20 | Four tissue types; cell wall substances; meristem, cambium, annual rings; organs (root, stem, leaf, shoot and root system); xylem (tracheids, vessels); root pressure and active ion uptake; overwatering; transpiration and the water column; phloem and pressure-flow; girdling | 2, 4, 5, 6, 7 |
| d3 | Fotosyntesen | Del 2 bild 3–22 | Chloroplast structure; the two stages; PS II, electron transport chain, PS I; ATP synthase; Calvin cycle and rubisco; how the stages depend on each other; cellular respiration in brief; C3, C4 and CAM | 8, 9, 10, 11 |
| d4 | Växternas livscykel och förökning | Del 3 bild 2–14 | Systematics, cladogram vs phylogenetic tree; annual, biennial, perennial; flower anatomy; life cycle with n/2n, double fertilisation, seed, embryo, endosperm, cotyledons; pollination strategies; seed dispersal; sexual vs vegetative reproduction | 3, 12, 15, 16 |
| d5 | Svampar och lavar | Del 3 bild 15–30 | Fungi as a kingdom; chitin, hyphae, mycelium, fruiting bodies; main groups; four ways of life; mycorrhiza; lichens; reproduction and the basidiomycete life cycle; uses | 13, 14 |
| d6 | Hållbar utveckling | Hållbar utveckling bild 1–24 | Definition and three dimensions; carbon cycle and sinks; weather vs climate; greenhouse effect and its enhancement; albedo and permafrost feedback; heat, drought and carbon uptake; biodiversity at three levels; ecosystem services and pollination; fungi in the nutrient cycle; eutrophication and the Baltic Sea; bioaccumulation and biomagnification; planetary boundaries | 17 |

### 8.3 Amounts

| Per part | Target |
| --- | --- |
| Lessons | 3–6, each 4–10 minutes, each with a Snabbkoll and a source line |
| Cards | 18–25 |
| Quiz questions | 15–20, levels roughly 50 % E, 35 % C, 15 % A |
| Practice | 6–10, including at least one `order` item, the `label` diagram where listed in 4.7, and two `self` items |
| Key points | 5–8 |

Prov 1 as a whole: all 17 instuderingsfrågor with exempelsvar, every term from the course document's concept list in the glossary (with its theme), and the corrections table.

### 8.4 Corrections to apply

| Where | Material says | Use instead |
| --- | --- | --- |
| Fotosystem I/II | Klorofyll b in PS I; PS II at 677 nm | Both reaction centres hold klorofyll a (P680 and P700); klorofyll b and karotenoider sit in the antennas. Use 680 nm |
| C4-växter | "PEP-karboxylsyra" | PEP-karboxylas |
| Självpollinering | Unclear wording | Male and female parts maturing at different times **counteracts** self-pollination |
| Albedo | Ice reflects heat radiation | Albedo is the reflection of incoming sunlight; ice and snow reflect much of it |
| Växthuseffekten | Heat radiation is "reflected" back to space | The Earth **emits** heat radiation; greenhouse gases absorb and re-emit part of it |

Show these on the "Om materialet" page of the Prov 1 hub. Write the content according to the right column.

### 8.5 Accuracy rules

- Facts come from the material. Supplementary content is allowed only where a concept-list term or a study question needs it and the lessons don't cover it (the summary deck marks these with `*`). Tag it `supplement: true`.
- **Planetära gränser** are not in the lesson material. The summary deck states that seven of nine boundaries are crossed, citing a 2026 report. Verify the current figure and its source on the web before using it; if you can't verify it, explain the framework without a number. Tag it supplementary.
- **Antropocen:** teach it as the material does ("i lektionsmaterialet kallas …"). Add one supplementary sentence that the term is widely used but has not been formally adopted as a geological epoch; verify that wording before publishing.
- Don't build quiz questions on the historical anecdotes (antiken, Linné and the worms); keep those in lesson text only, as the material states them.
- Don't cite single book pages for facts; the material's page references are inconsistent. Use the reading list as given.
- **Fact-check (Phase 3):** a separate subagent compares every lesson, card, quiz item, practice item and model answer with `material/_extracted/prov1/` and lists mismatches, unsupported claims and missing supplementary tags. Fix everything before the checkpoint.

### 8.6 Writing rules for items

- **Quiz:** four options (three only when a fourth would be silly), exactly one correct, all similar in length and grammar. Distractors are real misconceptions: xylem ↔ floem, PS I ↔ PS II order, hypoton ↔ hyperton, C4 ↔ CAM, kitin ↔ cellulosa, haploid ↔ diploid, bioackumulation ↔ biomagnifikation, the direction of the albedo effect. No "alla ovanstående" or "inget av ovanstående", no trick questions; write negations as **inte** in bold. Spread correct answers evenly over the positions.
- **Explanations:** one to three sentences: why the answer is right and why the most tempting wrong option is wrong.
- **Levels** (a rough guide, shown with the tooltip "Ungefärlig nivå enligt betygsstegen"): **E** recall and describe; **C** explain relationships and causes; **A** apply to a new situation, compare and reason about consequences (girdling, overwatering, climate feedback, what happens if pollinators disappear).
- **Cards:** front is a term or a short question; back is one idea in at most 25 words. Add reverse cards for the most important processes.
- **Lessons:** start with why the topic matters in one sentence, explain in short paragraphs, use a "Viktigt" box for the core idea and a "Vanligt misstag" box where the material invites one (for example, "Mörkerreaktionen sker inte bara i mörker").

---

## 9. Maintainability

- **`CLAUDE.md`:** project purpose, commands, folder map, a summary of the design and content rules (pointing to `docs/design-system.md` and section 8), the id rule, **"never change the published web address"**, "everything students see is Swedish", and "Run `npm run check` and `npm test` before saying anything is done."
- **Skill `/ny-del`** (`.claude/skills/ny-del/SKILL.md`): takes new material in `material/prov2/` (or another exam folder), extracts it, asks which exam it belongs to (default: `currentExam`), proposes a part outline with item counts for my approval, writes the part with ids, levels, lesson links and sources, adds new concept-list terms and study questions to that exam's hub, runs the fact-check, `check` and `test`, and finally offers to publish.
- **Skill `/publicera`:** build, check, test, deploy to GitHub Pages, confirm the live site loads and that existing progress survives the update, then remind me which Teams post to update if any.
- **When Prov 2 is over:** document in `README.md` how to set `prov2` to `status: "done"` and add `prov3`, so Prov 2 moves to "Repetera" with progress kept.
- **Working from another computer:** `/ny-del` first pulls the latest version from GitHub. If `material/` is missing or empty (it isn't in the repository), it asks me to add the files before doing anything else.
- **`README.md` in Swedish**, two parts: for me (how to add material, how to publish, how to work from another computer with clone and pull, how the link and Teams post work, why the address must never change) and a short "Så använder du Plugga" for students (including saving a copy and adding to the home screen).

---

## 10. Quality gates

**Automated (Playwright + `@axe-core/playwright`), in Chromium, WebKit and Firefox:**

- The site and the backup file both load with no console errors and **no requests to any other origin**.
- Navigation: every route renders; the breadcrumb, eyebrow and `document.title` match the view; deep links open the right view with the session builder pre-filled.
- Exams: Prov 1 parts show as "Repetera" with the Repetition tag; the Prov 2 hub shows the countdown to 7 December and the empty state without errors; adding a test part with `exam: "prov2"` moves it into "Aktuellt".
- Session builder: counts match the pool, disabled options are right, presets fill the right values.
- Cards: flip and rate by keyboard; Leitner boxes and due dates update; "Behöver öva" cards come back once.
- Quiz: Öva feedback; Provläge with no feedback until hand-in; timer auto-submit (with a mocked clock); results breakdown; Mina missar fills and empties.
- Practice: every kind works, including `order` with keyboard only and `label`.
- Progress: persists after reload and after a content update; "Mina framsteg" shows the right numbers; export/import round-trips; the v1 → v2 migration works; the storage fallback banner shows when storage throws; the backup card appears and hides by its rule.
- PWA: manifest valid, service worker installs, the app works offline after one visit, the update toast appears when a new version is deployed.
- Answer matching edge cases: decimal comma, tolerance, "en"/"ett", the one-letter typo rule, å/ä/ö kept.
- Language: a scan of the rendered UI (text, `aria-label`, `title`, `alt`) finds no English UI strings.
- Content check: zero errors on the real course.
- Axe: no violations at 375 × 812, 820 × 1180 and 1440 × 900, in light and dark.
- File size within budget.

**Screenshots** to `review/` for me, at the three sizes in both themes: overview, part page (each tab), session builder, quiz feedback, results, a card (both sides), Prov 1 hub, Prov 2 empty state, glossary, Mina framsteg, share dialog, an `order` and a `label` exercise. Look at them yourself first and fix anything that breaks the design system.

---

## 11. Phases

| Phase | Work | Stop |
| --- | --- | --- |
| **0 · Read and plan** | Plan mode. Extract the material. Present the plan from section 2 and your open questions. | ⏸ |
| **1 · Foundation** | Scaffold; bundled font, tokens and component CSS; port the legacy components if present; router, store, storage, markup renderer, content check, exams model; build working on a local server and from `file://`; Del 1 with two real lessons as a test. Send me the file and screenshots. | ⏸ |
| **2 · Learning features** | Session builder, cards with spaced repetition, quiz and Provläge, results, Mina missar, all practice kinds and diagrams, progress model, Mina framsteg, overview with countdown and recommendation, notes panel. | |
| **3 · Content** | All six Prov 1 parts, the Prov 1 hub, the glossary, the corrections. Fact-check subagent; fix; content check at zero errors. Show me a table of counts per part, the list of supplementary items and anything you were unsure about. | ⏸ |
| **4 · Sharing and keeping progress** | GitHub Pages workflow, PWA (manifest, service worker, update toast), persistent storage, backup and restore, backup card, "Dela" with QR, deep links, print styles, metadata, `noindex`, the Teams post. | |
| **5 · Quality and handover** | Full test suite, accessibility, language scan, performance, review subagent, final screenshots, `README.md`, `CLAUDE.md`, the two skills, `docs/`. Deploy (or give me exact publishing steps) and deliver the link, the Teams post and the backup file. | ⏸ |
| **Later · Prov 2** | When I add material to `material/prov2/`, I run `/ny-del`. Not part of this build. | |

---

## 12. Definition of done

- [ ] Every screen shows subject and topic (sidebar header, breadcrumb, page eyebrow or session header), and the browser tab title matches.
- [ ] Prov 1 material is complete and shown as repetition; Prov 2 shows the countdown to 7 December and a clear empty state, ready for `/ny-del`.
- [ ] A student can choose how many cards and quiz questions to do, from which parts, at which level, in Öva or Provläge, in two taps or fewer with the presets.
- [ ] Progress is private, shown on "Mina framsteg", survives reloads and content updates, and can be saved and restored as a copy.
- [ ] All six parts meet the amounts in 8.3; all 17 study questions have model answers; the glossary covers the whole concept list.
- [ ] Every item links to its lesson; every lesson shows its source; supplementary content is tagged; the corrections are applied.
- [ ] One link works on phones and laptops, can be added to the home screen and works offline after the first visit; the backup file works from `file://`.
- [ ] No requests to other sites; no English anywhere in the UI.
- [ ] The public repository contains no files from `material/` (check with `git ls-files`).
- [ ] Content check: zero errors. Tests: all green in three browsers. Axe: zero violations.
- [ ] The UI follows the design system exactly: tokens only, Swedish copy from 7.2, no emoji, no exclamation marks, no gradients.
- [ ] `README.md`, `CLAUDE.md`, `docs/` (including the Teams post) and the two skills exist and are accurate.

