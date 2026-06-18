import type { Crop, PixelCrop } from "react-image-crop";
import type { ExportFormat } from "./siteConfig";

export interface ExportOptions {
  format: ExportFormat;
  quality: number;
  width?: number;
  height?: number;
  fillBackground?: string;
}

function getMimeType(format: ExportFormat): string {
  switch (format) {
    case "jpg": return "image/jpeg";
    case "webp": return "image/webp";
    case "png": default: return "image/png";
  }
}

function getExtension(format: ExportFormat): string {
  switch (format) {
    case "jpg": return ".jpg";
    case "webp": return ".webp";
    case "png": default: return ".png";
  }
}

export function safeNaturalCrop(
  crop: PixelCrop,
  natW: number,
  natH: number
): PixelCrop {
  const x = Math.min(Math.max(0, Math.round(crop.x)), Math.max(0, natW - 1));
  const y = Math.min(Math.max(0, Math.round(crop.y)), Math.max(0, natH - 1));
  const maxW = Math.max(1, natW - x);
  const maxH = Math.max(1, natH - y);
  const width = Math.min(Math.max(1, Math.round(crop.width)), maxW);
  const height = Math.min(Math.max(1, Math.round(crop.height)), maxH);
  return { unit: "px", x, y, width, height };
}

export function exportCroppedImage(
  image: HTMLImageElement,
  crop: PixelCrop,
  options: ExportOptions
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const { format, quality, width, height } = options;

    const clamped = safeNaturalCrop(crop, image.naturalWidth, image.naturalHeight);
    const outputWidth = width || clamped.width;
    const outputHeight = height || clamped.height;

    const canvas = document.createElement("canvas");
    canvas.width = outputWidth;
    canvas.height = outputHeight;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Could not get canvas context"));
      return;
    }

    if (options.fillBackground) {
      ctx.fillStyle = options.fillBackground;
      ctx.fillRect(0, 0, outputWidth, outputHeight);
    }

    ctx.drawImage(
      image,
      clamped.x, clamped.y, clamped.width, clamped.height,
      0, 0, outputWidth, outputHeight
    );

    const mimeType = getMimeType(format);
    if (format === "png") {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to export image"));
      }, mimeType);
    } else {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to export image"));
      }, mimeType, quality / 100);
    }
  });
}

export function calculateInitialCrop(
  aspectRatio: number,
  imageWidth?: number,
  imageHeight?: number
): Crop {
  const maxDim = 50;

  if (!imageWidth || !imageHeight) {
    let w: number, h: number;
    if (aspectRatio >= 1) { w = maxDim; h = maxDim / aspectRatio; }
    else { h = maxDim; w = maxDim * aspectRatio; }
    return { unit: "%", x: (100 - w) / 2, y: (100 - h) / 2, width: w, height: h };
  }

  const maxW = (imageWidth * maxDim) / 100;
  const maxH = (imageHeight * maxDim) / 100;

  let cropW: number, cropH: number;
  if (aspectRatio >= 1) {
    cropW = maxW;
    cropH = cropW / aspectRatio;
    if (cropH > maxH) { cropH = maxH; cropW = cropH * aspectRatio; }
  } else {
    cropH = maxH;
    cropW = cropH * aspectRatio;
    if (cropW > maxW) { cropW = maxW; cropH = cropW / aspectRatio; }
  }

  return {
    unit: "%",
    x: ((imageWidth - cropW) / 2 / imageWidth) * 100,
    y: ((imageHeight - cropH) / 2 / imageHeight) * 100,
    width: (cropW / imageWidth) * 100,
    height: (cropH / imageHeight) * 100,
  };
}

export function percentCropToPixelCrop(
  crop: Crop,
  natW: number,
  natH: number
): PixelCrop {
  return safeNaturalCrop({
    unit: "px",
    x: (crop.x / 100) * natW,
    y: (crop.y / 100) * natH,
    width: (crop.width / 100) * natW,
    height: (crop.height / 100) * natH,
  }, natW, natH);
}

export function getOutputFileName(originalName: string, format: ExportFormat): string {
  const baseName = originalName.replace(/\.[^.]+$/, "");
  return `${baseName}-cropped${getExtension(format)}`;
}

export function exportCroppedCircleImage(
  image: HTMLImageElement,
  crop: PixelCrop,
  options: ExportOptions
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const { format, quality, width, height } = options;

    const clamped = safeNaturalCrop(crop, image.naturalWidth, image.naturalHeight);
    const outW = width || clamped.width;
    const outH = height || clamped.height;
    const size = Math.min(outW, outH);

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Could not get canvas context"));
      return;
    }

    if (format === "jpg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);
    } else {
      ctx.clearRect(0, 0, size, size);
    }

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(
      image,
      clamped.x, clamped.y, clamped.width, clamped.height,
      0, 0, size, size
    );

    const mimeType = getMimeType(format);
    if (format === "png") {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to export image"));
      }, mimeType);
    } else {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to export image"));
      }, mimeType, quality / 100);
    }
  });
}

export function exportCroppedOvalImage(
  image: HTMLImageElement,
  crop: PixelCrop,
  options: ExportOptions
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const { format, quality, width, height } = options;

    const clamped = safeNaturalCrop(crop, image.naturalWidth, image.naturalHeight);
    const outW = width || clamped.width;
    const outH = height || clamped.height;

    const canvas = document.createElement("canvas");
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Could not get canvas context"));
      return;
    }

    if (format === "jpg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, outW, outH);
    } else {
      ctx.clearRect(0, 0, outW, outH);
    }

    ctx.beginPath();
    ctx.ellipse(outW / 2, outH / 2, outW / 2, outH / 2, 0, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(
      image,
      clamped.x, clamped.y, clamped.width, clamped.height,
      0, 0, outW, outH
    );

    const mimeType = getMimeType(format);
    if (format === "png") {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to export image"));
      }, mimeType);
    } else {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to export image"));
      }, mimeType, quality / 100);
    }
  });
}

export function isValidCrop(crop: Crop | undefined | null): crop is Crop {
  if (!crop) return false;
  if (crop.unit !== "%" && crop.unit !== "px") return false;
  if (
    !Number.isFinite(crop.x) ||
    !Number.isFinite(crop.y) ||
    !Number.isFinite(crop.width) ||
    !Number.isFinite(crop.height)
  ) {
    return false;
  }
  if (crop.width <= 0 || crop.height <= 0) return false;
  if (crop.unit === "%") {
    if (crop.x < 0 || crop.y < 0 || crop.x >= 100 || crop.y >= 100) return false;
  }
  return true;
}
