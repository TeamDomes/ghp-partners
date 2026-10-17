import { isAdmin } from "@/lib/auth";
import { db } from "@/lib/supabase";
import { FREQUENCIES } from "@/lib/content";
import type { Pledge } from "@/lib/types";
import { depositAmount, displayName, isUnlocked, money } from "@/lib/types";
import { getProgram } from "@/lib/programs";
import StatusSelect from "./StatusSelect";

export const dynamic = "force-dynamic";

export default async function Admin({ searchParams }: { searchParams: { e?: string } }) {
  if (!isAdmin()) {
    return (
      <main className="wrap narrow" style={{ paddingTop: 72 }}>
        <span className="eyebrow">Admin</span>
        <h1 style={{ fontSize: "2.2rem" }}>Partner dashboard</h1>
        <form className="form-card" method="post" action="/api/admin/login">
          {searchParams.e && <div className="error">Wrong password.</div>}
          <label className="field"><span>Password</span><input type="password" name="password" autoFocus /></label>
          <button className="btn" type="submit">Sign in</button>
        </form>
      </main>
    );
  }

  const { data } = await db().from("pledges").select("*").order("created_at", { ascending: false });
  const rows = (data || []) as Pledge[];
  const live = rows.filter((r) => r.status !== "cancelled");
  const total = live.reduce((s, r) => s + Number(r.total_commitment), 0);
  const annual = live.reduce((s, r) => s + Number(r.total_commitment) / r.term_years, 0);
  const unlocked = rows.filter((r) => isUnlocked(r)).length;
  const waiting = rows.filter((r) => r.status === "pledged" || r.status === "invoiced").length;

  return (
    <main className="wrap" style={{ paddingTop: 40, paddingBottom: 72 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 12 }}>
        <div>
          <span className="eyebrow">Admin</span>
          <h1 style={{ fontSize: "2.2rem" }}>Partner dashboard</h1>
        </div>
        <a className="btn ghost small" href="/api/admin/export">Export CSV</a>
      </div>

      <div className="stats" style={{ margin: "24px 0 36px" }}>
        <div className="stat"><b>{live.length}</b><span>active partners</span></div>
        <div className="stat"><b>{money(annual)}</b><span>committed per year</span></div>
        <div className="stat"><b>{money(total)}</b><span>total over all terms</span></div>
        <div className="stat"><b>{unlocked}</b><span>unlocked · {waiting} awaiting deposit</span></div>
      </div>

      <div className="table-scroll">
        <table className="list">
          <thead>
            <tr><th>Date</th><th>Partner</th><th>License</th><th>Commitment</th><th>Contact</th><th>Status</th><th>Plan</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{new Date(r.created_at).toLocaleDateString()}</td>
                <td><strong>{displayName(r)}</strong><br /><span style={{ color: "var(--ink-2)" }}>{r.city}, {r.county}</span>{r.list_publicly === false ? <><br /><span className="pill">not listed publicly</span></> : null}</td>
                <td>{r.license_type}<br /><span className="mono" style={{ fontSize: ".8rem" }}>{r.license_number}</span>{r.license_verified === false ? <><br /><span className="pill" style={{ background: "#f8e1d9", color: "#7a2410" }}>verify license</span></> : null}</td>
                <td><strong>{money(r.total_commitment)}</strong><br /><span style={{ color: "var(--ink-2)" }}>{money(r.amount_per_payment)} {FREQUENCIES[r.frequency]?.label.toLowerCase()} · {r.term_years}y</span><br /><span className="mono" style={{ fontSize: ".8rem" }}>Year 1 due: {money(depositAmount(r))}</span><br /><span className="pill">{getProgram(r.program).label}</span></td>
                <td>{r.contact_name}<br /><a href={`mailto:${r.contact_email}`}>{r.contact_email}</a>{r.contact_phone ? <><br />{r.contact_phone}</> : null}</td>
                <td><StatusSelect id={r.id} value={r.status} /></td>
                <td><a href={`/api/plan/${r.id}?doc=plan`}>plan</a> · <a href={`/api/plan/${r.id}?doc=renewal`}>renewal</a><br /><a href={`/thanks?id=${r.id}`}>page</a></td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={7} style={{ color: "var(--ink-2)", padding: 24 }}>No partners yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </main>
  );
}
