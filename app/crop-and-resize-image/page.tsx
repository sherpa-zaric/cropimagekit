import type { Metadata } from "next";
import DimensionsCropClient from "../crop-image-by-dimensions/DimensionsCropClient";
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Crop and Resize — Custom Dimensions",
  description: "Crop and resize images online free. Enter exact width and height, choose aspect ratios, and download the precise size you need. No upload, no signup, browser-based.",
  alternates: { canonical: `${SITE_URL}/crop-and-resize-image` },
};

const faqItems = [
  { question: "What is the difference between cropping and resizing an image?", answer: "Cropping removes parts of the image to change its composition and aspect ratio. Resizing changes the total pixel dimensions without removing any content. ImageCropKit does both: you choose the crop area, and the output is resized to your exact width and height." },
  { question: "Can I crop and resize an image at the same time?", answer: "Yes. Enter your target width and height, upload your image, adjust the crop area, and the exported image will be both cropped and resized to your exact dimensions." },
  { question: "Will cropping and resizing reduce image quality?", answer: "No. ImageCropKit uses the browser Canvas API with imageSmoothingEnabled for high-quality output. Processing happens locally with no server-side recompression. You control the output format and quality slider." },
  { question: "Can I resize an image without cropping?", answer: "Yes. Use the crop area to select the entire image, then set your target dimensions. The output will be resized to your exact width and height without any cropping." },
  { question: "Are my images uploaded?", answer: "No. All processing happens locally in your browser. Your images never leave your device." },
];

const related = [
  { title: "Crop Image Online", href: "/crop-image", description: "Single image cropping with free crop and common aspect ratios." },
  { title: "Crop Image by Dimensions", href: "/crop-image-by-dimensions", description: "Enter exact pixel dimensions for precise crop output." },
  { title: "Bulk Crop Images", href: "/bulk-crop-images", description: "Crop a batch of images and download them as a ZIP file." },
  { title: "Crop Image to 1:1", href: "/crop-image-to-1x1", description: "Make a square image at 512, 768, 1024, 1080, or 2000 pixels." },
];

export default function CropAndResizeImagePage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Crop and Resize Image Online</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Free online tool to crop and resize images. Enter exact width and height, choose aspect ratios, and download the precise size you need. No upload, no signup.
        </p>
      </div>

      <DimensionsCropClient />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Crop and resize images online free</h2>
        <p>
          ImageCropKit lets you crop and resize images entirely in your browser. Whether you need
          to trim an image to a specific composition or resize it to exact pixel dimensions, this
          tool handles both in a single step.
        </p>
        <p>
          Enter your target width and height, upload your image, adjust the crop area, and download
          the result. The output matches your exact dimensions — no guessing, no re-uploading to
          external servers.
        </p>

        <h2>When to crop and resize</h2>
        <ul>
          <li><strong>E-commerce product photos</strong>: Shopify requires 2048×2048, Etsy needs 2000×2000</li>
          <li><strong>Social media</strong>: Instagram posts at 1080×1080, stories at 1080×1920</li>
          <li><strong>Website assets</strong>: hero images, thumbnails, and Open Graph cards at exact sizes</li>
          <li><strong>Print</strong>: convert inch or millimetre sizes to pixels at 300 DPI</li>
          <li><strong>Ad networks</strong>: exact pixel sizes required by Google Ads, Facebook Ads, and more</li>
        </ul>

        <h2>How to crop and resize an image</h2>
        <ol>
          <li>Upload your image by dragging, clicking, or pasting from the clipboard.</li>
          <li>Choose a preset or enter custom width and height in the sidebar.</li>
          <li>Adjust the crop area to frame the part you want to keep.</li>
          <li>Choose an export format (PNG, JPG, or WebP) and download the result.</li>
        </ol>

        <h2>Quality preservation</h2>
        <p>
          ImageCropKit uses the browser Canvas API with imageSmoothingEnabled for sharp, clean
          output. Because all processing happens locally, there is no server-side recompression.
          You control the output format and quality slider for JPG and WebP exports.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData pageTitle="Crop and Resize Image Online Free" pageUrl={`${SITE_URL}/crop-and-resize-image`} faqItems={faqItems} />
    </div>
  );
}
