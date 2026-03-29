# 氷菓 ― Hyouka 粉絲網站

中文 | **[English](./README.md)**

一個以 Y2K 可愛風格打造的《氷菓》動畫粉絲網站，結合現代網頁技術與復古美學。Demo：https://yuuki.diy/hyouka

![效果展示](https://img.yuuki.diy/%E6%88%AA%E5%B1%8F2026-03-29%2017.50.16.png)

## 技術棧

| 層級 | 技術 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| UI | React 19 + TypeScript |
| 樣式 | Tailwind CSS 4 + DaisyUI 5 |
| 動畫 | Motion (Framer Motion) |
| 博客 | MDX (next-mdx-remote + gray-matter) |
| 字體 | DotGothic16 (像素風) + Noto Sans JP (正文) |

## 功能特色

- **開屏動畫** — 全屏視頻背景 + 像素風標題「HYOUKA」，點擊任意處進入網站
- **自定義主題** — 柔和薰衣草紫色系（`hyouka` DaisyUI 主題），使用 OKLCH 色彩空間
- **響應式佈局** — DaisyUI Drawer：桌面端顯示固定側邊欄，移動端抽屜式側邊欄
- **博客系統** — 基於文件系統的 MDX 博客，支持 frontmatter 元數據，無需數據庫
- **圖片畫廊** — 網格佈局 + 點擊放大的 Lightbox 彈窗，含 Motion 動畫
- **音樂播放器** — iPod 風格播放器，圓形轉盤控制，支持播放列表和上下曲切換
- **訪客計數器** — 真實計數器，通過 API Route + JSON 文件持久化，每個 Session 只計數一次
- **裝飾組件** — 閃爍星星、郵票、紙膠帶、浮動貼紙、圓點網格背景
- **跑馬燈** — 導航欄底部的滾動文字
- **88x31 徽章** — Web 1.0 時代風格的頁腳小徽章

## 項目結構

```
src/
├── app/
│   ├── layout.tsx              # 根佈局（主題、字體、開屏動畫）
│   ├── page.tsx                # 首頁（歡迎區、Hero 圖片、最近文章、快捷導航）
│   ├── globals.css             # Hyouka 主題 + 動畫 + 自定義滾動條
│   ├── blog/
│   │   ├── page.tsx            # 博客文章列表
│   │   └── [slug]/page.tsx     # 博客文章詳情（MDX 渲染）
│   ├── gallery/page.tsx        # 圖片畫廊 + Lightbox
│   ├── about/page.tsx          # 氷菓動畫介紹 + 角色 + 製作信息
│   └── api/counter/route.ts    # 訪客計數器 API（GET/POST）
│
├── components/
│   ├── layout/                 # MainLayout、Navbar、Sidebar、Footer、DecorativeOverlay
│   ├── ui/                     # HeroSplash、Y2KCard、SectionHeading、BadgeTag 等
│   ├── decorations/            # SparkleEffect、Stamp、TapeStrip、Sticker 等
│   └── widgets/                # ProfileCard、MusicPlayer、Clock、StatusBar、VisitorCounter
│
├── content/blog/               # MDX 博客文章
├── hooks/                      # useAudioPlayer 音頻播放 Hook
├── lib/                        # 字體配置、MDX 解析器、播放列表、友鏈數據
└── types/                      # TypeScript 類型定義

data/
└── counter.json                # 訪客計數（自動創建，已加入 .gitignore）

public/
├── images/                     # 靜態圖片
└── audio/                      # 播放器音樂文件
```

## 快速開始

```bash
npm install
npm run dev
```

打開 http://localhost:3000 即可預覽。

## 內容管理

**博客** — 在 `src/content/blog/` 下新增 `.mdx` 文件：

```mdx
---
title: "文章標題"
date: "2026-03-29"
description: "簡短描述"
tags: ["標籤1", "標籤2"]
---

正文內容，支持 Markdown 語法...
```

文件名即為 URL slug（例如 `my-post.mdx` 對應 `/blog/my-post`），無需額外配置路由。

**畫廊** — 編輯 `src/app/gallery/page.tsx` 中的 `galleryItems` 數組，每個項目包含 `id`、`title`、`src`（圖片 URL）。

**音樂** — 將 `.mp3` 文件放入 `public/audio/`，然後編輯 `src/lib/playlist.ts`。

**頭像/主題** — 編輯 `src/components/widgets/ProfileCard.tsx`（側邊欄卡片）和 `src/app/globals.css`（主題色彩）。

## 復古風格實現方式

1. **自定義 DaisyUI 主題** — 在 `globals.css` 中用 OKLCH 定義柔和粉紫色系，大圓角營造可愛感
2. **虛線/點線邊框** — 全站使用 `border-dashed`、`border-dotted` 配合低透明度主題色，模擬手繪感
3. **像素字體** — DotGothic16 用於所有標題和裝飾文字，通過 `@theme` 定義的 `font-pixel` 工具類調用
4. **裝飾組件** — SparkleEffect（閃爍 SVG 星星）、Stamp（齒孔郵票）、TapeStrip（紙膠帶）
5. **跑馬燈** — 導航欄底部的 CSS `translateX` 無限滾動動畫
6. **訪客計數器** — `000000` 格式的數字方塊，帶滾動數字動畫
7. **88x31 徽章** — 頁腳固定尺寸的 Web 1.0 風格按鈕
8. **圓點背景** — `<body>` 上的 `radial-gradient` 圓點網格紋理

## 博客系統原理

博客完全在 Next.js Server 端實現，無需數據庫或 CMS：

```
src/content/blog/*.mdx  →  gray-matter 解析  →  Server Component 渲染
                                                      ↓
                                               MDXRemote 輸出 HTML
```

- 頁面組件默認是 **Server Component**，可直接調用 `fs` 讀取文件系統
- `generateStaticParams` 在構建時預渲染所有文章頁面（SSG）
- 新增文章只需添加 `.mdx` 文件，零配置

## 許可

本項目為粉絲作品。《氷菓》由米澤穗信創作，京都動畫製作。
