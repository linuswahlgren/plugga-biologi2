/** End-to-end specs on the built site (vite preview) and the backup file (file://). Phase 1 scope. */
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { guard, open, TODAY } from "./helpers.ts";

test.describe("overview", () => {
  test("shows subject, topic, countdown and the next step", async ({ page }) => {
    const g = guard(page);
    await open(page);
    await expect(page).toHaveTitle("Översikt – Biologi 2 | Plugga");
    await expect(page.locator(".sk-sidebar__course")).toHaveText("Biologi 2");
    await expect(page.locator(".sk-sidebar__area")).toHaveText("Växtfysiologi och cellbiologi");
    await expect(page.locator("main h1")).toHaveText("Växtfysiologi och cellbiologi");
    await expect(page.locator("main .sk-pagehead .sk-eyebrow")).toHaveText(/biologi 2/i);
    await expect(page.locator("[data-countdown=prov2] h2")).toHaveText("Prov 2 om 21 dagar · mån 7 dec");
    // Prov 2 has parts, so the countdown has no empty text and the next step is its first lesson.
    await expect(page.locator("[data-countdown=prov2]")).not.toContainText("Materialet till prov 2");
    await expect(page.locator(".sk-hero h2")).toHaveText("Läs Proteiner och aminosyror");
    await expect(page.locator(".sk-nav__grouphead").first()).toHaveText(/prov 2 · 7 dec/i);
    await expect(page.locator(".sk-nav__grouphead").nth(1)).toHaveText(/prov 1 · repetera/i);
    await expect(page.getByText("Så funkar Plugga")).toBeVisible();
    g.done();
  });

  test("the intro card can be dismissed for good", async ({ page }) => {
    await open(page);
    await page.getByRole("button", { name: "Jag förstår" }).click();
    await expect(page.getByText("Så funkar Plugga")).toHaveCount(0);
    await page.reload();
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.getByText("Så funkar Plugga")).toHaveCount(0);
  });
});

test.describe("part page", () => {
  test("breadcrumb, eyebrow, title and focus match the view", async ({ page }) => {
    const g = guard(page);
    await open(page);
    await page.locator(".sk-sidebar a[data-nav=d1]").click();
    await expect(page).toHaveTitle("Lär dig – Växtcellen och transport över membran – Biologi 2 | Plugga");
    await expect(page.locator(".sk-crumbs--full a")).toHaveText(["Biologi 2", "Del 1 · Växtcellen och transport över membran", "Lär dig"]);
    await expect(page.locator(".sk-crumbs--full a").last()).toHaveAttribute("aria-current", "page");
    await expect(page.locator("main .sk-pagehead .sk-eyebrow")).toHaveText(/biologi 2 · prov 1 · del 1/i);
    await expect(page.locator("main .sk-pagehead")).toContainText("Repetition");
    await expect(page.locator("main .sk-pagehead")).toContainText("Inte påbörjad");
    await expect(page.locator("main h1")).toBeFocused();
    await expect(page.locator(".sk-sidebar a[data-nav=d1]")).toHaveAttribute("aria-current", "page");
    g.done();
  });

  test("a lesson can be marked done and stays done after reload", async ({ page }) => {
    await open(page, "#/d1");
    const first = page.locator("[data-lesson=d1-l1]");
    await expect(first.locator(".sk-lesson__head")).toHaveAttribute("aria-expanded", "true");
    await expect(first).toContainText("Källa: Intro kurs, transport över membran, bild 5–6");
    await first.getByRole("button", { name: "Markera som klar" }).click();
    await expect(first.getByRole("button", { name: "Markera som inte klar" })).toBeVisible();
    await expect(page.locator("main .sk-pagehead")).toContainText("Pågår");
    await expect(page.locator(".sk-sidebar a[data-nav=d1] [role=progressbar]")).toHaveAttribute("aria-valuenow", "4"); // 1 of 5 lessons = 20 % of the lesson weight (20)
    await page.waitForTimeout(400); // debounced save (300 ms)
    await page.reload();
    await expect(page.locator("[data-lesson=d1-l1] .sk-numcircle--done")).toBeVisible();
    // the next unread lesson opens by default
    await expect(page.locator("[data-lesson=d1-l2] .sk-lesson__head")).toHaveAttribute("aria-expanded", "true");
  });

  test("Snabbkoll gives kind, specific feedback", async ({ page }) => {
    await open(page, "#/d1");
    const check = page.locator("[data-lesson=d1-l1] .sk-check");
    await check.getByRole("button", { name: /Mitokondrie/ }).click();
    const fb = check.locator(".sk-feedback");
    await expect(fb).toContainText("Inte riktigt");
    await expect(fb).toContainText("Rätt svar är Cellvägg");
    await expect(check.locator(".sk-option--correct")).toContainText("Rätt svar");
    await expect(check.locator(".sk-option--wrong")).toContainText("Ditt svar");
    await check.getByRole("button", { name: "Försök igen" }).click();
    await check.getByRole("button", { name: /Cellvägg/ }).click();
    await expect(fb).toContainText("Rätt");
    await expect(fb).not.toContainText("Inte riktigt");
  });

  test("a deep link opens the lesson", async ({ page }) => {
    await open(page, "#/d1?lektion=d1-l2");
    await expect(page.locator("[data-lesson=d1-l2] .sk-lesson__head")).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("[data-lesson=d1-l2]")).toContainText("Vanligt misstag");
  });

  test("notes are saved per part", async ({ page }) => {
    await open(page, "#/d1");
    if (!(await page.locator(".sk-notes textarea").isVisible())) await page.getByRole("button", { name: "Visa anteckningar" }).click();
    await page.locator(".sk-notes textarea").fill("Kom ihåg: cellvägg av cellulosa");
    await expect(page.locator(".sk-savestate")).toHaveText("Sparat");
    await page.waitForTimeout(400);
    await page.reload();
    if (!(await page.locator(".sk-notes textarea").isVisible())) await page.getByRole("button", { name: "Visa anteckningar" }).click();
    await expect(page.locator(".sk-notes textarea")).toHaveValue("Kom ihåg: cellvägg av cellulosa");
  });
});

