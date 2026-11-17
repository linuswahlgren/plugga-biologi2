---
name: ny-del
description: Add a new part ("Del") to Plugga from new lesson material in material/prov2/ (or another exam folder). Pulls the latest version, extracts the material, asks which exam it belongs to, proposes an outline for approval, writes the part with ids, levels, lesson links and sources, adds glossary terms and study questions, runs an independent fact-check, the content check and the tests, and offers to publish. Use when the user types /ny-del or asks to add new course material.
---

# /ny-del: add a part from new material

The user is the maintainer, not a developer. Talk to them in the language they write in, plainly. Everything students see is Swedish.

Read first: `CLAUDE.md`, `docs/plan.md` (decisions and earlier findings), BUILD.md §6 (schema, ids, text marks) and §8.3–8.6 (amounts, accuracy, writing rules), and `docs/design-system.md` §7.2 (Swedish voice). Use `content/biologi2/prov1/d3.ts` as the model for a part file.

## 1. Get the latest version

1. `git status`. If there are uncommitted changes you did not make, ask before going on.
2. `git pull --ff-only`. If it fails (no network, diverged history), stop and explain what happened. Never force anything.

## 2. Check the material

- The teacher's files are never in Git. Check that the exam folder exists and has files: by default `material/<currentExam>/` (`currentExam` is in `content/biologi2/course.ts`; now `prov2`).
- If `material/` or the folder is missing or empty, ask the user to copy the files there (from the computer where they are, a USB stick or OneDrive) and **stop**. Do nothing else until they are there.

## 3. Ask which exam

Ask once which exam the material belongs to, with `currentExam` as the first, recommended option. If the folder holds several new decks, also ask whether they make one part or several (propose a split by deck).

## 4. Extract and read

```bash
python -I scripts/extract_material.py material/<exam> material/_extracted/<exam>
```

- The script reads one folder, not its subfolders. If the user put the files in a subfolder (Prov 2's are in `material/prov2/Cellbiologi/`), give that folder as the source.
- Read every new Markdown file in full. Slide numbers are the `## bild N` headings.
- Look at slide images in `media/` where the text is thin (diagrams, labels, tables in pictures).
- PDFs are not extracted by the script: read them with the Read tool.
- Find what is new: compare with the `source:` lines of the parts that already exist for that exam.
- Note anything in the material that looks wrong (it becomes a correction, BUILD.md §8.4 style) and anything a study question or concept term needs that the material does not cover (it becomes supplementary).

## 5. Propose an outline and wait

Present, and wait for the user's OK or changes:

- Part id: the next free number across **all** exams (`d7` after `d6`, and so on). Never reuse or renumber an id.
- Title, exam, a one-line summary, goals ("När du är klar kan du").
- Lessons: title, minutes (4–10), source slides.
- Planned counts (BUILD.md §8.3): 3–6 lessons, 18–25 cards, 15–20 quiz questions (about 50 % E, 35 % C, 15 % A), 6–10 practice items (at least one `order`, two `self`, and a `label` diagram where a diagram fits), 5–8 key points.
- New concept-list terms, study questions and reading list entries, if the course document has them.
- What would be supplementary, what looks wrong in the material, and open questions.

## 6. Write the part

- `content/biologi2/<exam>/d<N>.ts` exporting `d<N>: Week` with `exam: "<exam>"`. Register it in `content/biologi2/<exam>/index.ts`, in order.
- Ids: lessons `dN-l1`, cards `dN-k01`, quiz `dN-q01`, practice `dN-p1`. Every card, quiz and practice item has `lesson`. Every lesson has a `source` naming the original deck and slides ("Cellbiologi del 1, bild 4–9"). Every lesson has a Snabbkoll (`check`).
- Facts only from the material. Anything else: `supplement: true`, or a `+>` box inside a lesson. Never invent facts, page numbers, quotes or sources.
- Writing rules (BUILD.md §8.6): four options of similar length, one correct, real misconceptions as distractors, correct answers spread over positions, negations as `**inte**`, explanations of one to three sentences. Chemistry with marks: `H~2~O`, `CO~2~`, `NADP^+^`. No emoji, no exclamation marks.
- A new `label` diagram: draw an original inline SVG in `src/diagrams/` like `cell.ts` (shared helpers in `draw.ts`), register it in `src/diagrams/index.ts`. Label terms come from the material only.

## 7. Hub, glossary, study questions

- Exam hub `content/biologi2/<exam>/hub.ts`: add what the course document gives: `topic`, `readingList` (verbatim), `lectures`, `themes` (concept-list themes in their original order), `studyQuestions` (`<exam>-iq01` …, each with `modelAnswer` and `refs` to lessons or parts), `corrections`. Continue numbering; never renumber.
- Glossary: terms for this exam go in `content/biologi2/<exam>/glossary.ts`, spread into `glossary` in `content/biologi2/course.ts`. A term belongs to an exam through its `week`. Ids `t-<slug>`; if that id is taken (also by another exam's term), use `t-<slug>-<exam>`. Link `lesson`, and `card` where a card practises the term.

## 8. Fact-check with a separate subagent

Spawn a general-purpose subagent that has **not** seen the writing. Give it the paths of the new content files and of `material/_extracted/<exam>/`, and ask it to compare every lesson, card, quiz item, practice item, model answer and term with the material and list: mismatches, unsupported claims, missing `supplement` tags, wrong slide numbers, and distractors that are also correct. For a large part, split it over two or three subagents. Fix every finding, or tell the user why not.

## 9. Check and test

1. `npm run check`: zero errors. Look at the warnings for the new part with `npm run check -- --alla`.
2. `npm test`. The test course (`tests/fixtures/course.ts`) has its own Prov 2, so the learning specs don't depend on the real content. When the exam had no parts before, update the real-site specs that expect it to be empty, in `tests/app.e2e.ts`:
   - the overview: the countdown text, and the hero (the recommendation changes once the current exam has parts, `src/recommend.ts`), and the sidebar group head;
   - "Prov 2 shows the countdown and the empty state";
   - the route list in `tests/quality.e2e.ts` comes from the course, so new parts are walked, scanned and checked by axe automatically.
   A new label diagram also needs a `label` item that uses it in the test course's Prov 2 part (`d7` in `tests/fixtures/course.ts`), or "uses every diagram" in `tests/session.unit.ts` fails. Do not weaken any other test.
3. Look at the part yourself: `npm run preview` and open http://localhost:4173/#/d<N>. Check a lesson, the quiz and any new diagram, on a narrow and a wide window.

## 10. Record and commit

- Update `docs/plan.md` (counts table, supplementary items, decisions) and the status in `CLAUDE.md`.
- Check that no private files are staged: `git status`, and `git ls-files material review` must print nothing.
- Commit with a clear message ("Del 7: Cellens uppbyggnad").
- Show the user a table of counts, the supplementary items and anything you were unsure about.
- Ask whether to publish now. On yes, run `/publicera`. Never push without asking.
