export type PresetCategory = "basic" | "social" | "product" | "ai" | "headshot" | "circle" | "passport" | "oval";

export interface CropPreset {
  id: string;
  name: string;
  width?: number;
  height?: number;
  aspectRatio: number;
  category: PresetCategory;
  description?: string;
  recommended?: boolean;
}

export const basicPresets: CropPreset[] = [
  { id: "free", name: "Free", aspectRatio: 0, category: "basic" },
  { id: "1:1", name: "1:1", aspectRatio: 1, category: "basic" },
  { id: "4:5", name: "4:5", aspectRatio: 4 / 5, category: "basic" },
  { id: "16:9", name: "16:9", aspectRatio: 16 / 9, category: "basic" },
  { id: "9:16", name: "9:16", aspectRatio: 9 / 16, category: "basic" },
  { id: "3:2", name: "3:2", aspectRatio: 3 / 2, category: "basic" },
  { id: "4:3", name: "4:3", aspectRatio: 4 / 3, category: "basic" },
  { id: "2:3", name: "2:3", aspectRatio: 2 / 3, category: "basic" },
  { id: "21:9", name: "21:9", aspectRatio: 21 / 9, category: "basic" },
];

export const socialPresets: CropPreset[] = [
  { id: "instagram-square", name: "Instagram Square Post", width: 1080, height: 1080, aspectRatio: 1, category: "social", description: "Square feed post" },
  { id: "instagram-portrait", name: "Instagram Portrait Post", width: 1080, height: 1350, aspectRatio: 1080 / 1350, category: "social", description: "Vertical feed post — highest engagement", recommended: true },
  { id: "instagram-story", name: "Instagram Story", width: 1080, height: 1920, aspectRatio: 1080 / 1920, category: "social", description: "Vertical story frame" },
  { id: "instagram-reel", name: "Instagram Reel Cover", width: 1080, height: 1920, aspectRatio: 1080 / 1920, category: "social", description: "Reel thumbnail" },
  { id: "youtube-thumbnail", name: "YouTube Thumbnail", width: 1280, height: 720, aspectRatio: 1280 / 720, category: "social", description: "Video thumbnail" },
  { id: "tiktok-cover", name: "TikTok Cover", width: 1080, height: 1920, aspectRatio: 1080 / 1920, category: "social", description: "Vertical video cover" },
  { id: "tiktok-post", name: "TikTok Post", width: 1080, height: 1920, aspectRatio: 1080 / 1920, category: "social", description: "Photo post 9:16" },
  { id: "linkedin-banner", name: "LinkedIn Banner", width: 1584, height: 396, aspectRatio: 1584 / 396, category: "social", description: "Profile header banner" },
  { id: "facebook-cover", name: "Facebook Cover", width: 1640, height: 924, aspectRatio: 1640 / 924, category: "social", description: "Page cover photo" },
  { id: "twitter-header", name: "X/Twitter Header", width: 1500, height: 500, aspectRatio: 1500 / 500, category: "social", description: "Profile header image" },
  { id: "pinterest-pin", name: "Pinterest Pin", width: 1000, height: 1500, aspectRatio: 1000 / 1500, category: "social", description: "Vertical pin image" },
];

export const productPresets: CropPreset[] = [
  { id: "product-square", name: "Product Square", width: 2000, height: 2000, aspectRatio: 1, category: "product", description: "General ecommerce" },
  { id: "shopify", name: "Shopify", width: 2048, height: 2048, aspectRatio: 1, category: "product", description: "Online store product image" },
  { id: "etsy", name: "Etsy", width: 2000, height: 2000, aspectRatio: 1, category: "product", description: "Listing photo" },
  { id: "amazon", name: "Amazon", width: 2000, height: 2000, aspectRatio: 1, category: "product", description: "Main product image" },
  { id: "web-thumbnail", name: "Web Thumbnail", width: 1000, height: 1000, aspectRatio: 1, category: "product", description: "Small product preview" },
];

export const aiPresets: CropPreset[] = [
  { id: "ai-512", name: "512x512", width: 512, height: 512, aspectRatio: 1, category: "ai", description: "SD 1.5 training size" },
  { id: "ai-768", name: "768x768", width: 768, height: 768, aspectRatio: 1, category: "ai", description: "Mid-resolution dataset" },
  { id: "ai-1024", name: "1024x1024", width: 1024, height: 1024, aspectRatio: 1, category: "ai", description: "SDXL square dataset" },
  { id: "ai-1024x1536", name: "1024x1536", width: 1024, height: 1536, aspectRatio: 1024 / 1536, category: "ai", description: "Portrait dataset" },
  { id: "ai-1536x1024", name: "1536x1024", width: 1536, height: 1024, aspectRatio: 1536 / 1024, category: "ai", description: "Landscape dataset" },
];

