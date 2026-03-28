interface BadgeTagProps {
  children: React.ReactNode;
  color?: "primary" | "secondary" | "accent" | "neutral";
  className?: string;
}

const colorMap = {
  primary: "badge-primary",
  secondary: "badge-secondary",
  accent: "badge-accent",
  neutral: "badge-neutral",
};

export default function BadgeTag({
  children,
  color = "secondary",
  className = "",
}: BadgeTagProps) {
  return (
    <span
      className={`badge ${colorMap[color]} font-[family-name:var(--font-pixel-mplus)] text-xs ${className}`}
    >
      {children}
    </span>
  );
}
