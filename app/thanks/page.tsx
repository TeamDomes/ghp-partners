import Link from "next/link";
import { DEPOSIT, GUIDE, OCM_GUIDANCE, ORG, REVIEW_DISCLAIMER, TAX } from "@/lib/content";
import { buildGuide } from "@/lib/guide";
import { db } from "@/lib/supabase";
import type { Pledge } from "@/lib/types";
import { depositAmount, displayName, isUnlocked, money } from "@/lib/types";
import CopyButton from "@/components/CopyButton";

export const dynamic = "force-dynamic";

async function getPledge(id?: string) {
  if (!id || !/^[0-9a-f-]{36}$/i.test(id)) return null;
  const { data } = await db().from("pledges").select("*").eq("id", id).single();
  return (data as Pledge) || null;
}

export default async function Thanks({ searchParams }: { searchParams: { id?: string } }) {
  const pledge = await getPledge(searchParams.id);
  const guide = pledge ? buildGuide(pledge) : [];

  if (pledge && !isUnlocked(pledge)) {
    const dep = depositAmount(pledge);
    return (
      <main className="wrap narrow" style={{ paddingTop: 56, paddingBottom: 72 }}>
        <span className="eyebrow">Pledge received</span>
        <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>Thank you, {displayName(pledge)}.</h1>
        <p style={{ fontSize: "1.1rem", color: "var(--ink-2)" }}>
          Your signed pledge of {money(Number(pledge.total_commitment))} to {ORG.name} is on file. Your Community Impact
          Plan and renewal application guide unlock as soon as GHP receives your Year 1 contribution.
        </p>

        <div className="form-card" style={{ marginTop: 28 }}>
          <div className="mono" style={{ fontSize: ".8rem", color: "var(--ink-2)" }}>YEAR 1 CONTRIBUTION DUE</div>
          <div style={{ fontFamily: "var(--font-display), serif", fontSize: "2.4rem", color: "var(--accent)", lineHeight: 1.1, margin: "6px 0 16px" }}>{money(dep)}</div>
          <a className="btn" href={ORG.donateUrl} target="_blank" rel="noreferrer">Pay online</a>
          <p style={{ marginTop: 16, fontSize: ".93rem", color: "var(--ink-2)" }}>
            Paying by check? Make it payable to {ORG.checkPayable}{ORG.mailingAddress ? `, ${ORG.mailingAddress}` : ""}, with &ldquo;{displayName(pledge)} – Community Impact Plan&rdquo; in the memo.
            GHP confirms payments {DEPOSIT.turnaround}.{pledge.term_years > 1 ? ` Your Year 2 contribution of ${money(dep)} is due on the one-year anniversary.` : ""} Come back to this page — bookmark it — and your plan will be here.
          </p>
          <p style={{ fontSize: ".85rem", color: "var(--ink-2)" }}>{TAX.line}{TAX.ein ? ` EIN ${TAX.ein}.` : ""} {TAX.advisor}</p>
        </div>

        <section style={{ marginTop: 40 }}>
          <span className="eyebrow">What unlocks</span>
          <h2>Your plan + renewal instructions</h2>
          <p style={{ color: "var(--ink-2)" }}>
            Two PDFs: your Community Impact Plan for your records, and OCM Renewal Instructions with a suggested response
            to each of these Community Impact questions on the renewal application:
          </p>
          <ol style={{ paddingLeft: 20, color: "var(--ink)" }}>
            {guide.map((g, i) => <li key={i} style={{ marginBottom: 8 }}>{g.q}</li>)}
          </ol>
        </section>

        <p style={{ marginTop: 40 }}>Questions? <a href={`mailto:${ORG.contactEmail}`}>{ORG.contactEmail}</a></p>
      </main>
    );
  }

  return (
    <main className="wrap narrow" style={{ paddingTop: 56, paddingBottom: 72 }}>
      <span className="eyebrow">Thank you</span>
      <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>Your plan is ready.</h1>
      <p style={{ fontSize: "1.1rem", color: "var(--ink-2)" }}>
        Below are two documents for your renewal: your Community Impact Plan for your records, and step-by-step
        instructions for the Community Impact section of the OCM renewal application. Thank you for your contribution and your partnership with{" "}
        {ORG.name}.
      </p>

      {pledge ? (
        <>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "24px 0 8px" }}>
            <a className="btn" href={`/api/plan/${pledge.id}?doc=plan`}>Community Impact Plan (PDF)</a>
            <a className="btn" href={`/api/plan/${pledge.id}?doc=renewal`}>OCM Renewal Instructions (PDF)</a>
            <a className="btn ghost" href={`/api/plan/${pledge.id}?doc=overview`}>GHP program overview (PDF)</a>
            {pledge.program === "beyond_ged" && (
              <a className="btn ghost" href={GUIDE.deckPath} download>Beyond GED deck (PDF)</a>
            )}
            <a className="btn ghost" href={OCM_GUIDANCE.url} target="_blank" rel="noreferrer">OCM guidance (PDF)</a>
          </div>
          <p style={{ color: "var(--ink-2)", fontSize: ".9rem" }}>
            Your Community Impact Plan is for your records. The Renewal Instructions walk you through each Community Impact
            question on the OCM renewal application. Need to edit the plan? <a href={`/api/plan/${pledge.id}?doc=word`}>Download a Word version</a>.
            Bookmark this page — you can come back to it anytime.
          </p>
          <p style={{ color: "var(--ink-2)", fontSize: ".85rem" }}>{TAX.line}{TAX.ein ? ` EIN ${TAX.ein}.` : ""} {TAX.advisor}</p>

          <section style={{ marginTop: 48 }}>
            <span className="eyebrow">{GUIDE.title}</span>
            <h2>Your renewal portal responses</h2>
            <p style={{ color: "var(--ink-2)" }}>{GUIDE.intro}</p>
            <div className="review-note"><strong>Please review before submitting.</strong> {REVIEW_DISCLAIMER}</div>

            {guide.map((item, i) => (
              <div className="guide-item" key={i}>
                <span className="guide-num">Question {i + 1}</span>
                <div className="guide-q">{item.q}</div>
                {item.answer && (
                  <div className="answer">
                    {item.answer}
                    <CopyButton text={item.answer} />
                  </div>
                )}
                {item.sub && (
                  <div className={item.sub.length > 4 ? "budget-grid" : undefined}>
                    {item.sub.map((s) => (
                      <div className="answer" key={s.label}>
                        <span className="label">{s.label}</span>
                        {s.answer}
                        <CopyButton text={s.answer} />
                      </div>
                    ))}
                  </div>
                )}
                {item.note && <p className="guide-note">{item.note}</p>}
              </div>
            ))}
          </section>
        </>
      ) : (
        <p style={{ marginTop: 24 }}>We couldn&apos;t find that plan. Check your link, or contact {ORG.name}.</p>
      )}

      <p style={{ marginTop: 40 }}><Link href="/">← Back to start</Link></p>
    </main>
  );
}
