/**
 * "cell": a plant cell, drawn for Plugga in the line style (no copied images).
 * Marker numbers (content names them in a `label` practice item):
 *   1 cell wall · 2 cell membrane · 3 chloroplast · 4 vacuole · 5 nucleus · 6 mitochondrion
 *   7 cytoplasm · 8 plasmodesma
 */
import { circle, ellipse, group, path, rect, type DiagramDef } from "./draw.ts";

function chloroplast(cx: number, cy: number, rx: number, ry: number, rotate: number): SVGElement {
  const parts: SVGElement[] = [ellipse(cx, cy, rx, ry, "b")];
  const len = rx * 0.34;
  for (const ox of [-rx * 0.52, rx * 0.12]) for (const oy of [-ry * 0.4, 0, ry * 0.4]) parts.push(path(`M${cx + ox} ${cy + oy}h${len}`, "ln", true));
  return group(rotate, cx, cy, parts);
}

function mitochondrion(cx: number, cy: number): SVGElement {
  return group(-8, cx, cy, [ellipse(cx, cy, 22, 10, "b"), path(`M${cx - 16} ${cy}l4 -5l4 10l4 -10l4 10l4 -10l4 10l4 -10l4 5`, "ln", true)]);
}

export const cell: DiagramDef = {
  id: "cell",
  width: 480,
  height: 320,
  draw: () => [
    rect(80, 30, 320, 260, 28, "c"), // cell wall
    rect(94, 44, 292, 232, 18, "a"), // cytoplasm inside the cell membrane
    rect(236, 29, 8, 16, 2, "a", true), // plasmodesmata through the wall
    rect(176, 275, 8, 16, 2, "a", true),
    rect(79, 236, 16, 8, 2, "a", true),
    rect(180, 75, 160, 170, 56, "b"), // vacuole
    circle(140, 112, 30, "b"), // nucleus
    circle(147, 105, 9, "c", true), // nucleolus
    mitochondrion(130, 178),
    chloroplast(135, 236, 26, 12, -12),
    chloroplast(262, 262, 24, 10, 0),
    chloroplast(365, 160, 26, 12, 90),
  ],
  markers: {
    1: { x: 87, y: 70, bx: 36, by: 56 },
    2: { x: 386, y: 236, bx: 444, by: 236 },
    3: { x: 377, y: 160, bx: 444, by: 168 },
    4: { x: 318, y: 112, bx: 444, by: 96 },
    5: { x: 118, y: 116, bx: 36, by: 112 },
    6: { x: 110, y: 178, bx: 36, by: 168 },
    7: { x: 104, y: 210, bx: 36, by: 220 },
    8: { x: 240, y: 37, bx: 240, by: 13 },
  },
};
