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
  { question: "Can I crop long screenshots?", answer: "Yes. Select one section of a long screenshot and export it. The tool does not automatically split a scrolling capture into multiple images. Very large captures can exceed your device's available browser memory." },
  { question: "Does cropping a chat screenshot hide personal information?", answer: "Only information outside the selected area is removed from the exported image. Names, messages, faces, and account details inside the crop remain visible. Local processing does not automatically redact them; review the exported file before sharing." },
  { question: "Will PNG make a blurry screenshot sharp?", answer: "No. PNG avoids adding lossy compression artifacts, but it cannot restore detail missing from the source. Enlarging a small crop does not create more readable text. Start with the original screenshot rather than a compressed messaging-app copy." },
  { question: "How do I crop a screenshot on Windows?", answer: "Press Win + Shift + S to capture a region with the Snipping Tool, then paste the capture here and drag the crop box around the part you want to keep. Export as PNG to keep text sharp." },
  { question: "How do I crop a screenshot on Mac?", answer: "Press Cmd + Shift + 4 to capture a region, then open the screenshot here, drag the crop box around the part you want to keep, and download the result without uploading anything." },
];

const related = [
  { title: "Trim Screenshot", href: "/trim-screenshot", description: "Remove whitespace, browser chrome, and extra screenshot edges." },
  { title: "Crop Image Locally", href: "/crop-image-locally", description: "A private cropper that runs entirely in your browser with no upload." },
  { title: "Crop Image Online", href: "/crop-image", description: "Single image cropping with free crop and common aspect ratios." },
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

      <ToolShowcase scene="screenshot" ratio="16 / 10" outputLabel="Clean, focused PNG" caption="Cut away toolbars, docks, and distractions." />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Screenshot cropper for private captures</h2>
        <p>
          <strong>
            To crop a screenshot privately, open it in a browser-based cropper, drag the crop box
            around the area you want to keep, and export it as PNG, JPG, or WebP. ImageCropKit
            processes the capture locally, so the screenshot never leaves your device — which
            matters for internal dashboards, customer conversations, and bug reports.
          </strong>
        </p>
        <p>
          Upload or paste the capture, drag the box around the important area, and download the
          result. Code snippets, private documents, and work screenshots stay on your machine
          throughout.
        </p>

        <h2>When to crop a screenshot</h2>
        <p>
          <strong>
            Crop a screenshot whenever the capture includes content you do not want to share —
            browser tabs, desktop background, sidebars, or unrelated chat messages. A tight crop
            keeps the useful information visible and readable while removing the noise around it.
          </strong>
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
          <strong>
            PNG is the best export format for most screenshots because it keeps text, UI lines,
            and flat colors sharp without compression artifacts. Use JPG only for photographic
            captures, and WebP when you need a smaller file for web publishing.
          </strong>
        </p>

        <h2>What this tool does not do</h2>
        <p>
          <strong>
            This tool crops screenshots manually. It does not blur sensitive data, detect
            private information automatically, or split long scrolling captures — you drag the
            crop box and choose exactly what stays in the exported image before downloading it.
          </strong>
        </p>

        <h2>Cropping is not the same as redaction</h2>
        <p>
          <strong>
            A crop removes everything outside its boundary but conceals nothing inside it.
            Names, avatars, account numbers, and tokens inside the selected area stay visible in
            the exported file. Local processing protects the editing step only — always review
            the export before sharing it.
          </strong>
        </p>
        <p>
          Before sharing a work capture, check the exported file for identifying details and
          unrelated messages. If sensitive information sits between the details you need to
          retain, cropping alone is insufficient: use a dedicated redaction tool. Share the
          reviewed export, not the original full-screen capture.
        </p>

        <h2>Keep screenshot text readable</h2>
        <p>
          <strong>
            Start with the original capture to keep screenshot text readable. PNG export cannot
            undo compression damage from messaging apps, and enlarging a small crop does not
            restore missing characters. Frame the crop tightly around readable content instead
            of shrinking the whole screen into a narrow column.
          </strong>
        </p>
        <p>
          For documentation, retain enough context to identify the relevant control or error
          message without including the entire desktop.
        </p>

        <h2>Long captures and multiple excerpts</h2>
        <p>
          <strong>
            Export one focused excerpt at a time from a long scrolling capture; this tool does
            not split or stitch long screenshots automatically. A single readable excerpt beats
            a shrunk full-page image, and large captures also require more browser memory.
          </strong>
        </p>
        <p>
          For several separate screenshot files, the <Link href="/bulk-crop-images">batch cropper</Link> provides
          a ZIP workflow rather than automatic splitting of one long image.
        </p>

        <h2>Related screenshot workflows</h2>
        <p>
          For step-by-step instructions on Windows, Mac, and online, read the{" "}
          <Link href="/blog/how-to-crop-a-screenshot">how to crop a screenshot</Link> guide.
          If you mainly need to remove extra margins, use <Link href="/trim-screenshot">trim screenshot</Link>.
          If you need exact output dimensions, use the <Link href="/crop-image-by-dimensions">custom size cropper</Link>.
          If you need to process many screenshots together, use <Link href="/bulk-crop-images">bulk crop images</Link>.
          For a technical explanation of local processing, read <Link href="/crop-image-locally">crop image locally</Link>.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData pageTitle="Crop Screenshot Online" pageUrl={`${SITE_URL}/crop-screenshot`} faqItems={faqItems} />
    </div>
  );
}
