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
      <p>Last updated: September 23, 2026</p>

      <p>
        ImageCropKit is designed to process images locally in your browser. When you use the
        cropper, your image files are opened on your device and are not uploaded to our
        servers. The cropping and export happen on your device.
      </p>

      <StructuredData pageTitle="Privacy Policy" pageUrl="https://imagecropkit.com/privacy" includeWebApp={false} />

      <h2>Local image processing</h2>
      <p>
        When you use the cropper, your image files are loaded into your browser memory using
        the File API and are processed on a local HTML5 Canvas. Your images are not uploaded
        to our servers at any point.
      </p>

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
        ImageCropKit uses Google Analytics to understand which pages and tools are used so we
        can improve the website.
      </p>
      <p>
        The core image cropping tools work in your browser. Your images are not uploaded to
        our servers, and analytics does not include your image files.
      </p>

      <h2>Advertising (Google AdSense)</h2>
      <p>
        ImageCropKit uses Google AdSense to display ads. Google, as a third-party vendor,
        uses cookies to serve ads on this site.
      </p>
      <p>
        Google&apos;s use of the DART cookie enables it to serve ads based on your visits to
        this site and other sites. You may opt out of the use of the DART cookie by visiting{" "}
        <a href="https://www.google.com/settings/ads">Google&apos;s Ads Settings</a>, and you
        can learn how Google uses data at{" "}
        <a href="https://policies.google.com/technologies/partner-sites">
          How Google uses data
        </a>
        .
      </p>
      <p>
        Third-party vendors and ad networks may also use cookies to serve ads based on your
        prior visits. You can opt out of many vendors&apos; use of cookies for personalized
        advertising through the{" "}
        <a href="https://optout.networkadvertising.org/">
          NAI consumer opt-out page
        </a>
        .
      </p>

      <h2>Contact form</h2>
      <p>
        When you submit the contact form, the information you enter (such as your name,
        email address, and message) is delivered to us through Formspree, our form
        processing provider. We use it only to respond to your inquiry.
      </p>

      <h2>Related pages</h2>
      <p>
        Read the <Link href="/terms">Terms of Use</Link>, or try the{" "}
        <Link href="/crop-image-locally">Crop Image Locally</Link>,{" "}
        <Link href="/crop-image">Crop Image Online</Link>, or{" "}
        <Link href="/bulk-crop-images">Bulk Crop Images</Link> tools.
      </p>

      <h2>Contact</h2>
      <p>
        For questions about privacy or the website, use the{" "}
        <Link href="/contact">contact form</Link> and we will respond.
      </p>
    </div>
  );
}
