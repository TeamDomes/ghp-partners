import Link from "next/link";
import { ORG } from "@/lib/content";

export default function Thanks({ searchParams }: { searchParams: { id?: string } }) {
  const id = searchParams.id;
  return (
    <main className="wrap narrow" style={{ paddingTop: 72, paddingBottom: 72 }}>
      <span className="eyebrow">Thank you</span>
      <h1>Your plan is ready.</h1>
      <p style={{ fontSize: "1.15rem", color: "var(--ink-2)" }}>
        Download your Community Impact Plan below. Review it, make any edits for your business, and include it with your
        OCM renewal. {ORG.name} will be in touch about your first contribution.
      </p>
      {id ? (
        <p style={{ marginTop: 28 }}>
          <a className="btn" href={`/api/plan/${id}`}>Download plan (.docx)</a>
        </p>
      ) : null}
      <p style={{ color: "var(--ink-2)", fontSize: ".93rem", marginTop: 24 }}>
        Save this page&apos;s link — you can re-download your plan from it anytime.
      </p>
      <p style={{ marginTop: 40 }}><Link href="/">← Back to start</Link></p>
    </main>
  );
}
