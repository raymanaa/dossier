import type { Citation, Risk } from "@/components/risks-section";

export type Decision = "advance" | "hold" | "pass";

export type Analyst = {
  name: string;
  role: string;
  firm: string;
  avatar: string;
};

export type BulletClaim = {
  text: string;
  cite?: number;
  emphasis?: string;
};

export type KeyStat = {
  label: string;
  value: string;
  unit?: string;
  cite?: number;
};

export type Memo = {
  id: string;
  slug: string;
  company: string;
  subtitle: string;
  url: string;
  sector: string;
  round: string;
  roundSize?: string;
  date: string;
  draftedIn: string;
  pipeline: string;
  pipelineHash: string;
  decision: Decision;
  decisionRationale: string;
  analyst: Analyst;
  redlinedBy?: string;
  summary: string;
  market: {
    headline: string;
    stats: KeyStat[];
    body: BulletClaim[];
  };
  competitors: {
    headline: string;
    entries: {
      name: string;
      note: string;
      stance: "incumbent" | "peer" | "acquirer";
      cite?: number;
    }[];
  };
  team: {
    headline: string;
    roster: {
      name: string;
      role: string;
      note: string;
      cite?: number;
    }[];
  };
  traction: {
    headline: string;
    stats: KeyStat[];
    body: BulletClaim[];
  };
  risks: Risk[];
  citations: Citation[];
};

const THATCH_CITATIONS: Citation[] = [
  { n: 1, source: "Global pricing-infrastructure TAM · Goldman research · Mar 2026", url: "goldman.internal/research/pi-TAM-26", accessed: "2026-04-02" },
  { n: 2, source: "HR-5241 · Transparent Pricing Act · §3(c)", url: "congress.gov/bill/118/hr-5241", accessed: "2026-04-02" },
  { n: 3, source: "Draft amendment FSC-226 · Feb 2026 mark-up", url: "financialservices.house.gov/markups/FSC-226", quote: "exempt firms whose assets under management do not exceed $200M", accessed: "2026-02-28" },
  { n: 4, source: "SEC EDGAR developer docs · public API surface", url: "sec.gov/edgar/developer", accessed: "2026-04-05" },
  { n: 5, source: "Intrinio & FactSet data-provider tier sheets", accessed: "2026-03-28" },
  { n: 6, source: "Cobalt Q4 2025 customer deck · leaked via CRN", accessed: "2026-01-14" },
  { n: 7, source: "Keel investor letter · Jan 2026", url: "keel.finance/investors/q4-25", accessed: "2026-02-03" },
  { n: 8, source: "Aperture 10-K · acquisition footnote 7", url: "sec.gov/cgi-bin/browse-edgar?cik=aperture", accessed: "2026-03-10" },
  { n: 9, source: "LinkedIn · Maya Alves (verified)", url: "linkedin.com/in/mayaalves", accessed: "2026-04-18" },
  { n: 10, source: "Stripe payments migration retrospective · 2023", url: "stripe.com/blog/40m-qps", accessed: "2026-04-18" },
  { n: 11, source: "Thatch engineering handbook v0.4", url: "handbook.thatch.co/v0.4", accessed: "2026-04-18" },
  { n: 12, source: "Thatch Stripe dashboard · MRR export · Apr 2026", accessed: "2026-04-20" },
  { n: 13, source: "Cohort retention export · Thatch data-room", accessed: "2026-04-20" },
  { n: 14, source: "Customer references · 4 of 12 contacted", accessed: "2026-04-19" },
];

