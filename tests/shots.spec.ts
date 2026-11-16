/** npm run shots: screenshots for review at 375×812, 820×1180 and 1440×900, light and dark. */
import { test, expect, type Page } from "@playwright/test";
import { TODAY } from "./helpers.ts";

const PHASE = process.env.PLUGGA_PHASE || "fas1";
const SIZES = [
  { name: "375", width: 375, height: 812 },
  { name: "820", width: 820, height: 1180 },
  { name: "1440", width: 1440, height: 900 },
] as const;
const THEMES = ["light", "dark"] as const;

async function shot(page: Page, name: string, size: string, theme: string) {
  await page.waitForTimeout(150);
  await page.screenshot({ path: `review/${PHASE}/${size}-${theme}/${name}.png`, fullPage: true });
}

for (const size of SIZES) {
  for (const theme of THEMES) {
    test(`${size.name} ${theme}`, async ({ page }) => {
      await page.setViewportSize({ width: size.width, height: size.height });
      await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
      await page.clock.setFixedTime(TODAY);

      await page.goto("/#/");
      await expect(page.locator("main h1")).toBeVisible();
      await shot(page, "01-oversikt", size.name, theme);

      await page.goto("/#/d1");
      await expect(page.locator("main h1")).toBeVisible();
      await shot(page, "02-del1-lar-dig", size.name, theme);

      const check = page.locator("[data-lesson=d1-l1] .sk-check");
      await check.getByRole("button", { name: /Mitokondrie/ }).click();
      await check.scrollIntoViewIfNeeded();
      await shot(page, "03-snabbkoll-feedback", size.name, theme);

      await page.goto("/#/d1?lektion=d1-l2");
      await expect(page.locator("[data-lesson=d1-l2] .sk-lesson__head")).toHaveAttribute("aria-expanded", "true");
      await shot(page, "04-del1-lektion2", size.name, theme);

      if (size.width < 1180) {
        await page.goto("/#/d1");
        await page.getByRole("button", { name: "Visa anteckningar" }).click();
        await shot(page, "05-anteckningar", size.name, theme);
      }

      await page.goto("/#/prov1");
      await expect(page.locator("main h1")).toBeVisible();
      await shot(page, "06-prov1-lasanvisningar", size.name, theme);

      await page.goto("/#/prov1/om");
      await expect(page.locator("main h1")).toBeVisible();
      await shot(page, "07-prov1-om-materialet", size.name, theme);

      await page.goto("/#/prov2");
      await expect(page.locator("main h1")).toBeVisible();
      await shot(page, "08-prov2-tomt", size.name, theme);

      await page.goto("/#/framsteg");
      await expect(page.locator("main h1")).toBeVisible();
      await shot(page, "09-mina-framsteg", size.name, theme);

      if (size.width < 860) {
        await page.goto("/#/");
        await page.getByRole("button", { name: "Öppna menyn" }).click();
        await shot(page, "10-meny", size.name, theme);
      }
    });
  }
}
