import type { Metadata } from "next";
import dynamic from "next/dynamic";

import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import StructuredData from "@/components/StructuredData";
import { SITE_URL } from "@/lib/siteConfig";

const ExportPackEditor = dynamic(() => import("@/components/ExportPackEditor"), {
  loading: () => <div className="flex h-64 items-center justify-center text-muted-foreground">Loading export pack...</div>,
});

export const metadata: Metadata = {
  title: "Social Media Image Pack - Export Multiple Sizes",
  description: "Create a social media image pack from one source image. Set a focal point once, export Instagram, story, YouTube, and Pinterest sizes together as a ZIP. Free and local.",
  alternates: { canonical: `${SITE_URL}/social-media-image-pack` },
};

const faqItems = [
  { question: "What is a social media image pack?", answer: "It is a ZIP of several platform-ready crops created from one source image. Choose the target sizes, set a focal point once, and download every output together." },
  { question: "Does the subject stay in frame for every size?", answer: "Yes. Click the subject to set a focal point. ImageCropKit calculates the largest crop for each chosen aspect ratio while keeping that point as centered as the image boundaries allow." },
  { question: "Can I adjust one output separately?", answer: "Yes. Select any checked output in the list and adjust its crop in the preview. The other targets keep their focal-point crop." },
  { question: "Which sizes are included?", answer: "The Creator pack includes Instagram portrait, Instagram story, YouTube thumbnail, and Pinterest pin sizes. You can also choose Store and AI output packs from the same editor." },
  { question: "Are my images uploaded?", answer: "No. The entire export pack is created locally in your browser. Your source image and downloaded files never pass through an ImageCropKit server." },
];

const related = [
  { title: "Smart Image Cropper", href: "/smart-crop-image", description: "Set a focal point and make one precise crop." },
  { title: "Instagram Image Cropper", href: "/crop-image-for-instagram", description: "Crop one image for Instagram posts, stories, and reels." },
  { title: "Product Image Cropper", href: "/crop-product-images", description: "Prepare individual product crops for online storefronts." },
  { title: "AI Dataset Cropper", href: "/ai-dataset-cropper", description: "Batch crop images for AI training datasets." },
  { title: "YouTube Vertical Thumbnail Checker", href: "/youtube-vertical-thumbnail-checker", description: "Compare 16:9 and 4:5 crops for vertical YouTube videos." },
];

export default function SocialMediaImagePackPage() {
  return (
    <div className="mx-auto max-w-screen-2xl space-y-16 px-4 py-16">
      <section className="mx-auto max-w-3xl text-center space-y-4">
        <h1 className="text-3xl font-bold sm:text-4xl">One image. Every social size.</h1>
        <p className="text-lg text-muted-foreground">Set the subject once, then export a feed post, story, thumbnail, and pin together. Your image stays on your device.</p>
      </section>

      <ExportPackEditor />

      <section className="prose prose-neutral max-w-none dark:prose-invert">
        <h2>Stop re-cropping the same image for every channel</h2>
        <p>Posting the same visual across channels usually means reopening a cropper, choosing a new ratio, and moving the subject again for every destination. This export pack starts with the composition: choose the subject once, select the formats you need, and download a ready-to-use ZIP.</p>
        <p>The Creator pack is a sensible default for a publishing workflow, while the Store and AI packs make the same focal-point workflow useful for listing images and training data. You can remove outputs you do not need or add targets from another pack before exporting.</p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData pageTitle="Social Media Image Pack" pageUrl={`${SITE_URL}/social-media-image-pack`} faqItems={faqItems} />
    </div>
  );
}
