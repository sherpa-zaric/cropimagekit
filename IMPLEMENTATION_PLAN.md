# ImageCropKit Growth Implementation Plan

**Last updated:** 2026-07-11

## Product thesis

ImageCropKit should not compete as another generic browser cropper. Its promise is:

> Set the subject once, then export every format needed for the next publishing workflow.

The primary audience is creators repurposing a source image, sellers preparing product listings, and AI builders normalizing training images. The first audience to target is creators because the pain is frequent, visible, and shares naturally as a workflow rather than a utility.

## What success looks like

The product should reduce the current repeated sequence:

1. Crop a source image.
2. Change the aspect ratio.
3. Reposition the subject.
4. Download one file.
5. Repeat for every platform.

The new flow is:

1. Upload one image.
2. Mark the focal subject once.
3. Choose the outputs needed.
4. Download a named ZIP export pack.

The first useful metric is not page views; it is **export-pack completion rate**: completed ZIP downloads divided by users who upload an image into the export-pack editor. Track secondary indicators after analytics events are added: selected-output count, focal-point use, and repeat usage within seven days.

## Priority order

### P0: Multi-size focal-point export pack

**Audience:** creators repurposing a visual across social channels.

**Scope shipped in the first release:**

- One source image, processed locally.
- A focal point selected with one click.
- Creator, Store, and AI preset packs.
- Multiple target dimensions selected at once.
- Individual output preview/crop adjustment.
- PNG, JPG, and WebP export with quality control.
- One ZIP with predictable filenames.
- A dedicated landing page and homepage entry point.

**Deliberately excluded:** automatic AI subject detection, accounts, cloud history, billing, background removal, and collaboration. These add complexity before validating whether one-click focal-point exports solve a repeat problem.

**Acceptance criteria:** a user can create at least three differently sized crops from one image, keep a clicked subject in frame, and download all outputs in a ZIP without any image leaving the browser.

### P1: Creator export pack landing page and distribution

Create `/social-media-image-pack` around the creator workflow, plus a durable guide on current social image dimensions. The guide must include direct links that open the export pack with the matching preset group. Publish short before/after demos showing one visual becoming feed, story, thumbnail, and pin assets.

### P2: Ecommerce listing pack

Make a store-focused version with Shopify, Etsy, Amazon, square catalog, and thumbnail targets. Add filenames that make listing uploads less error-prone. Validate it with sellers before building marketplace-specific rules.

### P3: LoRA / AI dataset preparation pack

Extend the current batch cropper into a training-prep workflow: selected SD 1.5, SDXL, Flux, portrait, and landscape buckets; source filename preservation; optional caption-template companion files. Do not claim AI auto-cropping unless actual subject detection is introduced and measured.

## Four-week release sequence

| Week | Outcome | Evidence to collect |
| --- | --- | --- |
| 1 | P0 live: focal point + multi-output ZIP export | Completion rate and output count per export |
| 2 | Creator landing page and dimensions guide live | Search impressions, CTA-to-upload rate |
| 3 | Share creator demos in relevant communities | Clicks, qualitative feedback, repeat visits |
| 4 | Ship the strongest validated vertical pack | Completion rate by pack, requests for next presets |

## Distribution plan

Lead with the saved-work story: “one image to every channel, with the subject kept in frame.” Do not lead with “free cropper.”

- Creator communities: show a single source photo becoming a 4:5 feed post, 9:16 story, 16:9 thumbnail, and 2:3 pin in one action.
- Seller communities: show listing-ready files and clear filenames, rather than generic crop controls.
- AI communities: talk about consistent dataset framing and ZIP-ready outputs, not unverified AI claims.
- SEO: preserve existing individual tool pages as intent capture; use workflow pages as the higher-value conversion destination.

## Pricing and validation guardrails

Keep P0 free while validating behavior. Do not add an account wall. If repeat use is strong, test a simple paid tier only around high-value batch workflows: many source files, reusable export recipes, and larger batch limits. A reasonable first test is a free single-image pack and a paid batch export pack, not a broad feature paywall.

## Decisions to revisit after P0

- Which pack has the highest completion and return rate?
- Do users prefer automatic preset bundles or hand-picked outputs?
- Does focal-point selection materially reduce manual crop adjustments?
- Are users asking for repeatable recipes enough to justify local saved presets before considering accounts?
