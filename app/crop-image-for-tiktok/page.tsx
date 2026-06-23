import type { Metadata } from "next";
import dynamic from "next/dynamic";

import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";
import { SITE_URL } from "@/lib/siteConfig";
import { socialPresets } from "@/lib/presets";

const CropEditor = dynamic(() => import("@/components/CropEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});

export const metadata: Metadata = {
  title: "TikTok Image Cropper — Free Online, No Upload",
  description:
    "Crop images for TikTok posts and video covers for free. 1080x1920 vertical presets. No upload, no signup, no watermark. Processed locally in your browser.",
  alternates: { canonical: `${SITE_URL}/crop-image-for-tiktok` },
};

const tiktokPresets = socialPresets.filter(
  (p) => p.id === "tiktok-post" || p.id === "tiktok-cover"
);
const defaultPreset = tiktokPresets.find((p) => p.id === "tiktok-post");

const faqItems = [
  { question: "What size is a TikTok photo post?", answer: "TikTok photo posts use 1080x1920 (9:16 vertical). This preset matches that exact size." },
  { question: "Can I crop a TikTok video cover?", answer: "Yes. Choose the TikTok Cover preset to export a 1080x1920 thumbnail for your video." },
  { question: "Can I crop multiple TikTok images at once?", answer: "Yes. Use the Bulk Crop Images tool to crop a batch and download as a ZIP." },
  { question: "Are my TikTok images uploaded?", answer: "No. All processing happens locally in your browser. Your images never leave your device." },
  { question: "Do I need to create an account?", answer: "No. ImageCropKit is free with no signup required." },
];

const related = [
  { title: "Instagram Image Cropper", href: "/crop-image-for-instagram", description: "Posts, stories, reels, and profile picture presets." },
  { title: "Bulk Crop Images", href: "/bulk-crop-images", description: "Crop a batch of images and download as a ZIP." },
  { title: "Crop Image Online", href: "/crop-image", description: "A simple single-image cropper with common aspect ratios." },
  { title: "Crop Image Locally", href: "/crop-image-locally", description: "Private cropping with no upload to any server." },
];

export default function CropImageForTiktokPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-24 space-y-24">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl tracking-tight">
          TikTok Image Cropper — Free Online
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Crop photos for TikTok photo posts and video covers. Free, no upload, no watermark. Processed locally in your browser.
        </p>
      </div>

      <CropEditor defaultPreset={defaultPreset} showPresets={tiktokPresets} showTrustBadges />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>TikTok image cropper</h2>
        <p>
          Crop your images for TikTok photo posts and video covers in seconds.
          ImageCropKit includes TikTok presets so you do not need to remember
          the exact dimensions.
        </p>

        <h2>TikTok image sizes</h2>
        <p>Use this quick reference when preparing images for TikTok:</p>
        <table>
          <thead>
            <tr>
              <th>Use case</th>
              <th>Recommended size</th>
              <th>Aspect ratio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Photo post</td>
              <td>1080 × 1920 px</td>
              <td>9:16</td>
            </tr>
            <tr>
              <td>Video cover</td>
              <td>1080 × 1920 px</td>
              <td>9:16</td>
            </tr>
            <tr>
              <td>Profile picture</td>
              <td>200 × 200 px minimum</td>
              <td>1:1, displayed as a circle</td>
            </tr>
          </tbody>
        </table>
        <p>
          TikTok is a vertical-first platform, so photo posts and video covers should usually
          use a 9:16 crop. A square 1:1 crop is still useful for profile pictures because TikTok
          displays the uploaded profile image inside a circular frame.
        </p>

        <h2>Crop TikTok images privately</h2>
        <p>
          ImageCropKit processes your image locally in your browser. Your photo
          is not uploaded to a server, and you do not need to create an account
          before downloading the cropped image.
        </p>

        <h2>Bulk crop for TikTok</h2>
        <p>
          Need to prepare multiple images for TikTok? Use the Bulk Crop Images
          tool to crop a batch of photos to 1080×1920 and download them all as
          a ZIP file.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData
        pageTitle="TikTok Image Cropper — Free Online"
        pageUrl={`${SITE_URL}/crop-image-for-tiktok`}
        faqItems={faqItems}
      />
    </div>
  );
}
