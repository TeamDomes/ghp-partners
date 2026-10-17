import Link from "next/link";
import { DEPOSIT, GUIDE, OCM_GUIDANCE, ORG } from "@/lib/content";
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
          Plan and renewal application guide unlock as soon as GHP receives your deposit.
        </p>

        <div className="form-card" style={{ marginTop: 28 }}>
          <div className="mono" style={{ fontSize: ".8rem", color: "var(--ink-2)" }}>DEPOSIT DUE (50% OF YOUR PLEDGE)</div>
          <div style={{ fontFamily: "var(--font-display), serif", fontSize: "2.4rem", color: "var(--accent)", lineHeight: 1.1, margin: "6px 0 16px" }}>{money(dep)}</div>
          <a className="btn" href={ORG.donateUrl} target="_blank" rel="noreferrer">Pay deposit online</a>
          <p style={{ marginTop: 16, fontSize: ".93rem", color: "var(--ink-2)" }}>
            Paying by check? Make it payable to {ORG.checkPayable}{ORG.mailingAddress ? `, ${ORG.mailingAddress}` : ""}, with &ldquo;{displayName(pledge)} – Community Impact Plan&rdquo; in the memo.
            GHP confirms deposits {DEPOSIT.turnaround}. Come back to this page — bookmark it — and your plan will be here.
          </p>
        </div>

        <section style={{ marginTop: 40 }}>
          <span className="eyebrow">What unlocks</span>
          <h2>Your plan + renewal portal guide</h2>
          <p style={{ color: "var(--ink-2)" }}>
            A Community Impact Plan in Word, written around your business, plus a suggested response to each of these
            Community Impact questions on the OCM renewal portal:
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
        Below are two things for your renewal: your Community Impact Plan as a Word document, and a guide to the
        Community Impact Plan questions on the OCM renewal portal. Thank you for your deposit and your partnership with{" "}
        {ORG.name}.
      </p>

      {pledge ? (
        <>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "24px 0 8px" }}>
            <a className="btn" href={`/api/plan/${pledge.id}`}>Download plan + guide (.docx)</a>
            <a className="btn ghost" href={GUIDE.deckPath} download>GHP overview (PDF)</a>
            <a className="btn ghost" href={OCM_GUIDANCE.url} target="_blank" rel="noreferrer">OCM guidance (PDF)</a>
          </div>
          <p style={{ color: "var(--ink-2)", fontSize: ".9rem" }}>Bookmark this page — you can come back to it anytime.</p>

          <section style={{ marginTop: 48 }}>
            <span className="eyebrow">{GUIDE.title}</span>
            <h2>Your renewal portal responses</h2>
            <p style={{ color: "var(--ink-2)" }}>{GUIDE.intro}</p>

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
