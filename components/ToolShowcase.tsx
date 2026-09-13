import type { CSSProperties, ReactNode } from "react";
import { ArrowDown, Crosshair, FileArchive, MoveRight } from "lucide-react";

export type ToolShowcaseMode = "crop" | "smart" | "bulk" | "pack" | "safezone";
export type ToolShowcaseShape = "rect" | "circle" | "oval";

interface ToolShowcaseProps {
  heading?: string;
  caption?: string;
  /** CSS aspect-ratio value, e.g. "1 / 1", "9 / 16", "1200 / 630". */
  ratio?: string;
  shape?: ToolShowcaseShape;
  mode?: ToolShowcaseMode;
  outputLabel?: string;
  scene?: "landscape" | "portrait" | "product" | "screenshot";
}

function frameStyle(ratio: string): CSSProperties {
  const [x,y,w,h] = cropViewBox(ratio).split(" ").map(Number);
  return { left: `${x/4}%`, top: `${y/3}%`, width: `${w/4}%`, height: `${h/3}%` };
}

function cropViewBox(ratio: string): string {
  const r = parseRatio(ratio);
  const width = Math.min(300, 220 * r);
  const height = width / r;
  return `${(400-width)/2} ${(300-height)/2} ${width} ${height}`;
}

function PackShowcase() {
  return <div className="space-y-5">
    <div className="mx-auto w-full max-w-64"><SourcePanel /><p className="mt-2 text-center text-xs text-muted-foreground">One source image</p></div>
    <ArrowDown className="mx-auto size-5 text-muted-foreground" aria-hidden="true" />
    <div className="grid grid-cols-3 items-center gap-3">
      {[["4 / 5", "Feed · 1080 × 1350"], ["9 / 16", "Story · 1080 × 1920"], ["16 / 9", "Thumbnail · 1280 × 720"]].map(([ratio,label])=><div key={ratio} className="min-w-0"><ResultPanel ratio={ratio} landscape /><p className="mt-2 text-center text-xs text-muted-foreground">{label}</p></div>)}
    </div>
    <p className="flex items-center justify-center gap-2 text-sm"><FileArchive className="size-4" aria-hidden="true" />One ZIP download</p>
  </div>;
}

function parseRatio(ratio: string): number {
  const parts = ratio.split("/").map((s) => parseFloat(s.trim()));
  if (parts.length !== 2 || !parts[0] || !parts[1]) return 4 / 3;
  return parts[0] / parts[1];
}

