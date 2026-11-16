/** Unit specs (no browser): spaced repetition, session settings, sampling, Mina missar, best score, restore. */
import { test, expect } from "@playwright/test";
import { rateCard, INTERVALS } from "../src/srs.ts";
import {
  allocate,
  applyMissed,
  cardPool,
  interleave,
  newQuizRun,
  parseSettings,
  pickCards,
  pickQuiz,
  quizPool,
  recordAttempt,
  rememberedSettings,
  restoreRun,
  scoreQuiz,
  settingsQuery,
  urvalLabel,
} from "../src/session.ts";
import { loadCourse } from "../src/course.ts";
import { emptyProgress } from "../src/store/progress.ts";
import { boxCounts, cardsDueToday, partMastery } from "../src/mastery.ts";
import { checkCourse } from "../src/check.ts";
import { DIAGRAM_IDS, DIAGRAM_MARKERS } from "../src/diagrams/index.ts";
import { course as fixture } from "./fixtures/course.ts";

const c = loadCourse(fixture);
const d1 = c.partById.get("d1")!;
const TODAY = "2026-11-16";

/** Deterministic random numbers for repeatable sampling. */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

test.describe("spaced repetition (§4.5)", () => {
  test("Leitner boxes with intervals 0, 1, 3, 7 and 16 days", () => {
    expect(INTERVALS).toEqual({ 1: 0, 2: 1, 3: 3, 4: 7, 5: 16 });
    let st = rateCard(undefined, true, TODAY);
    expect(st).toEqual({ box: 2, due: "2026-11-17", seen: 1 });
    st = rateCard(st, true, TODAY);
    expect(st).toMatchObject({ box: 3, due: "2026-11-19" });
    st = rateCard(st, true, TODAY);
    st = rateCard(st, true, TODAY);
    expect(st).toMatchObject({ box: 5, due: "2026-12-02" });
    expect(rateCard(st, true, TODAY).box).toBe(5);
    expect(rateCard(st, false, TODAY)).toEqual({ box: 1, due: TODAY, seen: 5 });
  });
});

test.describe("session settings (§4.4)", () => {
  test("URL first, then remembered, then defaults; invalid values ignored", () => {
    const s = parseSettings("quiz", { antal: "15", niva: "C,E", lage: "prov", tid: "20" }, { antal: "5", ordning: "ordning" }, c, { part: d1 });
    expect(s).toMatchObject({ urval: "del", antal: 15, niva: ["E", "C"], ordning: "ordning", lage: "prov", tid: 20 });
    const bad = parseSettings("quiz", { antal: "7", niva: "X", lage: "nej", tid: "45", urval: "prov:finns-inte" }, undefined, c, {});
    expect(bad).toMatchObject({ urval: "prov:prov2", antal: 10, niva: [], lage: "ova", tid: 0 });
    expect(parseSettings("kort", { urval: "missar" }, undefined, c, { part: d1 }).urval).toBe("del");
    expect(parseSettings("quiz", { urval: "idag" }, undefined, c, { part: d1 }).urval).toBe("del");
    expect(parseSettings("quiz", { urval: "delar:d9,d2,d1" }, undefined, c, {}).urval).toBe("delar:d1,d2");
  });
  test("settings round-trip through the URL; the selection is not remembered", () => {
    const s = parseSettings("quiz", { urval: "prov:prov1", antal: "alla", niva: "A", ordning: "blandad", lage: "prov", tid: "ingen" }, undefined, c, {});
    expect(settingsQuery("quiz", s)).toEqual({ urval: "prov:prov1", antal: "alla", niva: "A", ordning: "blandad", lage: "prov", tid: "ingen" });
    expect(parseSettings("quiz", settingsQuery("quiz", s), undefined, c, {})).toEqual(s);
    expect(rememberedSettings("quiz", s).urval).toBeUndefined();
    const k = parseSettings("kort", { vand: "1", antal: "30" }, undefined, c, { part: d1 });
    expect(settingsQuery("kort", k)).toEqual({ urval: "del", antal: "30", ordning: "blandad", vand: "1" });
  });
  test("the exam hub defaults to an exam simulation", () => {
    const exam = c.examById.get("prov1")!;
    expect(parseSettings("quiz", {}, undefined, c, { exam })).toMatchObject({ urval: "prov:prov1", antal: 20, lage: "prov", tid: 20 });
  });
  test("labels for the session header", () => {
    expect(urvalLabel(c, "del", { part: d1 })).toBe("Växtcellen och transport över membran");
    expect(urvalLabel(c, "prov:prov1", {})).toBe("Hela prov 1");
    expect(urvalLabel(c, "delar:d1,d2", {})).toBe("Del 1 och 2");
    expect(urvalLabel(c, "missar", {})).toBe("Mina missar");
  });
});

