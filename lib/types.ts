import type { Frequency } from "./content";

export type Pledge = {
  id: string;
  created_at: string;
  legal_name: string;
  dba: string | null;
  license_type: string;
  license_number: string;
  street: string | null;
  city: string;
  county: string;
  social_equity: boolean;
  contact_name: string;
  contact_title: string | null;
  contact_email: string;
  contact_phone: string | null;
  amount_per_payment: number;
  frequency: Frequency;
  term_years: number;
  total_commitment: number;
  start_date: string | null;
  engagements: string[];
  partner_statement: string | null;
  signer_name: string;
  signer_title: string | null;
  status: string;
  list_publicly?: boolean;
  program?: string | null;
};

export const money = (n: number) =>
  "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });

export const STATUSES = [
  { value: "pledged", label: "Pledged" },
  { value: "invoiced", label: "Invoiced" },
  { value: "deposit", label: "Deposit received (unlocked)" },
  { value: "paid", label: "Paid in full (unlocked)" },
  { value: "cancelled", label: "Cancelled" },
];

export const isUnlocked = (p: Pick<Pledge, "status">) => p.status === "deposit" || p.status === "paid";

export const depositAmount = (p: Pick<Pledge, "total_commitment">) => Math.round(Number(p.total_commitment) * 50) / 100;

export const displayName = (p: Pick<Pledge, "legal_name" | "dba">) => p.dba?.trim() || p.legal_name;
