/**
 * Study Kit line icons: 24 px grid, 1.75 stroke, round caps and joins, currentColor.
 * Drawn for the platform. Icons support a word; a square icon button always has a Swedish aria-label.
 */
import { s } from "./dom.ts";

const ICONS = {
  check: ["M5 12.5l4.5 4.5L19 7.5"],
  x: ["M6.5 6.5l11 11", "M17.5 6.5l-11 11"],
  chevron: ["M9.5 6l6 6-6 6"],
  left: ["M19 12H5.5", "M11 6l-6 6 6 6"],
  right: ["M5 12h13.5", "M13 6l6 6-6 6"],
  menu: ["M4 7h16", "M4 12h16", "M4 17h16"],
  notes: ["M6 3h9l3 3v15H6z", "M9 9.5h6", "M9 13h6", "M9 16.5h4"],
  sun: ["M12 8a4 4 0 1 0 0 8 4 4 0 1 0 0-8z", "M12 2.5v2", "M12 19.5v2", "M2.5 12h2", "M19.5 12h2", "M5.3 5.3l1.4 1.4", "M17.3 17.3l1.4 1.4", "M5.3 18.7l1.4-1.4", "M17.3 6.7l1.4-1.4"],
  moon: ["M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"],
  shuffle: ["M4 7h3.5c2 0 3 1 4.5 3.5S14.5 17 16.5 17H20", "M4 17h3.5c1.3 0 2.2-.5 3-1.5", "M13.5 8.5c.8-1 1.7-1.5 3-1.5H20", "M17 4l3 3-3 3", "M17 14l3 3-3 3"],
  lock: ["M6 11h12v9.5H6z", "M8.5 11V8a3.5 3.5 0 0 1 7 0v3"],
  bulb: ["M9.5 18h5", "M10.5 21h3", "M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.1v.1h5v-.1c0-.8.4-1.5 1.1-2.1A6 6 0 0 0 12 3z"],
  flip: ["M4.5 11a7.5 7.5 0 0 1 13.2-4.3L20 9", "M20 4.5V9h-4.5", "M19.5 13a7.5 7.5 0 0 1-13.2 4.3L4 15", "M4 19.5V15h4.5"],
  copy: ["M9 9h11v11H9z", "M15 9V4H4v11h5"],
  home: ["M4 11l8-7 8 7", "M6 9.5V20h4.5v-5h3v5H18V9.5"],
  reset: ["M4.5 12a7.5 7.5 0 1 0 2.2-5.3L4 9.5", "M4 4.5v5h5"],
  eye: ["M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z", "M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6z"],
  share: ["M12 3.5V15", "M8 7.5l4-4 4 4", "M5 12v8h14v-8"],
  qr: ["M4 4h6v6H4z", "M14 4h6v6h-6z", "M4 14h6v6H4z", "M14 14h2.5v2.5H14z", "M17.5 17.5H20V20h-2.5z", "M14 20h1", "M20 14v1"],
  clock: ["M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 1 0 0-17z", "M12 7.5V12l3 2"],
  download: ["M12 4v11", "M7.5 10.5L12 15l4.5-4.5", "M5 20h14"],
  upload: ["M12 15V4", "M7.5 8.5L12 4l4.5 4.5", "M5 20h14"],
  search: ["M11 4.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 1 0 0-13z", "M16 16l4.5 4.5"],
  print: ["M7 9V3.5h10V9", "M7 17H4.5V9h15v8H17", "M7 14h10v6.5H7z"],
  flag: ["M5.5 21V4", "M5.5 4.5h11l-2 4 2 4h-11"],
  chart: ["M4 20h16", "M7 16.5v-5", "M12 16.5V7", "M17 16.5v-8"],
} as const;

export type IconName = keyof typeof ICONS;

export function icon(name: IconName, size: 16 | 18 | 20 | 24 = 20): SVGSVGElement {
  const svg = s("svg", {
    class: `sk-icon${size === 16 ? " sk-icon--16" : size === 18 ? " sk-icon--18" : ""}`,
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 1.75,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "aria-hidden": "true",
    focusable: "false",
  });
  for (const d of ICONS[name]) svg.appendChild(s("path", { d }));
  return svg;
}

/** The favicon and app icon: the letter P in an accent square. Used inline in the HTML head. */
export const FAVICON_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#1d6b4f"/><path d="M24 46V18h10.5a8.5 8.5 0 0 1 0 17H24" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
