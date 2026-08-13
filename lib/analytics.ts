export const ANALYTICS_CONSENT_KEY = "imagecropkit_analytics_consent";
export const ANALYTICS_CONSENT_EVENT = "imagecropkit:analytics-consent";

type AnalyticsEventName =
  | "export_pack_image_uploaded"
  | "export_pack_pack_selected"
  | "export_pack_outputs_changed"
  | "export_pack_focal_point_set"
  | "export_pack_downloaded";

type AnalyticsEventParameters = {
  pack_id?: string;
  output_count?: number;
  format?: string;
};

type Gtag = (command: "event", name: AnalyticsEventName, parameters: AnalyticsEventParameters) => void;

function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;

  try {
    return localStorage.getItem(ANALYTICS_CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

export function trackAnalyticsEvent(name: AnalyticsEventName, parameters: AnalyticsEventParameters) {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;
  const gtag = (window as Window & { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", name, parameters);
}

export { hasAnalyticsConsent };
