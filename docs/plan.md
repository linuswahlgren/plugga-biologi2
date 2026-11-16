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

## Phase status

| Phase | Status |
| --- | --- |
| 0 · Read and plan | Done, approved 2026-11-16 |
| 1 · Foundation | Done (commit `0beed4e`); checkpoint shown with screenshots in `review/fas1/` |
| 2 · Learning features | Done 2026-11-16 (on Linus2026); screenshots of the test course in `review/fas2/` |
| 3 · Content | Next. On Linus2026 the six lesson files are in `material/prov1/`; `_extracted/` still has to be made (`npm run extract`, needs Python) |
| 4 · Sharing and keeping progress | |
| 5 · Quality and handover | |
