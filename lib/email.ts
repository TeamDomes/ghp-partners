import type { Pledge } from "./types";
import { money, displayName } from "./types";
import { FREQUENCIES } from "./content";

// Optional. Sends a notification via Resend if RESEND_API_KEY is set.
export async function notifyNewPledge(p: Pledge) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL_TO;
  const from = process.env.NOTIFY_EMAIL_FROM;
  if (!key || !to || !from) return;

  const name = displayName(p);
  const html = `
    <p><strong>${name}</strong> just committed to a Community Impact Plan partnership with GHP.</p>
    <ul>
      <li>Commitment: ${money(p.amount_per_payment)} ${FREQUENCIES[p.frequency].label.toLowerCase()} for ${p.term_years} year(s) — <strong>${money(p.total_commitment)} total</strong></li>
      <li>License: ${p.license_type} · ${p.license_number}</li>
      <li>Location: ${p.city}, ${p.county} County</li>
      <li>Contact: ${p.contact_name}${p.contact_title ? ", " + p.contact_title : ""} · ${p.contact_email}${p.contact_phone ? " · " + p.contact_phone : ""}</li>
    </ul>`;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        reply_to: p.contact_email,
        subject: `New GHP partner: ${name} (${money(p.total_commitment)})`,
        html,
      }),
    });
  } catch (e) {
    console.error("Email notify failed", e);
  }
}
