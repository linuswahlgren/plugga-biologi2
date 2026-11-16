"""Extract course material (.pptx, .docx) to Markdown, keeping slide numbers.

Usage:
    python -I scripts/extract_material.py material/prov1 material/_extracted/prov1

Uses only the Python standard library (zipfile + ElementTree), so no packages
need to be installed. For every .pptx it writes one Markdown file with a
"## bild N" section per slide (title, text with indentation, tables, speaker
notes, picture alt text) and exports the slide pictures to media/. For every
.docx it writes paragraphs, numbered lists and tables.

Sub- and superscript runs are written with the platform's text marks
(H~2~O, x^2^) so chemistry survives the extraction.
"""

import os
import posixpath
import re
import sys
import unicodedata
import zipfile
from xml.etree import ElementTree as ET

A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"
P = "{http://schemas.openxmlformats.org/presentationml/2006/main}"
R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
MC = "{http://schemas.openxmlformats.org/markup-compatibility/2006}"


def slugify(name):
    base = unicodedata.normalize("NFKD", os.path.splitext(name)[0])
    base = base.encode("ascii", "ignore").decode("ascii").lower()
    return re.sub(r"[^a-z0-9]+", "-", base).strip("-")


def run_text(run_text_value, rpr):
    """Wrap a run in sub/superscript marks when its baseline is shifted."""
    if not run_text_value:
        return ""
    if not run_text_value.strip():
        return run_text_value
    if rpr is not None:
        baseline = rpr.get("baseline")
        if baseline:
            try:
                b = int(baseline)
            except ValueError:
                b = 0
            if b < 0:
                return "~" + run_text_value + "~"
            if b > 0:
                return "^" + run_text_value + "^"
    return run_text_value


def drawing_paragraphs(el):
    out = []
    for p in el.iter(A + "p"):
        parts = []
        for child in p:
            if child.tag == A + "r":
                t = child.find(A + "t")
                parts.append(run_text(t.text if t is not None else "", child.find(A + "rPr")))
            elif child.tag == A + "br":
                parts.append(" ")
            elif child.tag == A + "fld":
                t = child.find(A + "t")
                parts.append(t.text if t is not None and t.text else "")
        text = "".join(parts).strip()
        if not text:
            continue
        ppr = p.find(A + "pPr")
        level = int(ppr.get("lvl", "0")) if ppr is not None else 0
        out.append("  " * level + "- " + text)
    return out


def read_rels(z, part_path):
    rel_path = posixpath.join(posixpath.dirname(part_path), "_rels", posixpath.basename(part_path) + ".rels")
    if rel_path not in z.namelist():
        return {}
    rels = {}
    for r in ET.fromstring(z.read(rel_path)):
        rels[r.get("Id")] = (r.get("Type", ""), r.get("Target", ""), r.get("TargetMode", ""))
    return rels


