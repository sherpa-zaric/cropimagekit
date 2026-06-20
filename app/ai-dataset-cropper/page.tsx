import type { Metadata } from "next";
import dynamic from "next/dynamic";
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import { aiPresets } from "@/lib/presets";
import { SITE_URL } from "@/lib/siteConfig";

const BulkCropEditor = dynamic(() => import("@/components/BulkCropEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});

export const metadata: Metadata = {
  title: "AI Dataset Cropper — 512, 768, 1024 Training Sizes",
  description:
    "Batch crop images for AI datasets, LoRA training, Stable Diffusion, and Flux. Export 512x512, 768x768, 1024x1024, portrait, and landscape sizes locally.",
  alternates: { canonical: `${SITE_URL}/ai-dataset-cropper` },
};

const defaultPreset = aiPresets.find((p) => p.id === "ai-1024");

const faqItems = [
  { question: "What is an AI dataset cropper?", answer: "An AI dataset cropper helps prepare training images with consistent dimensions and framing before they are used in LoRA, Stable Diffusion, Flux, or similar image model workflows." },
  { question: "Can I crop images to 512x512?", answer: "Yes. Choose the 512x512 preset to export square images commonly used for SD 1.5-style workflows." },
  { question: "Can I crop images to 1024x1024?", answer: "Yes. Choose the 1024x1024 preset for SDXL-style square datasets or high-resolution training sets." },
  { question: "Can I batch crop dataset images?", answer: "Yes. Upload multiple images, choose a dataset preset, adjust crops when needed, and download the results as a ZIP file." },
  { question: "Are my training images uploaded?", answer: "No. Dataset images are processed locally in your browser and are not uploaded to ImageCropKit servers." },
  { question: "Does this automatically caption or tag datasets?", answer: "No. ImageCropKit focuses on cropping and export dimensions. It does not generate captions, tags, or model metadata." },
];

const related = [
  { title: "LoRA Image Cropper", href: "/crop-images-for-lora-training", description: "Batch crop training images at common LoRA dataset sizes." },
  { title: "Bulk Crop Images", href: "/bulk-crop-images", description: "Batch cropping with shared aspect ratio and ZIP download." },
  { title: "Crop Image to 1:1", href: "/crop-image-to-1x1", description: "Make square images at 512, 768, 1024, 1080, or 2000 pixels." },
  { title: "Crop Image Locally", href: "/crop-image-locally", description: "A private cropper that runs entirely in your browser with no upload." },
];

export default function AiDatasetCropperPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">AI Dataset Cropper</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Batch crop images for LoRA training, Stable Diffusion, Flux, and AI dataset preparation. Export consistent 512, 768, 1024, portrait, or landscape crops without uploading your files.
        </p>
      </div>

      <BulkCropEditor defaultPreset={defaultPreset} showPresets={aiPresets} showTrustBadges />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Prepare image datasets with consistent crops</h2>
        <p>
          Training images work best when their dimensions and framing are consistent. ImageCropKit
          gives you a browser-based workflow for cropping many dataset images at once. Upload a
          batch, choose a training size, review the crops, and export everything as a ZIP.
        </p>

        <h2>Common AI training image sizes</h2>
        <p>
          Different training workflows use different image sizes. ImageCropKit includes the sizes
          most often needed for square, portrait, and landscape dataset preparation:
        </p>
        <ul>
          <li><strong>512 × 512</strong> for lightweight SD 1.5-style datasets</li>
          <li><strong>768 × 768</strong> for mid-resolution square training images</li>
          <li><strong>1024 × 1024</strong> for SDXL-style square datasets</li>
          <li><strong>1024 × 1536</strong> for portrait images</li>
          <li><strong>1536 × 1024</strong> for landscape images</li>
        </ul>

        <h2>LoRA, Stable Diffusion, and Flux workflows</h2>
        <p>
          This page is a general AI dataset cropper. If you are specifically preparing a LoRA
          dataset, the <a href="/crop-images-for-lora-training">LoRA image cropper</a> provides a
          focused workflow for common LoRA sizes. For square-only datasets, the
          {" "}<a href="/crop-image-to-1x1">1:1 cropper</a> is useful when you only need one image.
        </p>

        <h2>What this tool does not do</h2>
        <p>
          ImageCropKit does not judge dataset quality, remove duplicates, caption images, or train
          models. It focuses on one preparation step: creating consistent crops and exact output
          dimensions before you move images into your training pipeline.
        </p>

        <h2>Private dataset preparation</h2>
        <p>
          Dataset images can contain unreleased characters, client work, research material, or
          private references. ImageCropKit processes images locally in the browser, so files are not
          uploaded while you crop and export the dataset.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData pageTitle="AI Dataset Cropper" pageUrl={`${SITE_URL}/ai-dataset-cropper`} faqItems={faqItems} />
    </div>
  );
}
