/**
 * Typed hash router. Every view and session setting is reachable by URL, e.g.
 *   #/                 overview
 *   #/d3               part, "Lär dig"         #/d3?lektion=d3-l2  opens that lesson
 *   #/d3/kort          part, cards             #/d3/quiz?antal=10&niva=E,C&lage=prov&tid=20
 *   #/d3/ova           part, practice
 *   #/omgang/quiz?urval=prov:prov1             a session across parts
 *   #/prov1            exam hub                #/prov1/begrepp  hub section
 *   #/framsteg         my progress
 * Slugs are Swedish because students see the URL.
 */

export type PartTab = "lar" | "kort" | "quiz" | "ova";
export type SessionMode = "kort" | "quiz" | "ova";
export type HubSection = "lasanvisningar" | "fragor" | "begrepp" | "simulering" | "om";

export type Query = Record<string, string>;

export type Route =
  | { view: "overview"; query: Query }
  | { view: "part"; part: string; tab: PartTab; query: Query }
  | { view: "session"; mode: SessionMode; query: Query }
  | { view: "hub"; exam: string; section: HubSection | null; query: Query }
  | { view: "progress"; query: Query }
  | { view: "notfound"; path: string; query: Query };

export const PART_TABS: PartTab[] = ["lar", "kort", "quiz", "ova"];
export const HUB_SECTIONS: HubSection[] = ["lasanvisningar", "fragor", "begrepp", "simulering", "om"];

export interface Known {
  parts: Set<string>;
  exams: Set<string>;
}

function parseQuery(q: string): Query {
  const out: Query = {};
  if (!q) return out;
  for (const pair of q.split("&")) {
    if (!pair) continue;
    const [k, v = ""] = pair.split("=");
    try {
      out[decodeURIComponent(k)] = decodeURIComponent(v.replace(/\+/g, " "));
    } catch {
      out[k] = v;
    }
  }
  return out;
}

export function buildQuery(q: Query | undefined): string {
  if (!q) return "";
  const entries = Object.entries(q).filter(([, v]) => v !== undefined && v !== "");
  if (!entries.length) return "";
  return "?" + entries.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v).replace(/%2C/gi, ",").replace(/%3A/gi, ":")}`).join("&");
}

export function parseHash(hash: string, known: Known): Route {
  const raw = hash.replace(/^#/, "");
  const [pathPart, queryPart = ""] = raw.split("?");
  const query = parseQuery(queryPart);
  const segs = pathPart.split("/").filter(Boolean);

  if (segs.length === 0) return { view: "overview", query };
  const [a, b] = segs;

  if (a === "framsteg" && segs.length === 1) return { view: "progress", query };
  if (a === "omgang" && (b === "kort" || b === "quiz" || b === "ova") && segs.length === 2) return { view: "session", mode: b, query };
  if (known.parts.has(a)) {
    if (segs.length === 1) return { view: "part", part: a, tab: "lar", query };
    if (segs.length === 2 && (PART_TABS as string[]).includes(b)) return { view: "part", part: a, tab: b as PartTab, query };
  }
  if (known.exams.has(a)) {
    if (segs.length === 1) return { view: "hub", exam: a, section: null, query };
    if (segs.length === 2 && (HUB_SECTIONS as string[]).includes(b)) return { view: "hub", exam: a, section: b as HubSection, query };
  }
  return { view: "notfound", path: pathPart, query };
}

export function href(route: Route): string {
  const q = buildQuery(route.query);
  switch (route.view) {
    case "overview":
      return `#/${q}`;
    case "part":
      return `#/${route.part}${route.tab === "lar" ? "" : `/${route.tab}`}${q}`;
    case "session":
      return `#/omgang/${route.mode}${q}`;
    case "hub":
      return `#/${route.exam}${route.section ? `/${route.section}` : ""}${q}`;
    case "progress":
      return `#/framsteg${q}`;
    case "notfound":
      return `#/${route.path}${q}`;
  }
}

/** Shorthands for building links. */
export const to = {
  overview: () => href({ view: "overview", query: {} }),
  part: (part: string, tab: PartTab = "lar", query: Query = {}) => href({ view: "part", part, tab, query }),
  lesson: (part: string, lesson: string, returnToSession = false) =>
    href({ view: "part", part, tab: "lar", query: returnToSession ? { lektion: lesson, tillbaka: "1" } : { lektion: lesson } }),
  session: (mode: SessionMode, query: Query = {}) => href({ view: "session", mode, query }),
  hub: (exam: string, section: HubSection | null = null, query: Query = {}) => href({ view: "hub", exam, section, query }),
  progress: () => href({ view: "progress", query: {} }),
};

/** Go to a hash route. Re-renders even when the hash is already the current one. */
export function navigate(hash: string): void {
  if (location.hash === hash || (hash === "#/" && !location.hash)) window.dispatchEvent(new HashChangeEvent("hashchange"));
  else location.hash = hash;
}

/** Update the URL to match the view's state without re-rendering (settings in the session builder). */
export function replaceHash(hash: string): void {
  history.replaceState(history.state, "", hash);
}

export function onRoute(known: () => Known, listener: (r: Route) => void): () => void {
  const handler = () => listener(parseHash(location.hash, known()));
  window.addEventListener("hashchange", handler);
  return () => window.removeEventListener("hashchange", handler);
}
