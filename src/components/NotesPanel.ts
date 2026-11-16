/**
 * NotesPanel: Viktigast (key points), Mina anteckningar (autosaved per part) and
 * "Begrepp i den här delen". Third column from 1180 px; an overlay drawer below that.
 */
import { h } from "../dom.ts";
import { icon } from "../icons.ts";
import { sv } from "../i18n/sv.ts";
import type { App } from "../app.ts";
import type { NPart } from "../course.ts";
import { to } from "../router.ts";
import { supplementTag } from "./Tag.ts";
import { printView } from "../print.ts";

export interface NotesPanel {
  el: HTMLElement;
  open(): void;
  close(): void;
  isOpen(): boolean;
}

export function notesPanel(app: App, part: NPart, onClose: () => void): NotesPanel {
  const titleId = `notes-title-${part.id}`;
  const noteId = `notes-text-${part.id}`;
  const status = h("p", { class: "sk-savestate", "aria-live": "polite" });
  const textarea = h("textarea", {
    class: "sk-textarea",
    id: noteId,
    placeholder: sv.notes.myNotesPlaceholder,
    spellcheck: "true",
    lang: "sv",
  });
  textarea.value = app.store.get().notes[part.id] ?? "";
  let timer: ReturnType<typeof setTimeout> | null = null;
  textarea.addEventListener("input", () => {
    status.textContent = sv.notes.saving;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      app.store.update((p) => {
        const v = textarea.value;
        if (v.trim()) p.notes[part.id] = v;
        else delete p.notes[part.id];
      }, { activity: false });
      status.textContent = sv.notes.saved;
    }, 400);
  });

  const terms = app.course.termsOf(part.id);
  const closeBtn = h("button", { class: "sk-iconbtn sk-notes__close", type: "button", "aria-label": sv.notes.close, onclick: onClose }, icon("x"));

  const el = h(
    "aside",
    { class: "sk-notes", id: `notes-${part.id}`, "aria-labelledby": titleId },
    h("div", { class: "sk-notes__head" }, h("h2", { class: "sk-heading", id: titleId }, sv.notes.title), closeBtn),
    part.keyPoints.length
      ? h("section", { class: "sk-card sk-stack", "data-keypoints": "" },
          h("h3", { class: "sk-eyebrow" }, sv.notes.keyPoints),
          h("p", { class: "sk-heading sk-printonly" }, sv.print.keyPointsTitle(`${sv.nav.part(part.n)} · ${part.title}`)),
          h("ul", null, part.keyPoints.map((k) => h("li", null, app.mdInline(k)))),
          h("div", null, h("button", { class: "sk-btn sk-btn--sm", type: "button", "data-print-button": "viktigast", onclick: () => printView("viktigast") }, icon("print", 16), sv.print.keyPoints)),
        )
      : null,
    h("section", { class: "sk-card sk-stack" },
      h("label", { class: "sk-eyebrow", for: noteId }, sv.notes.myNotes),
      textarea,
      status,
    ),
    terms.length
      ? h("section", { class: "sk-card sk-stack" },
          h("h3", { class: "sk-eyebrow" }, sv.notes.terms),
          h("ul", { class: "sk-terms" },
            terms.map((t) =>
              h("li", null,
                h("span", null, h("strong", null, t.term), t.supplement ? [" ", supplementTag()] : null),
                h("span", { class: "sk-small" }, app.mdInline(t.definition)),
                t.lesson ? h("a", { class: "sk-small", href: to.lesson(part.id, t.lesson) }, sv.notes.readLesson) : null,
              ),
            ),
          ),
        )
      : null,
  );

  let opened = false;
  return {
    el,
    open() {
      opened = true;
      el.dataset.open = "true";
      closeBtn.focus();
    },
    close() {
      opened = false;
      delete el.dataset.open;
    },
    isOpen: () => opened,
  };
}
