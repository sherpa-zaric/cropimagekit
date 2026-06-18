"use client";

import { useState, useEffect, useRef } from "react";
import type { PixelCrop } from "react-image-crop";
import type { ExportFormat } from "@/lib/siteConfig";

function getMimeType(format: ExportFormat): string {
  switch (format) {
    case "jpg": return "image/jpeg";
    case "webp": return "image/webp";
    case "png": default: return "image/png";
  }
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function useFileSizeEstimate(
  image: HTMLImageElement | null,
  crop: PixelCrop | null,
  format: ExportFormat,
  quality: number,
): string | null {
  const [estimate, setEstimate] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!image || !crop || crop.width <= 0 || crop.height <= 0) {
      setEstimate(null);
      return;
    }

    timerRef.current = setTimeout(() => {
      try {
        const sampleScale = Math.min(1, 256 / Math.max(crop.width, crop.height));
        const sw = Math.max(1, Math.round(crop.width * sampleScale));
        const sh = Math.max(1, Math.round(crop.height * sampleScale));

        const canvas = document.createElement("canvas");
        canvas.width = sw;
        canvas.height = sh;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(
          image,
          crop.x, crop.y, crop.width, crop.height,
          0, 0, sw, sh,
        );

        const mimeType = getMimeType(format);

        canvas.toBlob((blob) => {
          if (!blob) return;
          const scale = (crop.width * crop.height) / (sw * sh);
          const estimatedBytes = Math.round(blob.size * scale);
          setEstimate(formatBytes(estimatedBytes));
        }, mimeType, format === "png" ? undefined : quality / 100);
      } catch {
        setEstimate(null);
      }
    }, 200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [image, crop?.x, crop?.y, crop?.width, crop?.height, format, quality]);

  return estimate;
}
