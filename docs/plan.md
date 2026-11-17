# Plugga: the approved plan (Phase 0, approved 2026-11-16)

This is the plan the user approved before Phase 1, plus what was found after approval. It is kept in the repo so that a Claude session on another computer has the same starting point. BUILD.md stays the build script; this file records the decisions made under it.

## Decisions

- **Tooling:** Node.js LTS (v26 on the school PC; v24 or later works), Vite 8 + TypeScript 6 + `vite-plugin-singlefile`, and Playwright 1.64 with Chromium, Firefox and WebKit.
- **`GITHUB_REPO = linuswahlgren/plugga-biologi2`.** The permanent address is https://linuswahlgren.github.io/plugga-biologi2/. Vite uses `base: './'`.
  - **Nothing is pushed before Phase 5 without asking the user first.** The user signs in to GitHub themselves.
  - Commit identity: `linuswahlgren <linuswahlgren@users.noreply.github.com>`, set in the local repo config only.
- **`TEACHER`** is blank and not shown.
- **Glossary:** every concept-list term with its theme (about 110), plus the lesson terms the list lacks. Those are diffusion, osmos, semipermeabel, aquaporin, koncentrationsgradient, hypo-/iso-/hyperton, turgor, plasmolys and kladogram. They carry `Term.extra: true`, which shows as "Utöver begreppslistan".
- **Additive schema fields:** `Term.extra`, `Exam.lectures` (the "Genomgångar" list) and `Exam.themes` (the concept-list themes in order).
- **One additive text mark:** `+> text` gives a "Kompletterande" box inside a lesson.
- **Source lines** cite the **original** lesson decks' slide numbers. The summary deck "Biologi nivå 2" often cites the wrong slides; for example it gives photosystems as "del 2 bild 6–8" when they are bild 8–10.
- **The summary deck adds unmarked facts** that are not in the lessons: blue/red light absorption, ribulosbisfosfat, trakeider vs kärl in deciduous trees, penicillin, the Brundtland attribution, and the Arctic food chain. Use them only where a concept term or study question needs them, and then with `supplement: true`.
- **Seed ploidy:** Del 3 bild 7 says "Frö utvecklas (2n)". Plugga writes "grodden (embryot) är diploid, frövitan triploid (3n)" and notes this on "Om materialet".
- **Planetära gränser and antropocen:** verify on the web in Phase 3 before use (BUILD §8.5).

## Planned counts per part

Sources are the original deck slides. Quiz levels are about 50 % E / 35 % C / 15 % A.

| Id | Title | Lessons (source) | Cards | Quiz (E/C/A) | Practice | Key points | Study questions |
| --- | --- | --- | --- | --- | --- | --- | --- |
| d1 | Växtcellen och transport över membran | 5: växtcell vs djurcell (Intro 5–6; plastider*) · cellmembranet och fosfolipider (7–11) · diffusion och koncentrationsgradient (12–16) · osmos och aquaporiner (15, 17–18) · turgor och plasmolys (19–20; Del 1 2–3) | 20 | 16 (8/6/2) | 7: label cell, order (vatten in → turgor), 2 self, 2 text, number (isoton 0,9 %) | 6 | 1 |
| d2 | Växtens vävnader och transport | 5: vävnadstyper och organ (Del 1 4–5) · cellvägg, meristem, kambium, årsringar (6–7, 10) · xylem och rottryck (8–12) · övervattning, transpiration, vattenpelaren (13–18) · floem, tryckströmsteorin, ringbarkning (19–20; Del 2 2–3) | 24 | 20 (10/7/3) | 9: label blad, order rottrycket, order tryckströmsteorin, 2 self, 4 text | 8 | 2, 4, 5, 6, 7 |
| d3 | Fotosyntesen | 5: kloroplasten och de två stegen (Del 2 5–6) · PS II, elektrontransportkedjan, PS I (7–10, 15) · ATP-syntas och samspelet (11, 14–15) · Calvincykeln och rubisco (12–14; cellandning*) · C3, C4 och CAM (17–22) | 25 | 20 (10/7/3) | 9: label kloroplast, order ljusreaktionen, order Calvincykeln, 2 self, number (5 kol), 3 text | 8 | 8, 9, 10, 11 |
| d4 | Växternas livscykel och förökning | 5: systematik, kladogram, annuell/bienn/perenn (Del 3 2–4) · blommans delar (5) · från pollenkorn till frö, n/2n (7; dubbel befruktning*, grodd*, hjärtblad*, mitos*) · pollinering och spridning (8–13) · könlig och könlös förökning (6, 14) | 24 | 20 (10/7/3) | 8: label blomma, order blomväxtens livscykel, 2 self, number (frövita 3n), 3 text | 7 | 3, 12, 15, 16 |
| d5 | Svampar och lavar | 4: ett eget rike (Del 3 15–17) · grupper och fyra levnadssätt (18–20, 23–24) · mykorrhiza och lavar (21–22) · förökning, basidiesvampar, användning (25–28) | 20 | 16 (8/6/2) | 7: order basidiesvamparnas livscykel, 2 self, 4 text | 6 | 13, 14 |
| d6 | Hållbar utveckling | 6: hållbar utveckling (Hållbar 2–7) · kolets kretslopp och kolsänkor (8–9) · klimat, växthuseffekten, albedo, permafrost (10–16; antropocen + one verified supplementary sentence) · mångfald, ekosystemtjänster, svampar i kretsloppet (17–19) · övergödning och Östersjön (20–22) · miljögifter och planetära gränser* (23–24) | 25 | 20 (10/7/3) | 8: order övergödningen i Östersjön, 2 self, number (−18 °C), 4 text | 8 | 17 |
| Σ | | 30 lessons | 138 | 112 | 48 | 43 | 17 |

