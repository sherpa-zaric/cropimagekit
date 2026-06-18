"use client";

import { Button } from "@/components/ui/button";
import type { ExportFormat } from "@/lib/siteConfig";

interface ExportPanelProps {
  format: ExportFormat;
  quality: number;
  onFormatChange: (format: ExportFormat) => void;
  onQualityChange: (quality: number) => void;
  onDownload: () => void;
  disabled: boolean;
  outputWidth?: number;
  outputHeight?: number;
  outputIsCropArea?: boolean;
  presetName?: string;
  cropRatio?: string;
  note?: string;
  fileSize?: string | null;
}

const formats: { value: ExportFormat; label: string }[] = [
  { value: "png", label: "PNG" },
  { value: "jpg", label: "JPG" },
  { value: "webp", label: "WebP" },
];

const formatLabel: Record<ExportFormat, string> = {
  png: "PNG",
  jpg: "JPG",
  webp: "WebP",
};

export default function ExportPanel({
  format,
  quality,
  onFormatChange,
  onQualityChange,
  onDownload,
  disabled,
  outputWidth,
  outputHeight,
  outputIsCropArea,
  presetName,
  cropRatio,
  note,
  fileSize,
}: ExportPanelProps) {
  const parts: string[] = [];
  if (presetName) parts.push(presetName);
  if (outputWidth && outputHeight) {
    parts.push(`${outputWidth}×${outputHeight}`);
  } else if (outputIsCropArea) {
    parts.push("crop area");
  }
  if (cropRatio) parts.push(cropRatio);
  parts.push(formatLabel[format]);
  if (format !== "png") parts.push(`Q:${quality}%`);
  if (note) parts.push(note);

  const outputLabel = parts.length > 0 ? parts.join(" · ") : "—";

  const downloadLabel =
    outputWidth && outputHeight
      ? `Download ${outputWidth}×${outputHeight} ${formatLabel[format]}`
      : `Download ${formatLabel[format]}`;

  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground">
        <span>Output: </span>
        <span className="font-mono text-foreground">{outputLabel}</span>
        {fileSize && (
          <span className="ml-2 text-muted-foreground">~{fileSize}</span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center border border-border rounded-md overflow-hidden">
          {formats.map((f) => (
            <button
              key={f.value}
              onClick={() => onFormatChange(f.value)}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                format === f.value
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {format !== "png" && (
          <div className="flex items-center gap-2">
            <label className="text-sm tabular-nums text-muted-foreground w-8 text-right">
              {quality}%
            </label>
            <input
              type="range"
              min={10}
              max={100}
              value={quality}
              onChange={(e) => onQualityChange(Number(e.target.value))}
              className="w-20 h-1.5 accent-foreground"
            />
          </div>
        )}

        <Button onClick={onDownload} disabled={disabled} className="w-full">
          <span className="hidden sm:inline">{downloadLabel}</span>
          <span className="sm:hidden">Download</span>
        </Button>
      </div>
    </div>
  );
}
