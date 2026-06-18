很好。下一步就是把 **imagecropkit.com** 定位成一个主站，而不是单一小工具页。

下面这份可以直接丢给编程工具使用。你可以把它作为第一版开发需求文档，让 Codex / Claude Code / Cursor 按这个实现。

---

# ImageCropKit.com 开发需求文档 v1

## 1. 项目定位

网站名称：**ImageCropKit**
域名：**imagecropkit.com**

核心定位：

> A fast, private, browser-based image cropper for single images, bulk image cropping, product photos, social media images, headshots, and AI datasets.

中文理解：

> 一个快速、隐私优先、浏览器本地处理的图片裁剪工具站，支持单图裁剪、批量裁剪、商品图、社媒图、头像和 AI 数据集裁剪。

核心卖点：

* Free online image cropper
* 100% browser-based processing
* No upload to server
* No signup
* No watermark
* Single image crop
* Bulk image crop
* ZIP download
* Social media presets
* Product photo presets
* Headshot crop presets
* AI dataset crop presets

SEO 策略遵循：一个主站，多页面承接不同搜索意图。不要做重复页面，不要关键词堆砌。Google 明确把大规模生成低价值页面以操纵排名列为 spam 风险，所以每个页面必须有真实不同的功能入口和内容价值。([Google for Developers][1])

---

# 2. 技术栈建议

建议使用：

```text
Next.js 15+
React
TypeScript
Tailwind CSS
shadcn/ui
browser Canvas API
JSZip
file-saver
sharp optional, server side only if needed later
```

第一版必须尽量前端本地完成，不依赖服务器处理图片。

核心原则：

```text
All image processing must happen in the browser.
Images should not be uploaded to any backend server.
```

---

# 3. 网站整体结构

第一阶段先做 8 个页面。

```text
/
 /crop-image/
 /bulk-crop-images/
 /crop-image-locally/
 /crop-image-to-1x1/
 /crop-product-images/
 /crop-image-for-instagram/
 /crop-headshot/
 /crop-images-for-lora-training/
 /privacy/
 /terms/
```

所有工具页面共享同一个 Crop Editor 组件，但根据页面不同，默认参数不同。

---

# 4. 全站核心组件

## 4.1 Header

顶部导航：

```text
Logo: ImageCropKit

Nav:
- Crop Image
- Bulk Crop
- Product Photos
- Instagram Crop
- Headshot Crop
- AI Dataset Crop
```

右侧按钮：

```text
Start Cropping
```

---

## 4.2 Footer

Footer 内容：

```text
ImageCropKit

Tools:
- Crop Image
- Bulk Crop Images
- Crop Image Locally
- Crop Image to 1:1
- Product Image Cropper
- Instagram Image Cropper
- Headshot Cropper
- LoRA Image Cropper

Company:
- Privacy
- Terms
```

Footer 要给所有核心页面做内链。Google 的链接最佳实践强调，清晰可抓取的链接和描述性锚文本有助于 Google 发现页面并理解页面相关性。([Google for Developers][2])

---

# 5. 核心工具功能

## 5.1 上传图片

支持格式：

```text
JPG
JPEG
PNG
WEBP
AVIF
GIF first frame only, optional
HEIC optional later
```

上传方式：

```text
Drag and drop
Click to upload
Paste image from clipboard
Multiple file upload for bulk pages
```

上传后不发送到服务器。

页面上必须显示：

```text
Your images are processed locally in your browser. They are never uploaded to our servers.
```

---

## 5.2 单图裁剪功能

必须支持：

```text
Free crop
Fixed aspect ratio crop
Exact pixel size crop
Rotate left
Rotate right
Flip horizontal
Flip vertical
Zoom
Move image
Reset
Download cropped image
```

导出格式：

```text
PNG
JPG
WEBP
```

导出设置：

```text
Output format
Quality slider for JPG/WebP
Output width
Output height
Keep original format option
```

---

## 5.3 批量裁剪功能

用于 `/bulk-crop-images/`

必须支持：

```text
Upload multiple images
Apply same aspect ratio to all images
Apply same crop position to all images
Individually adjust each image
Preview grid
Batch export
Download all as ZIP
```

