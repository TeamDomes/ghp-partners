# GHPN Community Impact Partners

Cannabis licensees read about GHPN, commit funding, and download a ready-to-edit
OCM Community Impact Plan (.docx). You see every pledge in `/admin`.

## Pages
- `/` — about GHPN + Beyond GED, the opportunity
- `/pledge` — sign-up form
- `/thanks?id=…` — download the generated plan
- `/admin` — password-protected dashboard (totals, status, CSV export, re-download any plan)

## Setup (~15 min)
1. **Supabase**: new project → SQL Editor → run `supabase/schema.sql`.
2. **GitHub**: create a repo, push this folder.
3. **Vercel**: import the repo. Add env vars from `.env.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (Supabase → Project Settings → API)
   - `ADMIN_PASSWORD`
   - optional `RESEND_API_KEY`, `NOTIFY_EMAIL_TO`, `NOTIFY_EMAIL_FROM` for new-pledge emails
4. Deploy.

Local: `npm install`, copy `.env.example` to `.env.local`, `npm run dev`.

## Editing copy
Everything — stats, tiers, landing text, the plan narrative, optional engagements — is in
`lib/content.ts`. `{{company}}` becomes the partner's name in the plan. Update stats yearly.