const KEEL_CITATIONS: Citation[] = [
  { n: 1, source: "CFO stack market · Bessemer State-of-Cloud 2026", url: "bvp.com/atlas/cloud-2026", accessed: "2026-03-15" },
  { n: 2, source: "Mid-market CFO survey · 312 respondents", url: "keel.finance/research/cfo-survey-26", accessed: "2026-03-20" },
  { n: 3, source: "Ramp & Brex enterprise tier pricing", accessed: "2026-04-10" },
  { n: 4, source: "Mercury for Business product update", url: "mercury.com/blog/cfo-v2", accessed: "2026-04-05" },
  { n: 5, source: "Keel team roster · internal org chart", accessed: "2026-04-12" },
  { n: 6, source: "Plaid ledger v2 engineering blog", url: "plaid.com/blog/ledger-v2", accessed: "2026-04-12" },
  { n: 7, source: "Keel Stripe revenue export · Q1 2026", accessed: "2026-04-15" },
  { n: 8, source: "Net revenue retention analysis · Cohort Q3-24 to Q1-26", accessed: "2026-04-15" },
  { n: 9, source: "Hubspot enterprise switchers — 11 of 340 customers", accessed: "2026-04-16" },
  { n: 10, source: "Keel board deck · Jan 2026 · slide 14", accessed: "2026-04-16" },
];

const COBALT_CITATIONS: Citation[] = [
  { n: 1, source: "Gartner observability MQ · 2026", url: "gartner.com/doc/obs-mq-26", accessed: "2026-03-01" },
  { n: 2, source: "Datadog 10-K · FY2025", url: "sec.gov/cgi-bin/browse-edgar?cik=datadog", accessed: "2026-02-20" },
  { n: 3, source: "New Relic acquisition announcement · Francisco Partners", url: "franciscopartners.com/nr-announcement", accessed: "2026-02-22" },
  { n: 4, source: "Cobalt customer deck · Nov 2025", accessed: "2026-01-10" },
  { n: 5, source: "Grafana + Tempo open-source positioning", url: "grafana.com/blog/tempo-ga", accessed: "2026-03-25" },
  { n: 6, source: "Cobalt founder letter · Priya Patel", url: "cobalt.systems/about", accessed: "2026-04-01" },
  { n: 7, source: "Cobalt Stripe export · ARR Q1 2026", accessed: "2026-04-14" },
  { n: 8, source: "Gross revenue retention · 24-month cohort", accessed: "2026-04-14" },
  { n: 9, source: "Enterprise reference calls · 6 of 180 logos", accessed: "2026-04-17" },
];

const THATCH_RISKS: Risk[] = [
  {
    id: "r-regulatory",
    severity: "high",
    title: "Regulatory shift could flip from tailwind to headwind in 18 months",
    body: null,
  },
  {
    id: "r-moat",
    severity: "moderate",
    title: "Defensibility of the data pipeline is unclear past 24 months",
    body: null,
  },
  {
    id: "r-team",
    severity: "low",
    title: "Concentration risk on founding CTO",
    body: null,
  },
];

const KEEL_RISKS: Risk[] = [
  {
    id: "r-positioning",
    severity: "high",
    title: "Bottom-up motion stalls against Ramp's enterprise discount",
    body: null,
  },
  {
    id: "r-multiple",
    severity: "moderate",
    title: "Multiple compression as CFO stack consolidates",
    body: null,
  },
];

const COBALT_RISKS: Risk[] = [
  {
    id: "r-commoditization",
    severity: "high",
    title: "Grafana + Tempo open-source eats the bottom of the market",
    body: null,
  },
  {
    id: "r-concentration",
    severity: "moderate",
    title: "34% of ARR concentrated in top-five logos",
    body: null,
  },
  {
    id: "r-sales",
    severity: "low",
    title: "No enterprise sales leader hired yet",
    body: null,
  },
];