`*` = supplementary (`supplement: true`).

## Findings from the slide images (after approval)

The extractor exports slide pictures to `material/_extracted/prov1/media/`. These were checked:

- **Del 2 bild 2–3:** "Vad händer med trädet?" shows a girdled tree, and "Ledtråd…" shows the bark layers with the living phloem. Girdling cites these slides.
- **Del 3 bild 5:** a flower with Swedish labels: kronblad, foderblad, fruktämne, märke, knapp, pistiller, stift, sträng, ståndare, frukt, fröämne, fröhus, frö. These terms come from the material, not from the supplement. **Decided by the user 2026-11-16:** cite this slide; kronblad, foderblad, knapp, stift and sträng are taught from the material and are **not** tagged "Kompletterande" (BUILD §4.7 assumed they would need the tag).
- **Intro bild 6:** plant cell vs animal cell with labels. The plant cell shows cell wall, cell membrane, chloroplast, vacuole, nucleus, mitochondrion, cytoplasm and plasmodesma.
- **Intro bild 20:** plasmolysed, flaccid and turgid cells in hypertonic, isotonic and hypotonic solutions.
- **Del 1 bild 5:** leaf, stem and root, each with dermal, ground and vascular tissue. So the organs are in the material (as an image).
- **Del 2 bild 5:** chloroplast with outer and inner membrane, granum, lumen, stroma and thylakoids.
- **Del 3 bild 7:** the angiosperm life cycle with embryo 2n, endosperm 3n and seed coat 2n.

## Phase 2 notes

- **Diagrams** (`src/diagrams/`): `cell`, `leaf`, `chloroplast` and `flower`, each with numbered marker positions (listed in `docs/components.md`). Content picks which numbers a `label` item shows and names them, so the terms still come from the material in Phase 3.
- **Practice** is a list per part (and across parts on `#/omgang/ova`) with a level filter, not a timed session. Cards and quiz use the session builder.
- **Best score per part:** a session counts for a part when it had at least 10 of that part's questions, or all of them (BUILD §4.6, read per part so mixed sessions work).
- **Glossary terms as cards:** a term without its own `card` is practised as a card with the term's id, so "Öva som kort" and "Kort att repetera idag" include it.

## Phase 3 notes

