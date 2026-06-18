"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import UploadDropzone from "@/components/UploadDropzone";
import ExportPanel from "@/components/ExportPanel";
import AspectRatioPicker from "@/components/AspectRatioPicker";
import PresetPicker from "@/components/PresetPicker";
import TrustBadges from "@/components/TrustBadges";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { getImageUrl, loadImageFromFile, revokeImageUrl } from "@/lib/imageUtils";
import { calculateInitialCrop, exportCroppedImage, getOutputFileName, percentCropToPixelCrop, isValidCrop } from "@/lib/cropImage";
import { downloadAsZip } from "@/lib/zipImages";
import { type CropPreset } from "@/lib/presets";
import type { ExportFormat } from "@/lib/siteConfig";
import { useFileSizeEstimate } from "@/hooks/useFileSizeEstimate";

interface ImageItem {
  file: File;
  url: string;
  element: HTMLImageElement;
  reactCrop: Crop | undefined;
}

interface BulkCropEditorProps {
  defaultPreset?: CropPreset;
  showPresets?: CropPreset[];
  showTrustBadges?: boolean;
}

const formatLabel: Record<ExportFormat, string> = {
  png: "PNG",
  jpg: "JPG",
  webp: "WebP",
};

function formatRatio(r: number): string {
  if (!r || r === 0) return "Free";
  const ratios: Array<[number, number, number]> = [
    [1, 1, 1],
    [4, 5, 4 / 5],
    [3, 4, 3 / 4],
    [16, 9, 16 / 9],
    [9, 16, 9 / 16],
    [3, 2, 3 / 2],
    [4, 3, 4 / 3],
    [2, 3, 2 / 3],
    [21, 9, 21 / 9],
    [1080, 1350, 1080 / 1350],
    [1080, 1920, 1080 / 1920],
    [1280, 720, 1280 / 720],
    [1584, 396, 1584 / 396],
    [1640, 924, 1640 / 924],
    [1500, 500, 1500 / 500],
    [1000, 1500, 1000 / 1500],
    [1024, 1536, 1024 / 1536],
    [1536, 1024, 1536 / 1024],
  ];
  for (const [a, b, v] of ratios) {
    if (Math.abs(v - r) < 0.001) return `${a}:${b}`;
  }
  return r.toFixed(2);
}

