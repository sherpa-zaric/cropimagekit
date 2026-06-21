import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import { SITE_URL } from "@/lib/siteConfig";

const CropEditor = dynamic(() => import("@/components/CropEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});

export const metadata: Metadata = {
  title: "Trim Screenshot — Remove Edges and Whitespace",
  description:
    "Trim screenshots online without uploading them. Remove browser chrome, empty margins, desktop background, and extra whitespace locally in your browser.",
  alternates: { canonical: `${SITE_URL}/trim-screenshot` },
};

const faqItems = [
  { question: "How do I trim a screenshot?", answer: "Upload or paste your screenshot, drag the crop box around the part you want to keep, and download the trimmed screenshot as PNG, JPG, or WebP." },
  { question: "Can I remove whitespace from a screenshot?", answer: "Yes. Use the crop box to remove empty margins, browser chrome, desktop background, app sidebars, or extra whitespace around the important content." },
  { question: "Are screenshots uploaded?", answer: "No. ImageCropKit trims screenshots locally in your browser. Your screenshot is not uploaded to a server." },
  { question: "What format should I use after trimming a screenshot?", answer: "PNG is usually best for screenshots with text or UI elements because it keeps edges sharp. WebP is useful when you need a smaller file." },
  { question: "Can this automatically detect the screenshot edges?", answer: "Not yet. This page provides a manual trim workflow so you can choose exactly which area stays in the exported image." },
  { question: "Can I trim work or chat screenshots privately?", answer: "Yes. Local browser processing makes this suitable for private work screenshots, chat screenshots, support tickets, and documentation images." },
];

const related = [
  { title: "Screenshot Cropper", href: "/crop-screenshot", description: "Crop screenshots, trim edges, and export private captures locally." },
  { title: "Crop Image Locally", href: "/crop-image-locally", description: "A private cropper that runs entirely in your browser with no upload." },
  { title: "Crop by Dimensions", href: "/crop-image-by-dimensions", description: "Crop a screenshot to an exact pixel width and height." },
  { title: "Bulk Crop Images", href: "/bulk-crop-images", description: "Trim multiple screenshots and download them as a ZIP file." },
];

export default function TrimScreenshotPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Trim Screenshot Online</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Remove extra edges from screenshots without uploading them. Trim browser chrome, empty margins, app sidebars, desktop background, and whitespace locally in your browser.
        </p>
      </div>

      <CropEditor showTrustBadges />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Trim screenshots without uploading them</h2>
        <p>
          Screenshots often include parts you do not need: browser tabs, address bars, desktop
          background, empty white space, chat sidebars, or unrelated UI. ImageCropKit lets you
          trim the screenshot in your browser and export only the useful area.
        </p>
        <p>
          Because the image is processed locally, this workflow is suitable for internal
          dashboards, customer support screenshots, private chats, design reviews, documentation,
          bug reports, and any screenshot you do not want to upload to a server.
        </p>

        <h2>What to remove from a screenshot</h2>
        <ul>
          <li><strong>Browser chrome</strong> — tabs, bookmarks, address bars, and extension icons</li>
          <li><strong>Empty margins</strong> — white space around the useful content</li>
          <li><strong>Desktop background</strong> — wallpaper, dock, taskbar, or window shadows</li>
          <li><strong>App sidebars</strong> — navigation that is not relevant to the screenshot</li>
          <li><strong>Chat context</strong> — messages above or below the part you need to share</li>
        </ul>

        <h2>Best format for trimmed screenshots</h2>
        <p>
          PNG is usually the best export format for screenshots because it keeps text and
          interface lines sharp. JPG can introduce blur around text and icons. WebP is a good
          choice when the screenshot needs to stay small for web publishing or documentation.
        </p>

        <h2>Manual trimming instead of automatic editing</h2>
        <p>
          This page does not automatically blur sensitive data, detect private information, or
          decide the best crop for you. It gives you a manual crop box so you can control exactly
          which part of the screenshot remains.
        </p>

        <h2>Related screenshot tools</h2>
        <p>
          Use the <Link href="/crop-screenshot">screenshot cropper</Link> for general screenshot
          crops, <Link href="/crop-image-by-dimensions">crop by dimensions</Link> when you need an
          exact output size, or <Link href="/bulk-crop-images">bulk crop images</Link> when you
          need to trim several screenshots together.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData pageTitle="Trim Screenshot Online" pageUrl={`${SITE_URL}/trim-screenshot`} faqItems={faqItems} />
    </div>
  );
}
