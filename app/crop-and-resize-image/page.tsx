import type { Metadata } from "next";
import Link from "next/link";
import DimensionsCropClient from "../crop-image-by-dimensions/DimensionsCropClient";
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import ToolShowcase from "@/components/ToolShowcase";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Crop and Resize — Custom Dimensions",
  description: "Crop and resize images online free. Enter exact width and height, choose aspect ratios, and download the precise size you need. No upload, no signup, browser-based.",
  alternates: { canonical: `${SITE_URL}/crop-and-resize-image` },
};

const faqItems = [
  { question: "What is the difference between cropping and resizing an image?", answer: "Cropping removes parts of the image to change its composition and aspect ratio. Resizing changes the total pixel dimensions without removing any content. ImageCropKit does both: you choose the crop area, and the output is resized to your exact width and height." },
  { question: "Can I crop and resize an image at the same time?", answer: "Yes. Enter your target width and height, upload your image, adjust the crop area, and the exported image will be both cropped and resized to your exact dimensions." },
  { question: "Will cropping and resizing reduce image quality?", answer: "Resizing changes image detail. Enlarging a small crop cannot restore missing detail, and JPG or lossy WebP export can introduce compression artifacts. PNG avoids lossy compression, but it cannot recover detail lost during resizing. Start with an original image large enough for your target dimensions." },
  { question: "Can I resize an image without cropping?", answer: "To keep the whole image, use target dimensions with the same aspect ratio as your source and expand the crop to its full bounds. A 4000 by 3000 photo can become 800 by 600 without removing content. A square target requires cropping; this tool does not add padding to preserve the whole photo." },
  { question: "What happens when I choose 1920 by 1080?", answer: "The crop box uses a 16:9 aspect ratio. You position the box over the part of the source you want to keep, and the downloaded image is resized to exactly 1920 by 1080 pixels. The crop area in the source may contain more or fewer pixels than the output." },
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

      <ToolShowcase ratio="3 / 2" outputLabel="Exact W × H" caption="Crop and resize to exact pixel dimensions in one step." />

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
          <li><strong>Product photos</strong>: create a square catalog image such as 1200×1200; check your storefront&apos;s current upload requirements.</li>
          <li><strong>Social graphics</strong>: prepare a square, portrait, or landscape canvas to match your publishing destination.</li>
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
          Use an original image with enough pixels for the selected crop. Enlarging a small
          selection can soften detail, even with browser image smoothing. PNG avoids lossy
          compression for text and graphics; JPG and WebP offer a quality setting for balancing
          file size and appearance. Review the downloaded image at its intended display size.
        </p>
        <h2>Choose the output without stretching the subject</h2>
        <p>
          Target dimensions control both the crop ratio and the exported pixel size. For example,
          a 4000×3000 photo fits an 800×600 output at the same 4:3 ratio. A 1920×1080 output
          needs a wider 16:9 crop, so some of the original image is excluded. Move the crop
          before downloading to keep the subject in frame. Padding and automatic subject
          detection are not included.
        </p>
        <p>
          For several source photos, use <Link href="/bulk-crop-images">bulk cropping with ZIP export</Link>.
          To turn one photo into several publishing sizes, use the{' '}
          <Link href="/social-media-image-pack?pack=creator">creator image pack</Link>, where each output
          can be adjusted separately.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData pageTitle="Crop and Resize Image Online Free" pageUrl={`${SITE_URL}/crop-and-resize-image`} faqItems={faqItems} />
    </div>
  );
}
