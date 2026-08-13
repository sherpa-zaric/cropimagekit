"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

import { ANALYTICS_CONSENT_EVENT, hasAnalyticsConsent } from "@/lib/analytics";

export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const [enabled, setEnabled] = useState(hasAnalyticsConsent);

  useEffect(() => {
    const updateConsent = () => setEnabled(hasAnalyticsConsent());
    window.addEventListener(ANALYTICS_CONSENT_EVENT, updateConsent);
    return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, updateConsent);
  }, []);

  if (!measurementId || !enabled) return null;

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');`}
      </Script>
    </>
  );
}