- **Counts:** 6 parts, 30 lessons, 138 cards, 112 quiz questions (114 after Phase 5), 48 practice items, 43 key points, 17 study questions with model answers, 123 glossary terms (all 118 concept-list terms plus 13 extra lesson terms, some on the list under a combined name).
- **Fact-check:** three separate subagents compared Del 1–2, Del 3–4 and Del 5–6 with the hub and glossary against `material/_extracted/prov1/`. Every finding was fixed. Most important: the phloem is the bark's innermost living layer (Del 2 bild 3), "kläder" is a basic need (hållbar bild 3), fungal cells are n + n after fusion (Del 3 bild 26), and the pollination definition cites hållbar bild 18.
- **Verified on the web (2026-11-16):** Planetary Health Check 2026 (Potsdam Institute for Climate Impact Research, 21 Sep 2026): seven of nine planetary boundaries transgressed. The slide (hållbar bild 24) shows an older assessment with six of nine; Plugga says so. Anthropocene: rejected as a formal epoch by the IUGS in March 2024.
- **Extra correction row** on "Om materialet": seed ploidy (Del 3 bild 7 text says the seed is 2n; the slide's image shows embryo 2n, endosperm 3n, seed coat 2n).
- **Quiz options** were rewritten so the right answer is not the obviously longest option (BUILD §8.6).
- **Without the summary deck:** `Biologi nivå 2.pptx` was not on Linus2026, so Phase 3 used only the lesson decks and the course document.

## Phase 4 notes

- **Hosted site** (`dist/site`): index.html, `manifest.webmanifest` (generated from the course in vite.config.ts), `sw.js` (network first, cache fallback), `icons/` (rendered by `scripts/make-icons.mjs`), `version.json` (build time, for the update toast). The backup file has none of these and still makes no requests.
- **Deploy:** `.github/workflows/deploy.yml` builds, runs the unit specs and publishes `dist/site` to GitHub Pages on every push to main. Needs a one-time setting in the repository (Pages › Source: GitHub Actions).
- **QR codes:** uqr 0.1.3 (MIT, Project Nayuki and Anthony Fu), bundled; its notice is kept as an HTML comment in every build. jsQR (Apache-2.0) is a dev dependency used only to check in a unit test that the codes decode.
- **iPhone storage:** WebKit may evict data for sites that have not been used for a while; persistent storage is granted mainly to home-screen web apps (WebKit blog, "Updates to Storage Policy"). Mina framsteg words the tip that way and asks for `navigator.storage.persist()` after the first real progress.
- **Progress schema:** additive field `settings.backupSnoozedUntil` ("Inte nu" on the backup card); `Course.url` holds the published address.

## Phase 5 notes

- **Quality gates** (`tests/quality.e2e.ts`, real site): every route (parts × tabs, hubs, Prov 2, Mina framsteg, the `#/omgang/…` pages, an unknown route) renders an h1, a title ending in "| Plugga", the current breadcrumb, no console errors and no requests to other sites; a scan of all rendered text and `aria-label`/`title`/`alt`/`placeholder` finds no English UI words; axe at 375 × 812, 820 × 1180 and 1440 × 900 in light and dark, in all three browsers; file size; start-up (Chromium only: CPU throttling needs its DevTools protocol).
- **Start-up:** `main.ts` sets `performance.mark("plugga-ready")` after the first render. With Chromium's CPU slowed down 4× it was about 0.13 s on Linus2026 (three runs: 125–128 ms, local server); the test requires under 1 s.
- **Size:** `dist/site/index.html` about 470 KB, the backup file about the same; the budget is 700 KB.
- **Final screenshots** of the real site: `npm run shots:site` → `review/fas5/` (`tests/site.shots.ts`). Fixed after looking at them: the sidebar progress bars were only as wide as the part title; the icon-only "Dela" button on phones had a filled background unlike the other top-bar icon buttons.
- **Handover:** `README.md` (Swedish, maintainer and student parts), `.claude/skills/ny-del` and `.claude/skills/publicera`.
- **Independent review** (a subagent that had not seen the work, against BUILD.md §12) and what was fixed:
  - The test course no longer borrows the real Prov 2 or `currentExam`: it has its own upcoming Prov 2, so adding Prov 2 parts or moving to Prov 3 does not break `learning.e2e.ts` or the unit specs. The specs that check the real Prov 2 on the real site (`app.e2e.ts`) still need updating then; README and `/ny-del` say which.
  - `/publicera`: the live `version.json` is compared with the time of the push (the workflow builds again, so the build time always differs from the local one); the first push has no `origin/main`; the update toast appears when the open tab becomes visible again.
  - README: `npx playwright install` after `npm ci`; a commit step before `git push`.
  - The language scan also opens running sessions, feedback, results, the share, reset and shortcut dialogs.
  - A mastery unit test compared a value with itself; it now checks the rescaling.
  - `index.html` takes the course title, area, id and address from the course (`%course.title%` …, filled in by `vite.config.ts`), so only `content/` names the subject. The browser bar colour comes from the `--bg` token; the print border uses `--line`; the unused `FAVICON_SVG` is gone.
  - The service worker revalidates pages with the server (`cache: "no-cache"`), so the HTTP cache never holds back a new version.
  - Del 1 had one A-level quiz question; two were added (`d1-q17` osmosis across a sugar membrane, `d1-q18` destillerat vatten vs isoton), so Del 1 is 18 questions, 8 E / 7 C / 3 A. Both were fact-checked by a separate subagent.
  - Left as is: the content check's messages live in `src/check.ts`, not `sv.ts` (they are Swedish and only shown when the content is broken); the offline test runs in Chromium only (Playwright cannot take Firefox and WebKit offline with a service worker reliably); start-up timing is Chromium only.

## Phase status

| Phase | Status |
| --- | --- |
| 0 · Read and plan | Done, approved 2026-11-16 |
| 1 · Foundation | Done (commit `5b60029`, together with Phase 0); checkpoint shown with screenshots in `review/fas1/` |
| 2 · Learning features | Done 2026-11-16 (on Linus2026); screenshots of the test course in `review/fas2/` |
| 3 · Content | Done 2026-11-16; approved by the user (they started Phase 4) |
| 4 · Sharing and keeping progress | Done 2026-11-16 (no checkpoint) |
| 5 · Quality and handover | Done 2026-11-17; published the same day (workflow run green, live site checked: version, routes, no errors or other-site requests, progress kept after reload, offline after one visit) |
