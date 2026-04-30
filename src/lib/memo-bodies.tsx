import { CiteRef } from "@/components/risks-section";
import type { Risk } from "@/components/risks-section";

type Bodies = Record<string, React.ReactNode>;

const THATCH: Bodies = {
  "r-regulatory": (
    <>
      Thatch&apos;s primary growth driver is a 2024 regulatory carve-out that
      mandates transparent pricing disclosures<CiteRef n={2} /> — the product
      is structurally built around that mandate. A draft amendment tabled by
      the House Financial Services Committee in February 2026 would exempt
      firms under $200M AUM<CiteRef n={3} />, removing roughly{" "}
      <strong className="text-ink">41%</strong> of Thatch&apos;s addressable
      pipeline.
    </>
  ),
  "r-moat": (
    <>
      The company cites a proprietary ingestion stack built on public-filings
      data that is already exposed via SEC EDGAR APIs<CiteRef n={4} /> and two
      paid providers<CiteRef n={5} />. The technical team is excellent, but
      nothing in the disclosed stack prevents a well-capitalized competitor
      from replicating the pipeline once the regulatory tailwind normalizes.
    </>
  ),
  "r-team": (
    <>
      Maya Alves<CiteRef n={9} /> holds 62% of architectural decision
      authority per the published engineering charter<CiteRef n={11} />.
      While her track record is strong (Stripe payments, 7yrs, 40M QPS
      migration), the organization lacks a named deputy. Succession risk is
      mitigable and typical for this stage; flagged for IC awareness, not
      veto.
    </>
  ),
};

const KEEL: Bodies = {
  "r-positioning": (
    <>
      Keel&apos;s bottom-up motion depends on mid-market CFOs trialing the
      product without procurement involvement. Ramp introduced an enterprise
      tier in Q1 2026 at a{" "}
      <strong className="text-ink">45% discount</strong> to Keel&apos;s list
      price<CiteRef n={3} />, paired with an aggressive switching-cost
      reimbursement program. If Keel does not land an enterprise sales leader
      in the next two quarters, unit economics compress and the NRR line
      flattens.
    </>
  ),
  "r-multiple": (
    <>
      The CFO software category is consolidating: Ramp, Brex, and Mercury
      each now cover 70%+ feature overlap with Keel. The $340M post-money
      valuation bakes in three years of 3x growth on a category where the
      multiple has compressed from 25x forward revenue to 11x over the past
      18 months<CiteRef n={1} />. Entry price is the bet, not the business.
    </>
  ),
};

const COBALT: Bodies = {
  "r-commoditization": (
    <>
      Grafana + Tempo reached GA in March 2026<CiteRef n={5} /> and now
      covers 80% of the single-host observability surface at zero license
      cost. Cobalt&apos;s defense is enterprise SSO, audit logging, and a
      support SLA — a defensible moat, but it shrinks every quarter as
      Grafana ships enterprise features.
    </>
  ),
  "r-concentration": (
    <>
      Top-five logos account for <strong className="text-ink">34%</strong> of
      ARR<CiteRef n={7} />. Two of the five are in the same industry (ad-tech)
      and renewed on 12-month cycles. Loss of a single anchor would shift the
      growth narrative materially.
    </>
  ),
  "r-sales": (
    <>
      Cobalt has no dedicated VP Sales as of April 2026. The CEO is currently
      closing the largest deals herself<CiteRef n={6} />, which is a common
      pattern for a $34M ARR business but becomes a scaling risk at the next
      round.
    </>
  ),
};

const BY_MEMO: Record<string, Bodies> = {
  "memo-0042": THATCH,
  "memo-0041": KEEL,
  "memo-0040": COBALT,
};

export function risksWithBodies(memoId: string, risks: Risk[]): Risk[] {
  const bodies = BY_MEMO[memoId] ?? {};
  return risks.map((r) => ({
    ...r,
    body: bodies[r.id] ?? r.body,
  }));
}
