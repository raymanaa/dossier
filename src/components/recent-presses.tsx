"use client";

import { ArrowUpRight } from "lucide-react";

export type Press = {
  id: string;
  company: string;
  subtitle: string;
  analyst: {
    name: string;
    role: string;
    avatar: string;
  };
  round: string;
  decision: "advance" | "hold" | "pass";
  date: string;
  signedHash: string;
};

const PRESSES: Press[] = [
  {
    id: "memo-0042",
    company: "Thatch, Inc.",
    subtitle: "Transparent pricing infra",
    analyst: {
      name: "Maya Alves",
      role: "Associate · Sable Capital",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    round: "Seed",
    decision: "advance",
    date: "Apr 21",
    signedHash: "4f8c9e1",
  },
  {
    id: "memo-0041",
    company: "Keel Finance",
    subtitle: "Bottom-up CFO stack",
    analyst: {
      name: "Daniel Rodriguez",
      role: "Principal · Foundry Group",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    round: "Series B",
    decision: "hold",
    date: "Apr 19",
    signedHash: "2b7d41a",
  },
  {
    id: "memo-0040",
    company: "Cobalt Systems",
    subtitle: "Enterprise observability",
    analyst: {
      name: "Priya Patel",
      role: "Associate · Anthem Ventures",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    round: "Due diligence",
    decision: "advance",
    date: "Apr 18",
    signedHash: "9e13f7c",
  },
];

/**
 * RecentPresses — the "in this issue" / recent-memos card. Same
 * component the /app Memos index will render.
 * Landing rule 2: real product component inline, with human bylines.
 */
export function RecentPresses() {
  return (
    <aside className="relative border border-line bg-card">
      {/* Corner folio marks */}
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />

      <div className="flex items-baseline justify-between border-b border-line px-5 py-3">
        <span className="label">In this issue</span>
        <span className="mono text-[10.5px] text-ink-3 tabular-nums">
          03 / 142
        </span>
      </div>

      <ol>
        {PRESSES.map((p) => (
          <PressRow key={p.id} press={p} />
        ))}
      </ol>

      <div className="flex items-center justify-between border-t border-line px-5 py-3 group hover:bg-paper-2/50 transition-colors cursor-pointer">
        <span className="text-[11.5px] text-ink-3">
          12 more published this quarter
        </span>
        <span className="mono text-[10.5px] text-ink-3 flex items-center gap-1 group-hover:text-ink-2">
          See all
          <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} />
        </span>
      </div>
    </aside>
  );
}

function PressRow({ press }: { press: Press }) {
  return (
    <li className="group flex items-start gap-4 border-b border-line px-5 py-4 last:border-b-0 hover:bg-paper-2/40 transition-colors cursor-pointer">
      {/* Byline portrait — real photo */}
      <img
        src={press.analyst.avatar}
        alt={`${press.analyst.name} — portrait`}
        width={44}
        height={44}
        className="h-11 w-11 shrink-0 rounded-full object-cover border border-line-2 filter grayscale-[0.15]"
        loading="lazy"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="editorial text-[17px] leading-tight text-ink truncate">
            {press.company}
          </span>
          <span className="shrink-0 mono text-[10px] text-ink-3 tabular-nums">
            {press.date}
          </span>
        </div>

        <div className="mt-[1px] text-[12px] text-ink-2 truncate">
          {press.subtitle}
        </div>

        <div className="mt-1.5 flex items-center gap-2 min-w-0">
          <span className="mono text-[10.5px] text-ink uppercase tracking-[0.08em] truncate">
            {press.analyst.name}
          </span>
          <span aria-hidden className="text-ink-4">·</span>
          <span className="text-[10.5px] text-ink-3 truncate">
            {press.round}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1 pt-0.5">
        <DecisionChip decision={press.decision} />
        <span className="mono text-[9.5px] text-ink-3 tabular-nums">
          {press.signedHash}
        </span>
      </div>
    </li>
  );
}

function DecisionChip({ decision }: { decision: Press["decision"] }) {
  const cfg = {
    advance: { label: "ADVANCE", dot: "var(--accent)", ink: "var(--accent-2)" },
    hold: { label: "HOLD", dot: "#d97706", ink: "#7c2d12" },
    pass: { label: "PASS", dot: "#8a8a8a", ink: "#565656" },
  }[decision];

  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        aria-hidden
        className="h-[6px] w-[6px] rounded-full"
        style={{ background: cfg.dot, boxShadow: `0 0 6px ${cfg.dot}66` }}
      />
      <span
        className="label !text-[9.5px] !tracking-[0.16em]"
        style={{ color: cfg.ink }}
      >
        {cfg.label}
      </span>
    </span>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const style: React.CSSProperties = {
    borderColor: "var(--accent)",
    opacity: 0.55,
    width: 10,
    height: 10,
  };
  const positionCls = {
    tl: "left-[-5px] top-[-5px] border-b-0 border-r-0",
    tr: "right-[-5px] top-[-5px] border-b-0 border-l-0",
    bl: "left-[-5px] bottom-[-5px] border-t-0 border-r-0",
    br: "right-[-5px] bottom-[-5px] border-t-0 border-l-0",
  }[pos];
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute border ${positionCls}`}
      style={style}
    />
  );
}
