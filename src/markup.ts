/**
 * Text marks (BUILD.md §6.3) -> DOM.
 *
 * Security: the source text is parsed into a small AST of plain strings. The DOM is then
 * built with createElement/createTextNode from a fixed whitelist of tags, so any HTML in
 * the source stays visible text. Only http(s) links are allowed, with rel="noopener".
 * Nothing is ever written to innerHTML.
 *
 * Marks: **bold**, *italic*, H~2~O, x^2^, ->, [text](https://…), blank line, - item, 1. item,
 * ## Heading, > Viktigt, !> Vanligt misstag, +> Kompletterande (Plugga extension),
 * = formula, | table, ~~~ code ~~~, ![bildtext](https://…), [[lesson-id|text]].
 */

export type Inline =
  | { t: "text"; v: string }
  | { t: "strong"; c: Inline[] }
  | { t: "em"; c: Inline[] }
  | { t: "sub"; v: string }
  | { t: "sup"; v: string }
  | { t: "link"; href: string; c: Inline[] }
  | { t: "lessonlink"; id: string; c: Inline[] };

export type Block =
  | { t: "p"; c: Inline[] }
  | { t: "h"; c: Inline[] }
  | { t: "ul"; items: Inline[][] }
  | { t: "ol"; items: Inline[][] }
  | { t: "key"; blocks: Block[] }
  | { t: "mistake"; blocks: Block[] }
  | { t: "supplement"; blocks: Block[] }
  | { t: "formula"; c: Inline[] }
  | { t: "table"; head: Inline[][]; rows: Inline[][][] }
  | { t: "code"; v: string }
  | { t: "img"; src: string; alt: string };

const SAFE_URL = /^https?:\/\/[^\s<>"']+$/i;

export function isSafeUrl(url: string): boolean {
  return SAFE_URL.test(url);
}

// ---------- Inline ----------

export function parseInline(src: string): Inline[] {
  const out: Inline[] = [];
  let buf = "";
  const flush = () => {
    if (buf) out.push({ t: "text", v: buf });
    buf = "";
  };
  let i = 0;
  while (i < src.length) {
    const rest = src.slice(i);
    let m: RegExpMatchArray | null;

    if ((m = rest.match(/^\[\[([a-z0-9][a-z0-9-]*)\|([^\]]+)\]\]/i))) {
      flush();
      out.push({ t: "lessonlink", id: m[1], c: parseInline(m[2]) });
      i += m[0].length;
      continue;
    }
    if ((m = rest.match(/^\[([^\]]+)\]\(([^)\s]+)\)/))) {
      flush();
      if (isSafeUrl(m[2])) out.push({ t: "link", href: m[2], c: parseInline(m[1]) });
      else out.push(...parseInline(m[1]));
      i += m[0].length;
      continue;
    }
    if ((m = rest.match(/^\*\*(?=\S)([\s\S]*?\S)\*\*/))) {
      flush();
      out.push({ t: "strong", c: parseInline(m[1]) });
      i += m[0].length;
      continue;
    }
    if ((m = rest.match(/^\*(?=[^\s*])([^*]*?[^\s*])\*/)) || (m = rest.match(/^\*([^\s*])\*/))) {
      flush();
      out.push({ t: "em", c: parseInline(m[1]) });
      i += m[0].length;
      continue;
    }
    if ((m = rest.match(/^~([^~\s]{1,16})~/))) {
      flush();
      out.push({ t: "sub", v: m[1] });
      i += m[0].length;
      continue;
    }
    if ((m = rest.match(/^\^([^^\s]{1,16})\^/))) {
      flush();
      out.push({ t: "sup", v: m[1] });
      i += m[0].length;
      continue;
    }
    if (rest.startsWith("->")) {
      buf += "→";
      i += 2;
      continue;
    }
    buf += src[i];
    i += 1;
  }
  flush();
  return out;
}

// ---------- Blocks ----------

function splitRow(line: string): string[] {
  let l = line.trim();
  if (l.startsWith("|")) l = l.slice(1);
  if (l.endsWith("|")) l = l.slice(0, -1);
  return l.split("|").map((c) => c.trim());
}

