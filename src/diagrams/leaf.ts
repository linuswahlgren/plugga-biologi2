/**
 * "leaf": a cross-section of a leaf, drawn for Plugga in the line style.
 * Marker numbers: 1 cuticle · 2 upper epidermis · 3 palisade tissue · 4 spongy tissue · 5 xylem
 *   6 phloem · 7 lower epidermis · 8 stoma (the opening) · 9 guard cell
 */
import { circle, ellipse, rect, type DiagramDef } from "./draw.ts";

const SPONGY: [number, number, number, number][] = [
  [78, 160, 15, 11], [112, 158, 14, 10], [146, 162, 15, 12], [180, 158, 12, 10],
  [92, 196, 16, 13], [130, 196, 13, 12], [168, 200, 14, 13],
  [76, 226, 12, 9], [112, 226, 15, 9], [150, 228, 13, 8], [188, 230, 12, 7],
  [300, 160, 13, 10], [334, 158, 15, 11], [370, 162, 14, 11], [404, 158, 12, 10],
  [312, 198, 15, 13], [350, 196, 14, 12], [392, 198, 16, 13],
  [292, 228, 9, 7], [338, 230, 12, 7], [372, 228, 14, 9], [408, 230, 10, 7],
];

export const leaf: DiagramDef = {
  id: "leaf",
  width: 480,
  height: 320,
  draw: () => {
    const els: SVGElement[] = [];
    els.push(rect(60, 44, 360, 6, 3, "c", true)); // upper cuticle
    for (let x = 60; x < 420; x += 30) els.push(rect(x, 50, 30, 20, 3, "b", true)); // upper epidermis
    for (let x = 63; x < 418; x += 24) {
      els.push(rect(x, 74, 20, 64, 9, "b", true)); // palisade cells with chloroplasts
      for (const y of [88, 106, 124]) els.push(circle(x + 10, y, 3, "c", true));
    }
    for (const [cx, cy, rx, ry] of SPONGY) els.push(ellipse(cx, cy, rx, ry, "b", 0, true)); // spongy tissue
    els.push(circle(240, 186, 40, "a")); // vascular bundle
    els.push(circle(222, 172, 8, "b"), circle(240, 166, 9, "b"), circle(258, 172, 8, "b"), circle(240, 184, 6, "b", true)); // xylem
    for (const [cx, cy, r] of [[226, 202, 5], [240, 206, 5], [254, 202, 5], [233, 215, 4], [247, 215, 4]]) els.push(circle(cx, cy, r, "b", true)); // phloem
    for (let x = 60; x < 420; x += 30) if (x !== 300) els.push(rect(x, 240, 30, 18, 3, "b", true)); // lower epidermis
    els.push(ellipse(307, 249, 7, 10, "b"), ellipse(323, 249, 7, 10, "b")); // guard cells around the stoma
    els.push(rect(60, 258, 240, 4, 2, "c", true), rect(330, 258, 90, 4, 2, "c", true)); // lower cuticle
    return els;
  },
  markers: {
    1: { x: 64, y: 47, bx: 24, by: 40 },
    2: { x: 414, y: 62, bx: 456, by: 62 },
    3: { x: 68, y: 100, bx: 24, by: 104 },
    4: { x: 84, y: 196, bx: 24, by: 196 },
    5: { x: 234, y: 160, bx: 226, by: 14 },
    6: { x: 233, y: 214, bx: 196, by: 304 },
    7: { x: 64, y: 252, bx: 24, by: 252 },
    8: { x: 315, y: 252, bx: 315, by: 304 },
    9: { x: 304, y: 254, bx: 262, by: 304 },
  },
};
