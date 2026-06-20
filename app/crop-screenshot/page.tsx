import type { Metadata } from "next";
import dynamic from "next/dynamic";
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import { SITE_URL } from "@/lib/siteConfig";

const CropEditor = dynamic(() => import("@/components/CropEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});

export const metadata: Metadata = {
  title: "Screenshot Cropper — Crop Screenshots Online",
  description:
    "Crop screenshots online without uploading them. Trim browser screenshots, chat screenshots, mobile screenshots, and work screenshots locally in your browser.",
  alternates: { canonical: `${SITE_URL}/crop-screenshot` },
};

const faqItems = [
  { question: "How do I crop a screenshot online?", answer: "Upload or paste your screenshot, drag the crop box around the part you want to keep, choose PNG, JPG, or WebP, and download the cropped screenshot." },
  { question: "Are screenshots uploaded to a server?", answer: "No. ImageCropKit processes screenshots locally in your browser, so private work screenshots, chat screenshots, and browser captures stay on your device." },
  { question: "What format should I use for screenshots?", answer: "PNG is usually best for screenshots because it preserves text, UI lines, and sharp edges without compression artifacts. WebP is useful when you need smaller files." },
  { question: "Can I remove whitespace from a screenshot?", answer: "Yes. Use the crop box to trim empty margins, browser chrome, desktop background, or extra whitespace before exporting." },
  { question: "Can I crop long screenshots?", answer: "You can crop long screenshots manually today. A dedicated long screenshot splitter is planned, but this page does not automatically split images yet." },
  { question: "Can I crop chat screenshots privately?", answer: "Yes. Because processing happens locally, ImageCropKit is suitable for cropping private chat screenshots before sharing them." },
];

const related = [
  { title: "Crop Image Locally", href: "/crop-image-locally", description: "A private cropper that runs entirely in your browser with no upload." },
  { title: "Crop Image Online", href: "/crop-image", description: "Single image cropping with free crop and common aspect ratios." },
  { title: "Crop by Dimensions", href: "/crop-image-by-dimensions", description: "Crop a screenshot to any exact pixel width and height." },
  { title: "Bulk Crop Images", href: "/bulk-crop-images", description: "Crop multiple screenshots and download them as a ZIP file." },
];

export default function CropScreenshotPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Crop Screenshot Online</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Crop screenshots without uploading them. Trim browser captures, chat screenshots, mobile screenshots, documentation screenshots, and work images locally in your browser.
        </p>
      </div>

      <CropEditor showTrustBadges />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Screenshot cropper for private captures</h2>
        <p>
          ImageCropKit helps you crop screenshots directly in your browser. Upload or paste a
          screenshot, drag the crop box around the important area, and export the result as PNG,
          JPG, or WebP. The image data stays on your device, which is important for internal
          dashboards, customer conversations, bug reports, code snippets, and private documents.
        </p>

        <h2>When to crop a screenshot</h2>
        <p>
          Screenshots often include more context than you want to share. You may need to remove
          browser tabs, desktop background, extra whitespace, sidebars, status bars, or unrelated
          messages. A precise crop keeps the useful information visible while reducing noise.
        </p>
        <ul>
          <li><strong>Browser screenshots</strong> — remove tabs, bookmarks, address bars, and page margins</li>
          <li><strong>Chat screenshots</strong> — focus on the relevant messages before sharing</li>
          <li><strong>Mobile screenshots</strong> — trim status bars, navigation areas, or empty space</li>
          <li><strong>Code screenshots</strong> — keep the readable snippet and remove editor chrome</li>
          <li><strong>Documentation screenshots</strong> — crop UI examples consistently for guides and reports</li>
        </ul>

        <h2>Best export format for screenshots</h2>
        <p>
          PNG is usually the safest format for screenshots because it preserves sharp text,
          interface lines, and flat colors without visible compression artifacts. JPG works for
          photographic screenshots but can blur text. WebP is useful when you want smaller files
          while keeping screenshots crisp enough for web publishing.
        </p>

        <h2>What this tool does not do</h2>
        <p>
          This page does not automatically detect sensitive information, blur text, or split long
          screenshots. It gives you a private crop workflow so you can manually choose exactly what
          stays in the exported image.
        </p>

        <h2>Related screenshot workflows</h2>
        <p>
          If you need exact output dimensions, use the <a href="/crop-image-by-dimensions">custom size cropper</a>.
          If you need to process many screenshots together, use <a href="/bulk-crop-images">bulk crop images</a>.
          For a technical explanation of local processing, read <a href="/crop-image-locally">crop image locally</a>.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData pageTitle="Crop Screenshot Online" pageUrl={`${SITE_URL}/crop-screenshot`} faqItems={faqItems} />
    </div>
  );
}
