import { defineConfig, devices } from "@playwright/test";
import { tmpdir } from "node:os";
import { join } from "node:path";

/** npm run shots:site: the final screenshots of the real site (:4173) to review/, tests/site.shots.ts (Chromium). */
export default defineConfig({
  testDir: "tests",
  outputDir: join(tmpdir(), "plugga-shots-results"),
  testMatch: /site\.shots\.ts/,
  workers: 2,
  reporter: [["list"]],
  timeout: 180_000,
  use: {
    baseURL: "http://localhost:4173/",
    locale: "sv-SE",
    timezoneId: "Europe/Stockholm",
    ...devices["Desktop Chrome"],
    // So the share dialog shows "Länken är kopierad" as students see it.
    permissions: ["clipboard-read", "clipboard-write"],
  },
  webServer: {
    command: "npm run preview",
    url: "http://localhost:4173/",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
