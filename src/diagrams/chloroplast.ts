/**
 * "chloroplast": a chloroplast in section, drawn for Plugga in the line style.
 * Marker numbers: 1 outer membrane · 2 inner membrane · 3 granum (a stack of thylakoids)
 *   4 thylakoid · 5 lumen (inside a thylakoid) · 6 stroma
 */
import { ellipse, path, rect, type DiagramDef } from "./draw.ts";

const STACKS = [
  { x: 130, y: 126, n: 4 },
  { x: 205, y: 106, n: 6 },
  { x: 280, y: 116, n: 5 },
  { x: 350, y: 130, n: 4 },
];

export const chloroplast: DiagramDef = {
  id: "chloroplast",
  width: 480,
  height: 300,
  draw: () => {
    const els: SVGElement[] = [ellipse(240, 150, 190, 105, "b"), ellipse(240, 150, 178, 93, "a")];
    // stroma lamellae between neighbouring grana
    for (const d of [
      "M152 140 C166 140 169 134 183 134",
      "M152 168 C166 168 169 176 183 176",
      "M227 120 C241 120 244 128 258 128",
      "M227 162 C241 162 244 156 258 156",
      "M302 140 C316 140 314 146 328 146",
      "M302 168 C316 168 314 174 328 174",
    ]) els.push(path(d, "ln", true));
    for (const st of STACKS) for (let i = 0; i < st.n; i++) els.push(rect(st.x - 22, st.y + i * 14, 44, 11, 5.5, "b", true));
    return els;
  },
  markers: {
    1: { x: 65, y: 110, bx: 24, by: 110 },
    2: { x: 80, y: 190, bx: 24, by: 190 },
    3: { x: 205, y: 190, bx: 205, by: 284 },
    4: { x: 372, y: 149, bx: 456, by: 112 },
    5: { x: 350, y: 177, bx: 456, by: 200 },
    6: { x: 150, y: 214, bx: 120, by: 284 },
  },
};
