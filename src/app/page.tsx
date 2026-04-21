import Link from "next/link";
import { HeroMemo } from "@/components/hero-memo";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingNav } from "@/components/marketing-nav";
import { RecentPresses } from "@/components/recent-presses";
import { CiteRef, RisksSection } from "@/components/risks-section";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <MarketingNav />

      {/* ────────── HERO ────────── */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-6 pt-12 pb-8 md:px-8 md:pt-16">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="label">VOL. α · NO. 1</span>
            <span className="label">APRIL MMXXVI</span>
            <span className="label">INVESTMENT MEMOS · AUTHORED BY AGENT</span>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_1fr] md:items-start md:gap-16">
            {/* Left: headline + lede + CTAs + stats */}
            <div>
              <h1 className="editorial text-[56px] leading-[0.98] tracking-[-0.022em] text-ink md:text-[88px]">
                Paste a URL.
                <br />
                <span className="editorial-italic">Walk away</span>
                <br />
                <span className="editorial">with a memo.</span>
              </h1>

              <p className="mt-6 max-w-[56ch] text-[14.5px] leading-[1.7] text-ink-2 md:text-[16px]">
                Dossier reads a company's public surface, assembles a
                structured IC-grade memo in five fixed sections, and cites
                every factual claim. Built for analysts who'd rather argue
                than research.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/app"
                  className="inline-flex items-center gap-1.5 bg-ink text-paper px-5 py-2.5 text-[13.5px] font-medium hover:bg-ink-2 transition-colors"
                >
                  <span>Open the press</span>
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex items-center gap-1.5 border border-line bg-card px-5 py-2.5 text-[13.5px] text-ink-2 hover:border-line-2 hover:text-ink transition-colors"
                >
                  <span>Read the method</span>
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3 text-[11.5px] text-ink-3">
                <Stat value="5" unit="sections" label="Market · Competitors · Team · Traction · Risks" />
                <Stat value="12" unit="sources avg." label="Every claim cited in-line" />
                <Stat value="90s" unit="first draft" label="From URL to redline" />
              </div>
            </div>

            {/* Right: "In this issue" — real product component with byline photos */}
            <div className="relative">
              <RecentPresses />
              <p className="mt-4 max-w-[38ch] text-[11.5px] leading-[1.6] text-ink-3">
                Live from <span className="mono text-ink-2">/app</span>. Hover
                a row to preview the memo; click to open the signed version.
              </p>
            </div>
          </div>

          {/* ─── THE ANIMATED HERO DIAGRAM ─── */}
          <div className="mt-16 md:mt-20">
            <HeroMemo />
          </div>
        </div>
      </section>

      {/* ────────── TESTIMONIAL (portrait + pull-quote) ────────── */}
      <section className="mx-auto max-w-[1200px] px-6 md:px-8 pt-24 pb-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr] md:gap-16 md:items-center">
          <figure className="relative max-w-[220px]">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Maya Alves — Associate, Sable Capital"
              className="block w-full aspect-[4/5] object-cover filter grayscale-[0.4] contrast-[1.05]"
              loading="lazy"
            />
            <figcaption className="mt-3 flex items-baseline justify-between pb-1 border-b border-line">
              <span className="mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
                PLATE I
              </span>
              <span className="mono text-[10px] text-ink-3">APR · MMXXVI</span>
            </figcaption>
            <div className="mt-1.5 editorial-italic text-[13px] text-ink">
              Maya Alves
            </div>
            <div className="text-[11px] text-ink-3">
              Associate · Sable Capital
            </div>
          </figure>

          <blockquote className="relative">
            <span
              aria-hidden
              className="editorial absolute -left-1 -top-8 text-[140px] leading-none text-[color:var(--accent)] opacity-15 select-none"
            >
              "
            </span>
            <p className="editorial-italic text-[24px] leading-[1.35] tracking-[-0.008em] text-ink md:text-[28px]">
              By the time I'd finished my first-pass memo on Thatch, the IC
              had already voted on two other deals. This quarter I'm
              shipping them in ninety seconds.
            </p>
            <footer className="mt-5 flex flex-wrap items-baseline gap-4 text-[12px] text-ink-3">
              <span className="label !tracking-[0.16em]">— M. ALVES</span>
              <span aria-hidden className="text-ink-4">·</span>
              <span>drafted MEMO-0042 in 1m 24s</span>
              <span aria-hidden className="text-ink-4">·</span>
              <span className="mono">
                pipeline v7.2 ·{" "}
                <span className="text-[color:var(--accent)]">4f8c9e1</span>
              </span>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ────────── METHOD LEDE ────────── */}
      <section className="mx-auto max-w-[1200px] px-6 md:px-8 pt-20 pb-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.6fr] md:gap-16">
          <div>
            <div className="label">The method</div>
            <h2 className="editorial mt-3 text-[34px] leading-[1.1] tracking-[-0.016em] text-ink md:text-[44px]">
              No more black-box{" "}
              <span className="editorial-italic">vibes-check.</span>
            </h2>
          </div>
          <div className="text-[14px] leading-[1.75] text-ink-2 max-w-[58ch] md:text-[15px]">
            Every memo cites sources. Every risk is graded. Every decision is
            traceable to the pipeline version that produced it. A junior
            analyst gets the same structural rigor a partner writes after
            twenty years. A partner gets to skim ninety seconds of evidence
            instead of re-deriving it.
          </div>
        </div>
      </section>

      {/* ────────── INLINE PRODUCT COMPONENT ────────── */}
      <section className="mx-auto max-w-[1200px] px-6 md:px-8 pt-12 pb-8">
        <div className="mb-6 flex items-baseline justify-between">
          <div className="label">Specimen · risks section</div>
          <div className="label !tracking-[0.16em]">
            RENDERED FROM <span className="mono text-ink-2">/app</span> · NOT A SCREENSHOT
          </div>
        </div>
        <RisksSection
          companyName="Thatch, Inc."
          risks={DEMO_RISKS}
          citations={DEMO_CITATIONS}
        />
        <p className="mt-5 text-[12.5px] leading-[1.6] text-ink-3 max-w-[56ch]">
          The component above is imported from the app — the same{" "}
          <code className="mono text-ink-2">{"<RisksSection>"}</code> your
          analysts read at 9am on the day of IC. Hover any{" "}
          <span className="cite">[n]</span> to highlight its source.
        </p>
      </section>

      {/* ────────── CLOSING ────────── */}
      <section className="mx-auto max-w-[1200px] px-6 md:px-8 pt-24 pb-4">
        <div className="mx-auto max-w-[660px] text-center">
          <div className="label">Press · α</div>
          <h2 className="editorial mt-4 text-[40px] leading-[1.08] tracking-[-0.02em] text-ink md:text-[56px]">
            Your next IC{" "}
            <span className="editorial-italic">starts a line at a time.</span>
          </h2>
          <p className="mt-5 text-[14.5px] leading-[1.7] text-ink-2">
            Seed a URL. Watch Dossier draft. Redline. Share the memo. The
            pipeline version signs itself.
          </p>
          <div className="mt-8 inline-flex items-center gap-3">
            <Link
              href="/app"
              className="inline-flex items-center gap-1.5 bg-ink text-paper px-6 py-3 text-[14px] font-medium hover:bg-ink-2 transition-colors"
            >
              <span>Open the press</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

