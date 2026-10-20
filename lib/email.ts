import type { Pledge } from "./types";
import { money, displayName, depositAmount } from "./types";
import { DEPOSIT, ORG, TAX } from "./content";
import { getProgram } from "./programs";

// Emails are sent through Resend when RESEND_API_KEY and NOTIFY_EMAIL_FROM are set.
// REPLY_TO_EMAIL: where licensees' replies go (falls back to GHPN's general inbox).
// NOTIFY_EMAIL_TO: private, comma-separated list that gets new-pledge alerts.

const replyTo = () => process.env.REPLY_TO_EMAIL || ORG.contactEmail;

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));

async function send(payload: Record<string, unknown>, label: string) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.NOTIFY_EMAIL_FROM;
  if (!key || !from) return;
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, ...payload }),
    });
    if (!r.ok) console.error(`${label} email failed`, r.status, await r.text());
  } catch (e) {
    console.error(`${label} email failed`, e);
  }
}

function wrap(body: string) {
  return `<div style="font-family:Georgia,serif;font-size:16px;line-height:1.55;color:#2b2622;max-width:560px">
${body}
<hr style="border:none;border-top:1px solid #ddd1c1;margin:28px 0 14px"/>
<p style="font-size:13px;color:#6b5f55;font-family:Arial,sans-serif">
Questions? Just reply to this email, or write to <a href="mailto:${esc(replyTo())}">${esc(replyTo())}</a>.<br/>
${esc(ORG.name)} · ${esc(ORG.mailingAddress)}<br/>
${esc(TAX.line)}${TAX.ein ? ` EIN ${esc(TAX.ein)}.` : ""}
</p></div>`;
}

// 1) Private alert to Jennie / Ashlyn / Jeff when someone pledges.
export async function notifyNewPledge(p: Pledge) {
  const to = process.env.NOTIFY_EMAIL_TO;
  if (!to) return;
  const name = displayName(p);
  const html = `
    <p><strong>${esc(name)}</strong> just signed a Community Impact Plan pledge.</p>
    <ul>
      <li>Commitment: ${money(Number(p.total_commitment) / p.term_years)} per year for ${p.term_years} year(s), <strong>${money(p.total_commitment)} total</strong></li>
      <li>Year 1 due now: ${money(depositAmount(p))}</li>
      <li>Directed to: ${esc(getProgram(p.program).label)}</li>
      <li>License: ${esc(p.license_type)} · ${esc(p.license_number)}</li>
      <li>Location: ${esc(p.city)}, ${esc(p.county)} County</li>
      <li>Contact: ${esc(p.contact_name)}${p.contact_title ? ", " + esc(p.contact_title) : ""} · ${esc(p.contact_email)}${p.contact_phone ? " · " + esc(p.contact_phone) : ""}</li>
    </ul>
    <p>Mark them <em>Deposit received</em> in the admin page once Year 1 arrives; that unlocks their plan and emails them.</p>`;
  await send(
    {
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      reply_to: p.contact_email,
      subject: `New GHPN partner: ${name} (${money(p.total_commitment)})`,
      html,
    },
    "Admin alert"
  );
}

// 2) To the licensee right after they sign: thank you + how to pay + their link.
export async function notifyPledgeReceived(p: Pledge, origin: string) {
  const link = `${origin}/thanks?id=${p.id}`;
  const due = depositAmount(p);
  const html = wrap(`
<p>Hi ${esc(p.contact_name)},</p>
<p>Thank you for pledging ${money(p.total_commitment)} to ${esc(ORG.name)} through your Community Impact Plan. Your support will be directed to <strong>${esc(getProgram(p.program).label)}</strong>.</p>
<p><strong>Next step: your Year 1 contribution of ${money(due)}.</strong><br/>
Pay online: <a href="${esc(ORG.donateUrl)}">${esc(ORG.donateUrl)}</a><br/>
Or mail a check payable to ${esc(ORG.checkPayable)}, ${esc(ORG.mailingAddress)}, with &ldquo;${esc(displayName(p))} – Community Impact Plan&rdquo; in the memo.</p>
${p.term_years > 1 ? `<p>Your Year 2 contribution of ${money(due)} will be due on the one-year anniversary.</p>` : ""}
<p>Once GHPN confirms your payment (${esc(DEPOSIT.turnaround)}), your Community Impact Plan and suggested responses for the OCM renewal application will be ready here. Please save this link:</p>
<p><a href="${link}">${link}</a></p>
<p>With gratitude,<br/>${esc(ORG.name)}</p>`);
  await send(
    { to: [p.contact_email], reply_to: replyTo(), subject: "Thank you for your pledge to Greater Hudson Promise Neighborhood", html },
    "Pledge received"
  );
}

// 3) To the licensee when you mark their payment received.
export async function notifyUnlocked(p: Pledge, origin: string) {
  const link = `${origin}/thanks?id=${p.id}`;
  const html = wrap(`
<p>Hi ${esc(p.contact_name)},</p>
<p>Thank you. ${esc(ORG.name)} has received your contribution, and your Community Impact Plan is ready.</p>
<p><a href="${link}" style="display:inline-block;background:#9a3b1f;color:#fff8f2;padding:12px 22px;border-radius:999px;text-decoration:none;font-family:Arial,sans-serif;font-weight:bold">View your plan</a></p>
<p>On that page you can download two PDFs: your Community Impact Plan for your records, and OCM Renewal Instructions with a suggested response for each Community Impact question on the renewal application. Please review and adjust everything before you submit. Your business is responsible for its final submission.</p>
<p>A written acknowledgment of your contribution will follow for your records.</p>
<p>With gratitude,<br/>${esc(ORG.name)}</p>`);
  await send(
    { to: [p.contact_email], reply_to: replyTo(), subject: "Your Community Impact Plan is ready", html },
    "Plan ready"
  );
}
