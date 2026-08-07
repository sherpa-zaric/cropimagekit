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
  title: "Resize Image to 1080×1080 — Free Online Square Resizer",
  description:
    "Resize and crop any image to 1080×1080 pixels — the Instagram square post size. Free browser-based tool — no upload, no signup, no watermark. Also exports 512, 768, 1024, and 2000 square sizes.",
  alternates: { canonical: "https://imagecropkit.com/resize-image-to-1080x1080" },
};

const defaultPreset = squareSizePresets.find((p) => p.id === "square-1080");

const faqItems = [
  { question: "What is 1080×1080 used for?", answer: "1080×1080 is the Instagram square post size. It is also widely used for profile pictures, product thumbnails, and any 1:1 social image that needs to look sharp on both desktop and mobile feeds." },
  { question: "Is 1080×1080 the same as a 1:1 crop?", answer: "Yes. 1080×1080 is a 1:1 square aspect ratio. The 1080-pixel dimension is the specific Instagram square post resolution; a generic 1:1 crop can be any size." },
  { question: "Can I resize without cropping?", answer: "If your source is already square, the resize keeps the full image and just changes the resolution to 1080×1080. If your source is not square, the crop frame selects which part of the image becomes the square." },
  { question: "Is this 1080×1080 resizer free?", answer: "Yes. The tool is free with no signup, no watermark, and no limits on the number of images you resize." },
  { question: "Are my images uploaded to a server?", answer: "No. Your image is processed locally in your browser using the Canvas API. Nothing is sent to any server." },
];

const related = [
  { title: "Crop Image to 1:1", href: "/crop-image-to-1x1", description: "Make a square image at 512, 768, 1024, 1080, or 2000 pixels." },
  { title: "Instagram Image Cropper", href: "/crop-image-for-instagram", description: "Crop for Instagram posts, stories, reels, and profile pictures." },
  { title: "Crop Image Online", href: "/crop-image", description: "A simple single-image cropper with common aspect ratios." },
  { title: "Profile Photo Cropper", href: "/profile-photo-cropper", description: "Make a square profile photo at common avatar sizes." },
  { title: "Circle Crop Image", href: "/circle-crop-image", description: "Create a round avatar with a transparent PNG background." },
];

export default function ResizeImageTo1080x1080Page() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Resize Image to 1080×1080</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Crop any image to 1080×1080 pixels — the Instagram square post size. Free, browser-based, no upload and no watermark.
        </p>
      </div>

      <CropEditor defaultPreset={defaultPreset} showPresets={squareSizePresets} showTrustBadges />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>What is 1080×1080 used for?</h2>
        <p>
          1080×1080 is the Instagram square post size — the resolution Instagram uses for a 1:1
          feed post on both desktop and mobile. It is the most widely reused square image size on
          the web: the same 1080×1080 file works as a Facebook square post, a Pinterest square
          pin, a TikTok profile picture, a YouTube community post thumbnail, and a generic social
          avatar. If you only keep one square export of a photo, 1080×1080 is the safest choice.
        </p>
        <p>
          The size also works well for product thumbnails and ecommerce listings. Many platforms
          render square product images at up to 1080 pixels wide on retina displays, so a
          1080×1080 source looks sharp without being unnecessarily heavy. For high-resolution
          print or zoomable product photos you may want 2000×2000 instead, but for a web square,
          1080 is the sweet spot.
        </p>

        <h2>1080×1080 vs other square sizes</h2>
        <p>
          This tool ships all the common square sizes so you can pick the right one for the job.
          512×512 is the small avatar size used by Discord and many forum platforms. 768×768 is a
          mid-resolution square that works for older profile picture slots. 1024×1024 is the SDXL
          AI image training size and a common high-res avatar. 1080×1080 is the Instagram square
          post size and the best general-purpose social square. 2000×2000 is the ecommerce
          product photo size used by Amazon, Shopify, and Etsy.
        </p>
        <p>
          Start with 1080×1080 if you are not sure. You can always re-export at a different size
          from the same source image — the crop frame stays where you put it, so the composition
          does not change.
        </p>

        <h2>How to resize an image to 1080×1080</h2>
        <ol>
          <li>Upload your image by dragging it in or pasting from the clipboard.</li>
          <li>The crop area is pre-set to a 1080×1080 square. Adjust the handles to compose the frame.</li>
          <li>Choose JPG for a photo or PNG for a graphic with sharp edges.</li>
          <li>Download the image and post it to Instagram or your target platform.</li>
        </ol>

        <h2>Resize vs crop — what this tool actually does</h2>
        <p>
          If your source image is already a square, the tool resizes it to 1080×1080 and keeps the
          full image — no content is removed. If your source is a rectangle (portrait, landscape,
          or any non-1:1 ratio), the crop frame selects which part of the image becomes the
          1080×1080 square. Drag the frame to choose the composition; everything outside the frame
          is discarded on export. This is the same behavior Instagram applies when you pick the
          1:1 option in its app, but with a larger crop area and a real preview.
        </p>

        <h2>1080×1080 tips</h2>
        <ul>
          <li><strong>Aspect ratio</strong>: 1:1 square. Non-square sources are cropped to fit.</li>
          <li><strong>Instagram post</strong>: 1080×1080 is the native square feed post size.</li>
          <li><strong>File format</strong>: JPG for photos, PNG for graphics with text or sharp edges.</li>
          <li><strong>File size</strong>: Keep under 1 MB for fast social loading. JPG at 85% quality is usually plenty.</li>
          <li><strong>Reusability</strong>: The same 1080×1080 file works on Facebook, Pinterest, TikTok PFP, and YouTube community posts.</li>
        </ul>

        <h2>Private and browser-based</h2>
        <p>
          Your image never leaves your device. ImageCropKit runs entirely in your browser using
          the Canvas API — no server upload, no account, and no watermark on the output. This
          makes it safe to use for personal photos, client work, or draft concepts you are not
          ready to publish yet.
        </p>

        <h2>When to use a different tool</h2>
        <p>
          If you specifically want a circle avatar, use the Circle Crop Image tool to knock out
          the corners and export a transparent PNG. For Instagram-specific presets (portrait
          1080×1350, story 1080×1920, reel cover), use the Instagram Image Cropper. And if you
          need a batch of square images at different sizes, the Bulk Crop Images tool handles a
          whole folder at once.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData
        pageTitle="Resize Image to 1080×1080"
        pageUrl="https://imagecropkit.com/resize-image-to-1080x1080"
        appName="1080×1080 Image Resizer"
        faqItems={faqItems}
        howToSteps={[
          { name: "Upload your image", text: "Drag and drop, click to upload, or paste an image from your clipboard." },
          { name: "Adjust the crop", text: "The crop area is pre-set to a 1080×1080 square. Drag the handles to compose the frame." },
          { name: "Choose a format", text: "Pick JPG for a photo or PNG for a graphic with sharp edges." },
          { name: "Download", text: "Download the 1080×1080 image and post it to Instagram or your target platform." },
        ]}
      />
    </div>
  );
}