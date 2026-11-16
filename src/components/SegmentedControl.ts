/**
 * SegmentedControl: one choice among a few (Antal, Ordning, Läge, Tid). A native radio group
 * styled as segments, so arrow keys and screen readers work as usual. A disabled option keeps
 * its size and place (45 % opacity).
 */
import { h, nextId } from "../dom.ts";

export interface SegmentOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SegmentedControl {
  el: HTMLElement;
  value(): string;
  set(value: string): void;
  setDisabled(value: string, disabled: boolean): void;
}

export function segmentedControl(opts: {
  legend: string;
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  hint?: HTMLElement;
  key?: string;
}): SegmentedControl {
  const name = nextId("seg");
  const inputs = new Map<string, HTMLInputElement>();
  const track = h(
    "div",
    { class: "sk-seg" },
    opts.options.map((o) => {
      const input = h("input", { class: "sk-seg__input", type: "radio", name, value: o.value });
      input.checked = o.value === opts.value;
      input.disabled = !!o.disabled;
      input.addEventListener("change", () => {
        if (input.checked) opts.onChange(o.value);
      });
      inputs.set(o.value, input);
      return h("label", { class: "sk-seg__opt" }, input, h("span", { class: "sk-seg__label" }, o.label));
    }),
  );
  const el = h(
    "fieldset",
    { class: "sk-field", "data-control": opts.key ?? null },
    h("legend", { class: "sk-label" }, opts.legend),
    track,
    opts.hint ?? null,
  );
  return {
    el,
    value: () => [...inputs.values()].find((i) => i.checked)?.value ?? "",
    set(value) {
      const input = inputs.get(value);
      if (input) input.checked = true;
    },
    setDisabled(value, disabled) {
      const input = inputs.get(value);
      if (input) input.disabled = disabled;
    },
  };
}
