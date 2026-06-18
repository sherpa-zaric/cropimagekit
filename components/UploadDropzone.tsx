"use client";

import { useCallback, useRef, useState, type DragEvent } from "react";
import { getAcceptedImageTypes } from "@/lib/imageUtils";

interface UploadDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  multiple?: boolean;
}

export default function UploadDropzone({
  onFilesSelected,
  multiple = false,
}: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith("image/")
      );
      if (files.length > 0) {
        onFilesSelected(multiple ? files : [files[0]]);
      }
    },
    [onFilesSelected, multiple]
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        onFilesSelected(multiple ? files : [files[0]]);
      }
      e.target.value = "";
    },
    [onFilesSelected, multiple]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const imageFiles: File[] = [];
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) imageFiles.push(file);
        }
      }
      if (imageFiles.length > 0) {
        e.preventDefault();
        onFilesSelected(multiple ? imageFiles : [imageFiles[0]]);
      }
    },
    [onFilesSelected, multiple]
  );

  return (
    <div
      className={`relative border rounded-lg p-10 sm:p-14 text-center cursor-pointer transition-colors ${
        isDragging
          ? "border-foreground bg-muted"
          : "border-border hover:border-foreground/30"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      onPaste={handlePaste}
      tabIndex={0}
      role="button"
      aria-label="Upload image"
    >
      <input
        ref={inputRef}
        type="file"
        accept={getAcceptedImageTypes()}
        multiple={multiple}
        onChange={handleInputChange}
        className="hidden"
      />

      <div className="flex flex-col items-center gap-3">
        <svg
          className="w-10 h-10 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>

        <div>
          <p className="font-medium">
            {multiple
              ? "Drop images here or click to upload"
              : "Drop an image here or click to upload"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            JPG, PNG, WebP, AVIF, GIF — or paste from clipboard
          </p>
          <p className="text-[11px] text-muted-foreground mt-2">
            Private by default · No upload · No watermark
          </p>
        </div>
      </div>
    </div>
  );
}