批量模式：

```text
Same crop for all
Same aspect ratio, auto center
Smart center crop, optional v2
Exact size crop
```

---

## 5.4 预设比例

全站通用：

```text
Free
1:1
4:5
16:9
9:16
3:2
4:3
2:3
21:9
```

社媒预设：

```text
Instagram Square Post: 1080x1080
Instagram Portrait Post: 1080x1350
Instagram Story: 1080x1920
Instagram Reel Cover: 1080x1920
YouTube Thumbnail: 1280x720
TikTok Cover: 1080x1920
LinkedIn Banner: 1584x396
Facebook Cover: 1640x924
X/Twitter Header: 1500x500
Pinterest Pin: 1000x1500
```

电商预设：

```text
Product Square: 2000x2000
Shopify Product Image: 2048x2048
Etsy Listing Photo: 2000x2000
Amazon Main Image: 2000x2000
```

AI 数据集预设：

```text
512x512
768x768
1024x1024
1024x1536
1536x1024
```

---

# 6. 页面级 SEO 与功能要求

## 6.1 首页 `/`

### SEO

Title：

```text
ImageCropKit - Free Online Image Cropper & Bulk Crop Tool
```

Meta description：

```text
Crop images online for free with ImageCropKit. Crop single images or bulk crop multiple images locally in your browser. No upload, no signup, no watermark.
```

H1：

```text
Free Online Image Cropper & Bulk Crop Tool
```

首页主关键词：

```text
image cropper
crop image
bulk crop images
online image cropper
private image cropper
```

Google 会从标题、主标题和页面内容等多个信号生成搜索结果标题，因此每个页面都要有清晰唯一的 H1 和 title。([Google for Developers][3])

### 首页结构

```text
Hero section
- H1
- Subtitle
- Upload box
- Primary CTA: Upload Image
- Secondary CTA: Bulk Crop Images

Trust badges
- No upload
- No signup
- No watermark
- Works in browser
- Download as PNG/JPG/WebP

Tool cards
- Crop Image
- Bulk Crop Images
- Crop Image Locally
- Crop Product Images
- Crop Image for Instagram
- Crop Headshot
- Crop Images for LoRA Training

How it works
1. Upload your image
2. Choose crop size or aspect ratio
3. Download your cropped image

Why ImageCropKit
- Private by default
- Fast browser-based crop
- Batch-friendly
- Built for creators, sellers, and AI users

FAQ
```

首页不要堆太多长尾词。首页负责品牌和核心入口，长尾词交给独立页面。

---

## 6.2 `/crop-image/`

### 目标

基础单图裁剪页，承接最核心关键词。

### SEO

Title：

```text
Crop Image Online for Free - No Signup, No Watermark
```

Meta description：

```text
Crop an image online for free. Choose any aspect ratio, resize your crop, and download as JPG, PNG, or WebP. No signup, no watermark.
```

H1：

```text
Crop Image Online
```

主关键词：

```text
crop image
crop image online
image cropper
photo cropper
crop photo online
```

### 默认功能

```text
Single image upload
Free crop selected by default
Aspect ratio selector visible
Download button visible
```

### 页面内容区块

```text
What is ImageCropKit image cropper?
How to crop an image online
Supported crop ratios
Supported image formats
FAQ
```

FAQ：

```text
Is this image cropper free?
Will my image be uploaded?
Can I crop an image to a specific size?
Can I download as JPG or PNG?
Can I crop images on mobile?
```

---

## 6.3 `/bulk-crop-images/`

### 目标

这是最重要的差异化页面。

### SEO

Title：

```text
Bulk Crop Images Online - Batch Crop Multiple Images
```

Meta description：

```text
Bulk crop images online in your browser. Crop multiple images to the same size, same aspect ratio, or same position and download all as a ZIP file.
```

H1：

```text
Bulk Crop Images Online
```

主关键词：

```text
bulk crop images
batch crop images
crop multiple images
crop images to same size
crop images to same aspect ratio
```

### 默认功能

```text
Multiple image upload enabled
Batch mode selected
Default crop mode: Same aspect ratio
ZIP download enabled
Preview grid visible
```

