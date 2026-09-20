import type { Crop } from "react-image-crop";

/** Transfer framing, not raw percentages: portrait and landscape sources differ. */
export function transferCrop(crop: Crop, sourceWidth: number, sourceHeight: number, targetWidth: number, targetHeight: number): Crop {
  const width = crop.width * sourceWidth / 100;
  const height = crop.height * sourceHeight / 100;
  const ratio = width / height;
  const sourceFitWidth = Math.min(sourceWidth, sourceHeight * ratio);
  const targetFitWidth = Math.min(targetWidth, targetHeight * ratio);
  const targetCropWidth = targetFitWidth * Math.min(1, width / sourceFitWidth);
  const w = targetCropWidth / targetWidth * 100;
  const h = targetCropWidth / ratio / targetHeight * 100;
  return {
    unit: "%", width: w, height: h,
    x: Math.max(0, Math.min(100 - w, crop.x + crop.width / 2 - w / 2)),
    y: Math.max(0, Math.min(100 - h, crop.y + crop.height / 2 - h / 2)),
  };
}

export function bulkOutputNames(names: string[], format: string, prefix: string): string[] {
  const used = new Set<string>();
  const safe = (name: string) => name.replace(/[\\/:*?"<>|\x00-\x1f]/g, "-").trim() || "image";
  return names.map((name, i) => {
    const base = prefix.trim() ? `${safe(prefix)}-${String(i + 1).padStart(2, "0")}` : `${safe(name.replace(/\.[^.]+$/, ""))}-cropped`;
    let output = `${base}.${format}`;
    let suffix = 2;
    while (used.has(output.toLowerCase())) output = `${base}-${suffix++}.${format}`;
    used.add(output.toLowerCase());
    return output;
  });
}
