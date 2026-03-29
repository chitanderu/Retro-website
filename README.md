# 氷菓 ― Hyouka Fan Site

**[中文版](./README_ZH.md)** | English

A Y2K kawaii-styled fan site dedicated to the anime _Hyouka_ (氷菓), built with modern web technologies and retro aesthetics. view demo：https://yuuki.diy/hyouka

![Demo Screenshot](https://img.yuuki.diy/%E6%88%AA%E5%B1%8F2026-03-29%2017.50.16.png)

## Tech Stack

| Layer     | Technology                                |
| --------- | ----------------------------------------- |
| Framework | Next.js 16 (App Router)                   |
| UI        | React 19 + TypeScript                     |
| Styling   | Tailwind CSS 4 + DaisyUI 5                |
| Animation | Motion (Framer Motion)                    |
| Blog      | MDX (next-mdx-remote + gray-matter)       |
| Fonts     | DotGothic16 (pixel) + Noto Sans JP (body) |

## Features

- **Splash Screen** — Full-screen video intro with pixel-font title, click to enter
- **Custom Theme** — Soft lavender/purple palette (`hyouka` DaisyUI theme) with OKLCH colors
- **Responsive Layout** — DaisyUI drawer: persistent sidebar on desktop, overlay on mobile
- **Blog System** — File-based MDX blog with frontmatter, no database needed
- **Image Gallery** — Grid layout with lightbox modal and Motion animations
- **Music Player** — iPod-styled player with click wheel, supports playlist
- **Visitor Counter** — Real hit counter backed by API route + JSON file, session-aware
- **Decorations** — Sparkle effects, stamps, tape strips, floating stickers, dot-grid background
- **Marquee Ticker** — Scrolling text in the navbar
- **88x31 Badges** — Web 1.0 style footer badges

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (theme, fonts, HeroSplash)
│   ├── page.tsx                # Home (welcome, hero image, posts, links)
│   ├── globals.css             # Hyouka theme + animations + scrollbar
│   ├── blog/
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/page.tsx     # Blog post (MDX rendering)
│   ├── gallery/page.tsx        # Image gallery with lightbox
│   ├── about/page.tsx          # Hyouka anime info + characters
│   └── api/counter/route.ts    # Visitor counter API (GET/POST)
│
├── components/
│   ├── layout/                 # MainLayout, Navbar, Sidebar, Footer, DecorativeOverlay
│   ├── ui/                     # HeroSplash, Y2KCard, SectionHeading, BadgeTag, etc.
│   ├── decorations/            # SparkleEffect, Stamp, TapeStrip, Sticker, etc.
│   └── widgets/                # ProfileCard, MusicPlayer, Clock, StatusBar, VisitorCounter
│
├── content/blog/               # MDX blog posts
├── hooks/                      # useAudioPlayer
├── lib/                        # fonts, mdx parser, playlist, friends
└── types/                      # TypeScript interfaces

data/
└── counter.json                # Visitor count (auto-created, gitignored)

public/
├── images/                     # Static images
└── audio/                      # Music files for the player
```

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Content Management

**Blog** — Add `.mdx` files to `src/content/blog/`:

```mdx
---
title: "Post Title"
date: "2026-03-29"
description: "A short description"
tags: ["tag1", "tag2"]
---

Markdown content here...
```

**Gallery** — Edit the `galleryItems` array in `src/app/gallery/page.tsx`, each item has `id`, `title`, and `src` (image URL).

**Music** — Put `.mp3` files in `public/audio/` and edit `src/lib/playlist.ts`.

**Profile / Theme** — Edit `src/components/widgets/ProfileCard.tsx` and `src/app/globals.css`.

## How the Retro Style Works

1. **Custom DaisyUI Theme** — Soft OKLCH pastel colors defined in `globals.css`, extra-rounded corners
2. **Dashed/Dotted Borders** — `border-dashed`, `border-dotted` with low-opacity theme colors throughout
3. **Pixel Font** — DotGothic16 for all headings and decorative text (`font-pixel` utility via `@theme`)
4. **Decoration Components** — SparkleEffect (twinkling SVG stars), Stamp (postage stamp), TapeStrip (washi tape)
5. **Marquee** — CSS `translateX` animation in the navbar
6. **Visitor Counter** — `000000` digit boxes with rolling number animation
7. **88x31 Badges** — Fixed-size Web 1.0 era buttons in the footer
8. **Dot Grid Background** — `radial-gradient` pattern on `<body>`

## License

This is a fan project. _Hyouka_ (氷菓) is created by Honobu Yonezawa and animated by Kyoto Animation.
