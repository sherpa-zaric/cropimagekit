import type { Metadata } from "next";
import dynamic from "next/dynamic";
const CropEditor = dynamic(() => import("@/components/CropEditor"), {
  loading: () => <div className="h-64 flex items-center justify-center text-muted-foreground">Loading editor...</div>,
});
import RelatedTools from "@/components/RelatedTools";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import { socialPresets } from "@/lib/presets";

export const metadata: Metadata = {
  title: "Twitch Profile Picture Resizer — 256×256 Free Online",
  description:
    "Resize and crop images to 256×256 (or 800×800 upload) for your Twitch profile picture. Free browser-based tool — no upload, no signup, no watermark. JPG and PNG supported.",
  alternates: { canonical: "https://imagecropkit.com/twitch-profile-picture-resizer" },
};

const twitchPfpPresets = socialPresets.filter((p) => p.id === "twitch-pfp");
const defaultPreset = twitchPfpPresets[0];

const faqItems = [
  { question: "What size is a Twitch profile picture?", answer: "Twitch displays profile pictures at 256×256 pixels in most contexts, but recommends uploading at 800×800 or larger so the image stays sharp when shown at higher resolutions or on stream overlays." },
  { question: "Should I upload 256×256 or 800×800?", answer: "Upload 800×800 if you can. Twitch downscales it to 256×256 for the channel page, but keeps the higher-resolution version for larger displays and overlays. A 256×256 source image looks soft when Twitch upscales it." },
  { question: "Can I use a transparent PNG for my Twitch PFP?", answer: "Twitch profile pictures do not support transparency — transparent areas are filled with a solid background color. You can still export a PNG here, but the final upload will have a filled background on Twitch." },
  { question: "Is this Twitch PFP resizer free?", answer: "Yes. The tool is free with no signup, no watermark, and no limits on the number of profile pictures you create." },
  { question: "Are my images uploaded to a server?", answer: "No. Your image is processed locally in your browser using the Canvas API. Nothing is sent to any server." },
];

const related = [
  { title: "Discord Profile Picture Resizer", href: "/discord-profile-picture-resizer", description: "Resize images to 128×128 or 512×512 for Discord profile pictures." },
  { title: "Profile Photo Cropper", href: "/profile-photo-cropper", description: "Make a square profile photo at common avatar sizes." },
  { title: "Circle Crop Image", href: "/circle-crop-image", description: "Create a round avatar with a transparent PNG background." },
  { title: "Crop Image to 1:1", href: "/crop-image-to-1x1", description: "Square crop at 512, 768, 1024, 1080, or 2000 pixels." },
  { title: "Crop Image Online", href: "/crop-image", description: "A simple single-image cropper with common aspect ratios." },
];

export default function TwitchProfilePictureResizerPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Twitch Profile Picture Resizer — 256×256</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Crop any image to 256×256 for your Twitch profile picture. Free, browser-based, no upload and no watermark.
        </p>
      </div>

      <CropEditor defaultPreset={defaultPreset} showPresets={twitchPfpPresets} showTrustBadges />

      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Twitch profile picture size</h2>
        <p>
          Twitch displays profile pictures at 256×256 pixels in most of the interface — the channel
          page, follower lists, and chat moderation panels all use that size. However, the
          platform recommends uploading a larger image (800×800 or higher) so the avatar stays
          sharp when it is shown at higher resolutions, on stream overlays, or on the streamer&#39;s
          profile page where it can be rendered larger. A 256×256 source image looks soft when
          Twitch upscales it.
        </p>
        <p>
          The 256×256 display size is a square 1:1 aspect ratio. Twitch accepts JPG and PNG up to
          10 MB. JPG is the right choice for photographic avatars and keeps the file size small.
          PNG is the better choice when your avatar has sharp edges, text, or a flat-color logo —
          but note that Twitch does not preserve transparency, so any transparent areas will be
          filled with a solid background color on upload.
        </p>

        <h2>256×256 vs 800×800 — which to upload</h2>
        <p>
          Upload 800×800 whenever you can. Twitch downscales the image to 256×256 for the channel
          page but keeps the high-resolution original for larger displays and stream overlays.
          The result is a sharper avatar that holds up when people view your profile at full size
          or when your PFP appears on someone else&#39;s stream as a raid or follow notification. If
          your source image is small, the 256×256 preset keeps the file size minimal but the
          output will look soft when zoomed.
        </p>
        <p>
          This tool defaults to the 256×256 display size for a quick avatar. If you have a
          higher-resolution source image, crop at 256×256 to compose the frame, then re-export
          from a larger source at the 800×800 upload size for the final file you send to Twitch.
        </p>

        <h2>How to resize a Twitch profile picture</h2>
        <ol>
          <li>Upload your image by dragging it in or pasting from the clipboard.</li>
          <li>The crop area is pre-set to 256×256. Adjust the handles to frame your subject.</li>
          <li>Choose JPG for a photo or PNG for a graphic with sharp edges.</li>
          <li>Download the image and upload it in your Twitch channel settings.</li>
        </ol>

        <h2>Twitch PFP tips</h2>
        <ul>
          <li><strong>Aspect ratio</strong>: 1:1 square. Twitch crops non-square uploads to a square.</li>
          <li><strong>Display size</strong>: 256×256 on the channel page and follower lists.</li>
          <li><strong>Recommended upload</strong>: 800×800 or larger for sharp overlays and profile views.</li>
          <li><strong>Format</strong>: JPG for photos, PNG for graphics with text or sharp edges.</li>
          <li><strong>No transparency</strong>: Twitch fills transparent PNG areas with a solid color.</li>
          <li><strong>File size</strong>: Keep under 10 MB. A 256×256 JPG is usually well under that.</li>
        </ul>

        <h2>Private and browser-based</h2>
        <p>
          Your image never leaves your device. ImageCropKit runs entirely in your browser using
          the Canvas API — no server upload, no account, and no watermark on the output. This
          makes it safe to use for personal avatars, channel branding, or draft concepts you are
          not ready to publish yet.
        </p>

        <h2>Use the same source for other platforms</h2>
        <p>
          If you want a consistent avatar across platforms, the same square crop works for Twitch,
          Discord, and most other profile picture slots. Use the Discord Profile Picture Resizer
          for the 128×128 / 512×512 Discord sizes, or the Profile Photo Cropper for a generic
          square avatar at common sizes. For a round avatar, the Circle Crop Image tool exports a
          PNG with the corners knocked out (handy for use on websites and decks, even if Twitch
          itself fills the background).
        </p>
      </section>

      <RelatedTools tools={related} />
      <FAQSection items={faqItems} />
      <StructuredData
        pageTitle="Twitch Profile Picture Resizer — 256×256"
        pageUrl="https://imagecropkit.com/twitch-profile-picture-resizer"
        appName="Twitch Profile Picture Resizer"
        faqItems={faqItems}
        howToSteps={[
          { name: "Upload your image", text: "Drag and drop, click to upload, or paste an image from your clipboard." },
          { name: "Adjust the crop to 256×256", text: "The crop area is pre-set to a 256×256 square. Drag the handles to frame your subject inside the 1:1 frame." },
          { name: "Choose a format", text: "Pick JPG for a photo or PNG for a graphic with sharp edges." },
          { name: "Download", text: "Download the image and upload it in your Twitch channel settings." },
        ]}
      />
    </div>
  );
}