test.describe("exam hubs", () => {
  test("Prov 2 hub: countdown, reading list, study questions and corrections", async ({ page }) => {
    const g = guard(page);
    await open(page, "#/prov2");
    await expect(page.locator("main h1")).toHaveText("Inför prov 2 · 7 december");
    await expect(page.locator("[data-countdown=prov2]")).toContainText("Prov 2 om 21 dagar · mån 7 dec");
    await expect(page.locator(".sk-tabs .sk-tab")).toHaveText(["Läsanvisningar", "Instuderingsfrågor", "Begreppslista", "Provsimulering", "Om materialet"]);
    await expect(page.locator(".sk-readinglist li")).toHaveText(["s. 44–46", "s. 68–80", "s. 90–98"]);
    await page.getByRole("link", { name: "Instuderingsfrågor" }).click();
    await expect(page.locator("[data-study-known]")).toHaveText("0 av 7 kan jag");
    await page.getByRole("link", { name: "Om materialet" }).click();
    await expect(page).toHaveTitle("Om materialet – Inför prov 2 · 7 december – Biologi 2 | Plugga");
    await expect(page.locator(".sk-table tbody tr")).toHaveCount(3);
    await expect(page.locator(".sk-table")).toContainText("acetyl-CoA");
    g.done();
  });

  test("Prov 1 hub: reading list verbatim and the corrections table", async ({ page }) => {
    await open(page, "#/prov1");
    await expect(page.locator(".sk-readinglist li")).toHaveText(["s. 47–51", "s. 150–154", "s. 155–156", "s. 159–163", "s. 165–167", "s. 171–177", "s. 178–180", "s. 183–190", "Kapitel 11, s. 215–245"]);
    await page.getByRole("link", { name: "Om materialet" }).click();
    await expect(page).toHaveTitle("Om materialet – Repetera prov 1 – Biologi 2 | Plugga");
    await expect(page.locator(".sk-table tbody tr")).toHaveCount(6);
    await expect(page.locator(".sk-table")).toContainText("PEP-karboxylas");
  });
});

