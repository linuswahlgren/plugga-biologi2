/**
 * End-to-end specs for Phase 4 (sharing and keeping progress) on the site built with the test
 * course (:4174): manifest and icons, offline after one visit, the update toast, the backup card,
 * saving and loading a copy (file and text code), "Dela" with QR code, and the print views.
 */
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";
import { guard, open, progress, FIXTURE_URL } from "./helpers.ts";

test.use({ baseURL: FIXTURE_URL });

const KEY = "plugga:bio2-vaxtfys-cellbio-ht26";

async function seed(page: Page, extra: Record<string, unknown> = {}) {
  await page.addInitScript(
    ([key, data]) => {
      if (sessionStorage.getItem("seeded")) return;
      sessionStorage.setItem("seeded", "1");
      localStorage.setItem(key as string, JSON.stringify(data));
    },
    [KEY, { v: 2, lessons: { "d1-l1": "2026-11-10", "d1-l2": "2026-11-11" }, cards: { "d1-xk01": { box: 3, due: "2026-11-19", seen: 3 } }, notes: { d1: "min anteckning" }, activity: { "2026-11-11": true }, settings: { theme: "system", introDismissed: true }, ...extra }],
  );
}

test.describe("installable app (§4.10.3)", () => {
  test("manifest, icons, version and head tags", async ({ page, request }) => {
    const g = guard(page);
    await open(page);
    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute("href", "./manifest.webmanifest");
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute("href", "./icons/apple-touch-icon.png");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Plugga – Biologi 2");
    const manifest = await (await request.get("manifest.webmanifest")).json();
    expect(manifest).toMatchObject({ short_name: "Plugga", lang: "sv", display: "standalone", start_url: "./" });
    expect(manifest.icons.map((i: { purpose: string }) => i.purpose)).toEqual(["any", "any", "maskable"]);
    for (const icon of [...manifest.icons.map((i: { src: string }) => i.src), "icons/apple-touch-icon.png"]) {
      const res = await request.get(icon);
      expect(res.status(), icon).toBe(200);
      expect(res.headers()["content-type"]).toContain("image/png");
    }
    expect((await (await request.get("version.json")).json()).build).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    g.done();
  });

  test("works offline after one visit", async ({ page, context, browserName }) => {
    test.skip(browserName !== "chromium", "Service worker control in Playwright is reliable in Chromium");
    await open(page, "#/d1");
    await page.evaluate(() => navigator.serviceWorker.ready);
    await page.reload();
    await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);
    await context.setOffline(true);
    await page.reload();
    await expect(page.locator("main h1")).toHaveText("Växtcellen och transport över membran");
    await page.locator(".sk-sidebar a[data-nav=d2]").click();
    await expect(page.locator("main h1")).toHaveText("Bladet, kloroplasten och blomman");
    await context.setOffline(false);
  });

  test.describe(() => {
    // WebKit hides requests that pass through the service worker from page.route; the check itself doesn't need it.
    test.use({ serviceWorkers: "block" });
    test("a newer published version shows the update toast", async ({ page }) => {
    await page.route("**/version.json", (route) => route.fulfill({ json: { build: "2999-01-01T00:00:00.000Z" } }));
    await open(page);
    const toast = page.locator(".sk-toast", { hasText: "Nytt material finns." });
    await expect(toast).toBeVisible();
    await expect(toast.getByRole("button", { name: "Ladda om" })).toBeVisible();
    });
  });
});

