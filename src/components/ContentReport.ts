/** Content check report: errors are shown to everyone; warnings only in dev or with ?kontroll. */
import { h } from "../dom.ts";
import { sv } from "../i18n/sv.ts";
import type { CheckResult } from "../check.ts";

export function contentReport(result: CheckResult, showWarnings: boolean): HTMLElement | null {
  if (!result.errors.length && !showWarnings) return null;
  return h(
    "section",
    { class: "sk-card sk-stack", "data-content-report": "", role: result.errors.length ? "alert" : null },
    result.errors.length
      ? [
          h("h2", { class: "sk-heading" }, sv.content.errorsTitle),
          h("p", null, sv.content.errorsText),
          h("ul", { class: "sk-list" }, result.errors.map((e) => h("li", null, h("strong", null, e.where), `: ${e.text}`))),
        ]
      : null,
    showWarnings
      ? [
          h("h2", { class: "sk-heading" }, sv.content.warningsTitle, ` (${result.warnings.length})`),
          result.warnings.length
            ? h("ul", { class: "sk-list sk-small" }, result.warnings.map((w) => h("li", null, h("strong", null, w.where), `: ${w.text}`)))
            : h("p", null, sv.content.warningsNone),
        ]
      : null,
  );
}
