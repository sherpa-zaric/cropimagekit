import { SITE_NAME } from "@/lib/siteConfig";

interface BrandWordmarkProps {
  className?: string;
}

/**
 * Three-tone wordmark: "image" (muted) + "Crop" (foreground) + "kit" (muted),
 * with a tiny crop-corner mark next to the "k". The Crop word is the action
 * verb so it carries the brand weight.
 */
export default function BrandWordmark({ className = "" }: BrandWordmarkProps) {
  return (
    <span
      aria-label={SITE_NAME}
      className={`inline-flex items-baseline font-medium tracking-tight leading-none ${className}`}
    >
      <span className="text-foreground/35">image</span>
      <span className="text-foreground font-bold">Crop</span>
      <span className="relative text-foreground/35">
        kit
        <span
          aria-hidden
          className="absolute -top-[0.35em] -right-[0.55em] inline-block"
        >
          <svg
            width="0.6em"
            height="0.6em"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-foreground"
          >
            <path d="M 1.5 4 L 1.5 1.5 L 4 1.5" />
            <path d="M 8.5 6 L 8.5 8.5 L 6 8.5" />
          </svg>
        </span>
      </span>
    </span>
  );
}
