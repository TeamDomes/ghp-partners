// Shared content for the two partner documents, as simple layout blocks.
import { ENGAGEMENTS, GUIDE, OCM_GUIDANCE, ORG, PLAN as BASE, REVIEW_DISCLAIMER, fill } from "./content";
import { buildGuide } from "./guide";
import { getProgram } from "./programs";
import type { Pledge } from "./types";
import { displayName, money } from "./types";

export type Block =
  | { t: "title"; text: string }
  | { t: "subtitle"; text: string }
  | { t: "kv"; rows: [string, string][] }
  | { t: "h"; text: string; num?: string }
  | { t: "sub"; text: string }
  | { t: "p"; text: string; italic?: boolean; bold?: boolean }
  | { t: "bullet"; text: string }
  | { t: "numbered"; n: number; title: string; text: string }
  | { t: "label"; label: string; text: string }
  | { t: "note"; text: string }
  | { t: "box"; text: string }
  | { t: "space"; h: number };

function fmtDate(d: string | null) {
  if (!d) return "upon plan approval";
  return new Date(d + "T12:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function planBlocks(pl: Pledge): Block[] {
  const company = displayName(pl);
  const f = (s: string) => fill(s, company);
  const prog = getProgram(pl.program);
  const P = prog.plan;
  const perYear = Number(pl.total_commitment) / pl.term_years;
  const engagements = ENGAGEMENTS.filter((e) => pl.engagements?.includes(e.id));
  const B: Block[] = [
    { t: "title", text: "Community Impact Plan" },
    { t: "subtitle", text: `For your records  ·  ${company}, in partnership with ${ORG.name}` },
    {
      t: "kv",
      rows: [
        ["Licensee", pl.legal_name + (pl.dba ? ` (d/b/a ${pl.dba})` : "")],
        ["License", `${pl.license_type} · ${pl.license_number}`],
        ["Location", [pl.street, pl.city].filter(Boolean).join(", ") + (pl.county ? `, ${pl.county} County, NY` : "")],
        ["Community partner", `${ORG.name} (${ORG.short}): ${prog.label}`],
        ["Contact", `${pl.contact_name}${pl.contact_title ? ", " + pl.contact_title : ""} · ${pl.contact_email}${pl.contact_phone ? " · " + pl.contact_phone : ""}`],
      ],
    },
    { t: "h", text: BASE.needQ },
    ...P.need.map((x) => ({ t: "p", text: f(x) }) as Block),
    { t: "h", text: BASE.whoQ },
    ...P.who.map((x) => ({ t: "p", text: f(x) }) as Block),
    { t: "h", text: "Goals" },
    ...P.goals.map((g, i) => ({ t: "numbered", n: i + 1, title: g.title, text: `${g.body} ${g.measure}` }) as Block),
    { t: "h", text: "Partnership Commitment" },
    {
      t: "p",
      text: `${company} commits ${money(perYear)} per year to ${ORG.name} to ${prog.purpose}, for a term of ${pl.term_years} year${pl.term_years > 1 ? "s" : ""}, beginning ${fmtDate(pl.start_date)}. Total commitment over the term: ${money(Number(pl.total_commitment))}.`,
    },
    ...(pl.term_years > 1 ? [{ t: "p", text: "The Year 1 contribution is made upon signing this pledge; the Year 2 contribution is due on the one-year anniversary." } as Block] : []),
    { t: "p", text: prog.uses },
  ];
  if (engagements.length) {
    B.push({ t: "sub", text: "Additional engagement" }, ...engagements.map((e) => ({ t: "bullet", text: f(e.plan) }) as Block));
  }
  if (pl.partner_statement?.trim()) {
    B.push({ t: "sub", text: `Why this partnership matters to ${company}` });
    pl.partner_statement.trim().split(/\n\s*\n/).forEach((x) => B.push({ t: "p", text: x.trim() }));
  }
  B.push({ t: "h", text: BASE.measureQ }, { t: "sub", text: "Qualitative" });
  P.qualitative.forEach((x) => B.push({ t: "p", text: f(x) }));
  B.push({ t: "sub", text: "Quantitative" }, { t: "p", text: f(P.quantIntro) });
  for (const s of P.quantSections) {
    B.push({ t: "sub", text: s.heading });
    s.paras.forEach((x) => B.push({ t: "p", text: f(x) }));
    s.bullets.forEach((x) => B.push({ t: "bullet", text: x }));
    if (s.after) B.push({ t: "p", text: f(s.after) });
  }
  B.push(
    { t: "h", text: "Reporting and Accountability" },
    { t: "p", text: f(BASE.reporting) },
    { t: "space", h: 18 },
    {
      t: "kv",
      rows: [
        ["Submitted by", `${pl.signer_name}${pl.signer_title ? ", " + pl.signer_title : ""}`],
        ["For", pl.legal_name],
        ["Date", new Date(pl.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })],
      ],
    }
  );
  return B;
}

export function guideBlocks(pl: Pledge): Block[] {
  const company = displayName(pl);
  const B: Block[] = [
    { t: "title", text: "OCM Renewal Instructions" },
    { t: "subtitle", text: `Community Impact Plan section  ·  ${company} (${pl.license_number})` },
    { t: "p", text: GUIDE.intro },
    { t: "box", text: "Please review before submitting. " + REVIEW_DISCLAIMER },
    { t: "p", text: `${OCM_GUIDANCE.label}: ${OCM_GUIDANCE.url}`, italic: true },
  ];
  buildGuide(pl).forEach((item, i) => {
    B.push({ t: "h", text: item.q, num: `${i + 1}` });
    if (item.answer) item.answer.split(/\n/).filter((l) => l.trim()).forEach((l) => B.push(l.startsWith("• ") ? { t: "bullet", text: l.slice(2) } : { t: "p", text: l }));
    item.sub?.forEach((s) => B.push({ t: "label", label: s.label, text: s.answer }));
    if (item.note) B.push({ t: "note", text: item.note });
  });
  return B;
}
