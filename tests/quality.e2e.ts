/**
 * Quality gates (BUILD.md §10) on the real site (:4173): every route renders with a matching title
 * and no errors or foreign requests; the rendered UI has no English; axe at 375 × 812, 820 × 1180
 * and 1440 × 900 in light and dark; the file size budget; and start-up time on a slowed-down CPU.
 */
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { statSync } from "node:fs";
import { guard, open } from "./helpers.ts";
import { course } from "../content/index.ts";

const PARTS = course.weeks.map((w) => w.id);
const QUIZ = new Map(course.weeks.flatMap((w) => w.quiz).map((q) => [q.id, q]));
const ROUTES = [
  "#/",
  ...PARTS.flatMap((p) => [`#/${p}`, `#/${p}/kort`, `#/${p}/quiz`, `#/${p}/ova`]),
  "#/prov1", "#/prov1/fragor", "#/prov1/begrepp", "#/prov1/simulering", "#/prov1/om",
  "#/prov2", "#/prov2/fragor", "#/prov2/begrepp", "#/prov2/simulering", "#/prov2/om",
  "#/framsteg", "#/omgang/kort", "#/omgang/quiz", "#/omgang/ova", "#/finns-inte",
];

// Whole English words that must not appear in the rendered UI (the content check uses the same idea).
const ENGLISH = /\b(the|and|you|your|click|loading|error|submit|next|back|save|cancel|settings|share|learn|progress|done|review|flashcards?|practice|correct|wrong|hint|answer|start|continue|show|hide|close|open|menu|home|search|print|copy|download|upload)\b/i;

async function uiText(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const out: string[] = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const el = n.parentElement;
      if (!el || el.closest("script, style, [hidden]")) continue;
      const t = n.textContent?.trim();
      if (t) out.push(t);
    }
    for (const el of document.querySelectorAll("[aria-label], [title], [alt], [placeholder]")) {
      for (const a of ["aria-label", "title", "alt", "placeholder"]) {
        const v = el.getAttribute(a);
        if (v) out.push(v);
      }
    }
    out.push(document.title);
    return out;
  });
}

test.describe("every route (§10 navigation and language)", () => {
  test.describe.configure({ timeout: 120_000 });
  test("renders with a heading, a matching title, no errors and no English", async ({ page }) => {
    const g = guard(page);
    await open(page);
    const english: string[] = [];
    for (const hash of ROUTES) {
      await page.goto(`/${hash}`);
      await expect(page.locator("main h1"), hash).toBeVisible();
      await expect(page, hash).toHaveTitle(/ \| Plugga$/);
      const crumbs = page.locator(".sk-crumbs--full a");
      if ((await crumbs.count()) > 0) await expect(crumbs.last(), hash).toHaveAttribute("aria-current", "page");
      for (const t of await uiText(page)) {
        const m = t.match(ENGLISH);
        if (m) english.push(`${hash}: "${m[0]}" in "${t.slice(0, 80)}"`);
      }
    }
    expect(english).toEqual([]);
    g.done();
  });

  test("dialogs, sessions, feedback and results have no English either", async ({ page }) => {
    const g = guard(page);
    const english: string[] = [];
    const scan = async (where: string) => {
      for (const t of await uiText(page)) {
        const m = t.match(ENGLISH);
        if (m) english.push(`${where}: "${m[0]}" in "${t.slice(0, 80)}"`);
      }
    };
    const answer = async (right: boolean) => {
      const q = QUIZ.get((await page.locator(".sk-quizcard").getAttribute("data-quiz"))!)!;
      await page.locator(`.sk-quizcard .sk-option[data-value="${right ? q.answer : q.options.find((o) => o !== q.answer)}"]`).click();
    };

    await open(page, "#/d3/quiz?urval=del&antal=5&niva=alla&ordning=ordning&lage=ova");
    await page.locator("[data-start]").click();
    await scan("quiz");
    await answer(false);
    await scan("quiz, feedback");
    for (let i = 0; i < 4; i++) {
      await page.keyboard.press("Enter");
      await answer(i % 2 === 0);
    }
    await page.keyboard.press("Enter");
    await expect(page.locator("[data-results]")).toBeVisible();
    await scan("quiz, results");

    await open(page, "#/d3/quiz?urval=del&antal=5&niva=alla&ordning=ordning&lage=prov&tid=10");
    await page.locator("[data-start]").click();
    await answer(true);
    await scan("provläge");

    await open(page, "#/d3/kort?urval=del&antal=10&ordning=ordning");
    await page.locator("[data-start]").click();
    await expect(page.locator(".sk-flashcard")).toBeVisible();
    await scan("cards, front");
    await page.keyboard.press("Space");
    await scan("cards, back");

    await open(page, "#/d3/ova");
    await page.locator("[data-practice=d3-p7] input").fill("vatten");
    await page.locator("[data-practice=d3-p7] button[type=submit]").click();
    await page.locator("[data-practice=d3-p6] input").fill("1");
    await page.locator("[data-practice=d3-p6] button[type=submit]").click();
    await page.getByRole("button", { name: "Visa exempelsvar" }).first().click();
    await scan("practice, feedback");

    await open(page, "#/prov1/simulering");
    await page.locator("[data-start]").click();
    await scan("provsimulering");

    await open(page, "#/framsteg");
    await page.locator("[data-reset]").click();
    await expect(page.locator("dialog[open]")).toBeVisible();
    await scan("reset dialog");
    await page.keyboard.press("Escape");

    await open(page, "#/");
    await page.keyboard.press("?");
    await expect(page.locator("dialog[open]")).toBeVisible();
    await scan("shortcuts dialog");
    await page.keyboard.press("Escape");

    await page.locator("[data-share-button]").click();
    await expect(page.locator("dialog[data-share]")).toBeVisible();
    await scan("share dialog");
    await page.keyboard.press("Escape");

    expect(english).toEqual([]);
    g.done();
  });
});

test.describe("accessibility at three sizes, light and dark (§10 axe)", () => {
  test.describe.configure({ timeout: 180_000 });
  const SIZES = [
    { width: 375, height: 812 },
    { width: 820, height: 1180 },
    { width: 1440, height: 900 },
  ];
  for (const size of SIZES) {
    for (const scheme of ["light", "dark"] as const) {
      test(`${size.width} × ${size.height}, ${scheme}`, async ({ page }) => {
        await page.setViewportSize(size);
        await page.emulateMedia({ colorScheme: scheme });
        for (const hash of ["#/", "#/d3", "#/d3/quiz", "#/d3/ova", "#/d4/ova", "#/d7/ova", "#/prov1/fragor", "#/prov1/begrepp", "#/prov2/fragor", "#/framsteg"]) {
          await open(page, hash);
          const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
          expect(r.violations.map((v) => `${hash} ${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
        }
      });
    }
  }
});

test.describe("performance (§5 budget)", () => {
  test("the app file is at most 700 KB, the backup file too", () => {
    for (const file of ["dist/site/index.html", "dist/plugga-biologi2.html"]) {
      expect(statSync(file).size, file).toBeLessThanOrEqual(700 * 1024);
    }
  });

  test("interactive within 1 s on a CPU slowed down 4× (a mid-range phone)", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "CPU throttling needs Chromium's DevTools protocol");
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await page.goto("/#/");
    await expect(page.locator("main h1")).toBeVisible();
    const ready = await page.evaluate(() => performance.getEntriesByName("plugga-ready")[0]?.startTime ?? Infinity);
    test.info().annotations.push({ type: "plugga-ready (ms, 4× CPU)", description: String(Math.round(ready)) });
    expect(ready).toBeLessThan(1000);
  });
});
