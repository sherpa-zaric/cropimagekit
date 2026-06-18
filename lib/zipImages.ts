import JSZip from "jszip";
import { saveAs } from "file-saver";

export interface ZipEntry {
  name: string;
  blob: Blob;
}

export async function downloadAsZip(entries: ZipEntry[], zipName: string = "cropped-images.zip"): Promise<void> {
  const zip = new JSZip();

  for (const entry of entries) {
    zip.file(entry.name, blobToUint8Array(entry.blob));
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  saveAs(zipBlob, zipName);
}

async function blobToUint8Array(blob: Blob): Promise<Uint8Array> {
  const arrayBuffer = await blob.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}
