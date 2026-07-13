"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { CircleDot, Info, MonitorSmartphone, RotateCcw, ShieldCheck, X } from "lucide-react";
import { saveAs } from "file-saver";

import ExportPanel from "@/components/ExportPanel";
import TrustBadges from "@/components/TrustBadges";
import UploadDropzone from "@/components/UploadDropzone";
import { Button } from "@/components/ui/button";
import {
  calculateFocalCrop,
  calculateInitialCrop,
  exportCroppedImage,
  isValidCrop,
  percentCropToPixelCrop,
} from "@/lib/cropImage";
import { getImageUrl, loadImageFromFile, revokeImageUrl } from "@/lib/imageUtils";
import type { ExportFormat } from "@/lib/siteConfig";
import { useFileSizeEstimate } from "@/hooks/useFileSizeEstimate";

interface FocalPoint {
  x: number;
  y: number;
}

interface PlatformTarget {
  id: string;
  name: string;
  placement: string;
  width: number;
  height: number;
  safeArea: { top: number; right: number; bottom: number; left: number };
  description: string;
}

const targets: PlatformTarget[] = [
  {
    id: "instagram-feed",
    name: "Instagram Feed",
    placement: "4:5 portrait post",
    width: 1080,
    height: 1350,
    safeArea: { top: 5, right: 5, bottom: 5, left: 5 },
    description: "Keep the subject away from the outer crop edge for a calmer feed preview.",
  },
  {
    id: "instagram-story",
    name: "Instagram Story",
    placement: "9:16 full-screen story",
    width: 1080,
    height: 1920,
    safeArea: { top: 12, right: 8, bottom: 18, left: 8 },
    description: "Leave room for profile details at the top and reply controls at the bottom.",
  },
  {
    id: "tiktok-cover",
    name: "TikTok Cover",
    placement: "9:16 video cover",
    width: 1080,
    height: 1920,
    safeArea: { top: 10, right: 18, bottom: 16, left: 8 },
    description: "Keep the main subject clear of the typical caption and action-control areas.",
  },
  {
    id: "youtube-thumbnail",
    name: "YouTube Thumbnail",
    placement: "16:9 video thumbnail",
    width: 1280,
    height: 720,
    safeArea: { top: 5, right: 5, bottom: 5, left: 5 },
    description: "A wide preview for checking whether the subject survives a small recommendation tile.",
  },
  {
    id: "linkedin-banner",
    name: "LinkedIn Banner",
    placement: "4:1 profile banner",
    width: 1584,
    height: 396,
    safeArea: { top: 8, right: 8, bottom: 8, left: 25 },
    description: "Reserve the left side for the profile-photo overlap in this profile-banner preview.",
  },
];

function getTarget(id: string): PlatformTarget {
  return targets.find((target) => target.id === id) ?? targets[0];
}

function createCrop(target: PlatformTarget, image: HTMLImageElement, focal: FocalPoint | null): Crop {
  const ratio = target.width / target.height;
  return focal
    ? calculateFocalCrop(focal.x, focal.y, ratio, image.naturalWidth, image.naturalHeight)
    : calculateInitialCrop(ratio, image.naturalWidth, image.naturalHeight);
}

function targetFileName(name: string, target: PlatformTarget, format: ExportFormat): string {
  const base = name.replace(/\.[^.]+$/, "") || "image";
  const extension = format === "jpg" ? "jpg" : format;
  return `${base}-${target.id}.${extension}`;
}

