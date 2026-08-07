import type { Metadata } from "next";
import dynamic from "next/dynamic";
const CropEditor = dynamic(() => import("@/components/CropEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import { socialPresets } from "@/lib/presets";

export const metadata: Metadata = {
  title: "LinkedIn Background Photo Resizer — 1584×396 Free Online",
  description:
    "Resize and crop images to 1584×396 for your LinkedIn background banner. Free browser-based tool — no upload, no signup, no watermark. Keeps your banner sharp on desktop and mobile.",
  alternates: { canonical: "https://imagecropkit.com/linkedin-background-photo-resizer" },
};

const linkedinBannerPresets = socialPresets.filter((p) => p.id === "linkedin-banner");
const defaultPreset = linkedinBannerPresets[0];

const faqItems = [
  { question: "What size is a LinkedIn background photo?", answer: "The recommended LinkedIn background photo size is 1584×396 pixels with a 4:1 aspect ratio. This is the display size used on desktop browsers." },
  { question: "Why does my LinkedIn banner crop differently on mobile?", answer: "LinkedIn crops the banner responsively. On mobile it shows a narrower horizontal band and may cut off content near the top and bottom edges. Keep important elements in the center 1584×280 safe zone." },
  { question: "Can I use text in my LinkedIn banner?", answer: "Yes. Text works well for a tagline, job title, or call to action. Keep text in the center safe zone, use a large font, and avoid the edges that may be clipped on mobile." },
  { question: "Is this LinkedIn background resizer free?", answer: "Yes. The tool is free with no signup, no watermark, and no limits on the number of banners you create." },
  { question: "Are my images uploaded to a server?", answer: "No. Your image is processed locally in your browser using the Canvas API. Nothing is sent to any server." },
];

const related = [
  { title: "Twitter Header Resizer", href: "/twitter-header-resizer", description: "Resize images to 1500×500 for X/Twitter profile headers." },
  { title: "Facebook Cover Photo Resizer", href: "/facebook-cover-photo-resizer", description: "Crop images to 820×312 for Facebook page covers." },
  { title: "OG Image Cropper", href: "/crop-image-to-og-image-1200x630", description: "Crop images to 1200×630 for social share card previews." },
  { title: "Headshot Cropper", href: "/crop-headshot", description: "Crop professional headshots for LinkedIn profile photos." },
  { title: "Profile Photo Cropper", href: "/profile-photo-cropper", description: "Make a square profile photo at common avatar sizes." },
];

export default function LinkedInBackgroundPhotoResizerPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">LinkedIn Background Photo Resizer — 1584×396</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Crop any image to 1584×396 for your LinkedIn background banner. Free, browser-based, no upload and no watermark.
        </p>
      </div>

      <CropEditor defaultPreset={defaultPreset} showPresets={linkedinBannerPresets} showTrustBadges />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>LinkedIn background photo size</h2>
        <p>
          The recommended LinkedIn background photo size is 1584 pixels wide by 396 pixels tall,
          a 4:1 aspect ratio. This is the display size LinkedIn uses on desktop, and it sits behind
          your profile photo and headline at the top of your profile. A correctly sized 1584×396
          banner avoids the soft, scaled look that comes from uploading a smaller image and letting
          LinkedIn stretch it to fit.
        </p>
        <p>
          LinkedIn accepts JPG and PNG up to 8 MB. For the sharpest result, start from an image
          that is at least 1584×396 (or larger and crop down). Anything smaller will be upscaled
          and will look blurry, especially on high-DPI displays where the header is rendered at
          twice the resolution.
        </p>

        <h2>Why the banner crops differently on mobile</h2>
        <p>
          The 1584×396 size is the desktop display size. On the LinkedIn mobile app the same image
          is cropped to a narrower horizontal band, and the top and bottom of the banner are
          clipped. Your profile photo also sits over the lower-left of the banner on mobile,
          covering part of the image that is visible on desktop.
        </p>
        <p>
          The safest approach is to keep important content inside the center 1584×280 band. Put
          your tagline, job title, company name, or call to action inside that zone, and treat the
          top and bottom 60 pixels as padding. This way the banner reads correctly on both desktop
          and mobile without repositioning.
        </p>

        <h2>How to resize a LinkedIn banner</h2>
        <ol>
          <li>Upload your image by dragging it in or pasting from the clipboard.</li>
          <li>The crop area is pre-set to 1584×396 (4:1). Adjust the handles to compose your banner.</li>
          <li>Keep important content inside the center 1584×280 safe zone.</li>
          <li>Choose JPG for a smaller file or PNG for sharp text and graphics.</li>
          <li>Download the image and upload it in your LinkedIn profile settings.</li>
        </ol>

        <h2>LinkedIn banner best practices</h2>
        <ul>
          <li><strong>Aspect ratio</strong>: 4:1 (1584×396). Uploading a different ratio forces LinkedIn to crop your image.</li>
          <li><strong>Safe zone</strong>: Center 1584×280 for content that must survive mobile cropping.</li>
          <li><strong>Avoid clutter</strong>: A banner with one focal element and a clear tagline reads better than a busy photo.</li>
          <li><strong>Profile photo overlap</strong>: Your avatar and headline sit over the bottom-left of the banner on desktop and mobile. Keep that corner clean.</li>
          <li><strong>File size</strong>: Keep under 8 MB. JPG at 85% quality is usually plenty.</li>
        </ul>

        <h2>What to avoid in a LinkedIn banner</h2>
        <p>
          Avoid stock-photo clichés (handshakes, abstract globes, motivational text overlays) and
          avoid small text that becomes unreadable when LinkedIn shrinks the banner on mobile.
          Avoid placing logos or text in the bottom-left corner where your profile photo overlaps
          the banner. And avoid uploading an image at a different aspect ratio — LinkedIn will
          crop the result unpredictably.
        </p>

        <h2>Private and browser-based</h2>
        <p>
          Your image never leaves your device. ImageCropKit runs entirely in your browser using the
          Canvas API — no server upload, no account, and no watermark on the output. This makes it
          safe to use for personal branding, company banners, or draft concepts you are not ready
          to publish yet.
        </p>

        <h2>Pair your banner with a strong profile photo</h2>
        <p>
          A sharp banner works best alongside a sharp headshot. Use the Headshot Cropper for a
          clean 4:5 or 1:1 LinkedIn profile photo, or the Profile Photo Cropper for a square
          avatar at the standard LinkedIn size. If you also manage a company page header, switch
          to the Twitter or Facebook cover resizer for those platform-specific dimensions.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData
        pageTitle="LinkedIn Background Photo Resizer — 1584×396"
        pageUrl="https://imagecropkit.com/linkedin-background-photo-resizer"
        appName="LinkedIn Background Photo Resizer"
        faqItems={faqItems}
        howToSteps={[
          { name: "Upload your image", text: "Drag and drop, click to upload, or paste an image from your clipboard." },
          { name: "Adjust the crop to 1584×396", text: "The crop area is pre-set to 1584×396 (4:1). Drag the handles to frame the part of your image you want as the banner." },
          { name: "Choose a format", text: "Pick JPG for a smaller file or PNG for sharp text and graphics." },
          { name: "Download", text: "Download the 1584×396 banner and upload it in your LinkedIn profile settings." },
        ]}
      />
    </div>
  );
}