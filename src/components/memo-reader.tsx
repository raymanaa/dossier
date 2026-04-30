"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Download, Printer, Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { MemoOutline } from "@/components/memo-outline";
import { CiteRef, RisksSection } from "@/components/risks-section";
import type {
  BulletClaim,
  KeyStat,
  Memo,
} from "@/lib/memos";
import { decisionConfig } from "@/lib/memos";
import { risksWithBodies } from "@/lib/memo-bodies";

export function MemoReader({ memo }: { memo: Memo }) {
  const dec = decisionConfig(memo.decision);
  const risks = risksWithBodies(memo.id, memo.risks);
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 pb-24 pt-10 md:px-10 lg:grid-cols-[1fr_220px] lg:gap-14">
      {/* Main column */}
      <article className="min-w-0">
        {/* Breadcrumb + actions bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <Link
            href="/app"
            className="group inline-flex items-center gap-1.5 text-[12px] text-ink-3 hover:text-ink transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
            <span className="label !text-[10px] group-hover:text-ink">All memos</span>
          </Link>
          <div className="flex items-center gap-2">
            <ReaderAction icon={Share2} label="Share" onClick={() => setShareOpen(true)} />
            <ReaderAction icon={Printer} label="Print" onClick={() => window.print()} />
            <ReaderAction icon={Download} label="Export" onClick={() => {}} />
          </div>
        </div>

        {/* Masthead */}
        <header className="pt-10 pb-8">
          <div className="flex items-baseline justify-between border-b border-ink pb-3">
            <span className="label">DOSSIER · {memo.id.toUpperCase()}</span>
            <span className="mono text-[10.5px] text-ink-3 tabular-nums">
              {dateLong(memo.date)}
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-2">
            <div className="label">{memo.sector}</div>
            <h1 className="editorial text-[44px] leading-[0.98] tracking-[-0.02em] text-ink md:text-[64px]">
              {memo.company}
            </h1>
            <p className="editorial-italic mt-2 text-[20px] leading-[1.35] text-ink-2 md:text-[24px]">
              {memo.subtitle}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-line pt-5 text-[12px] text-ink-3">
            <Meta label="Round">{memo.round}{memo.roundSize ? ` · ${memo.roundSize}` : ""}</Meta>
            <Meta label="URL">
              <a
                href={`https://${memo.url}`}
                target="_blank"
                rel="noreferrer"
                className="mono text-ink-2 hover:text-[color:var(--accent)] transition-colors"
              >
                {memo.url} ↗
              </a>
            </Meta>
            <Meta label="Drafted in">{memo.draftedIn}</Meta>
            <Meta label="Pipeline">
              <span className="mono">
                {memo.pipeline} ·{" "}
                <span className="text-[color:var(--accent)]">{memo.pipelineHash}</span>
              </span>
            </Meta>
          </div>

          {/* Analyst + decision strip */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex items-center gap-4">
              <img
                src={memo.analyst.avatar}
                alt={`${memo.analyst.name} portrait`}
                className="h-14 w-14 rounded-full border border-line object-cover filter grayscale-[0.15]"
                loading="lazy"
              />
              <div>
                <div className="mono text-[11px] uppercase tracking-[0.1em] text-ink">
                  {memo.analyst.name}
                </div>
                <div className="text-[12px] text-ink-3">
                  {memo.analyst.role} · {memo.analyst.firm}
                </div>
                {memo.redlinedBy && (
                  <div className="mt-0.5 text-[11px] text-ink-3">
                    Redlined by <span className="editorial-italic text-ink-2">{memo.redlinedBy}</span>
                  </div>
                )}
              </div>
            </div>

            <DecisionSeal decision={memo.decision} dec={dec} />
          </div>
        </header>

        {/* Summary */}
        <section id="summary" className="scroll-mt-24 py-8">
          <SectionHead num="§" label="Editor's summary" />
          <p className="editorial-italic mt-4 max-w-[66ch] text-[20px] leading-[1.5] text-ink md:text-[22px]">
            {memo.summary}
          </p>
          <div className="mt-6 border-l-2 border-[color:var(--accent)] bg-accent-soft/40 px-5 py-4 max-w-[66ch]">
            <div className="label !text-[9.5px] !tracking-[0.18em] mb-1.5">Decision rationale</div>
            <p className="text-[14px] leading-[1.65] text-ink">
              {memo.decisionRationale}
            </p>
          </div>
        </section>

        <hr className="rule my-4" />

        {/* Market */}
        <section id="market" className="scroll-mt-24 py-10">
          <SectionHead num="I" label="Market" />
          <h2 className="editorial mt-3 text-[30px] leading-[1.15] tracking-[-0.012em] text-ink md:text-[36px]">
            {memo.market.headline}
            <span className="editorial-italic">.</span>
          </h2>
          <StatGrid stats={memo.market.stats} />
          <Prose body={memo.market.body} />
        </section>

        <hr className="rule my-4" />

        {/* Competitors */}
        <section id="competitors" className="scroll-mt-24 py-10">
          <SectionHead num="II" label="Competitors" />
          <h2 className="editorial mt-3 text-[30px] leading-[1.15] tracking-[-0.012em] text-ink md:text-[36px]">
            {memo.competitors.headline}
            <span className="editorial-italic">.</span>
          </h2>
          <div className="mt-6 overflow-hidden border border-line">
            <table className="w-full text-left text-[13.5px]">
              <thead className="border-b border-line">
                <tr className="text-ink-3">
                  <th className="label !text-[9.5px] px-5 py-3 w-[44px]">#</th>
                  <th className="label !text-[9.5px] px-5 py-3">Entity</th>
                  <th className="label !text-[9.5px] hidden px-5 py-3 md:table-cell">Stance</th>
                  <th className="label !text-[9.5px] px-5 py-3">Note</th>
                </tr>
              </thead>
              <tbody>
                {memo.competitors.entries.map((c, i) => (
                  <tr key={c.name} className="border-b border-line last:border-b-0 align-top">
                    <td className="mono text-[11px] text-ink-3 tabular-nums px-5 py-4">0{i + 1}</td>
                    <td className="px-5 py-4">
                      <div className="editorial text-[17px] leading-[1.25] text-ink">{c.name}</div>
                    </td>
                    <td className="hidden px-5 py-4 md:table-cell">
                      <StanceChip stance={c.stance} />
                    </td>
                    <td className="px-5 py-4 text-ink leading-[1.6] max-w-[40ch]">
                      {c.note}
                      {c.cite && <CiteRef n={c.cite} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <hr className="rule my-4" />

        {/* Team */}
        <section id="team" className="scroll-mt-24 py-10">
          <SectionHead num="III" label="Team" />
          <h2 className="editorial mt-3 text-[30px] leading-[1.15] tracking-[-0.012em] text-ink md:text-[36px]">
            {memo.team.headline}
            <span className="editorial-italic">.</span>
          </h2>
          <dl className="mt-6 divide-y divide-line border-y border-line">
            {memo.team.roster.map((r) => (
              <div key={r.name} className="grid grid-cols-1 gap-2 py-4 md:grid-cols-[220px_1fr] md:gap-8">
                <div>
                  <div className="editorial text-[17px] leading-tight text-ink">{r.name}</div>
                  <div className="mono text-[10.5px] uppercase tracking-[0.1em] text-ink-3 mt-0.5">
                    {r.role}
                  </div>
                </div>
                <dd className="text-[14px] leading-[1.7] text-ink max-w-[56ch]">
                  {r.note}
                  {r.cite && <CiteRef n={r.cite} />}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <hr className="rule my-4" />

        {/* Traction */}
        <section id="traction" className="scroll-mt-24 py-10">
          <SectionHead num="IV" label="Traction" />
          <h2 className="editorial mt-3 text-[30px] leading-[1.15] tracking-[-0.012em] text-ink md:text-[36px]">
            {memo.traction.headline}
            <span className="editorial-italic">.</span>
          </h2>
          <StatGrid stats={memo.traction.stats} />
          <Prose body={memo.traction.body} />
        </section>

        <hr className="rule my-4" />

        {/* Risks (live component) */}
        <section id="risks" className="scroll-mt-24 py-10">
          <RisksSection
            companyName={memo.company}
            risks={risks}
            citations={memo.citations}
          />
        </section>

        {/* Sources dock */}
        <section id="sources" className="scroll-mt-24 pb-10 pt-4">
          <SectionHead num="∎" label={`Sources · ${memo.citations.length}`} />
          <ol className="mt-6 grid grid-cols-1 gap-x-10 gap-y-3 text-[12.5px] text-ink-2 md:grid-cols-2">
            {memo.citations.map((c) => (
              <li
                key={c.n}
                className="flex gap-3 border-l-2 border-transparent pl-3"
              >
                <span className="mono text-[11px] font-semibold text-[color:var(--accent)] pt-[2px]">
                  [{c.n}]
                </span>
                <span className="leading-[1.5]">
                  {c.source}
                  {c.quote && (
                    <span className="block mt-1 text-[11.5px] italic text-ink-3">
                      &ldquo;{c.quote}&rdquo;
                    </span>
                  )}
                  {c.url && (
                    <a
                      href={`https://${c.url.replace(/^https?:\/\//, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block mono text-[10.5px] text-ink-3 hover:text-[color:var(--accent)]"
                    >
                      {c.url} ↗
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <hr className="rule-thick mt-12" />
        <footer className="flex flex-wrap items-baseline justify-between gap-3 pt-4">
          <span className="mono text-[10.5px] text-ink-3 tracking-[0.16em]">
            PIPELINE {memo.pipeline.toUpperCase()} ·{" "}
            <span className="text-[color:var(--accent)]">{memo.pipelineHash}</span> ·{" "}
            {memo.citations.length} SOURCES
          </span>
          <span className="editorial-italic text-[13px] text-ink-3">
            End of memo.
          </span>
        </footer>
      </article>

      {/* Scroll-pinned outline (right rail) */}
      <div className="hidden lg:block">
        <MemoOutline pipelineHash={memo.pipelineHash} />
      </div>

      {shareOpen && (
        <ShareDialog memo={memo} onClose={() => setShareOpen(false)} />
      )}
    </div>
  );
}

function ReaderAction({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 border border-line bg-card px-3 py-1.5 text-[11.5px] text-ink-2 hover:border-line-2 hover:text-ink transition-colors"
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
      <span>{label}</span>
    </button>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <div className="label !text-[9.5px]">{label}</div>
      <div className="mt-0.5 text-[13px] text-ink">{children}</div>
    </div>
  );
}

function SectionHead({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="mono text-[11px] text-ink-3 tabular-nums tracking-[0.14em]">{num}</span>
      <span className="label">{label}</span>
    </div>
  );
}

function StatGrid({ stats }: { stats: KeyStat[] }) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-6 border-y border-line py-5 md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="min-w-0">
          <div className="label !text-[9.5px]">{s.label}</div>
          <div className="mt-1 editorial text-[28px] leading-none tabular-nums text-ink">
            {s.value}
            {s.unit && (
              <span className="mono text-[12px] text-ink-3 ml-1 font-normal">
                {s.unit}
              </span>
            )}
            {s.cite && <CiteRef n={s.cite} />}
          </div>
        </div>
      ))}
    </div>
  );
}

function Prose({ body }: { body: BulletClaim[] }) {
  return (
    <div className="mt-6 space-y-4 max-w-[66ch] text-[15px] leading-[1.75] text-ink">
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

function DecisionSeal({
  decision,
  dec,
}: {
  decision: "advance" | "hold" | "pass";
  dec: { label: string; dot: string; ink: string };
}) {
  const ringColor = decision === "pass" ? "#8a8a8a" : dec.dot;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
      animate={{ opacity: 1, scale: 1, rotate: -4 }}
      transition={{ delay: 0.35, type: "spring", stiffness: 200, damping: 14 }}
      className="relative inline-flex self-start md:self-auto"
    >
      <div
        className="relative inline-flex items-center gap-2 border-[1.5px] px-4 py-2"
        style={{ borderColor: ringColor, color: dec.ink }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-[5px] border"
          style={{ borderColor: ringColor, opacity: 0.35 }}
        />
        <span
          className="mono text-[12px] font-bold tracking-[0.22em]"
          style={{ color: dec.ink }}
        >
          {dec.label}
        </span>
      </div>
    </motion.div>
  );
}

function StanceChip({ stance }: { stance: "incumbent" | "peer" | "acquirer" }) {
  const cfg = {
    incumbent: { label: "INCUMBENT", ink: "#7f1d1d" },
    peer: { label: "PEER", ink: "#565656" },
    acquirer: { label: "ACQUIRER", ink: "#7c2d12" },
  }[stance];
  return (
    <span
      className="label !text-[9.5px] !tracking-[0.16em]"
      style={{ color: cfg.ink }}
    >
      {cfg.label}
    </span>
  );
}

function ShareDialog({ memo, onClose }: { memo: Memo; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/signed/${memo.slug}/`
      : `/signed/${memo.slug}/`;

  return (
    <div
      role="dialog"
      aria-modal
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-6 w-full max-w-[520px] border border-line bg-card"
      >
        <div className="flex items-baseline justify-between border-b border-line px-5 py-3">
          <span className="label">Share · signed memo</span>
          <button
            onClick={onClose}
            className="mono text-[11px] text-ink-3 hover:text-ink"
          >
            ✕
          </button>
        </div>
        <div className="px-5 py-5">
          <p className="text-[13px] text-ink-2">
            Anyone with this link can read the signed version of {memo.company}&apos;s memo. Tamper-evident; redactions preserved.
          </p>
          <div className="mt-4 flex items-center gap-2 border border-line bg-paper-2 px-3 py-2.5">
            <span className="mono text-[11.5px] text-ink truncate flex-1">{url}</span>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(url);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1400);
                } catch {
                  /* noop */
                }
              }}
              className="shrink-0 bg-ink text-paper px-3 py-1 text-[11px] font-medium hover:bg-ink-2 transition-colors"
            >
              {copied ? "COPIED" : "COPY"}
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between text-[11px] text-ink-3">
            <span className="mono">
              pipeline {memo.pipeline} ·{" "}
              <span className="text-[color:var(--accent)]">{memo.pipelineHash}</span>
            </span>
            <Link
              href={`/signed/${memo.slug}/`}
              className="mono hover:text-[color:var(--accent)]"
            >
              preview ↗
            </Link>
          </div>
        </div>
      </motion.div>
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
