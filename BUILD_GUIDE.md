# From Zero to Hyouka ― 從零構建這個網站的完整指南

## Overview

這份指南按照實際依賴順序，分為 7 個階段，每個階段結束後網站都處於可運行狀態。

```
Phase 1: 項目初始化 + 基礎配置
Phase 2: 全局樣式 + 自定義主題
Phase 3: 佈局骨架 (Layout Shell)
Phase 4: UI 原子組件 (Atoms)
Phase 5: 裝飾組件 + 動畫 (Decorations)
Phase 6: 業務頁面 (Pages)
Phase 7: Blog 系統 (MDX 後端)
```

---

## Phase 1: 項目初始化

### 1.1 創建 Next.js 項目

```bash
npx create-next-app@latest website --typescript --tailwind --app --src-dir
cd website
```

選用 App Router (`src/app/`)，這是 Next.js 的現代路由方案。

### 1.2 安裝依賴

```bash
npm install daisyui motion next-mdx-remote gray-matter
```

| 依賴 | 用途 |
|------|------|
| `daisyui` | Tailwind 的 UI 組件庫，提供 `card`, `btn`, `badge` 等語義化 class |
| `motion` | Framer Motion 的新包名，處理所有動畫 |
| `next-mdx-remote` | 在 Server Component 中渲染 MDX |
| `gray-matter` | 解析 MDX 文件的 YAML frontmatter |

### 1.3 配置字體 — `src/lib/fonts.ts`

```ts
import { Noto_Sans_JP, DotGothic16 } from "next/font/google";

export const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",   // body 正文字體
  display: "swap",
});

export const pixelFont = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel-mplus",    // pixel 像素字體 — 用於標題和裝飾文字
  display: "swap",
});
```

**原理**：`next/font` 在構建時自動下載 Google Fonts 並 self-host，避免外部請求。通過 `variable` 導出 CSS 變量，讓 Tailwind 可以引用。

### 1.4 類型定義 — `src/types/index.ts`

```ts
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
}

export interface PlaylistTrack {
  title: string;
  artist: string;
  src: string;
}
```

先定義好數據結構，後續所有組件和工具函數共享類型。

---

## Phase 2: 全局樣式 + 自定義主題

### 2.1 DaisyUI 自定義主題 — `src/app/globals.css`

這是整個網站「氛圍」的核心。DaisyUI 允許你通過定義語義化顏色變量來創建自己的主題：

```css
@import "tailwindcss";
@plugin "daisyui";

@plugin "daisyui/theme" {
  name: "hyouka";           /* 主題名稱，在 HTML 上用 data-theme="hyouka" 啟用 */
  default: true;
  color-scheme: light;

  /* 底色：柔和的薰衣草白 */
  --color-base-100: oklch(95.5% 0.012 300);
  --color-base-200: oklch(92% 0.016 300);
  --color-base-300: oklch(88% 0.020 300);
  --color-base-content: oklch(28% 0.025 300);

  /* 主色：淡紫丁香 */
  --color-primary: oklch(80% 0.060 290);
  --color-primary-content: oklch(22% 0.035 290);

  /* 副色：淡紫藤 */
  --color-secondary: oklch(82% 0.045 310);
  --color-secondary-content: oklch(22% 0.025 310);

  /* 強調色：薰衣草粉 */
  --color-accent: oklch(84% 0.040 330);
  --color-accent-content: oklch(25% 0.025 330);

  /* 圓角：大圓角 = 可愛感 */
  --radius-box: 1rem;
  --radius-selector: 1.5rem;
}
```

**為什麼用 OKLCH？** OKLCH 是感知均勻的色彩空間，同樣 chroma 值的不同色相看起來飽和度一致，非常適合調配和諧的柔色系。

### 2.2 動畫 + 背景紋理

```css
/* 跑馬燈 */
@keyframes marquee {
  0%   { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

/* 閃爍星星 */
@keyframes sparkle {
  0%, 100% { opacity: 0; transform: scale(0); }
  50%      { opacity: 1; transform: scale(1); }
}

/* 圓點背景 — 復古網格紋理 */
body {
  background-image:
    radial-gradient(circle, oklch(88% 0.020 300) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

### 2.3 自定義滾動條

```css
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: oklch(92% 0.016 300); }
::-webkit-scrollbar-thumb {
  background: oklch(80% 0.045 290);
  border-radius: 4px;
}
```

細節決定品質。連滾動條都要融入主題色。

---

## Phase 3: 佈局骨架

### 3.1 Root Layout — `src/app/layout.tsx`

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" data-theme="hyouka"
      className={`${notoSansJP.variable} ${pixelFont.variable}`}>
      <body className="min-h-screen bg-base-100 font-body">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
```

