import {
  AlignmentType,
  BorderStyle,
  Document,
  LevelFormat,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { ENGAGEMENTS, FREQUENCIES, GUIDE, OCM_GUIDANCE, ORG, PLAN as BASE, REVIEW_DISCLAIMER, fill } from "./content";
import { getProgram } from "./programs";
import { buildGuide } from "./guide";
import type { Pledge } from "./types";
import { displayName, money } from "./types";

const BODY_FONT = "Calibri";
const HEAD_FONT = "Georgia";
const INK = "2B2622";
const ACCENT = "9A3B1F";

const p = (text: string, opts: { bold?: boolean; italic?: boolean; after?: number } = {}) =>
  new Paragraph({
    spacing: { after: opts.after ?? 160, line: 288 },
    children: [new TextRun({ text, bold: opts.bold, italics: opts.italic, font: BODY_FONT, size: 22, color: INK })],
  });

const question = (text: string) =>
  new Paragraph({
    spacing: { before: 320, after: 160 },
    children: [new TextRun({ text, bold: true, font: HEAD_FONT, size: 24, color: ACCENT })],
  });

const sub = (text: string) =>
  new Paragraph({
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, font: BODY_FONT, size: 22, color: INK })],
  });

const bullet = (text: string) =>
  new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 60, line: 276 },
    children: [new TextRun({ text, font: BODY_FONT, size: 22, color: INK })],
  });

const numbered = (title: string, body: string) =>
  new Paragraph({
    numbering: { reference: "goals", level: 0 },
    spacing: { after: 120, line: 288 },
    children: [
      new TextRun({ text: title + " ", bold: true, font: BODY_FONT, size: 22, color: INK }),
      new TextRun({ text: body, font: BODY_FONT, size: 22, color: INK }),
    ],
  });

const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const kv = (rows: [string, string][]) =>
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: noBorder, bottom: noBorder, left: noBorder, right: noBorder,
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: "E4DCD2" },
      insideVertical: noBorder,
    },
    rows: rows.map(
      ([k, v]) =>
        new TableRow({
          children: [
            new TableCell({
              width: { size: 32, type: WidthType.PERCENTAGE },
              margins: { top: 60, bottom: 60 },
              children: [new Paragraph({ children: [new TextRun({ text: k, bold: true, font: BODY_FONT, size: 20, color: "6B5F55" })] })],
            }),
            new TableCell({
              width: { size: 68, type: WidthType.PERCENTAGE },
              margins: { top: 60, bottom: 60 },
              children: [new Paragraph({ children: [new TextRun({ text: v, font: BODY_FONT, size: 22, color: INK })] })],
            }),
          ],
        })
    ),
  });

