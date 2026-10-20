import { db } from "./supabase";
import { MANUAL_PARTNERS } from "./content";

// Public list: only partners whose deposit is received and who opted in.
export async function getPartners(): Promise<{ name: string; city: string }[]> {
  try {
    const { data, error } = await db()
      .from("pledges")
      .select("legal_name,dba,city,status,list_publicly,created_at")
      .in("status", ["deposit", "paid"])
      .eq("list_publicly", true)
      .order("created_at", { ascending: true });
    if (error) console.error("getPartners:", error.message);
    const online = (error || !data ? [] : data).map((r) => ({
      name: (r.dba as string)?.trim() || (r.legal_name as string),
      city: (r.city as string) || "",
    }));
    return merge(online);
  } catch (e) {
    console.error("getPartners failed:", e);
    return merge([]);
  }
}

// Online partners first (Domes leads), manual partners slotted in right after the first one.
function merge(online: { name: string; city: string }[]) {
  const list = [...online.slice(0, 1), ...MANUAL_PARTNERS, ...online.slice(1)];
  const seen = new Set<string>();
  return list.filter((p) => {
    const k = p.name.toLowerCase();
    return seen.has(k) ? false : (seen.add(k), true);
  });
}
