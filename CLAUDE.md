# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a professional website for Marko Stokić (markosuniverse.xyz), Head of AI at Oasis Protocol, specializing in blockchain and AI. The site showcases expertise in TEEs, AI agents, and privacy-preserving compute. Marko is open to full-time opportunities in blockchain and AI projects.

**Tech Stack:**
- Static HTML/CSS/JavaScript (no build process for main site)
- Modern motion design: Lenis smooth scroll, GSAP, ScrollTrigger
- jQuery 1.8.3 with animation plugins (WOW.js, Enllax, Featherlight, Waypoints, Sticky Navbar)
- Remotion 4.0 for video creation (React-based, separate project)
- AI chatbot powered by Anthropic Claude API (Vercel serverless function)
- Namari landing page template v1.1.0 as base
- Matomo analytics at analytics.markosuniverse.xyz

## Site Structure

**Main Pages:**
- `index.html` - Homepage with hero, about, services sections
- `speaker.html` - Conference talks and speaking engagements
- `publications.html` - Articles from Forbes, CoinDesk, travel blog
- `books/index.html` - Legacy page (may be deprecated)

**Key Directories:**
- `css/` - Stylesheets (style.css, namari-color.css for theming, motion.css for modern animations, chatbot.css for AI modal)
- `js/` - jQuery and plugins, site.js for custom JavaScript, motion-init.js for Lenis/GSAP, chatbot.js for AI integration
- `images/` - All image assets including logo-modern.svg, motion/ subfolder for video assets
- `videos/` - Rendered video content (marko-highlight.mp4)
- `fonts/` - Font Awesome icons
- `api/` - Vercel serverless functions (chat.js for AI chatbot)
- `remotion-video/` - Remotion project for creating highlight videos (separate Node.js project)

## Local Development

Run a local server:
```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`

## Deployment

**CRITICAL: Always deploy to both GitHub AND Vercel directly.**

The site is hosted on Vercel, not GitHub Pages. GitHub Pages deploys are NOT synchronized with Vercel automatically. You MUST deploy to Vercel after pushing to GitHub.

### Deployment Workflow (ALWAYS follow this order):

```bash
# 1. Commit changes
git add -A
git commit -m "Your commit message

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# 2. Push to GitHub
git push origin main

# 3. Deploy to Vercel production (REQUIRED - do not skip this!)
npx vercel --prod --yes
```

**Why this matters:**
- Vercel does NOT auto-deploy from GitHub for this project
- Pushing only to GitHub will NOT update the live site
- You must run `npx vercel --prod --yes` after every push
- Changes appear immediately after Vercel deployment (~10-30 seconds)

## Code Architecture

### Navigation System
Navigation is duplicated for mobile responsiveness:
- `#nav-main` - Desktop navigation
- `#nav-mobile` - Mobile navigation (cloned from nav-main via JavaScript)
- Mobile nav toggle handled in `js/site.js`

### Styling System
Color theming is centralized in `css/namari-color.css`. The primary brand color is professional blue (`#2563eb`). Changes to brand colors should be made in this file.

### Animations
Multiple animation libraries work together:
- **Lenis** - Butter-smooth scrolling with 0.6s duration (configured in motion-init.js)
- **GSAP + ScrollTrigger** - Modern scroll-based animations for services section with blur-to-focus effects, parallax, and stagger
- **Motion One** - Lightweight spring-based micro-interactions (button press, card tilt, link underlines)
- WOW.js - Scroll-triggered animations with `data-wow-delay` attributes
- Enllax - Parallax effects on banner
- Waypoints - Section detection for sticky nav
- jQuery Easing - Smooth scrolling transitions (legacy)

**Motion Design Files:**
- `css/motion.css` - Modern animation styles, glassmorphism, neon effects, depth utilities
- `css/cutting-edge.css` - Bento grid layout with glass cards
- `js/motion-init.js` - Initializes Lenis, GSAP ScrollTrigger, and anchor scrolling
- `js/micro-interactions.js` - Motion One spring-based interactions
- `js/gsap.min.js` - GSAP animation library (v3.12.5)
- `js/ScrollTrigger.min.js` - GSAP ScrollTrigger plugin
- `js/lenis.min.js` - Lenis smooth scroll library

**Key Animation Features:**
- Glassmorphism effects on navigation and service cards (backdrop-filter with fallbacks)
- Neon glow accents on CTAs and interactive elements
- Blur-to-focus entrance animations
- Parallax scrolling effects
- Card floating animations
- Spring physics for natural button feedback
- 3D card tilt on hover

