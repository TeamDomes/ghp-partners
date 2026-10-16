import { cookies } from "next/headers";
import { createHash } from "crypto";

const COOKIE = "ghp_admin";

export function token() {
  const pw = process.env.ADMIN_PASSWORD || "";
  return createHash("sha256").update("ghp:" + pw).digest("hex");
}

export function isAdmin() {
  if (!process.env.ADMIN_PASSWORD) return false;
  return cookies().get(COOKIE)?.value === token();
}

export const ADMIN_COOKIE = COOKIE;