**關鍵**：
- `data-theme="hyouka"` 啟用自定義主題
- 字體 CSS 變量通過 `className` 注入到 `<html>`，全局可用
- `font-pixel` / `font-body` 是通過 `@theme inline` 定義的 Tailwind 字體工具類

### 3.2 MainLayout — DaisyUI Drawer 佈局

```
┌─────────────────────────────────────────────────┐
│  Navbar (sticky top, with marquee ticker)        │
├──────────┬──────────────────────────────────────┤
│          │                                       │
│ Sidebar  │  Main Content (max-w-4xl centered)    │
│ (w-72)   │                                       │
│          │                                       │
│ Profile  │  [page.tsx renders here]              │
│ Music    │                                       │
│ Status   │                                       │
│ Clock    │                                       │
│          │                                       │
├──────────┴──────────────────────────────────────┤
│  Footer (visitor counter + 88x31 badges)         │
└─────────────────────────────────────────────────┘
```

使用 DaisyUI 的 `drawer` 組件：
- 桌面端：sidebar 永久顯示 (`lg:drawer-open`)
- 移動端：通過 hamburger 觸發 overlay sidebar
- `drawer-toggle` checkbox 控制開關，不需要 JavaScript state

```tsx
<div className="drawer lg:drawer-open">
  <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    <Navbar />
    <main>{children}</main>
    <Footer />
    <DecorativeOverlay />
  </div>
  <div className="drawer-side">
    <Sidebar />   {/* ProfileCard + MusicPlayer + StatusBar + Clock */}
  </div>
</div>
```

### 3.3 Navbar — 跑馬燈 + 導航

Navbar 是 Y2K 感的重要來源：
- `sticky top-0` + `backdrop-blur-sm` = 毛玻璃效果
- 底部有一條跑馬燈 (`animate-[marquee_20s_linear_infinite]`)
- `border-dashed` 邊框
- 移動端用 `<label htmlFor="sidebar-drawer">` 來觸發 drawer（純 CSS 方案）

### 3.4 Footer — 訪客計數器 + 88x31 徽章

- `VisitorCounter`：用 `padStart(6, "0")` 把數字格式化成 `000000`，每位數字獨立渲染在小方塊裡
- 88x31 badges 是 Web 1.0 時代的標準尺寸，用固定的 `h-[31px] w-[88px]` 實現

### 3.5 構建順序

```
layout.tsx → MainLayout → Navbar → Sidebar → Footer
```

每一層都是純 props 傳遞或 composition，沒有全局 state。

---

## Phase 4: UI 原子組件

這些是可復用的最小單位，被所有頁面共享：

### 4.1 SectionHeading

```tsx
<h2 className="flex items-center gap-2 font-[...pixel...] text-2xl">
  <span className="text-secondary">{icon}</span>
  {children}
  <span className="text-secondary">{icon}</span>
  {/* 尾部虛線 — 自動填充剩餘空間 */}
  <span className="ml-2 h-px flex-1 border-t-2 border-dotted border-secondary/30" />
</h2>
```

**技巧**：`flex-1` 讓虛線自動佔滿標題右邊的空間，不需要計算寬度。

### 4.2 BadgeTag

封裝 DaisyUI 的 `badge` 組件，統一使用 pixel 字體：

```tsx
<span className={`badge ${colorMap[color]} font-[...pixel...] text-xs`}>
  {children}
</span>
```

### 4.3 Y2KCard

Motion 動畫卡片，支持三種邊框風格：

```tsx
<motion.div
  initial={{ opacity: 0, y: 15 }}    // 入場：從下方淡入
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ y: -2 }}              // hover：微微上浮
  className="card border-2 border-dashed ..."
>
```

### 4.4 MarqueeText

通用跑馬燈，速度可配置：

```tsx
<div style={{ animation: `marquee ${speed}s linear infinite` }}>
  {children}
</div>
```

---

## Phase 5: 裝飾組件 + 動畫

這些組件**不影響佈局**，純粹是視覺裝飾：

### 5.1 SparkleEffect — 隨機閃爍星星

```
原理：
1. useEffect 生成 N 個隨機位置的星星 { x%, y%, size, delay }
2. 每顆星星是一個 SVG 四角星
3. Motion 控制動畫：opacity [0→1→0] + scale [0→1→0] + rotate
4. repeat: Infinity + 隨機 repeatDelay → 持續不規則閃爍
5. pointer-events-none + absolute inset-0 → 疊在父容器上，不影響交互
```

### 5.2 Stamp — 郵票

```
模擬手帳郵票：
- 外框：dashed border + 半透明背景
- 中心：emoji (✿ / ♡ / ☆)
- 齒孔：頂部和底部的 dotted border
- transform: rotate(Ndeg) → 隨意傾斜感
```

