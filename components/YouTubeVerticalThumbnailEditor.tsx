"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { CircleDot, MonitorPlay, RotateCcw, Smartphone, TriangleAlert, X } from "lucide-react";
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

interface ThumbnailTarget {
  id: string;
  name: string;
  context: string;
  width: number;
  height: number;
}

interface CroppedPreviewProps {
  imageUrl: string;
  crop: Crop | undefined;
  target: ThumbnailTarget;
  focal: FocalPoint | null;
  active: boolean;
  onSelect: () => void;
}

const thumbnailTargets: ThumbnailTarget[] = [
  { id: "watch-16x9", name: "16:9 custom thumbnail", context: "Watch page and desktop previews", width: 1280, height: 720 },
  { id: "home-4x5", name: "4:5 vertical fallback", context: "Home, Explore, and Subscriptions", width: 1080, height: 1350 },
];

function getTarget(id: string): ThumbnailTarget {
  return thumbnailTargets.find((target) => target.id === id) ?? thumbnailTargets[0];
}

function createCrop(target: ThumbnailTarget, image: HTMLImageElement, focal: FocalPoint | null): Crop {
  const ratio = target.width / target.height;
  return focal
    ? calculateFocalCrop(focal.x, focal.y, ratio, image.naturalWidth, image.naturalHeight)
    : calculateInitialCrop(ratio, image.naturalWidth, image.naturalHeight);
}

function thumbnailFileName(name: string, target: ThumbnailTarget, format: ExportFormat): string {
  const base = name.replace(/\.[^.]+$/, "") || "youtube-thumbnail";
  const extension = format === "jpg" ? "jpg" : format;
  return `${base}-${target.id}.${extension}`;
}

