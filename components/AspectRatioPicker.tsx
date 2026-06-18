"use client";

import { basicPresets, type CropPreset } from "@/lib/presets";
import { Button } from "@/components/ui/button";

interface AspectRatioPickerProps {
  selectedPreset: CropPreset | null;
  onSelect: (preset: CropPreset) => void;
}

export default function AspectRatioPicker({
  selectedPreset,
  onSelect,
}: AspectRatioPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {basicPresets.map((preset) => (
        <Button
          key={preset.id}
          variant={selectedPreset?.id === preset.id ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(preset)}
          className="text-sm"
        >
          {preset.name}
        </Button>
      ))}
    </div>
  );
}
