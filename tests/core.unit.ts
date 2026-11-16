/** Unit specs (no browser): answer matching, markup parsing, dates, router, migration, mastery, content check. */
import { test, expect } from "@playwright/test";
import { matchText, matchNumber, normalizeAnswer, parseNumber } from "../src/answer.ts";
import { parseBlocks, parseInline, plainText, isSafeUrl } from "../src/markup.ts";
import { daysBetween, shortDate, isoWeek, longDayMonth, percent } from "../src/format.ts";
import { parseHash, href, to } from "../src/router.ts";
import { migrate } from "../src/store/migrate.ts";
import { emptyProgress } from "../src/store/progress.ts";
import { checkCourse, uiStringsOf } from "../src/check.ts";
import { loadCourse } from "../src/course.ts";
import { partMastery } from "../src/mastery.ts";
import { course } from "../content/index.ts";
import { sv } from "../src/i18n/sv.ts";
import { DIAGRAM_IDS } from "../src/diagrams/index.ts";
import type { Course } from "../src/types.ts";

test.describe("answer matching (§6.4)", () => {
  test("ignores case, spaces, final full stop and a leading en/ett", () => {
    expect(matchText("  Fotosyntes. ", "fotosyntes").correct).toBe(true);
    expect(matchText("en  vakuol", "vakuol").correct).toBe(true);
    expect(matchText("ett frö", "frö").correct).toBe(true);
    expect(matchText("CELLVÄGG", "cellvägg").correct).toBe(true);
  });
  test("a list accepts any of its spellings", () => {
    expect(matchText("stomata", ["klyvöppning", "stomata"]).correct).toBe(true);
    expect(matchText("klyvöppnig", ["klyvöppning", "stomata"]).correct).toBe(true); // one letter missing, 11 letters
    expect(matchText("klyvöppningar", ["klyvöppning", "stomata"]).correct).toBe(false); // two letters more
  });
  test("one wrong letter counts for answers of six letters or more, with a spelling note", () => {
    const r = matchText("fotosyntez", "fotosyntes");
    expect(r.correct).toBe(true);
    expect(r.typoOf).toBe("fotosyntes");
    expect(sv.answer.typo(r.typoOf!)).toBe("Rätt – kolla stavningen: fotosyntes");
    expect(matchText("fotosüntez", "fotosyntes").correct).toBe(false); // two wrong letters
    expect(matchText("osmus", "osmos").correct).toBe(false); // five letters: exact only
  });
  test("å, ä and ö are letters of their own", () => {
    expect(normalizeAnswer("Växt")).toBe("växt");
    expect(matchText("vaxt", "växt").correct).toBe(false);
    expect(matchText("fro", "frö").correct).toBe(false);
    expect(matchText("grodd", "gröd").correct).toBe(false);
  });
  test("numbers: decimal comma, unit, minus sign, tolerance", () => {
    expect(parseNumber("0,9")).toBe(0.9);
    expect(parseNumber("−18 °C")).toBe(-18);
    expect(matchNumber("0,9 %", 0.9)).toBe(true);
    expect(matchNumber("0.9", 0.9)).toBe(true);
    expect(matchNumber("680", 680, 5)).toBe(true);
    expect(matchNumber("677", 680, 2)).toBe(false);
    expect(matchNumber("abc", 1)).toBe(false);
  });
});