export default function SocialSafeZoneEditor() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);
  const [targetId, setTargetId] = useState(targets[0].id);
  const [crop, setCrop] = useState<Crop>();
  const [focal, setFocal] = useState<FocalPoint | null>(null);
  const [focalMode, setFocalMode] = useState(false);
  const [format, setFormat] = useState<ExportFormat>("jpg");
  const [quality, setQuality] = useState(92);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const target = useMemo(() => getTarget(targetId), [targetId]);
  const pixelCrop = crop && imageElement
    ? percentCropToPixelCrop(crop, imageElement.naturalWidth, imageElement.naturalHeight)
    : null;
  const fileSize = useFileSizeEstimate(imageElement, pixelCrop, format, quality);

  const focusIsSafe = useMemo(() => {
    if (!focal || !crop) return null;
    const x = ((focal.x - crop.x) / crop.width) * 100;
    const y = ((focal.y - crop.y) / crop.height) * 100;
    const { top, right, bottom, left } = target.safeArea;
    return x >= left && x <= 100 - right && y >= top && y <= 100 - bottom;
  }, [crop, focal, target.safeArea]);

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
        setCrop(createCrop(target, image, null));
      })
      .catch((error) => {
        console.error("Failed to load image:", error);
        alert("Failed to load image. Please try a different file.");
      });
  }, [imageUrl, target]);

  const handleTargetSelect = useCallback((nextTarget: PlatformTarget) => {
    setTargetId(nextTarget.id);
    if (imageElement) setCrop(createCrop(nextTarget, imageElement, focal));
  }, [focal, imageElement]);

  const handleImageClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (!focalMode || !imgRef.current || !imageElement) return;

    const rect = imgRef.current.getBoundingClientRect();
    const nextFocal = {
      x: Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100)),
      y: Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100)),
    };
    setFocal(nextFocal);
    setFocalMode(false);
    setCrop(createCrop(target, imageElement, nextFocal));
  }, [focalMode, imageElement, target]);

  const handleClearFocal = useCallback(() => {
    setFocal(null);
    if (imageElement) setCrop(createCrop(target, imageElement, null));
  }, [imageElement, target]);

  const handleDownload = useCallback(async () => {
    if (!imageElement || !imageFile || !isValidCrop(crop)) return;
    try {
      const nextPixelCrop = percentCropToPixelCrop(crop, imageElement.naturalWidth, imageElement.naturalHeight);
      const blob = await exportCroppedImage(imageElement, nextPixelCrop, {
        format,
        quality,
        width: target.width,
        height: target.height,
      });
      saveAs(blob, targetFileName(imageFile.name, target, format));
    } catch (error) {
      console.error("Failed to export image:", error);
    }
  }, [crop, format, imageElement, imageFile, quality, target]);

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

  const previewStyle = crop ? {
    width: `${10000 / crop.width}%`,
    height: `${10000 / crop.height}%`,
    left: `-${(crop.x / crop.width) * 100}%`,
    top: `-${(crop.y / crop.height) * 100}%`,
  } : undefined;
  const safeAreaStyle = {
    top: `${target.safeArea.top}%`,
    right: `${target.safeArea.right}%`,
    bottom: `${target.safeArea.bottom}%`,
    left: `${target.safeArea.left}%`,
  };

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
            setCrop(undefined);
          }}
        >
          <X />
          Replace image
        </Button>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
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
            <span className="ml-auto text-xs text-muted-foreground">Select the subject before testing a platform frame.</span>
          </div>

          <div className="flex min-h-[420px] items-center justify-center overflow-hidden rounded-md border-2 border-foreground/20 checkerboard">
            <div className="relative inline-block">
              <ReactCrop
                crop={crop}
                onChange={(_, nextCrop) => setCrop(nextCrop)}
                aspect={target.width / target.height}
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
                  alt="Social media safe zone crop preview"
                  style={{ maxHeight: "70vh", maxWidth: "100%", width: "auto", height: "auto" }}
                />
              </ReactCrop>
              {focalMode && <div className="absolute inset-0 z-10 cursor-crosshair" onClick={handleImageClick} />}
              {focal && !focalMode && <div className="pointer-events-none absolute z-10 size-6 rounded-full border-2 border-primary bg-primary/30" style={{ left: `${focal.x}%`, top: `${focal.y}%`, transform: "translate(-50%, -50%)" }} />}
            </div>
          </div>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-20 xl:self-start">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">Preview platform</p>
            <div className="grid gap-2">
              {targets.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTargetSelect(item)}
                  className={`rounded-md border p-3 text-left transition-colors ${target.id === item.id ? "border-foreground bg-muted" : "border-border hover:bg-muted/50"}`}
                >
                  <span className="block text-sm font-medium">{item.name}</span>
                  <span className="mt-1 block font-mono text-[11px] text-muted-foreground">{item.width} x {item.height} - {item.placement}</span>
                </button>
              ))}
            </div>
          </div>

          <ExportPanel
            format={format}
            quality={quality}
            onFormatChange={setFormat}
            onQualityChange={setQuality}
            onDownload={handleDownload}
            disabled={!isValidCrop(crop)}
            outputWidth={target.width}
            outputHeight={target.height}
            presetName={target.name}
            cropRatio={target.placement}
            fileSize={fileSize}
          />
        </aside>
      </div>

      <section className="grid gap-4 border-t pt-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="rounded-md border bg-muted/20 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <MonitorSmartphone className="size-4" />
              <p className="text-sm font-medium">{target.name} placement preview</p>
            </div>
            {focusIsSafe === true && <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400"><ShieldCheck className="size-4" /> Subject in guide</span>}
            {focusIsSafe === false && <span className="text-xs font-medium text-amber-700 dark:text-amber-400">Move subject inward</span>}
          </div>

          <div className="mx-auto max-w-[34rem] rounded-[6px] border bg-background p-2 shadow-sm">
            <div className="mb-2 flex items-center gap-1.5 px-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="size-1.5 rounded-full bg-foreground/50" /> Preview only
            </div>
            <div className="relative mx-auto overflow-hidden rounded-[4px] bg-muted" style={{ aspectRatio: `${target.width} / ${target.height}` }}>
              {/* This image is intentionally positioned from the exact ReactCrop percentage crop. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt={`${target.name} simulated placement`} className="absolute max-w-none" style={previewStyle} />
              <div className="pointer-events-none absolute border border-dashed border-white/90 bg-white/5" style={safeAreaStyle} />
              {focal && crop && (
                <div
                  className="pointer-events-none absolute z-10 size-3 rounded-full border-2 border-white bg-primary shadow-sm"
                  style={{
                    left: `${((focal.x - crop.x) / crop.width) * 100}%`,
                    top: `${((focal.y - crop.y) / crop.height) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="rounded-md border p-4 text-sm">
          <div className="flex items-start gap-2">
            <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <div className="space-y-2">
              <p className="font-medium">Safe-zone guidance</p>
              <p className="text-xs leading-5 text-muted-foreground">{target.description}</p>
              <p className="text-xs leading-5 text-muted-foreground">The dashed box is a practical composition guide, not an official platform certification. Check the final in-app preview before publishing.</p>
            </div>
          </div>
        </div>
      </section>
      <TrustBadges />
    </div>
  );
}
