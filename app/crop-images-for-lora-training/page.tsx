import type { Metadata } from "next";
import dynamic from "next/dynamic";
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import { aiPresets } from "@/lib/presets";

const BulkCropEditor = dynamic(() => import("@/components/BulkCropEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});

export const metadata: Metadata = {
  title: "AI Dataset Cropper — LoRA Training Sizes",
  description: "Free online image cropper for LoRA training and AI datasets. Batch crop images to 512x512, 768x768, or 1024x1024 locally in your browser. No upload.",
  alternates: { canonical: "https://imagecropkit.com/crop-images-for-lora-training" },
};

const defaultPreset = aiPresets.find((p) => p.id === "ai-1024");

const faqItems = [
  { question: "Can I crop images to 512x512?", answer: "Yes. Choose the 512x512 preset before exporting." },
  { question: "Can I batch crop images for LoRA training?", answer: "Yes. This page is designed for batch cropping AI dataset images." },
  { question: "Can I export 1024x1024 images?", answer: "Yes. Choose the 1024x1024 preset." },
  { question: "Are my dataset images uploaded?", answer: "No. They are processed locally in your browser." },
  { question: "Can I download all cropped images as a ZIP?", answer: "Yes. Batch exports can be downloaded as a ZIP file." },
];

const related = [
  { title: "Bulk Crop Images", href: "/bulk-crop-images", description: "Batch cropping with shared aspect ratio and ZIP download." },
  { title: "Crop Image to 1:1", href: "/crop-image-to-1x1", description: "Make a square image at 512, 768, 1024, 1080, or 2000 pixels." },
  { title: "Crop Image Locally", href: "/crop-image-locally", description: "A private cropper that runs entirely in your browser with no upload." },
  { title: "Circle Crop Image", href: "/circle-crop-image", description: "Crop a round profile picture or avatar with a transparent background." },
];

export default function CropImagesForLoRATrainingPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Crop Images for LoRA Training</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Prepare image crops for AI datasets. Batch crop images to common AI training sizes such as 512x512, 768x768, and 1024x1024.
        </p>
      </div>

      <BulkCropEditor defaultPreset={defaultPreset} showPresets={aiPresets} showTrustBadges />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>AI dataset image cropper</h2>
        <p>
          ImageCropKit helps you prepare image crops for LoRA training and AI dataset
          workflows directly in your browser. Upload multiple images, choose a dataset
          preset, adjust crops if needed, and download the processed files as a ZIP.
        </p>
        <p>
          This is useful when your training images need consistent dimensions before being
          used in a Stable Diffusion or LoRA workflow.
        </p>

        <h2>Common LoRA training sizes</h2>
        <p>Choose from common AI dataset crop sizes:</p>
        <ul>
          <li><strong>512 × 512</strong> for lightweight SD 1.5 workflows</li>
          <li><strong>768 × 768</strong> for higher-resolution training sets</li>
          <li><strong>1024 × 1024</strong> for SDXL-style square datasets</li>
          <li><strong>1024 × 1536</strong> for portrait images</li>
          <li><strong>1536 × 1024</strong> for landscape images</li>
        </ul>

        <h2>Batch crop dataset images</h2>
        <p>
          Instead of editing each image one by one, upload your dataset images together and
          crop them in one batch workflow. You can adjust individual crops and export
          everything as a ZIP file.
        </p>

        <h2>Local processing for dataset privacy</h2>
        <p>
          Dataset images are processed locally in your browser. ImageCropKit does not upload
          your training images to a server, which is useful when working with private or
          unreleased image sets.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData pageTitle="Crop Images for LoRA Training" pageUrl="https://imagecropkit.com/crop-images-for-lora-training" faqItems={faqItems} />
    </div>
  );
}
