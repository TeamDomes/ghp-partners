"use client";
import { useState } from "react";
import { STATUSES } from "@/lib/types";

export default function StatusSelect({ id, value }: { id: string; value: string }) {
  const [v, setV] = useState(value);
  return (
    <select
      value={v}
      style={{ padding: "6px 8px", fontSize: ".85rem" }}
      onChange={async (e) => {
        const next = e.target.value;
        setV(next);
        const r = await fetch("/api/admin/status", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status: next }) });
        if (!r.ok) { alert("Couldn't update status"); setV(value); }
      }}
    >
      {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
    </select>
  );
}
