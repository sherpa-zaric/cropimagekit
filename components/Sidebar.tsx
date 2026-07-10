"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import BrandWordmark from "@/components/BrandWordmark";

const navGroups = [
  {
    label: "Core",
    links: [
      { href: "/crop-image", label: "Crop Image" },
      { href: "/crop-screenshot", label: "Screenshot" },
      { href: "/smart-crop-image", label: "Smart Crop" },
      { href: "/social-media-image-pack", label: "Export Pack" },
      { href: "/bulk-crop-images", label: "Bulk Crop" },
    ],
  },
  {
    label: "Social",
    links: [
      { href: "/crop-image-for-instagram", label: "Instagram" },
      { href: "/crop-image-for-tiktok", label: "TikTok" },
    ],
  },
  {
    label: "People & ID",
    links: [
      { href: "/profile-photo-cropper", label: "Profile" },
      { href: "/crop-headshot", label: "Headshot" },
      { href: "/crop-image-to-passport-size", label: "Passport" },
    ],
  },
  {
    label: "Commerce & AI",
    links: [
      { href: "/crop-product-images", label: "Product" },
      { href: "/crop-images-for-lora-training", label: "LoRA Cropper" },
      { href: "/ai-dataset-cropper", label: "AI Dataset" },
    ],
  },
  {
    label: "Shapes & sizes",
    links: [
      { href: "/circle-crop-image", label: "Circle" },
      { href: "/oval-crop-image", label: "Oval Crop" },
      { href: "/crop-image-by-dimensions", label: "By Dimensions" },
      { href: "/crop-and-resize-image", label: "Resize" },
    ],
  },
  {
    label: "Company",
    links: [{ href: "/blog", label: "Blog" }],
  },
];

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname === href.replace(/\/$/, "");
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
      {navGroups.map((group) => (
        <div key={group.label}>
          <p className="px-3 mb-1.5 text-[11px] text-muted-foreground/60 uppercase tracking-widest font-medium">
            {group.label}
          </p>
          <div className="space-y-0.5">
            {group.links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onNavigate}
                  className={`flex items-center px-3 py-2 rounded-lg text-[14px] transition-colors ${
                    active
                      ? "text-foreground font-medium bg-muted/70"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="flex items-center justify-between h-full px-4">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted transition-colors"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
          <Link href="/" className="inline-flex items-center">
            <BrandWordmark className="text-lg" />
          </Link>
          <Link
            href="/crop-image"
            className="inline-flex items-center gap-1.5 rounded-xl bg-foreground text-background h-9 px-3.5 text-[13px] font-medium hover:opacity-90 transition-opacity"
          >
            Crop
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 z-40 border-r border-border bg-background/95 backdrop-blur-xl flex-col">
        <div className="flex items-center h-14 px-5 border-b border-border/60">
          <Link href="/" className="inline-flex items-center">
            <BrandWordmark className="text-xl" />
          </Link>
        </div>
        <SidebarContent />
        <div className="border-t border-border/60 p-3 space-y-2">
          <a
            href="https://github.com/sherpa-zaric/cropimagekit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-9 w-full rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            aria-label="GitHub repository"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <Link
            href="/crop-image"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-foreground text-background h-9 text-[14px] font-medium hover:opacity-90 transition-opacity"
          >
            Start Cropping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </aside>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-200 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`absolute top-0 left-0 h-full w-72 max-w-[85vw] bg-background/95 backdrop-blur-xl border-r border-border shadow-2xl transition-transform duration-200 ease-out flex flex-col ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between h-14 px-5 border-b border-border/60">
            <Link href="/" onClick={() => setOpen(false)}>
              <BrandWordmark className="text-xl" />
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted transition-colors"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>
          <SidebarContent onNavigate={() => setOpen(false)} />
          <div className="border-t border-border/60 p-3">
            <Link
              href="/crop-image"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-foreground text-background h-11 text-[15px] font-medium hover:opacity-90 transition-opacity"
            >
              Start Cropping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
