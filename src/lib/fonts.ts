import { Noto_Sans_JP, DotGothic16 } from "next/font/google";

export const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

// DotGothic16 — a pixel-style Google Font with Japanese support
// Used as the pixel font for headings, nav, and decorative text
export const pixelFont = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel-mplus",
  display: "swap",
});
