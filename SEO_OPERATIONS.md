# ImageCropKit SEO Operations

Started: 2026-09-08. Owner: Codex, with user authorization to test, commit, push and verify deployment after scoped changes.

## Operating model

Work in rolling 12-week cycles. Run every three days at 09:00 Asia/Shanghai, continuing the current backlog rather than inventing a new plan each run. Deliver a verified functional improvement or a complete actionable analysis, not isolated checks or log commits. Do not publish merely to fill a schedule.

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
- Every three days: one substantive work package. Weekly: backlog and baseline review alongside delivery. Allow at least 28 days for directional search evaluation; do not repeatedly rewrite titles on short-term fluctuations.
- If GA/GSC access is unavailable, continue technical and content work; report unknown metrics rather than zero. Request access once and retain the dependency.

## Current backlog

| ID | Priority | Task | Status |
| --- | --- | --- | --- |
| A01 | P0 | Establish baseline and recurring operating plan | Done: initial observations below; full crawl still A02 |
| A02 | P0 | Audit all sitemap URLs; save structured status/canonical/title/H1/robots results and rank actual defects | Done: 2026-09-09, 51 pages; report below |
| A03 | P0 | Verify GA event receipt and obtain GSC/GA reporting access | In progress: browser reporting access verified; export-event receipt and full comparative analysis pending; private evidence outside git |
| A04 | P1 | Audit sitemap lastmod against real content changes | Done: published with 064a37e; production sitemap has 51 URLs without inaccurate lastmod |
| B01 | P1 | Audit existing social-media-image-sizes-2026 guide and its tool links | In progress: sourced YouTube/Pinterest and X profile/header guidance; Instagram/TikTok source access blocked; LinkedIn next, Facebook pending |
| B02 | P1 | Verify or implement preset-specific guide-to-export-pack links | Implemented: creator/store/ai links; desktop/mobile ZIP verification passed |
| C01 | P2 | Prepare three creator demos and distribution drafts | Pending |
| D01 | P1 | Review Cycle 1 outcomes and create Cycle 2 | Pending |

## Run log

### 2026-09-18: Exact-size export reliability and page accuracy

- Fixed default-preset synchronization overriding a user's selected output on the dimensions editor. External default changes still synchronize; local preset selection now persists.
- Added accessible width/height labels. Corrected crop-and-resize FAQ claims about lossless resizing and retaining the whole source with a different aspect ratio. Added concrete ratio examples and contextual batch/creator-pack links; removed unsupported marketplace size requirements.
- Local production-build Playwright checks passed at 1280 and 390 pixels: selected 1920x1080 persists, actual PNG dimensions match 1920x1080 and custom 640x480; no page errors or horizontal overflow. Main export control verified; separate mobile fixed-bar check remains pending.
- Build and lint passed (six existing image warnings). Deployment acceptance pending. Existing screenshot-page work excluded.
- Next: bulk event receipt and ordered source/session funnel, plus GSC core-page indexing and full 28-day comparison. New export instrumentation needs an observation window; no traffic gain inferred.

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

### 2026-09-10: B01 Instagram source-access limitation

- Production homepage returned HTTP 200; previous commit 1377681 has successful deployment status. Working tree was clean before this run.
- Instagram photo-resolution and Reel-size help pages returned HTTP 429; Facebook help mirrors redirected to blocked/login pages. The agent-reach Jina reader returned 401. No authenticated access or access-control workaround attempted.
- Secondary search results suggest a newer 3:4 feed option, but no accessible primary source was verified. Do not promote those results into an official specification or mark Instagram review complete.
- Clarified that Instagram table entries are example canvases, not exhaustive formats or official minimums. Removed the unsourced universal Reel-cover row and linked official help with an explicit verification caveat. Existing crop presets and publication date are unchanged.
- Next: review TikTok against primary sources; retain Instagram source verification as blocked until an accessible official source is available. Facebook and LinkedIn remain pending. GA/GSC reporting and traffic impact remain unknown.
- Validation: pnpm build and git diff --check passed; pnpm lint completed with zero errors and six existing image warnings.

### 2026-09-10: B01 TikTok source check

- Homepage returned HTTP 200. Previous commit 125fe92 has successful deployment status. Working tree was clean and sherpa-zaric authentication is active.
- Official profile-photo and editing/posting help URLs returned no article body through web extraction. A direct request to the profile-photo URL redirected to TikTok's new support FAQ route; following it returned an application shell without readable specification text. Jina reader returned 401. Search results did not provide usable primary-source evidence.
- No avatar minimum, photo-post dimensions or cover-upload behavior was verified. Existing starting-point guidance is unchanged; no speculative specification or fresh verification date published. TikTok verification remains blocked, not complete.
- Next actionable task: review LinkedIn profile/banner guidance against accessible primary sources. Facebook remains pending; revisit Instagram/TikTok when source access changes rather than retrying unchanged failures every heartbeat. B02 can proceed independently if remaining sources stay unavailable.
- GA/GSC reporting remains unavailable; no new traffic, indexing or conversion measurement. This run records evidence only and makes no user-facing website changes.
- Validation: pnpm build and git diff --check passed; pnpm lint passed with six existing image warnings.

### 2026-09-20: Bulk workflow and evidence-based guide

- Prioritized the existing bulk tool and guide over new overlapping landing pages. Full reporting comparisons are stored privately; reporting access is available, not blocked. Further index investigation is deferred by the owner. Bulk-specific event receipt and an ordered conversion funnel remain unverified.
- Fixed mixed-orientation crop copying, duplicate ZIP filename collisions, and premature object-URL cleanup. Added actual output dimensions/names, per-image adjustment states, export busy protection and retry of failed images.
- Replaced the generic bulk illustration with downloadable test originals and actual tool-exported PNGs. Updated the existing guide to distinguish aspect ratio from pixel dimensions, explain mixed-image review and partial export recovery, and link to exact-size and multi-size tools. No new route or unsupported platform specification added.
- Four focused unit tests cover crop geometry and unique filenames. Build and lint pass (six existing image warnings). Desktop/mobile ZIP and publication acceptance are recorded in private operational memory; no traffic or ranking improvement is claimed from implementation alone.
- Next: allow an observation window for this release, then improve another proven crop workflow if a concrete gap exists. Do not repeat analytics UI work or rebuild this same package just to fill a scheduled run.

### 2026-09-12: B02 preset entry implementation

- Added validated pack query selection to the editor with Creator fallback and a Suspense boundary. Guide now links to Creator, Store and AI export workflows. Canonical remains query-free; no new sitemap URLs.
- Playwright on local production build at widths 1280 and 390 verified guide navigation, selected pack and output counts, switching crop previews, ZIP download and decoded image dimensions for all three packs. No page errors or horizontal overflow; screenshots saved outside git. Browser skill unavailable, regular Playwright used.
- Build passed; lint passed with six existing warnings. Other uncommitted page/showcase work was preserved and excluded from this commit. Tests used that working-tree build; production must independently verify the scoped commit.
- Next: A03 indexing diagnosis and export-event receipt. Source-verification blockers must not replace implementation work. Private analytics evidence stays outside the public repository.
