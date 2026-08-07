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
  title: "Facebook Cover Photo Resizer — 820×312 Free Online",
  description:
    "Resize and crop images to 820×312 for your Facebook page cover photo. Free browser-based tool — no upload, no signup, no watermark. Keeps your cover sharp on desktop and mobile.",
  alternates: { canonical: "https://imagecropkit.com/facebook-cover-photo-resizer" },
};

const facebookCoverPresets = socialPresets.filter((p) => p.id === "facebook-cover-820");
const defaultPreset = facebookCoverPresets[0];

const faqItems = [
  { question: "What size is a Facebook cover photo?", answer: "The Facebook cover photo display size is 820×312 pixels on desktop and 640×360 on mobile. Facebook recommends uploading at 820×312 (or larger 1640×924 for sharpness) with the safe zone kept clear of important content." },
  { question: "Why does my Facebook cover look different on mobile?", answer: "Facebook crops the cover to 640×360 on mobile, which is a taller horizontal band than the 820×312 desktop version. Content near the top and bottom of the 820×312 image may be clipped on mobile, so keep important elements in the center safe zone." },
  { question: "What is the Facebook cover safe zone?", answer: "The safe zone is the center 820×312 region that survives both desktop and mobile cropping. Keep logos, text, and key visuals inside the center band, and treat the top and bottom edges as padding that may be cropped on mobile." },
  { question: "Is this Facebook cover resizer free?", answer: "Yes. The tool is free with no signup, no watermark, and no limits on the number of cover photos you create." },
  { question: "Are my images uploaded to a server?", answer: "No. Your image is processed locally in your browser using the Canvas API. Nothing is sent to any server." },
];

const related = [
  { title: "Twitter Header Resizer", href: "/twitter-header-resizer", description: "Resize images to 1500×500 for X/Twitter profile headers." },
  { title: "LinkedIn Background Photo Resizer", href: "/linkedin-background-photo-resizer", description: "Crop images to 1584×396 for LinkedIn profile banners." },
  { title: "OG Image Cropper", href: "/crop-image-to-og-image-1200x630", description: "Crop images to 1200×630 for social share card previews." },
  { title: "Crop Image Online", href: "/crop-image", description: "A simple single-image cropper with common aspect ratios." },
  { title: "Social Media Image Pack", href: "/social-media-image-pack", description: "Generate a header, profile picture, and OG image from one source photo." },
];

export default function FacebookCoverPhotoResizerPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Facebook Cover Photo Resizer — 820×312</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Crop any image to 820×312 for your Facebook page cover photo. Free, browser-based, no upload and no watermark.
        </p>
      </div>

      <CropEditor defaultPreset={defaultPreset} showPresets={facebookCoverPresets} showTrustBadges />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Facebook cover photo size</h2>
        <p>
          The Facebook cover photo display size is 820 pixels wide by 312 pixels tall on desktop,
          with a roughly 2.6:1 aspect ratio. On mobile the same cover is rendered at 640×360 (a
          16:9 band), which is a slightly taller horizontal slice than the desktop version. This
          is why a cover that looks great on a laptop can crop oddly on a phone — Facebook is
          showing a different region of the same image.
        </p>
        <p>
          For the sharpest result, Facebook recommends uploading at 820×312 (the display size)
          or at a higher resolution like 1640×924 (2× the display size) so the cover stays crisp
          on retina displays. This tool defaults to the 820×312 display size, which keeps the
          file small and the crop preview accurate. If you want the 2× version, crop at 820×312
          to compose the frame and then re-export from a larger source at 1640×924 for the
          final upload.
        </p>

        <h2>Why the cover crops differently on mobile</h2>
        <p>
          The 820×312 desktop display and the 640×360 mobile display are different aspect ratios,
          so Facebook shows a different region of the same uploaded image on each device. On
          desktop you see the full 820×312 banner. On mobile Facebook shows a 640×360 band,
          which is wider relative to its height — so the top and bottom of your 820×312 image
          are clipped off, and only the center survives.
        </p>
        <p>
          The safest approach is to keep important content inside the center 820×312 safe zone.
          Put your logo, tagline, or key visual inside that band, and treat the top and bottom
          edges as padding that may be cropped on mobile. Avoid placing text or logos near the
          very top or bottom of the 820×312 frame, because those areas are the first to be cut
          on a phone.
        </p>

        <h2>How to resize a Facebook cover photo</h2>
        <ol>
          <li>Upload your image by dragging it in or pasting from the clipboard.</li>
          <li>The crop area is pre-set to 820×312. Adjust the handles to compose your cover.</li>
          <li>Keep important content inside the center 820×312 safe zone.</li>
          <li>Choose JPG for a smaller file or PNG for sharp text and logos.</li>
          <li>Download the image and upload it to your Facebook page settings.</li>
        </ol>

        <h2>Facebook cover best practices</h2>
        <ul>
          <li><strong>Display size</strong>: 820×312 on desktop, 640×360 on mobile.</li>
          <li><strong>Recommended upload</strong>: 820×312, or 1640×924 for sharpness on retina.</li>
          <li><strong>Safe zone</strong>: Center 820×312 for content that must survive mobile cropping.</li>
          <li><strong>Profile picture overlap</strong>: Your page avatar sits over the bottom-left of the cover. Keep that corner clean.</li>
          <li><strong>File format</strong>: JPG for photos, PNG for graphics with text and sharp edges.</li>
          <li><strong>File size</strong>: Keep under 100 KB for fast loading. JPG at 85% quality is usually plenty.</li>
        </ul>

        <h2>What to avoid in a Facebook cover</h2>
        <p>
          Avoid placing text or logos in the top and bottom 60 pixels of the 820×312 frame — those
          regions are the first to be clipped on mobile. Avoid the bottom-left corner where your
          page profile picture overlaps the cover. And avoid uploading at a different aspect
          ratio than 820×312 — Facebook will crop the result unpredictably and you may lose part
          of your key visual.
        </p>

        <h2>Private and browser-based</h2>
        <p>
          Your image never leaves your device. ImageCropKit runs entirely in your browser using
          the Canvas API — no server upload, no account, and no watermark on the output. This
          makes it safe to use for personal covers, business page banners, or draft concepts you
          are not ready to publish yet.
        </p>

        <h2>Generate a full set of social images</h2>
        <p>
          If you need a Facebook cover plus a matching Twitter header, LinkedIn banner, and OG
          image from one source photo, the Social Media Image Pack exports all four in a single
          pass. For a different platform&#39;s cover, switch to the Twitter Header Resizer (1500×500)
          or the LinkedIn Background Photo Resizer (1584×396).
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData
        pageTitle="Facebook Cover Photo Resizer — 820×312"
        pageUrl="https://imagecropkit.com/facebook-cover-photo-resizer"
        appName="Facebook Cover Photo Resizer"
        faqItems={faqItems}
        howToSteps={[
          { name: "Upload your image", text: "Drag and drop, click to upload, or paste an image from your clipboard." },
          { name: "Adjust the crop to 820×312", text: "The crop area is pre-set to 820×312. Drag the handles to frame the part of your image you want as the cover." },
          { name: "Choose a format", text: "Pick JPG for a smaller file or PNG for sharp text and logos." },
          { name: "Download", text: "Download the 820×312 cover and upload it to your Facebook page settings." },
        ]}
      />
    </div>
  );
}