/**
 * "flower": a flower in section, drawn for Plugga in the line style.
 * Marker numbers: 1 petal · 2 sepal · 3 anther · 4 filament · 5 stigma · 6 style · 7 ovary · 8 ovule
 */
import { circle, ellipse, path, rect, type DiagramDef } from "./draw.ts";

export const flower: DiagramDef = {
  id: "flower",
  width: 400,
  height: 380,
  draw: () => [
    rect(194, 300, 12, 80, 4, "a"), // stem
    path("M190 292 C168 300 140 314 118 312 C138 300 162 290 188 286 Z", "a"), // sepals
    path("M210 292 C232 300 260 314 282 312 C262 300 238 290 212 286 Z", "a"),
    ellipse(200, 294, 28, 10, "a"), // receptacle
    path("M186 288 C150 270 96 230 86 170 C84 150 98 140 114 150 C150 176 178 236 192 282 Z", "b"), // petals
    path("M214 288 C250 270 304 230 314 170 C316 150 302 140 286 150 C250 176 222 236 208 282 Z", "b"),
    path("M190 286 C176 240 160 190 150 152", "ln"), // filaments
    path("M210 286 C224 240 240 190 250 152", "ln"),
    ellipse(148, 140, 9, 15, "a", -18), // anthers
    ellipse(252, 140, 9, 15, "a", 18),
    rect(196, 124, 8, 112, 3, "b"), // style
    ellipse(200, 260, 24, 28, "b"), // ovary
    circle(191, 252, 5, "c", true), // ovules
    circle(209, 252, 5, "c", true),
    circle(200, 270, 5, "c", true),
    path("M184 126 C184 110 196 108 200 116 C204 108 216 110 216 126 Z", "a"), // stigma
  ],
  markers: {
    1: { x: 112, y: 196, bx: 28, by: 196 },
    2: { x: 142, y: 304, bx: 28, by: 300 },
    3: { x: 146, y: 132, bx: 28, by: 110 },
    4: { x: 227, y: 230, bx: 372, by: 236 },
    5: { x: 210, y: 118, bx: 372, by: 96 },
    6: { x: 204, y: 180, bx: 372, by: 166 },
    7: { x: 224, y: 262, bx: 372, by: 290 },
    8: { x: 197, y: 272, bx: 120, by: 354 },
  },
};
