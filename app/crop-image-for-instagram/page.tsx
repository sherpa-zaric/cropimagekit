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
  title: "Instagram Image Cropper — Free Online",
  description: "Free online image cropper for Instagram. Crop posts, stories, reels, and profile pictures. Choose square, portrait, story, reel cover, and profile presets. No upload, no signup.",
  alternates: { canonical: "https://imagecropkit.com/crop-image-for-instagram" },
};

const instagramPresets = socialPresets.filter((p) => p.id.startsWith("instagram"));
const defaultPreset = instagramPresets.find((p) => p.id === "instagram-square");

const faqItems = [
  { question: "What size is an Instagram square post?", answer: "The square post preset exports 1080x1080." },
  { question: "Can I crop an image for Instagram Stories?", answer: "Yes. Choose the Story preset to export 1080x1920." },
  { question: "Can I crop a portrait post?", answer: "Yes. Choose the 1080x1350 portrait post preset." },
  { question: "Can I crop multiple Instagram images?", answer: "Yes. Use the Bulk Crop Images tool for batch cropping." },
  { question: "Are my Instagram images uploaded?", answer: "No. They are processed locally in your browser." },
];

const related = [
  { title: "Crop Image to 1:1", href: "/crop-image-to-1x1", description: "Make a square image at 512, 768, 1024, 1080, or 2000 pixels." },
  { title: "Bulk Crop Images", href: "/bulk-crop-images", description: "Crop a batch of social images and download a ZIP." },
  { title: "Crop Image Online", href: "/crop-image", description: "A simple single-image cropper with common aspect ratios." },
  { title: "Circle Crop Image", href: "/circle-crop-image", description: "Create round avatars and transparent PNG circle crops." },
  { title: "Smart Image Cropper", href: "/smart-crop-image", description: "Lock the subject; the crop stays centered across IG post, story, and reel ratios." },
];

export default function CropImageForInstagramPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Crop Image for Instagram</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Crop photos for Instagram sizes. Choose a preset for square posts, portrait posts, stories, reels, or profile pictures.
        </p>
      </div>

      <CropEditor defaultPreset={defaultPreset} showPresets={instagramPresets} showTrustBadges />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Instagram image cropper</h2>
        <p>
          Crop your image for Instagram posts, stories, reels, and profile pictures in
          seconds. ImageCropKit includes common Instagram crop presets, so you do not need to
          remember the exact dimensions or manually calculate aspect ratios.
        </p>
        <p>
          Whether you are preparing a square post, a vertical story, a reel cover, or a
          profile picture, you can upload your image, choose the right preset, adjust the
          crop area, and download the final image directly in your browser.
        </p>

        <h2>Instagram crop presets</h2>
        <p>Choose from common Instagram image sizes:</p>
        <ul>
          <li><strong>Square post</strong>: 1080 × 1080</li>
          <li><strong>Portrait post</strong>: 1080 × 1350 — recommended for higher engagement</li>
          <li><strong>Story</strong>: 1080 × 1920</li>
          <li><strong>Reel cover</strong>: 1080 × 1920</li>
          <li><strong>Profile picture</strong>: 320 × 320</li>
        </ul>
        <p>
          The 4:5 portrait format (1080 × 1350) is widely recommended because vertical posts
          take up more screen space in the feed, which tends to increase engagement compared
          to square posts. If you are unsure which format to choose, start with the portrait
          preset.
        </p>
        <p>
          These presets help you create properly framed images for different Instagram
          placements without guessing the width, height, or aspect ratio.
        </p>

        <h2>Crop Instagram photos privately</h2>
        <p>
          ImageCropKit processes your image locally in your browser. Your photo is not
          uploaded to a server, and you do not need to create an account before downloading
          the cropped image.
        </p>

        <h2>Use these presets for other platforms</h2>
        <p>
          Instagram square and portrait presets are also useful for Facebook posts, TikTok
          profile pictures, and other platforms with similar aspect ratios. The 1:1 square
          preset works for most social profile photos, and the 1080 × 1350 portrait ratio
          is close to what Pinterest and Facebook use for vertical images.
        </p>

        <h2>More tools for social images</h2>
        <p>
          Need a different crop? Use the square crop tool for 1:1 images, the bulk cropper
          for multiple social images, or the local cropper if privacy is your main concern.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData pageTitle="Crop Image for Instagram" pageUrl="https://imagecropkit.com/crop-image-for-instagram" faqItems={faqItems} />
    </div>
  );
}
