#!/usr/bin/env python3
"""Insert <ToolShowcase /> into every tool page, right after the editor component."""
import re
import sys

ROOT = "/Users/zhaozhenchao/codes/cropimagekit/app"

# route -> JSX props for ToolShowcase
PAGES = {
    "ai-dataset-cropper": 'mode="bulk" ratio="1 / 1" outputLabel="dataset.zip" caption="Batch-crop whole datasets to training-ready sizes."',
    "bulk-crop-images": 'mode="bulk" ratio="1 / 1" outputLabel="images.zip" caption="Crop a whole batch of images and download one ZIP."',
    "circle-crop-image": 'shape="circle" ratio="1 / 1" outputLabel="Round PNG · transparent" caption="Perfect circle avatars with a transparent background."',
    "crop-and-resize-image": 'ratio="3 / 2" outputLabel="Exact W × H" caption="Crop and resize to exact pixel dimensions in one step."',
    "crop-headshot": 'ratio="4 / 5" outputLabel="Framed for LinkedIn & ID" caption="Frame head and shoulders with balanced headroom."',
    "crop-image": 'ratio="4 / 3" outputLabel="Any aspect ratio" caption="Free crop or pick a common ratio — your call."',
    "crop-image-by-dimensions": 'ratio="3 / 2" outputLabel="Exact pixels" caption="Type the width and height; the crop locks to it."',
    "crop-image-for-instagram": 'ratio="4 / 5" outputLabel="1080 × 1350" caption="Portrait posts fill more of the feed."',
    "crop-image-for-tiktok": 'ratio="9 / 16" outputLabel="1080 × 1920" caption="Full-vertical crops for TikTok and Reels."',
    "crop-image-locally": 'ratio="4 / 3" outputLabel="Never leaves your device" caption="Everything runs in your browser — nothing uploads."',
    "crop-image-to-1x1": 'ratio="1 / 1" outputLabel="1080 × 1080" caption="Pixel-perfect squares at the size you need."',
    "crop-image-to-og-image-1200x630": 'ratio="1200 / 630" outputLabel="1200 × 630" caption="The share-card size every platform accepts."',
    "crop-image-to-passport-size": 'ratio="35 / 45" outputLabel="Official ID sizes" caption="Head framed to passport and visa requirements."',
    "crop-images-for-lora-training": 'mode="bulk" ratio="1 / 1" outputLabel="512 · 768 · 1024 buckets" caption="Consistent square buckets for LoRA training sets."',
    "crop-product-images": 'ratio="1 / 1" outputLabel="2048 × 2048" caption="Marketplace-ready product photos."',
    "crop-screenshot": 'ratio="16 / 10" outputLabel="Clean, focused PNG" caption="Cut away toolbars, docks, and distractions."',
    "discord-profile-picture-resizer": 'shape="circle" ratio="1 / 1" outputLabel="512 × 512" caption="Sharp round avatars for Discord."',
    "facebook-cover-photo-resizer": 'ratio="851 / 315" outputLabel="851 × 315" caption="Frame your cover for desktop and mobile."',
    "linkedin-background-photo-resizer": 'ratio="1584 / 396" outputLabel="1584 × 396" caption="Wide banners that survive LinkedIn’s crop."',
    "oval-crop-image": 'shape="oval" ratio="4 / 5" outputLabel="Oval PNG · transparent" caption="Soft oval crops with transparent corners."',
    "profile-photo-cropper": 'shape="circle" ratio="1 / 1" outputLabel="Profile-ready" caption="Centered, well-framed profile photos."',
    "resize-image-to-1080x1080": 'ratio="1 / 1" outputLabel="1080 × 1080" caption="The universal square size."',
    "resize-image-to-1920x1080": 'ratio="16 / 9" outputLabel="1920 × 1080" caption="Full HD frames for video and slides."',
    "smart-crop-image": 'mode="smart" ratio="4 / 5" outputLabel="Subject stays centered" caption="Lock the subject once — every ratio keeps it centered."',
    "social-media-image-pack": 'mode="bulk" ratio="1 / 1" outputLabel="All platforms · one ZIP" caption="One upload, every platform size."',
    "social-media-safe-zone": 'mode="safezone" heading="Preview the safe zones" outputLabel="Checked before publishing" caption="See which areas platform UI will cover before you post."',
    "trim-screenshot": 'ratio="16 / 9" outputLabel="Edges trimmed" caption="Trim empty borders and keep the content."',
    "twitch-profile-picture-resizer": 'shape="circle" ratio="1 / 1" outputLabel="256 × 256" caption="Crisp avatars for your Twitch channel."',
    "twitter-header-resizer": 'ratio="3 / 1" outputLabel="1500 × 500" caption="Headers that look right on every screen."',
    "youtube-vertical-thumbnail-checker": 'mode="safezone" heading="Check the vertical crop" outputLabel="Checked before publishing" caption="Compare crops before your thumbnail goes live."',
}

EDITOR_RE = re.compile(
    r"^(?P<indent>\s*)<(?P<ed>CropEditor|BulkCropEditor|CircleCropEditor|OvalCropEditor|"
    r"SmartCropEditor|SocialSafeZoneEditor|ExportPackEditor|YouTubeVerticalThumbnailEditor|"
    r"DimensionsCropClient)(\s[^>]*)?/>"
)
IMPORT_ANCHOR = 'import StructuredData from "@/components/StructuredData";'
IMPORT_LINE = 'import ToolShowcase from "@/components/ToolShowcase";'

changed, failed = [], []
for route, props in PAGES.items():
    path = f"{ROOT}/{route}/page.tsx"
    try:
        src = open(path, encoding="utf-8").read()
    except FileNotFoundError:
        failed.append((route, "file not found"))
        continue
    if "ToolShowcase" in src:
        failed.append((route, "already inserted"))
        continue
    if IMPORT_ANCHOR not in src:
        failed.append((route, "no StructuredData import anchor"))
        continue
    src = src.replace(IMPORT_ANCHOR, IMPORT_ANCHOR + "\n" + IMPORT_LINE, 1)
    lines = src.split("\n")
    out, done = [], False
    for line in lines:
        out.append(line)
        if not done:
            m = EDITOR_RE.match(line)
            if m:
                indent = m.group("indent")
                out.append("")
                out.append(f"{indent}<ToolShowcase {props} />")
                done = True
    if not done:
        failed.append((route, "editor JSX not found"))
        continue
    open(path, "w", encoding="utf-8").write("\n".join(out))
    changed.append(route)

print(f"changed: {len(changed)}")
for r in changed:
    print("  +", r)
if failed:
    print("failed:")
    for r, why in failed:
        print("  !", r, "-", why)
    sys.exit(1)
