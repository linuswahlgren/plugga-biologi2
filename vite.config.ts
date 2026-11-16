import { defineConfig, type Plugin } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { renameSync, rmSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { course } from "./content/index.ts";
import { sv } from "./src/i18n/sv.ts";

/**
 * Three production builds from one source:
 *   --mode site    -> dist/site/: index.html + manifest.webmanifest, sw.js, icons/, version.json
 *   --mode backup  -> dist/plugga-biologi2.html (self-contained, works from file://, no service worker)
 *   --mode e2e     -> dist/e2e/: the site built with the test course (tests/fixtures/course.ts)
 * Each inlines every script, style and font into a single HTML file.
 */
const BACKUP_TMP = "dist/.backup";
const BACKUP_FILE = "dist/plugga-biologi2.html";
const BUILD_TIME = new Date().toISOString();

/** Licence notices for bundled code, kept as an HTML comment in every build. */
const NOTICES = `<!--
Plugga bundles:
- Figtree (SIL Open Font License 1.1), see src/fonts/OFL.txt in the source.
- uqr, QR code encoder. MIT License. Copyright (c) Project Nayuki. Copyright (c) 2023 Anthony Fu.
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
  documentation files (the "Software"), to deal in the Software without restriction, including without limitation
  the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
  to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above
  copyright notice and this permission notice shall be included in all copies or substantial portions of the
  Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.
-->`;

function moveBackupFile(): Plugin {
  return {
    name: "plugga-move-backup",
    apply: "build",
    closeBundle() {
      const from = resolve(BACKUP_TMP, "index.html");
      if (!existsSync(from)) return;
      mkdirSync(resolve("dist"), { recursive: true });
      renameSync(from, resolve(BACKUP_FILE));
      rmSync(resolve(BACKUP_TMP), { recursive: true, force: true });
    },
  };
}

/** Hosted site only: web manifest, version.json (update check) and the links to them. */
function hostedSite(): Plugin {
  const manifest = {
    name: `Plugga – ${course.title}`,
    short_name: "Plugga",
    description: sv.appDescription,
    lang: "sv",
    dir: "ltr",
    id: "./",
    start_url: "./",
    scope: "./",
    display: "standalone",
    background_color: "#f6f6f3",
    theme_color: "#f6f6f3",
    icons: [
      { src: "icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
  return {
    name: "plugga-hosted-site",
    apply: "build",
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "manifest.webmanifest", source: JSON.stringify(manifest, null, 2) });
      this.emitFile({ type: "asset", fileName: "version.json", source: JSON.stringify({ build: BUILD_TIME }) });
    },
    transformIndexHtml: () => [
      { tag: "link", attrs: { rel: "manifest", href: "./manifest.webmanifest" }, injectTo: "head" },
      { tag: "link", attrs: { rel: "apple-touch-icon", href: "./icons/apple-touch-icon.png" }, injectTo: "head" },
      { tag: "meta", attrs: { name: "apple-mobile-web-app-title", content: "Plugga" }, injectTo: "head" },
      { tag: "meta", attrs: { name: "mobile-web-app-capable", content: "yes" }, injectTo: "head" },
    ],
  };
}

function notices(): Plugin {
  return { name: "plugga-notices", transformIndexHtml: (html) => html.replace("</head>", `${NOTICES}\n  </head>`) };
}

export default defineConfig(({ mode }) => {
  const isBackup = mode === "backup";
  const isE2E = mode === "e2e";
  const isSite = mode === "site" || isE2E;
  return {
    base: "./",
    publicDir: isBackup ? false : "public",
    define: {
      __BUILD_TARGET__: JSON.stringify(isBackup ? "backup" : isSite ? "site" : "dev"),
      __BUILD_TIME__: JSON.stringify(BUILD_TIME),
    },
    plugins: [viteSingleFile({ removeViteModuleLoader: true }), notices(), ...(isSite ? [hostedSite()] : []), ...(isBackup ? [moveBackupFile()] : [])],
    build: {
      outDir: isBackup ? BACKUP_TMP : isE2E ? "dist/e2e" : "dist/site",
      emptyOutDir: true,
      target: "es2020",
      assetsInlineLimit: 100_000_000,
      cssCodeSplit: false,
      // lightningcss is a native module; school PCs block native modules on network drives.
      cssMinify: false,
      reportCompressedSize: false,
    },
    // H: on school PCs is a DFS network share; resolving symlinks turns paths into UNC paths
    // that no longer match the project root. Keep paths as written.
    resolve: {
      preserveSymlinks: true,
      // The e2e build swaps the course for the test course.
      alias: isE2E ? [{ find: /^.*\/content\/index\.ts$/, replacement: resolve("tests/fixtures/course.ts") }] : [],
    },
    preview: { port: 4173, strictPort: true },
    server: { port: 5173, strictPort: true },
  };
});
