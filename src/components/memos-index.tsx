"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { type Decision, type Memo, decisionConfig } from "@/lib/memos";

const FILTERS: { id: Decision | "all"; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "advance", label: "ADVANCE" },
  { id: "hold", label: "HOLD" },
  { id: "pass", label: "PASS" },
];

export function MemosIndex({ memos }: { memos: Memo[] }) {
  const [filter, setFilter] = useState<Decision | "all">("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return memos.filter((m) => {
      if (filter !== "all" && m.decision !== filter) return false;
      if (q) {
        const h = `${m.company} ${m.subtitle} ${m.sector} ${m.analyst.name} ${m.round}`.toLowerCase();
        if (!h.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [memos, filter, q]);

  const byDecision = useMemo(() => {
    return memos.reduce(
      (acc, m) => {
        acc[m.decision]++;
        return acc;
      },
      { advance: 0, hold: 0, pass: 0 } as Record<Decision, number>,
    );
  }, [memos]);

  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-24 pt-10 md:px-10">
      {/* Masthead */}
      <div className="flex items-baseline justify-between border-b border-ink pb-3">
        <span className="label">VOL. α · INDEX OF MEMOS</span>
        <span className="mono text-[10.5px] text-ink-3 tabular-nums">
          {todayLong()}
        </span>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h1 className="editorial text-[56px] leading-[0.98] tracking-[-0.02em] text-ink md:text-[76px]">
            Memos<span className="editorial-italic">.</span>
          </h1>
          <p className="mt-3 max-w-[54ch] text-[14.5px] leading-[1.7] text-ink-2">
            Every memo drafted, redlined, and signed by the pipeline. Filter
            by decision or search by company, analyst, or sector.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-[11px] text-ink-3">
          <DeckStat
            label="Advance"
            count={byDecision.advance}
            dot="var(--accent)"
          />
          <DeckStat label="Hold" count={byDecision.hold} dot="#d97706" />
          <DeckStat label="Pass" count={byDecision.pass} dot="#8a8a8a" />
        </div>
      </div>

      {/* Filter bar */}
      <div className="mt-10 flex flex-wrap items-center gap-4 border-y border-line py-3">
        <div className="flex items-center gap-1.5">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={[
                  "label !text-[10px] !tracking-[0.18em] px-3 py-1.5 transition-colors",
                  active
                    ? "text-ink"
                    : "text-ink-3 hover:text-ink-2",
                ].join(" ")}
                style={
                  active
                    ? {
                        boxShadow: "inset 0 -2px 0 0 var(--accent)",
                      }
                    : undefined
                }
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-2 border border-line bg-card px-3 py-1.5 w-full md:w-auto">
          <Search className="h-3.5 w-3.5 text-ink-3" strokeWidth={1.75} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search company, analyst, sector"
            className="min-w-[240px] bg-transparent text-[13px] text-ink placeholder:text-ink-3 outline-none"
          />
        </div>
      </div>

      {/* Memos list */}
      {filtered.length === 0 ? (
        <div className="mt-20 border border-dashed border-line-2 px-8 py-16 text-center">
          <div className="editorial-italic text-[22px] text-ink-3">
            No memos match that filter.
          </div>
          <button
            onClick={() => {
              setFilter("all");
              setQ("");
            }}
            className="mt-4 text-[12px] text-[color:var(--accent)] hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <ol className="mt-8 divide-y divide-line border-y border-line">
          {filtered.map((m, i) => (
            <MemoRow key={m.id} memo={m} index={i + 1} />
          ))}
        </ol>
      )}

      {/* Footer note */}
      <div className="mt-10 flex flex-wrap items-baseline justify-between gap-2">
        <span className="mono text-[10.5px] text-ink-3 tracking-[0.16em]">
          PIPELINE v7.2 · {filtered.length} OF {memos.length} MEMOS SHOWN
        </span>
        <Link
          href="/app/new"
          className="inline-flex items-center gap-1.5 bg-ink text-paper px-4 py-2 text-[12.5px] font-medium hover:bg-ink-2 transition-colors"
        >
          <span>Draft a memo</span>
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}

function MemoRow({ memo, index }: { memo: Memo; index: number }) {
  const dec = decisionConfig(memo.decision);
  return (
    <motion.li
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index, 8) * 0.04 }}
      className="group relative"
    >
      <Link
        href={`/app/${memo.slug}/`}
        className="grid grid-cols-1 gap-4 py-5 transition-colors hover:bg-paper-2/40 md:grid-cols-[44px_88px_1fr_auto] md:items-start md:gap-6"
      >
        <div className="mono text-[11px] tabular-nums text-ink-3 pt-0.5">
          0{index}
        </div>

        <img
          src={memo.analyst.avatar}
          alt={memo.analyst.name}
          className="hidden md:block h-[72px] w-[72px] object-cover border border-line filter grayscale-[0.2]"
          loading="lazy"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="editorial text-[24px] leading-tight text-ink md:text-[28px]">
              {memo.company}
            </span>
            <span className="mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
              {memo.id}
            </span>
          </div>
          <div className="editorial-italic mt-1 text-[14px] text-ink-2 md:text-[15px]">
            {memo.subtitle}
          </div>

          <div className="mt-2.5 flex flex-wrap items-baseline gap-x-5 gap-y-1 text-[11.5px] text-ink-3">
            <span className="mono uppercase tracking-[0.08em] text-ink">
              {memo.analyst.name}
            </span>
            <span aria-hidden className="text-ink-4">·</span>
            <span>{memo.round}{memo.roundSize ? ` · ${memo.roundSize}` : ""}</span>
            <span aria-hidden className="text-ink-4">·</span>
            <span>{memo.sector}</span>
            <span aria-hidden className="text-ink-4">·</span>
            <span className="mono tabular-nums">
              drafted in {memo.draftedIn}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <DecisionPill label={dec.label} dot={dec.dot} ink={dec.ink} />
          <span className="mono text-[10.5px] text-ink-3 tabular-nums">
            {dateShort(memo.date)}
          </span>
          <span className="mono text-[10px] text-[color:var(--accent)] tabular-nums opacity-80">
            {memo.pipelineHash}
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

function DecisionPill({
  label,
  dot,
  ink,
}: {
  label: string;
  dot: string;
  ink: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        aria-hidden
        className="h-[7px] w-[7px] rounded-full"
        style={{ background: dot, boxShadow: `0 0 6px ${dot}55` }}
      />
      <span
        className="label !text-[10px] !tracking-[0.18em]"
        style={{ color: ink }}
      >
        {label}
      </span>
    </span>
  );
}

function DeckStat({
  label,
  count,
  dot,
}: {
  label: string;
  count: number;
  dot: string;
}) {
  return (
    <div className="min-w-0 text-right md:text-left">
      <div className="flex items-baseline gap-1.5 justify-end md:justify-start">
        <span
          aria-hidden
          className="h-[6px] w-[6px] rounded-full"
          style={{ background: dot }}
        />
        <span className="label !text-[10px]">{label}</span>
      </div>
      <div className="mt-1 editorial text-[32px] leading-none tabular-nums text-ink">
        {count}
      </div>
    </div>
  );
}

function dateShort(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return d
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    })
    .toUpperCase();
}

function todayLong() {
  const d = new Date();
  return d
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();
}
