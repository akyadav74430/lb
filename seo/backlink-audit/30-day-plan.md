# 30-Day Plan — LoveBite.live Backlink & Visibility (Free Only)

## Goal

Establish measurement, publish linkable safety resources, and earn a small
number of legitimate, relevant mentions — without paid links, spam, or
automated tactics.

## Free tools used

- Google Search Console (indexing, queries, coverage)
- Bing Webmaster Tools (import from GSC)
- Ahrefs Free Backlink Checker (snapshots only)
- Google search operators (competitor discovery)
- Manual page checks (HTTP status, link presence, anchor/rel)
- Spreadsheet/CSV (this audit directory)

## Week 1 — Measurement and technical verification

Actions:
- Verify Google Search Console property (DNS TXT) and submit sitemap
  `https://www.lovebite.live/sitemap.xml`.
- Import property into Bing Webmaster Tools; submit the same sitemap.
- Record baseline: impressions, clicks, indexed pages, top queries.
- Verify canonical/redirect behaviour (already confirmed: http→https,
  non-www→www, `/city/*`→`/call-girls-in/*`).
- Confirm `ww25.lovebite.live` does not resolve (confirmed: NXDOMAIN).
- Decide whether to keep blocking AhrefsBot/SemrushBot in `robots.ts` (see
  `risk-report.md`). No change without owner approval.

Targets:
- GSC + Bing verified.
- Baseline metrics recorded.
- 0 code changes unless a demonstrated problem appears.

## Week 2 — Make the site worth citing

Actions:
- Publish real, consented listings in priority cities (Mumbai, Delhi NCR,
  Bengaluru, Hyderabad, Pune, Chennai, Jaipur, Lucknow, Ahmedabad, Goa) —
  only where genuine listings exist.
- Complete `district` and `localArea` on every profile.
- Fix implausible rate rows (< ₹1,000 likely keying errors).
- Hand-write editorial paragraphs for top 10 cities in
  `content/city-editorial.ts`.
- Expand `/faq` with one genuinely useful safety article (advance-payment
  scams). Cite the site's actual process and include a last-updated date.

Targets:
- At least 5 cities with real public listings.
- 1 safety article published and internally linked from city pages.

## Week 3 — Linkable assets and candidate research

Actions:
- Publish second safety article (duplicate-photo checks: what they can/can't
  prove).
- Run competitor discovery queries and populate `competitor-analysis.csv`
  (candidates only, labelled unverified).
- Identify 10 resource pages that might accept the safety guide.
- Prepare personalised outreach messages (templates in `outreach-plan.md`) for
  owner approval. Do not send yet.

Targets:
- 2 safety articles live.
- 10 candidate resource pages recorded with evidence URLs.
- Outreach list approved by site owner.

## Week 4 — Manual outreach and tracking

Actions:
- Send 5–10 personalised, approved outreach messages (manual, one at a time).
- Follow up once after 7–10 days if no reply.
- Ask profile owners to share their own profile URLs from their public social
  accounts (opt-in only).
- Update `competitor-analysis.csv` with outcomes.

Targets:
- 5–10 outreach messages sent (manual).
- 1–3 legitimate mentions or links earned (realistic; may be 0).
- All outcomes logged.

## Progress metrics (weekly)

- Search Console: clicks, impressions, indexed pages, top queries by city.
- Referring domains and referral sessions.
- Number of outreach messages sent / replies / links earned.
- Number of safety articles published.
- Number of cities with real public listings.

## Realistic activity targets

- Outreach volume: 5–10 personalised messages per month (not hundreds).
- Link velocity: a few legitimate links per quarter is normal for a new domain.
- Do not expect DR to move quickly; DR 0 → measurable change typically takes
  months of consistent, legitimate acquisition.

## What not to do

- No automated backlinks, comment/forum spam, PBNs, link farms, mass
  directory submissions, fake profiles, fake reviews, keyword-stuffed anchors at
  scale, or thin/empty city pages.
- No disavow submission without documented evidence and owner approval.
- No bulk outreach without approval.
