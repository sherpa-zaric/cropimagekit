import Link from "next/link";
import dynamic from "next/dynamic";
const CropEditor = dynamic(() => import("@/components/CropEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});
import TrustBadges from "@/components/TrustBadges";
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
  { question: "Can I crop multiple images at once?", answer: "Yes. Use the Bulk Crop Images tool to upload multiple images, apply a shared crop ratio or adjust individual crops, and download all results as a single ZIP file. You can also add a file name prefix for organized exports." },
  { question: "What formats can I export?", answer: "You can export cropped images as PNG, JPG, or WebP. JPG is best for photographs with smaller file sizes. PNG preserves transparency and is ideal for graphics. WebP offers the best compression ratio for web use, producing files 25-35% smaller than JPG." },
  { question: "Do I need to create an account?", answer: "No. You can crop images without signing up, providing an email, or creating a password. Open the tool, upload your image, crop it, and download — the entire process takes under a minute with no account required." },
];

const homeRelated = [
  { title: "Crop Image Online", href: "/crop-image", description: "Crop a single image with free crop or a common aspect ratio." },
  { title: "Bulk Crop Images", href: "/bulk-crop-images", description: "Crop a batch of images and download them as a ZIP." },
  { title: "Crop Image Locally", href: "/crop-image-locally", description: "A private image cropper that runs entirely in your browser." },
  { title: "Crop Image to 1:1", href: "/crop-image-to-1x1", description: "Make a square image at 512, 768, 1024, 1080, or 2000 pixels." },
  { title: "Product Image Cropper", href: "/crop-product-images", description: "Square product photos for Shopify, Etsy, and Amazon." },
  { title: "Instagram Image Cropper", href: "/crop-image-for-instagram", description: "Posts, stories, reels, and profile picture presets." },
  { title: "Headshot Cropper", href: "/crop-headshot", description: "Centered crops for LinkedIn, resumes, and profile photos." },
  { title: "LoRA Image Cropper", href: "/crop-images-for-lora-training", description: "Batch crop training images at common AI dataset sizes." },
  { title: "Circle Crop Image", href: "/circle-crop-image", description: "Crop a round profile picture or avatar with a transparent background." },
  { title: "Passport Photo Cropper", href: "/crop-image-to-passport-size", description: "Crop photos to US, UK, EU, India, and China passport dimensions." },
  { title: "Custom Size Cropper", href: "/crop-image-by-dimensions", description: "Crop an image to any exact width and height in pixels." },
  { title: "Oval Crop Image", href: "/oval-crop-image", description: "Crop an image into an oval or elliptical shape." },
];

export default function Home() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-24 space-y-24">
      <section className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl tracking-tight">
          Free Online Image Cropper &amp; Bulk Crop Tool
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Crop, trim, and cut images online, privately and instantly. Upload one image or crop multiple images at once. ImageCropKit works in your browser, so your images never leave your device.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/crop-image" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-6 text-sm font-medium hover:opacity-90 transition-opacity">
            Upload Image
          </Link>
          <Link href="/bulk-crop-images" className="inline-flex items-center justify-center rounded-md border border-border h-10 px-6 text-sm font-medium hover:bg-muted transition-colors">
            Bulk Crop Images
          </Link>
        </div>
      </section>

      <section>
        <CropEditor />
        <div className="mt-4"><TrustBadges /></div>
      </section>

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-center">Crop images online without uploading them</h2>
        <p>
          ImageCropKit is a free browser-based image cropper for everyday image editing tasks.
          You can upload an image, choose a crop area, select a common aspect ratio, and
          download the cropped result as PNG, JPG, or WebP.
        </p>
        <p>
          Your images are processed locally in your browser. That means your files are not
          uploaded to a server, and you can crop private photos, screenshots, product images,
          circle profile pictures, or social media graphics without creating an account.
        </p>
      </section>

      <section>
        <h2 className="text-2xl text-center mb-4">One cropper for different image workflows</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Use ImageCropKit for simple image cropping, batch cropping, square crops, circle profile pictures, product photos, Instagram images, headshots, and AI dataset preparation.
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Popular tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ToolCard href="/crop-image" title="Crop Image Online" description="Single image cropping with free crop and common aspect ratios." />
              <ToolCard href="/bulk-crop-images" title="Bulk Crop Images" description="Batch cropping with shared aspect ratio and ZIP download." />
              <ToolCard href="/crop-image-to-1x1" title="Crop Image to 1:1" description="Make a square image with the 1:1 cropper." />
              <ToolCard href="/circle-crop-image" title="Circle Crop Image" description="Create round profile pictures, avatars, logos, and transparent PNG circle crops." />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Use-case tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ToolCard href="/crop-product-images" title="Product Image Cropper" description="Crop product photos for Shopify, Etsy, and Amazon." />
              <ToolCard href="/crop-image-for-instagram" title="Instagram Image Cropper" description="Instagram post, story, reel, and profile presets." />
              <ToolCard href="/crop-headshot" title="Headshot Cropper" description="Crop headshots for LinkedIn, resumes, and profile photos." />
              <ToolCard href="/crop-images-for-lora-training" title="LoRA Image Cropper" description="Batch crop images for AI datasets and LoRA training." />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">New tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ToolCard href="/crop-image-to-passport-size" title="Passport Photo Cropper" description="Official passport dimensions for US, UK, EU, India, China, and ID cards." />
              <ToolCard href="/crop-image-by-dimensions" title="Custom Size Cropper" description="Crop to any exact pixel width and height you need." />
              <ToolCard href="/oval-crop-image" title="Oval Crop Image" description="Create oval and elliptical profile pictures and shapes." />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Privacy</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            { step: "2", title: "Choose a crop area", desc: "Use free crop, a common aspect ratio, or a page-specific preset." },
            { step: "3", title: "Download your cropped image", desc: "Export the result as PNG, JPG, or WebP. Bulk tools can download a ZIP file." },
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
          <div className="p-4 rounded-lg border"><h3 className="font-semibold text-sm mb-1">Built for real use cases</h3><p className="text-xs text-muted-foreground">Use presets for social media, ecommerce, headshots, square crops, and AI datasets.</p></div>
        </div>
      </section>

      <RelatedTools tools={homeRelated} />

      <FAQSection items={faqItems} />
      <StructuredData pageTitle="Free Online Image Cropper & Bulk Crop Tool" pageUrl="https://imagecropkit.com" faqItems={faqItems} includeBreadcrumb={false} includeOrganization={true} />
    </div>
  );
}
