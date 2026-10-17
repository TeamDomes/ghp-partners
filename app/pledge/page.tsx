"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ENGAGEMENTS, FREQUENCIES, LICENSE_TYPES, RECOMMENDED, TAX, TIERS, type Frequency } from "@/lib/content";
import { money } from "@/lib/types";
import { PROGRAMS, PROGRAM_ORDER, type ProgramId } from "@/lib/programs";

type Form = Record<string, string>;

export default function Pledge() {
  const router = useRouter();
  const [f, setF] = useState<Form>({ frequency: "annual", term_years: "2", county: "Columbia" });
  const [tier, setTier] = useState<number | "custom">(RECOMMENDED.annual);
  const [eng, setEng] = useState<string[]>([]);
  const [agree, setAgree] = useState(false);
  const [listMe, setListMe] = useState(true);
  const [reviewAck, setReviewAck] = useState(false);
  const [program, setProgram] = useState<ProgramId>("general");
  const engOptions = ENGAGEMENTS.filter((e) => e.programs.includes(program));
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("program");
    if (q && q in PROGRAMS) setProgram(q as ProgramId);
  }, []);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((s) => ({ ...s, [k]: e.target.value }));

  const freq = f.frequency as Frequency;
  const perYear = tier === "custom" ? Number(f.custom_annual || 0) : tier;
  const perPayment = Math.round((perYear / FREQUENCIES[freq].perYear) * 100) / 100;
  const total = perYear * Number(f.term_years || 1);

  const valid = useMemo(
    () =>
      ["legal_name", "license_type", "license_number", "city", "county", "contact_name", "contact_email", "signer_name"].every(
        (k) => (f[k] || "").trim()
      ) && perYear >= 250 && agree && reviewAck,
    [f, perYear, agree, reviewAck]
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!valid) {
      setErr(perYear < 250 ? "The minimum contribution is $250 a year." : "Please complete the required fields (marked *) and check both acknowledgments.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/pledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, annual_amount: perYear, engagements: eng.filter((id) => engOptions.some((e) => e.id === id)), program, agree, review_ack: reviewAck, list_publicly: listMe, social_equity: f.social_equity === "yes" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      router.push(`/thanks?id=${json.id}`);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
      setBusy(false);
    }
  }

  const req = <em>*</em>;

  return (
    <main className="wrap narrow" style={{ paddingBottom: 72 }}>
      <nav className="nav">
        <Link className="brand" href="/">← GHP · Community Impact Partners</Link>
      </nav>

      <span className="eyebrow">Build your plan</span>
      <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>Partner with GHP</h1>
      <p style={{ color: "var(--ink-2)", marginBottom: 32 }}>
        Fill this out once. Sign your pledge, pay a 50% deposit, and your Community Impact Plan and renewal portal guide unlock.
      </p>

      <form onSubmit={submit} noValidate>
        <input className="hp" tabIndex={-1} autoComplete="off" name="website" onChange={set("website")} aria-hidden />

        <div className="form-card">
          <h2>Your business</h2>
          <div className="grid2">
            <label className="field"><span>Legal business name {req}</span><input type="text" value={f.legal_name || ""} onChange={set("legal_name")} /></label>
            <label className="field"><span>DBA / store name</span><input type="text" value={f.dba || ""} onChange={set("dba")} /></label>
          </div>
          <div className="grid2">
            <label className="field">
              <span>License type {req}</span>
              <select value={f.license_type || ""} onChange={set("license_type")}>
                <option value="">Choose…</option>
                {LICENSE_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label className="field"><span>OCM license number {req}</span><input type="text" value={f.license_number || ""} onChange={set("license_number")} /></label>
          </div>
          <label className="field"><span>Street address</span><input type="text" value={f.street || ""} onChange={set("street")} /></label>
          <div className="grid2">
            <label className="field"><span>City {req}</span><input type="text" value={f.city || ""} onChange={set("city")} /></label>
            <label className="field"><span>County {req}</span><input type="text" value={f.county || ""} onChange={set("county")} /></label>
          </div>
          <label className="field">
            <span>Social &amp; economic equity (SEE) applicant?</span>
            <select value={f.social_equity || ""} onChange={set("social_equity")}>
              <option value="">Prefer not to say</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
        </div>

        <div className="form-card">
          <h2>Point of contact</h2>
          <div className="grid2">
            <label className="field"><span>Name {req}</span><input type="text" value={f.contact_name || ""} onChange={set("contact_name")} /></label>
            <label className="field"><span>Title</span><input type="text" value={f.contact_title || ""} onChange={set("contact_title")} /></label>
          </div>
          <div className="grid2">
            <label className="field"><span>Email {req}</span><input type="email" value={f.contact_email || ""} onChange={set("contact_email")} /></label>
            <label className="field"><span>Phone</span><input type="tel" value={f.contact_phone || ""} onChange={set("contact_phone")} /></label>
          </div>
        </div>

        <div className="form-card">
          <h2>Where your contribution goes</h2>
          <p className="hint">Your Community Impact Plan and portal responses are written around the option you choose.</p>
          <div className="program-grid">
            {PROGRAM_ORDER.map((id) => {
              const pr = PROGRAMS[id];
              return (
                <label key={id} className={`choice program ${program === id ? "on" : ""}`}>
                  <input type="radio" name="program" checked={program === id} onChange={() => setProgram(id)} />
                  <b>{pr.label}</b>
                  <small>{pr.tagline}</small>
                </label>
              );
            })}
          </div>
          <p className="hint" style={{ marginTop: 10 }}>{PROGRAMS[program].cardBody}</p>
        </div>

        <div className="form-card">
          <h2>Your commitment</h2>
          <p className="hint">Annual contribution to GHP&apos;s Beyond GED program. {RECOMMENDED.line}</p>
          <div className="choice-grid">
            {TIERS.map((t) => (
              <label key={t.amount} className={`choice ${tier === t.amount ? "on" : ""}`}>
                <input type="radio" name="tier" checked={tier === t.amount} onChange={() => setTier(t.amount)} />
                <small className="mono">{t.recommended ? "Recommended" : t.name}</small>
                <b>{money(t.amount)}</b>
                <small>per year</small>
              </label>
            ))}
            <label className={`choice ${tier === "custom" ? "on" : ""}`}>
              <input type="radio" name="tier" checked={tier === "custom"} onChange={() => setTier("custom")} />
              <small className="mono">Other</small>
              <b>Your amount</b>
              <small>from $250 a year</small>
            </label>
          </div>
          {tier === "custom" && (
            <label className="field"><span>Annual amount ($250 minimum) {req}</span>
              <input type="number" min={250} step={50} value={f.custom_annual || ""} onChange={set("custom_annual")} />
            </label>
          )}
          <div className="grid2">
            <label className="field">
              <span>Payment schedule</span>
              <select value={f.frequency} onChange={set("frequency")}>
                {Object.entries(FREQUENCIES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </label>
            <label className="field">
              <span>Term</span>
              <select value={f.term_years} onChange={set("term_years")}>
                {[1, 2, 3, 4, 5].map((y) => <option key={y} value={y}>{y} year{y > 1 ? "s" : ""}</option>)}
              </select>
            </label>
          </div>
          <label className="field"><span>Start date</span><input type="date" value={f.start_date || ""} onChange={set("start_date")} /></label>

          <div className="summary">
            <div className="mono" style={{ fontSize: ".8rem", color: "var(--ink-2)" }}>TOTAL COMMITMENT</div>
            <div className="big">{money(total || 0)}</div>
            <div style={{ fontSize: ".93rem", color: "var(--ink-2)" }}>
              {money(perPayment || 0)} {FREQUENCIES[freq].label.toLowerCase()} · {f.term_years} year{f.term_years !== "1" ? "s" : ""}
            </div>
            <div style={{ fontSize: ".93rem", marginTop: 8 }}>
              <strong>Deposit to unlock your plan: {money((total || 0) / 2)}</strong> (50% of your total pledge)
            </div>
            <div style={{ fontSize: ".85rem", color: "var(--ink-2)", marginTop: 8 }}>{TAX.line}</div>
          </div>
        </div>

        <div className="form-card">
          <h2>Other ways to show up <span style={{ fontSize: "1rem", color: "var(--ink-2)" }}>(optional)</span></h2>
          <p className="hint">Anything you check is written into your plan.</p>
          {engOptions.map((e) => (
            <label key={e.id} className="check">
              <input
                type="checkbox"
                checked={eng.includes(e.id)}
                onChange={(ev) => setEng((s) => (ev.target.checked ? [...s, e.id] : s.filter((x) => x !== e.id)))}
              />
              <span>{e.label}</span>
            </label>
          ))}
          <label className="field" style={{ marginTop: 16 }}>
            <span>In your words: why does this partnership matter to your business and community?</span>
            <textarea value={f.partner_statement || ""} onChange={set("partner_statement")} placeholder="Optional, but recommended. This makes your plan your own." />
          </label>
        </div>

        <div className="form-card">
          <h2>Sign off</h2>
          <div className="grid2">
            <label className="field"><span>Your name {req}</span><input type="text" value={f.signer_name || ""} onChange={set("signer_name")} /></label>
            <label className="field"><span>Title</span><input type="text" value={f.signer_title || ""} onChange={set("signer_title")} /></label>
          </div>
          <label className="check">
            <input type="checkbox" checked={reviewAck} onChange={(e) => setReviewAck(e.target.checked)} />
            <span>I understand that the Community Impact Plan and renewal application responses GHP provides are a suggested draft for our review. Our business is solely responsible for reviewing, editing, and approving our own submission to the Office of Cannabis Management, and for the accuracy and completeness of everything we submit. GHP and its volunteers do not provide legal or tax advice.</span>
          </label>
          <label className="check">
            <input type="checkbox" checked={listMe} onChange={(e) => setListMe(e.target.checked)} />
            <span>List our business on GHP&apos;s Community Partners page once our deposit is received.</span>
          </label>
          <label className="check">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <span>
              I&apos;m authorized to make this commitment on behalf of the business, and I understand GHP will follow up to
              arrange contributions. My Community Impact Plan and renewal guide will be released once GHP receives a deposit of 50% of my total pledge.
            </span>
          </label>
        </div>

        {err && <div className="error">{err}</div>}
        <button className="btn" type="submit" disabled={busy}>{busy ? "Submitting…" : "Sign my pledge"}</button>
      </form>
    </main>
  );
}
