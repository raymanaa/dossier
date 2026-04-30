import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingNav } from "@/components/marketing-nav";

export const metadata = {
  title: "Security · Dossier",
  description: "How Dossier handles IC-sensitive content, data residency, and access.",
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <MarketingNav />

      <section className="mx-auto w-full max-w-[900px] px-6 pt-16 pb-10 md:px-10">
        <div className="flex items-baseline justify-between border-b border-ink pb-3">
          <span className="label">SECURITY · ALPHA DISCLOSURE</span>
          <span className="mono text-[10.5px] text-ink-3">APRIL MMXXVI</span>
        </div>

        <h1 className="editorial mt-10 text-[48px] leading-[1.02] tracking-[-0.02em] text-ink md:text-[68px]">
          Honest about <span className="editorial-italic">alpha.</span>
        </h1>
        <p className="mt-5 max-w-[60ch] text-[15px] leading-[1.75] text-ink-2">
          Dossier is a portfolio pilot. The posture below reflects where we
          actually are today — not where we would be if we were selling into
          a regulated buyer. If you are considering Dossier for a real IC,
          read this page first.
        </p>
      </section>

      <section className="mx-auto w-full max-w-[900px] px-6 md:px-10 pb-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          <Section title="Data handling">
            <ul className="space-y-2 text-[13px] leading-[1.7] text-ink-2">
              <li>— Only public surfaces are crawled. No authenticated content is ever fetched.</li>
              <li>— No user-uploaded documents are accepted in alpha.</li>
              <li>— Memo drafts persist only in the analyst&apos;s browser (localStorage); no server-side database.</li>
              <li>— Signed memos are rendered statically and served from Cloudflare&apos;s edge cache.</li>
            </ul>
          </Section>

          <Section title="Model provenance">
            <ul className="space-y-2 text-[13px] leading-[1.7] text-ink-2">
              <li>— Drafts are composed from deterministic pipeline stages, not a single end-to-end model call.</li>
              <li>— Each stage logs its prompt, its model version, and its output hash.</li>
              <li>— No inference is run on customer prompts from one memo that affects another.</li>
              <li>— Model context windows are never cross-contaminated between deals.</li>
            </ul>
          </Section>

          <Section title="What we don't have yet">
            <ul className="space-y-2 text-[13px] leading-[1.7] text-ink-2">
              <li>— SOC 2 attestation.</li>
              <li>— SSO / SCIM.</li>
              <li>— Per-tenant data residency.</li>
              <li>— A formal data-processing agreement.</li>
            </ul>
            <p className="mt-3 text-[11.5px] italic text-ink-3">
              We will ship these in order, with a deadline, when a paying
              customer asks. We will not lie about having them in the
              meantime.
            </p>
          </Section>

          <Section title="Signed outputs">
            <ul className="space-y-2 text-[13px] leading-[1.7] text-ink-2">
              <li>— Every memo is signed with the pipeline version that produced it.</li>
              <li>— Editing the signed copy breaks the hash; the reader surfaces this visually.</li>
              <li>— A memo can always be re-derived from its URL input and pipeline version — the audit trail is the artifact.</li>
            </ul>
          </Section>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink pt-5 text-[12px] text-ink-3">
          <span className="mono tracking-[0.14em]">
            SECURITY CONTACT · security@dossier.alpha
          </span>
          <span className="mono">
            last updated · 2026-04-21
          </span>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="editorial text-[22px] leading-[1.2] tracking-[-0.01em] text-ink md:text-[26px]">
        {title}
        <span className="editorial-italic">.</span>
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
