/**
 * npm run shots:site: the final screenshots (BUILD.md §10) of the real site (:4173), at 375×812,
 * 820×1180 and 1440×900 in light and dark, to review/<PLUGGA_PHASE>/ (default "fas5").
 */
import { test, expect, type Page } from "@playwright/test";
import { TODAY } from "./helpers.ts";
import { course } from "../content/index.ts";

const PHASE = process.env.PLUGGA_PHASE || "fas5";
const SIZES = [
  { name: "375", width: 375, height: 812 },
  { name: "820", width: 820, height: 1180 },
  { name: "1440", width: 1440, height: 900 },
] as const;
const THEMES = ["light", "dark"] as const;
// Element shots scroll the element to the top, under the sticky top bar: unstick it while shooting.
const STATIC_BAR = ".sk-topbar { position: static !important; }";
const QUIZ = new Map(course.weeks.flatMap((w) => w.quiz).map((q) => [q.id, q]));

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
      const dir = `review/${PHASE}/${size.name}-${theme}`;
      const s = async (name: string, fullPage = true) => {
        await page.waitForTimeout(150);
        await page.screenshot({ path: `${dir}/${name}.png`, fullPage });
      };

      await go(page, "#/");
      await s("01-oversikt-forsta-besok");
      await page.getByRole("button", { name: "Jag förstår" }).click();

      await go(page, "#/d3");
      await page.locator("[data-lesson=d3-l2] .sk-lesson__head").click();
      await s("02-del3-lar-dig");

      await go(page, "#/d3/kort");
      await s("03-del3-kort-valj-omgang");
      await go(page, "#/d3/kort?urval=del&antal=10&ordning=ordning");
      await page.locator("[data-start]").click();
      await expect(page.locator(".sk-flashcard")).toBeVisible();
      await s("04-kort-framsida", false);
      await page.keyboard.press("Space");
      await s("05-kort-baksida", false);
      await page.keyboard.press("2");
      for (let i = 0; i < 30 && !(await page.locator("[data-results]").count()); i++) {
        await page.locator(".sk-flashcard[data-flipped=false]").waitFor();
        await page.keyboard.press("Space");
        await page.keyboard.press(i % 3 === 1 && i < 9 ? "1" : "2");
      }
      await expect(page.locator("[data-results]")).toBeVisible();
      await s("06-kort-resultat");

      await go(page, "#/d3/quiz");
      await s("07-del3-quiz-valj-omgang");
      await go(page, "#/d3/quiz?urval=del&antal=5&niva=alla&ordning=ordning&lage=ova");
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

      await go(page, "#/d3/ova");
      await s("10-del3-ova");

      await go(page, "#/d1/ova");
      await page.locator("[data-practice=d1-p1]").screenshot({ path: `${dir}/11-ova-bild.png`, style: STATIC_BAR });
      await page.locator("[data-practice=d1-p2]").screenshot({ path: `${dir}/12-ova-ordning.png`, style: STATIC_BAR });

      await go(page, "#/prov1");
      await s("13-prov1");
      await go(page, "#/prov1/fragor");
      await page.locator("[data-study] .sk-lesson__head").first().click();
      await page.getByRole("button", { name: "Visa exempelsvar" }).first().click();
      await s("14-prov1-instuderingsfragor");
      await go(page, "#/prov1/begrepp");
      await s("15-prov1-begrepp", false);
      await go(page, "#/prov1/om");
      await s("16-prov1-om-materialet");

      await go(page, "#/prov2");
      await s("17-prov2");

      await go(page, "#/");
      await s("18-oversikt-efter-plugg");
      await go(page, "#/framsteg");
      await s("19-mina-framsteg");

      await go(page, "#/d3/quiz");
      await page.locator("[data-share-button]").click();
      await expect(page.locator("dialog[data-share]")).toBeVisible();
      await s("20-dela", false);
      await page.keyboard.press("Escape");

      if (size.width < 860) {
        await go(page, "#/");
        await page.getByRole("button", { name: "Öppna menyn" }).click();
        await s("21-meny", false);
      }
    });
  }
}
