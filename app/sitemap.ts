import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://imagecropkit.com";

  const routes = [
    "/",
    "/crop-image",
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
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const blogRoutes = getAllSlugs().map((slug) => `/blog/${slug}`);

  return [...routes, ...blogRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1.0 : 0.8,
  }));
}
