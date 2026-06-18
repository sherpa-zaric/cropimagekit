import type { Metadata } from "next";
import dynamic from "next/dynamic";
const CropEditor = dynamic(() => import("@/components/CropEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Crop Image Online Free — No Upload",
  description:
    "Crop images online free without uploading to a server. 100% browser-based, no signup, no watermark. Choose a crop area or aspect ratio and download as PNG, JPG, or WebP.",
  alternates: { canonical: "https://imagecropkit.com/crop-image" },
};

const faqItems = [
  { question: "How do I crop an image online?", answer: "Upload your image, adjust the crop area, choose an export format, and download the result." },
  { question: "Can I crop an image to a specific ratio?", answer: "Yes. You can choose common aspect ratios such as 1:1, 4:5, 16:9, and 9:16." },
  { question: "Does cropping reduce image quality?", answer: "No. ImageCropKit uses the browser Canvas API to draw your original image pixels into the crop area. No compression or re-encoding happens until you choose to export, and you control the output format and quality slider." },
  { question: "Does ImageCropKit add a watermark?", answer: "No. Cropped images are downloaded without a watermark." },
  { question: "Are my images uploaded?", answer: "No. Cropping happens locally in your browser." },
  { question: "Can I use this on mobile?", answer: "Yes. The cropper is designed to work on desktop and mobile browsers." },
];

const related = [
  { title: "Bulk Crop Images", href: "/bulk-crop-images", description: "Crop a batch of images with a shared aspect ratio and download a ZIP." },
  { title: "Crop and Resize Image", href: "/crop-and-resize-image", description: "Crop and resize to exact pixel dimensions in one step." },
  { title: "Crop Image to 1:1", href: "/crop-image-to-1x1", description: "Make a square image at 512, 768, 1024, 1080, or 2000 pixels." },
  { title: "Instagram Image Cropper", href: "/crop-image-for-instagram", description: "Posts, stories, reels, and profile picture presets." },
];

export default function CropImagePage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-24 space-y-24">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl tracking-tight">Crop Image Online</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Crop an image online for free. Upload your image, adjust the crop area, choose a common aspect ratio if needed, and download the result as PNG, JPG, or WebP.
        </p>
      </div>

      <CropEditor showTrustBadges />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Free online image cropper</h2>
        <p>
          ImageCropKit is a free image cropper that runs directly in your browser. You can
          crop photos, screenshots, graphics, product images, and social media images without
          signing up or uploading your files to a server.
        </p>
        <p>
          Use free crop when you want full control, or choose a common aspect ratio such as
          1:1, 4:5, 16:9, or 9:16 when you need a consistent frame.
        </p>

        <h2>How to crop an image online</h2>
        <ol>
          <li>Upload your image by dragging, clicking, or pasting from the clipboard.</li>
          <li>Choose a free crop area or select a common aspect ratio.</li>
          <li>Adjust the crop region until the image is framed correctly.</li>
          <li>Choose PNG, JPG, or WebP and download the cropped image.</li>
        </ol>

        <h2>Supported crop ratios and formats</h2>
        <p>
          ImageCropKit supports common crop ratios including 1:1, 4:5, 16:9, 9:16, 3:2, 4:3,
          2:3, and 21:9. You can export cropped images as PNG, JPG, or WebP.
        </p>
        <p>
          <strong>JPG</strong> works best for photographs where file size matters. It uses lossy
          compression, so each save cycle applies a new round of compression. Export once at
          quality 85-90 for the best balance between size and visual quality.
        </p>
        <p>
          <strong>PNG</strong> preserves transparency and is ideal for graphics, screenshots, and
          images with text. PNG files are larger than JPG but lossless — no quality is lost during
          export.
        </p>
        <p>
          <strong>WebP</strong> offers the best compression ratio for web use, producing files
          25-35% smaller than JPG at equivalent visual quality. All modern browsers support WebP.
        </p>

        <h2>When to use free crop vs aspect ratio</h2>
        <p>
          <strong>Free crop</strong> gives you complete control over the crop box. Drag the corners
          to any size, reposition anywhere. Use this when the standard ratios do not match your
          target — for example, cropping a banner to an unusual dimension or trimming whitespace
          from a screenshot.
        </p>
        <p>
          <strong>Aspect ratio crop</strong> locks the crop box to a fixed ratio. This is faster
          when you know the target format: 1:1 for Instagram square posts, 4:5 for portrait posts,
          16:9 for YouTube thumbnails, 9:16 for Stories and Reels. The locked ratio prevents
          accidental distortion.
        </p>

        <h2>Crop images for specific use cases</h2>
        <p>
          <strong>Social media:</strong> Instagram posts work best at 1080 &times; 1080 (1:1) or
          1080 &times; 1350 (4:5). TikTok and Reels need 1080 &times; 1920 (9:16). YouTube
          thumbnails are 1280 &times; 720 (16:9). Use the
          {" "}<a href="/crop-image-for-instagram">Instagram cropper</a> or
          {" "}<a href="/crop-image-for-tiktok">TikTok cropper</a> for platform-specific presets.
        </p>
        <p>
          <strong>Ecommerce:</strong> Shopify requires 2048 &times; 2048 product photos. Amazon
          wants 2000 &times; 2000 with the product filling 85% of the frame. Etsy recommends
          2700 &times; 2025 at 4:3. See the
          {" "}<a href="/crop-product-images">product image cropper</a> for marketplace presets.
        </p>
        <p>
          <strong>Headshots and profile pictures:</strong> LinkedIn recommends 400 &times; 400
          minimum. Passport photos have strict dimension requirements by country. Use the
          {" "}<a href="/crop-headshot">headshot cropper</a> or
          {" "}<a href="/crop-image-to-passport-size">passport photo cropper</a> for exact sizing.
        </p>
        <p>
          <strong>AI training datasets:</strong> Stable Diffusion 1.5 uses 512 &times; 512.
          SDXL uses 1024 &times; 1024. Consistent input dimensions improve training results.
          See the
          {" "}<a href="/crop-images-for-lora-training">LoRA training cropper</a> for common AI
          dataset sizes.
        </p>

        <h2>Crop images without losing quality</h2>
        <p>
          ImageCropKit uses the browser Canvas API with imageSmoothingEnabled and precise pixel
          mapping to preserve image quality during cropping. Because processing happens locally,
          there is no server-side recompression. You control the output format and quality slider
          for JPG and WebP exports, so you can balance file size and visual fidelity.
        </p>
        <p>
          Cropping itself does not reduce quality — it removes pixels from the edges, but the
          remaining pixels stay exactly as they were in the original. Quality loss only happens if
          you re-encode the image multiple times. ImageCropKit exports in a single pass, so there
          is no intermediate save step that could introduce additional compression.
        </p>

        <h2>Crop images on mobile</h2>
        <p>
          The cropper works on mobile browsers including Safari (iOS) and Chrome (Android). Upload
          by tapping the upload area or pasting from your clipboard. Drag the crop handles with
          your finger. The live preview updates in real time so you can see exactly what the
          final image will look like before downloading.
        </p>

        <h2>Crop images privately</h2>
        <p>
          Your image is processed locally in your browser. ImageCropKit does not upload your
          image to a server, does not require an account, and does not add a watermark. Close the
          tab and the image data is gone — nothing is stored anywhere.
        </p>
        <p>
          This matters for passport photos (government ID images), unreleased product photos,
          internal screenshots, medical images, and any other content you do not want on a
          third-party server.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData pageTitle="Crop Image Online" pageUrl="https://imagecropkit.com/crop-image" faqItems={faqItems} />
    </div>
  );
}
