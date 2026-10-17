"use client";
import { useEffect, useRef, useState } from "react";
import type { OcmLicense } from "@/lib/ocm";

export default function LicensePicker({
  value,
  onSelect,
  onUnavailable,
}: {
  value: OcmLicense | null;
  onSelect: (l: OcmLicense | null) => void;
  onUnavailable: () => void;
}) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<OcmLicense[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (q.trim().length < 3) { setResults([]); setSearched(false); return; }
    timer.current = setTimeout(async () => {
      setLoading(true);
      try {
        const r = await fetch(`/api/license?q=${encodeURIComponent(q.trim())}`);
        const j = await r.json();
        if (!r.ok) { onUnavailable(); return; }
        setResults(j.results || []);
        setSearched(true);
      } catch {
        onUnavailable();
      } finally {
        setLoading(false);
      }
    }, 350);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  if (value) {
    return (
      <div className="lic-card">
        <div>
          <b>{value.entity_name}</b>
          {value.dba ? <span> · {value.dba}</span> : null}
          <div className="mono" style={{ fontSize: ".82rem", color: "var(--ink-2)", marginTop: 4 }}>
            {value.license_number} · {value.license_type}
            {value.city ? ` · ${value.city}` : ""}{value.county ? `, ${value.county} County` : ""}
          </div>
          <div className="lic-ok">✓ Verified with the NYS Office of Cannabis Management</div>
        </div>
        <button type="button" className="btn ghost small" onClick={() => { onSelect(null); setQ(""); }}>Change</button>
      </div>
    );
  }

  return (
    <div className="lic-search">
      <label className="field" style={{ marginBottom: 6 }}>
        <span>Find your OCM license <em>*</em></span>
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Type your license number or business name"
          autoComplete="off"
        />
      </label>
      {loading && <p className="hint">Searching OCM records…</p>}
      {!loading && results.length > 0 && (
        <ul className="lic-results">
          {results.map((l) => (
            <li key={l.license_number}>
              <button type="button" onClick={() => onSelect(l)}>
                <b>{l.dba || l.entity_name}</b>
                {l.dba ? <span> ({l.entity_name})</span> : null}
                <small className="mono">{l.license_number} · {l.license_type}{l.city ? ` · ${l.city}` : ""}</small>
              </button>
            </li>
          ))}
        </ul>
      )}
      {!loading && searched && results.length === 0 && (
        <p className="hint">No active OCM license matches “{q}”. Try your full license number (e.g. OCM-RETL-24-000066) or your registered business name.</p>
      )}
      <p className="hint" style={{ marginTop: 6 }}>Searches New York&apos;s public list of active cannabis licenses.</p>
    </div>
  );
}
