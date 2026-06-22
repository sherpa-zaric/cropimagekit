import type { Metadata } from "next";
import dynamic from "next/dynamic";

import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";
import { SITE_URL } from "@/lib/siteConfig";

const OvalCropEditor = dynamic(() => import("@/components/OvalCropEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});

export const metadata: Metadata = {
  title: "Oval Image Cropper — Free Online, Ellipse Crop | ImageCropKit",
  description: "Free online oval image cropper. Crop images into oval and elliptical shapes. Choose portrait, tall, or round oval presets. Export as PNG with transparency or JPG with white background.",
  alternates: { canonical: `${SITE_URL}/oval-crop-image` },
};

const faqItems = [
  { question: "What is the difference between circle crop and oval crop?", answer: "A circle crop is a perfect 1:1 round shape. An oval crop is an ellipse with a different width and height, creating a slightly stretched round shape. Some platforms and design styles prefer oval portraits over perfect circles." },
  { question: "Can I use oval crops for profile pictures?", answer: "Yes. Oval profile pictures work well on platforms and designs that allow non-circular rounded avatars. You can export as PNG with a transparent background or as JPG with a white background." },
  { question: "Will the oval crop distort my image?", answer: "No. The crop area is selected from your original image and then clipped into an oval shape. The content inside the crop is not stretched or distorted." },
  { question: "What formats can I export?", answer: "You can export as PNG for a transparent background, or as JPG or WebP for a smaller file size. JPG and WebP will have a white background applied automatically." },
  { question: "Are my images uploaded to a server?", answer: "No. ImageCropKit processes your image locally in your browser. Your image never leaves your device." },
];

const related = [
  { title: "Circle Crop Image", href: "/circle-crop-image", description: "Create perfect round profile pictures and transparent PNG circle crops." },
  { title: "Crop Headshot", href: "/crop-headshot", description: "Centered crops for LinkedIn, resumes, and professional profile photos." },
  { title: "Crop Image to 1:1", href: "/crop-image-to-1x1", description: "Make a square image at 512, 768, 1024, 1080, or 2000 pixels." },
  { title: "Passport Photo Cropper", href: "/crop-image-to-passport-size", description: "Crop photos to official passport and ID dimensions." },
];

export default function OvalCropImagePage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Oval Image Cropper — Free Online</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Crop images into oval and elliptical shapes. Choose a preset, adjust the crop, and download a transparent PNG or white-background JPG.
        </p>
      </div>

      <OvalCropEditor showTrustBadges />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Oval image cropper</h2>
        <p>
          An oval crop creates an elliptical shape instead of a perfect circle. This can be a subtle
          design choice for profile pictures, avatars, logos, and decorative image frames. Some
          platforms and templates use slightly rounded or oval shapes rather than strict circles.
          ImageCropKit makes it easy to create oval crops by combining an elliptical clip with your
          chosen crop area.
        </p>
        <p>
          Upload your image, choose an oval preset, adjust the crop area, and download the result.
          You can export as PNG with a transparent background outside the oval, or as JPG or WebP
          with a white background. All processing happens locally in your browser.
        </p>

        <h2>Oval crop presets</h2>
        <p>Choose from common oval shapes:</p>
        <ul>
          <li><strong>Portrait Oval</strong>: 600 × 800 pixels, a vertical ellipse ideal for portrait photos</li>
          <li><strong>Tall Oval</strong>: 640 × 800 pixels, a taller ellipse for profile-style crops</li>
          <li><strong>Round Oval</strong>: 600 × 600 pixels, a classic round crop (same as circle crop)</li>
        </ul>
        <p>
          Each preset locks the correct aspect ratio and exports the exact output size. You can also
          use the free crop option to select any oval-shaped area you prefer.
        </p>

        <h2>When to choose oval over circle</h2>
        <p>
          A circle crop is best when the final frame is square, such as a round avatar, app icon,
          or social profile picture. It keeps the width and height equal, so the result feels
          balanced in circular UI frames.
        </p>
        <p>
          An oval crop works better when the source image is portrait-oriented or when the design
          needs a taller frame. A vertical oval can include more hair, shoulders, or product height
          than a circle without forcing the subject into a tight square. Oval shapes are also useful
          for decorative badges, editorial portraits, and templates that call for an ellipse rather
          than a perfect round crop.
        </p>

        <h2>Privacy-first oval cropping</h2>
        <p>
          Like every ImageCropKit tool, the oval cropper processes your image locally in your browser.
          Your file is not uploaded to a server, stored in a database, or shared with any third
          party. You can crop sensitive photos and personal images without creating an account.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData pageTitle="Oval Image Cropper — Free Online" pageUrl={`${SITE_URL}/oval-crop-image`} faqItems={faqItems} />
    </div>
  );
}