test.describe("markup (§6.3)", () => {
  test("HTML in content stays text", () => {
    const nodes = parseInline('<img src=x onerror="alert(1)"> **fet**');
    expect(nodes[0]).toEqual({ t: "text", v: '<img src=x onerror="alert(1)"> ' });
    expect(nodes[1].t).toBe("strong");
  });
  test("only http(s) links become links", () => {
    expect(parseInline("[x](javascript:alert(1))").some((n) => n.t === "link")).toBe(false);
    expect(parseInline("[Läs](https://example.org)")[0]).toMatchObject({ t: "link", href: "https://example.org" });
    expect(isSafeUrl("data:text/html,hi")).toBe(false);
  });
  test("chemistry, arrows and lesson links", () => {
    expect(parseInline("H~2~O")).toEqual([{ t: "text", v: "H" }, { t: "sub", v: "2" }, { t: "text", v: "O" }]);
    expect(parseInline("x^2^")[1]).toEqual({ t: "sup", v: "2" });
    expect(plainText("CO~2~ -> socker")).toBe("CO2 → socker");
    expect(parseInline("[[d3-l2|Ljusreaktionerna]]")[0]).toMatchObject({ t: "lessonlink", id: "d3-l2" });
  });
  test("blocks: heading, lists, boxes, formula, table, code", () => {
    const b = parseBlocks("## Rubrik\n\nText här\nfortsätter.\n\n- ett\n- två\n\n1. a\n2. b\n\n> Viktigt\n\n!> Misstag\n\n+> Extra\n\n= 6 CO~2~ -> socker\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n\n~~~\nkod <b>\n~~~");
    expect(b.map((x) => x.t)).toEqual(["h", "p", "ul", "ol", "key", "mistake", "supplement", "formula", "table", "code"]);
    const table = b.find((x) => x.t === "table");
    expect(table && table.t === "table" && table.rows.length).toBe(1);
    const code = b.find((x) => x.t === "code");
    expect(code && code.t === "code" && code.v).toBe("kod <b>");
  });
});

test.describe("dates (Swedish)", () => {
  test("countdown and formats", () => {
    expect(daysBetween("2026-11-16", "2026-12-07")).toBe(21);
    expect(shortDate("2026-12-07")).toBe("mån 7 dec");
    expect(longDayMonth("2026-12-07")).toBe("7 december");
    expect(isoWeek("2026-11-16")).toBe(47);
    expect(percent(68)).toBe("68 %");
  });
});

test.describe("router", () => {
  const known = { parts: new Set(["d1", "d3"]), exams: new Set(["prov1", "prov2"]) };
  test("parses every view", () => {
    expect(parseHash("", known).view).toBe("overview");
    expect(parseHash("#/d3", known)).toMatchObject({ view: "part", part: "d3", tab: "lar" });
    expect(parseHash("#/d3/quiz?antal=10&niva=E,C&lage=prov&tid=20", known)).toMatchObject({ view: "part", tab: "quiz", query: { antal: "10", niva: "E,C", lage: "prov", tid: "20" } });
    expect(parseHash("#/prov1/begrepp", known)).toMatchObject({ view: "hub", exam: "prov1", section: "begrepp" });
    expect(parseHash("#/omgang/kort?urval=idag", known)).toMatchObject({ view: "session", mode: "kort", query: { urval: "idag" } });
    expect(parseHash("#/framsteg", known).view).toBe("progress");
    expect(parseHash("#/d9", known).view).toBe("notfound");
  });
  test("builds links that parse back", () => {
    const h1 = to.part("d3", "quiz", { antal: "10", niva: "E,C" });
    expect(h1).toBe("#/d3/quiz?antal=10&niva=E,C");
    expect(href(parseHash(h1, known))).toBe(h1);
    expect(to.lesson("d3", "d3-l2")).toBe("#/d3?lektion=d3-l2");
  });
});

test.describe("progress migration v1 -> v2", () => {
  test("maps the earlier Study Kit format", () => {
    const v1 = { v: 1, done: { "d1-l1": true }, known: ["d1-k01"], quiz: { d1: 80 }, notes: { d1: "min text" }, practice: { "d1-p1": true }, theme: "dark" };
    const p = migrate(v1, "kurs");
    expect(p.v).toBe(2);
    expect(Object.keys(p.lessons)).toEqual(["d1-l1"]);
    expect(p.cards["d1-k01"].box).toBe(3);
    expect(p.quiz.best.d1).toBe(80);
    expect(p.notes.d1).toBe("min text");
    expect(p.practice["d1-p1"].solved).toBe(true);
    expect(p.settings.theme).toBe("dark");
  });
  test("v2 is sanitised and keeps unknown ids", () => {
    const raw = { ...emptyProgress("kurs"), lessons: { "x-gammal": "2026-10-01" }, cards: { a: { box: 9, due: "2026-11-20", seen: 2 } } };
    const p = migrate(JSON.parse(JSON.stringify(raw)), "kurs");
    expect(p.lessons["x-gammal"]).toBe("2026-10-01");
    expect(p.cards.a.box).toBe(5);
    expect(migrate("trasig", "kurs").v).toBe(2);
  });
});

