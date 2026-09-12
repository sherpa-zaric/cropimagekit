import type { Metadata } from "next";
import dynamic from "next/dynamic";
const CropEditor = dynamic(() => import("@/components/CropEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import ToolShowcase from "@/components/ToolShowcase";
import { socialPresets } from "@/lib/presets";

export const metadata: Metadata = {
  title: "Discord Profile Picture Resizer — 128×128 Free Online",
  description:
    "Resize and crop images to 128×128 (or 512×512 HD) for your Discord profile picture. Free browser-based tool — no upload, no signup, no watermark. PNG with transparency supported.",
  alternates: { canonical: "https://imagecropkit.com/discord-profile-picture-resizer" },
};

const discordPresets = socialPresets.filter((p) => p.id.startsWith("discord"));
const defaultPreset = discordPresets.find((p) => p.id === "discord-pfp");

const faqItems = [
  { question: "What size is a Discord profile picture?", answer: "Discord displays profile pictures at 128×128 pixels in most contexts, but recommends uploading at 512×512 or larger so the image stays sharp when shown at higher resolutions or zoomed in." },
  { question: "Can I use an animated Discord profile picture?", answer: "Animated (GIF) profile pictures require Discord Nitro. Free accounts can only use static images. This tool exports a static PNG or JPG, which works for both free and Nitro users." },
  { question: "Should I upload 128×128 or 512×512?", answer: "Upload 512×512 if you can. Discord downscales it to 128×128 for the chat list, but keeps the higher-resolution version for tooltips, profiles, and zoomed views. A 128×128 source image looks soft when Discord upscales it." },
  { question: "Is this Discord PFP resizer free?", answer: "Yes. The tool is free with no signup, no watermark, and no limits on the number of profile pictures you create." },
  { question: "Are my images uploaded to a server?", answer: "No. Your image is processed locally in your browser using the Canvas API. Nothing is sent to any server." },
];

const related = [
  { title: "Twitch Profile Picture Resizer", href: "/twitch-profile-picture-resizer", description: "Resize images to 256×256 for Twitch profile pictures." },
  { title: "Circle Crop Image", href: "/circle-crop-image", description: "Create a round avatar with a transparent PNG background." },
  { title: "Profile Photo Cropper", href: "/profile-photo-cropper", description: "Make a square profile photo at common avatar sizes." },
  { title: "Crop Image to 1:1", href: "/crop-image-to-1x1", description: "Square crop at 512, 768, 1024, 1080, or 2000 pixels." },
  { title: "Crop Image Online", href: "/crop-image", description: "A simple single-image cropper with common aspect ratios." },
];

export default function DiscordProfilePictureResizerPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Discord Profile Picture Resizer — 128×128</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Crop any image to 128×128 or 512×512 for your Discord profile picture. Free, browser-based, no upload and no watermark.
        </p>
      </div>

      <CropEditor defaultPreset={defaultPreset} showPresets={discordPresets} showTrustBadges />

      <ToolShowcase shape="circle" ratio="1 / 1" outputLabel="512 × 512" caption="Sharp round avatars for Discord." />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Discord profile picture size</h2>
        <p>
          Discord displays profile pictures at 128×128 pixels in most of the interface — the chat
          list, message headers, and member sidebars all use that size. However, the platform
          recommends uploading a larger image (512×512 or higher) so the avatar stays sharp when
          it is shown at higher resolutions, in the profile modal, or when someone zooms in on a
          user card. A 128×128 source image looks soft and pixelated when Discord upscales it.
        </p>
        <p>
          Both the 128×128 display size and the 512×512 HD upload size are square (1:1). PNG is the
          best format if you want a transparent background behind your subject, which is the look
          many users want for an avatar that floats over Discord&#39;s dark theme. JPG is fine for
          photos with no transparency.
        </p>

        <h2>128×128 vs 512×512 — which to choose</h2>
        <p>
          Upload 512×512 whenever you can. Discord downscales the image to 128×128 for the chat
          list but keeps the high-resolution original for the profile view and tooltips. The
          result is a sharper avatar that holds up when people click through to your profile. If
          your source image is small, the 128×128 preset keeps the file size minimal but the
          output will look soft when zoomed.
        </p>
        <p>
          This tool ships both presets so you can pick the right resolution for your workflow.
          Start with the 128×128 preset for a quick avatar, or switch to the 512×512 HD preset if
          you want the higher-quality upload version.
        </p>

        <h2>How to resize a Discord profile picture</h2>
        <ol>
          <li>Upload your image by dragging it in or pasting from the clipboard.</li>
          <li>The crop area is pre-set to a square. Adjust the handles to frame your subject.</li>
          <li>Pick 128×128 for a quick avatar or 512×512 for the HD upload version.</li>
          <li>Choose PNG for a transparent background, or JPG for a smaller file.</li>
          <li>Download the image and upload it in your Discord user settings.</li>
        </ol>

        <h2>Discord PFP tips</h2>
        <ul>
          <li><strong>Aspect ratio</strong>: 1:1 square. Discord crops non-square uploads to a square.</li>
          <li><strong>Display size</strong>: 128×128 in the chat list and member sidebar.</li>
          <li><strong>Recommended upload</strong>: 512×512 or larger for sharp zoomed views.</li>
          <li><strong>Transparency</strong>: PNG supports transparent backgrounds; JPG does not.</li>
          <li><strong>Animated avatars</strong>: GIF requires Nitro. Export a static PNG here and it works for everyone.</li>
          <li><strong>File size</strong>: Keep under 8 MB. A 512×512 PNG is usually well under that.</li>
        </ul>

        <h2>Private and browser-based</h2>
        <p>
          Your image never leaves your device. ImageCropKit runs entirely in your browser using
          the Canvas API — no server upload, no account, and no watermark on the output. This
          makes it safe to use for personal avatars, server icons, or draft concepts you are not
          ready to publish yet.
        </p>

        <h2>Use the same source for other platforms</h2>
        <p>
          If you want a consistent avatar across platforms, the same square crop works for
          Discord, Twitch, and most other profile picture slots. Use the Twitch Profile Picture
          Resizer for the 256×256 Twitch size, or the Profile Photo Cropper for a generic square
          avatar at common sizes. For a round avatar with a transparent background, the Circle
          Crop Image tool exports a PNG with the corners knocked out.
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData
        pageTitle="Discord Profile Picture Resizer — 128×128"
        pageUrl="https://imagecropkit.com/discord-profile-picture-resizer"
        appName="Discord Profile Picture Resizer"
        faqItems={faqItems}
        howToSteps={[
          { name: "Upload your image", text: "Drag and drop, click to upload, or paste an image from your clipboard." },
          { name: "Adjust the crop", text: "The crop area is pre-set to a square. Drag the handles to frame your subject inside the 1:1 frame." },
          { name: "Choose a size and format", text: "Pick 128×128 for a quick avatar or 512×512 for the HD upload version. Choose PNG for transparency or JPG for a smaller file." },
          { name: "Download", text: "Download the image and upload it in your Discord user settings." },
        ]}
      />
    </div>
  );
}