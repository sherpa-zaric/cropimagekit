"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import UploadDropzone from "@/components/UploadDropzone";
import ExportPanel from "@/components/ExportPanel";
import AspectRatioPicker from "@/components/AspectRatioPicker";
import PresetPicker from "@/components/PresetPicker";
import TrustBadges from "@/components/TrustBadges";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { trackAnalyticsEvent } from "@/lib/analytics";

import { getImageUrl, loadImageFromFile, revokeImageUrl } from "@/lib/imageUtils";
import { calculateInitialCrop, exportCroppedImage, percentCropToPixelCrop, isValidCrop } from "@/lib/cropImage";
import { bulkOutputNames, transferCrop } from "@/lib/bulkCrop";
import { downloadAsZip } from "@/lib/zipImages";
import { type CropPreset } from "@/lib/presets";
import type { ExportFormat } from "@/lib/siteConfig";
import { useFileSizeEstimate } from "@/hooks/useFileSizeEstimate";

interface ImageItem {
  file: File;
  url: string;
  element: HTMLImageElement;
  reactCrop: Crop | undefined;
  adjusted?: boolean;
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
  const [filePrefix, setFilePrefix] = useState("");
  const [failedUrls, setFailedUrls] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const exportingRef = useRef(false);
  const imageUrls = useRef(new Set<string>());

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
      imageUrls.current.add(url);
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
    setFailedUrls([]);
    if (newImages.length > 0) trackAnalyticsEvent("crop_image_loaded", { tool_type: "bulk", image_count: newImages.length });
    if (newImages.length < files.length) toast.error(`${files.length - newImages.length} images could not be loaded.`);
    if (newImages.length > 0) setSelectedIdx(0);
  }, [images, selectedPreset]);

  const handleAppendFiles = useCallback(async (files: File[]) => {
    if (files.length === 0) return;
    const hasRatio = selectedPreset && selectedPreset.aspectRatio > 0;
    const appended: ImageItem[] = [];
    for (const file of files) {
      const url = getImageUrl(file);
      imageUrls.current.add(url);
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
      trackAnalyticsEvent("crop_image_loaded", { tool_type: "bulk", image_count: appended.length });
      setImages((prev) => [...prev, ...appended]);
    }
    if (appended.length < files.length) toast.error(`${files.length - appended.length} images could not be loaded.`);
  }, [selectedPreset]);

  const handlePresetSelect = useCallback((preset: CropPreset) => {
    if (preset.id === selectedPreset?.id) return;
    setSelectedPreset(preset);
    if (preset.aspectRatio > 0) {
      setImages((prev) => prev.map((img) => ({
        ...img,
        adjusted: false,
        reactCrop: calculateInitialCrop(
          preset.aspectRatio,
          img.element.naturalWidth,
          img.element.naturalHeight
        ),
      })));
    }
  }, [selectedPreset?.id]);

  const updateCrop = useCallback((idx: number, percentCrop: Crop) => {
    setImages((prev) => { const n = [...prev]; n[idx] = { ...n[idx], reactCrop: percentCrop, adjusted: true }; return n; });
  }, []);

  const applyCropToAll = useCallback(() => {
    if (selectedIdx === null) return;
    const src = images[selectedIdx];
    if (!src || !isValidCrop(src.reactCrop)) return;
    const srcCrop = src.reactCrop;
    setImages((prev) => prev.map((img) => ({
      ...img,
      reactCrop: img.url === src.url ? srcCrop : transferCrop(srcCrop, src.element.naturalWidth, src.element.naturalHeight, img.element.naturalWidth, img.element.naturalHeight),
      adjusted: img.url === src.url ? src.adjusted : false,
    })));
  }, [images, selectedIdx]);

  const aspectRatio = selectedPreset?.aspectRatio ? selectedPreset.aspectRatio : undefined;
  const croppedCount = images.filter((img) => isValidCrop(img.reactCrop)).length;

  const outputNames = bulkOutputNames(images.map(img => img.file.name), format, filePrefix);
  const handleDownload = async (retryOnly = false) => {
    if (exportingRef.current) return;
    exportingRef.current = true;
    setIsExporting(true);
    const failures: string[] = [];
    try {
    const entries: { name: string; blob: Blob }[] = [];
    let failed = 0;
    for (const [index, img] of images.entries()) {
      if (retryOnly && !failedUrls.includes(img.url)) continue;
      if (!isValidCrop(img.reactCrop)) continue;
      try {
        const pixelCrop = percentCropToPixelCrop(img.reactCrop, img.element.naturalWidth, img.element.naturalHeight);
        const blob = await exportCroppedImage(img.element, pixelCrop, {
          format, quality,
          width: selectedPreset?.width,
          height: selectedPreset?.height,
        });
        const name = outputNames[index];
        entries.push({ name, blob });
      } catch (err) {
        console.error("Failed to export image:", err);
        failed++;
        failures.push(img.url);
      }
    }
    if (entries.length > 0) {
      try {
        await downloadAsZip(entries, "cropped-images.zip");
      } catch {
        setFailedUrls(images.filter(img => isValidCrop(img.reactCrop) && (!retryOnly || failedUrls.includes(img.url))).map(img => img.url));
        trackAnalyticsEvent("crop_export_failed", { tool_type: "bulk", format, failed_count: entries.length, failure_stage: "zip" });
        toast.error("Could not create the ZIP. Try fewer images or a smaller output size.");
        return;
      }
      setFailedUrls(failures);
      trackAnalyticsEvent("crop_export_succeeded", { tool_type: "bulk", format, output_count: entries.length, failed_count: failed });
      if (failed > 0) {
        trackAnalyticsEvent("crop_export_failed", { tool_type: "bulk", format, failed_count: failed, failure_stage: "image_export" });
        toast.error(`${failed} image${failed > 1 ? "s" : ""} failed to export. ZIP contains ${entries.length} of ${croppedCount} cropped image${croppedCount > 1 ? "s" : ""}.`);
      } else {
        toast.success(`ZIP downloaded (${entries.length} image${entries.length > 1 ? "s" : ""})`);
      }
    } else {
      setFailedUrls(failures);
      trackAnalyticsEvent("crop_export_failed", { tool_type: "bulk", format, failed_count: failed, failure_stage: "image_export" });
      toast.error("No images could be exported. Please try again.");
    }
    } finally {
      exportingRef.current = false;
      setIsExporting(false);
    }
  };

  useEffect(() => {
    const urls = imageUrls.current;
    return () => { for (const url of urls) revokeImageUrl(url); };
  }, []);
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
    <fieldset disabled={isExporting} className="min-w-0 space-y-3 pb-20 lg:pb-0" aria-busy={isExporting}>
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
                key={img.url}
                onClick={() => setSelectedIdx(i)}
                aria-pressed={isSelected}
                aria-label={`Edit image ${i + 1}: ${img.file.name}`}
                className={`relative text-left rounded-lg overflow-hidden border-2 transition-colors shrink-0 w-[100px] ${
                  isSelected ? "border-primary" : "border-transparent hover:border-muted-foreground/30"
                }`}
              >
                <div className="relative h-[80px] bg-muted/30">
                  <img src={img.url} alt={img.file.name} className="w-full h-full object-cover" />
                  {isCropped && (
                    <span className="absolute top-1 right-1 inline-flex items-center rounded-full bg-primary/90 text-primary-foreground text-[9px] px-1 py-0.5 font-medium">
                      {failedUrls.includes(img.url) ? "Export failed" : img.adjusted ? "Adjusted" : "Auto crop"}
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

      {selectedImage && selectedIdx !== null && (
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="min-w-0 break-all text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{selectedImage.file.name}</span>
              <span className="ml-2 font-mono">
                {selectedImage.element.naturalWidth}×{selectedImage.element.naturalHeight}
              </span>
            </p>
            {selectedImage.reactCrop && (
              <span className="text-sm text-primary font-medium">{selectedImage.adjusted ? "Adjusted" : "Auto crop"}</span>
            )}
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col gap-3 flex-1 min-w-0">
              <div className="flex justify-center items-center overflow-hidden min-h-[420px] border-2 border-foreground/25 rounded-lg checkerboard flex-1">
                <ReactCrop
                  disabled={isExporting}
                  crop={selectedImage.reactCrop}
                  onChange={(_, percentCrop) => updateCrop(selectedIdx, percentCrop)}
                  aspect={aspectRatio} minWidth={50} minHeight={50} className="max-h-[85vh]"
                >
                  <img ref={imgRef} src={selectedImage.url} alt={selectedImage.file.name}
                    style={{ maxHeight: "85vh", maxWidth: "100%", width: "auto", height: "auto", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.25))" }} />
                </ReactCrop>
              </div>

              <ExportPanel
                format={format}
                quality={quality}
                onFormatChange={setFormat}
                onQualityChange={setQuality}
                onDownload={() => void handleDownload()}
                disabled={croppedCount === 0 || isExporting}
                downloadLabel={isExporting ? "Creating ZIP..." : `Download ZIP (${croppedCount})`}
                outputWidth={outputWidth}
                outputHeight={outputHeight}
                outputIsCropArea={!outputWidth && !outputHeight}
                presetName={selectedPreset?.name}
                cropRatio={cropRatioLabel}
                fileSize={fileSize}
              />
            </div>

            <div className="lg:w-64 shrink-0 space-y-4">
              {showPresets && showPresets.length > 0 ? (
                <PresetPicker presets={showPresets} selectedPreset={selectedPreset} onSelect={handlePresetSelect} label="Presets" />
              ) : (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Aspect ratio</p>
                  <AspectRatioPicker selectedPreset={selectedPreset} onSelect={handlePresetSelect} />
                </div>
              )}
            </div>
          </div>

          <div className="border-t pt-4 space-y-3">
            <button onClick={applyCropToAll} disabled={!selectedImage?.reactCrop}
              className="w-full inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-6 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
              Apply This Crop to All Images
            </button>
          </div>

          <div className="border-t pt-4 space-y-2">
            <label htmlFor="bulk-prefix" className="text-sm text-muted-foreground block">
              File name prefix <span className="text-xs">(optional)</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                id="bulk-prefix"
                value={filePrefix}
                onChange={(e) => setFilePrefix(e.target.value)}
                placeholder="e.g. product"
                className="min-w-0 flex-1 h-9 rounded-md border bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <section aria-label="ZIP contents" className="border-t pt-4 space-y-3">
            <h2 className="text-base font-semibold">ZIP contents · {croppedCount} {formatLabel[format]} files</h2>
            <ul className="divide-y text-sm">
              {images.map((img, i) => {
                const crop = isValidCrop(img.reactCrop) ? percentCropToPixelCrop(img.reactCrop, img.element.naturalWidth, img.element.naturalHeight) : null;
                return <li key={img.url} className="flex flex-wrap items-center justify-between gap-2 py-2">
                  <span className="min-w-0 break-all">{outputNames[i]}</span>
                  <span className="shrink-0 font-mono text-muted-foreground">{crop ? `${outputWidth || crop.width} × ${outputHeight || crop.height} px` : "Not cropped"}</span>
                </li>;
              })}
            </ul>
          </section>
          {failedUrls.length > 0 && <section role="alert" className="border-t pt-4 space-y-2">
            <h2 className="text-base font-semibold">Export failed ({failedUrls.length})</h2>
            <ul className="text-sm break-all">{images.filter(img => failedUrls.includes(img.url)).map(img => <li key={img.url}>{img.file.name}</li>)}</ul>
            <Button variant="outline" onClick={() => void handleDownload(true)}><RotateCcw className="size-4" />Retry failed images</Button>
          </section>}
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

      {selectedImage && croppedCount > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-border bg-background p-3">
          <Button onClick={() => void handleDownload()} disabled={isExporting} className="w-full h-11 text-base font-medium">
            {isExporting ? "Creating ZIP..." : `Download ZIP (${croppedCount})`}
          </Button>
        </div>
      )}
    </fieldset>
  );
}
