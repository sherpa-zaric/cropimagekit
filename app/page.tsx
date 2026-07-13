import Link from "next/link";
import dynamic from "next/dynamic";
const ExportPackEditor = dynamic(() => import("@/components/ExportPackEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading export pack...</div>,
});
import ToolCard from "@/components/ToolCard";
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://imagecropkit.com" },
};

const faqItems = [
  { question: "Is ImageCropKit free?", answer: "Yes. ImageCropKit is completely free — there are no premium tiers, no watermarks on exported images, and no limits on the number of images you can crop. Every feature including bulk cropping, all presets, and all export formats is available to everyone." },
  { question: "Are my images uploaded to a server?", answer: "No. ImageCropKit processes all images locally in your browser using the Canvas API. Your files are loaded into browser memory and never sent to any server. You can verify this by opening your browser DevTools and watching the Network tab during processing." },
  { question: "Can I create multiple sizes from one image?", answer: "Yes. The export pack lets you select several output sizes, set a focal point once, and download all cropped files as a single ZIP. You can also adjust any selected output on its own." },
  { question: "What formats can I export?", answer: "You can export cropped images as PNG, JPG, or WebP. JPG is best for photographs with smaller file sizes. PNG preserves transparency and is ideal for graphics. WebP offers the best compression ratio for web use, producing files 25-35% smaller than JPG." },
  { question: "Do I need to create an account?", answer: "No. You can crop images without signing up, providing an email, or creating a password. Open the tool, upload your image, crop it, and download — the entire process takes under a minute with no account required." },
];

const homeRelated = [
  { title: "Screenshot Cropper", href: "/crop-screenshot", description: "Crop screenshots, trim whitespace, and export private screenshots locally." },
  { title: "AI Dataset Cropper", href: "/ai-dataset-cropper", description: "Batch crop images to 512, 768, 1024, and dataset training sizes." },
  { title: "Profile Photo Cropper", href: "/profile-photo-cropper", description: "Crop profile pictures, headshots, passport photos, and avatars." },
  { title: "Crop Image Online", href: "/crop-image", description: "Crop a single image with free crop or a common aspect ratio." },
  { title: "Bulk Crop Images", href: "/bulk-crop-images", description: "Crop a batch of images and download them as a ZIP." },
  { title: "Crop Image Locally", href: "/crop-image-locally", description: "A private image cropper that runs entirely in your browser." },
  { title: "Crop Image to 1:1", href: "/crop-image-to-1x1", description: "Make a square image at 512, 768, 1024, 1080, or 2000 pixels." },
  { title: "Circle Crop Image", href: "/circle-crop-image", description: "Crop a round profile picture or avatar with a transparent background." },
  { title: "Smart Image Cropper", href: "/smart-crop-image", description: "Lock the subject with a click and keep it centered when switching aspect ratios." },
  { title: "Social Media Image Pack", href: "/social-media-image-pack", description: "Export several social-ready sizes from one image in a single ZIP." },
  { title: "Social Media Safe Zone Checker", href: "/social-media-safe-zone", description: "Preview practical platform crop guides before publishing." },
];

