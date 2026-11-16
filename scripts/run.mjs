/**
 * Runs a dev tool (vite, playwright) from node_modules.
 *
 * Why: on school PCs the home folder (H:) is a network share where Windows refuses to load
 * native modules ("Åtkomst nekad"). Vite's bundler (rolldown) is a native module. When loading it
 * from node_modules fails, this script copies it once to a local folder
 * (%LOCALAPPDATA%\plugga-native\…) and points rolldown there via NAPI_RS_NATIVE_LIBRARY_PATH.
 * On other machines (and in GitHub Actions) it does nothing special.
 *
 * Usage: node scripts/run.mjs <vite|playwright> [args…]
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";

const require = createRequire(import.meta.url);
const [tool, ...args] = process.argv.slice(2);
const BINS = {
  vite: ["vite", "bin/vite.js"],
  playwright: ["@playwright/test", "cli.js"],
};
if (!BINS[tool]) {
  console.error(`Okänt verktyg: ${tool}. Använd vite eller playwright.`);
  process.exit(2);
}

const env = { ...process.env };

function localNativeBinding() {
  if (process.platform !== "win32" || env.NAPI_RS_NATIVE_LIBRARY_PATH) return;
  const arch = process.arch === "arm64" ? "arm64" : "x64";
  const pkg = `@rolldown/binding-win32-${arch}-msvc`;
  let pkgJson;
  try {
    pkgJson = require.resolve(`${pkg}/package.json`);
  } catch {
    return;
  }
  const file = join(dirname(pkgJson), `rolldown-binding.win32-${arch}-msvc.node`);
  if (!existsSync(file)) return;
  try {
    require(file);
    return; // loads fine from node_modules: nothing to do
  } catch {
    /* blocked: copy to a local folder */
  }
  const version = JSON.parse(readFileSync(pkgJson, "utf8")).version;
  const base = env.LOCALAPPDATA || tmpdir();
  const dir = join(base, "plugga-native", `rolldown-${version}`);
  const target = join(dir, `rolldown-binding.win32-${arch}-msvc.node`);
  if (!existsSync(target) || statSync(target).size !== statSync(file).size) {
    mkdirSync(dir, { recursive: true });
    copyFileSync(file, target);
  }
  env.NAPI_RS_NATIVE_LIBRARY_PATH = target;
}

localNativeBinding();

const [pkgName, binPath] = BINS[tool];
const bin = join(dirname(require.resolve(`${pkgName}/package.json`)), binPath);
const child = spawn(process.execPath, [bin, ...args], { stdio: "inherit", env });
child.on("exit", (code, signal) => process.exit(signal ? 1 : (code ?? 0)));
