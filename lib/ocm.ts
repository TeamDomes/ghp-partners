// Live lookups against New York's public "Current OCM Licenses" dataset (data.ny.gov, jskf-tt3q).
const BASE = "https://data.ny.gov/resource/jskf-tt3q.json";

export type OcmLicense = {
  license_number: string;
  license_type: string;
  entity_name: string;
  dba: string;
  street: string;
  city: string;
  county: string;
};

type Row = Record<string, string | undefined>;

const clean = (t?: string) => (t || "").replace(/\s+License$/i, "").trim();

function toLicense(r: Row): OcmLicense {
  return {
    license_number: (r.license_number || "").trim(),
    license_type: clean(r.license_type),
    entity_name: (r.entity_name || "").trim(),
    dba: (r.dba || "").trim(),
    street: (r.address_line_1 || "").trim(),
    city: (r.city || "").trim(),
    county: (r.county || "").trim(),
  };
}

async function query(params: Record<string, string>): Promise<Row[]> {
  const url = BASE + "?" + new URLSearchParams(params).toString();
  const res = await fetch(url, { headers: { Accept: "application/json" }, next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`OCM lookup failed: ${res.status}`);
  return res.json();
}

// Merge multiple location rows for the same license, preferring rows with a street/city (retail location).
function dedupe(rows: Row[]): OcmLicense[] {
  const map = new Map<string, OcmLicense>();
  for (const r of rows) {
    const l = toLicense(r);
    if (!l.license_number) continue;
    const prev = map.get(l.license_number);
    if (!prev) map.set(l.license_number, l);
    else {
      if (!prev.city && l.city) { prev.city = l.city; prev.street = l.street; prev.county = l.county; }
      if (!prev.dba && l.dba) prev.dba = l.dba;
    }
  }
  return Array.from(map.values());
}

const sq = (s: string) => s.replace(/'/g, "''");

// Search active licenses by license number or business name / DBA.
export async function searchLicenses(q: string): Promise<OcmLicense[]> {
  const term = q.trim().toUpperCase();
  if (term.length < 3) return [];
  const like = `'%${sq(term)}%'`;
  const rows = await query({
    $select: "license_number,license_type,entity_name,dba,address_line_1,city,county",
    $where: `license_status='Active' AND (upper(license_number) like ${like} OR upper(entity_name) like ${like} OR upper(dba) like ${like})`,
    $order: "license_number",
    $limit: "60",
  });
  return dedupe(rows).slice(0, 12);
}

// Exact lookup used to verify a submission. Returns null if not an active license.
export async function getLicense(num: string): Promise<OcmLicense | null> {
  const n = num.trim().toUpperCase();
  if (!/^[A-Z0-9-]{4,40}$/.test(n)) return null;
  const rows = await query({
    $select: "license_number,license_type,entity_name,dba,address_line_1,city,county",
    $where: `license_status='Active' AND upper(license_number)='${sq(n)}'`,
    $limit: "20",
  });
  return dedupe(rows)[0] || null;
}