export function parseBlocks(src: string): Block[] {
  const lines = src.replace(/\r\n?/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  const isSpecial = (l: string) =>
    /^\s*$/.test(l) || /^~~~/.test(l) || /^##\s/.test(l) || /^(!>|\+>|>)(\s|$)/.test(l) || /^=\s/.test(l) ||
    /^\s*\|/.test(l) || /^\s*-\s/.test(l) || /^\s*\d+\.\s/.test(l) || /^!\[[^\]]*\]\([^)]*\)\s*$/.test(l);

  while (i < lines.length) {
    const line = lines[i];

    if (/^\s*$/.test(line)) { i++; continue; }

    if (/^~~~/.test(line)) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !/^~~~/.test(lines[i])) code.push(lines[i++]);
      i++; // closing fence
      blocks.push({ t: "code", v: code.join("\n") });
      continue;
    }

    if (/^##\s/.test(line)) {
      blocks.push({ t: "h", c: parseInline(line.replace(/^##\s+/, "").trim()) });
      i++;
      continue;
    }

    const boxMatch = line.match(/^(!>|\+>|>)(\s|$)/);
    if (boxMatch) {
      const marker = boxMatch[1];
      const inner: string[] = [];
      while (i < lines.length) {
        const m = lines[i].match(/^(!>|\+>|>)(?:\s(.*)|$)/);
        if (!m || m[1] !== marker) break;
        inner.push(m[2] ?? "");
        i++;
      }
      const t = marker === "!>" ? "mistake" : marker === "+>" ? "supplement" : "key";
      blocks.push({ t, blocks: parseBlocks(inner.join("\n")) });
      continue;
    }

    if (/^=\s/.test(line)) {
      blocks.push({ t: "formula", c: parseInline(line.replace(/^=\s+/, "").trim()) });
      i++;
      continue;
    }

    if (/^\s*\|/.test(line)) {
      const rows: string[][] = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) {
        const cells = splitRow(lines[i]);
        if (!cells.every((c) => /^:?-{2,}:?$/.test(c))) rows.push(cells);
        i++;
      }
      const [head = [], ...body] = rows;
      blocks.push({ t: "table", head: head.map(parseInline), rows: body.map((r) => r.map(parseInline)) });
      continue;
    }

    if (/^\s*-\s/.test(line)) {
      const items: Inline[][] = [];
      while (i < lines.length && /^\s*-\s/.test(lines[i])) {
        items.push(parseInline(lines[i].replace(/^\s*-\s+/, "").trim()));
        i++;
      }
      blocks.push({ t: "ul", items });
      continue;
    }

    if (/^\s*\d+\.\s/.test(line)) {
      const items: Inline[][] = [];
      while (i < lines.length && /^\s*\d+\.\s/.test(lines[i])) {
        items.push(parseInline(lines[i].replace(/^\s*\d+\.\s+/, "").trim()));
        i++;
      }
      blocks.push({ t: "ol", items });
      continue;
    }

    const img = line.match(/^!\[([^\]]*)\]\(([^)]*)\)\s*$/);
    if (img) {
      if (isSafeUrl(img[2])) blocks.push({ t: "img", src: img[2], alt: img[1] });
      else if (img[1]) blocks.push({ t: "p", c: [{ t: "text", v: img[1] }] });
      i++;
      continue;
    }

    // Paragraph: consecutive ordinary lines.
    const para: string[] = [line.trim()];
    i++;
    while (i < lines.length && !isSpecial(lines[i])) para.push(lines[i++].trim());
    blocks.push({ t: "p", c: parseInline(para.join(" ")) });
  }
  return blocks;
}

/** Lesson ids referenced with [[id|text]] anywhere in the text (for the content check). */
export function lessonLinks(src: string): string[] {
  const ids: string[] = [];
  const re = /\[\[([a-z0-9][a-z0-9-]*)\|[^\]]+\]\]/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) ids.push(m[1]);
  return ids;
}

/** Plain text of a marked string, for titles, aria-labels and search. */
export function plainText(src: string): string {
  const walk = (nodes: Inline[]): string =>
    nodes.map((n) => (n.t === "text" || n.t === "sub" || n.t === "sup" ? n.v : walk(n.c))).join("");
  return walk(parseInline(src));
}

// ---------- DOM ----------

export interface RenderOptions {
  /** Resolve [[id|text]] to a hash link; null renders plain text. */
  lessonHref?: (id: string) => string | null;
  /** Images load from other sites, so they are shown only on the hosted site. */
  allowImages?: boolean;
  headingLevel?: 2 | 3 | 4;
  labels: { key: string; mistake: string; supplement: string; supplementTip: string; image: string };
}

