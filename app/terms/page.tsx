import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Terms of Use - ImageCropKit",
  description: "Read the terms of use for ImageCropKit, a free browser-based image cropping tool.",
  alternates: { canonical: "https://imagecropkit.com/terms" },
};

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 prose prose-neutral dark:prose-invert">
      <h1>Terms of Use</h1>
      <p>Last updated: June 3, 2026</p>

      <p>
        ImageCropKit provides browser-based image cropping tools. You are responsible for the
        images you choose to open in the browser and the files you export.
      </p>

      <StructuredData pageTitle="Terms of Use" pageUrl="https://imagecropkit.com/terms" includeWebApp={false} />

      <h2>Use of the tool</h2>
      <p>
        ImageCropKit provides browser-based image cropping tools. You are responsible for the
        images you choose to open in the browser and the files you export.
      </p>

      <h2>No guarantee of availability</h2>
      <p>
        ImageCropKit may change, update, or temporarily stop working as the website is
        improved. The tool is provided as a simple online utility.
      </p>

      <h2>User responsibility</h2>
      <p>
        Do not use ImageCropKit to process images you do not have the right to use. You are
        responsible for complying with applicable laws and platform rules when using exported
        images.
      </p>

      <h2>Privacy</h2>
      <p>
        ImageCropKit is designed to process images locally in your browser. Read the{" "}
        <Link href="/privacy">Privacy Policy</Link> for more information.
      </p>

      <h2>Contact</h2>
      <p>For questions about these terms, contact the site owner at support@imagecropkit.com.</p>
    </div>
  );
}
