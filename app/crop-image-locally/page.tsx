import type { Metadata } from "next";
import dynamic from "next/dynamic";
const CropEditor = dynamic(() => import("@/components/CropEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Image Cropper Locally — Private Browser Cropper, No Upload",
  description:
    "Crop images locally in your browser with zero server upload. Technical explanation of how local processing works, privacy verification steps, and when to choose local vs server-based tools.",
  alternates: { canonical: "https://imagecropkit.com/crop-image-locally" },
};

const faqItems = [
  { question: "What does local image cropping mean?", answer: "It means the image is processed inside your browser instead of being uploaded to a remote server." },
  { question: "Are my images stored?", answer: "No. ImageCropKit does not store your images." },
  { question: "Can I verify that my image is not uploaded?", answer: "Yes. Open your browser Developer Tools (F12), go to the Network tab, upload an image, and confirm that no image data is sent to any server." },
  { question: "Can I crop screenshots privately?", answer: "Yes. This page is suitable for cropping screenshots and other private images." },
  { question: "Do I need to install software?", answer: "No. ImageCropKit runs in your browser." },
  { question: "Can I use this on mobile?", answer: "Yes. You can crop images locally on supported mobile browsers." },
];

const related = [
  { title: "Screenshot Cropper", href: "/crop-screenshot", description: "Crop private screenshots without uploading them." },
  { title: "Trim Screenshot", href: "/trim-screenshot", description: "Remove browser chrome, margins, and screenshot whitespace." },
  { title: "Crop Image Online", href: "/crop-image", description: "A simple single-image cropper with common aspect ratios." },
  { title: "Bulk Crop Images", href: "/bulk-crop-images", description: "Batch cropping with shared aspect ratio and ZIP download." },
];

export default function CropImageLocallyPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Image Cropper Locally — No Upload, No Signup</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Crop private images without uploading them. ImageCropKit processes your image locally in your browser. Your files stay on your device.
        </p>
      </div>

      <CropEditor showTrustBadges />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>A private image cropper for your browser</h2>
        <p>
          ImageCropKit is designed for people who want to crop images without sending files to
          a server. When you upload an image, your browser reads the file locally and performs
          the crop on your device.
        </p>
        <p>
          This makes the tool useful for personal photos, work screenshots, private documents,
          profile pictures, and any image you prefer not to upload.
        </p>

        <h2>How local image cropping works</h2>
        <p>
          The image file is opened inside your browser, and the crop is created using
          browser-based image processing. You can adjust the crop area and export the result
          as PNG, JPG, or WebP without creating an account.
        </p>

        <h2>Local processing means no recompression</h2>
        <p>
          Because ImageCropKit processes your image locally in your browser, there is no
          server-side recompression. The Canvas API with imageSmoothingEnabled preserves the
          original image quality. You control the output format and quality slider for JPG and
          WebP exports, so you can crop screenshots and private photos without quality loss.
        </p>

        <h2>What ImageCropKit does not do</h2>
        <p>
          ImageCropKit does not upload your image to a server. It does not require a signup,
          does not add a watermark, and does not store your cropped images.
        </p>

        <h2>How to verify that your image stays local</h2>
        <p>
          You do not need to take our word for it. Open your browser developer tools and check
          for yourself:
        </p>
        <ol>
          <li>Press <kbd>F12</kbd> (or <kbd>Cmd+Option+I</kbd> on Mac) to open Developer Tools.</li>
          <li>Click the <strong>Network</strong> tab.</li>
          <li>Upload an image and adjust the crop.</li>
          <li>Watch the Network tab — no image data is sent to any server.</li>
        </ol>
        <p>
          The only network request you may see is for Google Analytics (if you accepted
          cookies), which does not include your image.
        </p>

        <h2>When to use a no-upload image cropper</h2>
        <p>
          Use this page when privacy is more important than cloud-based editing. It is
          suitable for screenshots, family photos, ID-style images, workplace graphics, and
          other files you want to keep on your own device.
        </p>
        <p>
          For screenshot-specific workflows, use the <a href="/crop-screenshot">screenshot cropper</a>
          to crop private captures or <a href="/trim-screenshot">trim screenshot</a> to remove
          browser chrome, margins, and empty space before sharing.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData pageTitle="Image Cropper Locally — No Upload, No Signup" pageUrl="https://imagecropkit.com/crop-image-locally" faqItems={faqItems} />
    </div>
  );
}