test.describe("mastery", () => {
  test("drops empty components and rescales", () => {
    const c = loadCourse(course);
    const part = c.partById.get("d1")!;
    const p = emptyProgress(c.id);
    expect(partMastery(part, p).percent).toBe(0);
    expect(partMastery(part, p).status).toBe("notStarted");
    p.lessons["d1-l1"] = "2026-11-16";
    // A part with only two lessons: the other components are dropped, so one lesson = 50 %.
    const onlyLessons = { ...part, lessons: part.lessons.slice(0, 2), cards: [], quiz: [], practice: [] };
    expect(partMastery(onlyLessons, p).percent).toBe(50);
    // A full part: lessons weigh 20 of 100.
    const m = partMastery(part, p);
    expect(m.percent).toBe(Math.round(20 / part.lessons.length));
    expect(m.status).toBe("inProgress");
  });
});

test.describe("content check (§6.6)", () => {
  test("the real course has zero errors", () => {
    const r = checkCourse(course, { diagrams: DIAGRAM_IDS, uiStrings: uiStringsOf(sv) });
    expect(r.errors).toEqual([]);
    expect(r.warnings.filter((w) => w.where === "Gränssnittet")).toEqual([]);
  });
  test("catches the listed errors", () => {
    const broken: Course = {
      id: "x", subject: "S", title: "T", area: "A", accent: "green", currentExam: "saknas",
      exams: [{ id: "p1", title: "Prov 1", status: "done" }],
      weeks: [
        {
          id: "d1", exam: "p1", title: "Vecka 1", lessons: [{ id: "d1-l1", title: "L", minutes: 5, body: "Se [[d9-l1|här]]" }],
          cards: [["fram", "bak"]],
          quiz: [
            { id: "q1", q: "?", options: ["a", "b", "c"], answer: "d", explain: "" },
            { id: "q1", q: "?", options: ["a", "a"], answer: "a", explain: "x" },
          ],
          practice: [{ id: "p1", kind: "order", q: "?", steps: ["a", "b"] }, { id: "p2", kind: "label", q: "?", diagram: "cell", markers: [{ n: 1, answer: "" }] }],
          keyPoints: [],
        },
        { id: "d2", exam: "finns-inte", title: "Del", lessons: [], cards: [], quiz: [], practice: [], keyPoints: [] },
      ],
    };
    const r = checkCourse(broken, { diagrams: [] });
    const text = r.errors.map((e) => e.text).join("\n");
    expect(text).toContain("currentExam");
    expect(text).toContain("används två gånger");
    expect(text).toContain("finns inte bland svarsalternativen");
    expect(text).toContain("Minst 3 behövs");
    expect(text).toContain("likadana");
    expect(text).toContain("Förklaringen saknas");
    expect(text).toContain("[[d9-l1|…]]");
    expect(text).toContain("Ordningsövningen har 2 steg");
    expect(text).toContain("saknar begrepp");
    expect(text).toContain("finns-inte");
    const warn = r.warnings.map((w) => w.text).join("\n");
    expect(warn).toContain("Vecka");
    expect(warn).toContain("saknar id");
  });
  test("flags copy problems in UI strings", () => {
    const r = checkCourse(course, { uiStrings: ["Click here!", "Bra jobbat 🎉"] });
    const w = r.warnings.filter((x) => x.where === "Gränssnittet").map((x) => x.text).join("\n");
    expect(w).toContain("Utropstecken");
    expect(w).toContain("Engelskt ord");
    expect(w).toContain("Emoji");
  });
});
