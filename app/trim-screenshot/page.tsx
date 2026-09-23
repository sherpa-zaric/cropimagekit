import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import ToolShowcase from "@/components/ToolShowcase";
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
  { question: "How do I trim a screenshot on Windows or Mac?", answer: "Capture the screenshot with Win + Shift + S or Cmd + Shift + 4, then paste or upload it here and drag the crop box just inside the content. The trimmed download works the same on both systems." },
  { question: "What is the difference between trimming and cropping a screenshot?", answer: "Trimming removes the outer edges — whitespace, browser chrome, desktop background — while cropping can select any region inside the image. This page handles both with one crop box." },
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

      <ToolShowcase ratio="16 / 9" outputLabel="Edges trimmed" caption="Trim empty borders and keep the content." />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Trim screenshots without uploading them</h2>
        <p>
          <strong>
            To trim a screenshot without uploading it, open the capture in a browser-based
            cropper, drag the crop box just inside the content you want to keep, and download
            the result. ImageCropKit processes screenshots locally, so internal dashboards,
            private chats, and bug reports never leave your device.
          </strong>
        </p>
        <p>
          Screenshots often include parts you do not need — browser tabs, address bars, desktop
          background, empty white space, chat sidebars, or unrelated UI. Trimming in the browser
          keeps only the useful area and keeps the file private.
        </p>

        <h2>What to remove from a screenshot</h2>
        <p>
          <strong>
            When trimming a screenshot, remove browser chrome, empty margins, desktop background,
            app sidebars, and unrelated chat context — anything outside the content you actually
            need to share. These elements add noise without adding information, and cutting them
            makes the remaining content easier to read.
          </strong>
        </p>
        <ul>
          <li><strong>Browser chrome</strong> — tabs, bookmarks, address bars, and extension icons</li>
          <li><strong>Empty margins</strong> — white space around the useful content</li>
          <li><strong>Desktop background</strong> — wallpaper, dock, taskbar, or window shadows</li>
          <li><strong>App sidebars</strong> — navigation that is not relevant to the screenshot</li>
          <li><strong>Chat context</strong> — messages above or below the part you need to share</li>
        </ul>

        <h2>Best format for trimmed screenshots</h2>
        <p>
          <strong>
            PNG is the best export format for trimmed screenshots because it keeps text and
            interface lines sharp. JPG can introduce blur around text and icons, while WebP is a
            good choice when the screenshot needs to stay small for web publishing or
            documentation.
          </strong>
        </p>

        <h2>Manual trimming instead of automatic editing</h2>
        <p>
          <strong>
            This page trims screenshots with a manual crop box. It does not blur sensitive data,
            detect private information, or decide the best crop automatically — you control
            exactly which part of the screenshot remains in the exported file.
          </strong>
        </p>

        <h2>Related screenshot tools</h2>
        <p>
          For a full walkthrough of screenshot cropping on Windows, Mac, and online, read the{" "}
          <Link href="/blog/how-to-crop-a-screenshot">how to crop a screenshot</Link> guide.
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
