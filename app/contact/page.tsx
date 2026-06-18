import type { Metadata } from "next";
import { SITE_URL } from "@/lib/siteConfig";
import StructuredData from "@/components/StructuredData";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact ImageCropKit",
  description:
    "Get in touch with the ImageCropKit team. Report bugs, request features, or ask questions about the free online image cropper.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 space-y-12">
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h1>Contact Us</h1>
        <p>
          Have a question, bug report, or feature request? Fill out the form below
          and we will get back to you.
        </p>
      </article>

      <ContactForm />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Other ways to reach us</h2>
        <ul>
          <li>
            <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/sherpa-zaric/cropimagekit/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open an issue
            </a>
          </li>
        </ul>
      </section>

      <StructuredData
        pageTitle="Contact ImageCropKit"
        pageUrl={`${SITE_URL}/contact`}
        includeWebApp={false}
      />
    </div>
  );
}
