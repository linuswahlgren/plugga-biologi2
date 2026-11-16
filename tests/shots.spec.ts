/**
 * npm run shots: screenshots for review at 375×812, 820×1180 and 1440×900, light and dark, to
 * review/<PLUGGA_PHASE>/ (default "fas2"). Uses the site built with the test course (:4174) so the
 * learning features have items to show before the real ones are written.
 */
import { test, expect, type Page } from "@playwright/test";
import { TODAY } from "./helpers.ts";
import { course as fixture } from "./fixtures/course.ts";

const PHASE = process.env.PLUGGA_PHASE || "fas4";
const SIZES = [
  { name: "375", width: 375, height: 812 },
  { name: "820", width: 820, height: 1180 },
  { name: "1440", width: 1440, height: 900 },
] as const;
const THEMES = ["light", "dark"] as const;
const QUIZ = new Map(fixture.weeks.flatMap((w) => w.quiz).map((q) => [q.id, q]));

async function shot(page: Page, name: string, size: string, theme: string, fullPage = true) {
  await page.waitForTimeout(150);
  await page.screenshot({ path: `review/${PHASE}/${size}-${theme}/${name}.png`, fullPage });
}

async function go(page: Page, hash: string) {
  await page.goto(`/${hash}`);
  await expect(page.locator("main h1")).toBeVisible();
}

async function answer(page: Page, right: boolean) {
  const q = QUIZ.get((await page.locator(".sk-quizcard").getAttribute("data-quiz"))!)!;
  await page.locator(`.sk-quizcard .sk-option[data-value="${right ? q.answer : q.options.find((o) => o !== q.answer)}"]`).click();
}

for (const size of SIZES) {
  for (const theme of THEMES) {
    test(`${size.name} ${theme}`, async ({ page }) => {
      test.setTimeout(180_000);
      await page.setViewportSize({ width: size.width, height: size.height });
      await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
      await page.clock.setFixedTime(TODAY);
      const s = (name: string, full = true) => shot(page, name, size.name, theme, full);

      await go(page, "#/");
      await s("01-oversikt");

      await go(page, "#/d1");
      await s("02-del1-lar-dig");

      await go(page, "#/d1/quiz");
      await s("03-valj-omgang-quiz");

      await go(page, "#/d1/kort?urval=del&antal=alla&ordning=ordning");
      await s("04-valj-omgang-kort");
      await page.locator("[data-start]").click();
      await expect(page.locator(".sk-flashcard")).toBeVisible();
      await s("05-kort-framsida", false);
      await page.keyboard.press("Space");
      await s("06-kort-baksida", false);
      await page.keyboard.press("2");
      for (let i = 0; i < 30 && !(await page.locator("[data-results]").count()); i++) {
        await page.locator(".sk-flashcard[data-flipped=false]").waitFor();
        await page.keyboard.press("Space");
        await page.keyboard.press(i % 4 === 1 && i < 12 ? "1" : "2");
      }
      await expect(page.locator("[data-results]")).toBeVisible();
      await s("07-kort-slut");

      await go(page, "#/d1/quiz?urval=del&antal=5&niva=alla&ordning=ordning&lage=ova");
      await page.locator("[data-start]").click();
      await answer(page, false);
      await s("08-quiz-feedback");
      for (let i = 0; i < 4; i++) {
        await page.keyboard.press("Enter");
        await answer(page, i !== 2);
      }
      await page.keyboard.press("Enter");
      await expect(page.locator("[data-results]")).toBeVisible();
      await s("09-quiz-resultat");

      await go(page, "#/d1/quiz?urval=del&antal=10&niva=alla&ordning=ordning&lage=prov&tid=20");
      await page.locator("[data-start]").click();
      await answer(page, true);
      await page.getByRole("button", { name: "Markera för att titta igen" }).click();
      await page.keyboard.press("ArrowRight");
      await answer(page, false);
      await s("10-provlage");

      await go(page, "#/d1/ova");
      await page.locator("[data-practice=d1-xp1] input").fill("celulosa");
      await page.locator("[data-practice=d1-xp1] button[type=submit]").click();
      await page.locator("[data-practice=d1-xp3]").getByRole("button", { name: "Visa exempelsvar" }).click();
      await page.locator("[data-practice=d1-xp4] [data-check]").click();
      await s("11-ova");
      await page.locator("[data-practice=d1-xp4]").screenshot({ path: `review/${PHASE}/${size.name}-${theme}/11b-ordning.png` });

      await go(page, "#/d2/ova");
      await s("12-ova-bilder");

      await go(page, "#/prov1/fragor");
      await page.locator("[data-study] .sk-lesson__head").first().click();
      await page.getByRole("button", { name: "Visa exempelsvar" }).first().click();
      await s("13-prov1-instuderingsfragor");

      await go(page, "#/prov1/begrepp");
      await s("14-prov1-begrepp");

      await go(page, "#/prov1/simulering");
      await s("15-prov1-provsimulering");

      await go(page, "#/framsteg");
      await s("16-mina-framsteg");

      await go(page, "#/prov2");
      await s("17-prov2");

      if (size.width < 860) {
        await go(page, "#/");
        await page.getByRole("button", { name: "Öppna menyn" }).click();
        await s("18-meny", false);
      }

      // Phase 4: Dela, the backup card and the backup section.
      await go(page, "#/d1/quiz");
      await page.locator("[data-share-button]").click();
      await expect(page.locator("dialog[data-share]")).toBeVisible();
      await s("19-dela", false);
      await page.keyboard.press("Escape");
      await page.evaluate(() => {
        const key = "plugga:bio2-vaxtfys-cellbio-ht26";
        const p = JSON.parse(localStorage.getItem(key) || "{}");
        p.lastBackupAt = null;
        p.settings = { ...(p.settings || {}), introDismissed: true, backupSnoozedUntil: null };
        localStorage.setItem(key, JSON.stringify(p));
      });
      await go(page, "#/");
      await page.reload();
      await expect(page.locator("[data-backup-card]")).toBeVisible();
      await s("20-oversikt-kopiekort");
      await go(page, "#/framsteg");
      await page.locator("[data-copy-code]").click();
      await expect(page.locator("#backup-code")).toHaveValue(/^PLUGGA/);
      await page.locator("[data-backup]").scrollIntoViewIfNeeded();
      await s("21-framsteg-kopia");
    });
  }
}
