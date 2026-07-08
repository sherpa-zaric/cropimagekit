"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Maximize2, Minimize2, ChevronRight, ChevronLeft } from "lucide-react";

import UploadDropzone from "@/components/UploadDropzone";
import ExportPanel from "@/components/ExportPanel";
import AspectRatioPicker from "@/components/AspectRatioPicker";
import PresetPicker from "@/components/PresetPicker";
import TrustBadges from "@/components/TrustBadges";

import { getImageUrl, loadImageFromFile, revokeImageUrl } from "@/lib/imageUtils";
import { calculateInitialCrop, exportCroppedImage, getOutputFileName, percentCropToPixelCrop, isValidCrop } from "@/lib/cropImage";
import { type CropPreset } from "@/lib/presets";
import type { ExportFormat } from "@/lib/siteConfig";
import { saveAs } from "file-saver";
import { useFileSizeEstimate } from "@/hooks/useFileSizeEstimate";

interface CropEditorProps {
  defaultPreset?: CropPreset;
  showPresets?: CropPreset[];
  showTrustBadges?: boolean;
  fillBackground?: string;
  showCustomDimensions?: boolean;
  customWidth?: number;
  customHeight?: number;
  onCustomDimensionChange?: (width: number, height: number) => void;
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

export default function CropEditor({
  defaultPreset,
  showPresets,
  showTrustBadges = false,
  fillBackground,
  showCustomDimensions = false,
  customWidth: propCustomWidth,
  customHeight: propCustomHeight,
  onCustomDimensionChange,
}: CropEditorProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [format, setFormat] = useState<ExportFormat>("png");
  const [quality, setQuality] = useState(92);
  const [selectedPreset, setSelectedPreset] = useState<CropPreset | null>(defaultPreset || null);
  const [localCustomWidth, setLocalCustomWidth] = useState(propCustomWidth || 800);
  const [localCustomHeight, setLocalCustomHeight] = useState(propCustomHeight || 600);
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);

  const customWidth = propCustomWidth ?? localCustomWidth;
  const customHeight = propCustomHeight ?? localCustomHeight;

  const pixelCrop = crop && imageElement
    ? percentCropToPixelCrop(crop, imageElement.naturalWidth, imageElement.naturalHeight)
    : null;
  const fileSize = useFileSizeEstimate(imageElement, pixelCrop, format, quality);

