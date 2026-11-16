/**
 * ShareDialog ("Dela", BUILD.md §4.10.7): copies the link to the current view and shows it as a
 * QR code for projecting in class. The QR code is made locally (uqr, MIT) and drawn as an SVG,
 * always dark on white so phone cameras can read it in both themes.
 */
import { encode } from "uqr";
import { h, s } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";

/** The QR code for `text` as an SVG: one path, with a quiet zone of 2 modules. */
export function qrSvg(text: string, label: string): SVGSVGElement {
  const qr = encode(text, { ecc: "M", border: 2 });
  let d = "";
  qr.data.forEach((row, y) => row.forEach((dark, x) => {
    if (dark) d += `M${x} ${y}h1v1h-1z`;
  }));
  return s(
    "svg",
    { class: "sk-qr", viewBox: `0 0 ${qr.size} ${qr.size}`, role: "img", "aria-label": label, "shape-rendering": "crispEdges", "data-qr": text },
    s("rect", { width: qr.size, height: qr.size, class: "sk-qr__bg" }),
    s("path", { d, class: "sk-qr__fg" }),
  );
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function openShareDialog(url: string, toast: (message: string) => void): void {
  if (document.querySelector("dialog[data-share]")) return;
  // Safari doesn't focus a clicked button, so fall back to the top bar's "Dela".
  const active = document.activeElement as HTMLElement | null;
  const returnTo = active && active !== document.body ? active : document.querySelector<HTMLElement>("[data-share-button]");
  const input = h("input", { class: "sk-input", id: "share-url", type: "text", readonly: true, value: url, spellcheck: "false" });
  const status = h("p", { class: "sk-small sk-muted", role: "status" });
  const copyBtn = h("button", { class: "sk-btn sk-btn--primary", type: "button" }, icon("copy", 18), sv.share.copy);
  const closeBtn = h("button", { class: "sk-iconbtn", type: "button", "aria-label": sv.share.close }, icon("x"));
  const doCopy = async () => {
    if (await copyText(url)) {
      toast(sv.share.copied);
      status.textContent = sv.share.copied;
    } else {
      status.textContent = sv.share.copyFailed;
      input.select();
    }
  };
  copyBtn.addEventListener("click", () => void doCopy());
  input.addEventListener("focus", () => input.select());

  const dlg = h(
    "dialog",
    { class: "sk-dialog sk-dialog--share", "data-share": "", "aria-labelledby": "share-title" },
    h("div", { class: "sk-dialog__head" }, h("h2", { class: "sk-heading", id: "share-title" }, sv.share.title), closeBtn),
    h("div", { class: "sk-stack" },
      h("p", { class: "sk-small sk-muted" }, sv.share.text),
      h("div", { class: "sk-qrwrap" }, qrSvg(url, sv.share.qrAlt)),
      h("label", { class: "sk-label", for: "share-url" }, sv.share.linkLabel),
      input,
      h("div", { class: "sk-btnrow" }, copyBtn),
      status,
    ),
  );
  closeBtn.addEventListener("click", () => dlg.close());
  dlg.addEventListener("close", () => {
    dlg.remove();
    returnTo?.focus?.();
  });
  document.body.appendChild(dlg);
  dlg.showModal();
  copyBtn.focus();
  void doCopy();
}
