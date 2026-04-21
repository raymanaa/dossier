"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Link2 } from "lucide-react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "running" | "done";

type Step = {
  id: string;
  label: string;
  detail: string;
  ms: number;
};

const PIPELINE: Step[] = [
  { id: "fetch", label: "Fetching public surface", detail: "thatch.co · 47 pages · 12 external refs", ms: 900 },
  { id: "extract", label: "Extracting claims", detail: "142 claims across landing, blog, docs, filings", ms: 1100 },
  { id: "dedupe", label: "De-duplicating + ranking", detail: "68 unique · weighted by recency, primary-source", ms: 700 },
  { id: "draft", label: "Drafting sections", detail: "Market · Competitors · Team · Traction · Risks", ms: 1700 },
  { id: "cite", label: "Attaching citations", detail: "every factual claim linked to a primary source", ms: 800 },
  { id: "sign", label: "Signing pipeline hash", detail: "v7.2 · 4f8c9e1 · tamper-evident", ms: 500 },
];

const EXAMPLES = [
  "thatch.co",
  "keel.finance",
  "cobalt.systems",
  "aperture.com",
];

export function NewMemoFlow() {
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [stepIndex, setStepIndex] = useState(-1);
  const [evidence, setEvidence] = useState<string[]>([]);
  const timerRef = useRef<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function start(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setPhase("running");
    setStepIndex(0);
    setEvidence([]);
    runStep(0);
  }

  function runStep(i: number) {
    if (i >= PIPELINE.length) {
      setPhase("done");
      return;
    }
    setStepIndex(i);
    setEvidence((e) => [...e, PIPELINE[i].detail]);
    timerRef.current = window.setTimeout(
      () => runStep(i + 1),
      PIPELINE[i].ms,
    );
  }

  return (
    <div className="mx-auto max-w-[960px] px-6 pb-24 pt-12 md:px-10">
      <div className="border-b border-ink pb-3 flex items-baseline justify-between">
        <span className="label">NEW MEMO · STEP {phase === "idle" ? "01" : phase === "running" ? "02" : "03"}</span>
        <span className="mono text-[10.5px] text-ink-3">PIPELINE v7.2</span>
      </div>

      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mt-10"
          >
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.15fr_1fr] md:gap-16">
              <div>
                <h1 className="editorial text-[48px] leading-[1.02] tracking-[-0.02em] text-ink md:text-[64px]">
                  Paste a URL.
                  <br />
                  <span className="editorial-italic">Walk away.</span>
                </h1>
                <p className="mt-4 max-w-[52ch] text-[14.5px] leading-[1.7] text-ink-2">
                  Dossier reads a company&apos;s public surface, drafts a
                  structured IC-grade memo, and cites every claim. Ninety
                  seconds from URL to first redline.
                </p>

                <form onSubmit={start} className="mt-8">
                  <label className="label !text-[9.5px]">Company URL</label>
                  <div className="mt-2 flex items-center border border-line bg-card px-3 py-2.5 focus-within:border-ink transition-colors">
                    <Link2 className="h-4 w-4 text-ink-3 mr-2" strokeWidth={1.75} />
                    <input
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="thatch.co"
                      autoFocus
                      className="flex-1 bg-transparent text-[15px] text-ink placeholder:text-ink-3 outline-none mono"
                    />
                    <button
                      type="submit"
                      disabled={!url.trim()}
                      className="inline-flex items-center gap-1.5 bg-ink text-paper px-4 py-1.5 text-[12px] font-medium hover:bg-ink-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Draft memo
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-ink-3">
                    <span>Try</span>
                    {EXAMPLES.map((e) => (
                      <button
                        key={e}
                        type="button"
                        onClick={() => setUrl(e)}
                        className="mono text-[11px] text-ink-2 underline-offset-2 hover:text-[color:var(--accent)] hover:underline"
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </form>
              </div>

              <aside className="border border-line bg-card">
                <div className="border-b border-line px-5 py-3">
                  <span className="label">What happens next</span>
                </div>
                <ol className="divide-y divide-line">
                  {PIPELINE.map((s, i) => (
                    <li
                      key={s.id}
                      className="flex items-start gap-3 px-5 py-3.5 text-[12.5px] text-ink-2"
                    >
                      <span className="mono text-[10.5px] tabular-nums text-ink-3 pt-0.5 w-[24px]">
                        0{i + 1}
                      </span>
                      <div>
                        <div className="text-ink">{s.label}</div>
                        <div className="text-[11px] text-ink-3 leading-[1.5]">{s.detail}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </aside>
            </div>
          </motion.div>
        )}

        {phase !== "idle" && (
          <motion.div
            key="running"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-10"
          >
            <div className="flex items-baseline gap-4 border-b border-line pb-3">
              <span className="mono text-[11px] text-ink-3 tabular-nums">
                {url || "—"}
              </span>
              <span className="text-ink-4" aria-hidden>·</span>
              <span className="label !text-[10px]">
                {phase === "running" ? "DRAFTING" : "DRAFT READY"}
              </span>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-[1fr_280px] md:gap-14">
              {/* Pipeline steps */}
              <ol className="space-y-4">
                {PIPELINE.map((s, i) => {
                  const state =
                    i < stepIndex || phase === "done"
                      ? "done"
                      : i === stepIndex
                        ? "running"
                        : "pending";
                  return (
                    <motion.li
                      key={s.id}
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: state === "pending" ? 0.35 : 1 }}
                      className="grid grid-cols-[44px_1fr] gap-4"
                    >
                      <div className="pt-1">
                        <PipelineDot state={state} />
                      </div>
                      <div>
                        <div className="flex items-baseline gap-3">
                          <span className="editorial text-[19px] leading-tight text-ink">
                            {s.label}
                          </span>
                          {state === "done" && (
                            <span className="mono text-[10px] text-[color:var(--accent)]">✓</span>
                          )}
                        </div>
                        <div className="text-[12.5px] text-ink-3 mt-0.5">
                          {s.detail}
                        </div>
                        {state === "running" && (
                          <div className="mt-2 h-[1px] overflow-hidden bg-line">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: s.ms / 1000, ease: "linear" }}
                              className="h-full"
                              style={{ background: "var(--accent)" }}
                            />
                          </div>
                        )}
                      </div>
                    </motion.li>
                  );
                })}
              </ol>

              {/* Evidence console */}
              <aside className="border border-line bg-card">
                <div className="border-b border-line px-4 py-2.5">
                  <span className="label">Evidence console</span>
                </div>
                <div className="p-4 mono text-[11px] leading-[1.55] text-ink-2 max-h-[360px] overflow-y-auto">
                  {evidence.length === 0 && (
                    <div className="text-ink-3">$ waiting…</div>
                  )}
                  {evidence.map((e, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mb-1.5"
                    >
                      <span className="text-[color:var(--accent)]">→</span>{" "}
                      <span>{e}</span>
                    </motion.div>
                  ))}
                  {phase === "done" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3 pt-3 border-t border-line text-ink"
                    >
                      <span className="text-[color:var(--accent)]">✓</span>{" "}
                      <span>signed · 4f8c9e1 · 12 sources · 0 errors</span>
                    </motion.div>
                  )}
                </div>
              </aside>
            </div>

            {phase === "done" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink pt-5"
              >
                <div>
                  <div className="label">Draft ready</div>
                  <div className="editorial mt-1 text-[22px] text-ink">
                    Thatch, Inc. &mdash;{" "}
                    <span className="editorial-italic">seed round.</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setPhase("idle");
                      setStepIndex(-1);
                      setUrl("");
                      setEvidence([]);
                    }}
                    className="text-[12px] text-ink-3 hover:text-ink"
                  >
                    Draft another
                  </button>
                  <NextLink
                    href="/app/memo-0042/"
                    onMouseEnter={() => router.prefetch("/app/memo-0042/")}
                    className="inline-flex items-center gap-1.5 bg-ink text-paper px-5 py-2.5 text-[13px] font-medium hover:bg-ink-2 transition-colors"
                  >
                    Open the memo
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </NextLink>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PipelineDot({ state }: { state: "pending" | "running" | "done" }) {
  if (state === "running") {
    return (
      <span className="relative inline-flex h-4 w-4 items-center justify-center">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full animate-ping"
          style={{ background: "var(--accent)", opacity: 0.4 }}
        />
        <span
          className="relative h-[9px] w-[9px] rounded-full"
          style={{ background: "var(--accent)" }}
        />
      </span>
    );
  }
  if (state === "done") {
    return (
      <span
        className="inline-block h-[9px] w-[9px] rounded-full"
        style={{ background: "var(--ink)" }}
      />
    );
  }
  return (
    <span
      className="inline-block h-[9px] w-[9px] rounded-full border"
      style={{ borderColor: "var(--line-2)" }}
    />
  );
}
