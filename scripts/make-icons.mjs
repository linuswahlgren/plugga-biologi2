/**
 * Renders the app icons (the "P" logo) to PNG with Playwright's Chromium, so no image tools are
 * needed. Run once when the logo changes: node scripts/run.mjs node scripts/make-icons.mjs
 * Writes public/icons/: icon-192.png, icon-512.png (rounded), maskable-512.png and
 * apple-touch-icon.png (full square, iOS rounds the corners itself).
 */
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const GREEN = "#1d6b4f";
const P = '<path d="M24 46V18h10.5a8.5 8.5 0 0 1 0 17H24" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>';
const svg = (size, { rounded, scale }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">` +
  `<rect width="64" height="64" rx="${rounded ? 14 : 0}" fill="${GREEN}"/>` +
  `<g transform="translate(32 32) scale(${scale}) translate(-33.5 -32)">${P}</g></svg>`;

const ICONS = [
  { file: "icon-192.png", size: 192, rounded: true, scale: 1 },
  { file: "icon-512.png", size: 512, rounded: true, scale: 1 },
  { file: "maskable-512.png", size: 512, rounded: false, scale: 0.8 },
  { file: "apple-touch-icon.png", size: 180, rounded: false, scale: 0.9 },
];

mkdirSync("public/icons", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
for (const icon of ICONS) {
  await page.setViewportSize({ width: icon.size, height: icon.size });
  await page.setContent(`<html><body style="margin:0;background:transparent">${svg(icon.size, icon)}</body></html>`);
  await page.locator("svg").screenshot({ path: `public/icons/${icon.file}`, omitBackground: icon.rounded });
  console.log("wrote", icon.file);
}
await browser.close();
