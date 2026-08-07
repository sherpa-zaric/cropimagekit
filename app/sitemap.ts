import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";

// Update this date when content meaningfully changes. Using a fixed date
// instead of new Date() gives search engines a real modification signal —
// new Date() on every build makes Google ignore the signal entirely.
const LAST_UPDATED = new Date("2026-08-07");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://imagecropkit.com";

  const routes = [
    "/",
    "/crop-image",
    "/smart-crop-image",
    "/social-media-image-pack",
    "/social-media-safe-zone",
    "/youtube-vertical-thumbnail-checker",
    "/crop-screenshot",
    "/trim-screenshot",
    "/ai-dataset-cropper",
    "/profile-photo-cropper",
    "/bulk-crop-images",
    "/crop-image-locally",
    "/crop-image-to-1x1",
    "/crop-product-images",
    "/crop-image-for-instagram",
    "/crop-image-for-tiktok",
    "/crop-headshot",
    "/crop-images-for-lora-training",
    "/circle-crop-image",
    "/crop-image-to-passport-size",
    "/crop-image-by-dimensions",
    "/crop-and-resize-image",
    "/oval-crop-image",
    "/crop-image-to-og-image-1200x630",
    "/twitter-header-resizer",
    "/linkedin-background-photo-resizer",
    "/discord-profile-picture-resizer",
    "/twitch-profile-picture-resizer",
    "/resize-image-to-1080x1080",
    "/resize-image-to-1920x1080",
    "/facebook-cover-photo-resizer",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const blogRoutes = getAllSlugs().map((slug) => `/blog/${slug}`);

  return [...routes, ...blogRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1.0 : 0.8,
  }));
}