export const headshotPresets: CropPreset[] = [
  { id: "headshot-1:1", name: "1:1", aspectRatio: 1, category: "headshot", description: "Profile photo ratio" },
  { id: "headshot-4:5", name: "4:5", aspectRatio: 4 / 5, category: "headshot", description: "Portrait ratio" },
  { id: "headshot-3:4", name: "3:4", aspectRatio: 3 / 4, category: "headshot", description: "ID-style ratio" },
  { id: "headshot-linkedin", name: "LinkedIn Profile", width: 400, height: 400, aspectRatio: 1, category: "headshot", description: "LinkedIn photo size" },
];

export const squareSizePresets: CropPreset[] = [
  { id: "square-512", name: "512x512", width: 512, height: 512, aspectRatio: 1, category: "basic", description: "Small avatar" },
  { id: "square-768", name: "768x768", width: 768, height: 768, aspectRatio: 1, category: "basic", description: "Mid-resolution" },
  { id: "square-1024", name: "1024x1024", width: 1024, height: 1024, aspectRatio: 1, category: "basic", description: "High-resolution" },
  { id: "square-1080", name: "1080x1080", width: 1080, height: 1080, aspectRatio: 1, category: "basic", description: "Social media post" },
  { id: "square-2000", name: "2000x2000", width: 2000, height: 2000, aspectRatio: 1, category: "basic", description: "Ecommerce photo" },
];

export const circlePresets: CropPreset[] = [
  { id: "circle-512", name: "Profile Picture", width: 512, height: 512, aspectRatio: 1, category: "circle", description: "Transparent avatar" },
  { id: "circle-1024", name: "High Resolution Avatar", width: 1024, height: 1024, aspectRatio: 1, category: "circle", description: "Profile and team pages" },
  { id: "circle-1080", name: "Social Avatar", width: 1080, height: 1080, aspectRatio: 1, category: "circle", description: "Social media profile image" },
  { id: "circle-1000", name: "Logo Circle", width: 1000, height: 1000, aspectRatio: 1, category: "circle", description: "Simple brand avatar" },
];

export const passportPresets: CropPreset[] = [
  { id: "passport-us", name: "US Passport", width: 600, height: 600, aspectRatio: 1, category: "passport", description: "2 × 2 inches at 300 DPI" },
  { id: "passport-uk", name: "UK Passport", width: 413, height: 531, aspectRatio: 35 / 45, category: "passport", description: "35 × 45 mm at 300 DPI" },
  { id: "passport-eu", name: "EU / Schengen", width: 413, height: 531, aspectRatio: 35 / 45, category: "passport", description: "35 × 45 mm at 300 DPI" },
  { id: "passport-india", name: "India Passport", width: 413, height: 531, aspectRatio: 35 / 45, category: "passport", description: "35 × 45 mm at 300 DPI" },
  { id: "passport-china", name: "China Passport", width: 390, height: 567, aspectRatio: 33 / 48, category: "passport", description: "33 × 48 mm at 300 DPI" },
  { id: "passport-id-1x1", name: "1 × 1 inch ID", width: 300, height: 300, aspectRatio: 1, category: "passport", description: "1 × 1 inch at 300 DPI" },
];

export const ovalPresets: CropPreset[] = [
  { id: "oval-3:4", name: "Portrait Oval", width: 600, height: 800, aspectRatio: 3 / 4, category: "oval", description: "Vertical oval portrait" },
  { id: "oval-4:5", name: "Tall Oval", width: 640, height: 800, aspectRatio: 4 / 5, category: "oval", description: "Tall oval shape" },
  { id: "oval-1:1", name: "Round Oval", width: 600, height: 600, aspectRatio: 1, category: "oval", description: "Classic round crop" },
];

export const allPresets: CropPreset[] = [
  ...basicPresets,
  ...socialPresets,
  ...productPresets,
  ...aiPresets,
  ...headshotPresets,
  ...circlePresets,
  ...passportPresets,
  ...ovalPresets,
];

export function getPresetsByCategory(category: PresetCategory): CropPreset[] {
  switch (category) {
    case "basic": return basicPresets;
    case "social": return socialPresets;
    case "product": return productPresets;
    case "ai": return aiPresets;
    case "headshot": return headshotPresets;
    case "circle": return circlePresets;
    case "passport": return passportPresets;
    case "oval": return ovalPresets;
  }
}
