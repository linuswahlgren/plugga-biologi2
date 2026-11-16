/** EmptyState: says plainly why something is empty and what to do instead. Never an empty list. */
import { h, type Child } from "../dom.ts";

export function emptyState(title: string, text: string, action?: Child): HTMLElement {
  return h("section", { class: "sk-card sk-empty" }, h("h2", { class: "sk-heading" }, title), h("p", null, text), action ?? null);
}
