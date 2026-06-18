export default function TrustBadges() {
  const items = ["No Upload", "No Signup", "No Watermark", "Browser-Based", "ZIP Download"];

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="text-[11px] uppercase tracking-widest text-muted-foreground border border-border rounded-full px-3 py-1"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