  const handleFilesSelected = useCallback(
    (files: File[]) => {
      if (files.length === 0) return;
      if (imageUrl) revokeImageUrl(imageUrl);

      const file = files[0];
      const url = getImageUrl(file);
      setImageFile(file);
      setImageUrl(url);

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

  const handlePresetSelect = useCallback((preset: CropPreset) => {
    setSelectedPreset(preset);
    if (preset.aspectRatio > 0 && imageElement) {
      setCrop(calculateInitialCrop(preset.aspectRatio, imageElement.naturalWidth, imageElement.naturalHeight));
    } else {
      setCrop(undefined);
    }
  }, [imageElement]);

  const handleCustomDimensionChange = useCallback((newWidth: number, newHeight: number) => {
    const w = Math.max(1, Math.min(8000, newWidth));
    const h = Math.max(1, Math.min(8000, newHeight));
    setLocalCustomWidth(w);
    setLocalCustomHeight(h);
    const preset: CropPreset = {
      id: "custom",
      name: "Custom",
      width: w,
      height: h,
      aspectRatio: w / h,
      category: "basic",
    };
    setSelectedPreset(preset);
    if (imageElement) {
      setCrop(calculateInitialCrop(preset.aspectRatio, imageElement.naturalWidth, imageElement.naturalHeight));
    }
    onCustomDimensionChange?.(w, h);
  }, [imageElement, onCustomDimensionChange]);

  // Sync external defaultPreset changes without remounting.
  useEffect(() => {
    if (!defaultPreset || defaultPreset.id === selectedPreset?.id) return;

    const timer = setTimeout(() => {
      handlePresetSelect(defaultPreset);
    }, 0);

    return () => clearTimeout(timer);
  }, [defaultPreset, handlePresetSelect, selectedPreset?.id]);

  // Sync external custom dimension changes.
  useEffect(() => {
    if (!showCustomDimensions || propCustomWidth == null || propCustomHeight == null) return;

    const timer = setTimeout(() => {
      const w = Math.max(1, Math.min(8000, propCustomWidth));
      const h = Math.max(1, Math.min(8000, propCustomHeight));
      const preset: CropPreset = {
        id: "custom",
        name: "Custom",
        width: w,
        height: h,
        aspectRatio: w / h,
        category: "basic",
      };
      setSelectedPreset(preset);
      if (imageElement) {
        setCrop(calculateInitialCrop(preset.aspectRatio, imageElement.naturalWidth, imageElement.naturalHeight));
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [imageElement, propCustomHeight, propCustomWidth, showCustomDimensions]);

  const handleDownload = useCallback(async () => {
    if (!imageElement || !isValidCrop(crop)) return;
    try {
      const pixelCrop = percentCropToPixelCrop(crop, imageElement.naturalWidth, imageElement.naturalHeight);
      const blob = await exportCroppedImage(imageElement, pixelCrop, {
        format, quality,
        width: selectedPreset?.width,
        height: selectedPreset?.height,
        fillBackground,
      });
      const fileName = imageFile
        ? getOutputFileName(imageFile.name, format)
        : `cropped-image.${format}`;
      saveAs(blob, fileName);
    } catch (err) {
      console.error("Failed to export image:", err);
    }
  }, [imageElement, crop, format, quality, imageFile, selectedPreset, fillBackground]);

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

  if (!imageUrl) {
    return (
      <div className="space-y-4">
        <UploadDropzone onFilesSelected={handleFilesSelected} />
        {showTrustBadges && <TrustBadges />}
      </div>
    );
  }

  const cropRatioLabel = selectedPreset ? formatRatio(selectedPreset.aspectRatio) : undefined;

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
              if (imageUrl) revokeImageUrl(imageUrl);
            }}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md px-3 py-1.5 hover:bg-muted"
          >
            Upload new image
          </button>
        </div>
      </div>

      <div className={`flex flex-col lg:flex-row gap-4 ${fullscreen ? "flex-1 min-h-0" : ""}`}>
        <div className={`flex justify-center items-center overflow-hidden border-2 border-foreground/25 rounded-lg checkerboard flex-1 ${fullscreen ? "min-h-0" : "min-h-[420px]"}`}>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            aspect={aspectRatio}
            minWidth={50} minHeight={50}
            className={fullscreen ? "max-h-[calc(100vh-7rem)]" : "max-h-[85vh]"}
          >
            <img
              ref={imgRef}
              src={imageUrl}
              alt="Crop preview"
              style={{ maxHeight: fullscreen ? "calc(100vh-7rem)" : "85vh", maxWidth: "100%", width: "auto", height: "auto", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.25))" }}
              onLoad={(e) => setImageElement(e.currentTarget)}
            />
          </ReactCrop>
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
          ) : (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Aspect ratio</p>
              <AspectRatioPicker selectedPreset={selectedPreset} onSelect={handlePresetSelect} />
            </div>
          )}

          {showCustomDimensions && (
            <div className="rounded-lg border bg-muted/40 p-3 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Custom dimensions</p>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="text-[10px] text-muted-foreground">W</label>
                  <input
                    type="number"
                    min={1}
                    max={8000}
                    value={customWidth}
                    onChange={(e) => handleCustomDimensionChange(Number(e.target.value), customHeight)}
                    className="w-full rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <span className="text-muted-foreground pt-4 text-sm">×</span>
                <div className="flex-1">
                  <label className="text-[10px] text-muted-foreground">H</label>
                  <input
                    type="number"
                    min={1}
                    max={8000}
                    value={customHeight}
                    onChange={(e) => handleCustomDimensionChange(customWidth, Number(e.target.value))}
                    className="w-full rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground">
                {customWidth} × {customHeight} px · {(customWidth / customHeight).toFixed(2)}
              </p>
            </div>
          )}

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
