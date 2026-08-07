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
  title: "Resize Image to 1920×1080 — Free Full HD Resizer Online",
  description:
    "Resize and crop any image to 1920×1080 (Full HD, 16:9). Free browser-based tool — no upload, no signup, no watermark. Works for wallpapers, YouTube thumbnails, desktop backgrounds, and presentations.",
  alternates: { canonical: "https://imagecropkit.com/resize-image-to-1920x1080" },
};

const fhdPresets = socialPresets.filter((p) => p.id === "fhd-1920x1080");
const defaultPreset = fhdPresets[0];

const faqItems = [
  { question: "What is 1920×1080?", answer: "1920×1080 is Full HD (also called 1080p) — a 16:9 widescreen resolution used for HDTV, desktop wallpapers, YouTube thumbnails, presentations, and video backgrounds." },
  { question: "Is 1920×1080 the same as 16:9?", answer: "Yes. 1920×1080 is a 16:9 aspect ratio. Any 16:9 image can be resized to 1920×1080 without distortion; non-16:9 images need to be cropped to fit." },
  { question: "Can I use 1920×1080 for a YouTube thumbnail?", answer: "YouTube's official thumbnail size is 1280×720, but uploading a 1920×1080 thumbnail at 2 MB or under works fine and stays sharp on large displays. Use the YouTube Thumbnail preset for the exact 1280×720 size." },
  { question: "Is this 1920×1080 resizer free?", answer: "Yes. The tool is free with no signup, no watermark, and no limits on the number of images you resize." },
  { question: "Are my images uploaded to a server?", answer: "No. Your image is processed locally in your browser using the Canvas API. Nothing is sent to any server." },
];

const related = [
  { title: "OG Image Cropper", href: "/crop-image-to-og-image-1200x630", description: "Crop images to 1200×630 for social share card previews." },
  { title: "Twitter Header Resizer", href: "/twitter-header-resizer", description: "Resize images to 1500×500 for X/Twitter profile headers." },
  { title: "Crop Image Online", href: "/crop-image", description: "A simple single-image cropper with common aspect ratios." },
  { title: "Crop Image by Dimensions", href: "/crop-image-by-dimensions", description: "Crop an image to any custom width and height." },
];

export default function ResizeImageTo1920x1080Page() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Resize Image to 1920×1080 (Full HD)</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Crop any image to 1920×1080 (Full HD, 16:9) for wallpapers, YouTube thumbnails, and presentations. Free, browser-based, no upload and no watermark.
        </p>
      </div>

      <CropEditor defaultPreset={defaultPreset} showPresets={fhdPresets} showTrustBadges />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>What is 1920×1080 used for?</h2>
        <p>
          1920×1080 is Full HD — the 16:9 widescreen resolution that has been the standard for HDTV,
          laptop screens, desktop monitors, and presentation slides for over a decade. It is the
          resolution YouTube uses for 1080p video, the size most desktop wallpapers are shipped
          at, and a safe target for any image that needs to fill a widescreen display without
          looking soft. A 1920×1080 image is sharp on a 1080p monitor and still looks good on a
          1440p or 4K display, where it is simply upscaled by the OS.
        </p>
        <p>
          The 16:9 aspect ratio also matches YouTube&#39;s video frame and most presentation software
          (PowerPoint, Keynote, Google Slides). That makes 1920×1080 a good default for full-bleed
          slide backgrounds, video thumbnails, and any visual asset that has to sit inside a
          16:9 frame.
        </p>

        <h2>1920×1080 vs other 16:9 sizes</h2>
        <p>
          The 16:9 family includes 1280×720 (YouTube&#39;s official thumbnail size), 1920×1080 (Full
          HD), 2560×1440 (QHD), and 3840×2160 (4K). They all share the same aspect ratio, so the
          crop frame is identical — only the output resolution changes. 1920×1080 is the most
          broadly useful size: large enough to look sharp on a 1080p display, small enough to keep
          file size reasonable for web use.
        </p>
        <p>
          If you are exporting specifically for a YouTube thumbnail, the official size is 1280×720
          — use the YouTube Thumbnail preset for that. For a desktop wallpaper or a presentation
          background, 1920×1080 is the right target.
        </p>

        <h2>How to resize an image to 1920×1080</h2>
        <ol>
          <li>Upload your image by dragging it in or pasting from the clipboard.</li>
          <li>The crop area is pre-set to 1920×1080 (16:9). Adjust the handles to compose the frame.</li>
          <li>Choose JPG for a photo or PNG for a graphic with sharp edges.</li>
          <li>Download the image and use it as a wallpaper, thumbnail, or slide background.</li>
        </ol>

        <h2>Resize vs crop — what this tool actually does</h2>
        <p>
          If your source image is already 16:9, the tool resizes it to 1920×1080 and keeps the
          full image — no content is removed. If your source is a different ratio (4:3, 1:1,
          portrait, etc.), the crop frame selects which part of the image becomes the 1920×1080
          frame. Drag the frame to choose the composition; everything outside the frame is
          discarded on export.
        </p>
        <p>
          For a wallpaper, you usually want the most visually interesting part of the source in
          the frame. For a YouTube thumbnail, you want the subject (a face, a product, a key
          moment) in the center third, where it is not clipped by YouTube&#39;s player chrome.
        </p>

        <h2>1920×1080 tips</h2>
        <ul>
          <li><strong>Aspect ratio</strong>: 16:9. Non-16:9 sources are cropped to fit.</li>
          <li><strong>File format</strong>: JPG for photos and wallpapers, PNG for graphics with text or sharp edges.</li>
          <li><strong>File size</strong>: Keep wallpapers under 2 MB and YouTube thumbnails under 2 MB.</li>
          <li><strong>Subject placement</strong>: Keep important content in the center third for YouTube thumbnails.</li>
          <li><strong>Reusability</strong>: The same 1920×1080 file works for wallpapers, slides, and thumbnails.</li>
        </ul>

        <h2>Private and browser-based</h2>
        <p>
          Your image never leaves your device. ImageCropKit runs entirely in your browser using
          the Canvas API — no server upload, no account, and no watermark on the output. This
          makes it safe to use for personal wallpapers, client work, or draft concepts you are
          not ready to publish yet.
        </p>

        <h2>When to use a different tool</h2>
        <p>
          If you need a different 16:9 size, the Crop Image by Dimensions tool lets you set any
          custom width and height. For a YouTube-specific 1280×720 thumbnail, use the YouTube
          Thumbnail preset in the Instagram cropper&#39;s sibling tools. And for a social share
          preview image, the 1200×630 OG Image Cropper is the right target.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData
        pageTitle="Resize Image to 1920×1080 (Full HD)"
        pageUrl="https://imagecropkit.com/resize-image-to-1920x1080"
        appName="1920×1080 Image Resizer"
        faqItems={faqItems}
        howToSteps={[
          { name: "Upload your image", text: "Drag and drop, click to upload, or paste an image from your clipboard." },
          { name: "Adjust the crop to 1920×1080", text: "The crop area is pre-set to 1920×1080 (16:9). Drag the handles to frame the part of your image you want to keep." },
          { name: "Choose a format", text: "Pick JPG for a photo or PNG for a graphic with sharp edges." },
          { name: "Download", text: "Download the 1920×1080 image and use it as a wallpaper, thumbnail, or slide background." },
        ]}
      />
    </div>
  );
}