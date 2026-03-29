# MySite ✧ Y2K Personal Website

A retro Y2K / early-2000s inspired personal website built with modern technologies.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS 4 + DaisyUI 5 |
| Animation | Motion (Framer Motion) |
| Content | MDX (via next-mdx-remote + gray-matter) |
| Fonts | DotGothic16 (pixel) + Noto Sans JP (body) |
| Language | TypeScript |

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (fonts, metadata, MainLayout wrapper)
│   ├── page.tsx                # Homepage — welcome, photo grid, recent posts, links
│   ├── globals.css             # Custom DaisyUI theme + animations + scrollbar
│   ├── blog/
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/page.tsx     # Individual blog post (MDX rendering)
│   ├── gallery/page.tsx        # Gallery page
│   ├── friends/page.tsx        # Blogroll / links page
│   └── about/page.tsx          # About page
│
├── components/
│   ├── layout/                 # Structural components
│   │   ├── MainLayout.tsx      # DaisyUI drawer layout (navbar + sidebar + footer)
│   │   ├── Navbar.tsx          # Sticky top bar with marquee ticker
│   │   ├── Sidebar.tsx         # Side panel (profile, music player, clock)
│   │   ├── Footer.tsx          # 88x31 buttons + visitor counter
│   │   └── DecorativeOverlay.tsx
│   │
│   ├── ui/                     # Reusable UI primitives
│   │   ├── Y2KCard.tsx         # Animated card with dashed/dotted/double border
│   │   ├── SectionHeading.tsx  # Heading with icon + dotted trailing line
│   │   ├── BadgeTag.tsx        # Small colored tag
│   │   ├── MarqueeText.tsx     # Scrolling ticker text
│   │   ├── PixelButton.tsx     # Pixel-styled button
│   │   ├── DashedBorder.tsx    # Decorative border wrapper
│   │   └── PageTransition.tsx  # Route transition animation
│   │
│   ├── decorations/            # Pure visual embellishments
│   │   ├── SparkleEffect.tsx   # Random twinkling SVG stars (Motion)
│   │   ├── Stamp.tsx           # Postage stamp with perforated edges
│   │   ├── Sticker.tsx         # Decorative sticker
│   │   ├── PaperClip.tsx       # Paper clip accent
│   │   ├── TapeStrip.tsx       # Tape strip accent
│   │   ├── FloatingDecoration.tsx
│   │   └── PixelGif.tsx        # Pixel art GIF display
│   │
│   └── widgets/                # Interactive sidebar widgets
│       ├── ProfileCard.tsx     # Avatar + bio card
│       ├── MusicPlayer.tsx     # Audio player
│       ├── Clock.tsx           # Live clock
│       ├── StatusBar.tsx       # Status message display
│       └── VisitorCounter.tsx  # Animated hit counter (000000 style)
│
├── content/blog/               # MDX blog posts
├── hooks/                      # Custom React hooks (useAudioPlayer)
├── lib/                        # Utilities (MDX parser, fonts, playlist, friends data)
└── types/                      # TypeScript type definitions

public/
├── images/                     # Static images (gallery, profile, decorations, gifs)
├── audio/                      # Music files for the player
└── fonts/                      # Local font files (if any)
```

## How the Retro Y2K Style Works

The visual style of this site comes from layering several techniques on top of each other. Here's how each piece contributes:

### 1. Custom DaisyUI Theme — The Color Foundation

In `globals.css`, a custom theme called `hyouka` defines the entire color palette using OKLCH values. The key to the retro look is choosing **soft, low-saturation pastel colors** rather than vibrant modern ones:

```css
@plugin "daisyui/theme" {
  name: "hyouka";
  color-scheme: light;

  --color-base-100: oklch(95.5% 0.012 300);   /* soft lavender white */
  --color-primary: oklch(80% 0.060 290);       /* muted lilac purple  */
  --color-secondary: oklch(82% 0.045 310);     /* light wisteria      */
  --color-accent: oklch(84% 0.040 330);        /* pale lavender pink  */

  /* Extra-rounded corners for a kawaii feel */
  --radius-box: 1rem;
  --radius-selector: 1.5rem;
}
```

Everything downstream (cards, buttons, badges) inherits from this palette automatically.

### 2. Dashed & Dotted Borders — The "Handmade" Texture

Early-2000s personal sites loved borders that looked hand-drawn. Throughout the codebase, borders use `border-dashed` and `border-dotted` with low-opacity theme colors:

```tsx
// Navbar — dashed bottom border
<nav className="border-b-2 border-dashed border-secondary/50 bg-base-100/90 backdrop-blur-sm">

