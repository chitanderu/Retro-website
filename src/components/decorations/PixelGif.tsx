import Image from "next/image";

interface PixelGifProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export default function PixelGif({
  src,
  alt,
  size = 32,
  className = "",
}: PixelGifProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      unoptimized
      loading="lazy"
      className={`pointer-events-none select-none image-rendering-pixelated ${className}`}
    />
  );
}
