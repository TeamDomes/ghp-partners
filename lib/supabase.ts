import { createClient } from "@supabase/supabase-js";

// Server-only client. Uses the service role key, so never import this
// from a "use client" file.
export function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase env vars are missing");
  return createClient(url, key, { auth: { persistSession: false } });
}
