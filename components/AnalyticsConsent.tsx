"use client";

import { useState } from "react";

const CONSENT_KEY = "imagecropkit_analytics_consent";

function readConsent(): "accepted" | "rejected" | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

export default function AnalyticsConsent() {
  const [visible, setVisible] = useState(() => readConsent() === null);

  const decide = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // best-effort — localStorage may be unavailable
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Analytics consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
        <p className="text-sm text-foreground flex-1">
          We use Google Analytics to understand how visitors use ImageCropKit. Your images are processed locally in your browser and are never uploaded.
        </p>
        <div className="flex flex-wrap gap-2 sm:flex-nowrap">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background h-9 px-4 text-sm font-medium hover:bg-muted transition-colors"
          >
            Reject analytics
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-9 px-4 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
