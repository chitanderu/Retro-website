interface SectionHeadingProps {
  children: React.ReactNode;
  icon?: string;
  className?: string;
}

export default function SectionHeading({
  children,
  icon = "✦",
  className = "",
}: SectionHeadingProps) {
  return (
    <h2
      className={`flex items-center gap-2 font-[family-name:var(--font-pixel-mplus)] text-2xl text-base-content ${className}`}
    >
      <span className="text-secondary">{icon}</span>
      {children}
      <span className="text-secondary">{icon}</span>
      <span className="ml-2 h-px flex-1 border-t-2 border-dotted border-secondary/30" />
    </h2>
  );
}