/* ------------------------------------------------------------------ */
/*  Demo "photo" — an inline SVG landscape. Zero external assets.      */
/* ------------------------------------------------------------------ */
function Scene({ style, viewBox = "0 0 400 300", scene = "landscape" }: { style?: CSSProperties; viewBox?: string; scene?: ToolShowcaseProps["scene"] }) {
  if (scene !== "landscape") return <svg viewBox={viewBox} style={{ display: "block", width: "100%", height: "100%", ...style }} aria-hidden="true">
    <rect width="400" height="300" fill="#d8e6e5" />
    {scene === "portrait" ? <>
      <path d="M90 300 Q110 190 200 190 Q290 190 310 300" fill="#38635d" />
      <rect x="185" y="165" width="30" height="45" fill="#ba8169" />
      <ellipse cx="200" cy="120" rx="48" ry="66" fill="#d49c7e" />
      <path d="M150 125 Q130 40 200 45 Q267 40 250 125 L235 87 Q190 105 163 88Z" fill="#353039" />
      <circle cx="183" cy="125" r="3" fill="#353039" /><circle cx="218" cy="125" r="3" fill="#353039" />
      <path d="M183 153 Q200 165 217 153" fill="none" stroke="#874f4e" strokeWidth="3" />
    </> : scene === "product" ? <>
      <ellipse cx="200" cy="242" rx="83" ry="12" fill="#bdcdcc" />
      <path d="M246 119 H270 Q300 120 290 155 Q288 180 247 180" fill="none" stroke="#348d7b" strokeWidth="16" />
      <path d="M135 104 H253 L242 224 Q192 246 143 224Z" fill="#429f8d" />
      <ellipse cx="194" cy="104" rx="59" ry="12" fill="#285c51" />
      <path d="M153 130 L161 211" stroke="#a4d8c6" strokeWidth="7" />
    </> : <>
      <rect width="400" height="30" fill="#34424e" /><rect y="30" width="45" height="270" fill="#bac8d1" />
      <rect x="50" y="45" width="300" height="210" fill="white" />
      <rect x="65" y="65" width="130" height="10" fill="#34424e" />
      <rect x="65" y="100" width="120" height="125" fill="#dceee9" />
      <path d="M75 210 L105 160 L133 177 L170 122" fill="none" stroke="#368b77" strokeWidth="6" />
      {[0,1,2,3].map(i=><rect key={i} x="208" y={105+i*30} width={110-i*10} height="10" fill={i===0?'#c37b85':'#cdd7dc'} />)}
      <rect y="278" width="400" height="22" fill="#9fadb8" />
    </>}
  </svg>;
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      style={{ display: "block", width: "100%", height: "100%", ...style }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tksSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8EC9E8" />
          <stop offset="55%" stopColor="#C8E4F2" />
          <stop offset="100%" stopColor="#F6E7C8" />
        </linearGradient>
        <linearGradient id="tksLake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7FB3D5" />
          <stop offset="100%" stopColor="#4E7FA0" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#tksSky)" />
      <circle cx="302" cy="76" r="34" fill="#FFE9B8" />
      <circle cx="302" cy="76" r="23" fill="#FFD98A" />
      <ellipse cx="108" cy="70" rx="48" ry="14" fill="#FFFFFF" opacity="0.85" />
      <ellipse cx="152" cy="56" rx="30" ry="10" fill="#FFFFFF" opacity="0.7" />
      <path d="M0 192 L92 106 L172 192 Z" fill="#5B7B8C" />
      <path d="M118 192 L226 80 L332 192 Z" fill="#4A6A7C" />
      <path d="M226 80 L257 116 L205 116 Z" fill="#FFFFFF" opacity="0.92" />
      <path d="M92 106 L116 136 L70 136 Z" fill="#FFFFFF" opacity="0.8" />
      <path d="M258 192 L340 118 L400 192 Z" fill="#63808F" />
      <rect y="192" width="400" height="108" fill="url(#tksLake)" />
      <path
        d="M0 192 C120 202 280 184 400 194 L400 206 C280 196 120 212 0 202 Z"
        fill="#8FBF8F"
        opacity="0.8"
      />
      <ellipse cx="302" cy="232" rx="42" ry="6" fill="#FFE9B8" opacity="0.35" />
      <ellipse cx="120" cy="258" rx="60" ry="5" fill="#FFFFFF" opacity="0.18" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Crop frame chrome (grid thirds + corner handles + cursor)          */
/* ------------------------------------------------------------------ */
function ThirdsGrid() {
  const v: CSSProperties = {
    position: "absolute",
    top: 0,
    bottom: 0,
    borderLeft: "1px solid rgba(255,255,255,0.55)",
  };
  const h: CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    borderTop: "1px solid rgba(255,255,255,0.55)",
  };
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "inherit" }}>
      <div style={{ ...v, left: "33.33%" }} />
      <div style={{ ...v, left: "66.66%" }} />
      <div style={{ ...h, top: "33.33%" }} />
      <div style={{ ...h, top: "66.66%" }} />
    </div>
  );
}

function Handles() {
  const base: CSSProperties = {
    position: "absolute",
    width: 10,
    height: 10,
    background: "#fff",
    borderRadius: 2,
    boxShadow: "0 1px 3px rgba(0,0,0,0.45)",
  };
  return (
    <>
      <div style={{ ...base, left: -5, top: -5 }} />
      <div style={{ ...base, right: -5, top: -5 }} />
      <div style={{ ...base, left: -5, bottom: -5 }} />
      <div style={{ ...base, right: -5, bottom: -5 }} />
    </>
  );
}

function Cursor() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      style={{ position: "absolute", right: -16, bottom: -16, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))" }}
      aria-hidden="true"
    >
      <path d="M5 3 L20 12 L12.5 14 L10 21 Z" fill="#111111" stroke="#FFFFFF" strokeWidth="1.6" />
    </svg>
  );
}

