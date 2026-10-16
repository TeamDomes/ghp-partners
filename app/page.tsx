import Link from "next/link";
import { LANDING, ORG, STATS, TIERS } from "@/lib/content";
import { money } from "@/lib/types";

export default function Home() {
  return (
    <main>
      <div className="wrap">
        <nav className="nav">
          <span className="brand">GHPN · Community Impact Partners</span>
          <Link className="btn small" href="/pledge">Build my plan</Link>
        </nav>

        <header className="hero">
          <span className="eyebrow">{LANDING.eyebrow}</span>
          <h1>{LANDING.headline}</h1>
          <p className="lede">{LANDING.sub}</p>
          <div className="actions">
            <Link className="btn" href="/pledge">Partner with GHPN</Link>
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
                qualitative and quantitative measures, your financial commitment, and how GHPN will report back.
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
              <div className="tier" key={t.amount}>
                <span className="mono" style={{ fontSize: ".8rem", color: "var(--ink-2)" }}>{t.name}</span>
                <b>{money(t.amount)}</b>
                <span style={{ fontSize: ".88rem", color: "var(--ink-2)" }}>per year</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 14, color: "var(--ink-2)", fontSize: ".93rem" }}>
            Or choose your own amount. Pay annually, quarterly, or monthly.
          </p>
        </section>

        <div className="cta">
          <h2>Ready to put your plan to work?</h2>
          <p>About ten minutes. You&apos;ll download your Community Impact Plan as soon as you finish.</p>
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
