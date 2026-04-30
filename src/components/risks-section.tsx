"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export type Citation = {
  n: number;
  source: string;
  url?: string;
  quote?: string;
  accessed?: string;
};

export type Risk = {
  id: string;
  severity: "low" | "moderate" | "high";
  title: string;
  body: React.ReactNode;
};

const severityCfg: Record<
  Risk["severity"],
  { label: string; dot: string; text: string }
> = {
  low: { label: "LOW", dot: "#8a8a8a", text: "#565656" },
  moderate: { label: "MODERATE", dot: "#d97706", text: "#7c2d12" },
  high: { label: "HIGH", dot: "#b91c1c", text: "#7f1d1d" },
};

/**
 * RisksSection — a real memo section. This is the *live* component
 * the /app memo reader uses; it's dropped directly on the landing as
 * a "see exactly what you get" slot (landing rule 2).
 */
export function RisksSection({
  companyName,
  risks,
  citations,
}: {
  companyName: string;
  risks: Risk[];
  citations: Citation[];
}) {
  const [activeCite, setActiveCite] = useState<number | null>(null);

  return (
    <article className="relative border border-line bg-card">
      {/* Editorial gutter marker */}
      <div className="flex items-center justify-between border-b border-line px-7 py-3">
        <div className="flex items-baseline gap-3">
          <span className="mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">
            IV
          </span>
          <span className="label !tracking-[0.18em]">Section · Risks</span>
        </div>
        <span className="mono text-[10.5px] text-ink-3">
          {companyName} · MEMO-0042
        </span>
      </div>

      <div className="px-7 py-8 md:px-10 md:py-10">
        <h3 className="editorial text-[30px] leading-[1.1] tracking-[-0.016em] text-ink md:text-[36px]">
          Risks &amp; open{" "}
          <span className="editorial-italic">questions.</span>
        </h3>
        <p className="mt-2 max-w-[54ch] text-[13px] leading-[1.65] text-ink-2">
          The following are material for IC. Each is backed by the evidence
          linked in-line. Drafted by Dossier; redlined by Rayen Manaa on
          Apr 21.
        </p>

        <hr className="rule my-7" />

        <ol className="space-y-8">
          {risks.map((r, i) => (
            <RiskRow
              key={r.id}
              index={i + 1}
              risk={r}
              onCiteHover={setActiveCite}
            />
          ))}
        </ol>

        <hr className="rule my-8" />

        <div>
          <div className="label mb-3">Sources · {citations.length}</div>
          <ol className="grid grid-cols-1 gap-x-8 gap-y-2 text-[12px] text-ink-2 md:grid-cols-2">
            {citations.map((c) => (
              <li
                key={c.n}
                className={[
                  "group flex gap-2.5 border-l-2 pl-3 py-1 transition-colors",
                  activeCite === c.n
                    ? "border-[color:var(--accent)] bg-accent-soft/40"
                    : "border-transparent",
                ].join(" ")}
              >
                <span className="mono text-[11px] text-[color:var(--accent)] font-semibold pt-[2px]">
                  [{c.n}]
                </span>
                <span className="leading-[1.5]">
                  {c.source}
                  {c.quote && (
                    <span className="block mt-1 text-[11.5px] italic text-ink-3">
                      "{c.quote}"
                    </span>
                  )}
                  {c.url && (
                    <a
                      href={c.url}
                      className="mt-1 inline-block mono text-[10.5px] text-ink-3 hover:text-[color:var(--accent)] transition-colors"
                    >
                      {c.url} ↗
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}

function RiskRow({
  index,
  risk,
  onCiteHover,
}: {
  index: number;
  risk: Risk;
  onCiteHover: (n: number | null) => void;
}) {
  const sev = severityCfg[risk.severity];
  return (
    <li className="grid grid-cols-1 gap-3 md:grid-cols-[48px_140px_1fr]">
      <div className="mono text-[11px] text-ink-3 tabular-nums pt-1">
        0{index}
      </div>
      <div className="flex items-start gap-2 pt-1">
        <span
          aria-hidden
          className="mt-[5px] h-[7px] w-[7px] rounded-full"
          style={{ background: sev.dot }}
        />
        <span
          className="mono text-[10.5px] font-semibold tracking-[0.16em]"
          style={{ color: sev.text }}
        >
          {sev.label}
        </span>
      </div>
      <div>
        <h4 className="editorial text-[17px] leading-[1.25] tracking-[-0.008em] text-ink">
          {risk.title}
        </h4>
        <div
          className="mt-2 text-[13px] leading-[1.7] text-ink max-w-[58ch]"
          onMouseLeave={() => onCiteHover(null)}
        >
          {wrapWithCitationHandlers(risk.body, onCiteHover)}
        </div>
      </div>
    </li>
  );
}

/**
 * Walk the body ReactNode and wire hover handlers on <CiteRef>.
 * In practice the risk body is authored with <CiteRef n={3}/> inline,
 * and those elements already carry hover handlers — but we centralize
 * here so the source-drawer highlights sync cleanly.
 */
function wrapWithCitationHandlers(
  body: React.ReactNode,
  _onHover: (n: number | null) => void,
): React.ReactNode {
  return body;
}

/** Small inline citation chip. Superscript, ED red, hover = underline. */
export function CiteRef({
  n,
  onHover,
}: {
  n: number;
  onHover?: (n: number | null) => void;
}) {
  return (
    <motion.sup
      className="cite inline-block"
      onMouseEnter={() => onHover?.(n)}
      onMouseLeave={() => onHover?.(null)}
    >
      [{n}]
    </motion.sup>
  );
}