### 页面内容区块

```text
Batch crop multiple images at once
Crop all images to the same size
Crop images to the same aspect ratio
Download cropped images as ZIP
Best for product photos, social media, headshots, and AI datasets
FAQ
```

FAQ：

```text
Can I crop multiple images at once?
Can I crop all images to 1:1?
Can I download all cropped images as a ZIP?
Are my images uploaded?
Is there a file limit?
```

---

## 6.4 `/crop-image-locally/`

### 目标

承接隐私、本地处理、不上传图片的搜索意图。

### SEO

Title：

```text
Crop Image Locally in Your Browser - No Upload
```

Meta description：

```text
Crop images locally in your browser without uploading them to a server. A private image cropper with no signup, no watermark, and no tracking.
```

H1：

```text
Crop Images Locally in Your Browser
```

主关键词：

```text
crop image locally
crop image without uploading
private image cropper
browser based image cropper
no upload image cropper
```

### 默认功能

```text
Single image upload
Privacy message above uploader
No server upload explanation
```

### 页面内容区块

```text
Private image cropping
How local browser image cropping works
When to use a no-upload image cropper
Crop screenshots, ID photos, family photos, and work images privately
FAQ
```

### 页面重点文案

必须明显显示：

```text
Your images never leave your device.
ImageCropKit processes your images in your browser using local browser APIs.
```

---

## 6.5 `/crop-image-to-1x1/`

### SEO

Title：

```text
Crop Image to 1:1 Online - Make a Square Image
```

Meta description：

```text
Crop any image to a perfect 1:1 square online. Make square images for profile photos, product images, social posts, and AI datasets.
```

H1：

```text
Crop Image to 1:1
```

主关键词：

```text
crop image to 1x1
make image square
square image cropper
crop image to square
1:1 image cropper
```

### 默认功能

```text
Aspect ratio locked to 1:1
Output size options:
- 512x512
- 768x768
- 1024x1024
- 1080x1080
- 2000x2000
```

### 页面内容区块

```text
Make any image square
Best uses for 1:1 images
Profile photo crop
Product image crop
AI dataset crop
FAQ
```

---

## 6.6 `/crop-product-images/`

### SEO

Title：

```text
Product Image Cropper - Crop Product Photos for Ecommerce
```

Meta description：

```text
Crop product images online for Shopify, Etsy, Amazon, and online stores. Make square product photos with consistent framing and clean margins.
```

H1：

```text
Product Image Cropper
```

主关键词：

```text
product image cropper
crop product images
crop ecommerce product photos
crop Shopify product images
crop Etsy listing photos
```

### 默认功能

```text
Aspect ratio: 1:1
Output size: 2000x2000
Optional margin setting
Background color option:
- transparent
- white
- original
```

### 页面内容区块

```text
Crop product photos for online stores
Make product images square
Keep product photos consistent
Shopify, Etsy, Amazon, and marketplace presets
FAQ
```

### 重要功能

第一版可以做手动居中。
第二版做：

```text
Auto product center crop
Background remover integration
Add white margin
```

---

## 6.7 `/crop-image-for-instagram/`

### SEO

Title：

```text
Crop Image for Instagram - Posts, Stories, Reels & Profile
```

Meta description：

```text
Crop images for Instagram posts, stories, reels, and profile pictures. Choose Instagram square, portrait, story, reel cover, and profile photo presets.
```

H1：

```text
Crop Image for Instagram
```

主关键词：

```text
crop image for Instagram
Instagram image cropper
crop photo for Instagram
Instagram post size cropper
Instagram story cropper
```

### 默认功能

Preset tabs：

```text
Square Post 1080x1080
Portrait Post 1080x1350
Story 1080x1920
Reel Cover 1080x1920
Profile Picture 320x320
```

### 页面内容区块

```text
Crop images for Instagram posts
Crop images for Instagram Stories
Crop images for Instagram Reels
Crop Instagram profile pictures
FAQ
```

---

## 6.8 `/crop-headshot/`

### SEO

Title：

```text
Headshot Cropper - Crop Profile Photos and Headshots Online
```

