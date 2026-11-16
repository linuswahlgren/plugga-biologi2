/**
 * Drawing helpers for the label diagrams. Shapes carry classes, and the CSS maps them to the design
 * system's line style (ink-muted strokes, sunken/surface/line fills), so the diagrams follow the theme.
 *   ln = stroke only · a = sunken fill · b = surface fill · c = line fill · thin = finer stroke
 */
import { s } from "../dom.ts";

export type Fill = "ln" | "a" | "b" | "c";

const cls = (k: Fill, thin: boolean) => `sk-dg-${k}${thin ? " sk-dg-thin" : ""}`;

export const path = (d: string, k: Fill = "ln", thin = false) => s("path", { d, class: cls(k, thin) });

export const rect = (x: number, y: number, w: number, hh: number, r: number, k: Fill, thin = false) =>
  s("rect", { x, y, width: w, height: hh, rx: r, class: cls(k, thin) });

export const circle = (cx: number, cy: number, r: number, k: Fill, thin = false) => s("circle", { cx, cy, r, class: cls(k, thin) });

export const ellipse = (cx: number, cy: number, rx: number, ry: number, k: Fill, rotate = 0, thin = false) =>
  s("ellipse", { cx, cy, rx, ry, class: cls(k, thin), transform: rotate ? `rotate(${rotate} ${cx} ${cy})` : null });

export const group = (rotate: number, cx: number, cy: number, children: SVGElement[]) =>
  s("g", { transform: rotate ? `rotate(${rotate} ${cx} ${cy})` : null }, children);

/** A numbered marker: the point on the structure (x, y) and the centre of its number badge (bx, by). */
export interface MarkerPos {
  x: number;
  y: number;
  bx: number;
  by: number;
}

export interface DiagramDef {
  id: string;
  width: number;
  height: number;
  draw(): SVGElement[];
  markers: Record<number, MarkerPos>;
}
