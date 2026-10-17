import type { Pledge } from "./types";
import { money, displayName } from "./types";
import { FREQUENCIES, ORG } from "./content";
import { getProgram } from "./programs";

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
      <li>Directed to: ${getProgram(p.program).label}</li>
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

// Sent to the partner when their plan unlocks.
export async function notifyUnlocked(p: Pledge, origin: string) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.NOTIFY_EMAIL_FROM;
  if (!key || !from) return;
  const link = `${origin}/thanks?id=${p.id}`;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [p.contact_email],
        subject: "Your Community Impact Plan is ready",
        html: `<p>Hi ${p.contact_name},</p><p>Thank you \u2014 ${ORG.name} has received your deposit. Your Community Impact Plan and renewal application guide are ready:</p><p><a href="${link}">${link}</a></p><p>With gratitude,<br/>${ORG.name}</p>`,
      }),
    });
  } catch (e) {
    console.error("Unlock email failed", e);
  }
}
