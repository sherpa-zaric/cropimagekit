"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent, type MouseEvent } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Check, CircleDot, Download, RotateCcw, X } from "lucide-react";

import UploadDropzone from "@/components/UploadDropzone";
import TrustBadges from "@/components/TrustBadges";
import { Button } from "@/components/ui/button";
import {
  calculateFocalCrop,
  calculateInitialCrop,
  exportCroppedImage,
  isValidCrop,
  percentCropToPixelCrop,
} from "@/lib/cropImage";
import { getImageUrl, loadImageFromFile, revokeImageUrl } from "@/lib/imageUtils";
import { type CropPreset, aiPresets, productPresets, socialPresets } from "@/lib/presets";
import type { ExportFormat } from "@/lib/siteConfig";
import { downloadAsZip } from "@/lib/zipImages";

interface FocalPoint {
  x: number;
  y: number;
}

interface ExportPack {
  id: string;
  name: string;
  description: string;
  presets: CropPreset[];
}

const creatorPresetIds = ["instagram-portrait", "instagram-story", "youtube-thumbnail", "pinterest-pin"];
const storePresetIds = ["shopify", "etsy", "amazon", "web-thumbnail"];
const aiPresetIds = ["ai-1024", "ai-1024x1536", "ai-1536x1024"];

const findPresets = (presets: CropPreset[], ids: string[]) =>
  ids.flatMap((id) => {
    const preset = presets.find((item) => item.id === id);
    return preset ? [preset] : [];
  });

const exportPacks: ExportPack[] = [
  {
    id: "creator",
    name: "Creator pack",
    description: "Feed, story, thumbnail, and pin",
    presets: findPresets(socialPresets, creatorPresetIds),
  },
  {
    id: "store",
    name: "Store pack",
    description: "Shopify, Etsy, Amazon, and web",
    presets: findPresets(productPresets, storePresetIds),
  },
  {
    id: "ai",
    name: "AI pack",
    description: "Square, portrait, and landscape",
    presets: findPresets(aiPresets, aiPresetIds),
  },
];

const formats: Array<{ value: ExportFormat; label: string }> = [
  { value: "png", label: "PNG" },
  { value: "jpg", label: "JPG" },
  { value: "webp", label: "WebP" },
];

function getCropForPreset(preset: CropPreset, image: HTMLImageElement, focal: FocalPoint | null): Crop {
  if (focal) {
    return calculateFocalCrop(focal.x, focal.y, preset.aspectRatio, image.naturalWidth, image.naturalHeight);
  }
  return calculateInitialCrop(preset.aspectRatio, image.naturalWidth, image.naturalHeight);
}

function fileExtension(format: ExportFormat): string {
  return format === "jpg" ? "jpg" : format;
}

function fileBaseName(name: string): string {
  return name.replace(/\.[^.]+$/, "") || "image";
}

