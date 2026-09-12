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
  title: "Crop Image to OG Image (1200×630) — Free Open Graph Resizer",
  description:
    "Crop any image to 1200×630 for Open Graph (OG) social share cards. Free browser-based tool — no upload, no signup, no watermark. Works for Twitter, Facebook, LinkedIn, and Slack previews.",
  alternates: { canonical: "https://imagecropkit.com/crop-image-to-og-image-1200x630" },
};

const ogPresets = socialPresets.filter((p) => p.id === "og-image");
const defaultPreset = ogPresets[0];

const faqItems = [
  { question: "What is an OG image?", answer: "An OG (Open Graph) image is the preview image that appears when a webpage link is shared on social media. The recommended size is 1200×630 pixels." },
  { question: "Why is 1200×630 the standard OG image size?", answer: "Facebook introduced 1200×630 as the Open Graph image standard. It displays correctly across Facebook, Twitter, LinkedIn, Slack, and most messaging apps." },
  { question: "Can I use this for Twitter card images?", answer: "Yes. Twitter summary large image cards use 1200×600, but 1200×630 works well and is the safer cross-platform choice." },
  { question: "Are my images uploaded to a server?", answer: "No. Your image is processed locally in your browser. Nothing is sent to any server." },
  { question: "What format should I export my OG image as?", answer: "JPG is recommended for OG images to keep file size under 300 KB, which ensures fast preview loading. PNG is fine for images with text overlays." },
];

const related = [
  { title: "Twitter Header Resizer", href: "/twitter-header-resizer", description: "Resize images to 1500×500 for X/Twitter profile headers." },
  { title: "Facebook Cover Photo Resizer", href: "/facebook-cover-photo-resizer", description: "Crop images to 820×312 for Facebook page covers." },
  { title: "Crop Image Online", href: "/crop-image", description: "A simple single-image cropper with common aspect ratios." },
  { title: "Resize Image to 1920×1080", href: "/resize-image-to-1920x1080", description: "Resize images to Full HD 1920×1080 for wallpapers and backgrounds." },
];

export default function OGImagePage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Crop Image to OG Image (1200×630)</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Crop any image to 1200×630 pixels for Open Graph social share cards. Works for Facebook, Twitter, LinkedIn, and Slack link previews. No upload, no signup.
        </p>
      </div>

      <CropEditor defaultPreset={defaultPreset} showPresets={ogPresets} showTrustBadges />

      <ToolShowcase ratio="1200 / 630" outputLabel="1200 × 630" caption="The share-card size every platform accepts." />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>What is an OG image and why 1200×630?</h2>
        <p>
          An Open Graph (OG) image is the thumbnail preview that appears when someone shares a
          link to your webpage on social media. Facebook defined the 1200×630 pixel standard,
          and it has become the universally supported size across Facebook, X (Twitter),
          LinkedIn, Slack, Discord, and most messaging apps.
        </p>
        <p>
          When you share a URL without a properly sized OG image, platforms either show a
          random cropped version of your page or no preview at all. A correctly sized 1200×630
          image ensures your content looks professional in every feed and chat.
        </p>

        <h2>How to create an OG image</h2>
        <ol>
          <li>Upload an image or paste from clipboard.</li>
          <li>The crop area is pre-set to 1200×630 (1.91:1 ratio). Adjust if needed.</li>
          <li>Choose JPG for smaller file size or PNG for text-heavy images.</li>
          <li>Click Download to save your OG image.</li>
        </ol>
        <p>
          For best results, keep important content in the center of the image. Some platforms
          crop the edges slightly on mobile, so avoid placing text or logos near the borders.
        </p>

        <h2>OG image best practices</h2>
        <ul>
          <li><strong>File size</strong>: Keep under 300 KB for fast preview loading. JPG at 85% quality usually works.</li>
          <li><strong>Text overlay</strong>: If you add text, use a large font — OG images appear small in mobile feeds.</li>
          <li><strong>Aspect ratio</strong>: 1.91:1 (1200×630) is the safest cross-platform ratio.</li>
          <li><strong>Safe zone</strong>: Keep important content within the center 80% of the image.</li>
        </ul>

        <h2>Private and browser-based</h2>
        <p>
          Your image never leaves your device. ImageCropKit processes everything locally in your
          browser using the Canvas API — no server upload, no account, no watermark.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData
        pageTitle="Crop Image to OG Image (1200×630)"
        pageUrl="https://imagecropkit.com/crop-image-to-og-image-1200x630"
        appName="OG Image Cropper"
        faqItems={faqItems}
        howToSteps={[
          { name: "Upload image", text: "Upload an image by dragging, clicking, or pasting from the clipboard." },
          { name: "Adjust crop", text: "The crop area is pre-set to 1200×630. Drag the handles to adjust the crop region." },
          { name: "Choose format", text: "Select JPG for smaller file size or PNG for images with text overlays." },
          { name: "Download", text: "Click Download to save your 1200×630 OG image." },
        ]}
      />
    </div>
  );
}