function fmtDate(d: string | null) {
  if (!d) return "Upon plan approval";
  const dt = new Date(d + "T12:00:00");
  return dt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export async function buildPlanDocx(pl: Pledge): Promise<Buffer> {
  const company = displayName(pl);
  const f = (s: string) => fill(s, company);
  const freq = FREQUENCIES[pl.frequency];
  const perYear = pl.total_commitment / pl.term_years;
  const engagements = ENGAGEMENTS.filter((e) => pl.engagements?.includes(e.id));
  const prog = getProgram(pl.program);
  const PLAN = { ...prog.plan, needQ: BASE.needQ, whoQ: BASE.whoQ, measureQ: BASE.measureQ, reporting: BASE.reporting };

  const children: (Paragraph | Table)[] = [
    new Paragraph({
      spacing: { after: 80 },
      children: [new TextRun({ text: "Community Impact Plan", font: HEAD_FONT, size: 44, color: INK })],
    }),
    new Paragraph({
      spacing: { after: 280 },
      children: [new TextRun({ text: `${company}  ·  in partnership with ${ORG.name}`, font: BODY_FONT, size: 22, color: "6B5F55" })],
    }),
    kv([
      ["Licensee", pl.legal_name + (pl.dba ? ` (d/b/a ${pl.dba})` : "")],
      ["License", `${pl.license_type} · ${pl.license_number}`],
      ["Location", [pl.street, pl.city].filter(Boolean).join(", ") + `, ${pl.county} County, NY`],
      ["Community partner", `${ORG.name} (${ORG.short}) — ${prog.label}`],
      ["Contact", `${pl.contact_name}${pl.contact_title ? ", " + pl.contact_title : ""} · ${pl.contact_email}${pl.contact_phone ? " · " + pl.contact_phone : ""}`],
    ]),

    question(PLAN.needQ),
    ...PLAN.need.map((t) => p(f(t))),

    question(PLAN.whoQ),
    ...PLAN.who.map((t) => p(f(t))),

    question("Goals"),
    ...PLAN.goals.map((g) => numbered(g.title, `${g.body} ${g.measure}`)),

    question("Partnership Commitment"),
    p(
      `${company} commits ${money(pl.amount_per_payment)} ${freq.label.toLowerCase()} (${money(perYear)} per year) to ${ORG.name} to ${prog.purpose}, for a term of ${pl.term_years} year${pl.term_years > 1 ? "s" : ""}, beginning ${fmtDate(pl.start_date)}. Total commitment over the term: ${money(pl.total_commitment)}.`
    ),
    p(
      prog.uses
    ),
    ...(engagements.length
      ? [sub("Additional engagement"), ...engagements.map((e) => bullet(f(e.plan)))]
      : []),
    ...(pl.partner_statement?.trim()
      ? [sub(`Why this partnership matters to ${company}`), ...pl.partner_statement.trim().split(/\n\s*\n/).map((t) => p(t.trim()))]
      : []),

    question(PLAN.measureQ),
    sub("Qualitative"),
    ...PLAN.qualitative.map((t) => p(f(t))),
    sub("Quantitative"),
    p(f(PLAN.quantIntro)),
  ];

  for (const s of PLAN.quantSections) {
    children.push(sub(s.heading));
    s.paras.forEach((t) => children.push(p(f(t))));
    s.bullets.forEach((b) => children.push(bullet(b)));
    if ("after" in s && s.after) children.push(p(f(s.after as string)));
  }

  children.push(
    question("Reporting and Accountability"),
    p(f(PLAN.reporting)),
    new Paragraph({ spacing: { before: 480 }, children: [] }),
    kv([
      ["Submitted by", `${pl.signer_name}${pl.signer_title ? ", " + pl.signer_title : ""}`],
      ["For", pl.legal_name],
      ["Date", new Date(pl.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })],
    ])
  );

  // ── Part 2: Renewal Application Guide ──
  children.push(
    new Paragraph({
      pageBreakBefore: true,
      spacing: { after: 80 },
      children: [new TextRun({ text: GUIDE.title, font: HEAD_FONT, size: 40, color: INK })],
    }),
    new Paragraph({
      spacing: { after: 240 },
      children: [new TextRun({ text: `Community Impact Plan section  \u00b7  ${company}`, font: BODY_FONT, size: 22, color: "6B5F55" })],
    }),
    p(GUIDE.intro, { italic: true }),
    p(`${OCM_GUIDANCE.label}: ${OCM_GUIDANCE.url}`, { italic: true }),
    p("Please review before submitting. " + REVIEW_DISCLAIMER, { bold: true })
  );
  buildGuide(pl).forEach((item, i) => {
    children.push(
      new Paragraph({
        spacing: { before: 320, after: 120 },
        keepNext: true,
        children: [
          new TextRun({ text: `${i + 1}.  `, bold: true, font: HEAD_FONT, size: 22, color: ACCENT }),
          new TextRun({ text: item.q, bold: true, font: BODY_FONT, size: 22, color: INK }),
        ],
      })
    );
    if (item.answer) item.answer.split(/\n/).filter((l) => l.trim()).forEach((line) => children.push(p(line, { after: 100 })));
    if (item.sub) item.sub.forEach((s) => children.push(new Paragraph({ spacing: { after: 100, line: 288 }, children: [
      new TextRun({ text: s.label + ":  ", bold: true, font: BODY_FONT, size: 22, color: INK }),
      new TextRun({ text: s.answer, font: BODY_FONT, size: 22, color: INK }),
    ] })));
    if (item.note) children.push(p("Note: " + item.note, { italic: true }));
  });

  const doc = new Document({
    creator: "GHP Community Impact Partners",
    title: `Community Impact Plan — ${company}`,
    numbering: {
      config: [
        {
          reference: "bullets",
          levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }],
        },
        {
          reference: "goals",
          levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1)", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 360 } } } }],
        },
      ],
    },
    sections: [
      {
        properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1260, bottom: 1260, left: 1440, right: 1440 } } },
        children,
      },
    ],
  });

  return Packer.toBuffer(doc);
}
