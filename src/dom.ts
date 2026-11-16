/**
 * Tiny DOM helpers. Text is always inserted as text nodes, never as HTML,
 * so content can't inject markup. There is no innerHTML anywhere in the app.
 */

export type Child = Node | string | number | null | undefined | false | Child[];
type AttrValue = string | number | boolean | null | undefined;
type Handler = (event: any) => void;
export type Attrs = { [key: string]: AttrValue | Handler };

function append(parent: Node, child: Child): void {
  if (child === null || child === undefined || child === false) return;
  if (Array.isArray(child)) {
    for (const c of child) append(parent, c);
    return;
  }
  if (typeof child === "string" || typeof child === "number") {
    parent.appendChild(document.createTextNode(String(child)));
    return;
  }
  parent.appendChild(child);
}

function applyAttrs(el: Element, attrs: Attrs | null | undefined): void {
  if (!attrs) return;
  for (const [key, value] of Object.entries(attrs)) {
    if (typeof value === "function") {
      if (key.startsWith("on")) el.addEventListener(key.slice(2).toLowerCase(), value as EventListener);
      continue;
    }
    if (value === null || value === undefined || value === false) continue;
    if (value === true) el.setAttribute(key, "");
    else el.setAttribute(key, String(value));
  }
}

export function h<K extends keyof HTMLElementTagNameMap>(tag: K, attrs?: Attrs | null, ...children: Child[]): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  applyAttrs(el, attrs);
  for (const c of children) append(el, c);
  return el;
}

const SVG_NS = "http://www.w3.org/2000/svg";

export function s<K extends keyof SVGElementTagNameMap>(tag: K, attrs?: Attrs | null, ...children: Child[]): SVGElementTagNameMap[K] {
  const el = document.createElementNS(SVG_NS, tag);
  applyAttrs(el, attrs);
  for (const c of children) append(el, c);
  return el;
}

export function frag(...children: Child[]): DocumentFragment {
  const f = document.createDocumentFragment();
  for (const c of children) append(f, c);
  return f;
}

export function clear(el: Element): void {
  while (el.firstChild) el.removeChild(el.firstChild);
}

export function replace(el: Element, ...children: Child[]): void {
  clear(el);
  for (const c of children) append(el, c);
}

let uid = 0;
export function nextId(prefix = "sk"): string {
  uid += 1;
  return `${prefix}-${uid}`;
}
