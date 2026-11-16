/** ProgressMeter: a bar with role="progressbar" and a tabular percentage. */
import { h } from "../dom.ts";
import { percent } from "../format.ts";

export interface ProgressMeter {
  el: HTMLElement;
  set(value: number): void;
}

export function progressMeter(value: number, label: string, opts: { showValue?: boolean } = {}): ProgressMeter {
  const fill = h("span", { class: "sk-progress__fill" });
  const bar = h("span", {
    class: "sk-progress",
    role: "progressbar",
    "aria-label": label,
    "aria-valuemin": 0,
    "aria-valuemax": 100,
  }, fill);
  const valueEl = h("span", { class: "sk-meter__value", "aria-hidden": "true" });
  const el = h("span", { class: "sk-meter" }, bar, opts.showValue === false ? null : valueEl);
  const set = (v: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(v)));
    fill.style.width = `${clamped}%`;
    bar.setAttribute("aria-valuenow", String(clamped));
    bar.setAttribute("aria-valuetext", percent(clamped));
    valueEl.textContent = percent(clamped);
  };
  set(value);
  return { el, set };
}
