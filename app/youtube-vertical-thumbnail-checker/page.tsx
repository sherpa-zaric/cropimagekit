import type { Metadata } from "next";
import dynamic from "next/dynamic";

import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";
import { SITE_URL } from "@/lib/siteConfig";

const YouTubeVerticalThumbnailEditor = dynamic(() => import("@/components/YouTubeVerticalThumbnailEditor"), {
  loading: () => <div className="flex h-64 items-center justify-center text-muted-foreground">Loading thumbnail checker...</div>,
});

export const metadata: Metadata = {
  title: "YouTube Vertical Thumbnail Checker - 16:9 vs 4:5",
  description: "Preview how a vertical YouTube video image can crop as a 16:9 custom thumbnail and a 4:5 Home, Explore, or Subscriptions fallback. Free, local, and no upload.",
  alternates: { canonical: `${SITE_URL}/youtube-vertical-thumbnail-checker` },
};

const faqItems = [
  { question: "Why do I need a YouTube vertical thumbnail checker?", answer: "YouTube notes that vertical videos can show an auto-generated 4:5 thumbnail on Home, Explore, and Subscriptions even when you upload a 16:9 custom thumbnail. Comparing both crops helps you keep the subject visible in each placement." },
  { question: "Does this tool generate YouTube's exact automatic thumbnail?", answer: "No. It creates a practical 4:5 composition preview from your chosen image and focal point. YouTube controls its own automatic thumbnail selection, so use this as a framing check before publishing." },
  { question: "Can I adjust the 16:9 and 4:5 crops separately?", answer: "Yes. Click either preview card to edit its crop. Adjusting one version does not overwrite the other version." },
  { question: "What image sizes can I export?", answer: "The checker exports a 1280 x 720 16:9 custom thumbnail and a 1080 x 1350 4:5 fallback preview as PNG, JPG, or WebP." },
  { question: "Are my YouTube images uploaded?", answer: "No. ImageCropKit processes the image locally in your browser. Your image never leaves your device." },
];

const related = [
  { title: "Social Media Safe Zone Checker", href: "/social-media-safe-zone", description: "Check social crop guides for Instagram, TikTok, YouTube, and LinkedIn." },
  { title: "Social Media Image Pack", href: "/social-media-image-pack", description: "Export multiple social image sizes together as a ZIP." },
  { title: "Smart Image Cropper", href: "/smart-crop-image", description: "Set a focal point and keep it centered while changing crop ratios." },
  { title: "Crop Image for TikTok", href: "/crop-image-for-tiktok", description: "Crop a vertical image for TikTok posts and cover frames." },
];

const howToSteps = [
  { name: "Upload a vertical image", text: "Add the image used for your vertical YouTube video. It stays in your browser." },
  { name: "Set the focal point", text: "Click the person, product, or subject that must remain visible in both thumbnail shapes." },
  { name: "Compare thumbnail placements", text: "Review the 16:9 custom thumbnail and 4:5 fallback preview side by side." },
  { name: "Adjust and export", text: "Open either preview to tune that crop, then download it in PNG, JPG, or WebP." },
];

export default function YouTubeVerticalThumbnailCheckerPage() {
  return (
    <div className="mx-auto max-w-screen-2xl space-y-16 px-4 py-16">
      <section className="mx-auto max-w-3xl space-y-4 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Will your YouTube subject survive the crop?</h1>
        <p className="text-lg text-muted-foreground">Compare a 16:9 custom thumbnail with a 4:5 vertical fallback before you publish. Keep the important part of your image visible everywhere YouTube can show it.</p>
      </section>

      <YouTubeVerticalThumbnailEditor />

      <section className="prose prose-neutral max-w-none dark:prose-invert">
        <h2>Check YouTube vertical thumbnail crops before publishing</h2>
        <p>YouTube recommends 16:9 custom thumbnails, but its help documentation notes that vertical videos can display an auto-generated 4:5 thumbnail on Home, Explore, and Subscriptions. That can leave a carefully positioned face, product, or title looking very different from the original 16:9 design.</p>
        <p>This checker keeps the decision visual. Mark the important subject once, compare the two likely shapes side by side, and adjust each crop independently when needed. The 4:5 panel is a practical composition preview, not a claim that it reproduces YouTube&apos;s automatic image selection exactly.</p>
        <p><a href="https://support.google.com/youtube/answer/72431" target="_blank" rel="noopener noreferrer">Read YouTube&apos;s custom thumbnail guidance</a> for the current platform rules and upload requirements.</p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData pageTitle="YouTube Vertical Thumbnail Checker" pageUrl={`${SITE_URL}/youtube-vertical-thumbnail-checker`} faqItems={faqItems} howToSteps={howToSteps} />
    </div>
  );
}