### 5.3 TapeStrip — 膠帶

```
模擬紙膠帶貼在卡片角落：
- 用 repeating-linear-gradient 製作半透明條紋
- 定位到四個角之一 (-top-2 -left-3 等)
- Motion 入場動畫：scale 0.8 → 1
```

### 5.4 DecorativeOverlay — 全局浮動裝飾

```
fixed inset-0 z-50 的全屏容器，放置多個 FloatingDecoration：
- 每個 FloatingDecoration 包裹一個 Sticker (star/heart/flower/sparkle)
- 用 CSS animation float 實現上下浮動
- pointer-events-none → 不阻擋任何點擊
```

---

## Phase 6: 業務頁面

### 6.1 Homepage (`src/app/page.tsx`)

```
┌────────────────────────────────────┐
│ Welcome Card (dashed border)       │
│   SparkleEffect + Stamp            │
│   "☆ 氷菓 ― Hyouka ☆"            │
├────────────────────────────────────┤
│ ✦ Photo ✦ ─────────────────        │
│ ┌────────────────────────────────┐ │
│ │       Hero Image               │ │
│ └────────────────────────────────┘ │
├────────────────────────────────────┤
│ ✎ Recent Posts ✎ ───────────       │
│   [post card] [post card] ...      │
├────────────────────────────────────┤
│ ♡ Explore ♡ ────────────────       │
│   [Blog] [Gallery] [About]        │
└────────────────────────────────────┘
```

首頁是 **Server Component**（默認），直接在服務器端調用 `getBlogPosts()` 讀取文件系統。

### 6.2 Gallery (`src/app/gallery/page.tsx`)

```
Client Component ("use client"):
- 8 個彩色佔位格子，grid 佈局
- 點擊打開 lightbox modal
- AnimatePresence 控制 modal 的進出動畫
- backdrop-blur-sm 毛玻璃背景
```

### 6.3 About (`src/app/about/page.tsx`)

```
Server Component:
- 動畫介紹卡 + TapeStrip + Stamp
- Characters grid（四位古典部成員）
- Keywords badges
- Anime Info 表格
- Site Info
```

---

## Phase 7: Blog 系統 — MDX 後端實現

這是最核心的部分。Blog 功能**完全在 Next.js 的 Server 端實現**，不需要數據庫、不需要 CMS、不需要 API 路由。

### 7.1 架構圖

```
src/content/blog/                  src/lib/mdx.ts              src/app/blog/
┌──────────────────┐              ┌──────────────┐            ┌──────────────┐
│ hello-world.mdx  │──fs.read──→ │ getBlogPosts()│──import──→ │ page.tsx     │
│ building-site.mdx│              │ getBlogPost() │            │ [slug]/page  │
└──────────────────┘              └──────────────┘            └──────────────┘
        │                                │                           │
   frontmatter                     gray-matter                  MDXRemote
   + markdown                     解析 YAML                   渲染 MDX → HTML
```

### 7.2 MDX 文件格式

每篇文章是一個 `.mdx` 文件，頂部有 YAML frontmatter：

```mdx
---
title: "Hello World ☆"
date: "2025-03-28"
description: "My first blog post!"
tags: ["intro", "personal"]
---

# Hello World!

正文內容，支持所有 Markdown 語法...
```

### 7.3 後端讀取邏輯 — `src/lib/mdx.ts`

**getBlogPosts()** — 獲取所有文章列表（不含正文）：

```ts
const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export function getBlogPosts(): Omit<BlogPost, "content">[] {
  // 1. 讀取目錄下所有 .mdx 文件
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  // 2. 逐個解析 frontmatter
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");  // hello-world.mdx → hello-world
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);          // gray-matter 解析 YAML

    return { slug, title: data.title, date: data.date, ... };
  });

  // 3. 按日期降序排列
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}
```

**getBlogPost(slug)** — 獲取單篇文章（含正文）：

```ts
export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  //              ↑ frontmatter    ↑ markdown 正文

  return { slug, title: data.title, ..., content };
}
```

**為什麼這可以直接在組件裡調用 `fs`？**

因為 Next.js App Router 的頁面組件**默認是 Server Component**，它們只在服務器端（或構建時）執行。`fs.readFileSync` 永遠不會出現在發送給瀏覽器的 bundle 中。這就是「Next.js 後端」的含義 — 不是傳統的 API 後端，而是在渲染層直接訪問服務器資源。

### 7.4 文章列表頁 — `src/app/blog/page.tsx`

```tsx
// 這是 Server Component（沒有 "use client"）
export default function Blog() {
  const posts = getBlogPosts();   // ← 直接調用，在服務端讀文件系統

  return (
    <div>
      {posts.map((post) => (
        <Link href={`/blog/${post.slug}`}>
          <article>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            {post.tags.map(tag => <BadgeTag>{tag}</BadgeTag>)}
          </article>
        </Link>
      ))}
    </div>
  );
}
```