test.describe("pools and sampling", () => {
  test("pools follow the selection and the level filter", () => {
    const p = emptyProgress(c.id);
    expect(quizPool(c, p, "del", [], { part: d1 })).toHaveLength(12);
    expect(quizPool(c, p, "del", ["E"], { part: d1 })).toHaveLength(6);
    expect(quizPool(c, p, "prov:prov1", [], {})).toHaveLength(16);
    expect(quizPool(c, p, "allt", [], {})).toHaveLength(18);
    expect(quizPool(c, p, "missar", [], {})).toHaveLength(0);
    p.missed["d1-xq03"] = 0;
    expect(quizPool(c, p, "missar", [], {}).map((q) => q.id)).toEqual(["d1-xq03"]);
    expect(cardPool(c, p, "begrepp:prov1", {}, TODAY)).toHaveLength(9);
    expect(cardPool(c, p, "idag", {}, TODAY)).toHaveLength(0);
    p.cards["d1-xk01"] = { box: 1, due: TODAY, seen: 1 };
    p.cards["t-vakuol"] = { box: 2, due: "2026-11-10", seen: 1 };
    p.cards["d1-xk02"] = { box: 3, due: "2026-11-20", seen: 2 };
    expect(cardPool(c, p, "idag", {}, TODAY).map((x) => x.id)).toEqual(["d1-xk01", "t-vakuol"]);
    expect(cardsDueToday(c, p, TODAY)).toBe(2);
    expect(boxCounts(c, p)).toEqual([1, 1, 1, 0, 0]);
  });
  test("allocate splits proportionally and never more than a group holds", () => {
    expect(allocate([12, 4], 8)).toEqual([6, 2]);
    expect(allocate([20, 20, 20], 10).reduce((a, b) => a + b)).toBe(10);
    expect(allocate([1, 30], 10)).toEqual([0, 10]);
    expect(allocate([3, 3], 20)).toEqual([3, 3]);
  });
  test("interleaving: never three in a row from one part when avoidable", () => {
    for (let seed = 1; seed < 200; seed++) {
      const rng = seeded(seed);
      const out = interleave([Array(6).fill("a"), Array(5).fill("b"), Array(4).fill("c")], rng);
      expect(out).toHaveLength(15);
      for (let i = 2; i < out.length; i++) expect(out[i] === out[i - 1] && out[i] === out[i - 2]).toBe(false);
    }
  });
  test("a quiz samples proportionally across parts and shuffles options with Blandad", () => {
    const p = emptyProgress(c.id);
    const s = parseSettings("quiz", { urval: "prov:prov1", antal: "10" }, undefined, c, {});
    const picked = pickQuiz(quizPool(c, p, s.urval, s.niva, {}), s, seeded(7));
    expect(picked).toHaveLength(10);
    expect(new Set(picked.map((x) => x.id)).size).toBe(10);
    expect(picked.filter((x) => x.id.startsWith("d1-")).length).toBe(8);
    for (const x of picked) expect([...x.options].sort()).toEqual([...c.quizById.get(x.id)!.options].sort());
    const inOrder = pickQuiz(quizPool(c, p, "del", [], { part: d1 }), { ...s, urval: "del", antal: "alla", ordning: "ordning" });
    expect(inOrder.map((x) => x.id)).toEqual(d1.quiz.map((q) => q.id));
    expect(inOrder[0].options).toEqual(d1.quiz[0].options);
  });
  test("cards: due first, then new, then the rest", () => {
    const p = emptyProgress(c.id);
    p.cards["d1-xk05"] = { box: 2, due: TODAY, seen: 1 };
    p.cards["d1-xk06"] = { box: 4, due: "2026-11-30", seen: 3 };
    const s = parseSettings("kort", { antal: "10" }, undefined, c, { part: d1 });
    const ids = pickCards(cardPool(c, p, "del", { part: d1 }, TODAY), s, p, TODAY, seeded(3));
    expect(ids).toHaveLength(10);
    expect(ids).toContain("d1-xk05");
    expect(ids).not.toContain("d1-xk06");
  });
});

