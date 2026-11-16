/** Keyboard shortcut list, opened with "?". Native modal dialog: traps focus, Esc closes, focus returns. */
import { h } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";

export function openShortcuts(): void {
  if (document.querySelector("dialog[data-shortcuts]")) return;
  const returnTo = document.activeElement as HTMLElement | null;
  const closeBtn = h("button", { class: "sk-iconbtn", type: "button", "aria-label": sv.shortcuts.close }, icon("x"));
  const dlg = h(
    "dialog",
    { class: "sk-dialog", "data-shortcuts": "", "aria-labelledby": "shortcuts-title" },
    h("div", { class: "sk-dialog__head" }, h("h2", { class: "sk-heading", id: "shortcuts-title" }, sv.shortcuts.title), closeBtn),
    h("dl", { class: "sk-keys" },
      sv.shortcuts.items.map(([k, v]) => [h("dt", null, h("kbd", { class: "sk-kbd" }, k)), h("dd", null, v)]),
    ),
  );
  closeBtn.addEventListener("click", () => dlg.close());
  dlg.addEventListener("close", () => {
    dlg.remove();
    returnTo?.focus?.();
  });
  document.body.appendChild(dlg);
  dlg.showModal();
  closeBtn.focus();
}
