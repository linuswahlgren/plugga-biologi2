import { expect, type Page, type TestInfo } from "@playwright/test";

/** Today in the tests: 21 days before Prov 2 (mån 7 dec 2026). */
export const TODAY = new Date("2026-11-16T10:00:00");

/**
 * Watch a page: console errors, page errors and any request to another origin fail the test.
 * Call `done()` at the end of the test.
 */
export function guard(page: Page, opts: { origin?: string } = {}) {
  const problems: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") problems.push(`console: ${m.text()}`);
  });
  page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
  page.on("request", (r) => {
    const url = r.url();
    if (url.startsWith("data:") || url.startsWith("blob:") || url.startsWith("about:")) return;
    if (opts.origin === "file") {
      if (!url.startsWith("file:")) problems.push(`request to other origin: ${url}`);
      return;
    }
    const origin = new URL(url).origin;
    if (origin !== "http://localhost:4173" && origin !== "http://localhost:4174") problems.push(`request to other origin: ${url}`);
  });
  return {
    done() {
      expect(problems, problems.join("\n")).toEqual([]);
    },
  };
}

export async function open(page: Page, hash = "#/", opts: { clock?: boolean } = {}) {
  if (opts.clock !== false) await page.clock.setFixedTime(TODAY);
  await page.goto(`/${hash}`);
  await expect(page.locator("main h1")).toBeVisible();
}

export function isMobile(info: TestInfo) {
  return (info.project.use.viewport?.width ?? 1280) < 860;
}

/** The site built with the test course (tests/fixtures/course.ts). */
export const FIXTURE_URL = "http://localhost:4174/";

/** Read stored progress from the page. */
export async function progress(page: Page): Promise<any> {
  await page.waitForTimeout(400); // debounced save (300 ms)
  return page.evaluate(() => JSON.parse(localStorage.getItem("plugga:bio2-vaxtfys-cellbio-ht26") || "{}"));
}