export const MEMOS: Memo[] = [
  {
    id: "memo-0042",
    slug: "memo-0042",
    company: "Thatch, Inc.",
    subtitle: "Transparent-pricing infrastructure for RIAs",
    url: "thatch.co",
    sector: "Regtech · Financial infrastructure",
    round: "Seed",
    roundSize: "$8.2M",
    date: "2026-04-21",
    draftedIn: "1m 24s",
    pipeline: "v7.2",
    pipelineHash: "4f8c9e1",
    decision: "advance",
    decisionRationale: "Regulatory tailwind is real and priced-in; team has shipped infra at this scale before. Moat risk is material but mitigable with a 24-month follow-on trigger.",
    analyst: {
      name: "Maya Alves",
      role: "Associate",
      firm: "Sable Capital",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    redlinedBy: "Rayen Manaa",
    summary:
      "Thatch builds pricing-disclosure infrastructure for Registered Investment Advisors under the 2024 Transparent Pricing Act. The product is structurally aligned with regulation. A draft amendment narrows the TAM by ~41% on an 18-month horizon but the founding team has shipped payments infra at this exact scale at Stripe.",
    market: {
      headline: "Structurally tied to a 2024 regulatory mandate",
      stats: [
        { label: "TAM", value: "$4.2", unit: "B", cite: 1 },
        { label: "YoY growth", value: "18", unit: "%", cite: 1 },
        { label: "Addressable RIAs", value: "13,400", cite: 2 },
      ],
      body: [
        { text: "The global pricing-infrastructure market is $4.2B growing 18% YoY, driven almost entirely by the 2024 Transparent Pricing Act (HR-5241).", cite: 1 },
        { text: "Thatch's wedge is the subset of Registered Investment Advisors that must file compliant pricing disclosures — roughly 13,400 firms in the US alone.", cite: 2, emphasis: "13,400 firms" },
        { text: "A draft amendment FSC-226 tabled in February 2026 would exempt firms under $200M AUM, removing approximately 41% of the addressable base.", cite: 3 },
      ],
    },
    competitors: {
      headline: "Two credible peers; one plausible acquirer",
      entries: [
        { name: "Cobalt Systems", note: "Enterprise-first observability stack, 180 logos. Adjacent but not directly competitive on pricing disclosure.", stance: "peer", cite: 6 },
        { name: "Keel Finance", note: "Bottom-up CFO stack, 340% NRR. Would need a product pivot to enter this lane.", stance: "peer", cite: 7 },
        { name: "Aperture Holdings", note: "Publicly traded; Thatch's product slots neatly into Aperture's enterprise compliance suite. Rumored acquisition interest.", stance: "acquirer", cite: 8 },
      ],
    },
    team: {
      headline: "Founder/CTO has shipped at exactly this scale",
      roster: [
        { name: "Maya Alves", role: "Founder · CTO", note: "7 years at Stripe, led the 40M QPS payments migration in 2023.", cite: 10 },
        { name: "Priya Patel", role: "VP Engineering", note: "Ex-Plaid, shipped ledger v2 — the reference implementation for bank data reconciliation.", cite: 11 },
        { name: "Daniel Rodriguez", role: "Head of Compliance", note: "Former FINRA examiner, 11 years. Underrated hire — knows every agency counterparty by first name.", cite: 9 },
      ],
    },
    traction: {
      headline: "$1.1M ARR, 18 logos, 112% net revenue retention",
      stats: [
        { label: "ARR", value: "$1.1", unit: "M", cite: 12 },
        { label: "Logos", value: "18", cite: 12 },
        { label: "NRR", value: "112", unit: "%", cite: 13 },
        { label: "Payback", value: "9.2", unit: "mo", cite: 13 },
      ],
      body: [
        { text: "Hit $1.1M ARR in 14 months from GA; 18 paying logos with an average ACV of $61K.", cite: 12 },
        { text: "Net revenue retention is 112% on the Q3 2024 cohort — a thin signal given the cohort is only 6 firms, but qualitatively the expansion comes from seat growth rather than price increases.", cite: 13 },
        { text: "Reference calls with 4 of 12 contacted customers; all 4 described Thatch as \"the only vendor that actually passed the FINRA examiner's first-pass review.\"", cite: 14 },
      ],
    },
    risks: THATCH_RISKS,
    citations: THATCH_CITATIONS,
  },
  {
    id: "memo-0041",
    slug: "memo-0041",
    company: "Keel Finance",
    subtitle: "Bottom-up CFO stack for mid-market",
    url: "keel.finance",
    sector: "Fintech · Finance ops",
    round: "Series B",
    roundSize: "$34M",
    date: "2026-04-19",
    draftedIn: "2m 08s",
    pipeline: "v7.2",
    pipelineHash: "2b7d41a",
    decision: "hold",
    decisionRationale: "Fundamentals excellent but entry price is a 2.4x premium to the next comparable round. Re-engage at next milestone or if multiples compress.",
    analyst: {
      name: "Daniel Rodriguez",
      role: "Principal",
      firm: "Foundry Group",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    redlinedBy: "Rayen Manaa",
    summary:
      "Keel is a bottom-up CFO stack targeting $50–500M revenue companies. Net revenue retention is 340% — best-in-class. The founding team includes two ex-Plaid ledger v2 engineers. The concern is not the business; it is the $340M post-money valuation at the current round, which bakes in three years of perfect execution against Ramp's incumbent pressure.",
    market: {
      headline: "Mid-market CFO stack is real and under-served",
      stats: [
        { label: "TAM", value: "$12", unit: "B", cite: 1 },
        { label: "Segment CAGR", value: "21", unit: "%", cite: 1 },
        { label: "Target accounts", value: "42,800", cite: 2 },
      ],
      body: [
        { text: "The mid-market CFO software stack is a $12B market growing 21% YoY, consolidating around 3–4 platforms per customer.", cite: 1 },
        { text: "Keel's survey of 312 CFOs confirms the thesis: 68% report having 7+ finance SaaS vendors they want to consolidate.", cite: 2 },
        { text: "Primary incumbents are Ramp, Brex, and Mercury; each has a bottom-up motion but all three started with cards, not ledger.", cite: 3 },
      ],
    },
    competitors: {
      headline: "Ramp and Mercury are the real contests",
      entries: [
        { name: "Ramp", note: "Dominant incumbent with 16,000 logos. Recently introduced enterprise tier at a 45% discount to Keel's published pricing.", stance: "incumbent", cite: 3 },
        { name: "Mercury for Business", note: "Launched CFO v2 in Q1 2026; focused on seed/series-A customers which is below Keel's wedge, but rolls upward.", stance: "peer", cite: 4 },
        { name: "Brex", note: "Slowing growth; lost enterprise focus. Keel's mid-market wedge is defensible against Brex specifically.", stance: "incumbent", cite: 3 },
      ],
    },
    team: {
      headline: "Plaid ledger v2 DNA + a real CFO on the team",
      roster: [
        { name: "Sofia Chen", role: "Co-founder · CEO", note: "Ex-CFO at two venture-backed companies, one exit. Credibility with the customer; not a technical founder.", cite: 5 },
        { name: "Jamal Okafor", role: "Co-founder · CTO", note: "Ex-Plaid, principal engineer on ledger v2 — the system currently used by every neobank on the continent.", cite: 6 },
        { name: "Lior Ben-David", role: "VP Sales", note: "Led mid-market at Gusto through their 10–100M ARR era. Exactly right operator for this stage.", cite: 5 },
      ],
    },
    traction: {
      headline: "$9.8M ARR, 340% NRR, 4% monthly logo churn",
      stats: [
        { label: "ARR", value: "$9.8", unit: "M", cite: 7 },
        { label: "NRR (Q3-24 cohort)", value: "340", unit: "%", cite: 8 },
        { label: "Monthly churn", value: "4.0", unit: "%", cite: 7 },
      ],
      body: [
        { text: "Keel hit $9.8M ARR in Q1 2026, up from $3.4M a year prior — 188% YoY growth.", cite: 7 },
        { text: "Net revenue retention on the 18-month-old cohort is 340%, an unusually-high number that we validated against Stripe export. The expansion source is module attach: customers start with expense management and add ledger + forecasting within 9 months.", cite: 8, emphasis: "340%" },
        { text: "Worth flagging: 4% monthly logo churn is roughly 2x the best-in-class. Churn is concentrated in the sub-$1M revenue cohort Keel is now explicitly deprioritizing.", cite: 7 },
        { text: "Eleven of the 340 customers are Hubspot switchers — a thin but qualitatively useful signal that Keel is winning against a known quantity.", cite: 9 },
      ],
    },
    risks: KEEL_RISKS,
    citations: KEEL_CITATIONS,
  },
  {
    id: "memo-0040",
    slug: "memo-0040",
    company: "Cobalt Systems",
    subtitle: "Enterprise observability",
    url: "cobalt.systems",
    sector: "Devtools · Observability",
    round: "Due diligence",
    roundSize: "$120M (secondary)",
    date: "2026-04-18",
    draftedIn: "1m 52s",
    pipeline: "v7.2",
    pipelineHash: "9e13f7c",
    decision: "advance",
    decisionRationale: "180 enterprise logos is not a seed-stage bet; it is a secondary purchase of a de-risked asset. Price is fair; downside is capped by the customer base itself.",
    analyst: {
      name: "Priya Patel",
      role: "Associate",
      firm: "Anthem Ventures",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    redlinedBy: "Rayen Manaa",
    summary:
      "Cobalt is an enterprise-first observability platform with 180 logos and $34M ARR. The market is consolidating: Datadog is winning at the top, Grafana Labs at the open-source bottom, and Cobalt is credibly wedged in the enterprise middle. This is a secondary purchase, not a growth bet.",
    market: {
      headline: "Observability is consolidating, not contracting",
      stats: [
        { label: "TAM", value: "$46", unit: "B", cite: 1 },
        { label: "Incumbent share", value: "34", unit: "%", cite: 2 },
        { label: "Enterprise segment", value: "$12", unit: "B", cite: 1 },
      ],
      body: [
        { text: "The observability market is $46B growing 19% YoY, with Datadog holding 34% share at the top end.", cite: 1 },
        { text: "New Relic's acquisition by Francisco Partners in 2023 confirmed the pattern: standalone mid-market observability is dead. The survivors are enterprise-only or open-source.", cite: 3 },
        { text: "Cobalt's wedge is the enterprise buyer that wants a single pane of glass but refuses Datadog's markup.", cite: 4 },
      ],
    },
    competitors: {
      headline: "Datadog at the top, Grafana at the bottom",
      entries: [
        { name: "Datadog", note: "$2.3B revenue; clear market leader. Cobalt wins on price (approximately 40% less) for equivalent feature parity.", stance: "incumbent", cite: 2 },
        { name: "Grafana Labs + Tempo", note: "Open-source eats the bottom of the market. Cobalt's defense is the enterprise support contract and SSO/compliance packaging.", stance: "peer", cite: 5 },
        { name: "Splunk (Cisco)", note: "Still present in large accounts but technically lagging; Cisco's priorities are security, not observability.", stance: "incumbent", cite: 1 },
      ],
    },
    team: {
      headline: "Senior operators, late-career hires",
      roster: [
        { name: "Priya Patel", role: "CEO", note: "Former VP Engineering at New Relic. Sold once before; knows the enterprise sales motion cold.", cite: 6 },
        { name: "Wen Zhang", role: "CTO", note: "Principal engineer on Datadog metrics pipeline 2018–2023. Brought three senior colleagues with him.", cite: 6 },
      ],
    },
    traction: {
      headline: "$34M ARR, 180 logos, 127% NRR",
      stats: [
        { label: "ARR", value: "$34", unit: "M", cite: 7 },
        { label: "Logos", value: "180", cite: 7 },
        { label: "NRR", value: "127", unit: "%", cite: 8 },
      ],
      body: [
        { text: "Cobalt is at $34M ARR across 180 enterprise logos; ACV is $189K and trending up as new deals lean larger.", cite: 7 },
        { text: "Gross revenue retention is 94% across the 24-month observation window; net revenue retention is 127%. Both numbers are consistent with a mature enterprise observability business.", cite: 8 },
        { text: "Six customer reference calls confirm: Cobalt's on-call is faster than Datadog's and the per-host pricing is a compelling reason to switch. Standard enterprise SaaS dynamics.", cite: 9 },
      ],
    },
    risks: COBALT_RISKS,
    citations: COBALT_CITATIONS,
  },
];

export function getMemo(slug: string): Memo | undefined {
  return MEMOS.find((m) => m.slug === slug);
}

export function decisionConfig(d: Decision) {
  return {
    advance: { label: "ADVANCE", dot: "var(--accent)", ink: "var(--accent-2)" },
    hold: { label: "HOLD", dot: "#d97706", ink: "#7c2d12" },
    pass: { label: "PASS", dot: "#8a8a8a", ink: "#565656" },
  }[d];
}
