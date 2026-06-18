import Link from "next/link";

interface ToolCardProps {
  href: string;
  title: string;
  description: string;
}

export default function ToolCard({ href, title, description }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="block p-6 rounded-lg border border-border bg-card hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all"
    >
      <h3 className="font-medium mb-1.5">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </Link>
  );
}
