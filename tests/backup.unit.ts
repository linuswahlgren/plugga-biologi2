/** Unit specs (no browser): backup files, merging, the text code, and that the QR codes decode. */
import { test, expect } from "@playwright/test";
import { encode } from "uqr";
import jsQR from "jsqr";
import { decodeCode, encodeCode, makeBackup, mergeProgress, parseBackup } from "../src/store/backup.ts";
import { emptyProgress } from "../src/store/progress.ts";

const ID = "bio2-vaxtfys-cellbio-ht26";

test.describe("backup files (§4.10.4)", () => {
  test("a saved copy loads again; wrong course, newer version and junk are refused", () => {
    const p = emptyProgress(ID);
    p.lessons["d1-l1"] = "2026-11-10";
    const file = JSON.stringify(makeBackup(p));
    const back = parseBackup(file, ID);
    expect(back.ok && back.progress.lessons["d1-l1"]).toBe("2026-11-10");
    expect(parseBackup(file, "annan-kurs")).toEqual({ ok: false, reason: "course" });
    expect(parseBackup(JSON.stringify({ ...makeBackup(p), progress: { ...p, v: 3 } }), ID)).toEqual({ ok: false, reason: "version" });
    expect(parseBackup("inte json", ID)).toEqual({ ok: false, reason: "format" });
    expect(parseBackup(JSON.stringify({ hej: 1 }), ID)).toEqual({ ok: false, reason: "format" });
    const v1 = parseBackup(JSON.stringify({ v: 1, done: { "d1-l2": true } }), ID);
    expect(v1.ok && Object.keys(v1.progress.lessons)).toEqual(["d1-l2"]);
  });

  test("merging keeps the best of both", () => {
    const a = emptyProgress(ID);
    const b = emptyProgress(ID);
    a.updatedAt = "2026-11-10T10:00:00.000Z";
    b.updatedAt = "2026-11-12T10:00:00.000Z";
    a.lessons = { "d1-l1": "2026-11-05" };
    b.lessons = { "d1-l1": "2026-11-08", "d1-l2": "2026-11-09" };
    a.cards = { k1: { box: 4, due: "2026-11-20", seen: 4 }, k2: { box: 1, due: "2026-11-10", seen: 1 } };
    b.cards = { k1: { box: 2, due: "2026-11-13", seen: 6 }, k2: { box: 3, due: "2026-11-15", seen: 3 } };
    a.quiz = { attempts: [{ at: "2026-11-01T10:00:00Z", kind: "quiz", mode: "ova", scope: "d1", parts: ["d1"], correct: 5, total: 10, counts: true }], best: { d1: 50, d2: 90 } };
    b.quiz = { attempts: [{ at: "2026-11-02T10:00:00Z", kind: "quiz", mode: "prov", scope: "d2", parts: ["d2"], correct: 8, total: 10, counts: true }, ...a.quiz.attempts], best: { d1: 80 } };
    a.missed = { q1: 0, q2: 1 };
    b.missed = { q2: 0, q3: 0 };
    a.practice = { p1: { solved: true, at: "2026-11-01" } };
    b.practice = { p1: { solved: false, at: "2026-11-05" }, p2: { solved: true, at: "2026-11-06" } };
    a.study = { s1: "kan", s2: "inte-an" };
    b.study = { s1: "inte-an", s2: "kan" };
    a.notes = { d1: "min anteckning", d2: "kort" };
    b.notes = { d1: "min anteckning", d2: "kort och längre", d3: "ny" };
    a.activity = { "2026-11-01": true };
    b.activity = { "2026-11-02": true };
    a.settings.theme = "dark";

    const m = mergeProgress(a, b, new Date("2026-11-16T12:00:00Z"));
    expect(m.lessons).toEqual({ "d1-l1": "2026-11-05", "d1-l2": "2026-11-09" });
    expect(m.cards.k1).toMatchObject({ box: 4, seen: 6 });
    expect(m.cards.k2).toMatchObject({ box: 3 });
    expect(m.quiz.best).toEqual({ d1: 80, d2: 90 });
    expect(m.quiz.attempts).toHaveLength(2);
    expect(m.missed).toEqual({ q2: 1, q3: 0 });
    expect(m.practice.p1.solved).toBe(true);
    expect(m.practice.p2.solved).toBe(true);
    expect(m.study).toEqual({ s1: "kan", s2: "kan" });
    expect(m.notes).toEqual({ d1: "min anteckning", d2: "kort och längre", d3: "ny" });
    expect(Object.keys(m.activity).sort()).toEqual(["2026-11-01", "2026-11-02"]);
    expect(m.settings.theme).toBe("dark");
    expect(m.updatedAt).toBe("2026-11-16T12:00:00.000Z");
  });
});

test.describe("text code", () => {
  test("round-trips and refuses anything else", async () => {
    const p = emptyProgress(ID);
    p.notes.d1 = "Å, ä och ö ska överleva koden.";
    for (let i = 0; i < 100; i++) p.cards[`d1-k${i}`] = { box: 2, due: "2026-11-17", seen: 1 };
    const json = JSON.stringify(makeBackup(p));
    const code = await encodeCode(json);
    expect(code.startsWith("PLUGGA1.")).toBe(true);
    expect(code.length).toBeLessThan(json.length / 3);
    expect(await decodeCode(`  ${code.slice(0, 20)}\n${code.slice(20)}  `)).toBe(json);
    expect(await decodeCode("PLUGGA1.inte-en-kod")).toBeNull();
    expect(await decodeCode("hej")).toBeNull();
  });
});

test.describe("QR code (Dela)", () => {
  test("the encoded link decodes to the same text", () => {
    const url = "https://linuswahlgren.github.io/plugga-biologi2/#/d3/quiz?urval=del&antal=10&niva=E,C&ordning=blandad&lage=prov&tid=20";
    const qr = encode(url, { ecc: "M", border: 2 });
    const scale = 4;
    const size = qr.size * scale;
    const rgba = new Uint8ClampedArray(size * size * 4);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const v = qr.data[Math.floor(y / scale)][Math.floor(x / scale)] ? 0 : 255;
        rgba.set([v, v, v, 255], (y * size + x) * 4);
      }
    }
    expect(jsQR(rgba, size, size)?.data).toBe(url);
  });
});
