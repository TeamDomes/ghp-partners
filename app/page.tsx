import Link from "next/link";
import { LANDING, OCM_GUIDANCE, ORG, PARTNERS_PAGE, RECOMMENDED, STATS, TIERS } from "@/lib/content";
import { getPartners } from "@/lib/partners";
import { money } from "@/lib/types";

export const revalidate = 300;

export default async function Home() {
  const partners = await getPartners();
  return (
    <main>
      <div className="wrap">
        <nav className="nav">
          <span className="brand">GHP · Community Impact Partners</span>
          <a href="#partners" className="brand" style={{ marginLeft: "auto", marginRight: 16 }}>Partners</a>
          <Link className="btn small" href="/pledge">Build my plan</Link>
        </nav>

        <header className="hero">
          <span className="eyebrow">{LANDING.eyebrow}</span>
          <h1>{LANDING.headline}</h1>
          <p className="lede">{LANDING.sub}</p>
          <div className="actions">
            <Link className="btn" href="/pledge">Partner with GHP</Link>
            <a className="btn ghost" href="#program">Read about the program</a>
          </div>
        </header>

        <section className="section">
          <div className="stats">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="cols">
            <h2>{LANDING.aboutTitle}</h2>
            <div>{LANDING.about.map((t) => <p key={t}>{t}</p>)}</div>
          </div>
        </section>

        <section className="section" id="program">
          <div className="cols">
            <div>
              <span className="eyebrow">The program you&apos;d fund</span>
              <h2>{LANDING.programTitle}</h2>
            </div>
            <div>{LANDING.program.map((t) => <p key={t}>{t}</p>)}</div>
          </div>
        </section>

        <section className="section">
          <div className="quotes">
            {LANDING.quotes.map((q) => (
              <figure key={q.text} style={{ margin: 0 }}>
                <p className="quote">&ldquo;{q.text}&rdquo;</p>
                <figcaption className="quote-who">— {q.who}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="cols">
            <div>
              <span className="eyebrow">Why this fits your plan</span>
              <h2>Built for the requirement</h2>
            </div>
            <div>
              <p>
                OCM&apos;s Community Impact Plan asks what need you&apos;re addressing, who you&apos;re serving among
                communities disproportionately impacted by cannabis prohibition, your goals, and how you&apos;ll measure
                success. Beyond GED answers each of those with a real program and real numbers.
              </p>
              <p>
                You get a complete plan, in Word, written around your business: the need, the population, three goals,
                qualitative and quantitative measures, your financial commitment, and how GHP will report back.
              </p>
              <p>
                You also get a renewal application guide: suggested responses to each Community Impact question on the
                OCM renewal portal, from target zip codes to your two-year budget, ready to review and paste in.
              </p>
              <p>
                <a href={OCM_GUIDANCE.url} target="_blank" rel="noreferrer">Read {OCM_GUIDANCE.label}</a>
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <span className="eyebrow">{LANDING.howTitle}</span>
          <div className="steps">
            {LANDING.how.map((s, i) => (
              <div className="step" key={s.step}>
                <span className="mono">0{i + 1}</span>
                <h3>{s.step}</h3>
                <p style={{ color: "var(--ink-2)", fontSize: ".95rem" }}>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <span className="eyebrow">Suggested annual levels</span>
          <div className="tiers">
            {TIERS.map((t) => (
              <div className={`tier ${t.recommended ? "rec" : ""}`} key={t.amount}>
                <span className="mono" style={{ fontSize: ".8rem", color: t.recommended ? "var(--accent)" : "var(--ink-2)" }}>{t.recommended ? "Recommended" : t.name}</span>
                <b>{money(t.amount)}</b>
                <span style={{ fontSize: ".88rem", color: "var(--ink-2)" }}>per year</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 14, color: "var(--ink-2)", fontSize: ".93rem" }}>
            {RECOMMENDED.line} Or choose your own amount, paid annually, quarterly, or monthly.
          </p>
        </section>

        <section className="section" id="partners">
          <span className="eyebrow">{PARTNERS_PAGE.eyebrow}</span>
          <h2>{PARTNERS_PAGE.title}</h2>
          <p style={{ color: "var(--ink-2)", maxWidth: 640 }}>{PARTNERS_PAGE.sub}</p>
          {partners.length ? (
            <ul className="partner-list">
              {partners.map((p) => (
                <li key={p.name + p.city}><b>{p.name}</b><span>{p.city}</span></li>
              ))}
            </ul>
          ) : (
            <p className="partner-empty">{PARTNERS_PAGE.empty}</p>
          )}
          <Link className="btn ghost" href="/pledge" style={{ marginTop: 18 }}>{PARTNERS_PAGE.cta}</Link>
        </section>

        <div className="cta">
          <h2>Ready to put your plan to work?</h2>
          <p>About ten minutes to sign up. Your plan and renewal guide unlock once GHP receives your 50% deposit.</p>
          <Link className="btn" href="/pledge">Build my Community Impact Plan</Link>
        </div>

        <footer className="footer">
          <p>{ORG.name} · Hudson, NY · <a href={`mailto:${ORG.contactEmail}`}>{ORG.contactEmail}</a></p>
          <p>{LANDING.disclaimer}</p>
        </footer>
      </div>
    </main>
  );
}
