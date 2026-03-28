interface MarqueeTextProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default function MarqueeText({
  children,
  speed = 20,
  className = "",
}: MarqueeTextProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="whitespace-nowrap font-[family-name:var(--font-pixel-mplus)] text-xs"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {children}
      </div>
    </div>
  );
}