Meta description：

```text
Crop headshots and profile photos online. Make clean, centered headshots for resumes, LinkedIn, ID photos, profile pictures, and team pages.
```

H1：

```text
Headshot Cropper
```

主关键词：

```text
headshot cropper
crop headshot
profile photo cropper
crop profile picture
crop photo for LinkedIn
```

### 默认功能

```text
Aspect ratio options:
- 1:1
- 4:5
- 3:4
- LinkedIn profile
- Resume headshot
```

### V2 智能功能

```text
Face detection
Auto center face
Keep shoulders visible
```

---

## 6.9 `/crop-images-for-lora-training/`

### SEO

Title：

```text
Crop Images for LoRA Training - AI Dataset Image Cropper
```

Meta description：

```text
Crop images for LoRA training and AI datasets. Batch crop images to 512x512, 768x768, or 1024x1024 locally in your browser.
```

H1：

```text
Crop Images for LoRA Training
```

主关键词：

```text
crop images for LoRA training
AI dataset image cropper
crop images to 512x512
crop images to 1024x1024
Stable Diffusion image cropper
```

### 默认功能

```text
Bulk upload enabled
Default presets:
- 512x512
- 768x768
- 1024x1024
- 1024x1536
- 1536x1024

ZIP download enabled
Keep filename option
```

### 页面内容区块

```text
Prepare images for AI training datasets
Crop images to common LoRA sizes
Batch crop images locally
Keep filenames and export ZIP
FAQ
```

---

# 7. Structured Data 要求

每个页面添加：

```text
BreadcrumbList
WebApplication
FAQPage, only if visible FAQ exists on the page
```

Google 官方说明，结构化数据应参考 Google Search Central 文档，而不是只按 schema.org 自己想当然实现。([Google for Developers][4]) BreadcrumbList 可帮助 Google 理解页面在网站结构中的位置。([Google for Developers][5]) FAQPage 结构化数据只有在页面真实展示 FAQ 内容时才使用，而且 Google 不保证一定显示富结果。([Google for Developers][6])

示例 JSON-LD：

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "ImageCropKit",
  "url": "https://imagecropkit.com/crop-image/",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

Breadcrumb 示例：

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://imagecropkit.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Crop Image",
      "item": "https://imagecropkit.com/crop-image/"
    }
  ]
}
```

---

# 8. SEO 技术要求

## 8.1 Sitemap

生成：

```text
/sitemap.xml
```

包含所有正式页面。

## 8.2 Robots

生成：

```text
/robots.txt
```

内容：

```text
User-agent: *
Allow: /

Sitemap: https://imagecropkit.com/sitemap.xml
```

## 8.3 Canonical

每个页面都要有 canonical。

例如：

```html
<link rel="canonical" href="https://imagecropkit.com/crop-image/" />
```

对于相似页面，必须避免重复内容问题。Google 对重复或高度相似 URL 建议使用 canonical 来明确主版本。([Google for Developers][7])

## 8.4 Open Graph

每个页面添加：

```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:url" content="..." />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://imagecropkit.com/og-image.png" />
```

## 8.5 Twitter Card

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="https://imagecropkit.com/og-image.png" />
```

---

# 9. 性能要求

图片工具站必须快。

目标：

```text
LCP < 2.5s
INP < 200ms
CLS < 0.1
```

这些是 Core Web Vitals 的核心用户体验指标。([web.dev][8]) Google 也建议站点尽量取得良好的 Core Web Vitals 表现。([Google for Developers][9])

要求：

```text
Do not lazy-load the hero upload area.
Do not lazy-load LCP image.
Lazy-load below-the-fold images only.
Use dynamic import for heavy crop editor if necessary.
Use web workers for heavy batch operations.
Avoid layout shift when preview images load.
```

web.dev 明确提醒，LCP 图片不要使用 `loading="lazy"`，可用 `fetchpriority="high"` 提高优先级。([web.dev][10]) 浏览器原生 lazy loading 适合用于视口外图片。([web.dev][11])

---

# 10. UI 文案

全站统一英文文案。

## 通用 Hero 文案