function CropFrame({
  style,
  animation,
  delay = 0,
  rounded = 6,
  minimal = false,
}: {
  style: CSSProperties;
  animation: string;
  delay?: number;
  rounded?: number | string;
  minimal?: boolean;
}) {
  return (
    <div
      className="tks-frame"
      style={{
        ...style,
        borderRadius: rounded,
        animation: `${animation} 7s ease-in-out ${delay}s infinite`,
      }}
    >
      {!minimal && <ThirdsGrid />}
      {!minimal && <Handles />}
      {!minimal && <Cursor />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Panels                                                             */
/* ------------------------------------------------------------------ */
function SourcePanel({
  children,
  aspect = "4 / 3",
  style,
  scene,
}: {
  children?: ReactNode;
  aspect?: string;
  style?: CSSProperties;
  scene?: ToolShowcaseProps["scene"];
}) {
  return (
    <div
      style={{ position: "relative", aspectRatio: aspect, overflow: "hidden", ...style }}
      className="w-full rounded-xl border border-border"
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <Scene scene={scene} />
      </div>
      {children}
    </div>
  );
}

function ResultPanel({
  ratio,
  landscape,
  chip,
  rounded = 10,
  height = 230,
  scene,
}: {
  ratio: string;
  landscape: boolean;
  chip?: string;
  rounded?: number | string;
  delay?: number;
  height?: number;
  scene?: ToolShowcaseProps["scene"];
}) {
  const size: CSSProperties = landscape
    ? { width: "100%", aspectRatio: ratio }
    : { height, aspectRatio: ratio };
  return (
    <div
      style={{ position: "relative", overflow: "hidden", borderRadius: rounded, ...size }}
      className="border border-border bg-muted"
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <Scene scene={scene} viewBox={cropViewBox(ratio)} />
      </div>
      {chip && <span className="tks-chip">{chip}</span>}
    </div>
  );
}

function FlowArrow() {
  return (
    <>
      <MoveRight className="hidden h-6 w-6 shrink-0 text-muted-foreground sm:block" aria-hidden="true" />
      <ArrowDown className="h-6 w-6 shrink-0 text-muted-foreground sm:hidden" aria-hidden="true" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Mode: crop (default) & smart                                       */
/* ------------------------------------------------------------------ */
function CropShowcase({
  ratio,
  shape,
  mode,
  outputLabel,
  scene,
}: {
  ratio: string;
  shape: ToolShowcaseShape;
  mode: "crop" | "smart";
  outputLabel?: string;
  scene?: ToolShowcaseProps["scene"];
}) {
  const r = parseRatio(ratio);
  const landscape = r >= 1;
  const rounded = shape === "rect" ? 6 : "50%";
  const [x,y,w,h] = cropViewBox(ratio).split(" ").map(Number);
  const frameSize: CSSProperties = { left: `${x/4}%`, top: `${y/3}%`, width: `${w/4}%`, height: `${h/3}%` };
  const frameAnim = mode === "smart" ? "tksFollow" : "tksDrift";

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8">
      <div className="w-full max-w-[340px]">
        <SourcePanel scene={scene}>
          {mode === "smart" && (
            <div className="tks-subject">
              <Crosshair className="h-5 w-5 text-white" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.6))" }} />
            </div>
          )}
          <CropFrame style={frameSize} animation={frameAnim} rounded={rounded} />
        </SourcePanel>
        <p className="mt-2 text-center text-xs text-muted-foreground">Original</p>
      </div>
      <FlowArrow />
      <div className="flex w-full max-w-[340px] flex-col items-center">
        <ResultPanel
          ratio={ratio}
          landscape={landscape}
          chip={outputLabel}
          rounded={rounded}
          scene={scene}
        />
        <p className="mt-2 text-center text-xs text-muted-foreground">Cropped output</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mode: bulk                                                         */
/* ------------------------------------------------------------------ */
function BulkShowcase({
  ratio,
  outputLabel,
}: {
  ratio: string;
  outputLabel?: string;
}) {
  const delays = [0, 0.9, 1.8];
  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8">
      <div className="w-full min-w-0 max-w-[328px]">
        <div className="grid grid-cols-3 gap-2">
          {delays.map((d) => (
            <SourcePanel key={d}>
              <CropFrame
                style={frameStyle(ratio)}
                animation="tksDrift"
                delay={d}
                minimal
              />
            </SourcePanel>
          ))}
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">Your batch</p>
      </div>
      <FlowArrow />
      <div className="flex w-full min-w-0 max-w-[328px] flex-col items-center">
        <div className="grid w-full grid-cols-3 gap-2">
          {delays.map((d) => (
            <div key={d} className="min-w-0">
              <ResultPanel ratio={ratio} landscape delay={d} />
            </div>
          ))}
        </div>
        <span className="tks-zip">
          <FileArchive className="h-3.5 w-3.5" aria-hidden="true" />
          {outputLabel ?? "images.zip"}
        </span>
        <p className="mt-2 text-center text-xs text-muted-foreground">One ZIP download</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mode: safezone                                                     */
/* ------------------------------------------------------------------ */
function SafeZoneCanvas({ checked }: { checked?: boolean }) {
  return (
    <SourcePanel aspect="9 / 16" style={{ height: 280, width: "auto" }}>
      <div className="tks-band" style={{ top: 0, height: "16%" }} />
      <div className="tks-band" style={{ bottom: 0, height: "20%", animationDelay: "0.6s" }} />
      <div className="tks-safebox" style={{ top: "16%", bottom: "20%" }}>
        <span className="tks-safelabel">Safe zone</span>
      </div>
      {checked && (
        <span className="tks-chip" style={{ left: "50%", transform: "translateX(-50%)" }}>
          Preview only
        </span>
      )}
    </SourcePanel>
  );
}

function SafeZoneShowcase({ outputLabel }: { outputLabel?: string }) {
  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8">
      <div className="flex flex-col items-center">
        <SafeZoneCanvas />
        <p className="mt-2 text-center text-xs text-muted-foreground">Platform UI overlap</p>
      </div>
      <FlowArrow />
      <div className="flex flex-col items-center">
        <SafeZoneCanvas checked />
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {outputLabel ?? "Checked before publishing"}
        </p>
        <p className="mt-2 max-w-56 text-center text-xs text-muted-foreground">Illustrative overlay. Coverage varies by placement and device.</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Public component                                                   */
/* ------------------------------------------------------------------ */
export default function ToolShowcase({
  heading = "See it in action",
  caption,
  ratio = "4 / 3",
  shape = "rect",
  mode = "crop",
  outputLabel,
  scene = "landscape",
}: ToolShowcaseProps) {
  return (
    <section aria-label={heading}>
      <style>{SHOWCASE_CSS}</style>
      <div className="mb-8 space-y-3 text-center">
        <h2 className="text-2xl">{heading}</h2>
        {caption && (
          <p className="mx-auto max-w-xl text-muted-foreground">{caption}</p>
        )}
      </div>
      <div className="mx-auto max-w-3xl border-y border-border py-6 sm:py-8">
        {mode === "pack" ? <PackShowcase /> : mode === "bulk" ? (
          <BulkShowcase ratio={ratio} outputLabel={outputLabel} />
        ) : mode === "safezone" ? (
          <SafeZoneShowcase outputLabel={outputLabel} />
        ) : (
          <CropShowcase ratio={ratio} shape={shape} mode={mode} outputLabel={outputLabel} scene={shape !== "rect" && scene === "landscape" ? "portrait" : scene} />
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Keyframes & static styles (server-rendered, no client JS)          */
/* ------------------------------------------------------------------ */
const SHOWCASE_CSS = `
.tks-frame { animation: none !important; }
.tks-subject { animation: none !important; left: 50%; top: 50%; }
@keyframes tksDrift {
  0%, 14% { left: 6%; top: 10%; }
  38%, 52% { left: 36%; top: 18%; }
  74%, 88% { left: 16%; top: 32%; }
  100% { left: 6%; top: 10%; }
}
@keyframes tksFollow {
  0%, 14% { left: 8%; top: 16%; }
  38%, 52% { left: 46%; top: 10%; }
  74%, 88% { left: 24%; top: 34%; }
  100% { left: 8%; top: 16%; }
}
@keyframes tksSubject {
  0%, 14% { left: 24%; top: 34%; }
  38%, 52% { left: 64%; top: 26%; }
  74%, 88% { left: 40%; top: 52%; }
  100% { left: 24%; top: 34%; }
}
@keyframes tksPan {
  0%, 14% { transform: translate(-6%, -12%) scale(1.7); }
  38%, 52% { transform: translate(-46%, -24%) scale(1.7); }
  74%, 88% { transform: translate(-20%, -50%) scale(1.7); }
  100% { transform: translate(-6%, -12%) scale(1.7); }
}
@keyframes tksWarn {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 0.4; }
}
.tks-frame {
  position: absolute;
  border: 2px solid #fff;
  box-shadow: 0 0 0 999px rgba(15, 15, 15, 0.5);
}
.tks-pan {
  animation: tksPan 7s ease-in-out infinite;
  will-change: transform;
}
.tks-subject {
  position: absolute;
  transform: translate(-50%, -50%);
  animation: tksSubject 7s ease-in-out infinite;
}
.tks-chip {
  position: absolute;
  left: 8px;
  bottom: 8px;
  background: rgba(17, 17, 17, 0.78);
  color: #fff;
  font-size: 11px;
  line-height: 1;
  padding: 5px 9px;
  border-radius: 999px;
  white-space: nowrap;
}
.tks-zip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  background: rgba(17, 17, 17, 0.78);
  color: #fff;
  font-size: 11px;
  padding: 5px 10px;
  border-radius: 999px;
  white-space: nowrap;
}
.tks-band {
  position: absolute;
  left: 0;
  right: 0;
  background: repeating-linear-gradient(
    45deg,
    rgba(197, 48, 48, 0.32) 0 8px,
    rgba(197, 48, 48, 0.12) 8px 16px
  );
  border-top: 1px dashed rgba(197, 48, 48, 0.85);
  border-bottom: 1px dashed rgba(197, 48, 48, 0.85);
  animation: tksWarn 2.6s ease-in-out infinite;
}
.tks-safebox {
  position: absolute;
  left: 6%;
  right: 6%;
  border: 2px dashed rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tks-safelabel {
  background: rgba(17, 17, 17, 0.72);
  color: #fff;
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 999px;
}
@media (prefers-reduced-motion: reduce) {
  .tks-frame, .tks-pan, .tks-subject, .tks-band {
    animation: none !important;
  }
}
`;
