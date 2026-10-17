import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { db } from "@/lib/supabase";

import { STATUSES, isUnlocked } from "@/lib/types";
import type { Pledge } from "@/lib/types";
import { notifyUnlocked } from "@/lib/email";

export async function POST(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, status } = await req.json();
  if (!STATUSES.some((s) => s.value === status)) return NextResponse.json({ error: "Bad status" }, { status: 400 });
  const { data: before } = await db().from("pledges").select("*").eq("id", id).single();
  const { data, error } = await db().from("pledges").update({ status }).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (before && !isUnlocked(before as Pledge) && isUnlocked(data as Pledge)) {
    await notifyUnlocked(data as Pledge, new URL(req.url).origin);
  }
  return NextResponse.json({ ok: true });
}