function inlineToDom(nodes: Inline[], parent: Node, opts: RenderOptions): void {
  for (const n of nodes) {
    switch (n.t) {
      case "text":
        parent.appendChild(document.createTextNode(n.v));
        break;
      case "strong": {
        const el = document.createElement("strong");
        inlineToDom(n.c, el, opts);
        parent.appendChild(el);
        break;
      }
      case "em": {
        const el = document.createElement("em");
        inlineToDom(n.c, el, opts);
        parent.appendChild(el);
        break;
      }
      case "sub":
      case "sup": {
        const el = document.createElement(n.t);
        el.textContent = n.v;
        parent.appendChild(el);
        break;
      }
      case "link": {
        if (!isSafeUrl(n.href)) {
          inlineToDom(n.c, parent, opts);
          break;
        }
        const a = document.createElement("a");
        a.setAttribute("href", n.href);
        a.setAttribute("rel", "noopener noreferrer");
        a.setAttribute("target", "_blank");
        inlineToDom(n.c, a, opts);
        parent.appendChild(a);
        break;
      }
      case "lessonlink": {
        const href = opts.lessonHref?.(n.id) ?? null;
        if (!href) {
          inlineToDom(n.c, parent, opts);
          break;
        }
        const a = document.createElement("a");
        a.setAttribute("href", href);
        inlineToDom(n.c, a, opts);
        parent.appendChild(a);
        break;
      }
    }
  }
}

function boxEl(cls: string, label: string, blocks: Block[], opts: RenderOptions, tip?: string): HTMLElement {
  const box = document.createElement("div");
  box.className = `sk-box ${cls}`;
  const eyebrow = document.createElement("p");
  eyebrow.className = "sk-eyebrow" + (tip ? " sk-tip" : "");
  eyebrow.textContent = label;
  if (tip) {
    eyebrow.setAttribute("data-tooltip", tip);
    eyebrow.setAttribute("title", tip);
  }
  box.appendChild(eyebrow);
  for (const b of blocks) box.appendChild(blockToDom(b, opts));
  return box;
}

function blockToDom(b: Block, opts: RenderOptions): Node {
  switch (b.t) {
    case "p": {
      const p = document.createElement("p");
      inlineToDom(b.c, p, opts);
      return p;
    }
    case "h": {
      const el = document.createElement(`h${opts.headingLevel ?? 3}`);
      inlineToDom(b.c, el, opts);
      return el;
    }
    case "ul":
    case "ol": {
      const list = document.createElement(b.t);
      for (const item of b.items) {
        const li = document.createElement("li");
        inlineToDom(item, li, opts);
        list.appendChild(li);
      }
      return list;
    }
    case "key":
      return boxEl("sk-box--key", opts.labels.key, b.blocks, opts);
    case "mistake":
      return boxEl("sk-box--mistake", opts.labels.mistake, b.blocks, opts);
    case "supplement":
      return boxEl("sk-box--supplement", opts.labels.supplement, b.blocks, opts, opts.labels.supplementTip);
    case "formula": {
      const p = document.createElement("p");
      p.className = "sk-formula";
      inlineToDom(b.c, p, opts);
      return p;
    }
    case "table": {
      const wrap = document.createElement("div");
      wrap.className = "sk-tablewrap";
      const table = document.createElement("table");
      table.className = "sk-table";
      if (b.head.length) {
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");
        for (const cell of b.head) {
          const th = document.createElement("th");
          th.setAttribute("scope", "col");
          inlineToDom(cell, th, opts);
          tr.appendChild(th);
        }
        thead.appendChild(tr);
        table.appendChild(thead);
      }
      const tbody = document.createElement("tbody");
      for (const row of b.rows) {
        const tr = document.createElement("tr");
        for (const cell of row) {
          const td = document.createElement("td");
          inlineToDom(cell, td, opts);
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      }
      table.appendChild(tbody);
      wrap.appendChild(table);
      return wrap;
    }
    case "code": {
      const pre = document.createElement("pre");
      pre.className = "sk-pre";
      const code = document.createElement("code");
      code.textContent = b.v;
      pre.appendChild(code);
      return pre;
    }
    case "img": {
      if (!opts.allowImages || !isSafeUrl(b.src)) {
        const p = document.createElement("p");
        p.className = "sk-small sk-muted";
        p.textContent = `${opts.labels.image}: ${b.alt}`;
        return p;
      }
      const fig = document.createElement("figure");
      fig.className = "sk-figure";
      const img = document.createElement("img");
      img.setAttribute("src", b.src);
      img.setAttribute("alt", b.alt);
      img.setAttribute("loading", "lazy");
      img.setAttribute("referrerpolicy", "no-referrer");
      fig.appendChild(img);
      if (b.alt) {
        const cap = document.createElement("figcaption");
        cap.textContent = b.alt;
        fig.appendChild(cap);
      }
      return fig;
    }
  }
}

/** Render a block of marked text into a container with class sk-prose. */
export function renderMarkup(src: string, opts: RenderOptions): HTMLElement {
  const root = document.createElement("div");
  root.className = "sk-prose";
  for (const b of parseBlocks(src)) root.appendChild(blockToDom(b, opts));
  return root;
}

/** Render a single line of marked text (no block marks) into a span. */
export function renderInline(src: string, opts: RenderOptions): HTMLSpanElement {
  const span = document.createElement("span");
  inlineToDom(parseInline(src), span, opts);
  return span;
}
