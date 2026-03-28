interface PaperClipProps {
  side?: "top" | "right";
  color?: string;
  className?: string;
}

export default function PaperClip({
  side = "top",
  color = "#A89080",
  className = "",
}: PaperClipProps) {
  const isTop = side === "top";

  return (
    <div
      className={`pointer-events-none absolute z-10 ${
        isTop ? "-top-4 left-6" : "top-4 -right-3"
      } ${className}`}
      style={isTop ? undefined : { transform: "rotate(90deg)" }}
    >
      <svg
        width="20"
        height="32"
        viewBox="0 0 20 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 2C6 2 4 2 4 4V24C4 26 6 28 8 28H12C14 28 16 26 16 24V8C16 6 14 4 12 4H10C8 4 6 6 6 8V20C6 22 8 24 10 24"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