// Card — dotted border that glows on hover
<div className="card border border-dotted border-secondary/30 hover:border-secondary/60">

// Footer — dashed top separator
<footer className="border-t-2 border-dashed border-secondary/30">
```

The `Y2KCard` component makes this a reusable pattern with configurable `borderStyle` (dashed / dotted / double).

### 3. Pixel Font — Instant Nostalgia

The `DotGothic16` font from Google Fonts is loaded in `lib/fonts.ts` and assigned to the CSS variable `--font-pixel-mplus`. It's applied to all headings, nav links, and decorative text via Tailwind:

```tsx
<h1 className="font-pixel text-3xl">
  ☆ Welcome to My Site ☆
</h1>
```

Body text uses `Noto Sans JP` for readability, creating a contrast between "retro headings" and "clean body."

### 4. Decorative Components — Stickers, Stamps, Sparkles

The `components/decorations/` directory contains purely visual elements that mimic scrapbook aesthetics:

**SparkleEffect** — random SVG stars that fade in/out with Motion:
```tsx
<SparkleEffect count={4} />
// Generates random ✦ shapes that twinkle across the parent container
```

**Stamp** — a postage-stamp element with perforated edges:
```tsx
<Stamp variant={1} rotation={8} className="right-3 top-3" />
// Renders a tilted ✿ stamp with dotted perforation lines
```

These are scattered across pages to create the feeling of a decorated notebook.

### 5. Marquee Ticker — A Y2K Classic

The navbar includes a scrolling text ticker, defined with a pure CSS animation:

```css
@keyframes marquee {
  0%   { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
```

```tsx
<div className="animate-[marquee_20s_linear_infinite] text-xs text-base-content/40">
  ☆ Welcome to my personal site! ☆ ようこそ！ ☆
</div>
```

### 6. Visitor Counter — The "Hit Counter"

The `VisitorCounter` widget mimics those old-school `000000` hit counters. Each digit is rendered as an individual `<span>` with a background:

```tsx
const digits = count.toString().padStart(6, "0");
// Renders: [0][0][1][0][4][2]
// Each in its own rounded box with pixel font
```

### 7. 88x31 Buttons — Web 1.0 Badges

The footer includes 88x31 pixel badges (the standard size from the GeoCities era):

```tsx
<div className="h-[31px] w-[88px] rounded border border-dashed text-[7px]">
  NEXT.JS
</div>
```

### 8. Subtle Background Pattern

A dot-grid pattern on the `<body>` adds texture without distraction:

```css
body {
  background-image:
    radial-gradient(circle, oklch(88% 0.020 300) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

### Putting It All Together

A single section on the homepage combines all these techniques:

```tsx
<div className="card relative border-2 border-dashed border-secondary/40 bg-base-200 p-6">
  {/* 1. Sparkle decoration */}
  <SparkleEffect count={4} />
  {/* 2. Stamp decoration */}
  <Stamp variant={1} rotation={8} className="right-3 top-3" />
  {/* 3. Pixel font heading with emoji brackets */}
  <h1 className="font-pixel text-3xl">
    ☆ Welcome to My Site ☆
  </h1>
  {/* 4. Body text in clean font, low-opacity color */}
  <p className="mt-3 text-base-content/70">
    ようこそ！ Welcome to my little corner of the internet.
  </p>
</div>
```

The result: a dashed-border card, on a dot-grid background, with twinkling stars and a tilted stamp — instantly recognizable as "retro personal site" while being built entirely with modern tooling.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Adding Content

- **Blog posts**: Add `.mdx` files to `src/content/blog/`
- **Gallery images**: Add images to `public/images/gallery/` (named `1.jpg`, `2.jpg`, etc.)
- **Friends/links**: Edit `src/lib/friends.ts`
- **Music**: Add audio files to `public/audio/` and update `src/lib/playlist.ts`
