import Link from "next/link";
import { SITE_NAME } from "@/lib/siteConfig";
import BrandWordmark from "@/components/BrandWordmark";

const toolLinks = [
  { href: "/crop-screenshot", label: "Screenshot Cropper" },
  { href: "/ai-dataset-cropper", label: "AI Dataset Cropper" },
  { href: "/profile-photo-cropper", label: "Profile Photo Cropper" },
  { href: "/crop-image", label: "Crop Image" },
  { href: "/social-media-image-pack", label: "Social Media Image Pack" },
  { href: "/social-media-safe-zone", label: "Social Media Safe Zone Checker" },
  { href: "/youtube-vertical-thumbnail-checker", label: "YouTube Thumbnail Checker" },
  { href: "/bulk-crop-images", label: "Bulk Crop Images" },
  { href: "/crop-image-locally", label: "Crop Image Locally" },
  { href: "/crop-image-to-1x1", label: "Crop Image to 1:1" },
  { href: "/crop-product-images", label: "Product Image Cropper" },
  { href: "/crop-image-for-instagram", label: "Instagram Image Cropper" },
  { href: "/crop-image-for-tiktok", label: "TikTok Image Cropper" },
  { href: "/crop-headshot", label: "Headshot Cropper" },
  { href: "/crop-images-for-lora-training", label: "LoRA Image Cropper" },
  { href: "/circle-crop-image", label: "Circle Crop Image" },
  { href: "/crop-image-to-passport-size", label: "Passport Photo Cropper" },
  { href: "/crop-image-by-dimensions", label: "Custom Size Cropper" },
  { href: "/oval-crop-image", label: "Oval Crop Image" },
];

const companyLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-3 gap-12">
        <div>
          <Link href="/" className="inline-flex items-center">
            <BrandWordmark className="text-xl" />
          </Link>
          <p className="text-sm text-muted-foreground mt-2">
            Browser-based image cropping for screenshots, AI datasets, and profile photos.
            <br />
            No upload, no signup, no watermark.
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Tools</h3>
          <ul className="space-y-2">
            {toolLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Company</h3>
          <ul className="space-y-2">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t py-6 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {SITE_NAME}. All images are processed locally in your browser.
      </div>
    </footer>
  );
}
