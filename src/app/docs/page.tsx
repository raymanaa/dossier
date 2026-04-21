import Link from "next/link";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingNav } from "@/components/marketing-nav";

export const metadata = {
  title: "Method · Dossier",
  description:
    "How Dossier drafts a memo: six pipeline stages from URL intake to signed output.",
};

export default function MethodPage() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <MarketingNav />

      <section className="mx-auto w-full max-w-[900px] px-6 pt-16 pb-10 md:px-10">
        <div className="flex items-baseline justify-between border-b border-ink pb-3">
          <span className="label">THE METHOD · PIPELINE v7.2</span>
          <span className="mono text-[10.5px] text-ink-3">APRIL MMXXVI</span>
        </div>

        <h1 className="editorial mt-10 text-[48px] leading-[1.02] tracking-[-0.02em] text-ink md:text-[76px]">
          How the <span className="editorial-italic">press</span> works.
        </h1>
        <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.75] text-ink-2">
          Every memo Dossier publishes moves through six deterministic
          pipeline stages. Each stage is auditable; each output is linked to
          a pipeline version hash. No stage uses an unreviewed model
          completion. No claim ships without a citation.
        </p>
      </section>

      <section className="mx-auto w-full max-w-[900px] px-6 md:px-10 pb-16">
        <ol className="divide-y divide-line border-y border-line">
          <Stage
            num="01"
            label="Intake"
            title="Accept a company URL"
            body="The analyst pastes a URL. Dossier extracts canonical host, robots.txt-respecting crawl surface, and known public filings by CIK / ABN. No authenticated private surface is ever touched."
          />
          <Stage
            num="02"
            label="Extraction"
            title="Lift every factual claim"
            body="Pages are parsed into structured claims with line-level provenance. Each claim is tagged by type (valuation, team, traction, competitive), scored for primary-source weight, and de-duplicated across the site."
          />
          <Stage
            num="03"
            label="Enrichment"
            title="Cross-reference public filings"
            body="Claims are triangulated against SEC EDGAR, Companies House, LinkedIn, peer reviews, and two paid tier sheets. A claim that cannot be independently verified is either flagged or dropped — never repeated as fact."
          />
          <Stage
            num="04"
            label="Drafting"
            title="Assemble five fixed sections"
            body="The same five sections every time: Market, Competitors, Team, Traction, Risks. Section order and argument structure are templated so analysts can skim, compare, and redline across memos at IC speed."
          />
          <Stage
            num="05"
            label="Citation"
            title="Attach a superscript to every claim"
            body="Every factual statement is wired to a source entry. Hover a [n] in the rendered memo to highlight the source, its quote, and the URL. Claims without sources do not render."
          />
          <Stage
            num="06"
            label="Signature"
            title="Sign the pipeline hash"
            body="The memo is frozen against the pipeline version that produced it. Re-running the same URL on a later pipeline produces a new hash. The signed copy at /signed/<memo-id> is tamper-evident and serves as the citable artifact."
          />
        </ol>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink pt-6">
          <div>
            <div className="label">What we won&apos;t do</div>
            <ul className="mt-3 space-y-1.5 text-[13px] text-ink-2 max-w-[50ch]">
              <li>— Scrape authenticated surfaces.</li>
              <li>— Hallucinate competitive comparisons.</li>
              <li>— Ship a claim without a primary-source link.</li>
              <li>— Let the same pipeline version produce two different memos for one URL.</li>
            </ul>
          </div>
          <Link
            href="/app/new/"
            className="inline-flex items-center gap-1.5 bg-ink text-paper px-5 py-2.5 text-[13px] font-medium hover:bg-ink-2 transition-colors"
          >
            Draft a memo
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

function Stage({
  num,
  label,
  title,
  body,
}: {
  num: string;
  label: string;
  title: string;
  body: string;
}) {
  return (
    <li className="grid grid-cols-1 gap-4 py-6 md:grid-cols-[64px_160px_1fr] md:gap-10 md:py-8">
      <div className="mono text-[11px] tabular-nums text-ink-3 tracking-[0.14em] pt-1">
        {num}
      </div>
      <div>
        <div className="label">{label}</div>
      </div>
      <div>
        <h3 className="editorial text-[22px] leading-[1.2] tracking-[-0.01em] text-ink md:text-[26px]">
          {title}
          <span className="editorial-italic">.</span>
        </h3>
        <p className="mt-2 max-w-[58ch] text-[13.5px] leading-[1.75] text-ink-2">
          {body}
        </p>
      </div>
    </li>
  );
}
