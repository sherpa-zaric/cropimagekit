"use client";

import { type CropPreset } from "@/lib/presets";

interface PresetPickerProps {
  presets: CropPreset[];
  selectedPreset: CropPreset | null;
  onSelect: (preset: CropPreset) => void;
  label?: string;
}

export default function PresetPicker({
  presets,
  selectedPreset,
  onSelect,
  label = "Presets",
}: PresetPickerProps) {
  if (presets.length === 0) return null;

  const allSameShape =
    presets.length > 1 &&
    presets.every((p) => p.aspectRatio === presets[0].aspectRatio);

  return (
    <div>
      <p className="text-base text-muted-foreground mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => {
          const isSelected = selectedPreset?.id === preset.id;
          const sizeLabel =
            preset.width && preset.height
              ? `${preset.width} × ${preset.height}`
              : null;
          const buttonLabel = sizeLabel
            ? `${preset.name} (${sizeLabel})`
            : preset.name;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelect(preset)}
              aria-pressed={isSelected}
              className={`text-sm px-3 py-1.5 rounded-md border transition-colors ${
                isSelected
                  ? "border-foreground text-foreground font-medium"
                  : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              {buttonLabel}
              {preset.recommended && (
                <span className="ml-1.5 inline-flex items-center rounded-full bg-[#FBF3DB] text-[#956400] text-[10px] px-1.5 py-0.5 font-medium uppercase tracking-wider">
                  Rec
                </span>
              )}
            </button>
          );
        })}
      </div>
      {allSameShape && (
        <p className="text-sm text-muted-foreground mt-3">
          These presets use the same crop shape. The selected preset controls the exported pixel size.
        </p>
      )}
    </div>
  );
}
