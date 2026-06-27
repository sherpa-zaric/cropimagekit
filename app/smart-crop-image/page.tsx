import type { Metadata } from "next";
import dynamic from "next/dynamic";

import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";
import { SITE_URL } from "@/lib/siteConfig";
import { basicPresets } from "@/lib/presets";

const SmartCropEditor = dynamic(() => import("@/components/SmartCropEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});

export const metadata: Metadata = {
  title: "Smart Image Cropper — Free Online, Keep Subject Centered",
  description:
    "Smart focal-point image cropper. Click to lock the subject, switch aspect ratios, and the crop stays centered on what matters. Free, no upload, no signup, no watermark. Processed locally in your browser.",
  alternates: { canonical: `${SITE_URL}/smart-crop-image` },
};

const smartPresets = basicPresets.filter((p) =>
  ["1:1", "4:5", "16:9", "9:16", "3:4", "4:3", "3:2", "2:3"].includes(p.id)
);
const defaultPreset = smartPresets.find((p) => p.id === "1:1") ?? smartPresets[0];

const faqItems = [
  { question: "What does the smart focal-point cropper do?", answer: "It lets you click on the subject in your image to set a focal point. When you then switch to a different aspect ratio or preset, the crop automatically re-centers on that subject instead of defaulting to the image center." },
  { question: "Why would I use this instead of a normal cropper?", answer: "Most online croppers re-center the crop on the image center when you change aspect ratio, which often cuts off the subject. Locking the focal point keeps the subject framed correctly across 1:1, 4:5, 16:9, 9:16, and other ratios without manual re-positioning." },
  { question: "Can I still drag the crop manually?", answer: "Yes. After the focal point is set, you can still drag or resize the crop by hand. The focal point marker stays where you set it on the image; only switching presets re-centers the crop on it." },
  { question: "What happens if the subject is near an edge?", answer: "The crop is shifted just enough to stay inside the image, so the focal point may end up slightly off-center inside the crop rather than being cut off. The crop never extends past the image bounds." },
  { question: "Is my image uploaded?", answer: "No. All processing happens locally in your browser using the Canvas API. Your image never leaves your device." },
  { question: "Can I clear the focal point?", answer: "Yes. The Clear focal point button removes the marker and returns the crop to the default centered behavior for the current preset." },
  { question: "Can I export as PNG, JPG, or WebP?", answer: "Yes. The smart cropper supports the same export formats as the rest of ImageCropKit, with adjustable quality for JPG and WebP." },
];

const related = [
  { title: "Crop Image Online", href: "/crop-image", description: "A simple single-image cropper with common aspect ratios." },
  { title: "Profile Photo Cropper", href: "/profile-photo-cropper", description: "Crop headshots, passport photos, and avatars for any platform." },
  { title: "Instagram Image Cropper", href: "/crop-image-for-instagram", description: "Instagram post, story, reel, and profile picture presets." },
  { title: "Product Image Cropper", href: "/crop-product-images", description: "Square product photos for Shopify, Etsy, and Amazon." },
];

export default function SmartCropImagePage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-24 space-y-24">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl tracking-tight">
          Smart Image Cropper — Free Online
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Click on the subject to lock the focal point. Switch aspect ratios and the crop stays centered on what matters. Free, no upload, no watermark.
        </p>
      </div>

      <SmartCropEditor defaultPreset={defaultPreset} showPresets={smartPresets} showTrustBadges />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Smart focal-point image cropper</h2>
        <p>
          Most online croppers re-center the crop on the image center every time you change aspect
          ratio, which is fine when the subject is already centered but cuts off the subject when
          it is not. The smart focal-point cropper solves this: click on the subject once, then
          switch between 1:1, 4:5, 16:9, 9:16, 3:4, 4:3, 3:2, and 2:3 presets and the crop
          automatically re-centers on the subject instead of the image center.
        </p>
        <p>
          The focal point is stored as a percentage of the image, so it stays in the same spot on
          the subject as you change ratios. The crop region is the largest area at the chosen ratio
          that fits inside the image with the subject centered. If the subject is close to an edge,
          the crop is shifted just enough to stay inside the image bounds.
        </p>

        <h2>How to use the smart cropper</h2>
        <ol>
          <li>Upload an image with a clear subject (face, product, logo, or object).</li>
          <li>Click <strong>Set focal point</strong>, then click on the subject in the image.</li>
          <li>Switch between aspect ratio presets — the crop re-centers on the subject each time.</li>
          <li>Drag the crop manually if you want to fine-tune. The marker stays on the subject.</li>
          <li>Export as PNG, JPG, or WebP. The exported image matches the crop preview.</li>
        </ol>

        <h2>When smart crop helps</h2>
        <ul>
          <li><strong>Social media repurposing</strong> — turn one photo into a square post, a 4:5 portrait, and a 9:16 story without re-positioning the crop each time.</li>
          <li><strong>Product photos</strong> — keep the product centered when generating multiple aspect ratios for listings, ads, and thumbnails.</li>
          <li><strong>Portraits and headshots</strong> — convert a wide portrait into square, vertical, and horizontal crops while keeping the face centered.</li>
          <li><strong>Print and web</strong> — adapt one image to several layouts without losing the subject.</li>
        </ul>

        <h2>Privacy and local processing</h2>
        <p>
          The smart focal-point cropper runs entirely in your browser. The image is loaded into
          browser memory, the focal point and crop math are computed locally, and the export uses
          the Canvas API. Nothing is uploaded to a server, and no account is required.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData
        pageTitle="Smart Image Cropper — Free Online"
        pageUrl={`${SITE_URL}/smart-crop-image`}
        faqItems={faqItems}
      />
    </div>
  );
}