test.describe("progress storage", () => {
  test("falls back to memory with a banner when storage throws", async ({ page }) => {
    await page.addInitScript(() => {
      Storage.prototype.setItem = () => {
        throw new Error("blocked");
      };
    });
    await open(page);
    await expect(page.locator("[data-storage-banner]")).toHaveText("Dina framsteg sparas inte i den här webbläsaren");
  });

  test("progress from the earlier Study Kit (v1) is migrated", async ({ page }) => {
    await page.addInitScript(() => {
      if (!localStorage.getItem("plugga:bio2-vaxtfys-cellbio-ht26")) {
        localStorage.setItem("studykit:bio2-vaxtfys-cellbio-ht26", JSON.stringify({ v: 1, done: { "d1-l1": true }, notes: { d1: "gammal anteckning" } }));
      }
    });
    await open(page, "#/d1");
    await expect(page.locator("[data-lesson=d1-l1] .sk-numcircle--done")).toBeVisible();
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("plugga:bio2-vaxtfys-cellbio-ht26") || "{}"));
    expect(stored.v).toBe(2);
    expect(stored.notes.d1).toBe("gammal anteckning");
  });

  test("theme toggle is remembered", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await open(page);
    await page.getByRole("button", { name: "Byt till mörkt tema" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.waitForTimeout(400);
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.getByRole("button", { name: "Byt till ljust tema" })).toBeVisible();
  });
});

test.describe("small screens", () => {
  test.use({ viewport: { width: 375, height: 812 } });
  test("sidebar is a drawer and the breadcrumb collapses", async ({ page }) => {
    await open(page, "#/d1");
    await expect(page.locator(".sk-sidebar")).toBeHidden();
    await expect(page.locator(".sk-crumbs--compact")).toContainText("Del 1 · Växtcellen och transport över membran");
    await page.getByRole("button", { name: "Öppna menyn" }).click();
    await expect(page.locator(".sk-sidebar")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator(".sk-sidebar")).toBeHidden();
    await expect(page.getByRole("button", { name: "Öppna menyn" })).toBeFocused();
  });
});

test.describe("routes", () => {
  test("unknown links show a Swedish not-found page", async ({ page }) => {
    await open(page, "#/finns-inte");
    await expect(page.locator("main h1")).toHaveText("Sidan finns inte");
  });
  test("Mina framsteg lists parts with status", async ({ page }) => {
    await open(page, "#/framsteg");
    await expect(page).toHaveTitle("Mina framsteg – Biologi 2 | Plugga");
    await expect(page.locator("main")).toContainText("Dina framsteg sparas bara på den här enheten. Ingen annan kan se dem, inte heller läraren.");
  });
});

test.describe("backup file", () => {
  test("works from file:// with no requests to other sites", async ({ page }) => {
    const g = guard(page, { origin: "file" });
    await page.clock.setFixedTime(TODAY);
    await page.goto(pathToFileURL(resolve("dist/plugga-biologi2.html")).href);
    await expect(page.locator("main h1")).toHaveText("Växtfysiologi och cellbiologi");
    await page.locator(".sk-sidebar a[data-nav=d1]").click();
    await expect(page.locator("main h1")).toHaveText("Växtcellen och transport över membran");
    await page.locator(".sk-sidebar a[data-nav=progress]").click();
    await expect(page.locator("[data-backup-file-note]")).toContainText("Det här är reservfilen.");
    await expect(page.locator("[data-install]")).toHaveCount(0);
    await page.locator("[data-share-button]").click();
    await expect(page.locator("#share-url")).toHaveValue("https://linuswahlgren.github.io/plugga-biologi2/#/framsteg");
    g.done();
  });
});

test.describe("accessibility (axe)", () => {
  test.describe.configure({ timeout: 90_000 });
  for (const scheme of ["light", "dark"] as const) {
    for (const hash of ["#/", "#/d1", "#/prov1", "#/prov1/om", "#/prov2", "#/framsteg"]) {
      test(`${hash} has no violations (${scheme})`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme });
        await open(page, hash);
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
        expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
      });
    }
  }
});
