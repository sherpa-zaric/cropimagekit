import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "ImageCropKit - Crop Images for Screenshots, AI Datasets, and Profile Photos",
    template: "%s | ImageCropKit",
  },
  description:
    "Crop images online for screenshots, AI datasets, passport photos, and profile pictures. Browser-based image cropping with no upload, no signup, and no watermark.",
  metadataBase: new URL("https://imagecropkit.com"),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    siteName: "ImageCropKit",
    type: "website",
    images: [
      {
        url: "/opengraph-image.svg",
        width: 1200,
        height: 630,
        alt: "ImageCropKit — Browser-based image cropping for screenshots, AI datasets, and profile photos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Sidebar />
        <div className="flex-1 flex flex-col lg:pl-60">
          <main className="flex-1 pt-14 lg:pt-0">{children}</main>
          <Footer />
        </div>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
