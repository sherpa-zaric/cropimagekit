import type { Metadata } from "next";
import dynamic from "next/dynamic";
const CropEditor = dynamic(() => import("@/components/CropEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import { passportPresets } from "@/lib/presets";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Passport Photo Cropper — Free Online, US, UK, EU, India & China",
  description: "Crop passport photos online free. Choose US, UK, EU, India, China, or 1×1 inch ID presets. White background, exact dimensions, no upload, local browser processing.",
  alternates: { canonical: `${SITE_URL}/crop-image-to-passport-size` },
};

const defaultPreset = passportPresets.find((p) => p.id === "passport-us");

const faqItems = [
  { question: "What size is a US passport photo?", answer: "A US passport photo is 2 × 2 inches, which equals 600 × 600 pixels at 300 DPI. The preset exports exactly 600 × 600 pixels with a 1:1 aspect ratio." },
  { question: "What are UK and EU passport photo dimensions?", answer: "UK and EU/Schengen passport photos are 35 × 45 millimetres. At 300 DPI, this is 413 × 531 pixels. The preset matches this exact ratio and output size." },
  { question: "Can I use this for official passport applications?", answer: "ImageCropKit exports images at the exact pixel dimensions required for many official applications. You should verify the current requirements of the specific authority you are applying to, as rules can change." },
  { question: "Does it add a white background?", answer: "Yes. When you crop with a passport preset, the exported image is filled with a white background. This is useful if your original photo has a transparent or non-compliant background." },
  { question: "What format should I export?", answer: "JPG is the most common format requested by passport agencies because it produces a small file size and does not support transparency. PNG also works and will have a white background applied." },
  { question: "Are my photos uploaded to a server?", answer: "No. ImageCropKit processes your photo locally in your browser. Your image never leaves your device." },
];

const related = [
  { title: "Crop Headshot", href: "/crop-headshot", description: "Centered crops for LinkedIn, resumes, and professional profile photos." },
  { title: "Crop Image to 1:1", href: "/crop-image-to-1x1", description: "Make a square image at 512, 768, 1024, 1080, or 2000 pixels." },
  { title: "Bulk Crop Images", href: "/bulk-crop-images", description: "Crop a batch of images and download them as a ZIP file." },
  { title: "Circle Crop Image", href: "/circle-crop-image", description: "Create round profile pictures and transparent PNG circle crops." },
];

export default function PassportPhotoCropperPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Passport Photo Cropper — Free Online</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Crop your photo to official passport and ID dimensions. Choose a country preset, adjust the crop, and download an exact-size image with a white background.
        </p>
      </div>

      <CropEditor defaultPreset={defaultPreset} showPresets={passportPresets} showTrustBadges fillBackground="#ffffff" />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Passport photo cropper</h2>
        <p>
          Preparing a passport photo at home can be difficult because every country has its own
          width, height, and aspect ratio requirements. ImageCropKit includes preset dimensions for
          the United States, United Kingdom, European Union, India, China, and a general 1 × 1 inch
          ID size. Upload your photo, choose the right country preset, adjust the crop area so your
          face is centred, and download the exact pixel dimensions you need.
        </p>
        <p>
          The tool applies a white background during export, which helps if your original image has
          a transparent background or a colour that does not meet passport guidelines. Because
          processing happens entirely in your browser, your photo is never uploaded to a server.
        </p>

        <h2>Passport photo presets</h2>
        <p>Choose from common official passport and ID photo sizes:</p>
        <ul>
          <li><strong>US Passport</strong>: 600 × 600 pixels (2 × 2 inches at 300 DPI)</li>
          <li><strong>UK Passport</strong>: 413 × 531 pixels (35 × 45 mm at 300 DPI)</li>
          <li><strong>EU / Schengen</strong>: 413 × 531 pixels (35 × 45 mm at 300 DPI)</li>
          <li><strong>India Passport</strong>: 413 × 531 pixels (35 × 45 mm at 300 DPI)</li>
          <li><strong>China Passport</strong>: 390 × 567 pixels (33 × 48 mm at 300 DPI)</li>
          <li><strong>1 × 1 inch ID</strong>: 300 × 300 pixels (1 × 1 inch at 300 DPI)</li>
        </ul>
        <p>
          Each preset locks the correct aspect ratio and exports the exact output size, so you do
          not need to calculate millimetre-to-pixel conversions yourself.
        </p>

        <h2>Why browser-based passport cropping is safer</h2>
        <p>
          Passport photos contain sensitive personal information. ImageCropKit processes your image
          locally in your browser using the Canvas API. Your file is not uploaded to a server, stored
          in a database, or shared with third parties. You can crop sensitive ID photos on any
          device without creating an account.
        </p>

        <h2>More tools for ID and profile photos</h2>
        <p>
          Need a professional headshot or a square profile picture? Try the headshot cropper for
          LinkedIn and resume photos, the 1:1 cropper for exact square sizes, or the circle cropper
          for round avatars.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData pageTitle="Passport Photo Cropper — Free Online" pageUrl={`${SITE_URL}/crop-image-to-passport-size`} faqItems={faqItems} />
    </div>
  );
}