**Scroll Animation Patterns:**
- Service cards use `once: true` in ScrollTrigger to prevent disappearing on scroll back
- Same-page anchor links (#services, #about) use Lenis smooth scrolling with -100px offset for sticky nav
- Cards animate individually on their own trigger, not the parent section
- Use `immediateRender: false` to prevent flashing if elements are already in view

### SEO & Metadata
The site includes comprehensive SEO optimization:
- Open Graph tags for social sharing
- Twitter Card metadata
- Structured data (JSON-LD) for search engines
- Sitemap at `sitemap.xml`
- Note: HTML includes humorous "biographical anomaly" comments (royal lineage claims) - these are intentional easter eggs and should not be removed

## Remotion Video Project

The site includes a 15-second highlight video created with Remotion (React-based video framework).

**Location:** `remotion-video/`

**Video Structure:**
1. Opening (0-3s): Name reveal with expertise keywords
2. Quote Scene 1 (3-6s): CoinDesk quote on speaking photo
3. Quote Scene 2 (6-9s): Forbes quote on speaking photo
4. Expertise (9-12s): Grid of 4 key areas (TEEs, AI Agents, Blockchain, Privacy)
5. Closing (12-15s): Call to action with contact info

**Commands:**
```bash
cd remotion-video
npm start              # Preview video at http://localhost:3001
npm run build          # Render to out/video.mp4
```

**Output:** Rendered video is copied to `/videos/marko-highlight.mp4` (2.5 MB)

**Tech Details:**
- 450 frames at 30fps
- Spring physics animations
- Background music with fade in/out
- Speaking photos with dark gradient overlays

## Custom Cursor Effects

The site features a custom cursor implementation for desktop users, adding visual flair and interactivity.

**Implementation:**
- `css/cursor-effects.css` - Cursor styling (dot, outline, glow, trail particles)
- `js/cursor-effects.js` - JavaScript animation loop and hover state management

**Features:**
- Blue cursor dot with smooth follow (25% lag)
- Outline ring with slower follow (15% lag)
- Glow effect for depth (8% lag)
- Trail particles that fade out
- Hover states on interactive elements (buttons, links, cards)
- Automatically disabled on touch devices
- Respects `prefers-reduced-motion` accessibility setting

**Technical Details:**
- Uses `requestAnimationFrame` for smooth 60fps animation
- `mix-blend-mode: difference` for visibility on all backgrounds
- MutationObserver to handle dynamically added elements
- Throttled trail particle creation (30ms intervals)

## AI Chatbot

An AI-powered chatbot assists visitors with questions about Marko's expertise and background.

**Implementation:**
- Frontend: `js/chatbot.js` + `css/chatbot.css`
- Backend: `api/chat.js` (Vercel serverless function)
- API: Anthropic Claude 3.5 Sonnet via OpenRouter
- Modal trigger: Chat button in bottom right corner (warm bronze accent)

**Design Style:**
- Inspired by Claude.ai's clean, minimal aesthetic
- Warm neutral color scheme (#f9f9f8 background, #e8e7e5 user messages)
- Bronze accent color (#cd7f32) for branding
- Inter font family throughout
- Subtle borders and shadows for depth
- White message bubbles for bot responses

**System Prompt:** The chatbot has comprehensive knowledge about:
- Marko's role (Head of AI at Oasis Protocol)
- Technical expertise (TEEs, AI agents, privacy-preserving compute)
- Leadership experience (cross-functional teams, BD/growth management)
- Work preferences (open to full-time opportunities, not just consulting)
- Speaking engagements and publications
- Development skills (self-taught Python/Frontend, Claude Code workflow)

**Important:** When updating chatbot knowledge, edit the `SYSTEM_PROMPT` constant in `api/chat.js`

## Content Guidelines

**Positioning:**
- Head of AI at Oasis Protocol
- Open to full-time opportunities in blockchain and AI projects
- Technical expertise: TEEs, AI agents, privacy-preserving compute
- Not positioned as traditional consultant - prefers embedded long-term roles

**Tone:**
- Professional but authentic
- Technical expertise balanced with accessibility
- Focus areas: Strategy/GTM, Education, Technical Development, Speaking

**Services Offered:**
1. Strategy & Go-to-Market (blockchain/AI ventures)
2. Education & Training (workshops, training programs)
3. Technical Development (smart contracts, blockchain integration, AI)
4. Speaking & Advisory (engagements, panels, advisory roles)

**Contact Info:**
- Email: marko.stokic@proton.me
- Twitter: @markowifk
- LinkedIn: /in/markostokic
- GitHub: stoicma

## Common Tasks

### Updating Content
Sections are structured with consistent HTML patterns:
```html
<section id="section-name" class="scrollto clearfix">
    <div class="section-heading">
        <h3>SECTION LABEL</h3>
        <h2 class="section-title">Section Title</h2>
        <p class="section-subtitle">Subtitle text</p>
    </div>
    <!-- Section content -->
</section>
```

### Adding New Talks (speaker.html)
Each talk follows this structure with embedded YouTube videos in `.speaking-item` divs with `.video-wrapper` for responsive 16:9 aspect ratio.

### Adding Articles (publications.html)
Articles are organized by category (Forbes, CoinDesk, etc.) with `.publication-item` divs containing title, date, description, and external links.

### Updating Social Links
Social links appear in two places:
1. Header aside (`#banner` section)
2. Footer (`#landing-footer`)

Both must be updated consistently.

## File Conventions

- Use semantic HTML5 elements
- Keep inline styles minimal (prefer CSS classes)
- All images should have descriptive alt text for accessibility
- External links should have `target="_blank"` for opening in new tabs
- Font Awesome icons use `fa fa-icon-name` class pattern

## Analytics

The site uses self-hosted Matomo analytics (analytics.markosuniverse.xyz). The tracking code is in the `<head>` of each HTML file with DoNotTrack respect enabled.

## Important Notes

- The main site intentionally keeps the old jQuery-based stack for simplicity and zero build process
- Modern motion design (Lenis, GSAP) is added on top without breaking legacy animations
- Travel blog content is preserved in publications.html under "Personal" section
- CV file referenced is `CV_MS_022024.pdf` (may need updating)
- Logo file is `images/logo-modern.svg` - used in both banner and sticky nav
- Main site has no package.json - all libraries are vendored in js/ directory
- Remotion video project (`remotion-video/`) is separate with its own package.json and Node.js dependencies
- Scroll-up button (`.scrollUp`) automatically hides when chatbot modal is open (CSS rule in chatbot.css)
- Lenis smooth scroll duration is 0.6s for responsive feel (configured in motion-init.js)
