"use client";

import { useEffect, useState } from "react";

const SECTIONS: { id: string; num: string; label: string }[] = [
  { id: "summary", num: "§", label: "Summary" },
  { id: "market", num: "I", label: "Market" },
  { id: "competitors", num: "II", label: "Competitors" },
  { id: "team", num: "III", label: "Team" },
  { id: "traction", num: "IV", label: "Traction" },
  { id: "risks", num: "V", label: "Risks" },
  { id: "sources", num: "∎", label: "Sources" },
];

export function MemoOutline({ pipelineHash }: { pipelineHash: string }) {
  const [active, setActive] = useState("summary");

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean,
    ) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -55% 0px", threshold: [0, 0.4, 1] },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Memo outline"
      className="sticky top-24 hidden lg:block"
    >
      <div className="label mb-4">Contents</div>
      <ol className="space-y-2 border-l border-line pl-4">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id} className="relative">
              {isActive && (
                <span
                  aria-hidden
                  className="absolute -left-[17px] top-[7px] h-[9px] w-[2px]"
                  style={{ background: "var(--accent)" }}
                />
              )}
              <a
                href={`#${s.id}`}
                className={[
                  "flex items-baseline gap-2 text-[12.5px] leading-tight transition-colors",
                  isActive
                    ? "text-ink"
                    : "text-ink-3 hover:text-ink-2",
                ].join(" ")}
              >
                <span
                  className="mono text-[10px] tabular-nums w-[14px]"
                  style={isActive ? { color: "var(--accent)" } : undefined}
                >
                  {s.num}
                </span>
                <span>{s.label}</span>
              </a>
            </li>
          );
        })}
      </ol>

      <hr className="rule my-5" />

      <div className="space-y-1.5">
        <div className="label !text-[9.5px]">Pipeline</div>
        <div className="mono text-[11px] text-ink-2">
          v7.2 · <span className="text-[color:var(--accent)]">{pipelineHash}</span>
        </div>
        <div className="mono text-[10px] text-ink-3 leading-[1.5]">
          signed ∎ tamper-evident
        </div>
      </div>
    </nav>
  );
}
