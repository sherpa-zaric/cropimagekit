"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import UploadDropzone from "@/components/UploadDropzone";
import ExportPanel from "@/components/ExportPanel";
import PresetPicker from "@/components/PresetPicker";
import TrustBadges from "@/components/TrustBadges";

import { getImageUrl, loadImageFromFile, revokeImageUrl } from "@/lib/imageUtils";
import { calculateInitialCrop, exportCroppedOvalImage, getOutputFileName, percentCropToPixelCrop, isValidCrop } from "@/lib/cropImage";
import { ovalPresets, type CropPreset } from "@/lib/presets";
import type { ExportFormat } from "@/lib/siteConfig";
import { saveAs } from "file-saver";
import { useFileSizeEstimate } from "@/hooks/useFileSizeEstimate";

interface OvalCropEditorProps {
  showTrustBadges?: boolean;
}

export default function OvalCropEditor({
  showTrustBadges = false,
}: OvalCropEditorProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [format, setFormat] = useState<ExportFormat>("png");
  const [quality, setQuality] = useState(92);
  const [selectedPreset, setSelectedPreset] = useState<CropPreset | null>(null);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const pixelCrop = crop && imageElement
    ? percentCropToPixelCrop(crop, imageElement.naturalWidth, imageElement.naturalHeight)
    : null;
  const fileSize = useFileSizeEstimate(imageElement, pixelCrop, format, quality);

  const aspectRatio = selectedPreset?.aspectRatio ?? 1;

  const updatePreview = useCallback(() => {
    if (!imageElement || !isValidCrop(crop) || !previewCanvasRef.current) return;
    const pixelCrop = percentCropToPixelCrop(crop, imageElement.naturalWidth, imageElement.naturalHeight);

    const maxPreview = 120;
    let previewW = maxPreview;
    let previewH = maxPreview;
    if (aspectRatio >= 1) {
      previewW = maxPreview;
      previewH = maxPreview / aspectRatio;
    } else {
      previewH = maxPreview;
      previewW = maxPreview * aspectRatio;
    }
    previewW = Math.round(previewW);
    previewH = Math.round(previewH);

    const canvas = previewCanvasRef.current;
    canvas.width = previewW;
    canvas.height = previewH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, previewW, previewH);
    ctx.beginPath();
    ctx.ellipse(previewW / 2, previewH / 2, previewW / 2, previewH / 2, 0, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    const srcSize = Math.min(pixelCrop.width, pixelCrop.height);
    ctx.drawImage(
      imageElement,
      pixelCrop.x, pixelCrop.y, srcSize, srcSize,
      0, 0, previewW, previewH
    );
  }, [imageElement, crop, aspectRatio]);

  useEffect(() => {
    updatePreview();
  }, [updatePreview]);

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
          const ar = selectedPreset?.aspectRatio ?? 1;
          setCrop(calculateInitialCrop(ar, img.naturalWidth, img.naturalHeight));
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
    if (imageElement) {
      setCrop(calculateInitialCrop(preset.aspectRatio, imageElement.naturalWidth, imageElement.naturalHeight));
    }
  }, [imageElement]);

  const handleDownload = useCallback(async () => {
    if (!imageElement || !isValidCrop(crop)) return;
    try {
      const pixelCrop = percentCropToPixelCrop(crop, imageElement.naturalWidth, imageElement.naturalHeight);
      const blob = await exportCroppedOvalImage(imageElement, pixelCrop, {
        format, quality,
        width: selectedPreset?.width,
        height: selectedPreset?.height,
      });
      const fileName = imageFile
        ? getOutputFileName(imageFile.name, format)
        : `oval-crop.${format}`;
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

  const cropRatioLabel = selectedPreset ? `${selectedPreset.name}` : undefined;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground truncate">
          {imageFile?.name}
          {imageElement && (
            <span className="ml-2 font-mono">
              {imageElement.naturalWidth}×{imageElement.naturalHeight}
            </span>
          )}
        </p>
        <button
          onClick={() => {
            setImageUrl(null); setImageFile(null); setImageElement(null);
            if (imageUrl) revokeImageUrl(imageUrl);
          }}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors shrink-0 border border-border rounded-md px-3 py-1 hover:bg-muted"
        >
          Upload new image
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex justify-center items-center overflow-hidden min-h-[360px] bg-muted/20 rounded-lg flex-1">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            aspect={aspectRatio > 0 ? aspectRatio : undefined}
            minWidth={50} minHeight={50}
            circularCrop
            className="max-h-[85vh]"
          >
            <img
              ref={imgRef}
              src={imageUrl}
              alt="Crop preview"
              style={{ maxHeight: "85vh", maxWidth: "100%", width: "auto", height: "auto" }}
              onLoad={(e) => setImageElement(e.currentTarget)}
            />
          </ReactCrop>
        </div>

        <div className="lg:w-64 shrink-0 space-y-4 lg:sticky lg:top-20 lg:self-start">
          <PresetPicker
            presets={ovalPresets}
            selectedPreset={selectedPreset}
            onSelect={handlePresetSelect}
            label="Oval shape"
          />

          <div className="flex items-center gap-3">
            <canvas
              ref={previewCanvasRef}
              className="rounded-full border border-border bg-transparent"
              style={{ width: 60, height: 60 }}
            />
            <span className="text-xs text-muted-foreground">Preview</span>
          </div>

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
            note="Oval crop"
            fileSize={fileSize}
          />
        </div>
      </div>

      {showTrustBadges && (
        <div className="pt-1">
          <TrustBadges />
        </div>
      )}
    </div>
  );
}
