"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiteRef, RisksSection } from "@/components/risks-section";
import type { BulletClaim, KeyStat, Memo } from "@/lib/memos";
import { decisionConfig } from "@/lib/memos";
import { risksWithBodies } from "@/lib/memo-bodies";

/**
 * SignedMemoView — the public, read-only, print-optimized version of a
 * memo. No nav, no edit surface, no outline. A watermark proves the
 * pipeline signature; print CSS strips UI chrome and lays the memo out
 * for a crisp PDF.
 */
export function SignedMemoView({ memo }: { memo: Memo }) {
  const dec = decisionConfig(memo.decision);
  const risks = risksWithBodies(memo.id, memo.risks);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") setUrl(window.location.href);
  }, []);

  return (
    <div className="signed-root min-h-screen bg-paper text-ink">
      {/* Thin public header — only visible on-screen, hidden in print */}
      <div className="signed-header border-b border-line">
        <div className="mx-auto flex max-w-[900px] items-center justify-between px-6 py-3 md:px-10">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="editorial text-[20px] leading-none text-ink">Dossier</span>
            <span className="label !text-[9px]">SIGNED MEMO</span>
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.print()}
              className="text-[11.5px] text-ink-2 hover:text-ink transition-colors"
            >
              Print / Save PDF
            </button>
            <Link
              href="/app"
              className="text-[11.5px] text-ink-3 hover:text-ink transition-colors"
            >
              Open app →
            </Link>
          </div>
        </div>
      </div>

      {/* Watermark — diagonal across the whole document */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none" aria-hidden>
        <div
          className="absolute inset-0 flex items-center justify-center opacity-[0.035]"
          style={{ transform: "rotate(-28deg)" }}
        >
          <span
            className="mono text-[170px] font-black tracking-[0.04em] text-ink whitespace-nowrap"
          >
            SIGNED · {memo.pipelineHash.toUpperCase()}
          </span>
        </div>
      </div>

      <article className="relative z-10 mx-auto max-w-[780px] px-6 py-12 md:px-10">
        {/* Masthead */}
        <header className="border-b-2 border-ink pb-5">
          <div className="flex items-baseline justify-between">
            <span className="label">DOSSIER · {memo.id.toUpperCase()}</span>
            <span className="mono text-[10.5px] text-ink-3">
              {dateLong(memo.date)}
            </span>
          </div>
        </header>

        <div className="mt-8">
          <div className="label">{memo.sector}</div>
          <h1 className="editorial mt-2 text-[44px] leading-[0.98] tracking-[-0.02em] text-ink md:text-[58px]">
            {memo.company}
          </h1>
          <p className="editorial-italic mt-2 text-[19px] leading-[1.35] text-ink-2 md:text-[22px]">
            {memo.subtitle}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 text-[11.5px] text-ink-3 md:grid-cols-4">
          <Meta label="Round">
            {memo.round}
            {memo.roundSize ? ` · ${memo.roundSize}` : ""}
          </Meta>
          <Meta label="URL">
            <span className="mono">{memo.url}</span>
          </Meta>
          <Meta label="Pipeline">
            <span className="mono">
              {memo.pipeline} · <span className="text-[color:var(--accent)]">{memo.pipelineHash}</span>
            </span>
          </Meta>
          <Meta label="Drafted in">{memo.draftedIn}</Meta>
        </div>

        {/* Decision seal inline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 220, damping: 16 }}
          className="mt-8 inline-flex items-center gap-3"
        >
          <div
            className="relative inline-flex items-center gap-2 border-[1.5px] px-4 py-2"
            style={{ borderColor: dec.dot, color: dec.ink }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-[5px] border"
              style={{ borderColor: dec.dot, opacity: 0.35 }}
            />
            <span
              className="mono text-[12px] font-bold tracking-[0.22em]"
              style={{ color: dec.ink }}
            >
              {dec.label}
            </span>
          </div>
          <span className="mono text-[10.5px] text-ink-3 tracking-[0.14em]">
            SIGNATURE VERIFIED
          </span>
        </motion.div>

        <hr className="rule my-8" />

        {/* Summary */}
        <section>
          <div className="label">Editor&apos;s summary</div>
          <p className="editorial-italic mt-3 text-[19px] leading-[1.55] text-ink md:text-[21px]">
            {memo.summary}
          </p>
          <div className="mt-5 border-l-2 border-[color:var(--accent)] bg-accent-soft/40 px-5 py-4">
            <div className="label !text-[9.5px] !tracking-[0.18em] mb-1">Decision rationale</div>
            <p className="text-[13.5px] leading-[1.65] text-ink">{memo.decisionRationale}</p>
          </div>
        </section>

        <hr className="rule my-8" />

        <SignedSection num="I" label="Market" headline={memo.market.headline}>
          <StatRow stats={memo.market.stats} />
          <Prose body={memo.market.body} />
        </SignedSection>

        <SignedSection num="II" label="Competitors" headline={memo.competitors.headline}>
          <ul className="mt-5 space-y-3">
            {memo.competitors.entries.map((c) => (
              <li key={c.name} className="grid grid-cols-[130px_1fr] gap-3 border-l-2 border-line pl-3">
                <div>
                  <div className="editorial text-[15px] text-ink">{c.name}</div>
                  <div className="mono text-[9.5px] uppercase tracking-[0.14em] text-ink-3 mt-0.5">
                    {c.stance}
                  </div>
                </div>
                <div className="text-[13px] text-ink leading-[1.65]">
                  {c.note}
                  {c.cite && <CiteRef n={c.cite} />}
                </div>
              </li>
            ))}
          </ul>
        </SignedSection>

        <SignedSection num="III" label="Team" headline={memo.team.headline}>
          <dl className="mt-5 divide-y divide-line border-y border-line">
            {memo.team.roster.map((r) => (
              <div key={r.name} className="grid grid-cols-[170px_1fr] gap-4 py-3">
                <div>
                  <div className="editorial text-[15px] text-ink">{r.name}</div>
                  <div className="mono text-[9.5px] uppercase tracking-[0.12em] text-ink-3 mt-0.5">
                    {r.role}
                  </div>
                </div>
                <dd className="text-[13px] text-ink leading-[1.65]">
                  {r.note}
                  {r.cite && <CiteRef n={r.cite} />}
                </dd>
              </div>
            ))}
          </dl>
        </SignedSection>

        <SignedSection num="IV" label="Traction" headline={memo.traction.headline}>
          <StatRow stats={memo.traction.stats} />
          <Prose body={memo.traction.body} />
        </SignedSection>

        <section className="py-6">
          <RisksSection companyName={memo.company} risks={risks} citations={memo.citations} />
        </section>

        <hr className="rule-thick mt-10" />

        {/* Signature footer */}
        <footer className="mt-6 flex flex-wrap items-baseline justify-between gap-3 text-ink-3">
          <div className="flex items-baseline gap-4">
            <img
              src={memo.analyst.avatar}
              alt={memo.analyst.name}
              className="h-9 w-9 rounded-full border border-line object-cover filter grayscale-[0.2]"
              loading="lazy"
            />
            <div>
              <div className="mono text-[11px] uppercase tracking-[0.1em] text-ink">
                {memo.analyst.name}
              </div>
              <div className="text-[11px] text-ink-3">
                {memo.analyst.role} · {memo.analyst.firm}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="mono text-[10.5px] tracking-[0.14em]">
              PIPELINE {memo.pipeline.toUpperCase()} ·{" "}
              <span className="text-[color:var(--accent)]">{memo.pipelineHash}</span>
            </div>
            <div className="mono text-[10px] mt-0.5 break-all">{url}</div>
          </div>
        </footer>
      </article>

      <style>{`
        @media print {
          html, body { background: #ffffff !important; }
          .signed-header { display: none !important; }
          a[href]::after { content: "" !important; }
        }
      `}</style>
    </div>
  );
}

