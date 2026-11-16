/** Toast: a quiet, short message at the bottom (role="status"). Optional single action. */
import { h } from "../dom.ts";

export function createToaster(region: HTMLElement) {
  return (message: string, action?: { label: string; onClick: () => void }, ms = 4000) => {
    const btn = action
      ? h("button", { class: "sk-btn sk-btn--sm", type: "button", onclick: () => { action.onClick(); toast.remove(); } }, action.label)
      : null;
    const toast = h("div", { class: "sk-toast" }, h("span", null, message), btn);
    region.appendChild(toast);
    if (!action) setTimeout(() => toast.remove(), ms);
    return () => toast.remove();
  };
}
