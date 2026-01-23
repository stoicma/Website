# Marko Stokić Brand Videos - Remotion Project

This directory contains two Remotion video compositions:

1. **BrandVideo** (90 seconds) - Cinematic personal brand story
2. **MarkoHighlight** (15 seconds) - Quick highlight reel

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

## Videos

### Brand Video (90 seconds)

A cinematic personal brand video telling Marko's journey from 2017 to present.

**Structure:**
- **Act 1: The Wilderness** (0-25s) - The 2017 gap year decision and blockchain beginnings
- **Act 2: The Doubters** (25-45s) - Overcoming skepticism and finding community
- **Act 3: The Journey** (45-75s) - Career progression through Bocconi, Wayra, Fractal ID, Oasis
- **Act 4: Thought Leader** (75-95s) - Forbes, publications, speaking engagements
- **Act 5: Closing** (95-105s) - Final branded card with contact info

**Technical Specs:**
- Duration: 105 seconds (3150 frames at 30fps)
- Resolution: 1920x1080 (16:9)
- Design: Dark mode aesthetic with warm accents

### Highlight Video (15 seconds)

Quick highlight reel with quotes and expertise showcase.

**Structure:**
1. **Opening (0-3s)**: Name reveal with expertise keywords
2. **Quote Scene 1 (3-6s)**: Speaking photo with CoinDesk quote
3. **Quote Scene 2 (6-9s)**: Speaking photo with Forbes quote
4. **Expertise (9-12s)**: Four key areas with icons
5. **Closing (12-15s)**: Contact information and CTA

## Commands

### Preview Videos

```bash
npm start
```

Opens Remotion Studio to preview both compositions.

### Render Brand Video

```bash
npm run build
```

Renders `BrandVideo` to `out/brand-video.mp4`

### Render Highlight Video

```bash
npm run build:highlight
```

Renders `MarkoHighlight` to `out/video.mp4`

### Update Remotion

```bash
npm run upgrade
```

## Required Assets

Before rendering, you need to provide images. See `REQUIRED_ASSETS.md` for the complete list.

Place all assets in:
```
/Users/marko/Documents/GitHub/Markos Universe/images/motion/
```

**Placeholder Strategy:**
Until real assets are provided, the video uses placeholder visuals with labels.

## Project Structure

```
remotion-video/
├── src/
│   ├── Root.tsx                # Composition registry
│   ├── BrandVideo.tsx          # Main 90s video
│   ├── MarkoHighlight.tsx      # 15s highlight
│   ├── scenes/
│   │   ├── Act1_Wilderness.tsx
│   │   ├── Act2_Doubters.tsx
│   │   ├── Act3_Journey.tsx
│   │   ├── Act4_ThoughtLeader.tsx
│   │   └── Act5_Closing.tsx
│   └── utils/
│       ├── colors.ts
│       └── spring-configs.ts
├── out/                        # Rendered videos
├── REQUIRED_ASSETS.md
└── README.md
```

## Customization

### Timing Adjustments

Edit `src/BrandVideo.tsx` to adjust scene durations.

### Animation Tweaks

Edit individual scene files in `src/scenes/`.

### Colors

Edit `src/utils/colors.ts` to change the color palette.

## Deployment

After rendering, copy the video to the main site:

```bash
cp out/brand-video.mp4 ../videos/
```

## Tech Stack

- Remotion 4.0
- React 18
- TypeScript
- Inter font (Google Fonts)

---

**Last Updated:** 2026-01-23
