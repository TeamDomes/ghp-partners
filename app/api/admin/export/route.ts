import { isAdmin } from "@/lib/auth";
import { db } from "@/lib/supabase";

export async function GET() {
  if (!isAdmin()) return new Response("Unauthorized", { status: 401 });
  const { data } = await db().from("pledges").select("*").order("created_at", { ascending: false });
  const rows = data || [];
  const cols = rows.length ? Object.keys(rows[0]) : ["id"];
  const esc = (v: unknown) => {
    const s = Array.isArray(v) ? v.join("; ") : v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => esc((r as Record<string, unknown>)[c])).join(","))].join("\n");
  return new Response(csv, {
    headers: { "Content-Type": "text/csv", "Content-Disposition": 'attachment; filename="ghp_pledges.csv"' },
  });
}
