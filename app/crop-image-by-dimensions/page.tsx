import type { Metadata } from "next";
import DimensionsCropClient from "./DimensionsCropClient";
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Crop by Dimensions — Custom Pixels",
  description: "Crop an image online free to any exact width and height in pixels. Enter custom dimensions, choose from common presets, and download the precise size you need. No upload.",
  alternates: { canonical: `${SITE_URL}/crop-image-by-dimensions` },
};

const faqItems = [
  { question: "How do I crop an image to exact pixels?", answer: "Enter the exact width and height you need, click Apply, upload your image, and adjust the crop area. The exported image will match your exact pixel dimensions." },
  { question: "What is the difference between cropping and resizing?", answer: "Cropping removes parts of the image to change its composition and aspect ratio. Resizing changes the total pixel dimensions. ImageCropKit does both: you choose the crop area, and the output is resized to your exact width and height." },
  { question: "Can I crop to any width and height?", answer: "Yes. You can enter any width and height between 1 and 8000 pixels. The cropper will maintain the aspect ratio you specify." },
  { question: "Will cropping change the image quality?", answer: "ImageCropKit uses the browser Canvas API with imageSmoothingEnabled for high-quality output. Because processing happens locally, there is no server-side recompression. You control the output format and quality slider." },
  { question: "Are my images uploaded to a server?", answer: "No. ImageCropKit processes your image locally in your browser. Your image never leaves your device." },
];

const related = [
  { title: "Crop Image Online", href: "/crop-image", description: "Single image cropping with free crop and common aspect ratios." },
  { title: "Crop Image to 1:1", href: "/crop-image-to-1x1", description: "Make a square image at 512, 768, 1024, 1080, or 2000 pixels." },
  { title: "Bulk Crop Images", href: "/bulk-crop-images", description: "Crop a batch of images and download them as a ZIP file." },
  { title: "Passport Photo Cropper", href: "/crop-image-to-passport-size", description: "Crop photos to official passport and ID dimensions." },
];

export default function CropImageByDimensionsPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Crop Image by Exact Dimensions</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Crop an image to any exact width and height in pixels. Enter your target dimensions, upload your image, and download the precise size you need.
        </p>
      </div>

      <DimensionsCropClient />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Exact dimension image cropper</h2>
        <p>
          Sometimes you need an image at an exact pixel size that is not covered by a standard
          preset. This tool lets you enter any width and height, locks the matching aspect ratio,
          and exports the precise dimensions you specify. It is useful for banners, thumbnails,
          website assets, print layouts, and platform-specific size requirements.
        </p>
        <p>
          Upload your image, enter your target width and height in the sidebar, and adjust the crop
          area. The output will be exactly the pixel dimensions you set. Because ImageCropKit runs
          entirely in your browser, your image is processed locally and never uploaded to a server.
        </p>

        <h2>Common exact-size use cases</h2>
        <ul>
          <li><strong>Website banners</strong>: hero images, blog headers, and landing page backgrounds at exact widths</li>
          <li><strong>Thumbnails</strong>: small preview images with strict pixel limits</li>
          <li><strong>Social share images</strong>: Open Graph and Twitter card images at 1200 × 628</li>
          <li><strong>Print layouts</strong>: converting inch or millimetre sizes to pixels at 300 DPI</li>
          <li><strong>Platform requirements</strong>: exact pixel sizes requested by ad networks, CMSs, or app stores</li>
        </ul>

        <h2>How aspect ratio works with exact dimensions</h2>
        <p>
          When you set a width and height, the cropper calculates the aspect ratio automatically.
          For example, 800 × 600 gives a 4:3 ratio, and 1920 × 1080 gives a 16:9 ratio. The crop
          box on your image will maintain this ratio, so the final exported image matches both your
          composition and your exact pixel requirements.
        </p>

        <h2>Preserving quality when cropping to exact pixels</h2>
        <p>
          ImageCropKit uses the browser Canvas API with imageSmoothingEnabled and precise pixel
          mapping. Because processing happens locally, there is no server-side recompression. You
          control the output format and quality slider for JPG and WebP exports.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData pageTitle="Crop Image by Exact Dimensions - Custom Width & Height" pageUrl={`${SITE_URL}/crop-image-by-dimensions`} faqItems={faqItems} />
    </div>
  );
}