### 7.5 文章詳情頁 — `src/app/blog/[slug]/page.tsx`

```tsx
// 靜態生成：構建時預渲染所有已知的 slug
export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// 動態路由：[slug] 從 URL 參數中取得
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);     // ← 讀取完整文章

  if (!post) notFound();              // ← 404 處理

  return (
    <article>
      <h1>{post.title}</h1>
      {/* MDXRemote 將 markdown 字符串渲染為 React 組件 */}
      <MDXRemote source={post.content} />
    </article>
  );
}
```

### 7.6 MDXRemote 渲染流程

```
post.content (markdown string)
        │
        ▼
  MDXRemote (from next-mdx-remote/rsc)
        │
        ├── 解析 Markdown → AST
        ├── 轉換 AST → React elements
        └── 輸出 HTML
        │
        ▼
  <div className="prose ...">
    <h1>Hello World!</h1>
    <p>正文內容...</p>
  </div>
```

`next-mdx-remote/rsc` 的 `rsc` 表示這是專為 React Server Components 設計的版本，渲染完全在服務端完成。

### 7.7 `generateStaticParams` 的作用

```
構建時 (next build):
  1. 調用 generateStaticParams()
  2. 返回 [{ slug: "hello-world" }, { slug: "building-this-site" }]
  3. Next.js 為每個 slug 預渲染一個靜態 HTML 頁面
  4. 部署後這些頁面直接從 CDN 返回，無需服務器計算

結果：
  /blog/hello-world        → 靜態 HTML（毫秒級加載）
  /blog/building-this-site → 靜態 HTML（毫秒級加載）
```

### 7.8 新增一篇文章的流程

```bash
# 1. 創建 MDX 文件
touch src/content/blog/my-new-post.mdx

# 2. 寫入 frontmatter + 內容
cat > src/content/blog/my-new-post.mdx << 'EOF'
---
title: "新文章標題"
date: "2026-03-29"
description: "文章簡介"
tags: ["tag1", "tag2"]
---

# 正文

寫你想寫的內容...
EOF

# 3. 完成！
# dev 模式自動刷新，build 時自動包含
```

不需要修改任何配置、不需要註冊路由、不需要操作數據庫。文件系統就是數據庫。

---

## 完整構建順序匯總

```
Step  What                         Why (dependency)
─────────────────────────────────────────────────────────────
 1    create-next-app + deps       基礎環境
 2    types/index.ts               後續所有代碼共享的類型
 3    lib/fonts.ts                 字體 CSS 變量，被 layout 引用
 4    globals.css (theme)          主題色 + 動畫，被所有組件引用
 5    layout.tsx                   根佈局，掛載字體和主題
 6    BadgeTag, SectionHeading     最基礎的 UI 原子
 7    SparkleEffect, Stamp, etc.   裝飾組件（無業務依賴）
 8    Navbar                       頂部導航
 9    ProfileCard, Clock, etc.     Sidebar widgets
10    MusicPlayer + useAudioPlayer 音樂播放器（依賴 playlist.ts）
11    Sidebar                      組合 widgets
12    VisitorCounter               Footer 子組件
13    Footer                       底部
14    DecorativeOverlay            全局浮動裝飾
15    MainLayout                   組合 Navbar + Sidebar + Footer
16    lib/mdx.ts                   Blog 後端讀取邏輯
17    blog/page.tsx                文章列表頁
18    blog/[slug]/page.tsx         文章詳情頁 + MDX 渲染
19    page.tsx (Homepage)          首頁（依賴 getBlogPosts）
20    gallery/page.tsx             Gallery 頁面
21    about/page.tsx               About 頁面
─────────────────────────────────────────────────────────────
```

---

## Key Takeaways

1. **Server Component = 後端**：Next.js App Router 的組件默認在服務端執行，可以直接用 `fs` 讀文件、訪問環境變量，不需要寫 API 路由
2. **文件系統即數據庫**：MDX 文件放在 `src/content/blog/`，文件名就是 URL slug，frontmatter 就是元數據
3. **`generateStaticParams` = 靜態生成**：構建時預渲染所有頁面，部署後零服務器成本
4. **`"use client"` 只用在需要的地方**：只有用到 `useState`、`useEffect`、事件處理的組件才標記為 Client Component（如 MusicPlayer、Gallery、Clock）
5. **DaisyUI 主題 = 一處定義，全局生效**：改 `globals.css` 裡的幾個顏色變量就能改變整站風格
6. **裝飾組件全部 `pointer-events-none`**：純視覺層，不影響任何交互
