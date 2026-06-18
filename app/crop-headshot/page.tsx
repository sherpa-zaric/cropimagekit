import type { Metadata } from "next";
import dynamic from "next/dynamic";
const CropEditor = dynamic(() => import("@/components/CropEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import { headshotPresets } from "@/lib/presets";

const defaultPreset = headshotPresets.find((p) => p.id === "headshot-1:1");

export const metadata: Metadata = {
  title: "Headshot Cropper — LinkedIn, Resume, ID",
  description: "Free online headshot cropper. Make clean, centered headshots for LinkedIn, resumes, ID-style photos, and team pages. No upload, no signup.",
  alternates: { canonical: "https://imagecropkit.com/crop-headshot" },
};

const faqItems = [
  { question: "Can I crop a headshot to square?", answer: "Yes. Choose the 1:1 profile photo preset." },
  { question: "Can I crop a LinkedIn profile photo?", answer: "Yes. Use the LinkedIn profile preset." },
  { question: "Is my portrait uploaded?", answer: "No. The image is processed locally in your browser." },
  { question: "Can I export as JPG?", answer: "Yes. You can export as JPG, PNG, or WebP." },
  { question: "Can I crop multiple headshots?", answer: "Yes. Use Bulk Crop Images if you need to crop multiple portraits." },
];

const related = [
  { title: "Crop Image to 1:1", href: "/crop-image-to-1x1", description: "Make a square image at 512, 768, 1024, 1080, or 2000 pixels." },
  { title: "Crop Image Locally", href: "/crop-image-locally", description: "A private cropper that runs entirely in your browser with no upload." },
  { title: "Bulk Crop Images", href: "/bulk-crop-images", description: "Batch cropping with shared aspect ratio and ZIP download." },
  { title: "Circle Crop Image", href: "/circle-crop-image", description: "Create round avatars and transparent PNG circle crops." },
];

export default function CropHeadshotPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Headshot Cropper</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Crop clean headshots and profile photos. Upload a portrait, choose a profile or headshot preset, and download a clean cropped image.
        </p>
      </div>

      <CropEditor defaultPreset={defaultPreset} showPresets={headshotPresets} showTrustBadges />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Crop headshots and profile photos online</h2>
        <p>
          ImageCropKit helps you crop portraits for LinkedIn, resumes, profile pictures, team
          pages, and personal websites. Choose a headshot preset, adjust the crop area, and
          download a clean image in your preferred format.
        </p>
        <p>
          This page is designed for simple manual framing. You control the crop area so you
          can keep the face centered and leave enough space around the head and shoulders.
        </p>

        <h2>Common headshot crop ratios</h2>
        <p>Use different crop ratios depending on where the headshot will appear:</p>
        <ul>
          <li><strong>1:1</strong> for LinkedIn and profile photos</li>
          <li><strong>4:5</strong> for professional portraits and resumes</li>
          <li><strong>3:4</strong> for ID-style or document-style photos</li>
        </ul>

        <h2>Tips for cropping a professional headshot</h2>
        <p>
          Keep your face centered, leave a small amount of space above the head, and avoid
          cropping too tightly around the shoulders. For most uses, JPG at high quality
          works well, while PNG is useful when you want a lossless export.
        </p>

        <h2>Headshots for resumes and professional profiles</h2>
        <p>
          The headshot presets are also suitable for resume photos, company directory images,
          and professional social profiles. A clean, centered 1:1 or 4:5 crop works well on
          LinkedIn, corporate websites, and CV attachments. JPG exports at high quality keep
          file sizes small for email uploads.
        </p>

        <h2>Private portrait cropping</h2>
        <p>
          Your portrait is processed locally in your browser. ImageCropKit does not upload
          your headshot or store your image.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData pageTitle="Headshot Cropper" pageUrl="https://imagecropkit.com/crop-headshot" faqItems={faqItems} />
    </div>
  );
}
