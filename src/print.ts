/**
 * Print views (BUILD.md §4.10.11): the glossary, the study questions with their model answers,
 * and a part's key points. The button sets data-print on <html>; print.css shows only that view.
 */
export type PrintView = "begrepp" | "fragor" | "viktigast";

export function printView(view: PrintView): void {
  const root = document.documentElement;
  root.dataset.print = view;
  const done = () => {
    delete root.dataset.print;
    window.removeEventListener("afterprint", done);
  };
  window.addEventListener("afterprint", done);
  window.print();
}