```text
Crop images online, privately and instantly.

Upload one image or crop hundreds at once. ImageCropKit works in your browser, so your images never leave your device.
```

按钮：

```text
Upload Image
Bulk Crop Images
```

信任标签：

```text
No upload
No signup
No watermark
Browser-based
ZIP download
```

---

# 11. 开发模块拆分

建议目录：

```text
/app
  /page.tsx
  /crop-image/page.tsx
  /bulk-crop-images/page.tsx
  /crop-image-locally/page.tsx
  /crop-image-to-1x1/page.tsx
  /crop-product-images/page.tsx
  /crop-image-for-instagram/page.tsx
  /crop-headshot/page.tsx
  /crop-images-for-lora-training/page.tsx
  /privacy/page.tsx
  /terms/page.tsx

/components
  Header.tsx
  Footer.tsx
  SeoJsonLd.tsx
  CropEditor.tsx
  BulkCropEditor.tsx
  UploadDropzone.tsx
  AspectRatioPicker.tsx
  PresetPicker.tsx
  ExportPanel.tsx
  FAQSection.tsx
  ToolCard.tsx
  TrustBadges.tsx

/lib
  cropImage.ts
  exportImage.ts
  zipImages.ts
  imageUtils.ts
  seo.ts
  presets.ts
```

---

# 12. CropEditor 基础状态设计

```ts
type CropMode = "free" | "aspect-ratio" | "exact-size";

type ExportFormat = "png" | "jpg" | "webp";

type CropPreset = {
  id: string;
  name: string;
  width?: number;
  height?: number;
  aspectRatio: number;
  category: "basic" | "social" | "product" | "ai" | "headshot";
};

type CropState = {
  imageFile: File | null;
  imageUrl: string | null;
  cropMode: CropMode;
  aspectRatio: number | null;
  outputWidth?: number;
  outputHeight?: number;
  rotation: number;
  flipX: boolean;
  flipY: boolean;
  zoom: number;
  exportFormat: ExportFormat;
  quality: number;
};
```

---

# 13. 第一版必须完成的验收标准

## 功能验收

```text
用户可以上传单张图片
用户可以自由裁剪图片
用户可以选择固定比例裁剪
用户可以导出 PNG/JPG/WebP
用户可以批量上传图片
用户可以批量裁剪为同一比例
用户可以下载 ZIP
所有处理在浏览器完成
页面不上传图片到服务器
每个 SEO 页面有不同默认 preset
每个页面有唯一 title、description、H1
每个页面有 FAQ
每个页面有 canonical
每个页面在 sitemap.xml 中
```

## SEO 验收

```text
首页可访问
8 个工具页面可访问
所有页面有 crawlable internal links
所有页面有唯一 meta title
所有页面有唯一 meta description
所有页面有唯一 H1
所有页面有 BreadcrumbList JSON-LD
有 sitemap.xml
有 robots.txt
无重复 title
无重复 description
无大量重复正文
```

---

# 14. 第一阶段不要做的功能

暂时不要做：

```text
账号系统
付费系统
云端保存
图片历史记录
后台管理
复杂 AI 自动裁剪
背景移除
图片压缩
图片格式转换大集合
PDF 工具
视频工具
```

原因：第一阶段目标是把 **crop image + bulk crop images + local image cropper** 跑通，不要变成泛工具站。

---

# 15. 第一阶段开发优先级

按这个顺序做：

```text
1. 搭建 Next.js 项目
2. 做全站布局 Header/Footer
3. 做首页
4. 做单图 CropEditor
5. 做 /crop-image/
6. 做预设系统
7. 做 /crop-image-to-1x1/
8. 做 /crop-image-locally/
9. 做 BulkCropEditor
10. 做 /bulk-crop-images/
11. 做 product / instagram / headshot / lora 页面
12. 做 sitemap、robots、canonical、JSON-LD
13. 做移动端适配
14. 做性能优化
15. 部署到 Vercel 或 Cloudflare Pages
```

---

# 16. 给编程工具的总指令

你可以把下面这一段直接复制给编程工具：

