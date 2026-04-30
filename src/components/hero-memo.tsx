"use client";

import { motion } from "framer-motion";

/**
 * HeroMemo — the animated diagram for the landing hero.
 *
 * Rule 2: "animated project-specific diagram" — not a feature grid.
 * This renders a newsprint-style memo page that authors itself on a
 * 12-second loop: masthead → section headers → body paragraphs →
 * citation chips flying in from the right margin → final IC-READY
 * red seal stamping in at the bottom. Then fades out, restarts.
 *
 * Implemented with CSS animations + staggered delays so it's pure
 * render — no rAF loop, no JS state, pauses cheaply when off-screen.
 */
export function HeroMemo() {
  return (
    <div className="relative">
      {/* Subtle paper texture via radial gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(185,28,28,0.04), transparent 65%)",
        }}
      />

      {/* The "printed sheet" */}
      <div className="relative mx-auto max-w-[860px] border border-line bg-card">
        {/* Corner folio marks */}
        <span
          aria-hidden
          className="absolute -left-1 -top-1 h-3 w-3 border border-[color:var(--accent)] opacity-60"
          style={{ borderRight: "none", borderBottom: "none" }}
        />
        <span
          aria-hidden
          className="absolute -right-1 -top-1 h-3 w-3 border border-[color:var(--accent)] opacity-60"
          style={{ borderLeft: "none", borderBottom: "none" }}
        />
        <span
          aria-hidden
          className="absolute -left-1 -bottom-1 h-3 w-3 border border-[color:var(--accent)] opacity-60"
          style={{ borderRight: "none", borderTop: "none" }}
        />
        <span
          aria-hidden
          className="absolute -right-1 -bottom-1 h-3 w-3 border border-[color:var(--accent)] opacity-60"
          style={{ borderLeft: "none", borderTop: "none" }}
        />

        {/* Masthead */}
        <header className="flex items-baseline justify-between border-b-2 border-ink px-8 py-5">
          <div className="flex items-baseline gap-3">
            <span className="editorial text-[22px] text-ink leading-none">
              Dossier
            </span>
            <span className="mono text-[9.5px] text-ink-3 tracking-[0.22em]">
              NO. 0042 · Q2 2026
            </span>
          </div>
          <span className="label !text-[9.5px]">INVESTMENT MEMO · DRAFT</span>
        </header>

        {/* Two-column editorial grid */}
        <div className="grid grid-cols-[1fr_180px] gap-8 px-8 py-8 md:py-10">
          {/* Main column */}
          <div className="relative min-h-[360px]">
            {/* Company name — the "title" of the memo */}
            <div className="stage stage-title">
              <div className="label">SUBJECT</div>
              <h2 className="editorial mt-1 text-[34px] leading-[1.05] tracking-[-0.02em] text-ink md:text-[40px]">
                Thatch, Inc.
                <span className="text-ink-3"> — </span>
                <span className="editorial-italic">seed round.</span>
              </h2>
            </div>

            <hr className="rule my-5" />

            {/* Sections author themselves sequentially */}
            <Section
              delay="1.4s"
              index="I"
              label="Market"
              title="Fragmented global TAM"
              lines={[
                ["$4.2B growing 18% YoY", 1],
                ["Top three incumbents hold 22% combined share", 2],
                ["Primary demand driver is a 2024 regulatory shift", 3],
              ]}
            />

            <Section
              delay="3.0s"
              index="II"
              label="Competitors"
              title="Two credible, one credible-by-acquisition"
              lines={[
                ["Cobalt — enterprise-first, 180 logos", 4],
                ["Keel — bottom-up, 340% net revenue retention", 5],
                ["Aperture — rumoured acquirer", 6],
              ]}
            />

            <Section
              delay="4.6s"
              index="III"
              label="Team"
              title="Founder/CTO shipped two prior B2B exits"
              lines={[
                ["Maya Alves · ex-Stripe, 7 yrs · payments infra", 7],
                ["Priya Patel · ex-Plaid, led ledger v2", 8],
              ]}
            />
          </div>

          {/* Right margin — citations dock as they're emitted */}
          <aside className="relative">
            <div className="label !text-[9.5px]">SOURCES</div>
            <ol className="mt-3 space-y-3 text-[11.5px] text-ink-2 leading-[1.55]">
              <CiteItem n={1} delay="1.9s" text="TAM tracker · Mar 2026" />
              <CiteItem n={2} delay="2.3s" text="S1 filings · aggregated" />
              <CiteItem n={3} delay="2.7s" text="HR-5241 · §3(c)" />
              <CiteItem n={4} delay="3.5s" text="Cobalt press · Jan 2026" />
              <CiteItem n={5} delay="3.9s" text="Keel investor letter" />
              <CiteItem n={6} delay="4.3s" text="Ip.ox.rumor · K. Wu" />
              <CiteItem n={7} delay="5.1s" text="LinkedIn · verified" />
              <CiteItem n={8} delay="5.5s" text="Plaid blog · 2024-08" />
            </ol>
          </aside>
        </div>

        {/* Bottom bar + IC-ready seal */}
        <div className="flex items-center justify-between border-t border-line px-8 py-4">
          <span className="mono text-[10.5px] text-ink-3 tracking-[0.16em]">
            PIPELINE v7.2 · 4f8c9e1 · 12 SOURCES
          </span>
          <div className="seal">
            <span className="seal-ring" aria-hidden />
            <span className="seal-text">IC · READY</span>
          </div>
        </div>
      </div>

      <style>{`
        /* Everything inside the hero runs on a synchronized 12s loop. */

        .stage {
          opacity: 0;
          transform: translateY(8px);
          animation: stage-life 12s linear infinite both;
        }
        .stage-title { animation-delay: 0s; }

        @keyframes stage-life {
          0%, 2%   { opacity: 0; transform: translateY(8px); }
          6%       { opacity: 1; transform: translateY(0); }
          86%      { opacity: 1; transform: translateY(0); }
          94%      { opacity: 0; transform: translateY(-6px); }
          100%     { opacity: 0; transform: translateY(-6px); }
        }

        .sec {
          opacity: 0;
          transform: translateY(10px);
          animation: stage-life 12s linear infinite both;
        }
        .sec .line {
          opacity: 0;
          transform: translateY(4px);
          animation: line-life 12s linear infinite both;
        }

        @keyframes line-life {
          0%, 2%   { opacity: 0; transform: translateY(4px); }
          8%       { opacity: 1; transform: translateY(0); }
          86%      { opacity: 1; transform: translateY(0); }
          94%      { opacity: 0; }
          100%     { opacity: 0; }
        }

        /* Citation items in the right margin */
        .cite-item {
          opacity: 0;
          transform: translateX(10px);
          animation: cite-life 12s linear infinite both;
        }
        @keyframes cite-life {
          0%, 2%   { opacity: 0; transform: translateX(10px); }
          9%       { opacity: 1; transform: translateX(0); }
          86%      { opacity: 1; transform: translateX(0); }
          94%      { opacity: 0; transform: translateX(-4px); }
          100%     { opacity: 0; transform: translateX(-4px); }
        }
        .cite-item .num {
          color: var(--accent);
          font-family: var(--font-mono), monospace;
          font-weight: 600;
          font-size: 10.5px;
        }

        /* IC-READY seal: pops in at the end, then holds */
        .seal {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 14px;
          border: 1.5px solid var(--accent);
          color: var(--accent);
          transform: rotate(-4deg) scale(0.8);
          opacity: 0;
          letter-spacing: 0.22em;
          font-family: var(--font-mono), monospace;
          font-size: 10.5px;
          font-weight: 700;
          animation: seal-life 12s linear infinite both;
          animation-delay: 0.5s;
        }
        .seal-ring {
          position: absolute;
          inset: -5px;
          border: 1px solid var(--accent);
          opacity: 0.35;
          pointer-events: none;
        }
        @keyframes seal-life {
          0%, 55%   { opacity: 0; transform: rotate(-4deg) scale(0.6); }
          62%       { opacity: 1; transform: rotate(-4deg) scale(1.08); }
          66%       { opacity: 1; transform: rotate(-4deg) scale(1);    }
          86%       { opacity: 1; transform: rotate(-4deg) scale(1); }
          94%       { opacity: 0; transform: rotate(-4deg) scale(0.94); }
          100%      { opacity: 0; transform: rotate(-4deg) scale(0.94); }
        }
      `}</style>
    </div>
  );
}

