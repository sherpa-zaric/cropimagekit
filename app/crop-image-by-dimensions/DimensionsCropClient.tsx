"use client";

import { useState, useMemo } from "react";
import CropEditor from "@/components/CropEditor";
import { type CropPreset } from "@/lib/presets";

const dimensionPresets: CropPreset[] = [
  { id: "dim-1920x1080", name: "1920 × 1080", width: 1920, height: 1080, aspectRatio: 1920 / 1080, category: "basic", description: "Full HD landscape" },
  { id: "dim-1200x628", name: "1200 × 628", width: 1200, height: 628, aspectRatio: 1200 / 628, category: "basic", description: "Social share / OG image" },
  { id: "dim-800x600", name: "800 × 600", width: 800, height: 600, aspectRatio: 800 / 600, category: "basic", description: "Standard landscape" },
  { id: "dim-1200x1200", name: "1200 × 1200", width: 1200, height: 1200, aspectRatio: 1, category: "basic", description: "Square promo" },
  { id: "dim-500x500", name: "500 × 500", width: 500, height: 500, aspectRatio: 1, category: "basic", description: "Small square thumbnail" },
];

export default function DimensionsCropClient() {
  const [customWidth, setCustomWidth] = useState(800);
  const [customHeight, setCustomHeight] = useState(600);

  const customPreset: CropPreset = useMemo(() => ({
    id: "custom",
    name: "Custom",
    width: customWidth,
    height: customHeight,
    aspectRatio: customWidth / customHeight,
    category: "basic",
  }), [customWidth, customHeight]);

  const showPresets = useMemo(() => [customPreset, ...dimensionPresets], [customPreset]);

  return (
    <CropEditor
      defaultPreset={customPreset}
      showPresets={showPresets}
      showCustomDimensions
      customWidth={customWidth}
      customHeight={customHeight}
      onCustomDimensionChange={(w, h) => { setCustomWidth(w); setCustomHeight(h); }}
      showTrustBadges
    />
  );
}