export default function ExportPackEditor() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);
  const [activePackId, setActivePackId] = useState(exportPacks[0].id);
  const [selectedPresetIds, setSelectedPresetIds] = useState<string[]>(creatorPresetIds);
  const [activePresetId, setActivePresetId] = useState(creatorPresetIds[0]);
  const [cropsByPreset, setCropsByPreset] = useState<Record<string, Crop>>({});
  const [focal, setFocal] = useState<FocalPoint | null>(null);
  const [focalMode, setFocalMode] = useState(false);
  const [format, setFormat] = useState<ExportFormat>("jpg");
  const [quality, setQuality] = useState(92);
  const [isExporting, setIsExporting] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const allPresets = useMemo(() => exportPacks.flatMap((pack) => pack.presets), []);
  const selectedPresets = useMemo(
    () => allPresets.filter((preset) => selectedPresetIds.includes(preset.id)),
    [allPresets, selectedPresetIds]
  );
  const activePreset = selectedPresets.find((preset) => preset.id === activePresetId) ?? selectedPresets[0] ?? null;
  const activeCrop = activePreset ? cropsByPreset[activePreset.id] : undefined;

  const resetCrops = useCallback((image: HTMLImageElement, ids: string[], nextFocal: FocalPoint | null) => {
    const next: Record<string, Crop> = {};
    for (const id of ids) {
      const preset = allPresets.find((item) => item.id === id);
      if (preset) next[id] = getCropForPreset(preset, image, nextFocal);
    }
    setCropsByPreset(next);
  }, [allPresets]);

  const handleFilesSelected = useCallback((files: File[]) => {
    const file = files[0];
    if (!file) return;
    if (imageUrl) revokeImageUrl(imageUrl);

    const url = getImageUrl(file);
    setImageFile(file);
    setImageUrl(url);
    setImageElement(null);
    setFocal(null);
    setFocalMode(false);

    loadImageFromFile(file)
      .then((image) => {
        setImageElement(image);
        resetCrops(image, selectedPresetIds, null);
      })
      .catch((error) => {
        console.error("Failed to load image:", error);
        alert("Failed to load image. Please try a different file.");
      });
  }, [imageUrl, resetCrops, selectedPresetIds]);

  const handlePackSelect = useCallback((pack: ExportPack) => {
    const ids = pack.presets.map((preset) => preset.id);
    setActivePackId(pack.id);
    setSelectedPresetIds(ids);
    setActivePresetId(ids[0]);
    if (imageElement) resetCrops(imageElement, ids, focal);
  }, [focal, imageElement, resetCrops]);

  const handlePresetToggle = useCallback((preset: CropPreset, checked: boolean) => {
    setSelectedPresetIds((current) => {
      return checked ? [...current, preset.id] : current.filter((id) => id !== preset.id);
    });
    if (checked) setActivePresetId(preset.id);
    else if (activePresetId === preset.id) {
      setActivePresetId(selectedPresetIds.find((id) => id !== preset.id) ?? "");
    }
    if (checked && imageElement) {
      setCropsByPreset((crops) => ({ ...crops, [preset.id]: getCropForPreset(preset, imageElement, focal) }));
    }
  }, [activePresetId, focal, imageElement, selectedPresetIds]);

  const handleImageClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (!focalMode || !imgRef.current || !imageElement) return;

    const rect = imgRef.current.getBoundingClientRect();
    const nextFocal = {
      x: Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100)),
      y: Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100)),
    };
    setFocal(nextFocal);
    setFocalMode(false);
    resetCrops(imageElement, selectedPresetIds, nextFocal);
  }, [focalMode, imageElement, resetCrops, selectedPresetIds]);

  const handleClearFocal = useCallback(() => {
    setFocal(null);
    if (imageElement) resetCrops(imageElement, selectedPresetIds, null);
  }, [imageElement, resetCrops, selectedPresetIds]);

  const handleCropChange = useCallback((_: Crop, nextCrop: Crop) => {
    if (!activePreset) return;
    setCropsByPreset((current) => ({ ...current, [activePreset.id]: nextCrop }));
  }, [activePreset]);

  const handleDownload = useCallback(async () => {
    if (!imageElement || !imageFile || selectedPresets.length === 0) return;
    setIsExporting(true);
    try {
      const entries = await Promise.all(selectedPresets.map(async (preset) => {
        const crop = cropsByPreset[preset.id] ?? getCropForPreset(preset, imageElement, focal);
        const pixelCrop = percentCropToPixelCrop(crop, imageElement.naturalWidth, imageElement.naturalHeight);
        const blob = await exportCroppedImage(imageElement, pixelCrop, {
          format,
          quality,
          width: preset.width,
          height: preset.height,
        });
        return {
          name: `${fileBaseName(imageFile.name)}-${preset.id}.${fileExtension(format)}`,
          blob,
        };
      }));
      await downloadAsZip(entries, `${fileBaseName(imageFile.name)}-export-pack.zip`);
    } catch (error) {
      console.error("Failed to export pack:", error);
      alert("The export pack could not be created. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }, [cropsByPreset, focal, format, imageElement, imageFile, quality, selectedPresets]);

  useEffect(() => () => {
    if (imageUrl) revokeImageUrl(imageUrl);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!imageUrl) {
    return (
      <div className="space-y-4">
        <UploadDropzone onFilesSelected={handleFilesSelected} />
        <TrustBadges />
      </div>
    );
  }

  const canDownload = Boolean(imageElement && imageFile && selectedPresets.length > 0 && activeCrop && isValidCrop(activeCrop));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{imageFile?.name}</p>
          {imageElement && <p className="mt-0.5 font-mono text-xs text-muted-foreground">{imageElement.naturalWidth} x {imageElement.naturalHeight} source</p>}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (imageUrl) revokeImageUrl(imageUrl);
            setImageUrl(null);
            setImageFile(null);
            setImageElement(null);
            setFocal(null);
            setCropsByPreset({});
          }}
        >
          <X />
          Replace image
        </Button>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 rounded-md border bg-muted/30 p-3">
            <Button variant={focalMode ? "default" : "outline"} size="sm" onClick={() => setFocalMode((value) => !value)}>
              <CircleDot />
              {focalMode ? "Click the subject" : "Set focal point"}
            </Button>
            {focal && (
              <>
                <span className="font-mono text-xs text-muted-foreground">{focal.x.toFixed(0)}%, {focal.y.toFixed(0)}%</span>
                <Button variant="ghost" size="sm" onClick={handleClearFocal}>
                  <RotateCcw />
                  Reset
                </Button>
              </>
            )}
            <span className="ml-auto text-xs text-muted-foreground">One focal point keeps every output framed.</span>
          </div>

          <div className="flex min-h-[380px] items-center justify-center overflow-hidden rounded-md border-2 border-foreground/20 checkerboard">
            <div className="relative inline-block">
              {activePreset && (
                <ReactCrop
                  crop={activeCrop}
                  onChange={handleCropChange}
                  aspect={activePreset.aspectRatio}
                  minWidth={50}
                  minHeight={50}
                  disabled={focalMode}
                  className="max-h-[70vh]"
                >
                  {/* ReactCrop needs the measured DOM image to keep crop coordinates aligned with Canvas export. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imgRef}
                    src={imageUrl}
                    alt="Export pack crop preview"
                    style={{ maxHeight: "70vh", maxWidth: "100%", width: "auto", height: "auto" }}
                  />
                </ReactCrop>
              )}
              {focalMode && <div className="absolute inset-0 z-10 cursor-crosshair" onClick={handleImageClick} />}
              {focal && !focalMode && (
                <div className="pointer-events-none absolute z-10 size-6 rounded-full border-2 border-primary bg-primary/30" style={{ left: `${focal.x}%`, top: `${focal.y}%`, transform: "translate(-50%, -50%)" }} />
              )}
            </div>
          </div>
          {activePreset && <p className="text-center text-xs text-muted-foreground">Adjusting {activePreset.name} only. Other outputs continue to use the shared focal point.</p>}
        </div>

        <aside className="space-y-4 xl:sticky xl:top-20 xl:self-start">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">Start with a pack</p>
            <div className="grid gap-2">
              {exportPacks.map((pack) => (
                <button
                  key={pack.id}
                  type="button"
                  onClick={() => handlePackSelect(pack)}
                  className={`rounded-md border p-3 text-left transition-colors ${activePackId === pack.id ? "border-foreground bg-muted" : "border-border hover:bg-muted/50"}`}
                >
                  <span className="block text-sm font-medium">{pack.name}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{pack.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Outputs</p>
              <span className="font-mono text-xs text-muted-foreground">{selectedPresets.length} selected</span>
            </div>
            <div className="space-y-1.5">
              {exportPacks.flatMap((pack) => pack.presets).map((preset) => {
                const checked = selectedPresetIds.includes(preset.id);
                return (
                  <div key={preset.id} className={`flex items-center gap-2 rounded-md border p-2.5 transition-colors ${activePresetId === preset.id ? "border-foreground bg-muted/60" : "border-border hover:bg-muted/40"}`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => handlePresetToggle(preset, event.target.checked)}
                      className="size-4 accent-foreground"
                      aria-label={`Include ${preset.name} in export`}
                    />
                    <button
                      type="button"
                      className="min-w-0 flex-1 text-left disabled:cursor-not-allowed"
                      onClick={() => setActivePresetId(preset.id)}
                      disabled={!checked}
                      aria-label={`Adjust ${preset.name}`}
                    >
                      <span className="block truncate text-sm">{preset.name}</span>
                      <span className="block font-mono text-[11px] text-muted-foreground">{preset.width} x {preset.height}</span>
                    </button>
                    {checked && <Check className="size-4 text-muted-foreground" aria-hidden="true" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 rounded-md border bg-muted/30 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium">Export {selectedPresets.length} files as ZIP</p>
              <span className="font-mono text-xs text-muted-foreground">{format.toUpperCase()}</span>
            </div>
            <div className="flex overflow-hidden rounded-md border border-border">
              {formats.map((item) => (
                <button key={item.value} type="button" onClick={() => setFormat(item.value)} className={`flex-1 px-2 py-1.5 text-xs font-medium ${format === item.value ? "bg-foreground text-background" : "bg-background text-muted-foreground hover:text-foreground"}`}>
                  {item.label}
                </button>
              ))}
            </div>
            {format !== "png" && (
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                Quality <input type="range" min={10} max={100} value={quality} onChange={(event) => setQuality(Number(event.target.value))} className="min-w-0 flex-1 accent-foreground" /> {quality}%
              </label>
            )}
            <Button className="w-full" size="lg" onClick={handleDownload} disabled={!canDownload || isExporting}>
              <Download />
              {isExporting ? "Creating export pack..." : "Download export pack"}
            </Button>
          </div>
        </aside>
      </div>
      <TrustBadges />
    </div>
  );
}