export default function BulkCropEditor({
  defaultPreset,
  showPresets,
  showTrustBadges = false,
}: BulkCropEditorProps) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<CropPreset | null>(defaultPreset || null);
  const [format, setFormat] = useState<ExportFormat>("png");
  const [quality, setQuality] = useState(92);
  const [showGuide, setShowGuide] = useState(true);
  const [filePrefix, setFilePrefix] = useState("");

  const imgRef = useRef<HTMLImageElement | null>(null);
  const thumbStripRef = useRef<HTMLDivElement | null>(null);
  const appendInputRef = useRef<HTMLInputElement>(null);

  const selectedImage = selectedIdx !== null ? images[selectedIdx] : null;
  const selectedPixelCrop = selectedImage?.reactCrop && selectedImage.element
    ? percentCropToPixelCrop(selectedImage.reactCrop, selectedImage.element.naturalWidth, selectedImage.element.naturalHeight)
    : null;
  const fileSize = useFileSizeEstimate(
    selectedImage?.element ?? null,
    selectedPixelCrop,
    format,
    quality,
  );

  const scrollThumbs = useCallback((direction: "left" | "right") => {
    if (!thumbStripRef.current) return;
    const scrollAmount = 300;
    thumbStripRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    if (files.length === 0) return;
    for (const img of images) revokeImageUrl(img.url);

    const hasRatio = selectedPreset && selectedPreset.aspectRatio > 0;
    const newImages: ImageItem[] = [];
    for (const file of files) {
      const url = getImageUrl(file);
      try {
        const element = await loadImageFromFile(file);
        const reactCrop = hasRatio
          ? calculateInitialCrop(selectedPreset.aspectRatio, element.naturalWidth, element.naturalHeight)
          : undefined;
        newImages.push({ file, url, element, reactCrop });
      } catch (err) {
        console.error("Failed to load image:", err);
        revokeImageUrl(url);
      }
    }
    setImages(newImages);
    if (newImages.length > 0) setSelectedIdx(0);
  }, [images, selectedPreset]);

  const handleAppendFiles = useCallback(async (files: File[]) => {
    if (files.length === 0) return;
    const hasRatio = selectedPreset && selectedPreset.aspectRatio > 0;
    const appended: ImageItem[] = [];
    for (const file of files) {
      const url = getImageUrl(file);
      try {
        const element = await loadImageFromFile(file);
        const reactCrop = hasRatio
          ? calculateInitialCrop(selectedPreset.aspectRatio, element.naturalWidth, element.naturalHeight)
          : undefined;
        appended.push({ file, url, element, reactCrop });
      } catch (err) {
        console.error("Failed to load image:", err);
        revokeImageUrl(url);
      }
    }
    if (appended.length > 0) {
      setImages((prev) => [...prev, ...appended]);
    }
  }, [selectedPreset]);

  const handlePresetSelect = useCallback((preset: CropPreset) => {
    setSelectedPreset(preset);
    if (preset.aspectRatio > 0) {
      setImages((prev) => prev.map((img) => ({
        ...img,
        reactCrop: calculateInitialCrop(
          preset.aspectRatio,
          img.element.naturalWidth,
          img.element.naturalHeight
        ),
      })));
    }
  }, []);

  const updateCrop = useCallback((idx: number, percentCrop: Crop) => {
    setImages((prev) => { const n = [...prev]; n[idx] = { ...n[idx], reactCrop: percentCrop }; return n; });
  }, []);

  const applyCropToAll = useCallback(() => {
    if (selectedIdx === null) return;
    const src = images[selectedIdx];
    if (!src?.reactCrop) return;
    const srcCrop = src.reactCrop;
    setImages((prev) => prev.map((img) => ({
      ...img,
      reactCrop: srcCrop ? { ...srcCrop } : undefined,
    })));
  }, [images, selectedIdx]);

  const handleDownload = useCallback(async () => {
    const entries: { name: string; blob: Blob }[] = [];
    const usePrefix = filePrefix.trim().length > 0;
    let seq = 0;
    for (const img of images) {
      if (!isValidCrop(img.reactCrop)) continue;
      try {
        const pixelCrop = percentCropToPixelCrop(img.reactCrop, img.element.naturalWidth, img.element.naturalHeight);
        const blob = await exportCroppedImage(img.element, pixelCrop, {
          format, quality,
          width: selectedPreset?.width,
          height: selectedPreset?.height,
        });
        seq++;
        const name = usePrefix
          ? `${filePrefix.trim()}-${String(seq).padStart(2, "0")}.${format === "jpg" ? "jpg" : format}`
          : getOutputFileName(img.file.name, format);
        entries.push({ name, blob });
      } catch { /* skip */ }
    }
    if (entries.length > 0) await downloadAsZip(entries, "cropped-images.zip");
  }, [images, format, quality, selectedPreset, filePrefix]);

  const aspectRatio = selectedPreset?.aspectRatio ? selectedPreset.aspectRatio : undefined;
  const croppedCount = images.filter((img) => isValidCrop(img.reactCrop)).length;

  useEffect(() => {
    return () => {
      for (const img of images) revokeImageUrl(img.url);
    };
  }, [images]);
  const outputWidth = selectedPreset?.width;
  const outputHeight = selectedPreset?.height;

  if (images.length === 0) {
    return (
      <div className="space-y-4">
        <UploadDropzone onFilesSelected={handleFilesSelected} multiple />
        {showTrustBadges && <TrustBadges />}
      </div>
    );
  }

  const cropRatioLabel = selectedPreset ? formatRatio(selectedPreset.aspectRatio) : undefined;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 text-sm">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {selectedPreset && (
            <span className="text-muted-foreground">
              Preset: <span className="font-medium text-foreground">{selectedPreset.name}</span>
            </span>
          )}
          <span className="font-medium">
            {images.length} image{images.length > 1 ? "s" : ""} uploaded
          </span>
          {outputWidth && outputHeight ? (
            <span className="text-muted-foreground">
              Output <span className="font-mono">{outputWidth}×{outputHeight}</span>
            </span>
          ) : (
            <span className="text-muted-foreground">Output crop area size</span>
          )}
          <span className="text-muted-foreground">Export: {formatLabel[format]}</span>
          {croppedCount > 0 && (
            <span className="text-primary font-medium">
              {croppedCount} of {images.length} cropped
            </span>
          )}
        </div>
        <button
          onClick={() => { for (const img of images) revokeImageUrl(img.url); setImages([]); setSelectedIdx(null); }}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md px-3 py-1 hover:bg-muted shrink-0"
        >
          Upload new images
        </button>
      </div>

      <div className="relative">
        <button
          onClick={() => scrollThumbs("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Scroll thumbnails left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          ref={thumbStripRef}
          className="flex overflow-x-auto gap-2 p-3 rounded-lg border bg-muted/20 scrollbar-show"
        >
          {images.map((img, i) => {
            const isSelected = i === selectedIdx;
            const isCropped = !!img.reactCrop;
            return (
              <button
                key={i}
                onClick={() => setSelectedIdx(i)}
                className={`relative text-left rounded-lg overflow-hidden border-2 transition-colors shrink-0 w-[100px] ${
                  isSelected ? "border-primary" : "border-transparent hover:border-muted-foreground/30"
                }`}
              >
                <div className="relative h-[80px] bg-muted/30">
                  <img src={img.url} alt={img.file.name} className="w-full h-full object-cover" />
                  {isCropped && (
                    <span className="absolute top-1 right-1 inline-flex items-center rounded-full bg-primary/90 text-primary-foreground text-[9px] px-1 py-0.5 font-medium">
                      Cropped
                    </span>
                  )}
                </div>
                <div className="px-1.5 py-1 bg-card">
                  <p className="text-[10px] font-medium truncate" title={img.file.name}>
                    {img.file.name}
                  </p>
                  <p className="text-[9px] text-muted-foreground font-mono">
                    {img.element.naturalWidth}×{img.element.naturalHeight}
                  </p>
                </div>
              </button>
            );
          })}

          {/* Add more images button */}
          <button
            onClick={() => appendInputRef.current?.click()}
            className="relative text-left rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/30 transition-colors shrink-0 w-[100px] hover:border-foreground/40 hover:bg-muted/30 flex flex-col items-center justify-center h-[116px]"
            aria-label="Add more images"
          >
            <Plus className="w-5 h-5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground mt-1">Add</span>
          </button>

          <input
            ref={appendInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              if (files.length > 0) handleAppendFiles(files);
              e.target.value = "";
            }}
          />
        </div>

        <button
          onClick={() => scrollThumbs("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Scroll thumbnails right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {showGuide && (
        <div className="flex items-start gap-3 bg-muted/50 rounded-lg border p-3 text-sm">
          <div className="flex-1 flex flex-wrap gap-x-4 gap-y-2">
            {[
              { n: 1, label: "Upload images" },
              { n: 2, label: "Choose a preset" },
              { n: 3, label: "Click each image to adjust crop" },
              { n: 4, label: "Optional: Apply crop to all" },
              { n: 5, label: "Download ZIP" },
            ].map((step) => (
              <div key={step.n} className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center">{step.n}</span>
                <span className="text-muted-foreground">{step.label}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setShowGuide(false)} className="text-muted-foreground hover:text-foreground leading-none">×</button>
        </div>
      )}

      {selectedImage && selectedIdx !== null && (
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-muted-foreground truncate">
              <span className="font-medium text-foreground">{selectedImage.file.name}</span>
              <span className="ml-2 font-mono">
                {selectedImage.element.naturalWidth}×{selectedImage.element.naturalHeight}
              </span>
            </p>
            {selectedImage.reactCrop && (
              <span className="text-sm text-primary font-medium">Cropped</span>
            )}
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex justify-center items-center overflow-hidden min-h-[360px] bg-muted/20 rounded-lg flex-1">
              <ReactCrop
                crop={selectedImage.reactCrop}
                onChange={(_, percentCrop) => updateCrop(selectedIdx, percentCrop)}
                aspect={aspectRatio} minWidth={50} minHeight={50} className="max-h-[85vh]"
              >
                <img ref={imgRef} src={selectedImage.url} alt={selectedImage.file.name}
                  style={{ maxHeight: "85vh", maxWidth: "100%", width: "auto", height: "auto" }} />
              </ReactCrop>
            </div>

            <div className="lg:w-64 shrink-0 space-y-4 lg:sticky lg:top-20 lg:self-start">
              {showPresets && showPresets.length > 0 ? (
                <PresetPicker presets={showPresets} selectedPreset={selectedPreset} onSelect={handlePresetSelect} label="Presets" />
              ) : (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Aspect ratio</p>
                  <AspectRatioPicker selectedPreset={selectedPreset} onSelect={handlePresetSelect} />
                </div>
              )}

              <ExportPanel
                format={format}
                quality={quality}
                onFormatChange={setFormat}
                onQualityChange={setQuality}
                onDownload={handleDownload}
                disabled={croppedCount === 0}
                outputWidth={outputWidth}
                outputHeight={outputHeight}
                outputIsCropArea={!outputWidth && !outputHeight}
                presetName={selectedPreset?.name}
                cropRatio={cropRatioLabel}
                fileSize={fileSize}
              />
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
            <p className="text-sm text-muted-foreground">
              You can adjust the crop for each image individually by clicking the thumbnails above. If you want the same crop on every image, use the button below.
            </p>
            <button onClick={applyCropToAll} disabled={!selectedImage?.reactCrop}
              className="w-full inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-6 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
              Apply This Crop to All Images
            </button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
            <label className="text-sm text-muted-foreground block">
              File name prefix <span className="text-xs">(optional)</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={filePrefix}
                onChange={(e) => setFilePrefix(e.target.value)}
                placeholder="e.g. product"
                className="flex-1 h-9 rounded-md border bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {filePrefix.trim()
                ? `Files will be named: ${filePrefix.trim()}-01.${format === "jpg" ? "jpg" : format}, ${filePrefix.trim()}-02.${format === "jpg" ? "jpg" : format}, ...`
                : "Leave empty to keep original file names."}
            </p>
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground text-center">
        Processed locally in your browser. Never uploaded to a server.
      </p>

      {showTrustBadges && (
        <div className="pt-2">
          <TrustBadges />
        </div>
      )}
    </div>
  );
}