function SignedSection({
  num,
  label,
  headline,
  children,
}: {
  num: string;
  label: string;
  headline: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-6 break-inside-avoid">
      <div className="flex items-baseline gap-3">
        <span className="mono text-[11px] text-ink-3 tabular-nums tracking-[0.14em]">{num}.</span>
        <span className="label">{label}</span>
      </div>
      <h2 className="editorial mt-2 text-[26px] leading-[1.15] tracking-[-0.012em] text-ink md:text-[30px]">
        {headline}
        <span className="editorial-italic">.</span>
      </h2>
      {children}
    </section>
  );
}

function StatRow({ stats }: { stats: KeyStat[] }) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-4 border-y border-line py-3 md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="min-w-0">
          <div className="label !text-[9.5px]">{s.label}</div>
          <div className="mt-1 editorial text-[22px] leading-none tabular-nums text-ink">
            {s.value}
            {s.unit && <span className="mono text-[11px] text-ink-3 ml-1 font-normal">{s.unit}</span>}
            {s.cite && <CiteRef n={s.cite} />}
          </div>
        </div>
      ))}
    </div>
  );
}

function Prose({ body }: { body: BulletClaim[] }) {
  return (
    <div className="mt-5 space-y-3 text-[13.5px] leading-[1.75] text-ink">
      {body.map((b, i) => (
        <p key={i}>
          {b.emphasis ? (
            <>
              {b.text.split(b.emphasis)[0]}
              <strong className="text-ink">{b.emphasis}</strong>
              {b.text.split(b.emphasis)[1]}
            </>
          ) : (
            b.text
          )}
          {b.cite && <CiteRef n={b.cite} />}
        </p>
      ))}
    </div>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="label !text-[9px]">{label}</div>
      <div className="mt-0.5 text-[12px] text-ink">{children}</div>
    </div>
  );
}

function dateLong(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return d
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
    .toUpperCase();
}
