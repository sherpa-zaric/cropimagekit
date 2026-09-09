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
| A02 | P0 | Audit all sitemap URLs; save structured status/canonical/title/H1/robots results and rank actual defects | Done: 2026-09-09, 51 pages; report below |
| A03 | P0 | Verify GA event receipt and obtain GSC/GA reporting access | Blocked: no reporting connector found; script presence alone insufficient |
| A04 | P1 | Audit sitemap lastmod against real content changes | Done: published with 064a37e; production sitemap has 51 URLs without inaccurate lastmod |
| B01 | P1 | Audit existing social-media-image-sizes-2026 guide and its tool links | In progress: sourced YouTube/Pinterest and X profile/header guidance; Instagram, TikTok, Facebook and LinkedIn remain |
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

### 2026-09-09: A02 sitemap audit completed

- Evidence: [structured page results](reports/seo/2026-09-09-sitemap-audit.json); repeatable command: `python3 scripts/audit_sitemap.py`.
- 51/51 sitemap URLs returned final HTTP 200 after allowing up to three redirects. All have one matching canonical (root slash normalized), one nonempty title, one H1 and one nonempty description.
- No duplicate titles/descriptions, detected noindex directives, or JSON-LD syntax errors. This does not validate structured-data eligibility or whether Google selects those canonicals.
- Every sitemap page has an incoming link in the audited HTML set. Internal destinations outside the sitemap, redirect chains, robots policies beyond the observed permissive file, and client-rendered content were not exhaustively audited.
- Production robots.txt permits crawling. Prior production commit status was successful. No page edits were warranted by these checks; only the audit utility, public-page evidence and this log changed.
- GA/GSC access remains blocked as recorded in A03; search traffic, actual indexation and conversion trends remain unknown. No health score or ranking gain is inferred from this technical pass.
- Next actionable task is A04: verify lastmod provenance against real content revisions; then B01 source/claim review. Do not repeat A02 on every heartbeat unless a change or incident warrants it.
- Validation: production crawl completed; pnpm build passed; lint passed with six existing image warnings. Publication blocked: two gh auth status checks reported invalid credentials for the active sherpa-zaric account. Keep this run as a local commit until authentication works, then push and verify deployment before further publication.

### 2026-09-09: A04 lastmod provenance

- Production homepage returned 200. Active sherpa-zaric authentication still reports invalid credentials; previous local audit commit remains unpublished.
- app/sitemap.ts sets every entry to a single LAST_UPDATED value of 2026-08-07. Commit a75039f changed the privacy page's analytics policy on 2026-09-08, proving that the shared date no longer describes all pages.
- Removed the optional global lastModified value. All sitemap URLs, priorities and frequencies remain unchanged. No build timestamps or speculative per-page dates added.
- Basis: [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=en) requires consistently verifiable lastmod accuracy; the installed Next.js sitemap type permits omission. Restore dates only when a maintained per-page significant-revision source is available.
- Next: publish and verify the pending sitemap fix once authentication works; B01 content review can proceed independently. GA/GSC metrics remain unknown.
- Validation: pnpm build passed; lint passed with six existing image warnings. Parsed the generated sitemap XML and compared its URL set with A02 evidence: all 51 URLs unchanged and no lastmod elements. Production verification remains pending publication.

### 2026-09-09: B01 first editorial pass

- Production guide returned 200. GitHub keyring authentication recovered with sherpa-zaric active; pending A02/A04 commits can now publish together with this run.
- Removed unsupported Instagram engagement percentages, Pinterest distribution guarantees, and absolute TikTok/LinkedIn display claims. Added a contextual link to the existing creator export pack.
- Checked YouTube official help: current recommendation is 3840x2160 for video and 2160x3840 for Shorts. Guide distinguishes these from the checker's existing output sizes and links to exact-size cropping. Pinterest creator FAQ search evidence recommends 2:3 images and 9:16 videos; direct FAQ fetch timed out. Sources linked in the guide.
- Preserved original publication date and added a scoped editorial update date. B01 remains incomplete: Instagram, TikTok, Facebook, LinkedIn and X tables still need primary-source review; no fresh all-platform verification claimed.
- GA/GSC reporting remains unavailable. Next task: continue B01 remaining specifications, then B02 preset-specific entry behavior. No measured traffic impact yet.

### 2026-09-09: B01 X profile and header review

- Previous publication 064a37e succeeded on Vercel. Production guide returned 200 with the editorial update and creator-pack link; production sitemap retained 51 URLs with no lastmod. A02/A04 publication blockers are resolved.
- Checked [X official profile upload help](https://help.x.com/en/managing-your-account/common-issues-when-uploading-profile-photo): 400x400 avatar, 1500x500 header, 2 MB profile-photo limit, and device-dependent header cropping. Added source, practical preview guidance and an exact-size tool link.
- Labeled the post canvas as an example, removed unsupported fixed four-image grid and summary-card dimensions, and limited the editorial review claim to verified formats.
- Next: review Instagram specifications against primary sources, then TikTok, Facebook and LinkedIn. Continue B01, not a new cycle; no measured traffic impact or GA/GSC receipt claimed.
- Validation: pnpm build passed; pnpm lint passed with six existing image warnings; git diff --check passed. Five-hour heartbeat continuation now follows the unfinished backlog without a stale A02 priority.
