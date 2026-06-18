import type { Metadata } from "next";
import dynamic from "next/dynamic";
const CircleCropEditor = dynamic(() => import("@/components/CircleCropEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Circle Image Cropper — Free Online, Round Crop | ImageCropKit",
  description:
    "Crop an image into a circle online for free. Make round profile pictures, avatars, and logos. Export as PNG with transparency or JPG with a white background.",
  alternates: { canonical: "https://imagecropkit.com/circle-crop-image" },
};

const faqItems = [
  { question: "How do I crop an image into a circle?", answer: "Upload your image, adjust the 1:1 crop area, and download the result. The exported image will be a perfect circle." },
  { question: "What is the difference between circle crop and round crop?", answer: "They are the same thing. Circle crop, round crop, and circular crop all refer to clipping an image into a perfect 1:1 round shape. The terms are used interchangeably." },
  { question: "Can I make a circular profile picture?", answer: "Yes. Choose a preset such as 512×512 or 1024×1024, adjust the crop to center your face, and download the circle crop." },
  { question: "Does the circle crop reduce image quality?", answer: "No. ImageCropKit uses the browser Canvas API to draw your original image pixels into the circular crop area. No compression or re-encoding happens until you choose to export, and you control the output quality." },
  { question: "Does the circle crop have a transparent background?", answer: "PNG and WebP exports have a transparent background. JPG exports have a white background." },
  { question: "Is the image uploaded to a server?", answer: "No. The circle crop happens locally in your browser." },
  { question: "Can I use this on mobile?", answer: "Yes. The circle cropper works on desktop and mobile browsers." },
];

const related = [
  { title: "Crop Image to 1:1", href: "/crop-image-to-1x1", description: "Make a square image at 512, 768, 1024, 1080, or 2000 pixels." },
  { title: "Headshot Cropper", href: "/crop-headshot", description: "Centered crops for LinkedIn, resumes, and profile photos." },
  { title: "Crop Image Online", href: "/crop-image", description: "A simple single-image cropper with common aspect ratios." },
  { title: "Crop Image Locally", href: "/crop-image-locally", description: "A private cropper that runs entirely in your browser with no upload." },
];

export default function CircleCropImagePage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Circle Image Cropper — Free Online</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Free online circle crop tool. Round crop any image into a perfect circle for profile pictures, avatars, and logos. Export as PNG with transparency or JPG with a white background. No upload.
        </p>
      </div>

      <CircleCropEditor showTrustBadges />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Circle image cropper</h2>
        <p>
          ImageCropKit makes it easy to crop any image into a perfect circle — also called a round crop
          or circular crop. Upload a photo, adjust the crop area, and download a round image ready
          for use as a profile picture, avatar, or logo.
        </p>
        <p>
          The circle cropper forces a 1:1 aspect ratio so the result is always a perfect circle.
          You can choose from common round crop sizes such as 512×512 for small avatars, 1024×1024
          for high-resolution profile pictures, and 1080×1080 for social media avatars.
        </p>

        <h2>How to round crop an image online</h2>
        <ol>
          <li>Upload your image by dragging, clicking, or pasting from the clipboard.</li>
          <li>Adjust the 1:1 crop area to frame the part you want inside the circle.</li>
          <li>Choose a circle size preset if you need a specific output dimension.</li>
          <li>Choose PNG for a transparent background or JPG for a white background.</li>
          <li>Download the circular image.</li>
        </ol>

        <h2>Circle crop presets</h2>
        <p>Choose from common circular image sizes:</p>
        <ul>
          <li><strong>Profile Picture</strong>: 512 × 512 — small avatars and lightweight uses</li>
          <li><strong>High Resolution Avatar</strong>: 1024 × 1024 — profile and team pages</li>
          <li><strong>Social Avatar</strong>: 1080 × 1080 — social media profile images</li>
          <li><strong>Logo Circle</strong>: 1000 × 1000 — simple brand avatars</li>
        </ul>

        <h2>Export formats and transparency</h2>
        <p>
          When you export a circle crop as PNG or WebP, the area outside the circle is transparent.
          This makes the image easy to place on websites, apps, and designs with different
          background colors.
        </p>
        <p>
          If you export as JPG, the area outside the circle is filled with white. Use JPG when
          you need a smaller file size and the background color does not matter.
        </p>

        <h2>Private circle cropping</h2>
        <p>
          ImageCropKit processes your image locally in your browser. Your photo is not uploaded
          to a server, and you do not need to create an account.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData pageTitle="Circle Image Cropper — Free Online" pageUrl="https://imagecropkit.com/circle-crop-image" faqItems={faqItems} />
    </div>
  );
}
