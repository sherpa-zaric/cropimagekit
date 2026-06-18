import type { Metadata } from "next";
import dynamic from "next/dynamic";
const CropEditor = dynamic(() => import("@/components/CropEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import { productPresets } from "@/lib/presets";

export const metadata: Metadata = {
  title: "Product Image Cropper — Shopify, Etsy, Amazon",
  description: "Crop product images online free for Shopify (2048x2048), Etsy, Amazon. No upload, no signup, no watermark. Batch crop and download as ZIP. Browser-based, 100% private.",
  alternates: { canonical: "https://imagecropkit.com/crop-product-images" },
};

const defaultPreset = productPresets.find((p) => p.id === "product-square");

const faqItems = [
  { question: "Can I crop product images to square?", answer: "Yes. The product image cropper uses a square crop by default." },
  { question: "Can I export 2000x2000 product images?", answer: "Yes. Choose the 2000x2000 preset before downloading." },
  { question: "Can I crop Shopify product images?", answer: "Yes. Use the Shopify product image preset." },
  { question: "Can I crop multiple product photos?", answer: "Yes. Use Bulk Crop Images for batch product photo cropping." },
  { question: "Are product photos uploaded?", answer: "No. The images are processed locally in your browser." },
  { question: "Why do all product presets look like the same square crop?", answer: "Most product image presets use a 1:1 square crop. The difference is the exported pixel size, such as 2000×2000 or 2048×2048, not the crop shape." },
  { question: "What product image size should I choose?", answer: "Use 2000×2000 for a general high-resolution product image, 2048×2048 for Shopify-style product images, and 1000×1000 for smaller website thumbnails." },
];

const related = [
  { title: "Bulk Crop Images", href: "/bulk-crop-images", description: "Batch cropping with shared aspect ratio and ZIP download." },
  { title: "Crop Image to 1:1", href: "/crop-image-to-1x1", description: "Make a square image at 512, 768, 1024, 1080, or 2000 pixels." },
  { title: "Crop Image Locally", href: "/crop-image-locally", description: "A private cropper that runs entirely in your browser with no upload." },
  { title: "Circle Crop Image", href: "/circle-crop-image", description: "Crop a round profile picture or avatar with a transparent background." },
];

export default function CropProductImagesPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Product Image Cropper</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Crop product photos for online stores. Make clean square product images for ecommerce listings, marketplaces, and product catalogs.
        </p>
      </div>

      <div className="rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground space-y-2">
        <p>
          <strong className="text-foreground">About the presets:</strong> All product presets use a square 1:1 crop. The preset you choose controls the exported pixel size, not the crop shape.
        </p>
        <p>
          For best results, keep the product centered and leave a small margin around the edges.
        </p>
      </div>

      <CropEditor defaultPreset={defaultPreset} showPresets={productPresets} showTrustBadges />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Crop product photos for online stores</h2>
        <p>
          Consistent product photos make an online store look more professional. ImageCropKit
          helps you crop product images into clean square frames for ecommerce listings,
          marketplace pages, product catalogs, and website grids.
        </p>
        <p>
          This tool works for Amazon, Etsy, eBay, and Shopify product photos. Square product
          images display consistently across search results, collection pages, and mobile apps
          on all major ecommerce platforms.
        </p>
        <p>
          Use the product image cropper when you need product photos with consistent framing
          and output dimensions.
        </p>

        <h2>Make product images square</h2>
        <p>
          Many online stores and marketplaces display product photos in square grids.
          Choosing a 1:1 crop helps products line up neatly across collection pages and
          search results, and keeps the framing consistent across a product catalog.
        </p>
        <p>
          Product image presets all use a square crop because square product photos work
          well in ecommerce grids, search results, and marketplace listings. The main
          difference between presets is the exported pixel size. Choose a larger preset
          when you need a high-resolution product image, or a smaller preset for
          lightweight website thumbnails.
        </p>

        <h2>Product image presets</h2>
        <p>
          The product presets below all share a 1:1 square crop. Pick the preset whose
          pixel size suits where the image will be used:
        </p>
        <ul>
          <li><strong>Product Square</strong> (2000 × 2000) — useful for general ecommerce photos</li>
          <li><strong>Shopify</strong> (2048 × 2048) — commonly used for Shopify-style product images</li>
          <li><strong>Etsy</strong> (2000 × 2000) — good for marketplace listing photos</li>
          <li><strong>Amazon</strong> (2000 × 2000) — suitable for marketplace main product images</li>
          <li><strong>Web Thumbnail</strong> (1000 × 1000) — good for small website product previews</li>
        </ul>

        <h2>Crop product images privately</h2>
        <p>
          Your product photos are processed locally in your browser. You can crop catalog
          images, supplier photos, or draft product images without uploading them to a
          server.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData pageTitle="Product Image Cropper" pageUrl="https://imagecropkit.com/crop-product-images" faqItems={faqItems} />
    </div>
  );
}