def extract_pptx(path, out_dir):
    name = unicodedata.normalize("NFC", os.path.basename(path))
    slug = slugify(name)
    media_dir = os.path.join(out_dir, "media", slug)
    os.makedirs(media_dir, exist_ok=True)
    z = zipfile.ZipFile(path)
    pres = ET.fromstring(z.read("ppt/presentation.xml"))
    pres_rels = read_rels(z, "ppt/presentation.xml")
    order = [pres_rels[s.get(R + "id")][1] for s in pres.find(P + "sldIdLst")]

    lines = ["# " + os.path.splitext(name)[0], "", "Källfil: `" + name + "` · " + str(len(order)) + " bilder", ""]
    for n, target in enumerate(order, 1):
        slide_path = posixpath.normpath(posixpath.join("ppt", target))
        slide = ET.fromstring(z.read(slide_path))
        rels = read_rels(z, slide_path)
        title = []
        body = []
        for el in slide.iter():
            if el.tag == P + "sp":
                ph = el.find(".//" + P + "ph")
                kind = ph.get("type", "body") if ph is not None else "box"
                paras = drawing_paragraphs(el)
                if not paras or kind in ("sldNum", "dt", "ftr"):
                    continue
                if kind in ("title", "ctrTitle"):
                    title.append(" ".join(p.lstrip("- ").strip() for p in paras))
                else:
                    body.extend(paras)
            elif el.tag == A + "tbl":
                rows = []
                for tr in el.iter(A + "tr"):
                    cells = [" / ".join(p.lstrip("- ").strip() for p in drawing_paragraphs(tc)) for tc in tr.iter(A + "tc")]
                    rows.append("| " + " | ".join(c.replace("|", "\\|") for c in cells) + " |")
                if rows:
                    width = rows[0].count("|") - 1
                    rows.insert(1, "|" + " --- |" * width)
                    body.extend([""] + rows + [""])

        lines.append("## bild " + str(n) + (": " + " ".join(title) if title else ""))
        lines.append("")
        lines.extend(body if body else ["(ingen text på bilden)"])

        # Pictures: export and list with alt text.
        k = 0
        for pic in slide.iter(P + "pic"):
            blip = pic.find(".//" + A + "blip")
            if blip is None:
                continue
            rid = blip.get(R + "embed")
            if rid not in rels:
                continue
            img_target = posixpath.normpath(posixpath.join(posixpath.dirname(slide_path), rels[rid][1]))
            if img_target not in z.namelist():
                continue
            k += 1
            ext = posixpath.splitext(img_target)[1].lower() or ".bin"
            fname = "bild-%02d-%d%s" % (n, k, ext)
            with open(os.path.join(media_dir, fname), "wb") as fh:
                fh.write(z.read(img_target))
            c = pic.find(P + "nvPicPr/" + P + "cNvPr")
            alt = (c.get("descr") or "").replace("\n", " ").strip() if c is not None else ""
            lines.append("")
            lines.append("Bild " + str(k) + ": `media/" + slug + "/" + fname + "`" + (" – alt-text: " + alt if alt else ""))

        # Hyperlinks on the slide (kept as data, never followed).
        links = sorted({t for (typ, t, mode) in rels.values() if typ.endswith("/hyperlink") and mode == "External"})
        for link in links:
            lines.append("")
            lines.append("Länk: " + link)

        # Speaker notes.
        for typ, t, _ in rels.values():
            if typ.endswith("/notesSlide"):
                notes_path = posixpath.normpath(posixpath.join(posixpath.dirname(slide_path), t))
                notes = ET.fromstring(z.read(notes_path))
                note_lines = []
                for sp in notes.iter(P + "sp"):
                    ph = sp.find(".//" + P + "ph")
                    if ph is not None and ph.get("type") == "body":
                        note_lines.extend(drawing_paragraphs(sp))
                if note_lines:
                    lines.append("")
                    lines.append("Talaranteckningar:")
                    lines.extend(note_lines)
        lines.append("")

    out_path = os.path.join(out_dir, slug + ".md")
    with open(out_path, "w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(lines).rstrip() + "\n")
    return out_path, len(order)


def docx_paragraph(p):
    parts = []
    for el in p.iter():
        if el.tag == W + "t":
            parts.append(el.text or "")
        elif el.tag == W + "tab":
            parts.append("\t")
        elif el.tag == W + "br":
            parts.append(" ")
    return "".join(parts).strip()


def extract_docx(path, out_dir):
    name = unicodedata.normalize("NFC", os.path.basename(path))
    z = zipfile.ZipFile(path)
    root = ET.fromstring(z.read("word/document.xml"))
    # Text boxes are stored twice (mc:Choice and mc:Fallback); drop the fallback copy.
    for parent in root.iter():
        for child in list(parent):
            if child.tag == MC + "Fallback":
                parent.remove(child)
    body = root.find(W + "body")
    lines = ["# " + os.path.splitext(name)[0], "", "Källfil: `" + name + "`", ""]
    counters = {}
    for el in body:
        if el.tag == W + "p":
            text = docx_paragraph(el)
            if not text:
                continue
            style = el.find(W + "pPr/" + W + "pStyle")
            style = style.get(W + "val") if style is not None else ""
            num = el.find(W + "pPr/" + W + "numPr")
            if num is not None:
                num_id = num.find(W + "numId")
                key = num_id.get(W + "val") if num_id is not None else "0"
                counters[key] = counters.get(key, 0) + 1
                lines.append(str(counters[key]) + ". " + text)
            elif style.lower().startswith("rubrik") or style.lower().startswith("heading"):
                lines.extend(["", "## " + text, ""])
            else:
                lines.extend([text, ""])
        elif el.tag == W + "tbl":
            rows = []
            for tr in el.iter(W + "tr"):
                cells = []
                for tc in tr.findall(W + "tc"):
                    paras = [docx_paragraph(p) for p in tc.iter(W + "p")]
                    cells.append(" / ".join(x for x in paras if x).replace("|", "\\|"))
                rows.append("| " + " | ".join(cells) + " |")
            if rows:
                width = rows[0].count("|") - 1
                rows.insert(1, "|" + " --- |" * width)
                lines.extend([""] + rows + [""])
    out_path = os.path.join(out_dir, slugify(name) + ".md")
    with open(out_path, "w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(lines).rstrip() + "\n")
    return out_path


def main():
    if len(sys.argv) != 3:
        print("Användning: python -I scripts/extract_material.py <källmapp> <utmapp>")
        return 2
    src, out_dir = sys.argv[1], sys.argv[2]
    os.makedirs(out_dir, exist_ok=True)
    files = sorted(os.listdir(src))
    if not files:
        print("Mappen är tom: " + src)
        return 1
    for f in files:
        full = os.path.join(src, f)
        if f.lower().endswith(".pptx"):
            out, n = extract_pptx(full, out_dir)
            print("%s -> %s (%d bilder)" % (f, out, n))
        elif f.lower().endswith(".docx"):
            print("%s -> %s" % (f, extract_docx(full, out_dir)))
    return 0


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(main())
