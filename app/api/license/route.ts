import { NextResponse } from "next/server";
import { searchLicenses } from "@/lib/ocm";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") || "";
  try {
    const results = await searchLicenses(q.slice(0, 60));
    return NextResponse.json({ results });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ results: [], error: "lookup_unavailable" }, { status: 502 });
  }
}
