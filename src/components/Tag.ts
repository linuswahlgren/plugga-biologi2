/** Tags: StatusTag, RepetitionTag, SupplementTag, LevelTag, ExtraTermTag. Neutral pills; colour never carries meaning alone. */
import { h } from "../dom.ts";
import { sv } from "../i18n/sv.ts";
import type { PartStatus } from "../mastery.ts";
import type { Level } from "../types.ts";

export function statusTag(status: PartStatus): HTMLElement {
  const text = {
    notStarted: sv.status.notStarted,
    inProgress: sv.status.inProgress,
    needsReview: sv.status.needsReview,
    complete: sv.status.complete,
  }[status];
  const cls = status === "complete" ? "sk-tag sk-tag--accent" : status === "needsReview" ? "sk-tag sk-tag--danger" : "sk-tag";
  return h("span", { class: cls, "data-status": status }, text);
}

export function repetitionTag(): HTMLElement {
  return h("span", { class: "sk-tag sk-tag--outline" }, sv.status.repetition);
}

function tipTag(text: string, tip: string, cls = "sk-tag sk-tag--outline"): HTMLElement {
  return h(
    "span",
    { class: `${cls} sk-tip`, "data-tooltip": tip, title: tip },
    text,
    h("span", { class: "sk-visually-hidden" }, `: ${tip}`),
  );
}

export function supplementTag(): HTMLElement {
  return tipTag(sv.status.supplement, sv.status.supplementTip);
}

export function levelTag(level: Level): HTMLElement {
  return tipTag(sv.status.level(level), sv.status.levelTip, "sk-tag");
}

export function extraTermTag(): HTMLElement {
  return h("span", { class: "sk-tag sk-tag--outline" }, sv.status.extraTerm);
}
