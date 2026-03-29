import type { Metadata } from "next";
import { notoSansJP, pixelFont } from "@/lib/fonts";
import MainLayout from "@/components/layout/MainLayout";
import HeroSplash from "@/components/ui/HeroSplash";
import "./globals.css";

export const metadata: Metadata = {
  title: "氷菓 ― Hyouka ☆",
  description: "A Y2K kawaii fan site for Hyouka (氷菓)",
  icons: {
    icon: "https://img.yuuki.diy/icon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      data-theme="hyouka"
      className={`${notoSansJP.variable} ${pixelFont.variable}`}
    >
      <body className="min-h-screen bg-base-100 font-body">
        <HeroSplash />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
