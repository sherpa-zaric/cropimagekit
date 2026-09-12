import type { Metadata } from "next";
import dynamic from "next/dynamic";
const CropEditor = dynamic(() => import("@/components/CropEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import ToolShowcase from "@/components/ToolShowcase";
import { socialPresets } from "@/lib/presets";

export const metadata: Metadata = {
  title: "Twitter Header Resizer — Crop to 1500×500 Free Online",
  description:
    "Resize and crop images to 1500×500 for your Twitter/X profile header. Free browser-based tool — no upload, no signup, no watermark. Keeps your header sharp on desktop and mobile.",
  alternates: { canonical: "https://imagecropkit.com/twitter-header-resizer" },
};

const twitterHeaderPresets = socialPresets.filter((p) => p.id === "twitter-header");
const defaultPreset = twitterHeaderPresets[0];

const faqItems = [
  { question: "What size is a Twitter/X header image?", answer: "The recommended Twitter (X) header size is 1500×500 pixels with a 3:1 aspect ratio. This is the display size used on desktop browsers." },
  { question: "Can I use a 1500×500 header on mobile?", answer: "Yes, but the visible area differs on mobile. Mobile browsers crop the top and bottom of the header and show a narrower horizontal band, so keep logos and text in the center safe zone." },
  { question: "Why does my header look different on mobile?", answer: "Twitter crops headers responsively. On mobile it shows a smaller horizontal slice than on desktop, which can cut off content near the top and bottom edges. Keep important elements within the center 1500×360 band." },
  { question: "Is this Twitter header resizer free?", answer: "Yes. The tool is free with no signup, no watermark, and no limits on the number of headers you create." },
  { question: "Are my images uploaded to a server?", answer: "No. Your image is processed locally in your browser using the Canvas API. Nothing is sent to any server." },
];

const related = [
  { title: "OG Image Cropper", href: "/crop-image-to-og-image-1200x630", description: "Crop images to 1200×630 for social share card previews." },
  { title: "LinkedIn Background Photo Resizer", href: "/linkedin-background-photo-resizer", description: "Resize images to 1584×396 for LinkedIn profile banners." },
  { title: "Facebook Cover Photo Resizer", href: "/facebook-cover-photo-resizer", description: "Crop images to 820×312 for Facebook page covers." },
  { title: "Crop Image Online", href: "/crop-image", description: "A simple single-image cropper with common aspect ratios." },
];

export default function TwitterHeaderResizerPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Twitter Header Resizer — 1500×500</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Crop any image to 1500×500 for your X/Twitter profile header. Free, browser-based, no upload and no watermark.
        </p>
      </div>

      <CropEditor defaultPreset={defaultPreset} showPresets={twitterHeaderPresets} showTrustBadges />

      <ToolShowcase ratio="3 / 1" outputLabel="1500 × 500" caption="Headers that look right on every screen." />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Twitter / X header image size</h2>
        <p>
          The official Twitter (now X) profile header size is 1500 pixels wide by 500 pixels tall,
          a 3:1 aspect ratio. This dimensions guideline has stayed consistent through the rebrand
          from Twitter to X, and it is what the platform renders on desktop browsers. A correctly
          sized 1500×500 header avoids the blurry scaling that happens when you upload a smaller
          image and the platform stretches it to fit.
        </p>
        <p>
          X recommends uploading a JPG or PNG with a file size under 5 MB. For the sharpest result,
          start from an image that is at least 1500×500 (or larger and crop down). Anything smaller
          than 1500×500 will be upscaled and will look soft, especially on retina displays.
        </p>

        <h2>Why headers look different on mobile</h2>
        <p>
          The 1500×500 header is the desktop display size, but on mobile the same image is cropped
          to a narrower horizontal band. The visible area on a phone is roughly the center 1500×360
          strip, while the top and bottom of your 1500×500 image are clipped off. This is why logos
          and text that look fine on a laptop can get cut off on a phone.
        </p>
        <p>
          The safest approach is to treat the center 1500×360 region as your safe zone. Put your
          name, tagline, logo, or any other important element inside that band, and leave the top
          and bottom edges as background or padding. This way the header reads correctly on both
          desktop and mobile without repositioning.
        </p>

        <h2>How to resize a Twitter header</h2>
        <ol>
          <li>Upload your image by dragging it in or pasting from the clipboard.</li>
          <li>The crop area is pre-set to 1500×500 (3:1). Adjust the handles to compose your header.</li>
          <li>Keep important content inside the center 1500×360 safe zone.</li>
          <li>Choose JPG for a smaller file or PNG for sharp text and logos.</li>
          <li>Download the image and upload it to your X profile settings.</li>
        </ol>

        <h2>Twitter header tips</h2>
        <ul>
          <li><strong>Aspect ratio</strong>: 3:1 (1500×500). Avoid the temptation to upload 1500×600 — it will be cropped.</li>
          <li><strong>Safe zone</strong>: Center 1500×360 for content that must survive mobile cropping.</li>
          <li><strong>File format</strong>: JPG for photos, PNG for graphics with text and sharp edges.</li>
          <li><strong>Profile picture overlap</strong>: Your avatar sits over the bottom-left of the header on desktop. Keep that corner clean.</li>
          <li><strong>File size</strong>: Keep under 5 MB. JPG at 85% quality is usually plenty.</li>
        </ul>

        <h2>Private and browser-based</h2>
        <p>
          Your image never leaves your device. ImageCropKit runs entirely in your browser using the
          Canvas API — no server upload, no account, and no watermark on the output. This makes it
          safe to use for personal headers, brand banners, or draft concepts you are not ready to
          share yet.
        </p>

        <h2>When to use a different tool</h2>
        <p>
          If you also need an OG image for link previews, use the 1200×630 OG cropper. For a LinkedIn
          banner, switch to the 1584×396 LinkedIn background photo resizer. And if you want to
          produce a header, profile picture, and OG image from one source photo, the Social Media
          Image Pack handles all three at once.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData
        pageTitle="Twitter Header Resizer — 1500×500"
        pageUrl="https://imagecropkit.com/twitter-header-resizer"
        appName="Twitter Header Resizer"
        faqItems={faqItems}
        howToSteps={[
          { name: "Upload your image", text: "Drag and drop, click to upload, or paste an image from your clipboard." },
          { name: "Adjust the crop to 1500×500", text: "The crop area is pre-set to 1500×500 (3:1). Drag the handles to frame the part of your image you want as the header." },
          { name: "Choose a format", text: "Pick JPG for a smaller file or PNG for sharp text and logos." },
          { name: "Download", text: "Download the 1500×500 header and upload it to your X/Twitter profile settings." },
        ]}
      />
    </div>
  );
}