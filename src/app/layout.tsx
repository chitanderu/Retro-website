import type { Metadata } from "next";
import { notoSansJP, pixelFont } from "@/lib/fonts";
import MainLayout from "@/components/layout/MainLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Personal Site ☆",
  description: "A Y2K kawaii personal website",
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
      <body className="min-h-screen bg-base-100 font-[family-name:var(--font-noto-sans-jp)]">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
