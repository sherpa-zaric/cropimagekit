import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center space-y-6">
      <h1 className="text-6xl font-bold text-muted-foreground/30">404</h1>
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <p className="text-muted-foreground max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
        >
          Go to homepage
        </Link>
        <Link
          href="/crop-image"
          className="rounded-md border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
        >
          Crop an image
        </Link>
        <Link
          href="/bulk-crop-images"
          className="rounded-md border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
        >
          Bulk crop
        </Link>
      </div>
    </div>
  );
}
