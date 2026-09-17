type AnalyticsEventName =
  | "crop_image_loaded"
  | "crop_export_succeeded"
  | "crop_export_failed"
  | "export_pack_image_uploaded"
  | "export_pack_pack_selected"
  | "export_pack_outputs_changed"
  | "export_pack_focal_point_set"
  | "export_pack_downloaded";

type AnalyticsEventParameters = {
  pack_id?: string;
  output_count?: number;
  format?: string;
  tool_type?: "single" | "bulk";
  image_count?: number;
  failed_count?: number;
  failure_stage?: "image_export" | "zip";
};

type Gtag = (command: "event", name: AnalyticsEventName, parameters: AnalyticsEventParameters) => void;

export function trackAnalyticsEvent(name: AnalyticsEventName, parameters: AnalyticsEventParameters) {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  // Analytics must never turn a successful export into a product error.
  try {
    if (window.localStorage.getItem("imagecropkit.analytics.disabled") === "1") return;
    gtag("event", name, parameters);
  } catch {
    // Storage restrictions and blocked analytics are non-fatal.
  }
}
