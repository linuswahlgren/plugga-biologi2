/**
 * "mitochondrion": a mitochondrion in section, drawn for Plugga in the line style.
 * The inner membrane is one closed path whose folds (cristae) reach into the matrix from above and
 * below; the space inside each fold is the intermembrane space.
 * Marker numbers: 1 outer membrane · 2 inner membrane · 3 intermembrane space · 4 matrix
 *   5 crista · 6 mitochondrial DNA
 */
import { path, rect, type DiagramDef } from "./draw.ts";

const TOP = 80; // the matrix's top and bottom edge
const BOTTOM = 220;
const DEPTH = 88; // how far a crista reaches into the matrix
const W = 16; // crista width

function innerMembrane(): string {
  let d = `M140 ${TOP}`;
  for (const x of [168, 228, 288]) d += ` L${x} ${TOP} l0 ${DEPTH} a8 8 0 0 0 ${W} 0 l0 ${-DEPTH}`;
  d += ` L340 ${TOP} A70 70 0 0 1 340 ${BOTTOM}`;
  for (const x of [318, 258, 198]) d += ` L${x} ${BOTTOM} l0 ${-DEPTH} a8 8 0 0 0 ${-W} 0 l0 ${DEPTH}`;
  return `${d} L140 ${BOTTOM} A70 70 0 0 1 140 ${TOP} Z`;
}

export const mitochondrion: DiagramDef = {
  id: "mitochondrion",
  width: 480,
  height: 300,
  draw: () => [
    rect(52, 62, 376, 176, 88, "b"), // outer membrane; the surface between is the intermembrane space
    path(innerMembrane(), "a"), // inner membrane around the matrix
    path("M346 150 q6 -12 12 0 t12 0 t12 0 t12 0", "ln", true), // strands of mitochondrial DNA
    path("M352 168 q6 -10 12 0 t12 0 t12 0", "ln", true),
  ],
  markers: {
    1: { x: 150, y: 62, bx: 110, by: 22 },
    2: { x: 206, y: 80, bx: 206, by: 22 },
    3: { x: 262, y: 71, bx: 302, by: 22 },
    4: { x: 104, y: 150, bx: 24, by: 150 },
    5: { x: 250, y: 136, bx: 250, by: 282 },
    6: { x: 376, y: 150, bx: 456, by: 150 },
  },
};
