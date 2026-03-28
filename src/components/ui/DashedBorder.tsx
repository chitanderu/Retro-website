interface DashedBorderProps {
  children: React.ReactNode;
  style?: "dashed" | "dotted" | "double";
  color?: string;
  className?: string;
}

export default function DashedBorder({
  children,
  style = "dashed",
  color = "border-secondary/40",
  className = "",
}: DashedBorderProps) {
  return (
    <div className={`border-2 border-${style} ${color} rounded-box p-4 ${className}`}>
      {children}
    </div>
  );
}
