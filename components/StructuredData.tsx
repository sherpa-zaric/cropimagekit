import type { FAQItem } from "./FAQSection";

export interface HowToStep {
  name: string;
  text: string;
}

interface StructuredDataProps {
  pageTitle: string;
  pageUrl: string;
  faqItems?: FAQItem[];
  howToSteps?: HowToStep[];
  includeBreadcrumb?: boolean;
  includeWebApp?: boolean;
  article?: {
    headline: string;
    datePublished: string;
    dateModified?: string;
    author?: string;
    description?: string;
  };
  includeOrganization?: boolean;
  includeWebsite?: boolean;
}

const siteUrl = "https://imagecropkit.com";
const siteDescription = "ImageCropKit is a browser-based image cropping platform specializing in screenshot cropping, AI dataset cropping, and passport/profile photo cropping.";

export default function StructuredData({
  pageTitle, pageUrl, faqItems, howToSteps,
  includeBreadcrumb = true,
  includeWebApp = true,
  article,
  includeOrganization = false,
  includeWebsite = false,
}: StructuredDataProps) {
  const breadcrumbJson = includeBreadcrumb ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: pageTitle, item: pageUrl },
    ],
  } : null;

  const webAppJson = includeWebApp ? {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ImageCropKit",
    url: pageUrl,
    description: siteDescription,
    applicationCategory: "DesignApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  } : null;

  const hasFAQ = faqItems && faqItems.length > 0;
  const faqJson = hasFAQ
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems!.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  const howToJson = howToSteps && howToSteps.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: pageTitle,
        url: pageUrl,
        step: howToSteps.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step.name,
          text: step.text,
        })),
      }
    : null;

  const articleJson = article
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.headline,
        datePublished: article.datePublished,
        dateModified: article.dateModified || article.datePublished,
        author: { "@type": "Organization", name: article.author || "ImageCropKit" },
        publisher: { "@type": "Organization", name: "ImageCropKit" },
        mainEntityOfPage: pageUrl,
        description: article.description || "",
      }
    : null;

  const organizationJson = includeOrganization
    ? {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "ImageCropKit",
        url: siteUrl,
        description: siteDescription,
        sameAs: ["https://github.com/sherpa-zaric/cropimagekit"],
      }
    : null;

  const websiteJson = includeWebsite
    ? {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "ImageCropKit",
        url: siteUrl,
        description: siteDescription,
        publisher: { "@type": "Organization", name: "ImageCropKit", url: siteUrl },
      }
    : null;

  return (
    <>
      {organizationJson && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJson) }} />}
      {websiteJson && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJson) }} />}
      {breadcrumbJson && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }} />}
      {webAppJson && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJson) }} />}
      {articleJson && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />}
      {howToJson && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJson) }} />}
      {faqJson && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />}
    </>
  );
}
