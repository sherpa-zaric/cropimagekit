# ImageCropKit SEO Operations

Started: 2026-09-08. Owner: Codex, with user authorization to test, commit, push and verify deployment after scoped changes.

## Operating model

Work in rolling 12-week cycles. Run every five hours, continuing the current backlog rather than inventing a new plan each run. A run may deliver a verified improvement, collect evidence, or record a blocked dependency. Do not publish merely to fill a schedule.

The product thesis and exclusions remain in IMPLEMENTATION_PLAN.md and CLAUDE.md. Prioritize creators and the multi-size export workflow. Preserve unrelated work. Never commit credentials or user analytics exports to this public repository.

## Cycle 1: 2026-09-08 through 2026-11-30

Objective: establish trustworthy measurement, improve existing creator pages, and validate whether organic visitors complete the export workflow. No traffic or ranking guarantee. Set numeric growth targets only after obtaining a usable baseline.

| Phase | Target window | Deliverables | Acceptance evidence |
| --- | --- | --- | --- |
| A: Baseline and reliability | Sep 8-21 | URL inventory; technical crawl; GA/GSC access assessment; event-delivery verification; prioritized defects | Sitemap URLs audited for status, canonical, indexing directives, titles, H1 and internal links; GA receipt independently verified or explicitly blocked |
| B: Creator content | Sep 22-Oct 12 | Review existing social dimensions guide against primary sources; remove unsupported claims; connect guide and tools to export workflow | One maintained guide with sources and accurate dates; links open intended presets; no duplicate-intent page introduced |
| C: Discovery and conversion | Oct 13-Nov 2 | Improve evidence-backed title/description opportunities and internal links; fix mobile workflow friction; prepare three demo/distribution drafts | Changes documented with hypotheses; actual UI/export checks pass; no external posting without authorization |
| D: Evaluation and next cycle | Nov 3-30 | Compare available windows; review content coverage and funnel; choose creator, store or AI direction | Written review with actual numbers or explicit unknowns; next 12-week plan created with owners, priorities and acceptance criteria |

Windows are planning targets, not reasons to delay ready work or declare unfinished work complete. Mark each deliverable done, blocked, or deferred with evidence. At cycle close, carry unfinished priorities into the next cycle with reasons. Create Cycle 2 in this same file after the review, and repeat indefinitely while the automation is active. Do not silently restart Cycle 1.

## Measurement rules

- Search: GSC clicks, impressions, CTR and position by query and landing page; track indexing separately. Public page availability does not prove indexing.
- Usage: GA4 organic sessions, upload users and users who subsequently trigger export_pack_downloaded. Use a sequenced user/session funnel, not raw download events divided by upload events; repeated downloads can inflate that ratio.
- Download event means ZIP creation and browser download initiation, not proven disk-save completion.
- Segment by landing page and pack when sample size supports it. Never compare different consent/collection regimes as if instrumentation were unchanged.
- Baseline: latest complete 28 days compared with the preceding 28, excluding incomplete dates and documenting the GA outage/recovery. Use shorter windows only as provisional diagnostics.
- Every five hours: operational checks and one prioritized action. Weekly: backlog and baseline review. Allow at least 28 days for directional search evaluation; do not repeatedly rewrite titles on five-hour fluctuations.
- If GA/GSC access is unavailable, continue technical and content work; report unknown metrics rather than zero. Request access once and retain the dependency.

## Current backlog

| ID | Priority | Task | Status |
| --- | --- | --- | --- |
| A01 | P0 | Establish baseline and recurring operating plan | Done: initial observations below; full crawl still A02 |
| A02 | P0 | Audit all sitemap URLs; save structured status/canonical/title/H1/robots results and rank actual defects | Next |
| A03 | P0 | Verify GA event receipt and obtain GSC/GA reporting access | Blocked: no reporting connector found; script presence alone insufficient |
| A04 | P1 | Audit sitemap lastmod against real content changes | Pending: all observed entries share 2026-08-07; do not mass-update to today |
| B01 | P1 | Audit existing social-media-image-sizes-2026 guide and its tool links | Pending: unsupported 17-30% engagement statement identified |
| B02 | P1 | Verify or implement preset-specific guide-to-export-pack links | Pending |
| C01 | P2 | Prepare three creator demos and distribution drafts | Pending |
| D01 | P1 | Review Cycle 1 outcomes and create Cycle 2 | Pending |

## Run log

### 2026-09-08: Cycle 1 kickoff

- Production robots.txt retrieved successfully: User-Agent * permits / and declares the canonical sitemap URL.
- Production sitemap.xml retrieved successfully; includes the export pack, safe-zone checker, YouTube checker and existing social-media-image-sizes-2026 guide.
- Production /social-media-image-pack returned HTTP 200.
- Sitemap entries observed use the same 2026-08-07 lastmod. This needs verification, not an assumption of an indexing defect.
- Existing guide includes an unsourced claim of 17-30% higher engagement for 4:5 posts. Review the evidence or remove the claim during B01.
- No GA/GSC reporting tool was available in tool discovery. Clicks, impressions, indexing coverage and conversion baseline are unknown.
- This run creates the persistent cycle, backlog and automation continuation rules. No ranking improvement is claimed. Next run starts A02 and continues independently of the A03 access dependency.
