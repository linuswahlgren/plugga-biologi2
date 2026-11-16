/** PartCard: a part in an overview list. Number, title, status tag and mastery bar; the whole card is a link. */
import { h } from "../dom.ts";
import { sv } from "../i18n/sv.ts";
import type { NPart } from "../course.ts";
import type { PartMastery } from "../mastery.ts";
import { to } from "../router.ts";
import { progressMeter } from "./ProgressMeter.ts";
import { repetitionTag, statusTag } from "./Tag.ts";

export function partCard(part: NPart, m: PartMastery): HTMLElement {
  const isReview = part.examRef?.status === "done";
  return h(
    "a",
    { class: "sk-card sk-partcard", href: to.part(part.id), "data-part": part.id },
    h("span", { class: "sk-partcard__main" },
      h("span", { class: "sk-eyebrow" }, sv.nav.part(part.n)),
      h("span", { class: "sk-partcard__title" }, part.title),
    ),
    h("span", { class: "sk-tagrow" }, statusTag(m.status), isReview ? repetitionTag() : null),
    progressMeter(m.percent, `${sv.nav.part(part.n)}: ${sv.part.mastery}`).el,
  );
}
