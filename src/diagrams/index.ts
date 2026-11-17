/**
 * Diagram registry for `label` practice items. Each diagram is an original inline SVG in the
 * design system's line style (no copied images), with numbered marker positions. Content picks
 * which numbers to show and names them. Prov 2 added mitochondrion (Del 7) and
 * animalcell (Del 8) the same way: one file per diagram, registered here.
 */
import { s } from "../dom.ts";
import type { DiagramDef } from "./draw.ts";
import { cell } from "./cell.ts";
import { leaf } from "./leaf.ts";
import { chloroplast } from "./chloroplast.ts";
import { flower } from "./flower.ts";
import { mitochondrion } from "./mitochondrion.ts";
import { animalcell } from "./animalcell.ts";

const DIAGRAMS: DiagramDef[] = [cell, leaf, chloroplast, flower, mitochondrion, animalcell];
const byId = new Map(DIAGRAMS.map((d) => [d.id, d]));

export const DIAGRAM_IDS: string[] = DIAGRAMS.map((d) => d.id);

/** Marker numbers each diagram defines (used by the content check). */
export const DIAGRAM_MARKERS: Record<string, number[]> = Object.fromEntries(DIAGRAMS.map((d) => [d.id, Object.keys(d.markers).map(Number)]));

const BADGE = 12;

/** The diagram with only the given marker numbers drawn. Null for an unknown id. */
export function renderDiagram(id: string, numbers: number[], label: string): SVGSVGElement | null {
  const def = byId.get(id);
  if (!def) return null;
  const svg = s("svg", { class: "sk-dg", viewBox: `0 0 ${def.width} ${def.height}`, role: "img", "aria-label": label, focusable: "false", "data-diagram": id });
  for (const el of def.draw()) svg.appendChild(el);
  for (const n of numbers) {
    const m = def.markers[n];
    if (!m) continue;
    const dx = m.x - m.bx;
    const dy = m.y - m.by;
    const len = Math.hypot(dx, dy) || 1;
    svg.appendChild(
      s("g", { class: "sk-dg-marker", "data-marker": n },
        s("line", { x1: m.bx + (dx / len) * BADGE, y1: m.by + (dy / len) * BADGE, x2: m.x, y2: m.y, class: "sk-dg-lead" }),
        s("circle", { cx: m.x, cy: m.y, r: 2.5, class: "sk-dg-dot" }),
        s("circle", { cx: m.bx, cy: m.by, r: BADGE, class: "sk-dg-badge" }),
        s("text", { x: m.bx, y: m.by, class: "sk-dg-num" }, String(n)),
      ),
    );
  }
  return svg;
}
