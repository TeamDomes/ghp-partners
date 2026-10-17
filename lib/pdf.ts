// Renders layout blocks to a clean, letter-size PDF using pdf-lib's built-in fonts (no files needed on the server).
import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";
import type { Block } from "./blocks";
import { ORG } from "./content";

const INK = rgb(0.17, 0.15, 0.13);
const MUTED = rgb(0.42, 0.37, 0.33);
const ACCENT = rgb(0.6, 0.23, 0.12);
const LINE = rgb(0.87, 0.82, 0.76);
const TINT = rgb(0.98, 0.94, 0.91);

const W = 612, H = 792, M = 64, CW = W - M * 2;

// Standard PDF fonts only cover WinAnsi; swap anything else for a safe equivalent.
function safe(s: string) {
  return s
    .replace(/[‐-‒]/g, "-")
    .replace(/→/g, "->")
    .replace(/✓/g, "")
    .replace(/×/g, "x")
    .replace(/[^\x00-\xFF–—‘’“”•…€]/g, "");
}

export async function renderPdf(blocks: Block[], title: string, footer: string): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(safe(title));
  doc.setAuthor(ORG.name);
  const F = {
    body: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
    ital: await doc.embedFont(StandardFonts.HelveticaOblique),
    serif: await doc.embedFont(StandardFonts.TimesRoman),
    serifB: await doc.embedFont(StandardFonts.TimesRomanBold),
  };

  let page: PDFPage = doc.addPage([W, H]);
  let y = H - M;

  const newPage = () => { page = doc.addPage([W, H]); y = H - M; };
  const need = (h: number) => { if (y - h < M + 20) newPage(); };

  function wrap(text: string, font: PDFFont, size: number, width: number): string[] {
    const lines: string[] = [];
    for (const para of safe(text).split("\n")) {
      let line = "";
      for (const word of para.split(/\s+/).filter(Boolean)) {
        const test = line ? line + " " + word : word;
        if (font.widthOfTextAtSize(test, size) <= width) line = test;
        else {
          if (line) lines.push(line);
          // break very long tokens (e.g. URLs)
          let w = word;
          while (font.widthOfTextAtSize(w, size) > width) {
            let k = w.length;
            while (k > 1 && font.widthOfTextAtSize(w.slice(0, k), size) > width) k--;
            lines.push(w.slice(0, k));
            w = w.slice(k);
          }
          line = w;
        }
      }
      lines.push(line);
    }
    return lines;
  }

  function text(t: string, o: { font?: PDFFont; size?: number; color?: ReturnType<typeof rgb>; x?: number; width?: number; lh?: number; after?: number } = {}) {
    const font = o.font || F.body, size = o.size || 10.5, x = o.x ?? M, width = o.width ?? CW, lh = o.lh || size * 1.45;
    for (const ln of wrap(t, font, size, width)) {
      need(lh);
      page.drawText(ln, { x, y: y - size, size, font, color: o.color || INK });
      y -= lh;
    }
    y -= o.after ?? 6;
  }

  for (const b of blocks) {
    switch (b.t) {
      case "title":
        text(b.text, { font: F.serif, size: 26, lh: 30, after: 2 });
        break;
      case "subtitle":
        text(b.text, { size: 10.5, color: MUTED, after: 14 });
        page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 0.8, color: LINE });
        y -= 14;
        break;
      case "kv":
        for (const [k, v] of b.rows) {
          const lines = wrap(v, F.body, 10.5, CW - 130);
          need(lines.length * 15 + 6);
          page.drawText(safe(k), { x: M, y: y - 10, size: 9.5, font: F.bold, color: MUTED });
          lines.forEach((ln, i) => page.drawText(ln, { x: M + 130, y: y - 10 - i * 15, size: 10.5, font: F.body, color: INK }));
          y -= lines.length * 15 + 6;
          page.drawLine({ start: { x: M, y: y + 2 }, end: { x: W - M, y: y + 2 }, thickness: 0.5, color: LINE });
          y -= 4;
        }
        y -= 6;
        break;
      case "h": {
        y -= 10;
        need(50);
        if (b.num) {
          page.drawText(b.num + ".", { x: M, y: y - 12, size: 12, font: F.serifB, color: ACCENT });
          text(b.text, { font: F.serifB, size: 12, color: INK, x: M + 22, width: CW - 22, lh: 16, after: 6 });
        } else text(b.text, { font: F.serifB, size: 13, color: ACCENT, lh: 17, after: 6 });
        break;
      }
      case "sub":
        y -= 4; need(40);
        text(b.text, { font: F.bold, size: 10.5, after: 4 });
        break;
      case "p":
        text(b.text, { font: b.bold ? F.bold : b.italic ? F.ital : F.body });
        break;
      case "bullet": {
        need(15);
        page.drawText("•", { x: M + 8, y: y - 10.5, size: 10.5, font: F.body, color: ACCENT });
        text(b.text, { x: M + 22, width: CW - 22, after: 3 });
        break;
      }
      case "numbered": {
        need(15);
        page.drawText(`${b.n})`, { x: M + 2, y: y - 10.5, size: 10.5, font: F.bold, color: ACCENT });
        const lines = wrap(`${b.title} ${b.text}`, F.body, 10.5, CW - 24);
        const tw = F.bold.widthOfTextAtSize(safe(b.title), 10.5);
        lines.forEach((ln, i) => {
          need(15.2);
          if (i === 0 && ln.startsWith(safe(b.title))) {
            page.drawText(safe(b.title), { x: M + 24, y: y - 10.5, size: 10.5, font: F.bold, color: INK });
            page.drawText(ln.slice(safe(b.title).length), { x: M + 24 + tw, y: y - 10.5, size: 10.5, font: F.body, color: INK });
          } else page.drawText(ln, { x: M + 24, y: y - 10.5, size: 10.5, font: F.body, color: INK });
          y -= 15.2;
        });
        y -= 6;
        break;
      }
      case "label": {
        const lines = wrap(b.text, F.body, 10.5, CW - 14);
        need(16 + lines.length * 15);
        text(b.label, { font: F.bold, size: 9.5, color: MUTED, after: 1 });
        text(b.text, { x: M + 14, width: CW - 14, after: 6 });
        break;
      }
      case "note":
        text("Note: " + b.text, { font: F.ital, size: 9.5, color: MUTED, after: 8 });
        break;
      case "box": {
        const lines = wrap(b.text, F.bold, 9.5, CW - 24);
        const h = lines.length * 13.5 + 16;
        need(h + 8);
        page.drawRectangle({ x: M, y: y - h, width: CW, height: h, color: TINT });
        page.drawRectangle({ x: M, y: y - h, width: 3, height: h, color: ACCENT });
        lines.forEach((ln, i) => page.drawText(ln, { x: M + 14, y: y - 18 - i * 13.5, size: 9.5, font: F.bold, color: INK }));
        y -= h + 12;
        break;
      }
      case "stats": {
        const cols = b.items.length === 4 ? 2 : Math.min(3, b.items.length) || 1, gap = 10, cw = (CW - gap * (cols - 1)) / cols;
        for (let r = 0; r < b.items.length; r += cols) {
          const row = b.items.slice(r, r + cols);
          const wrapped = row.map((it) => wrap(it.label, F.body, 8.5, cw - 20));
          const h = 40 + Math.max(...wrapped.map((w) => w.length)) * 11 + 10;
          need(h + 8);
          row.forEach((it, i) => {
            const x = M + i * (cw + gap);
            page.drawRectangle({ x, y: y - h, width: cw, height: h, color: TINT });
            page.drawText(safe(it.value), { x: x + 10, y: y - 30, size: 20, font: F.serif, color: ACCENT });
            wrapped[i].forEach((ln, j) => page.drawText(ln, { x: x + 10, y: y - 46 - j * 11, size: 8.5, font: F.body, color: INK }));
          });
          y -= h + gap;
        }
        y -= 6;
        break;
      }
      case "quote": {
        const lines = wrap(`\u201C${b.text}\u201D`, F.serif, 12, CW - 24);
        need(lines.length * 16 + 26);
        const top = y;
        text(`\u201C${b.text}\u201D`, { font: F.serif, size: 12, lh: 16, x: M + 16, width: CW - 24, after: 2 });
        text(`\u2014 ${b.who}`, { size: 9, color: MUTED, x: M + 16, width: CW - 24, after: 4 });
        page.drawRectangle({ x: M, y, width: 2.5, height: top - y, color: ACCENT });
        y -= 8;
        break;
      }
      case "space":
        y -= b.h;
        break;
    }
  }

  const pages = doc.getPages();
  pages.forEach((pg, i) => {
    pg.drawText(safe(footer), { x: M, y: 36, size: 8, font: F.body, color: MUTED });
    const n = `${i + 1} / ${pages.length}`;
    pg.drawText(n, { x: W - M - F.body.widthOfTextAtSize(n, 8), y: 36, size: 8, font: F.body, color: MUTED });
  });
  return doc.save();
}