function CroppedPreview({ imageUrl, crop, target, focal, active, onSelect }: CroppedPreviewProps) {
  const previewStyle = crop ? {
    width: `${10000 / crop.width}%`,
    height: `${10000 / crop.height}%`,
    left: `-${(crop.x / crop.width) * 100}%`,
    top: `-${(crop.y / crop.height) * 100}%`,
  } : undefined;
  const focalStyle = crop && focal ? {
    left: `${((focal.x - crop.x) / crop.width) * 100}%`,
    top: `${((focal.y - crop.y) / crop.height) * 100}%`,
  } : undefined;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-md border p-3 text-left transition-colors ${active ? "border-foreground bg-muted/50" : "border-border hover:bg-muted/40"}`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium">{target.name}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{target.context}</p>
        </div>
        <span className="shrink-0 font-mono text-[11px] text-muted-foreground">{target.width} x {target.height}</span>
      </div>
      <div className="relative overflow-hidden rounded-[4px] bg-muted" style={{ aspectRatio: `${target.width} / ${target.height}` }}>
        {/* This is positioned from the exact percentage crop used for Canvas export. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt={`${target.name} preview`} className="absolute max-w-none" style={previewStyle} />
        {focalStyle && <span className="pointer-events-none absolute z-10 size-3 rounded-full border-2 border-white bg-primary shadow-sm" style={{ ...focalStyle, transform: "translate(-50%, -50%)" }} />}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{active ? "Adjust this version below" : "Click to adjust this version"}</p>
    </button>
  );
}

export default function YouTubeVerticalThumbnailEditor() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);
  const [activeTargetId, setActiveTargetId] = useState(thumbnailTargets[0].id);
  const [cropsByTarget, setCropsByTarget] = useState<Record<string, Crop>>({});
  const [focal, setFocal] = useState<FocalPoint | null>(null);
  const [focalMode, setFocalMode] = useState(false);
  const [format, setFormat] = useState<ExportFormat>("jpg");
  const [quality, setQuality] = useState(92);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const activeTarget = useMemo(() => getTarget(activeTargetId), [activeTargetId]);
  const activeCrop = cropsByTarget[activeTarget.id];
  const pixelCrop = activeCrop && imageElement
    ? percentCropToPixelCrop(activeCrop, imageElement.naturalWidth, imageElement.naturalHeight)
    : null;
  const fileSize = useFileSizeEstimate(imageElement, pixelCrop, format, quality);

  const createCrops = useCallback((image: HTMLImageElement, nextFocal: FocalPoint | null) => {
    const next: Record<string, Crop> = {};
    for (const target of thumbnailTargets) next[target.id] = createCrop(target, image, nextFocal);
    setCropsByTarget(next);
  }, []);

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
        createCrops(image, null);
      })
      .catch((error) => {
        console.error("Failed to load image:", error);
        alert("Failed to load image. Please try a different file.");
      });
  }, [createCrops, imageUrl]);

  const handleImageClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (!focalMode || !imgRef.current || !imageElement) return;

    const rect = imgRef.current.getBoundingClientRect();
    const nextFocal = {
      x: Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100)),
      y: Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100)),
    };
    setFocal(nextFocal);
    setFocalMode(false);
    createCrops(imageElement, nextFocal);
  }, [createCrops, focalMode, imageElement]);

  const handleClearFocal = useCallback(() => {
    setFocal(null);
    if (imageElement) createCrops(imageElement, null);
  }, [createCrops, imageElement]);

  const handleCropChange = useCallback((_: Crop, nextCrop: Crop) => {
    setCropsByTarget((current) => ({ ...current, [activeTarget.id]: nextCrop }));
  }, [activeTarget.id]);

  const handleDownload = useCallback(async () => {
    if (!imageElement || !imageFile || !isValidCrop(activeCrop)) return;
    try {
      const nextPixelCrop = percentCropToPixelCrop(activeCrop, imageElement.naturalWidth, imageElement.naturalHeight);
      const blob = await exportCroppedImage(imageElement, nextPixelCrop, {
        format,
        quality,
        width: activeTarget.width,
        height: activeTarget.height,
      });
      saveAs(blob, thumbnailFileName(imageFile.name, activeTarget, format));
    } catch (error) {
      console.error("Failed to export thumbnail:", error);
    }
  }, [activeCrop, activeTarget, format, imageElement, imageFile, quality]);

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
            setCropsByTarget({});
          }}
        >
          <X />
          Replace image
        </Button>
      </div>

      <div className="rounded-md border border-amber-300/70 bg-amber-50/70 p-3 text-sm text-amber-950 dark:border-amber-500/30 dark:bg-amber-950/20 dark:text-amber-100">
        <div className="flex gap-2">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" />
          <p>For vertical videos, a 16:9 custom thumbnail can be replaced by a 4:5 thumbnail on YouTube Home, Explore, and Subscriptions. Compare both crops before publishing.</p>
        </div>
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        {thumbnailTargets.map((target) => (
          <CroppedPreview
            key={target.id}
            imageUrl={imageUrl}
            crop={cropsByTarget[target.id]}
            target={target}
            focal={focal}
            active={activeTarget.id === target.id}
            onSelect={() => setActiveTargetId(target.id)}
          />
        ))}
      </section>

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
            <span className="ml-auto text-xs text-muted-foreground">The focal point is re-applied to both versions.</span>
          </div>

          <div className="flex min-h-[420px] items-center justify-center overflow-hidden rounded-md border-2 border-foreground/20 checkerboard">
            <div className="relative inline-block">
              <ReactCrop
                crop={activeCrop}
                onChange={handleCropChange}
                aspect={activeTarget.width / activeTarget.height}
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
                  alt={`${activeTarget.name} crop editor`}
                  style={{ maxHeight: "70vh", maxWidth: "100%", width: "auto", height: "auto" }}
                />
              </ReactCrop>
              {focalMode && <div className="absolute inset-0 z-10 cursor-crosshair" onClick={handleImageClick} />}
              {focal && !focalMode && <div className="pointer-events-none absolute z-10 size-6 rounded-full border-2 border-primary bg-primary/30" style={{ left: `${focal.x}%`, top: `${focal.y}%`, transform: "translate(-50%, -50%)" }} />}
            </div>
          </div>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-20 xl:self-start">
          <div className="rounded-md border p-4">
            <div className="flex items-start gap-2">
              {activeTarget.id === "watch-16x9" ? <MonitorPlay className="mt-0.5 size-4" /> : <Smartphone className="mt-0.5 size-4" />}
              <div>
                <p className="text-sm font-medium">Editing {activeTarget.name}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">Changes here affect only this preview. Switch cards to tune the other crop.</p>
              </div>
            </div>
          </div>

          <ExportPanel
            format={format}
            quality={quality}
            onFormatChange={setFormat}
            onQualityChange={setQuality}
            onDownload={handleDownload}
            disabled={!isValidCrop(activeCrop)}
            outputWidth={activeTarget.width}
            outputHeight={activeTarget.height}
            presetName={activeTarget.name}
            cropRatio={activeTarget.id === "watch-16x9" ? "16:9" : "4:5"}
            fileSize={fileSize}
          />
        </aside>
      </div>
      <TrustBadges />
    </div>
  );
}