function Stat({
  value,
  unit,
  label,
}: {
  value: string;
  unit: string;
  label: string;
}) {
  return (
    <div className="min-w-0">
      <div className="editorial text-[28px] leading-none tabular-nums text-ink">
        {value}
        <span className="mono text-[11px] text-ink-3 ml-1 font-normal tabular-nums">
          {unit}
        </span>
      </div>
      <div className="mt-1 text-[11px] text-ink-3 max-w-[22ch]">{label}</div>
    </div>
  );
}

const DEMO_RISKS: Parameters<typeof RisksSection>[0]["risks"] = [
  {
    id: "r-regulatory",
    severity: "high",
    title: "Regulatory shift could flip from tailwind to headwind in 18 months",
    body: (
      <>
        Thatch's primary growth driver is a 2024 regulatory carve-out that
        mandates transparent pricing disclosures<CiteRef n={1} /> — the
        product is structurally built around that mandate. A draft
        amendment tabled by the House Financial Services Committee in
        February 2026 would exempt firms under $200M AUM<CiteRef n={2} />,
        removing roughly <strong className="text-ink">41%</strong> of
        Thatch's addressable pipeline.
      </>
    ),
  },
  {
    id: "r-moat",
    severity: "moderate",
    title: "Defensibility of the data pipeline is unclear past 24 months",
    body: (
      <>
        The company cites a proprietary ingestion stack built on
        public-filings data that is already exposed via SEC EDGAR APIs
        <CiteRef n={3} /> and two paid providers<CiteRef n={4} />. The
        technical team is excellent, but nothing in the disclosed stack
        prevents a well-capitalized competitor from replicating the
        pipeline once the regulatory tailwind normalizes.
      </>
    ),
  },
  {
    id: "r-team",
    severity: "low",
    title: "Concentration risk on founding CTO",
    body: (
      <>
        Maya Alves<CiteRef n={5} /> holds 62% of architectural decision
        authority per the published engineering charter<CiteRef n={6} />.
        While her track record is strong (Stripe payments, 7yrs, 40M QPS
        migration), the organization lacks a named deputy. Succession risk
        is mitigable and typical for this stage; flagged for IC awareness,
        not veto.
      </>
    ),
  },
];

const DEMO_CITATIONS: Parameters<typeof RisksSection>[0]["citations"] = [
  { n: 1, source: "HR-5241 · Transparent Pricing Act · §3(c)", url: "congress.gov/bill/118/hr-5241", accessed: "2026-04-02" },
  { n: 2, source: "Draft amendment FSC-226 · Feb 2026 mark-up", url: "financialservices.house.gov/markups/FSC-226", quote: "…exempt firms whose assets under management do not exceed…", accessed: "2026-02-28" },
  { n: 3, source: "SEC EDGAR developer docs · public API surface", url: "sec.gov/edgar/developer", accessed: "2026-04-05" },
  { n: 4, source: "Intrinio & FactSet data-provider tier sheets", accessed: "2026-03-28" },
  { n: 5, source: "LinkedIn · Maya Alves (verified)", url: "linkedin.com/in/mayaalves", accessed: "2026-04-18" },
  { n: 6, source: "Thatch engineering handbook v0.4 · §1.2 architecture authority", url: "handbook.thatch.co/v0.4", accessed: "2026-04-18" },
];
