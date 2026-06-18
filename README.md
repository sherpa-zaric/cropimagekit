# ImageCropKit

Free browser-based image cropper. All processing is local — zero upload, zero signup, zero watermark.

**[Live Site →](https://imagecropkit.com)**

## Features

- **Single image cropping** — free crop, aspect ratio presets, exact pixel dimensions
- **Bulk crop** — upload multiple images, apply shared crop, download as ZIP
- **Platform presets** — Instagram, TikTok, YouTube, Shopify, Amazon, Etsy, LinkedIn, passport photos
- **Shape cropping** — circle and oval crops for profile pictures and avatars
- **AI dataset preparation** — batch crop to SD 1.5 (512x512), SDXL (1024x1024), custom sizes
- **Export formats** — PNG, JPG, WebP with quality control
- **Privacy-first** — all processing happens in your browser using Canvas API

## Tech Stack

- [Next.js](https://nextjs.org/) 16 (App Router + Turbopack)
- [React](https://react.dev/) 19 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) 4
- Canvas API for image processing
- [react-image-crop](https://github.com/DominicTobias/react-image-crop) for crop UI
- [JSZip](https://stuk.github.io/jszip/) + [file-saver](https://github.com/nickersoft/FileSaver.js) for bulk downloads

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Open http://localhost:3000
```

## Project Structure

```
app/                    # Next.js pages (one per tool)
  crop-image/           # Single image cropper
  bulk-crop-images/     # Batch crop tool
  crop-product-images/  # Ecommerce presets
  crop-image-for-instagram/
  crop-image-for-tiktok/
  crop-headshot/
  circle-crop-image/
  ...
components/             # Reusable UI components
  CropEditor.tsx        # Main single-image editor
  BulkCropEditor.tsx    # Multi-image editor
  StructuredData.tsx    # JSON-LD structured data
  ...
lib/                    # Utility functions
  cropImage.ts          # Canvas-based export pipeline
  presets.ts            # Platform size presets
  siteConfig.ts         # Site URL, name, types
```

## How It Works

1. Upload an image (drag & drop, click, or paste)
2. Choose a crop area or aspect ratio preset
3. Adjust the crop region
4. Export as PNG, JPG, or WebP

All image processing happens in the browser using the HTML5 Canvas API. No server upload, no account, no watermark.

## Contributing

Contributions are welcome! Please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
