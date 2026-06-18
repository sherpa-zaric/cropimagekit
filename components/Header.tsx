"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import BrandWordmark from "@/components/BrandWordmark";

const primaryLinks = [
  { href: "/crop-image", label: "Crop Image" },
  { href: "/bulk-crop-images", label: "Bulk Crop" },
  { href: "/crop-product-images", label: "Product" },
  { href: "/crop-image-for-instagram", label: "Instagram" },
  { href: "/crop-image-for-tiktok", label: "TikTok" },
  { href: "/crop-headshot", label: "Headshot" },
  { href: "/crop-image-by-dimensions", label: "By Dimensions" },
  { href: "/crop-and-resize-image", label: "Resize" },
];

const moreLinks = [
  { href: "/crop-images-for-lora-training", label: "AI Dataset" },
  { href: "/circle-crop-image", label: "Circle Crop" },
  { href: "/crop-image-to-passport-size", label: "Passport Size" },
  { href: "/oval-crop-image", label: "Oval Crop" },
  { href: "/blog", label: "Blog" },
];

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname === href.replace(/\/$/, "");
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const isMoreActive = moreLinks.some((l) => isActive(pathname, l.href));

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 pointer-events-none">
      <div className="mx-auto max-w-[86rem] pointer-events-auto rounded-2xl border border-border/60 bg-background/85 backdrop-blur-xl shadow-[0_2px_24px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between h-14 px-5 gap-3">
          <Link href="/" className="inline-flex items-center shrink-0">
            <BrandWordmark className="text-xl" />
          </Link>

          {/* Desktop nav — one row */}
          <nav className="hidden lg:flex items-center gap-0.5 min-w-0">
            {primaryLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[14px] px-3 py-1.5 rounded-lg transition-all duration-150 whitespace-nowrap ${
                    active
                      ? "text-foreground font-medium bg-muted/70"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* More dropdown */}
            <div ref={moreRef} className="relative">
              <button
                onClick={() => setMoreOpen((o) => !o)}
                className={`relative text-[14px] px-3 py-1.5 rounded-lg transition-all duration-150 whitespace-nowrap inline-flex items-center gap-1 ${
                  isMoreActive || moreOpen
                    ? "text-foreground font-medium bg-muted/70"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                More
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`absolute top-full right-0 mt-2 w-48 rounded-xl border border-border bg-background/95 backdrop-blur-xl shadow-xl py-1.5 z-50 transition-all duration-150 origin-top-right ${
                  moreOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMoreOpen(false)}
                    className={`flex items-center px-4 py-2.5 text-[14px] transition-colors ${
                      isActive(pathname, link.href)
                        ? "text-foreground font-medium bg-muted/60"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* CTA + GitHub + Mobile hamburger */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="https://github.com/sherpa-zaric/cropimagekit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
              aria-label="GitHub repository"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            <Link
              href="/crop-image"
              className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background h-9 px-4 text-[14px] font-medium hover:opacity-90 transition-opacity"
            >
              <span className="hidden sm:inline">Start Cropping</span>
              <span className="sm:hidden">Crop</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline" />
            </Link>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-200 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-background/95 backdrop-blur-xl border-l border-border shadow-2xl transition-transform duration-200 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between h-14 px-5 border-b border-border/50">
            <BrandWordmark className="text-xl" />
            <button
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted transition-colors"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="px-3 py-3 space-y-0.5 overflow-y-auto max-h-[calc(100vh-8rem)]">
            <p className="px-3 py-1.5 text-[11px] text-muted-foreground/60 uppercase tracking-widest font-medium">
              Tools
            </p>
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-[15px] transition-colors ${
                  isActive(pathname, link.href)
                    ? "text-foreground font-medium bg-muted/60"
                    : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-border/50 my-2" />

            <p className="px-3 py-1.5 text-[11px] text-muted-foreground/60 uppercase tracking-widest font-medium">
              More
            </p>
            {moreLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-[15px] transition-colors ${
                  isActive(pathname, link.href)
                    ? "text-foreground font-medium bg-muted/60"
                    : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50 bg-background/80 backdrop-blur-xl">
            <Link
              href="/crop-image"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-foreground text-background h-11 text-[15px] font-medium hover:opacity-90 transition-opacity"
            >
              Start Cropping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