```text
Build a Next.js + TypeScript + Tailwind CSS website for imagecropkit.com.

The product is ImageCropKit, a free browser-based image cropper. The core promise is: crop images online privately, with no upload, no signup, and no watermark.

Create these routes:
/
 /crop-image/
 /bulk-crop-images/
 /crop-image-locally/
 /crop-image-to-1x1/
 /crop-product-images/
 /crop-image-for-instagram/
 /crop-headshot/
 /crop-images-for-lora-training/
 /privacy/
 /terms/

Implement a reusable CropEditor component that supports:
- image upload by drag and drop
- single image crop
- free crop
- fixed aspect ratio crop
- exact output size
- rotate left/right
- flip horizontal/vertical
- zoom
- export as PNG/JPG/WebP
- quality control for JPG/WebP
- all processing in the browser using Canvas
- no image upload to backend

Implement a BulkCropEditor component that supports:
- multiple image upload
- apply same aspect ratio to all images
- preview grid
- export all cropped images as ZIP
- browser-only processing

Create a preset system for:
Basic ratios: 1:1, 4:5, 16:9, 9:16, 3:2, 4:3
Social: Instagram square, Instagram portrait, Instagram story, Instagram reel, YouTube thumbnail, TikTok cover, LinkedIn banner, Facebook cover, X/Twitter header, Pinterest pin
Product: 2000x2000, Shopify 2048x2048, Etsy 2000x2000, Amazon 2000x2000
AI dataset: 512x512, 768x768, 1024x1024, 1024x1536, 1536x1024
Headshot: 1:1, 4:5, 3:4, LinkedIn profile

Each page must have:
- unique SEO title
- unique meta description
- unique H1
- canonical URL
- Open Graph tags
- Twitter Card tags
- BreadcrumbList JSON-LD
- WebApplication JSON-LD
- visible FAQ section
- internal links to related tools

Generate:
- sitemap.xml
- robots.txt

Design requirements:
- clean SaaS-style UI
- responsive mobile-first design
- large upload area above the fold
- visible trust badges: No upload, No signup, No watermark, Browser-based
- fast loading
- avoid layout shift
- do not lazy-load the hero upload area
- lazy-load below-the-fold images only

Do not implement:
- login
- payment
- backend image processing
- cloud storage
- user history
- AI auto crop yet

The first production version should be fully static/client-side where possible and deployable to Vercel.
```

---

目前下一步最实际的是：**先让编程工具按这份文档生成第一版网站骨架和核心裁剪功能**。完成后再做第二轮：我帮你逐页检查 SEO 标题、页面文案、内链结构和功能是否真的符合搜索意图。

[1]: https://developers.google.com/search/docs/essentials/spam-policies?utm_source=chatgpt.com "Spam Policies for Google Web Search"
[2]: https://developers.google.com/search/docs/crawling-indexing/links-crawlable?utm_source=chatgpt.com "SEO Link Best Practices for Google | Google Search Central"
[3]: https://developers.google.com/search/docs/appearance/title-link?utm_source=chatgpt.com "Influencing your title links in search results"
[4]: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?utm_source=chatgpt.com "Introduction to structured data markup in Google Search"
[5]: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb?utm_source=chatgpt.com "How To Add Breadcrumb (BreadcrumbList) Markup"
[6]: https://developers.google.com/search/docs/appearance/structured-data/faqpage?utm_source=chatgpt.com "FAQ ( FAQPage , Question , Answer ) structured data"
[7]: https://developers.google.com/search/blog/2006/12/deftly-dealing-with-duplicate-content?utm_source=chatgpt.com "Deftly dealing with duplicate content"
[8]: https://web.dev/articles/vitals?utm_source=chatgpt.com "Web Vitals | Articles"
[9]: https://developers.google.com/search/docs/appearance/core-web-vitals?utm_source=chatgpt.com "Understanding Core Web Vitals and Google search results"
[10]: https://web.dev/articles/top-cwv?utm_source=chatgpt.com "The most effective ways to improve Core Web Vitals | Articles"
[11]: https://web.dev/articles/browser-level-image-lazy-loading?utm_source=chatgpt.com "Browser-level image lazy loading for the web | Articles"
