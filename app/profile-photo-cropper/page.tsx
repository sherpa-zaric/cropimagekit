import type { Metadata } from "next";
import dynamic from "next/dynamic";
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import { headshotPresets } from "@/lib/presets";
import { SITE_URL } from "@/lib/siteConfig";

const CropEditor = dynamic(() => import("@/components/CropEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});

export const metadata: Metadata = {
  title: "Profile Photo Cropper — Headshots, Passport, Avatars",
  description:
    "Crop profile photos online for LinkedIn, resumes, passport-style photos, square profile pictures, and round avatars. No upload, no signup, no watermark.",
  alternates: { canonical: `${SITE_URL}/profile-photo-cropper` },
};

const defaultPreset = headshotPresets.find((p) => p.id === "headshot-linkedin");

const faqItems = [
  { question: "How do I crop a profile photo?", answer: "Upload your photo, choose a square or portrait crop, center your face with a little space around the head and shoulders, and download the result." },
  { question: "Can I crop a LinkedIn profile picture?", answer: "Yes. Use the LinkedIn profile preset or choose a 1:1 square crop for a clean professional profile photo." },
  { question: "Can I make a round profile picture?", answer: "Use the circle crop tool when you need a transparent round avatar for apps, team pages, or social platforms." },
  { question: "Can I crop passport photos here?", answer: "For official passport dimensions, use the passport photo cropper. It includes US, UK, EU, India, China, and ID photo presets." },
  { question: "Are profile photos uploaded?", answer: "No. ImageCropKit processes profile photos locally in your browser and does not upload or store them." },
  { question: "What is the best profile photo ratio?", answer: "Most profile platforms display square images, so 1:1 is a safe default. Portrait 4:5 or 3:4 crops are useful for resumes, bios, and ID-style photos." },
];

const related = [
  { title: "Headshot Cropper", href: "/crop-headshot", description: "Centered crops for LinkedIn, resumes, and professional profile photos." },
  { title: "Passport Photo Cropper", href: "/crop-image-to-passport-size", description: "Crop photos to official passport and ID dimensions." },
  { title: "Circle Crop Image", href: "/circle-crop-image", description: "Create round avatars and transparent PNG circle crops." },
  { title: "Crop Image to 1:1", href: "/crop-image-to-1x1", description: "Make a square profile image at common pixel sizes." },
];

export default function ProfilePhotoCropperPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Profile Photo Cropper</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Crop profile photos, headshots, passport-style images, LinkedIn pictures, and avatars. Keep your face centered and export a clean image without uploading your photo.
        </p>
      </div>

      <CropEditor defaultPreset={defaultPreset} showPresets={headshotPresets} showTrustBadges />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Crop profile photos for professional and personal use</h2>
        <p>
          Profile photos are displayed in many different shapes and sizes. LinkedIn, resumes,
          company directories, team pages, online accounts, video call apps, and passport-style
          documents all crop faces differently. ImageCropKit lets you control the framing before
          you upload the photo somewhere else.
        </p>

        <h2>Choose the right profile photo crop</h2>
        <ul>
          <li><strong>1:1 square</strong> for LinkedIn, account avatars, and most social profile photos</li>
          <li><strong>4:5 portrait</strong> for professional bios, resumes, and vertical headshots</li>
          <li><strong>3:4 ID-style</strong> for document-style photos and formal portraits</li>
          <li><strong>Circle crop</strong> for apps and platforms that display round avatars</li>
          <li><strong>Passport presets</strong> for official country-specific dimensions</li>
        </ul>

        <h2>Profile photo framing tips</h2>
        <p>
          Keep the face centered, leave some room above the head, and avoid cropping too tightly
          around the chin or shoulders. For professional headshots, a square or 4:5 crop usually
          gives enough room for the face and upper shoulders. For official passport applications,
          verify the current rules from the relevant authority before submitting.
        </p>

        <h2>Use focused tools when you need exact output</h2>
        <p>
          Use the <a href="/crop-headshot">headshot cropper</a> for LinkedIn and resume framing,
          the <a href="/crop-image-to-passport-size">passport photo cropper</a> for country
          dimensions, the <a href="/circle-crop-image">circle crop tool</a> for transparent round
          avatars, or the <a href="/crop-image-to-1x1">1:1 cropper</a> for exact square sizes.
        </p>

        <h2>Private profile photo cropping</h2>
        <p>
          Profile photos and ID-style images are personal. ImageCropKit processes the photo in your
          browser using local image processing, so the image is not uploaded to a server while you
          adjust the crop and export the result.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData pageTitle="Profile Photo Cropper" pageUrl={`${SITE_URL}/profile-photo-cropper`} faqItems={faqItems} />
    </div>
  );
}
