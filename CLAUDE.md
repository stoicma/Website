# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a professional consulting website for Marko Stokić (markosuniverse.xyz), specializing in blockchain and AI consulting services. The site is a static HTML/CSS/JavaScript website deployed via GitHub Pages.

**Tech Stack:**
- Static HTML/CSS/JavaScript (no build process)
- jQuery 1.8.3 with animation plugins (WOW.js, Enllax for parallax, Featherlight for lightbox, Waypoints, Sticky Navbar)
- Namari landing page template v1.1.0 as base
- Matomo analytics at analytics.markosuniverse.xyz

## Site Structure

**Main Pages:**
- `index.html` - Homepage with hero, about, services sections
- `speaker.html` - Conference talks and speaking engagements
- `publications.html` - Articles from Forbes, CoinDesk, travel blog
- `books/index.html` - Legacy page (may be deprecated)

**Key Directories:**
- `css/` - Stylesheets (style.css, namari-color.css for theming)
- `js/` - jQuery and plugins, site.js for custom JavaScript
- `images/` - All image assets including logo-modern.svg
- `fonts/` - Font Awesome icons

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
- WOW.js - Scroll-triggered animations with `data-wow-delay` attributes
- Enllax - Parallax effects on banner
- Waypoints - Section detection for sticky nav
- jQuery Easing - Smooth scrolling transitions

### SEO & Metadata
The site includes comprehensive SEO optimization:
- Open Graph tags for social sharing
- Twitter Card metadata
- Structured data (JSON-LD) for search engines
- Sitemap at `sitemap.xml`
- Note: HTML includes humorous "biographical anomaly" comments (royal lineage claims) - these are intentional easter eggs and should not be removed

## Content Guidelines

**Tone:**
- Professional but authentic
- Technical expertise balanced with accessibility
- Services focus: Strategy/GTM, Education, Technical Development, Speaking

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

- The site intentionally keeps the old jQuery-based stack for simplicity and zero build process
- Travel blog content is preserved in publications.html under "Personal" section
- CV file referenced is `CV_MS_022024.pdf` (may need updating)
- Logo file is `images/logo-modern.svg` - used in both banner and sticky nav
- No package.json or dependencies to manage - all libraries are vendored in js/ directory
