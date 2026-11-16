/**
 * Chip group: several choices at once (Nivå: Alla · E · C · A). Native checkboxes styled as pills.
 * "Alla" is checked exactly when no other chip is; checking it clears the others.
 * A checked chip shows a check icon as well as the accent fill, so colour is never the only signal.
 */
import { h } from "../dom.ts";
import { icon } from "../icons.ts";

export interface ChipGroup {
  el: HTMLElement;
  set(values: string[]): void;
}

export function chipGroup(opts: {
  legend: string;
  allLabel: string;
  options: { value: string; label: string; title?: string }[];
  value: string[];
  onChange: (values: string[]) => void;
  key?: string;
}): ChipGroup {
  const chip = (label: string, title?: string) => {
    const input = h("input", { class: "sk-chip__input", type: "checkbox" });
    const el = h(
      "label",
      { class: "sk-chipwrap", title: title ?? null },
      input,
      h("span", { class: "sk-chip" }, h("span", { class: "sk-chip__check" }, icon("check", 16)), label),
    );
    return { input, el };
  };
  const all = chip(opts.allLabel);
  const items = opts.options.map((o) => ({ value: o.value, ...chip(o.label, o.title) }));

  const set = (values: string[]) => {
    for (const it of items) it.input.checked = values.includes(it.value);
    all.input.checked = !items.some((it) => it.input.checked);
  };
  const values = () => items.filter((it) => it.input.checked).map((it) => it.value);

  all.input.addEventListener("change", () => {
    for (const it of items) it.input.checked = false;
    all.input.checked = true;
    opts.onChange([]);
  });
  for (const it of items) {
    it.input.addEventListener("change", () => {
      all.input.checked = !items.some((x) => x.input.checked);
      opts.onChange(values());
    });
  }
  set(opts.value);

  const el = h(
    "fieldset",
    { class: "sk-field", "data-control": opts.key ?? null },
    h("legend", { class: "sk-label" }, opts.legend),
    h("div", { class: "sk-chips" }, all.el, items.map((it) => it.el)),
  );
  return { el, set };
}
