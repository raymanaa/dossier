# Dossier — Investment memo automation

>  Paste a company URL, get a signed investment memo with citations.

## M0 — Design direction (LOCKED)

Per the portfolio rule, these decisions are fixed before any scaffolding. The rest of the build must honor them or a new M0 needs to be opened.

### Reference vibe
**Stripe Press + The Economist + Ramp Docs** — editorial long-form. Generous whitespace. Hairline borders. Print-inspired discipline. A memo viewer that reads like a magazine article, not an app.

### Typography
- **Display**: Newsreader (Google Fonts) — high-contrast editorial serif. Italic for section openers.
  - Explicitly distinct from Fraunces / Source Serif 4 / IBM Plex Serif / Instrument Serif used on earlier projects.
- **Body + UI**: Public Sans (US Government typeface via Google Fonts). Neutral, readable, genuinely uncommon in SaaS.
- **Mono**: JetBrains Mono for citations, data tables, tabular numerics.

### Layout
- Top-nav + full-width editorial canvas. **NO left sidebar.** First portfolio project without one.
- Scroll-pinned outline on the right (like doc sites) showing memo sections; auto-highlights current section.
- Single-column reading centered with 640-720px max-width for line length.

### Palette
- `--paper`: `#fafaf7` (warm off-white)
- `--ink`: `#111111` (near-black)
- `--ink-2`: `#565656`
- `--ink-3`: `#8a8a8a`
- `--line`: `#e5e5e0`
- `--accent`: `#b91c1c` (classic editorial red — for citation chips, IC seal, one-per-page moments)

Monochrome discipline. Red used sparingly. No gradients. No drop-shadow except for a single "memo exported" seal element.

## Audience
- VC associates (first-pass memos, IC prep)
- BD analysts (competitive briefs)
- M&A analysts (preliminary target reviews)
- Angel investors (opportunity triage)

## Real problem
A first-pass investment memo takes a junior analyst 3-5 hours of research. By the time the memo is ready, the IC has often voted on other deals. Quality is inconsistent across analysts. Citations get dropped; bias creeps in; every partner gets a different-feeling memo.

## What Dossier is
Paste a company URL → get a structured memo with fixed sections (Market, Competitors, Team, Traction, Risks), every factual claim backed by a citation chip, signed with the pipeline version hash for audit.

## Stack
- Next 16 static export + Cloudflare Workers + Static Assets
- Public Sans + Newsreader + JetBrains Mono via next/font/google
- framer-motion for the animated hero diagram (see M1 brief)
- lucide-react for line-weight icons (sparingly)

## Landing page requirements (from portfolio rule 2)
1. **Animated hero diagram**: A memo being authored live. Section headers materialize (Market → Competitors → Team → Risks), body text streams in, citation chips fly in from the right margin and dock at claims, a final "IC-ready" seal stamps in red at the end. 10s loop.
2. **Inline real product component**: A full `RisksSection` from the app rendered directly on the landing with 3 risks + citation superscripts + hover popovers + source drawer. Live, not a screenshot.

## Milestones
- M0 — Design direction ✅ (this doc)
- M1 — Scaffold + landing + deploy
- M2 — Memo reader (full-width editorial canvas)
- M3 — Memos index
- M4 — Paste-URL generate flow
- M5 — Citations + hover popovers
- M6 — Shareable memo URL + export
- M7 — Polish + README
