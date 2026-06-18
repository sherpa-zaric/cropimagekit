import type { Metadata } from "next";
import { SITE_URL } from "@/lib/siteConfig";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "About ImageCropKit",
  description:
    "ImageCropKit is a free browser-based image cropper. All processing happens locally in your browser — no upload, no signup, no watermark.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 space-y-12">
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h1>About ImageCropKit</h1>

        <p>
          ImageCropKit is a free, browser-based image cropper built for people who need to crop,
          resize, and export images without installing software or uploading files to a server.
        </p>

        <h2>Why it exists</h2>
        <p>
          Most online image croppers require an account, upload your photos to a remote server, or
          add a watermark to the result. For casual users this is fine. For photographers, ecommerce
          sellers, and anyone handling sensitive images, it is not.
        </p>
        <p>
          ImageCropKit processes every image entirely in your browser using the Canvas API. Your
          files never leave your device. There is no server, no database, and no storage. Close the
          tab and the image data is gone.
        </p>

        <h2>What it does</h2>
        <ul>
          <li><strong>Single image cropping</strong> — free crop, aspect ratio presets, and exact pixel dimensions</li>
          <li><strong>Bulk cropping</strong> — upload multiple images, apply a shared crop, download as ZIP</li>
          <li><strong>Platform presets</strong> — Instagram, TikTok, YouTube, Shopify, Amazon, Etsy, LinkedIn, passport photos</li>
          <li><strong>Shape cropping</strong> — circle and oval crops for profile pictures and avatars</li>
          <li><strong>AI dataset preparation</strong> — batch crop to SD 1.5 (512×512), SDXL (1024×1024), and custom training sizes</li>
          <li><strong>Export formats</strong> — PNG, JPG, and WebP with quality control</li>
        </ul>

        <h2>Who it is for</h2>
        <ul>
          <li>Ecommerce sellers who need consistent product photos across multiple marketplaces</li>
          <li>Social media creators who crop the same image for different platform dimensions</li>
          <li>Photographers who need quick browser-based cropping without opening Photoshop</li>
          <li>AI practitioners who need consistently sized training datasets</li>
          <li>Anyone who values privacy and does not want their images uploaded to a server</li>
        </ul>

        <h2>How it works</h2>
        <p>
          When you upload an image, it is loaded into your browser memory using the File API.
          The crop editor renders on an HTML5 Canvas element. When you download, the Canvas API
          draws the cropped region at your target dimensions and exports via <code>canvas.toBlob()</code>.
          No network requests are made during processing.
        </p>

        <h2>Contact</h2>
        <p>
          For questions, feedback, or bug reports, visit our{" "}
          <a href="/contact">contact page</a>.
        </p>
      </article>

      <StructuredData
        pageTitle="About ImageCropKit"
        pageUrl={`${SITE_URL}/about`}
        includeWebApp={false}
        includeOrganization={true}
      />
    </div>
  );
}
