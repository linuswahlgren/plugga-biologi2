/** StatTile: one number and its label, tabular figures. */
import { h } from "../dom.ts";

export function statTile(value: string, label: string, sub?: string): HTMLElement {
  return h(
    "div",
    { class: "sk-card sk-stat" },
    h("p", { class: "sk-stat__value" }, value, sub ? h("span", { class: "sk-small sk-muted" }, ` ${sub}`) : null),
    h("p", { class: "sk-stat__label" }, label),
  );
}
