import { ENGAGEMENTS, FREQUENCIES, GUIDE, ORG, fill } from "./content";
import { getProgram } from "./programs";
import type { Pledge } from "./types";
import { displayName, money } from "./types";

export type GuideItem = {
  q: string;
  answer: string; // text to paste or select
  note?: string; // guidance shown, not pasted
  sub?: { label: string; answer: string }[]; // multi-field answers (goals, budget)
};

const monthYear = (d: Date) => d.toLocaleDateString("en-US", { month: "long", year: "numeric" });

export function buildGuide(p: Pledge): GuideItem[] {
  const company = displayName(p);
  const f = (s: string) => fill(s, company);
  const freq = FREQUENCIES[p.frequency];
  const annual = Number(p.total_commitment) / p.term_years;
  const budgetYears = Math.min(p.term_years, 2);
  const budget = annual * budgetYears;
  const engagements = ENGAGEMENTS.filter((e) => p.engagements?.includes(e.id));
  const prog = getProgram(p.program);
  const PLAN = prog.plan;

  let window = "Beginning upon renewal approval and continuing throughout the renewal period.";
  if (p.start_date) {
    const start = new Date(p.start_date + "T12:00:00");
    const end = new Date(start);
    end.setMonth(end.getMonth() + p.term_years * 12 - 1);
    window = `${monthYear(start)} – ${monthYear(end)}`;
  }

  const partnership = [
    `${ORG.name}. ${p.legal_name} will provide financial support of ${money(annual)} per year (${money(Number(p.total_commitment))} over ${p.term_years} year${p.term_years > 1 ? "s" : ""}) to ${prog.purpose}.`,
    ...engagements.map((e) => f(e.plan)),
    ORG.website,
  ].join(" ");

  const quant = [
    PLAN.quantIntro,
    ...PLAN.quantSections.map((s) =>
      [s.heading, ...s.paras, ...s.bullets.map((b) => "• " + b), "after" in s && s.after ? (s.after as string) : ""]
        .filter(Boolean)
        .join("\n")
    ),
  ]
    .map(f)
    .join("\n\n");

  return [
    {
      q: "Please provide high level summary of your plan. What problem or need does your community impact plan seek to address? Please include any relevant data.",
      answer: PLAN.need.map(f).join("\n\n"),
    },
    { q: "Who are the communities and individuals disproportionately impacted you intend to target?", answer: PLAN.who.map(f).join("\n\n") },
    { q: "In what region is the target population based?", answer: GUIDE.region },
    { q: "What zip codes do you intend to target?", answer: prog.guide.zips },
    { q: "Estimated number of individuals within target population you intend to impact.", answer: prog.guide.reach, note: prog.guide.reachNote },
    {
      q: "What research have you done to understand the needs of your target population? Select all that apply.",
      answer: GUIDE.research,
      note: prog.guide.researchNote ?? GUIDE.researchNote,
    },
    {
      q: "Are you partnering or collaborating with any community-based organizations, local institutions, and/or subject matter experts?",
      answer: "Yes",
    },
    { q: "Please provide the name of the organization(s) and/or institution(s) and describe the nature of your partnership(s).", answer: partnership },
    {
      q: "Do you have any written agreements with your partners related to your community impact plan?",
      answer: "No",
      note: "Change to Yes if you have a signed partnership letter or agreement with GHP.",
    },
    {
      q: "What types of activities do you plan to implement in order to address the needs of the target population?",
      answer: prog.guide.activities.join("\n"),
      note: prog.guide.activitiesNote,
    },
    {
      q: "What is the anticipated benefit you will provide to the target population? Please provide at least 3 goals. Goals must be measurable.",
      answer: "",
      sub: PLAN.goals.map((g, i) => ({ label: `Goal ${i + 1}`, answer: `${g.title} ${g.body} ${g.measure}` })),
    },
    {
      q: "How often do you plan to host activities and engage with the target population?",
      answer: "annually",
      note: "This matches your annual contribution. Choose a more frequent option if you’ve committed to volunteer hours or in-store activities.",
    },
    { q: "When do you intend on implementing community impact plan activities during this renewal period?", answer: window },
    {
      q: "What is your estimated 2-year budget for the community impact plan?",
      answer: "",
      note:
        "Your contribution to GHP belongs under Donations and sponsorships." +
        (p.term_years > 2 ? ` This shows two years of your ${p.term_years}-year commitment.` : p.term_years < 2 ? " This reflects your one-year commitment." : ""),
      sub: [
        ["Personnel", 0],
        ["Contractual Services", 0],
        ["Donations and sponsorships", budget],
        ["Travel", 0],
        ["Equipment", 0],
        ["Space/Property & Utilities", 0],
        ["Operating Expenses", 0],
        ["Other Costs", 0],
      ].map(([label, v]) => ({ label: label as string, answer: "$" + Math.round(v as number).toLocaleString("en-US") })),
    },
    {
      q: "How will you measure your program’s success? Qualitative (i.e. participant satisfaction via survey)",
      answer: PLAN.qualitative.map(f).join("\n\n"),
    },
    { q: "Quantitative (i.e. participant attendance records)", answer: quant },
    {
      q: "How often do you plan to collect these metrics?",
      answer: GUIDE.metricsFrequency,
      note: "GHP tracks participant progress weekly and will share an impact summary with you.",
    },
    {
      q: "Please upload any additional relevant information.",
      answer: "GHP Overview (PDF)",
      note: "Download the GHP overview and upload it here.",
    },
  ];
}
