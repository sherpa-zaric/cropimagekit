import Image from "next/image";
import Link from "next/link";

export default function BulkCropExample() {
  return <section className="space-y-6" aria-labelledby="bulk-example-title">
    <div className="space-y-2">
      <h2 id="bulk-example-title" className="text-2xl font-semibold">Different originals. The same square shape.</h2>
      <p className="text-muted-foreground max-w-3xl">These test images were cropped in this editor and exported as PNG. Both results are 1:1, but their pixel dimensions differ because each crop keeps its source resolution.</p>
    </div>
    <div className="grid gap-8 sm:grid-cols-2">
      {[{ name: "landscape", w: 1600, h: 1200, size: 600 }, { name: "portrait", w: 900, h: 1600, size: 450 }].map(item => <figure key={item.name} className="space-y-3">
        <div className="grid grid-cols-2 items-center gap-4">
          <div className="space-y-2">
            <Image src={`/bulk-examples/${item.name}.png`} alt={`${item.name} test image with a blue subject and marked edges`} width={item.w} height={item.h} className="w-full h-52 object-contain" />
            <p className="text-center text-sm">Original · {item.w} × {item.h}</p>
          </div>
          <div className="space-y-2">
            <Image src={`/bulk-examples/${item.name}-cropped.png`} alt={`Actual square export of the ${item.name} test image`} width={item.size} height={item.size} className="w-full h-52 object-contain" />
            <p className="text-center text-sm">PNG · {item.size} × {item.size}</p>
          </div>
        </div>
        <figcaption className="text-sm"><a href={`/bulk-examples/${item.name}.png`} download className="underline underline-offset-4">Download {item.name} sample</a></figcaption>
      </figure>)}
    </div>
    <p className="text-sm"><Link href="/blog/bulk-crop-images-guide" className="underline underline-offset-4">Mixed-size batch cropping: framing, output sizes and ZIP checks</Link></p>
  </section>;
}
