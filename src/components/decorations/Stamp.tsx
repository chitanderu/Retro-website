interface StampProps {
  variant?: 1 | 2 | 3;
  rotation?: number;
  className?: string;
}

export default function Stamp({
  variant = 1,
  rotation = -5,
  className = "",
}: StampProps) {
  const stamps = {
    1: { emoji: "✿", bg: "bg-primary/20", border: "border-primary/30" },
    2: { emoji: "♡", bg: "bg-secondary/20", border: "border-secondary/30" },
    3: { emoji: "☆", bg: "bg-accent/20", border: "border-accent/30" },
  };

  const stamp = stamps[variant];

  return (
    <div
      className={`pointer-events-none absolute z-10 ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-sm border-2 border-dashed ${stamp.border} ${stamp.bg} opacity-70`}
      >
        <span className="text-lg">{stamp.emoji}</span>
      </div>
      {/* Perforation edges */}
      <div className="absolute -bottom-0.5 left-0 right-0 h-1 border-t border-dotted border-base-content/10" />
      <div className="absolute -top-0.5 left-0 right-0 h-1 border-b border-dotted border-base-content/10" />
    </div>
  );
}
