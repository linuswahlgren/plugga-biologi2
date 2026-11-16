/**
 * BackupCard and BackupPanel (BUILD.md §4.10.4).
 * BackupCard: one quiet card on the overview when the student has real progress and no copy from
 * the last 14 days: "Spara en kopia av dina framsteg" with "Spara" and "Inte nu" (hides it a week).
 * BackupPanel (Mina framsteg): save a copy as a file, load a copy, copy a text code, paste a code.
 * Loading merges and keeps the best of both.
 */
import { h, replace } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";
import type { App } from "../app.ts";
import { navigate } from "../router.ts";
import { addDays, daysBetween, shortDate, todayISO } from "../format.ts";
import { hasRealProgress } from "../mastery.ts";
import { decodeCode, encodeCode, makeBackup, mergeProgress, parseBackup } from "../store/backup.ts";
import { copyText } from "./ShareDialog.ts";

const json = (app: App) => JSON.stringify(makeBackup(app.store.get()), null, 1);

function markSaved(app: App): void {
  app.store.update((p) => {
    p.lastBackupAt = new Date().toISOString();
  }, { activity: false });
  app.store.flush();
}

/** Download the progress as a small .json file. */
export function saveCopy(app: App): void {
  const blob = new Blob([json(app)], { type: "application/json" });
  const href = URL.createObjectURL(blob);
  const a = h("a", { href, download: sv.backup.fileName(app.course.id, todayISO()), hidden: true });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
  markSaved(app);
  app.toast(sv.backup.saved);
}

/** Validate and merge a copy. Returns an error message, or null when it was loaded. */
export function loadCopy(app: App, text: string): string | null {
  const result = parseBackup(text, app.course.id);
  if (!result.ok) return result.reason === "course" ? sv.backup.errorCourse : result.reason === "version" ? sv.backup.errorVersion : sv.backup.errorFormat;
  app.store.replace(mergeProgress(app.store.get(), result.progress));
  app.store.flush();
  app.toast(sv.backup.loaded);
  return null;
}

export function needsBackup(app: App, today = todayISO()): boolean {
  const p = app.store.get();
  if (!hasRealProgress(p)) return false;
  if (p.settings.backupSnoozedUntil && p.settings.backupSnoozedUntil > today) return false;
  return !p.lastBackupAt || daysBetween(p.lastBackupAt.slice(0, 10), today) >= 14;
}

export function backupCard(app: App): HTMLElement | null {
  if (!needsBackup(app, app.today())) return null;
  const save = h("button", { class: "sk-btn sk-btn--primary", type: "button" }, icon("download", 18), sv.backup.save);
  const later = h("button", { class: "sk-btn sk-btn--quiet", type: "button" }, sv.backup.notNow);
  const el = h(
    "section",
    { class: "sk-card sk-stack", "aria-labelledby": "backup-title", "data-backup-card": "" },
    h("h2", { class: "sk-heading", id: "backup-title" }, sv.backup.cardTitle),
    h("p", { class: "sk-muted" }, sv.backup.cardText),
    h("div", { class: "sk-btnrow" }, save, later),
  );
  save.addEventListener("click", () => {
    saveCopy(app);
    el.remove();
  });
  later.addEventListener("click", () => {
    app.store.update((p) => {
      p.settings.backupSnoozedUntil = addDays(app.today(), 7);
    }, { activity: false });
    el.remove();
  });
  return el;
}

export function backupPanel(app: App): HTMLElement {
  const error = h("p", { class: "sk-error", role: "alert" });
  const showError = (msg: string | null) => {
    replace(error, msg ? [icon("x", 16), msg] : null);
  };
  const reload = () => navigate(location.hash || "#/");

  // File
  const fileInput = h("input", { type: "file", accept: ".json,application/json", class: "sk-visually-hidden", id: "backup-file", tabindex: "-1", "aria-label": sv.backup.loadFile });
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    const msg = loadCopy(app, await file.text());
    fileInput.value = "";
    showError(msg);
    if (!msg) reload();
  });
  const saveBtn = h("button", { class: "sk-btn sk-btn--primary", type: "button", "data-save-copy": "" }, icon("download", 18), sv.backup.saveFile);
  saveBtn.addEventListener("click", () => {
    saveCopy(app);
    reload();
  });
  const loadBtn = h("button", { class: "sk-btn", type: "button", "data-load-copy": "" }, icon("upload", 18), sv.backup.loadFile);
  loadBtn.addEventListener("click", () => fileInput.click());

  // Code
  const codeOut = h("textarea", { class: "sk-textarea sk-textarea--code", id: "backup-code", readonly: true, spellcheck: "false", rows: 3 });
  const codeBox = h("div", { class: "sk-stack sk-stack--2", hidden: true },
    h("label", { class: "sk-label", for: "backup-code" }, sv.backup.codeLabel),
    codeOut,
    h("p", { class: "sk-small sk-muted" }, sv.backup.codeHint),
  );
  const copyBtn = h("button", { class: "sk-btn", type: "button", "data-copy-code": "" }, icon("copy", 18), sv.backup.copyCode);
  copyBtn.addEventListener("click", async () => {
    codeOut.value = await encodeCode(json(app));
    codeBox.hidden = false;
    codeOut.focus();
    codeOut.select();
    markSaved(app);
    if (await copyText(codeOut.value)) app.toast(sv.backup.codeCopied);
  });
  const codeIn = h("textarea", { class: "sk-textarea sk-textarea--code", id: "backup-paste", spellcheck: "false", rows: 3 });
  const pasteBtn = h("button", { class: "sk-btn", type: "button", "data-load-code": "" }, icon("upload", 18), sv.backup.loadCode);
  pasteBtn.addEventListener("click", async () => {
    const text = await decodeCode(codeIn.value);
    const msg = text === null ? sv.backup.errorFormat : loadCopy(app, text);
    showError(msg);
    if (!msg) reload();
  });

  const last = app.store.get().lastBackupAt;
  return h(
    "section",
    { class: "sk-card sk-stack", "aria-labelledby": "backup-section", "data-backup": "" },
    h("h2", { class: "sk-heading", id: "backup-section" }, sv.backup.sectionTitle),
    h("p", null, sv.backup.sectionText),
    h("p", { class: "sk-small sk-muted", "data-last-backup": "" }, last ? sv.backup.lastSaved(shortDate(todayISO(new Date(last)))) : sv.backup.neverSaved),
    h("div", { class: "sk-btnrow" }, saveBtn, loadBtn, copyBtn, fileInput),
    codeBox,
    h("div", { class: "sk-stack sk-stack--2" },
      h("label", { class: "sk-label", for: "backup-paste" }, sv.backup.pasteLabel),
      codeIn,
      h("div", { class: "sk-btnrow" }, pasteBtn),
    ),
    error,
  );
}
