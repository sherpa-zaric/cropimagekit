"use client";

import { useState, useCallback, useRef, useEffect, type MouseEvent } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Maximize2, Minimize2, ChevronRight, ChevronLeft } from "lucide-react";

import UploadDropzone from "@/components/UploadDropzone";
import ExportPanel from "@/components/ExportPanel";
import PresetPicker from "@/components/PresetPicker";
import TrustBadges from "@/components/TrustBadges";

import { getImageUrl, loadImageFromFile, revokeImageUrl } from "@/lib/imageUtils";
import {
  calculateInitialCrop,
  calculateFocalCrop,
  exportCroppedImage,
  getOutputFileName,
  percentCropToPixelCrop,
  isValidCrop,
} from "@/lib/cropImage";
import { type CropPreset } from "@/lib/presets";
import type { ExportFormat } from "@/lib/siteConfig";
import { saveAs } from "file-saver";
import { useFileSizeEstimate } from "@/hooks/useFileSizeEstimate";

interface SmartCropEditorProps {
  defaultPreset?: CropPreset;
  showPresets?: CropPreset[];
  showTrustBadges?: boolean;
}

interface FocalPoint {
  x: number;
  y: number;
}

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
  ];
  for (const [a, b, v] of ratios) {
    if (Math.abs(v - r) < 0.001) return `${a}:${b}`;
  }
  return r.toFixed(2);
}

