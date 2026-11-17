/**
 * "animalcell": an animal cell, drawn for Plugga in the line style (no copied images).
 * Marker numbers (content names them in a `label` practice item):
 *   1 cell membrane · 2 cytoplasm · 3 nucleus · 4 rough ER · 5 smooth ER · 6 Golgi apparatus
 *   7 mitochondrion · 8 lysosome · 9 peroxisome · 10 free ribosomes
 */
import { circle, ellipse, group, path, rect, type DiagramDef } from "./draw.ts";

const NX = 215; // nucleus centre
const NY = 150;

const at = (r: number, deg: number): [number, number] => [NX + r * Math.cos((deg * Math.PI) / 180), NY + r * Math.sin((deg * Math.PI) / 180)];
const f = (n: number) => n.toFixed(1);

/** Rough ER: three sheets curving round the nucleus, each with ribosome dots on its outer side. */
function roughER(): SVGElement[] {
  const els: SVGElement[] = [];
  for (const r of [54, 63, 72]) {
    const [x0, y0] = at(r, 120);
    const [x1, y1] = at(r, 240);
    els.push(path(`M${f(x0)} ${f(y0)} A${r} ${r} 0 0 1 ${f(x1)} ${f(y1)}`, "ln", true));
    for (let deg = 126; deg <= 234; deg += 12) {
      const [x, y] = at(r + 3.5, deg);
      els.push(circle(Number(f(x)), Number(f(y)), 1.6, "c", true));
    }
  }
  return els;
}

/** Golgi apparatus: four curved sacs side by side, with vesicles budding off. */
function golgi(): SVGElement[] {
  const els: SVGElement[] = [];
  for (const x of [284, 294, 304, 314]) els.push(path(`M${x} 120 Q${x + 26} 160 ${x} 200 L${x + 5} 200 Q${x + 31} 160 ${x + 5} 120 Z`, "b", true));
  for (const [x, y] of [[300, 110], [334, 128], [336, 192], [304, 210]]) els.push(circle(x, y, 4, "b", true));
  return els;
}

function mitochondrion(cx: number, cy: number, rotate: number): SVGElement {
  return group(rotate, cx, cy, [ellipse(cx, cy, 24, 11, "b"), path(`M${cx - 17} ${cy}l4 -5l4 10l4 -10l4 10l4 -10l4 10l4 -10l4 5`, "ln", true)]);
}

export const animalcell: DiagramDef = {
  id: "animalcell",
  width: 480,
  height: 320,
  draw: () => [
    ellipse(240, 160, 170, 122, "a"), // cytoplasm inside the cell membrane
    ...roughER(),
    path("M222 74 c8 -14 18 -14 24 0 s16 14 24 0 s16 -14 24 0", "ln", true), // smooth ER tubules
    path("M222 86 c8 -14 18 -14 24 0 s16 14 24 0 s16 -14 24 0", "ln", true),
    circle(NX, NY, 44, "b"), // nucleus
    circle(NX + 9, NY - 8, 13, "c", true), // nucleolus
    ...golgi(),
    mitochondrion(130, 214, -20),
    mitochondrion(330, 240, 10),
    circle(112, 135, 12, "b"), // lysosome
    circle(108, 132, 2, "c", true),
    circle(116, 138, 2, "c", true),
    circle(365, 112, 11, "b"), // peroxisome
    rect(360, 107, 10, 10, 2, "c", true),
    ...[[256, 236], [268, 252], [190, 254], [212, 264], [360, 196], [385, 175], [95, 180]].map(([x, y]) => circle(x, y, 2.2, "c", true)), // free ribosomes
  ],
  markers: {
    1: { x: 405, y: 190, bx: 456, by: 186 },
    2: { x: 380, y: 222, bx: 456, by: 232 },
    3: { x: 206, y: 176, bx: 206, by: 306 },
    4: { x: 153, y: 186, bx: 24, by: 186 },
    5: { x: 270, y: 80, bx: 270, by: 16 },
    6: { x: 318, y: 160, bx: 456, by: 140 },
    7: { x: 130, y: 214, bx: 24, by: 240 },
    8: { x: 112, y: 135, bx: 24, by: 124 },
    9: { x: 365, y: 112, bx: 456, by: 94 },
    10: { x: 268, y: 252, bx: 300, by: 306 },
  },
};
