# Plugga

Study platform for one class: **Biologi 2 – Växtfysiologi och cellbiologi**. Prov 1 is shown as repetition. Prov 2 (mån 7 dec 2026) is added part by part with `/ny-del`. The build script is `BUILD.md`. This file is the working summary. (Draft from Phase 1, completed in Phase 5.)

## Status (2026-11-16)

- **Phases 0, 1 and 2 are done.** The approved plan, the decisions and the findings from the slide images are in `docs/plan.md`. **Read it before continuing.**
- **Next is Phase 3 (content, BUILD.md §11):** all six Prov 1 parts, the hub, the glossary, the fact-check subagent, then stop at its ⏸. It needs the material (below).
- **The learning features are tested on a test course,** not on real content: `tests/fixtures/course.ts` keeps the real course and Del 1's lessons and swaps in a fixed set of items, plus a Prov 2 part. `vite build --mode e2e` builds it to `dist/e2e`, served on :4174 for `tests/learning.e2e.ts` and `npm run shots`. It is never shipped. Real items use plain ids (`d1-k01`); the fixture uses `x` ids (`d1-xk01`) so they never collide.
- **Decided 2026-11-16:** the flower labels on Del 3 bild 5 (kronblad, foderblad, knapp, stift, sträng) come from the material. Cite that slide; they are **not** tagged "Kompletterande".
- **On Linus2026** the six lesson files were copied from Downloads to `material/prov1/`. The summary deck `Biologi nivå 2.pptx` is not there (optional: facts come from the lesson decks, and `docs/plan.md` records what the summary deck adds). Python is not installed, so `material/_extracted/prov1/` must be made with `npm run extract` after installing Python, or copied from the school PC.
- **On a new computer,** check that `material/prov1/` and `material/_extracted/prov1/` exist; they are never in Git. If they're missing, ask the user to copy them before any content work. `npm run extract` rebuilds `_extracted` from `material/prov1`.

## Never change

- **The published address** `https://linuswahlgren.github.io/plugga-biologi2/`. Progress is stored per web address, so a new address means every student loses their progress.
- **Ids.** The course id `bio2-vaxtfys-cellbio-ht26` and every part, lesson, card, quiz, practice, study-question and term id (`d3-l2`, `d3-k07`, `d3-q12`, `d3-p4`, `prov1-iq08`, `t-rubisco`). Progress is keyed by id. Text, order and titles may change freely. Never rename or reuse an id.

## Rules

- Everything a student can see is **Swedish** and lives in `src/i18n/sv.ts`. Code, identifiers and comments are English.
- Design: `docs/design-system.md` (authoritative). Use tokens only. No emoji, no exclamation marks, no gradients. Feedback words are "Rätt" and "Inte riktigt".
- Content: BUILD.md §8. Never invent facts, page numbers, quotes or sources. Anything not in the lesson material gets `supplement: true` (shown as "Kompletterande"). Source lines cite the **original** lesson decks' slide numbers ("Växtfysiologi del 2, bild 9–10"), never the summary deck's.
- Code is subject-agnostic. Only `content/` names the subject.
- `material/` (the teacher's files and `_extracted/`) and `review/` are gitignored. The repository is public: never commit them.
- Run `npm run check` and `npm test` before saying anything is done.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:5173 |
| `npm run build` | check + typecheck + `dist/site/index.html` + `dist/plugga-biologi2.html` |
| `npm run build:e2e` | The site with the test course, `dist/e2e/index.html` (tests and screenshots only) |
| `npm run preview` | Serve `dist/site` on http://localhost:4173 |
| `npm run check` | Content check (exits 1 on errors; `-- --alla` lists every warning) |
| `npm test` | Build (site, backup, test course), then Playwright: unit specs + Chromium, Firefox, WebKit |
| `npm run shots` | Screenshots of the test course build to `review/<fas>/` (set `PLUGGA_PHASE`, default `fas2`) |
| `npm run extract` | `material/prov1` → `material/_extracted/prov1` (Markdown + `media/`) |

## Folder map

- `content/` holds course data. `content/index.ts` picks the course. `biologi2/course.ts` holds settings and exams. `biologi2/prov1/{d1…d6,hub,glossary}.ts` hold Prov 1. `biologi2/prov2/` holds Prov 2.
- `src/` holds the app:
  - `main.ts` is the shell and routing. `router.ts` is the hash router. `markup.ts` renders text marks.
  - `check.ts` is the content check. `answer.ts` does answer matching. `mastery.ts` and `recommend.ts` hold the progress rules.
  - `session.ts` holds the session rules (settings in the URL, pools, sampling and interleaving, Mina missar, best score, saved sessions). `srs.ts` holds the Leitner boxes. Both are pure and unit-tested.
  - `views/sessionHost.ts` and `views/host.ts` host card and quiz sessions on part tabs, `#/omgang/…` and the hub's Provsimulering. A running session lives in `Progress.session`; its route is the host path + `?fortsatt=1`. `views/quizRun.ts`, `views/cardRun.ts` and `views/practice.ts` run them.
  - `store/` holds storage, progress v2 and the migration. `components/` has one file per component. `views/` holds the pages. `styles/` holds the CSS. `diagrams/` holds the label diagrams.
- `scripts/`:
  - `extract_material.py` uses only the Python stdlib.
  - `check-content.ts` runs directly with Node 24+.
  - `run.mjs` is the tool runner (see below).
- `tests/`: `*.unit.ts` run in Node, `*.e2e.ts` run in three browsers (`app.e2e.ts` on the real build, `learning.e2e.ts` on the test course), and `shots.spec.ts` takes the screenshots. `fixtures/course.ts` is the test course.

## Text marks (BUILD.md §6.3 plus one Plugga extension)

`**fet**`, `*kursiv*`, `H~2~O`, `x^2^`, `->`, `[text](https://…)`, `- lista`, `1. lista`, `## Rubrik`, `> Viktigt`, `!> Vanligt misstag`, `= formel`, `| tabell |`, `~~~ kod ~~~`, `![bildtext](https://…)`, `[[d3-l2|Ljusreaktionerna]]`.
**Extension:** `+> text` gives a "Kompletterande" box for a supplementary paragraph inside a lesson.

## School PCs (project on the H: network drive) – tooling notes

These apply only when the project lives on the school's network drive. On a normal computer with the project on a local disk, none of this is needed. The workarounds below are harmless there: `scripts/run.mjs` does nothing when native modules load.

- On the school PC, Node.js and Git are portable installs in `%LOCALAPPDATA%\Programs\node` and `%LOCALAPPDATA%\Programs\mingit\cmd`. They are not on PATH by default, so prepend them in each shell.
- `H:` is a DFS network share. Windows blocks running `.exe` and loading `.node` files from it. Consequences:
  - No esbuild, tsx or TypeScript 7 (all native). TypeScript 6 (JS) is used, and Node runs `.ts` scripts directly (type stripping). Every import needs an explicit `.ts` extension.
  - `scripts/run.mjs` copies rolldown's native module to `%LOCALAPPDATA%\plugga-native\` and sets `NAPI_RS_NATIVE_LIBRARY_PATH` when loading from `node_modules` fails. All npm scripts go through it.
  - `resolve.preserveSymlinks: true` in `vite.config.ts` keeps paths on `H:` instead of the share's UNC path.
  - CSS is not minified (lightningcss is native).
- Git refuses the share ("dubious ownership"). Use `git -c "safe.directory=<the path Git prints in that error>" …` per command rather than a global exception.
- Commit identity (local repo config): `linuswahlgren <linuswahlgren@users.noreply.github.com>`.