export default function SmartCropEditor({
  defaultPreset,
  showPresets,
  showTrustBadges = false,
}: SmartCropEditorProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [format, setFormat] = useState<ExportFormat>("png");
  const [quality, setQuality] = useState(92);
  const [selectedPreset, setSelectedPreset] = useState<CropPreset | null>(defaultPreset || null);
  const [focal, setFocal] = useState<FocalPoint | null>(null);
  const [focalMode, setFocalMode] = useState(false);
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);

  const pixelCrop = crop && imageElement
    ? percentCropToPixelCrop(crop, imageElement.naturalWidth, imageElement.naturalHeight)
    : null;
  const fileSize = useFileSizeEstimate(imageElement, pixelCrop, format, quality);

  const recomputeCrop = useCallback(
    (preset: CropPreset, img: HTMLImageElement) => {
      if (focal && preset.aspectRatio > 0) {
        return setCrop(calculateFocalCrop(focal.x, focal.y, preset.aspectRatio, img.naturalWidth, img.naturalHeight));
      }
      if (preset.aspectRatio > 0) {
        setCrop(calculateInitialCrop(preset.aspectRatio, img.naturalWidth, img.naturalHeight));
      } else {
        setCrop(undefined);
      }
    },
    [focal]
  );

  const handleFilesSelected = useCallback(
    (files: File[]) => {
      if (files.length === 0) return;
      if (imageUrl) revokeImageUrl(imageUrl);

      const file = files[0];
      const url = getImageUrl(file);
      setImageFile(file);
      setImageUrl(url);
      setFocal(null);
      setFocalMode(false);

      loadImageFromFile(file)
        .then((img) => {
          setImageElement(img);
          if (selectedPreset && selectedPreset.aspectRatio > 0) {
            setCrop(calculateInitialCrop(selectedPreset.aspectRatio, img.naturalWidth, img.naturalHeight));
          } else {
            setCrop(undefined);
          }
        })
        .catch((err) => {
          console.error("Failed to load image:", err);
          alert("Failed to load image. Please try a different file.");
        });
    },
    [imageUrl, selectedPreset]
  );

  const handlePresetSelect = useCallback(
    (preset: CropPreset) => {
      setSelectedPreset(preset);
      if (imageElement) recomputeCrop(preset, imageElement);
      else setCrop(undefined);
    },
    [imageElement, recomputeCrop]
  );

  const handleImageClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!focalMode || !imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const x = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
      const y = Math.max(0, Math.min(100, (clickY / rect.height) * 100));
      setFocal({ x, y });
      setFocalMode(false);
      if (selectedPreset && selectedPreset.aspectRatio > 0 && imageElement) {
        setCrop(calculateFocalCrop(x, y, selectedPreset.aspectRatio, imageElement.naturalWidth, imageElement.naturalHeight));
      }
    },
    [focalMode, selectedPreset, imageElement]
  );

  const handleClearFocal = useCallback(() => {
    setFocal(null);
    if (selectedPreset && selectedPreset.aspectRatio > 0 && imageElement) {
      setCrop(calculateInitialCrop(selectedPreset.aspectRatio, imageElement.naturalWidth, imageElement.naturalHeight));
    }
  }, [selectedPreset, imageElement]);

  const handleDownload = useCallback(async () => {
    if (!imageElement || !isValidCrop(crop)) return;
    try {
      const px = percentCropToPixelCrop(crop, imageElement.naturalWidth, imageElement.naturalHeight);
      const blob = await exportCroppedImage(imageElement, px, {
        format,
        quality,
        width: selectedPreset?.width,
        height: selectedPreset?.height,
      });
      const fileName = imageFile ? getOutputFileName(imageFile.name, format) : `cropped-image.${format}`;
      saveAs(blob, fileName);
    } catch (err) {
      console.error("Failed to export image:", err);
    }
  }, [imageElement, crop, format, quality, imageFile, selectedPreset]);

  useEffect(() => {
    return () => {
      if (imageUrl) revokeImageUrl(imageUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!fullscreen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [fullscreen]);

  const aspectRatio = selectedPreset?.aspectRatio ? selectedPreset.aspectRatio : undefined;
  const outputWidth = selectedPreset?.width;
  const outputHeight = selectedPreset?.height;
  const cropRatioLabel = selectedPreset ? formatRatio(selectedPreset.aspectRatio) : undefined;

  if (!imageUrl) {
    return (
      <div className="space-y-4">
        <UploadDropzone onFilesSelected={handleFilesSelected} />
        {showTrustBadges && <TrustBadges />}
      </div>
    );
  }

  return (
    <div className={fullscreen ? "fixed inset-0 z-50 bg-background p-4 flex flex-col gap-3" : "space-y-3"}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground truncate">
          {imageFile?.name}
          {imageElement && (
            <span className="ml-2 font-mono">
              {imageElement.naturalWidth}×{imageElement.naturalHeight}
            </span>
          )}
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setPanelCollapsed((c) => !c)}
            className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title={panelCollapsed ? "Show panel" : "Hide panel"}
            aria-label={panelCollapsed ? "Show panel" : "Hide panel"}
          >
            {panelCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
          <button
            onClick={() => setFullscreen((f) => !f)}
            className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button
            onClick={() => {
              setImageUrl(null); setImageFile(null); setImageElement(null);
              setFocal(null); setFocalMode(false);
              if (imageUrl) revokeImageUrl(imageUrl);
            }}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md px-3 py-1.5 hover:bg-muted"
          >
            Upload new image
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/40 p-3 text-sm">
        <button
          onClick={() => setFocalMode((m) => !m)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors border ${
            focalMode
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background hover:bg-muted border-border"
          }`}
        >
          {focalMode ? "Click on the subject…" : "Set focal point"}
        </button>
        {focal && (
          <>
            <span className="text-xs text-muted-foreground font-mono">
              focal {focal.x.toFixed(1)}%, {focal.y.toFixed(1)}%
            </span>
            <button
              onClick={handleClearFocal}
              className="rounded-md px-3 py-1.5 text-sm border border-border bg-background hover:bg-muted transition-colors"
            >
              Clear focal point
            </button>
          </>
        )}
        <span className="ml-auto text-xs text-muted-foreground">
          Lock the subject; switching ratio keeps it centered.
        </span>
      </div>

      <div className={`flex flex-col lg:flex-row gap-4 ${fullscreen ? "flex-1 min-h-0" : ""}`}>
        <div className={`flex justify-center items-center overflow-hidden border-2 border-foreground/25 rounded-lg checkerboard flex-1 ${fullscreen ? "min-h-0" : "min-h-[420px]"}`}>
          <div className="relative inline-block">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              aspect={aspectRatio}
              minWidth={50}
              minHeight={50}
              className={fullscreen ? "max-h-[calc(100vh-7rem)]" : "max-h-[85vh]"}
              disabled={focalMode}
            >
              <img
                ref={imgRef}
                src={imageUrl}
                alt="Crop preview"
                style={{ maxHeight: fullscreen ? "calc(100vh-7rem)" : "85vh", maxWidth: "100%", width: "auto", height: "auto", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.25))" }}
                onLoad={(e) => setImageElement(e.currentTarget)}
              />
            </ReactCrop>
            {focalMode && (
              <div
                className="absolute inset-0 z-10"
                style={{ cursor: "crosshair" }}
                onClick={handleImageClick}
              />
            )}
            {focal && !focalMode && (
              <div
                className="absolute pointer-events-none z-10"
                style={{
                  left: `${focal.x}%`,
                  top: `${focal.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="relative w-6 h-6 rounded-full border-2 border-primary bg-primary/30">
                  <div className="absolute top-1/2 left-1/2 w-3 h-px bg-primary -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-1/2 left-1/2 h-3 w-px bg-primary -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}
          </div>
        </div>

        {!panelCollapsed && (
        <div className={`lg:w-64 shrink-0 space-y-4 ${fullscreen ? "" : "lg:sticky lg:top-20 lg:self-start"}`}>
          {showPresets && showPresets.length > 0 ? (
            <PresetPicker
              presets={showPresets}
              selectedPreset={selectedPreset}
              onSelect={handlePresetSelect}
              label="Choose a preset"
            />
          ) : null}

          <ExportPanel
            format={format}
            quality={quality}
            onFormatChange={setFormat}
            onQualityChange={setQuality}
            onDownload={handleDownload}
            disabled={!isValidCrop(crop)}
            outputWidth={outputWidth}
            outputHeight={outputHeight}
            outputIsCropArea={!outputWidth && !outputHeight}
            presetName={selectedPreset?.name}
            cropRatio={cropRatioLabel}
            fileSize={fileSize}
          />
        </div>
        )}
      </div>

      {showTrustBadges && !fullscreen && (
        <div className="pt-1">
          <TrustBadges />
        </div>
      )}
    </div>
  );
}