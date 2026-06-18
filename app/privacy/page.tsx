import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Privacy Policy - ImageCropKit",
  description: "Read the ImageCropKit privacy policy. Learn how images are processed locally in your browser without server uploads.",
  alternates: { canonical: "https://imagecropkit.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 prose prose-neutral dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p>Last updated: June 3, 2026</p>

      <p>
        ImageCropKit is designed to process images locally in your browser. When you use the
        cropper, your image files are opened on your device and are not uploaded to our
        servers.
      </p>

      <StructuredData pageTitle="Privacy Policy" pageUrl="https://imagecropkit.com/privacy" includeWebApp={false} />

      <h2>Local image processing</h2>
      <p>
        ImageCropKit is designed to process images locally in your browser. When you use the
        cropper, your image files are opened on your device and are not uploaded to our
        servers.
      </p>
      <p>The cropping and export happen on your device.</p>

      <h2>No account required</h2>
      <p>
        You do not need to create an account to use the core image cropping tools.
        ImageCropKit is designed to work as a simple browser-based utility.
      </p>

      <h2>Image storage</h2>
      <p>
        ImageCropKit does not store your uploaded images or cropped results. If you refresh
        the page or close the browser tab, the selected image is no longer available in the
        tool.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        ImageCropKit uses Google Analytics only if you accept analytics cookies. Analytics
        helps us understand which pages and tools are used so we can improve the website.
      </p>
      <p>
        The core image cropping tools work in your browser. Your images are not uploaded to
        our servers, and analytics does not include your image files.
      </p>
      <p>
        You can reject analytics cookies and still use all image cropping tools.
      </p>
      <p>
        We may store your analytics consent choice in your browser so we do not need to ask
        again on every visit.
      </p>

      <h2>Related pages</h2>
      <p>
        Read the <Link href="/terms">Terms of Use</Link>, or try the{" "}
        <Link href="/crop-image-locally">Crop Image Locally</Link>,{" "}
        <Link href="/crop-image">Crop Image Online</Link>, or{" "}
        <Link href="/bulk-crop-images">Bulk Crop Images</Link> tools.
      </p>

      <h2>Contact</h2>
      <p>For questions about privacy or the website, contact the site owner at privacy@imagecropkit.com.</p>
    </div>
  );
}
