import { db } from "./supabase";

// Public list: only partners whose deposit is received and who opted in.
export async function getPartners(): Promise<{ name: string; city: string }[]> {
  try {
    const { data, error } = await db()
      .from("pledges")
      .select("legal_name,dba,city,status,list_publicly,created_at")
      .in("status", ["deposit", "paid"])
      .eq("list_publicly", true)
      .order("created_at", { ascending: true });
    if (error || !data) return [];
    const seen = new Set<string>();
    return data
      .map((r) => ({ name: (r.dba as string)?.trim() || (r.legal_name as string), city: (r.city as string) || "" }))
      .filter((p) => (seen.has(p.name) ? false : (seen.add(p.name), true)));
  } catch {
    return [];
  }
}
