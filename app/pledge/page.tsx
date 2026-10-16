"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ENGAGEMENTS, FREQUENCIES, LANDING, LICENSE_TYPES, TIERS, type Frequency } from "@/lib/content";
import { money } from "@/lib/types";

type Form = Record<string, string>;

export default function Pledge() {
  const router = useRouter();
  const [f, setF] = useState<Form>({ frequency: "annual", term_years: "2", county: "Columbia" });
  const [tier, setTier] = useState<number | "custom">(TIERS[1].amount);
  const [eng, setEng] = useState<string[]>([]);
  const [agree, setAgree] = useState(false);
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
      ) && perYear >= 100 && agree,
    [f, perYear, agree]
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!valid) {
      setErr("Please complete the required fields (marked *) and confirm the acknowledgment.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/pledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, annual_amount: perYear, engagements: eng, agree, social_equity: f.social_equity === "yes" }),
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
        <Link className="brand" href="/">← GHPN · Community Impact Partners</Link>
      </nav>

      <span className="eyebrow">Build your plan</span>
      <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>Partner with GHPN</h1>
      <p style={{ color: "var(--ink-2)", marginBottom: 32 }}>
        Fill this out once. We&apos;ll generate your Community Impact Plan as a Word document you can review and submit.
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
          <h2>Your commitment</h2>
          <p className="hint">Annual contribution to GHPN&apos;s Beyond GED program.</p>
          <div className="choice-grid">
            {TIERS.map((t) => (
              <label key={t.amount} className={`choice ${tier === t.amount ? "on" : ""}`}>
                <input type="radio" name="tier" checked={tier === t.amount} onChange={() => setTier(t.amount)} />
                <small className="mono">{t.name}</small>
                <b>{money(t.amount)}</b>
                <small>per year</small>
              </label>
            ))}
            <label className={`choice ${tier === "custom" ? "on" : ""}`}>
              <input type="radio" name="tier" checked={tier === "custom"} onChange={() => setTier("custom")} />
              <small className="mono">Other</small>
              <b>Custom</b>
              <small>your amount</small>
            </label>
          </div>
          {tier === "custom" && (
            <label className="field"><span>Annual amount ($) {req}</span>
              <input type="number" min={100} step={50} value={f.custom_annual || ""} onChange={set("custom_annual")} />
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
          </div>
        </div>

        <div className="form-card">
          <h2>Other ways to show up <span style={{ fontSize: "1rem", color: "var(--ink-2)" }}>(optional)</span></h2>
          <p className="hint">Anything you check is written into your plan.</p>
          {ENGAGEMENTS.map((e) => (
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
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <span>
              I&apos;m authorized to make this commitment on behalf of the business, and I understand GHPN will follow up to
              arrange contributions. {LANDING.disclaimer}
            </span>
          </label>
        </div>

        {err && <div className="error">{err}</div>}
        <button className="btn" type="submit" disabled={busy}>{busy ? "Building your plan…" : "Generate my Community Impact Plan"}</button>
      </form>
    </main>
  );
}
