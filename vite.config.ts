import { defineConfig, type Plugin } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { renameSync, rmSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Two production builds from one source:
 *   --mode site    -> dist/site/index.html (+ manifest, service worker, icons in Phase 4)
 *   --mode backup  -> dist/plugga-biologi2.html (self-contained, works from file://, no service worker)
 * Both inline every script, style and font into a single HTML file.
 */
const BACKUP_TMP = "dist/.backup";
const BACKUP_FILE = "dist/plugga-biologi2.html";

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

export default defineConfig(({ mode }) => {
  const isBackup = mode === "backup";
  return {
    base: "./",
    publicDir: isBackup ? false : "public",
    define: {
      __BUILD_TARGET__: JSON.stringify(isBackup ? "backup" : mode === "site" ? "site" : "dev"),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
    plugins: [viteSingleFile({ removeViteModuleLoader: true }), ...(isBackup ? [moveBackupFile()] : [])],
    build: {
      outDir: isBackup ? BACKUP_TMP : "dist/site",
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
    resolve: { preserveSymlinks: true },
    preview: { port: 4173, strictPort: true },
    server: { port: 5173, strictPort: true },
  };
});
