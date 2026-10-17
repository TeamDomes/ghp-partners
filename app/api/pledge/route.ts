import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { ENGAGEMENTS, FREQUENCIES, LICENSE_TYPES } from "@/lib/content";
import { notifyNewPledge } from "@/lib/email";
import type { Pledge } from "@/lib/types";

const str = (v: unknown, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // honeypot
  if (str(b.website)) return NextResponse.json({ id: null }, { status: 200 });

  const frequency = "annual" as keyof typeof FREQUENCIES;
  const annual = Math.round(Number(b.annual_amount) * 100) / 100;
  const amount = FREQUENCIES[frequency] ? Math.round((annual / FREQUENCIES[frequency].perYear) * 100) / 100 : 0;
  const term = Math.round(Number(b.term_years));

  const row = {
    legal_name: str(b.legal_name),
    dba: str(b.dba) || null,
    license_type: str(b.license_type),
    license_number: str(b.license_number, 60),
    street: str(b.street) || null,
    city: str(b.city, 100),
    county: str(b.county, 100),
    social_equity: Boolean(b.social_equity),
    contact_name: str(b.contact_name),
    contact_title: str(b.contact_title) || null,
    contact_email: str(b.contact_email),
    contact_phone: str(b.contact_phone, 40) || null,
    amount_per_payment: amount,
    frequency,
    term_years: term,
    total_commitment: 0,
    start_date: str(b.start_date, 10) || null,
    engagements: Array.isArray(b.engagements)
      ? (b.engagements as unknown[]).map(String).filter((id) => ENGAGEMENTS.some((e) => e.id === id))
      : [],
    partner_statement: str(b.partner_statement, 3000) || null,
    signer_name: str(b.signer_name),
    signer_title: str(b.signer_title) || null,
    list_publicly: b.list_publicly !== false,
    program: ["general", "beyond_ged", "justice"].includes(str(b.program)) ? str(b.program) : "general",
  };

  const missing = (["legal_name", "license_type", "license_number", "city", "county", "contact_name", "contact_email", "signer_name"] as const)
    .filter((k) => !row[k]);
  if (missing.length) return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  if (!LICENSE_TYPES.includes(row.license_type)) return NextResponse.json({ error: "Invalid license type." }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(row.contact_email)) return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  if (!FREQUENCIES[frequency]) return NextResponse.json({ error: "Choose a payment schedule." }, { status: 400 });
  if (!(annual >= 500 && annual <= 1_000_000)) return NextResponse.json({ error: "The minimum contribution is $500 a year." }, { status: 400 });
  if (!(term >= 1 && term <= 2)) return NextResponse.json({ error: "Choose a term of 1 or 2 years." }, { status: 400 });
  if (row.start_date && !/^\d{4}-\d{2}-\d{2}$/.test(row.start_date)) row.start_date = null;
  if (!b.agree || !b.review_ack) return NextResponse.json({ error: "Please check both acknowledgments." }, { status: 400 });

  row.total_commitment = Math.round(annual * term * 100) / 100;

  let { data, error } = await db().from("pledges").insert(row).select().single();
  if (error && /list_publicly|program/.test(error.message || "")) {
    // Columns not added yet (see supabase/002 and 003 .sql) — save without them.
    const { list_publicly: _a, program: _b, ...rest } = row;
    ({ data, error } = await db().from("pledges").insert(rest).select().single());
  }
  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong saving your plan. Please try again." }, { status: 500 });
  }

  await notifyNewPledge(data as Pledge);
  return NextResponse.json({ id: data.id });
}
