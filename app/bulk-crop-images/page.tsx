import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import BulkCropExample from "@/components/BulkCropExample";

const BulkCropEditor = dynamic(() => import("@/components/BulkCropEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});

export const metadata: Metadata = {
  title: "Bulk Crop Images Online — Batch Crop",
  description:
    "Bulk crop images online in your browser. Crop multiple images to the same aspect ratio, adjust crops individually, and download all results as a ZIP file. Supports JPG, PNG, and WebP.",
  alternates: { canonical: "https://imagecropkit.com/bulk-crop-images" },
};

const faqItems = [
  { question: "Can I crop multiple images at once?", answer: "Yes. Upload multiple images, choose a crop ratio, and export all cropped files together." },
  { question: "Can I download all cropped images as a ZIP?", answer: "Yes. Bulk cropped images can be downloaded as a ZIP file." },
  { question: "Does bulk cropping reduce image quality?", answer: "Cropping removes pixels outside the selection. PNG avoids lossy output compression; JPG and WebP can lose detail when encoded. Local processing does not guarantee identical pixels, metadata, or file size." },
  { question: "Can I crop all images to 1:1?", answer: "Yes. Selecting 1:1 creates a square crop for each image, including portrait and landscape originals. Adjust each subject separately. Apply This Crop to All Images copies relative framing while preserving the pixel aspect ratio; it is not subject detection." },
  { question: "Does the same ratio mean the same pixel dimensions?", answer: "No. This page exports each crop at its own pixel size. Two square crops may be 600 by 600 and 450 by 450 pixels. Check ZIP contents before downloading. Use a fixed-size preset when every file must have identical dimensions." },
  { question: "What happens if one export fails?", answer: "Successful images are included in the ZIP. Failed filenames remain visible, and Retry failed images exports only that subset without clearing your crops. If ZIP creation fails, the pending batch remains available to retry." },
  { question: "Can I rename files during export?", answer: "Yes. Enter a file name prefix before downloading. Files will be named with that prefix and a sequence number, for example product-01.jpg, product-02.jpg." },
  { question: "Are my images uploaded?", answer: "No. ImageCropKit processes the images locally in your browser." },
  { question: "Can I adjust images individually?", answer: "Yes. You can adjust the crop area for individual images before downloading." },
  { question: "What image formats are supported for bulk cropping?", answer: "ImageCropKit supports JPG, PNG, WebP, BMP, and GIF as input formats. Cropped images can be exported as JPG, PNG, or WebP." },
  { question: "How many images can I crop at once?", answer: "There is no fixed file-count limit. Memory and source resolution determine the practical batch size. Start small, especially on mobile, and split the batch if decoding or ZIP creation fails." },
  { question: "Can I crop images to social media sizes in bulk?", answer: "Yes. Choose a social media aspect ratio such as 1:1 for Instagram, 4:5 for portrait posts, or 16:9 for YouTube thumbnails, then apply it across your entire batch." },
];

const related = [
  { title: "Screenshot Cropper", href: "/crop-screenshot", description: "Crop and trim screenshots without uploading them." },
  { title: "Crop Image to 1:1", href: "/crop-image-to-1x1", description: "Make a single square image with a chosen pixel preset." },
  { title: "Product Image Cropper", href: "/crop-product-images", description: "Square product photos with consistent framing." },
  { title: "LoRA Image Cropper", href: "/crop-images-for-lora-training", description: "Batch crop training images at common AI dataset sizes." },
];

export default function BulkCropImagesPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Bulk Crop Images Online</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Crop multiple images in one workflow. Upload a batch of images, apply a shared crop ratio, adjust individual crops when needed, and download all cropped images as a ZIP file.
        </p>
      </div>

      <BulkCropEditor showTrustBadges />

      <BulkCropExample />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Batch crop multiple images online</h2>
        <p>
          ImageCropKit helps you crop a group of images without editing every file one by one.
          Upload multiple images, select a shared crop ratio, adjust the crop area, and export
          the results together. The entire bulk image workflow runs in your browser — no server
          upload, no account required.
        </p>
        <p>
          This is useful for preparing product photos, social media images, thumbnails, profile
          pictures, and AI dataset images that need consistent framing across a large batch.
        </p>

        <h2>Apply the same crop ratio across a batch</h2>
        <p>
          Choose a common aspect ratio such as 1:1, 4:5, 16:9, or 9:16 and apply it across your
          uploaded images. Selecting a ratio creates a centered starting crop for each source.
          Move or resize it around each subject. Apply This Crop to All Images transfers the
          relative center and crop size while retaining the pixel ratio on mixed originals.
          It replaces existing selections, so review the batch afterward.
        </p>

        <h2>Crop images for social media in bulk</h2>
        <p>
          A ratio sets the shape, not the final pixel size. This page keeps each crop at its
          source pixel dimensions, shown in ZIP contents. For one exact-size image, use
          <Link href="/crop-and-resize-image"> crop and resize</Link>. For one source in several
          output sizes, use the <Link href="/social-media-image-pack?pack=creator">creator export pack</Link>.
        </p>
        <p>
          For a complete reference of every platform dimension, see our
          {" "}
          <Link href="/blog/social-media-image-sizes-2026">social media image sizes guide</Link>.
        </p>

        <h2>Supported image formats</h2>
        <p>
          ImageCropKit accepts JPG, PNG, WebP, BMP, and GIF as input. Cropped images can be
          exported as JPG, PNG, or WebP. JPG works well for photographs where file size matters.
          PNG preserves transparency and avoids lossy compression. WebP is another option for
          web assets. Animated GIF input is exported as a still image, not a cropped animation.
        </p>

        <h2>Download cropped images as a ZIP file</h2>
        <p>
          After cropping, ImageCropKit exports all processed images and packages them into one
          ZIP file. You can also enter a file name prefix so exported files follow a consistent
          naming pattern. ZIP contents lists actual names and dimensions. Matching source
          filenames receive unique suffixes so they do not overwrite one another.
        </p>

        <h2>Batch cropping without losing quality</h2>
        <p>
          Export creates a new image file. JPG and WebP compression can change detail; resizing
          can soften edges, and enlarging a small crop cannot restore missing detail. PNG avoids
          lossy output compression, but metadata and color handling may differ from the original.
          Keep your source files and inspect an output before processing a large batch.
        </p>

        <h2>Private bulk image cropping</h2>
        <p>
          All batch processing happens locally in your browser. Your images are not uploaded
          to a server, which makes this tool useful for private photos, internal screenshots,
          ecommerce product images, and dataset preparation. Closing the tab clears the editing
          session; original files and downloads remain on your device.
        </p>
        <p>
          If your batch is mostly screenshots, start with the <Link href="/crop-screenshot">screenshot cropper</Link>
          for one image or <Link href="/trim-screenshot">trim screenshot</Link> when the main task is
          removing whitespace and extra interface edges.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData
        pageTitle="Bulk Crop Images Online"
        pageUrl="https://imagecropkit.com/bulk-crop-images"
        faqItems={faqItems}
        howToSteps={[
          { name: "Upload images", text: "Upload one or more images by dragging, clicking, or pasting from the clipboard." },
          { name: "Choose a preset", text: "Select a common crop ratio or preset that will be shared across the batch." },
          { name: "Adjust per image", text: "Fine-tune the crop area for individual images when needed." },
          { name: "Review outputs", text: "Check each crop and the filenames and pixel dimensions in ZIP contents. Copy framing to all only when it suits the batch." },
          { name: "Download ZIP", text: "Choose PNG, JPG, or WebP and download all cropped images as a single ZIP file." },
        ]}
      />
    </div>
  );
}
