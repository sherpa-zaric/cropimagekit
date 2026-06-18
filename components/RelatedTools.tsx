import Link from "next/link";

export interface RelatedTool {
  title: string;
  href: string;
  description?: string;
}

interface RelatedToolsProps {
  tools: RelatedTool[];
  title?: string;
}

export default function RelatedTools({
  tools,
  title = "Related image tools",
}: RelatedToolsProps) {
  if (tools.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-center mb-3">{title}</h2>
      <p className="text-center text-muted-foreground text-sm mb-8 max-w-xl mx-auto">
        Other ImageCropKit tools that pair well with the one you are using.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="block p-5 rounded-xl border bg-card hover:border-primary/40 transition-colors"
          >
            <h3 className="font-semibold mb-1">{tool.title}</h3>
            {tool.description && (
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
