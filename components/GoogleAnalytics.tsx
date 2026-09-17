"use client";

import Script from "next/script";

export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId) return null;

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          try {
            if (location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.hostname.endsWith('.vercel.app') || localStorage.getItem('imagecropkit.analytics.disabled') === '1') {
              window['ga-disable-${measurementId}'] = true;
            }
          } catch {}
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');`}
      </Script>
    </>
  );
}
