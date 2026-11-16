/** "Så funkar Plugga": dismissible first-visit card. Learn, practise, test; progress is private; home-screen tip. */
import { h } from "../dom.ts";
import { sv } from "../i18n/sv.ts";
import type { App } from "../app.ts";

export function introCard(app: App, onDismiss: () => void): HTMLElement {
  const el = h(
    "section",
    { class: "sk-card sk-stack", "aria-labelledby": "intro-title" },
    h("h2", { class: "sk-heading", id: "intro-title" }, sv.intro.title),
    h("ol", { class: "sk-list sk-list--2" }, sv.intro.steps.map((s) => h("li", null, app.mdInline(s)))),
    h("p", null, sv.intro.privacy),
    h("p", { class: "sk-small sk-muted" }, sv.intro.homeScreen),
    h("div", { class: "sk-btnrow" },
      h("button", {
        class: "sk-btn",
        type: "button",
        onclick: () => {
          app.store.update((p) => { p.settings.introDismissed = true; }, { activity: false });
          el.remove();
          onDismiss();
        },
      }, sv.intro.dismiss),
    ),
  );
  return el;
}
