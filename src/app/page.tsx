import Link from "next/link";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingNav } from "@/components/marketing-nav";
import { MEMOS } from "@/lib/memos";

export default function Landing() {
  const memo = MEMOS[0];

  const decisionTone =
    memo.decision === "advance"
      ? "var(--accent, #2e5c3a)"
      : memo.decision === "hold"
        ? "var(--warn, #b77a1f)"
        : "var(--redline, #9e2e2e)";

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <MarketingNav />

      <section className="flex-1">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10 pt-24 pb-20 md:pt-32">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.25fr_1fr] md:items-center md:gap-16">
            <div>
              <div className="label">Investment memos, drafted by agent</div>
              <h1 className="display mt-5 text-[64px] leading-[0.94] tracking-[-0.02em] md:text-[100px]">
                URL in.{" "}
                <span className="display-italic" style={{ color: "var(--accent)" }}>
                  Signed memo out.
                </span>
              </h1>
              <p className="mt-6 max-w-[44ch] text-[16px] leading-[1.65] text-ink-2">
                Paste a company URL. Dossier returns an IC memo with thesis, risks, comps — every claim cited.
              </p>
              <div className="mt-8">
                <Link
                  href="/app/new"
                  className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 text-[14px] rounded-[3px] hover:bg-ink-2 transition-colors"
                >
                  Draft a memo
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

            <div className="border border-line bg-card rounded-[3px] p-5">
              <div className="flex items-baseline justify-between">
                <span className="mono text-[10px] text-ink-3 tracking-[0.12em]">
                  {memo.sector.toUpperCase()} · {memo.round.toUpperCase()}
                </span>
                <span
                  className="mono text-[10px] font-semibold tracking-[0.14em]"
                  style={{ color: decisionTone }}
                >
                  {memo.decision.toUpperCase()}
                </span>
              </div>
              <div className="display mt-2 text-[24px] leading-tight text-ink">
                {memo.company}
              </div>
              <div className="display-italic mt-1 text-[14px] text-ink-2">
                {memo.subtitle}
              </div>
              <p className="mt-3 text-[12.5px] leading-[1.6] text-ink-2">
                {memo.summary.slice(0, 180)}
                {memo.summary.length > 180 ? "…" : ""}
              </p>
              <div className="mt-4 mono text-[10px] text-ink-3 tracking-[0.08em]">
                /s/ {memo.analyst.name} · {memo.pipeline} · #{memo.pipelineHash}
              </div>
            </div>
          </div>
        </div>

        <div className="border-y border-line">
          <div className="mx-auto max-w-[1100px] px-6 md:px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Step n="01" verb="Scrape" detail="Site, filings, news" />
            <Step n="02" verb="Synthesize" detail="Thesis, risks, comps" />
            <Step n="03" verb="Sign" detail="Reproducible from URL" />
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

function Step({ n, verb, detail }: { n: string; verb: string; detail: string }) {
  return (
    <div>
      <div className="mono text-[10.5px] text-ink-3 tracking-[0.16em]">{n}</div>
      <div className="display mt-1 text-[26px] leading-none text-ink">{verb}.</div>
      <div className="mt-1 text-[13px] text-ink-2">{detail}</div>
    </div>
  );
}