export default function Home() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-24 space-y-24">
      <section className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl tracking-tight">
          One image. Every crop you need.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Set the subject once, then export social, store, or AI-ready sizes together. No uploads, no watermark, and no account.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/social-media-image-pack" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-6 text-sm font-medium hover:opacity-90 transition-opacity">
            Create an Export Pack
          </Link>
          <Link href="/crop-screenshot" className="inline-flex items-center justify-center rounded-md border border-border h-10 px-6 text-sm font-medium hover:bg-muted transition-colors">
            Crop One Image
          </Link>
        </div>
      </section>

      <section>
        <ExportPackEditor />
      </section>

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-center">A cropper built for the next step</h2>
        <p>
          ImageCropKit starts with a practical publishing workflow: one source image can become
          several correctly sized crops without repeatedly finding the subject in every frame.
          Select a pack, keep the important part of the image in view, and download the outputs
          as one ZIP.
        </p>
        <p>
          The specialist tools remain available for screenshots, AI datasets, product photos,
          and profile images. All processing stays local in your browser, including ZIP creation.
        </p>
      </section>

      <section>
        <h2 className="text-2xl text-center mb-4">Cropping tools organized by workflow</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Start with the workflow that matches your image. Each tool uses the same private, no-upload cropper and adds presets for the task.
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Core workflows</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ToolCard href="/social-media-image-pack" title="Social Media Image Pack" description="Set a subject once and export multiple platform sizes as a ZIP." />
              <ToolCard href="/ai-dataset-cropper" title="AI Dataset Cropper" description="Batch crop images for LoRA, Stable Diffusion, Flux, and dataset prep." />
              <ToolCard href="/profile-photo-cropper" title="Profile Photo Cropper" description="Crop headshots, passport photos, LinkedIn pictures, and avatars." />
              <ToolCard href="/bulk-crop-images" title="Bulk Crop Images" description="Batch crop many images and download the results as a ZIP file." />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Profile and ID tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ToolCard href="/crop-headshot" title="Headshot Cropper" description="Crop headshots for LinkedIn, resumes, and profile photos." />
              <ToolCard href="/crop-image-to-passport-size" title="Passport Photo Cropper" description="Official passport dimensions for US, UK, EU, India, China, and ID cards." />
              <ToolCard href="/circle-crop-image" title="Circle Crop Image" description="Create round profile pictures, avatars, logos, and transparent PNG circle crops." />
              <ToolCard href="/crop-image-to-1x1" title="Crop Image to 1:1" description="Make a square image at 512, 768, 1024, 1080, or 2000 pixels." />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Supporting tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ToolCard href="/crop-image" title="Crop Image Online" description="Single image cropping with free crop and common aspect ratios." />
              <ToolCard href="/crop-product-images" title="Product Image Cropper" description="Crop product photos for Shopify, Etsy, and Amazon." />
              <ToolCard href="/crop-image-for-instagram" title="Instagram Image Cropper" description="Instagram post, story, reel, and profile presets." />
              <ToolCard href="/crop-image-by-dimensions" title="Custom Size Cropper" description="Crop to any exact pixel width and height you need." />
              <ToolCard href="/social-media-safe-zone" title="Social Media Safe Zone" description="Preview subject placement inside practical platform crop guides." />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">More crop shapes and privacy</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ToolCard href="/smart-crop-image" title="Smart Image Cropper" description="Lock the subject with a click and keep it centered across aspect ratios." />
              <ToolCard href="/oval-crop-image" title="Oval Crop Image" description="Create oval and elliptical profile pictures and shapes." />
              <ToolCard href="/crop-and-resize-image" title="Crop and Resize" description="Crop and resize images to exact output dimensions in one step." />
              <ToolCard href="/crop-image-locally" title="Crop Image Locally" description="Private, browser-based cropping with no upload." />
            </div>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl mb-8">How it works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { step: "1", title: "Upload your image", desc: "Drag, click, or paste an image directly into the browser-based cropper." },
            { step: "2", title: "Set the subject and outputs", desc: "Click the important subject, then choose the platform sizes you need." },
            { step: "3", title: "Download your export pack", desc: "Get every selected PNG, JPG, or WebP crop together in a ZIP." },
          ].map((item) => (
            <div key={item.step}>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Step {item.step}</div>
              <h3 className="font-medium mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center space-y-4">
        <h2 className="text-2xl">Why use ImageCropKit?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
          <div className="p-4 rounded-lg border"><h3 className="font-semibold text-sm mb-1">Private by default</h3><p className="text-xs text-muted-foreground">Images are processed locally in your browser and are not uploaded to our servers.</p></div>
          <div className="p-4 rounded-lg border"><h3 className="font-semibold text-sm mb-1">Fast browser-based cropping</h3><p className="text-xs text-muted-foreground">Crop images instantly without waiting for server uploads or account setup.</p></div>
          <div className="p-4 rounded-lg border"><h3 className="font-semibold text-sm mb-1">Batch-friendly</h3><p className="text-xs text-muted-foreground">Crop multiple images in one workflow and download the results as a ZIP file.</p></div>
          <div className="p-4 rounded-lg border"><h3 className="font-semibold text-sm mb-1">Built for specialist workflows</h3><p className="text-xs text-muted-foreground">Use focused presets for screenshots, AI datasets, passport photos, profile pictures, and exact-size crops.</p></div>
        </div>
      </section>

      <RelatedTools tools={homeRelated} />

      <FAQSection items={faqItems} />
      <StructuredData pageTitle="ImageCropKit" pageUrl="https://imagecropkit.com" faqItems={faqItems} includeBreadcrumb={false} includeOrganization={true} includeWebsite={true} />
    </div>
  );
}
