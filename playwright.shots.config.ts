import { defineConfig, devices } from "@playwright/test";
import { tmpdir } from "node:os";
import { join } from "node:path";

/** npm run shots: screenshots to review/ at three sizes in both themes (Chromium). */
export default defineConfig({
  testDir: "tests",
  // Scratch output outside the project (cleaning it on a network share can fail).
  outputDir: join(tmpdir(), "plugga-shots-results"),
  testMatch: /shots\.spec\.ts/,
  workers: 2,
  reporter: [["list"]],
  timeout: 120_000,
  use: {
    baseURL: "http://localhost:4173/",
    locale: "sv-SE",
    timezoneId: "Europe/Stockholm",
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: "npm run preview",
    url: "http://localhost:4173/",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
