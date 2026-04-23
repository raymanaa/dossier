import Link from "next/link";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingNav } from "@/components/marketing-nav";
import { MEMOS } from "@/lib/memos";

export default function Landing() {
  const memo = MEMOS[0];
  const recent = MEMOS.slice(0, 4);

  const decisionTone =
    memo.decision === "advance"
      ? "var(--accent, #2e5c3a)"
      : memo.decision === "hold"
        ? "var(--warn, #b77a1f)"
        : "var(--redline, #9e2e2e)";

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <MarketingNav />

      <section>
        <div className="mx-auto max-w-[1100px] px-6 md:px-10 pt-24 pb-20 md:pt-32">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.25fr_1fr] md:items-center md:gap-16">
            <div>
              <div className="label">Investment memos, drafted by agent</div>
              <h1 className="display mt-5 text-[64px] leading-[0.94] tracking-[-0.02em] md:text-[100px]">
                URL in.{" "}
                <span className="display-italic" style={{ color: "var(--accent)" }}>Signed memo out.</span>
              </h1>
              <p className="mt-6 max-w-[44ch] text-[16px] leading-[1.65] text-ink-2">
                Paste a company URL. Dossier returns an IC memo with thesis, risks, comps — every claim cited.
              </p>
              <div className="mt-8">
                <Link href="/app/new" className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 text-[14px] rounded-[3px] hover:bg-ink-2 transition-colors">
                  Draft a memo
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
            <div className="border border-line bg-card rounded-[3px] p-5">
              <div className="flex items-baseline justify-between">
                <span className="mono text-[10px] text-ink-3 tracking-[0.12em]">{memo.sector.toUpperCase()} · {memo.round.toUpperCase()}</span>
                <span className="mono text-[10px] font-semibold tracking-[0.14em]" style={{ color: decisionTone }}>
                  {memo.decision.toUpperCase()}
                </span>
              </div>
              <div className="display mt-2 text-[24px] leading-tight text-ink">{memo.company}</div>
              <div className="display-italic mt-1 text-[14px] text-ink-2">{memo.subtitle}</div>
              <p className="mt-3 text-[12.5px] leading-[1.6] text-ink-2">{memo.summary.slice(0, 180)}{memo.summary.length > 180 ? "…" : ""}</p>
              <div className="mt-4 mono text-[10px] text-ink-3 tracking-[0.08em]">
                /s/ {memo.analyst.name} · {memo.pipeline} · #{memo.pipelineHash}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat n="20 min" label="From URL to ready-to-share memo" />
          <Stat n="every" label="Stat cited to its source filing" />
          <Stat n="signed" label="Every memo reproducible from the URL" />
          <Stat n="0" label="Invented numbers in the output" />
        </div>
      </section>

      <Section label="The first-read problem">
        <p className="display-italic text-[30px] leading-[1.25] text-ink max-w-[34ch] md:text-[42px]">
          Every analyst writes the first-read memo. Every associate reads all of them.
        </p>
        <p className="mt-6 max-w-[60ch] text-[15px] leading-[1.7] text-ink-2">
          First-read memos eat three hours per company. The structure never changes — market, team, traction, risk, comps. Dossier drafts the first read, cites every claim back to the filing or article it came from, and hands you a redline draft that looks like your firm&apos;s voice, not an LLM&apos;s.
        </p>
      </Section>

      <Section label="How a memo gets drafted">
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          <Move n="01" verb="Scrape" detail="Website, LinkedIn, Crunchbase, Pitchbook, SEC filings, recent press. Dossier ingests the verifiable only." />
          <Move n="02" verb="Synthesize" detail="Market, team, traction, risks, comps, round. Each section follows your firm&apos;s template." />
          <Move n="03" verb="Cite" detail="Every stat points at its source. Click a footnote; the filing opens at the paragraph." />
          <Move n="04" verb="Sign" detail="Pipeline version and hash pinned to the memo. Reproducible from the original URL." />
          <Move n="05" verb="Share" detail="Shareable URL for IC prep. Redline in-doc; the history is kept." />
        </ol>
      </Section>

      <Section label="Three things only Dossier does">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature title="Every claim cited." body="No stat in the memo exists without its source. If the number can&apos;t be cited, it doesn&apos;t ship." />
          <Feature title="Signed and reproducible." body="Pipeline version and hash on every memo. Six months later, rerun it and see what changed." />
          <Feature title="Your firm&apos;s voice." body="Templates per firm. The agent does not impose a house style — it reads yours from the last ten memos you shipped." />
        </div>
      </Section>

      <Section label="Made for">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[14px] leading-[1.65] text-ink-2">
          <Persona title="The associate">Writes 8 first-read memos a week. Uses Dossier so the 8 show up on Monday morning, not by Friday night.</Persona>
          <Persona title="The partner">Reads the first-reads. Wants the voice consistent and the citations honest.</Persona>
          <Persona title="The scout">Covers a sector. Dossier is the first-read of a URL; the scout decides whether to do the second read.</Persona>
        </ul>
      </Section>

      <Section label="Recent memos" right={<Link href="/app" className="mono text-[11px] text-ink-3 hover:text-ink transition-colors">all memos →</Link>}>
        <ul className="border-y border-line divide-y divide-line">
          {recent.map((m) => (
            <li key={m.id}>
              <Link href={`/app/${m.slug}/`} className="group grid grid-cols-[auto_1fr_auto] gap-5 py-4 items-baseline hover:bg-paper-2/40 transition-colors px-1">
                <span className="mono text-[10.5px] tracking-[0.14em] text-ink-3">{m.round.toUpperCase()}</span>
                <div>
                  <div className="display text-[18px] text-ink leading-tight">{m.company}.</div>
                  <div className="text-[11.5px] text-ink-3 mt-0.5 italic">{m.subtitle}</div>
                </div>
                <span className="mono text-[10.5px] text-ink-3 group-hover:text-ink">open →</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 py-16">
        <blockquote className="border-l-2 pl-6 max-w-[60ch]" style={{ borderColor: "var(--accent, #2e5c3a)" }}>
          <p className="display-italic text-[28px] leading-[1.3] text-ink md:text-[34px]">
            &ldquo;From URL to ready-to-share memo in twenty minutes. Every number cited. That&apos;s what I was trying to build in-house for a year.&rdquo;
          </p>
          <footer className="mt-4 smallcaps mono text-[11px] text-ink-3 tracking-[0.14em]">
            — M. Okafor · associate · &lt;pilot · not a customer&gt;
          </footer>
        </blockquote>
      </section>

      <Section label="Questions">
        <dl className="divide-y divide-line border-y border-line">
          <Faq q="What sources does it read?">Company site, LinkedIn, Crunchbase, Pitchbook, SEC filings, recent press. Nothing paywalled unless you provide credentials.</Faq>
          <Faq q="How honest are the numbers?">Every stat has a citation. If a stat doesn&apos;t have a verifiable source, the memo flags it — it doesn&apos;t invent a number to fill the table.</Faq>
          <Faq q="Can we train it on our memos?">Yes. Upload 10 past memos; Dossier learns your section order, your citation style, your preferred close.</Faq>
          <Faq q="What about international deals?">English and French at v0.9. Filings coverage beyond US/EU is tracked in /changelog.</Faq>
          <Faq q="Is it IC-ready?">No, and that&apos;s deliberate. Dossier drafts the first read; the associate edits it to IC-shape.</Faq>
        </dl>
      </Section>

      <section className="border-t-2 border-ink">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10 py-20 text-center">
          <div className="label">Next URL</div>
          <h2 className="display mt-3 text-[40px] leading-[1.05] tracking-[-0.02em] text-ink md:text-[54px]">
            Drafted.{" "}
            <span className="display-italic" style={{ color: "var(--accent, #2e5c3a)" }}>Signed. Cited.</span>
          </h2>
          <div className="mt-8">
            <Link href="/app/new" className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 text-[14px] rounded-[3px] hover:bg-ink-2 transition-colors">
              Draft a memo
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

function Section({ label, right, children }: { label: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section>
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 py-16">
        <div className="flex items-baseline justify-between border-b border-line pb-3 mb-8">
          <span className="label">{label}</span>
          {right}
        </div>
        {children}
      </div>
    </section>
  );
}
function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="display text-[28px] leading-none tabular-nums text-ink md:text-[32px]">{n}</div>
      <div className="mt-2 text-[11.5px] leading-[1.45] text-ink-3 max-w-[28ch]">{label}</div>
    </div>
  );
}
function Move({ n, verb, detail }: { n: string; verb: string; detail: string }) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-4 items-baseline">
      <span className="mono text-[11px] text-ink-3 tabular-nums tracking-[0.16em]">{n}</span>
      <div>
        <div className="display text-[22px] leading-none text-ink">{verb}.</div>
        <div className="mt-1 text-[13.5px] leading-[1.6] text-ink-2 max-w-[40ch]">{detail}</div>
      </div>
    </li>
  );
}
function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="display text-[20px] leading-[1.2] text-ink">{title}</h3>
      <p className="mt-2 text-[13.5px] leading-[1.65] text-ink-2 max-w-[36ch]">{body}</p>
    </div>
  );
}
function Persona({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li className="border-t-2 border-ink pt-3">
      <div className="display text-[18px] leading-tight text-ink">{title}</div>
      <p className="mt-2 max-w-[36ch]">{children}</p>
    </li>
  );
}
function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 md:gap-10 py-5">
      <dt className="display text-[17px] text-ink leading-tight">{q}</dt>
      <dd className="text-[14px] leading-[1.7] text-ink-2 max-w-[62ch]">{children}</dd>
    </div>
  );
}
