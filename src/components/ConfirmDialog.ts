/** ConfirmDialog: says exactly what will happen; focus is trapped by the native modal dialog and returned on close. */
import { h } from "../dom.ts";

export function confirmDialog(opts: { title: string; text: string; confirm: string; cancel: string }): Promise<boolean> {
  return new Promise((resolve) => {
    const returnTo = document.activeElement as HTMLElement | null;
    const titleId = `dlg-${Math.random().toString(36).slice(2)}`;
    const cancelBtn = h("button", { class: "sk-btn", type: "button", value: "cancel" }, opts.cancel);
    const okBtn = h("button", { class: "sk-btn sk-btn--primary", type: "button", value: "ok" }, opts.confirm);
    const dlg = h(
      "dialog",
      { class: "sk-dialog", "aria-labelledby": titleId },
      h("div", { class: "sk-stack" },
        h("h2", { class: "sk-heading", id: titleId }, opts.title),
        h("p", null, opts.text),
        h("div", { class: "sk-btnrow" }, okBtn, cancelBtn),
      ),
    );
    let result = false;
    const close = (ok: boolean) => {
      result = ok;
      dlg.close();
    };
    okBtn.addEventListener("click", () => close(true));
    cancelBtn.addEventListener("click", () => close(false));
    dlg.addEventListener("close", () => {
      dlg.remove();
      returnTo?.focus?.();
      resolve(result);
    });
    document.body.appendChild(dlg);
    dlg.showModal();
    cancelBtn.focus();
  });
}
