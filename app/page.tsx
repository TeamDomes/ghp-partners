import Link from "next/link";
import { LANDING, OCM_GUIDANCE, ORG, PARTNERS_PAGE, PROBLEM, RECOMMENDED, SOLUTION, TAX, TIERS } from "@/lib/content";
import { PROGRAMS, PROGRAM_ORDER } from "@/lib/programs";
import { getPartners } from "@/lib/partners";
import { money } from "@/lib/types";

export const dynamic = "force-dynamic";

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
          <span className="hero-eyebrow">{LANDING.eyebrow}</span>
          <h1>
            {LANDING.headline}
            <br />
            {LANDING.headline2}
          </h1>
          <p className="lede">{LANDING.sub}</p>
          <div className="hero-steps">
            <span className="eyebrow" style={{ marginBottom: 12 }}>{LANDING.howTitle}</span>
            <ol className="steps">
              {LANDING.how.map((s, i) => (
                <li className="step" key={s.step}>
                  <span className="mono">0{i + 1}</span>
                  <h3>{s.href ? <a href={s.href}>{s.step}</a> : s.step}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="steps-note">{LANDING.reportNote}</p>
          </div>
          <div className="actions">
            <Link className="btn" href="/pledge">Partner with GHP</Link>
            <a className="btn ghost" href="#options">See the options</a>
          </div>
        </header>

        <section className="section problem">
          <span className="eyebrow">{PROBLEM.eyebrow}</span>
          <h2>{PROBLEM.title}</h2>
          <div className="stats three">
            {PROBLEM.stats.map((s) => (
              <div className="stat" key={s.value}>
                <b>{s.value}</b>
                <span>{s.label}<sup>{s.src}</sup></span>
              </div>
            ))}
          </div>
          <div className="narrow" style={{ marginTop: 28 }}>
            {PROBLEM.body.map((t) => <p key={t}>{t}</p>)}
          </div>
        </section>

        <section className="section">
          <div className="cols">
            <div>
              <span className="eyebrow">{SOLUTION.eyebrow}</span>
              <h2>{SOLUTION.title}</h2>
              <ul className="timeline">
                {SOLUTION.timeline.map((t) => (
                  <li key={t.year + t.text}><b>{t.year}</b>{t.text}</li>
                ))}
              </ul>
            </div>
            <div>{SOLUTION.paras.map((t) => <p key={t}>{t}</p>)}</div>
          </div>
          <div className="stats three" style={{ marginTop: 28 }}>
            {SOLUTION.stats.map((s) => (
              <div className="stat" key={s.label}>
                <b style={{ fontSize: "1.9rem" }}>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="options">
          <span className="eyebrow">{SOLUTION.optionsEyebrow}</span>
          <h2>{SOLUTION.optionsTitle}</h2>
          <p style={{ color: "var(--ink-2)", maxWidth: 640 }}>{SOLUTION.optionsSub}</p>
          <div className="options">
            {PROGRAM_ORDER.map((id) => {
              const pr = PROGRAMS[id];
              return (
                <a className="option" key={id} href={`#option-${id}`}>
                  <span className="tag">{pr.tagline}</span>
                  <h3>{pr.label}</h3>
                  <p>{pr.cardBody}</p>
                  <div className="ostat"><b>{pr.cardStat.value}</b><span>{pr.cardStat.label}</span></div>
                  <span className="more">A closer look →</span>
                </a>
              );
            })}
          </div>
          <Link className="btn" href="/pledge" style={{ marginTop: 22 }}>Partner with GHP</Link>
        </section>

        {PROGRAM_ORDER.map((id) => {
          const pr = PROGRAMS[id];
          return (
            <section className="section closer" id={`option-${id}`} key={id}>
              <div className="cols">
                <div>
                  <span className="eyebrow">A closer look</span>
                  <h2>{pr.label}</h2>
                  <p className="tagline">{pr.tagline}</p>
                  <Link className="btn small" href={`/pledge?program=${id}`}>Choose this option</Link>
                </div>
                <div>{pr.closer.paras.map((t) => <p key={t}>{t}</p>)}</div>
              </div>
              <div className="stats" style={{ marginTop: 24 }}>
                {pr.closer.stats.map((s) => (
                  <div className="stat" key={s.label}>
                    <b>{s.value}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
              {pr.closer.quotes.length ? (
                <div className="quotes" style={{ marginTop: 28 }}>
                  {pr.closer.quotes.map((q) => (
                    <figure key={q.text} style={{ margin: 0 }}>
                      <p className="quote">&ldquo;{q.text}&rdquo;</p>
                      <figcaption className="quote-who">— {q.who}</figcaption>
                    </figure>
                  ))}
                </div>
              ) : null}
              <a href="#options" className="back-link">↑ Back to all options</a>
            </section>
          );
        })}

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
                success. Each of the three options answers those questions with real programs and real numbers.
              </p>
              <p>
                You get a complete Community Impact Plan, written around your business: the need, the population, three goals,
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
          <span className="eyebrow">Suggested annual levels</span>
          <div className="tiers">
            {TIERS.map((t) => (
              <div className={`tier ${t.recommended ? "rec" : ""}`} key={t.amount}>
                <span className="mono" style={{ fontSize: ".8rem", color: t.recommended ? "var(--accent)" : "var(--ink-2)" }}>{t.recommended ? "Recommended" : t.name}</span>
                <b>{money(t.amount)}</b>
                <span style={{ fontSize: ".88rem", color: "var(--ink-2)" }}>per year</span>
              </div>
            ))}
            <div className="tier">
              <span className="mono" style={{ fontSize: ".8rem", color: "var(--ink-2)" }}>Other</span>
              <b>Any amount</b>
              <span style={{ fontSize: ".88rem", color: "var(--ink-2)" }}>from $500 a year</span>
            </div>
          </div>
          <p style={{ marginTop: 14, color: "var(--ink-2)", fontSize: ".93rem" }}>
            {RECOMMENDED.line} Or choose any amount from $500 a year, paid annually.
          </p>
          <p style={{ color: "var(--ink-2)", fontSize: ".93rem" }}>{TAX.line}</p>
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
          <p>About ten minutes to sign up. Your plan and renewal instructions unlock once GHP receives your Year 1 contribution.</p>
          <Link className="btn" href="/pledge">Build my Community Impact Plan</Link>
        </div>

        <footer className="footer">
          <p>{ORG.name} · Hudson, NY · <a href={`mailto:${ORG.contactEmail}`}>{ORG.contactEmail}</a></p>
          <p>{TAX.line}{TAX.ein ? ` EIN ${TAX.ein}.` : ""} {TAX.advisor}</p>
          <p>{LANDING.disclaimer}</p>
          <p className="sources">
            Sources:{" "}
            {PROBLEM.sources.map((s) => (
              <span key={s.n}>
                [{s.n}] <a href={s.url} target="_blank" rel="noreferrer">{s.text}</a>.{" "}
              </span>
            ))}
            {SOLUTION.sources.map((s) => (
              <span key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer">{s.text}</a>.{" "}
              </span>
            ))}
            Further reading: <a href={PROBLEM.furtherReading.url} target="_blank" rel="noreferrer">{PROBLEM.furtherReading.text}</a>.
          </p>
        </footer>
      </div>
    </main>
  );
}
