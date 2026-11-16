/**
 * SessionHeader: replaces the page head inside a running session (BUILD.md §4.1):
 * "Quiz · Fotosyntesen · Fråga 4 av 10", a progress bar, an optional timer and "Avsluta".
 * The title is the page's h1, so focus lands on it when the session opens.
 */
import { h, replace } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";
import { progressMeter } from "./ProgressMeter.ts";

export interface SessionHeader {
  el: HTMLElement;
  setCounter(text: string): void;
  setProgress(fraction: number): void;
  setTimer(text: string | null, urgent?: boolean): void;
}

export function sessionHeader(opts: { title: string; counter: string; onExit: () => void }): SessionHeader {
  const counter = h("span", { class: "sk-sessionhead__counter sk-num" }, opts.counter);
  const timer = h("span", { class: "sk-sessionhead__timer sk-num", role: "timer", "aria-label": sv.quiz.timeLeftLabel, hidden: true });
  const meter = progressMeter(0, sv.session.progress, { showValue: false });
  const exit = h("button", { class: "sk-btn sk-btn--sm", type: "button", onclick: opts.onExit }, icon("x", 16), sv.session.exit);
  const el = h(
    "header",
    { class: "sk-sessionhead" },
    h(
      "div",
      { class: "sk-sessionhead__row" },
      h("h1", { class: "sk-sessionhead__title", tabindex: "-1" }, h("span", null, opts.title), h("span", { class: "sk-sessionhead__sep", "aria-hidden": "true" }, " · "), counter),
      timer,
      exit,
    ),
    meter.el,
  );
  return {
    el,
    setCounter: (text) => {
      counter.textContent = text;
    },
    setProgress: (fraction) => meter.set(fraction * 100),
    setTimer(text, urgent = false) {
      timer.hidden = text === null;
      timer.classList.toggle("sk-sessionhead__timer--urgent", urgent);
      if (text !== null) replace(timer, icon("clock", 16), text);
    },
  };
}
