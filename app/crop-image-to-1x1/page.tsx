import type { Metadata } from "next";
import dynamic from "next/dynamic";
const CropEditor = dynamic(() => import("@/components/CropEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import { squareSizePresets } from "@/lib/presets";

export const metadata: Metadata = {
  title: "Square Image Cropper — 1:1 Crop",
  description:
    "Free online square image cropper. Crop any image to a perfect 1:1 square for profile photos, product photos, social posts, and AI datasets. No upload.",
  alternates: { canonical: "https://imagecropkit.com/crop-image-to-1x1" },
};

const defaultPreset = squareSizePresets.find((p) => p.id === "square-1080");

const faqItems = [
  { question: "How do I crop an image to 1:1?", answer: "Upload your image and use the default 1:1 crop box to make it square." },
  { question: "Can I export a 1080x1080 image?", answer: "Yes. Choose the 1080x1080 preset before downloading." },
  { question: "Can I crop multiple images to 1:1?", answer: "Yes. Use the Bulk Crop Images tool for batch square cropping." },
  { question: "Is the image uploaded?", answer: "No. The crop happens in your browser." },
  { question: "What format can I download?", answer: "You can download as PNG, JPG, or WebP." },
];

const related = [
  { title: "Bulk Crop Images", href: "/bulk-crop-images", description: "Crop many square images in a single batch with one ZIP download." },
  { title: "Instagram Image Cropper", href: "/crop-image-for-instagram", description: "Square posts, stories, reels, and profile picture presets." },
  { title: "Product Image Cropper", href: "/crop-product-images", description: "Square product photos for Shopify, Etsy, and Amazon." },
  { title: "Circle Crop Image", href: "/circle-crop-image", description: "Create round avatars and transparent PNG circle crops." },
];

export default function CropImageTo1x1Page() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Crop Image to 1:1</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Make any image square. Upload a photo, adjust the 1:1 crop area, choose a square output preset, and download the final image.
        </p>
      </div>

      <CropEditor defaultPreset={defaultPreset} showPresets={squareSizePresets} showTrustBadges />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Make any image square online</h2>
        <p>
          Use ImageCropKit to crop photos, graphics, screenshots, or product images into a
          clean 1:1 square. A square crop is useful when you need a balanced image for
          profiles, social posts, product grids, thumbnails, or AI datasets.
        </p>

        <h2>Common square image sizes</h2>
        <p>Choose a square output size based on where the image will be used:</p>
        <ul>
          <li><strong>512 × 512</strong> for small avatars and lightweight dataset images</li>
          <li><strong>768 × 768</strong> for medium-resolution square crops</li>
          <li><strong>1024 × 1024</strong> for high-quality square images</li>
          <li><strong>1080 × 1080</strong> for social media posts</li>
          <li><strong>2000 × 2000</strong> for product photos and ecommerce listings</li>
        </ul>
        <p>
          These presets help you create consistent square images without manually calculating
          width and height.
        </p>

        <h2>Best uses for 1:1 crops</h2>
        <p>
          Square images work well for profile photos, ecommerce product grids, Instagram
          square posts, website thumbnails, and AI training images. You can crop one image
          here or use the bulk cropper when you need to process many images at once.
        </p>

        <h2>Private square image cropping</h2>
        <p>
          Your image is processed locally in your browser. ImageCropKit does not upload your
          file or add a watermark.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData pageTitle="Crop Image to 1:1" pageUrl="https://imagecropkit.com/crop-image-to-1x1" faqItems={faqItems} />
    </div>
  );
}