test.describe("keeping progress (§4.10.4)", () => {
  test("the backup card shows with real progress and no recent copy; Inte nu hides it for a week", async ({ page }) => {
    await seed(page);
    await open(page);
    const card = page.locator("[data-backup-card]");
    await expect(card).toContainText("Spara en kopia av dina framsteg");
    await card.getByRole("button", { name: "Inte nu" }).click();
    await expect(card).toHaveCount(0);
    expect((await progress(page)).settings.backupSnoozedUntil).toBe("2026-11-23");
    await page.reload();
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator("[data-backup-card]")).toHaveCount(0);
  });

  test("Spara on the card downloads a copy and hides the card", async ({ page }) => {
    await seed(page);
    await open(page);
    const download = page.waitForEvent("download");
    await page.locator("[data-backup-card]").getByRole("button", { name: "Spara" }).click();
    expect((await download).suggestedFilename()).toBe("plugga-bio2-vaxtfys-cellbio-ht26-2026-11-16.json");
    await expect(page.locator("[data-backup-card]")).toHaveCount(0);
    expect((await progress(page)).lastBackupAt).toBeTruthy();
    await expect(page.locator(".sk-toast", { hasText: "Kopian är sparad" })).toBeVisible();
  });

  test("a saved file loads again after everything is cleared, and a wrong file is refused", async ({ page }) => {
    await seed(page);
    await open(page, "#/framsteg");
    const download = page.waitForEvent("download");
    await page.locator("[data-save-copy]").click();
    const file = await (await download).path();
    const saved = JSON.parse(readFileSync(file, "utf8"));
    expect(saved).toMatchObject({ app: "plugga", courseId: "bio2-vaxtfys-cellbio-ht26", v: 2 });

    await page.evaluate((key) => localStorage.removeItem(key), KEY);
    await page.reload();
    await expect(page.locator("main h1")).toHaveText("Mina framsteg");
    expect(Object.keys((await page.evaluate((key) => JSON.parse(localStorage.getItem(key) || "{}"), KEY)).lessons ?? {})).toEqual([]);

    await page.locator("#backup-file").setInputFiles({ name: "fel.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify({ app: "plugga", courseId: "annan-kurs", v: 2, progress: { v: 2, lessons: {} } })) });
    await expect(page.locator("[data-backup] .sk-error")).toContainText("Kopian gäller en annan kurs.");

    await page.locator("#backup-file").setInputFiles(file);
    await expect(page.locator(".sk-toast", { hasText: "Kopian är inläst." })).toBeVisible();
    const p = await progress(page);
    expect(Object.keys(p.lessons).sort()).toEqual(["d1-l1", "d1-l2"]);
    expect(p.notes.d1).toBe("min anteckning");
  });

  test("the text code moves progress to another device", async ({ page }) => {
    await seed(page);
    await open(page, "#/framsteg");
    await page.locator("[data-copy-code]").click();
    await expect(page.locator("#backup-code")).toHaveValue(/^PLUGGA[01]\./);
    const code = await page.locator("#backup-code").inputValue();

    await page.evaluate((key) => localStorage.removeItem(key), KEY);
    await page.reload();
    await expect(page.locator("main h1")).toHaveText("Mina framsteg");
    await page.locator("#backup-paste").fill("inte en kod");
    await page.locator("[data-load-code]").click();
    await expect(page.locator("[data-backup] .sk-error")).toContainText("Det här är ingen kopia från Plugga.");
    await page.locator("#backup-paste").fill(code);
    await page.locator("[data-load-code]").click();
    await expect(page.locator(".sk-toast", { hasText: "Kopian är inläst." })).toBeVisible();
    expect(Object.keys((await progress(page)).lessons).sort()).toEqual(["d1-l1", "d1-l2"]);
  });

  test("Mina framsteg explains the home screen and how storage works on iPhone", async ({ page }) => {
    await open(page, "#/framsteg");
    await expect(page.locator("[data-install]")).toContainText("Dela och välj Lägg till på hemskärmen");
    await expect(page.locator("[data-install]")).toContainText("Safari rensa sparade data");
  });
});

test.describe("Dela (§4.10.7)", () => {
  test("copies the link to this view and shows it as a QR code", async ({ page, context, browserName }) => {
    if (browserName === "chromium") await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await open(page, "#/d1/quiz?urval=del&antal=5");
    await page.locator("[data-share-button]").click();
    const dialog = page.locator("dialog[data-share]");
    await expect(dialog).toBeVisible();
    const expected = `${FIXTURE_URL}#/d1/quiz?urval=del&antal=5`;
    await expect(dialog.locator("#share-url")).toHaveValue(expected);
    await expect(dialog.locator("svg[data-qr]")).toHaveAttribute("data-qr", expected);
    if (browserName === "chromium") {
      await expect(page.locator(".sk-toast", { hasText: "Länken är kopierad" })).toBeVisible();
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(expected);
    }
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(page.locator("[data-share-button]")).toBeFocused();
  });

  test("a running session shares the link to its builder, not the session", async ({ page }) => {
    await open(page, "#/d1/quiz?urval=del&antal=5&ordning=ordning");
    await page.locator("[data-start]").click();
    await expect(page).toHaveURL(/fortsatt=1/);
    await page.locator("[data-share-button]").click();
    await expect(page.locator("#share-url")).toHaveValue(`${FIXTURE_URL}#/d1/quiz`);
  });
});

test.describe("print views (§4.10.11)", () => {
  test("each print button prints its own view", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { printed: string[] }).printed = [];
      window.print = () => (window as unknown as { printed: string[] }).printed.push(document.documentElement.dataset.print ?? "");
    });
    const printed = () => page.evaluate(() => (window as unknown as { printed: string[] }).printed);
    await open(page, "#/prov1/begrepp");
    await page.locator("[data-print-button=begrepp]").click();
    await open(page, "#/prov1/fragor");
    await page.locator("[data-print-button=fragor]").click();
    await open(page, "#/d1");
    if (!(await page.locator("[data-print-button=viktigast]").isVisible())) await page.getByRole("button", { name: "Visa anteckningar" }).click();
    await page.locator("[data-print-button=viktigast]").click();
    expect(await printed()).toEqual(["begrepp", "fragor", "viktigast"]);
  });

  test("the printed glossary shows every term, even when a search hides some", async ({ page }) => {
    await open(page, "#/prov1/begrepp");
    await page.getByLabel("Sök begrepp").fill("cellvagg");
    await expect(page.locator("[data-term]:visible")).not.toHaveCount(9);
    await page.evaluate(() => (document.documentElement.dataset.print = "begrepp"));
    await page.emulateMedia({ media: "print" });
    await expect(page.locator("[data-term]:visible")).toHaveCount(9);
    await expect(page.locator(".sk-sidebar")).toBeHidden();
    await expect(page.getByLabel("Sök begrepp")).toBeHidden();
  });

  test("the printed study questions show every model answer", async ({ page }) => {
    await open(page, "#/prov1/fragor");
    await page.evaluate(() => (document.documentElement.dataset.print = "fragor"));
    await page.emulateMedia({ media: "print" });
    await expect(page.locator("[data-study-list] .sk-box--model:visible")).toHaveCount(2);
    await expect(page.locator("[data-study-list] textarea:visible")).toHaveCount(0);
  });
});

test.describe("accessibility of Phase 4 views (axe)", () => {
  for (const scheme of ["light", "dark"] as const) {
    test(`Mina framsteg with backup, and the share dialog (${scheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      await seed(page);
      await open(page);
      const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
      const check = async () => {
        const r = await new AxeBuilder({ page }).withTags(tags).analyze();
        expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
      };
      await check();
      await open(page, "#/framsteg");
      await page.locator("[data-copy-code]").click();
      await check();
      await page.locator("[data-share-button]").click();
      await expect(page.locator("dialog[data-share]")).toBeVisible();
      await check();
    });
  }
});
