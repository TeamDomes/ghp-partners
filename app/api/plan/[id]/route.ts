import { db } from "@/lib/supabase";
import { buildPlanDocx } from "@/lib/docx";
import type { Pledge } from "@/lib/types";
import { displayName, isUnlocked } from "@/lib/types";
import { isAdmin } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  if (!/^[0-9a-f-]{36}$/i.test(params.id)) return new Response("Not found", { status: 404 });
  const { data, error } = await db().from("pledges").select("*").eq("id", params.id).single();
  if (error || !data) return new Response("Not found", { status: 404 });
  if (!isUnlocked(data as Pledge) && !isAdmin())
    return new Response("This plan unlocks once Greater Hudson Promise confirms your deposit.", { status: 403 });

  const buf = await buildPlanDocx(data as Pledge);
  const safe = displayName(data as Pledge).replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "");
  return new Response(new Uint8Array(buf), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="Community_Impact_Plan_${safe}.docx"`,
      "Cache-Control": "no-store",
    },
  });
}