test.describe("Mina missar and best score (§4.6)", () => {
  test("a question leaves Mina missar after two right answers in later sessions", () => {
    const p = emptyProgress(c.id);
    applyMissed(p, "q", false);
    expect(p.missed.q).toBe(0);
    applyMissed(p, "q", true);
    expect(p.missed.q).toBe(1);
    applyMissed(p, "q", false);
    expect(p.missed.q).toBe(0);
    applyMissed(p, "q", true);
    applyMissed(p, "q", true);
    expect("q" in p.missed).toBe(false);
    applyMissed(p, "other", true);
    expect("other" in p.missed).toBe(false);
  });
  test("best score counts only with 10+ questions from the part, or all of them", () => {
    const p = emptyProgress(c.id);
    const run5 = newQuizRun(d1.quiz.slice(0, 5).map((q) => ({ id: q.id, options: q.options })), { lage: "ova", scope: "d1", label: "", minutes: 0, now: 0 });
    for (const it of run5.items) run5.answers[it.id] = c.quizById.get(it.id)!.answer;
    const a5 = recordAttempt(p, c, run5, scoreQuiz(c, run5), "2026-11-16T10:00:00Z");
    expect(a5).toMatchObject({ correct: 5, total: 5, counts: false });
    expect(p.quiz.best.d1).toBeUndefined();

    const run10 = newQuizRun(d1.quiz.slice(0, 10).map((q) => ({ id: q.id, options: q.options })), { lage: "prov", scope: "d1", label: "", minutes: 10, now: 0 });
    for (const it of run10.items.slice(0, 7)) run10.answers[it.id] = c.quizById.get(it.id)!.answer;
    const score = scoreQuiz(c, run10);
    expect(score.perLevel.map((l) => l.level)).toEqual(["E", "C"]);
    expect(recordAttempt(p, c, run10, score, "2026-11-16T11:00:00Z").counts).toBe(true);
    expect(p.quiz.best.d1).toBe(70);
    expect(partMastery(d1, p, TODAY).status).toBe("inProgress");
    expect(run10.deadline).toBe(600_000);

    const d2 = c.partById.get("d2")!;
    const runAll = newQuizRun(d2.quiz.map((q) => ({ id: q.id, options: q.options })), { lage: "ova", scope: "d2", label: "", minutes: 0, now: 0 });
    for (const it of runAll.items) runAll.answers[it.id] = c.quizById.get(it.id)!.answer;
    recordAttempt(p, c, runAll, scoreQuiz(c, runAll), "2026-11-16T12:00:00Z");
    expect(p.quiz.best.d2).toBe(100);
  });
});

test.describe("restoring a saved session", () => {
  test("unknown ids are dropped and changed options refreshed", () => {
    const run = restoreRun(c, {
      type: "quiz",
      lage: "prov",
      scope: "d1",
      label: "x",
      items: [{ id: "borttagen", options: [] }, { id: "d1-xq01", options: ["a", "b"] }],
      answers: { "d1-xq01": "I kloroplasterna", borttagen: "a" },
      flagged: ["borttagen"],
      index: 5,
      deadline: 123,
    });
    expect(run).not.toBeNull();
    expect(run!.type === "quiz" && run!.items).toEqual([{ id: "d1-xq01", options: c.quizById.get("d1-xq01")!.options }]);
    expect(run!.type === "quiz" && run!.answers).toEqual({ "d1-xq01": "I kloroplasterna" });
    expect(run!.index).toBe(0);
    expect(restoreRun(c, { type: "kort", queue: ["finns-inte"] })).toBeNull();
    expect(restoreRun(c, "trasig")).toBeNull();
  });
});

test.describe("the test course", () => {
  test("has zero content errors and uses every diagram", () => {
    const r = checkCourse(fixture, { diagrams: DIAGRAM_IDS, diagramMarkers: DIAGRAM_MARKERS });
    expect(r.errors).toEqual([]);
    const used = new Set(c.parts.flatMap((p) => p.practice).flatMap((x) => (x.kind === "label" ? [x.diagram] : [])));
    expect([...used].sort()).toEqual([...DIAGRAM_IDS].sort());
  });
  test("a label marker the diagram doesn't have is an error", () => {
    const broken = structuredClone(fixture);
    const item = broken.weeks[0].practice.find((x) => x.kind === "label");
    if (item && item.kind === "label") item.markers.push({ n: 42, answer: "Något" });
    const r = checkCourse(broken, { diagrams: DIAGRAM_IDS, diagramMarkers: DIAGRAM_MARKERS });
    expect(r.errors.map((e) => e.text).join("\n")).toContain("ingen markering 42");
  });
});
