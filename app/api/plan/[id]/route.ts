import { db } from "@/lib/supabase";
import { buildPlanDocx } from "@/lib/docx";
import { guideBlocks, planBlocks } from "@/lib/blocks";
import { renderPdf } from "@/lib/pdf";
import type { Pledge } from "@/lib/types";
import { displayName, isUnlocked } from "@/lib/types";
import { isAdmin } from "@/lib/auth";
import { ORG } from "@/lib/content";

export const runtime = "nodejs";

// ?doc=plan (Community Impact Plan PDF) | renewal (OCM Renewal Instructions PDF) | word (editable .docx)
export async function GET(req: Request, { params }: { params: { id: string } }) {
  if (!/^[0-9a-f-]{36}$/i.test(params.id)) return new Response("Not found", { status: 404 });
  const { data, error } = await db().from("pledges").select("*").eq("id", params.id).single();
  if (error || !data) return new Response("Not found", { status: 404 });
  const pl = data as Pledge;
  if (!isUnlocked(pl) && !isAdmin())
    return new Response("This plan unlocks once Greater Hudson Promise confirms your Year 1 contribution.", { status: 403 });

  const kind = new URL(req.url).searchParams.get("doc") || "plan";
  const safe = displayName(pl).replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "");
  const headers = (type: string, name: string) => ({
    "Content-Type": type,
    "Content-Disposition": `attachment; filename="${name}"`,
    "Cache-Control": "no-store",
  });

  if (kind === "word") {
    const buf = await buildPlanDocx(pl);
    return new Response(new Uint8Array(buf), {
      headers: headers("application/vnd.openxmlformats-officedocument.wordprocessingml.document", `Community_Impact_Plan_${safe}.docx`),
    });
  }

  const isRenewal = kind === "renewal";
  const bytes = await renderPdf(
    isRenewal ? guideBlocks(pl) : planBlocks(pl),
    isRenewal ? `OCM Renewal Instructions — ${displayName(pl)}` : `Community Impact Plan — ${displayName(pl)}`,
    isRenewal
      ? `${displayName(pl)} · OCM Renewal Instructions · Suggested draft for your review`
      : `${displayName(pl)} · Community Impact Plan · In partnership with ${ORG.name}`
  );
  return new Response(Buffer.from(bytes), {
    headers: headers("application/pdf", isRenewal ? `OCM_Renewal_Instructions_${safe}.pdf` : `Community_Impact_Plan_${safe}.pdf`),
  });
}
