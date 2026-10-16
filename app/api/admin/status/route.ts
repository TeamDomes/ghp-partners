import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { db } from "@/lib/supabase";

const STATUSES = ["pledged", "invoiced", "paid", "cancelled"];

export async function POST(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, status } = await req.json();
  if (!STATUSES.includes(status)) return NextResponse.json({ error: "Bad status" }, { status: 400 });
  const { error } = await db().from("pledges").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
