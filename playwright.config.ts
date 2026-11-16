import { defineConfig, devices } from "@playwright/test";

/**
 * npm test: builds first (pretest), then runs
 *  - "node":     unit specs without a browser (answer matching, markup, migration, content check …)
 *  - chromium, firefox, webkit: the built site via `vite preview`, and the backup file via file://
 */
const e2e = /.*\.e2e\.ts/;

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  workers: process.env.CI ? 2 : 3,
  // Firefox occasionally fails while closing a context on slow machines (a Playwright/Firefox
  // protocol error after the test has passed). One retry; retried tests are reported as "flaky".
  retries: 1,
  reporter: [["list"]],
  timeout: 45_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: "http://localhost:4173/",
    locale: "sv-SE",
    timezoneId: "Europe/Stockholm",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "node", testMatch: /.*\.unit\.ts/ },
    { name: "chromium", testMatch: e2e, use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", testMatch: e2e, use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", testMatch: e2e, use: { ...devices["Desktop Safari"] } },
  ],
  webServer: {
    command: "npm run preview",
    url: "http://localhost:4173/",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