function Section({
  delay,
  index,
  label,
  title,
  lines,
}: {
  delay: string;
  index: string;
  label: string;
  title: string;
  lines: [string, number][];
}) {
  return (
    <div className="sec mt-6" style={{ animationDelay: delay }}>
      <div className="flex items-baseline gap-3">
        <span className="mono text-[10.5px] text-ink-3 tabular-nums tracking-[0.14em]">
          {index}.
        </span>
        <span className="label">{label}</span>
      </div>
      <h3 className="editorial mt-1 text-[18px] leading-[1.25] tracking-[-0.008em] text-ink">
        {title}
      </h3>
      <ul className="mt-3 space-y-1.5">
        {lines.map(([text, n], i) => (
          <li
            key={i}
            className="line flex items-baseline gap-2 text-[13px] leading-[1.6] text-ink"
            style={{ animationDelay: `calc(${delay} + ${0.25 * (i + 1)}s)` }}
          >
            <span aria-hidden className="mt-[3px] h-[3px] w-[3px] rounded-full bg-ink-3" />
            <span>
              {text}
              <sup className="cite">[{n}]</sup>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CiteItem({
  n,
  delay,
  text,
}: {
  n: number;
  delay: string;
  text: string;
}) {
  return (
    <li className="cite-item flex items-start gap-2" style={{ animationDelay: delay }}>
      <span className="num">[{n}]</span>
      <span className="leading-[1.55]">{text}</span>
    </li>
  );
}
