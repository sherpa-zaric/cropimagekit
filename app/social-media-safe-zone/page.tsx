import type { Metadata } from "next";
import dynamic from "next/dynamic";

import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";
import { SITE_URL } from "@/lib/siteConfig";

const SocialSafeZoneEditor = dynamic(() => import("@/components/SocialSafeZoneEditor"), {
  loading: () => <div className="flex h-64 items-center justify-center text-muted-foreground">Loading safe zone preview...</div>,
});

export const metadata: Metadata = {
  title: "Social Media Safe Zone Checker - Preview Image Crops",
  description: "Preview whether your image subject stays inside practical Instagram, TikTok, YouTube, and LinkedIn crop safe zones. Crop and export locally with no upload.",
  alternates: { canonical: `${SITE_URL}/social-media-safe-zone` },
};

const faqItems = [
  { question: "What is a social media safe zone?", answer: "A safe zone is the part of an image where an important subject is less likely to feel cramped by crop edges or common interface overlays. This tool uses practical composition guidance for previewing common social formats." },
  { question: "Are these official platform safe zones?", answer: "No. Platform interfaces and placements can change, so this tool is a visual composition guide rather than an official platform certification. Always review the final platform preview before publishing." },
  { question: "How do I check whether a face or product is safe?", answer: "Click Set focal point, click the face or product, then choose a platform preview. The tool marks whether that focal point is inside the dashed composition guide for the selected crop." },
  { question: "Can I export the image after checking it?", answer: "Yes. Choose PNG, JPG, or WebP and download the exact crop for the selected platform size." },
  { question: "Are my social media images uploaded?", answer: "No. ImageCropKit processes your image locally in your browser. The upload preview, crop calculation, and export all stay on your device." },
];

const related = [
  { title: "Social Media Image Pack", href: "/social-media-image-pack", description: "Export several social-ready crops together as a ZIP." },
  { title: "Smart Image Cropper", href: "/smart-crop-image", description: "Keep a clicked subject centered while changing aspect ratios." },
  { title: "Instagram Image Cropper", href: "/crop-image-for-instagram", description: "Make an Instagram post, story, reel cover, or profile crop." },
  { title: "TikTok Image Cropper", href: "/crop-image-for-tiktok", description: "Crop vertical TikTok images and cover frames." },
];

const howToSteps = [
  { name: "Upload an image", text: "Add a JPG, PNG, WebP, AVIF, or GIF from your device. The image stays in your browser." },
  { name: "Set the focal point", text: "Click Set focal point, then click the person, product, or other subject that must stay visible." },
  { name: "Preview a platform", text: "Choose Instagram, TikTok, YouTube, or LinkedIn to see the crop and composition guide." },
  { name: "Export the crop", text: "Adjust the crop if needed, choose an export format, and download the platform-sized image." },
];

export default function SocialMediaSafeZonePage() {
  return (
    <div className="mx-auto max-w-screen-2xl space-y-16 px-4 py-16">
      <section className="mx-auto max-w-3xl space-y-4 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">See what your audience will actually see.</h1>
        <p className="text-lg text-muted-foreground">Check a focal subject against practical Instagram, TikTok, YouTube, and LinkedIn crop guides before you publish. No upload and no account.</p>
      </section>

      <SocialSafeZoneEditor />

      <section className="prose prose-neutral max-w-none dark:prose-invert">
        <h2>Preview social media image safe zones before publishing</h2>
        <p>A crop can be technically the correct size and still lose the important part of an image once it meets a vertical viewer, a banner layout, or interface controls. This checker makes that problem visible before you publish. Set the subject once, move through common social media placements, and see the same crop inside a practical composition guide.</p>
        <p>The guide is intentionally visual rather than a promise of platform approval. Social interfaces change, and a final in-app preview is always the last word. But it is a fast way to spot an off-center face, a product too close to an edge, or a banner crop that leaves no room for profile UI.</p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData pageTitle="Social Media Safe Zone Checker" pageUrl={`${SITE_URL}/social-media-safe-zone`} faqItems={faqItems} howToSteps={howToSteps} />
    </div>
  );
}
