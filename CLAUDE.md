# Markos Universe

Professional website for Marko Stokić (markosuniverse.xyz), Head of AI at Oasis Protocol. Showcases expertise in TEEs, AI agents, and privacy-preserving compute. Open to full-time opportunities in blockchain and AI.

Static HTML/CSS/JS on top of Namari template. No build process for the main site. jQuery stack preserved for simplicity; Lenis + GSAP layered on top for modern motion.

## Read on demand (not every turn)

- **`ARCHITECTURE.md`** — tech stack detail, file roles, animation system, SEO, Remotion video project, cursor effects, chatbot implementation, common-task HTML patterns, file conventions.

## Deployment (CRITICAL — Vercel, not GitHub Pages)

Vercel does NOT auto-deploy from GitHub for this project. Pushing only to GitHub will NOT update the live site.

```bash
# 1. Commit + push
git add -A
git commit -m "..."
git push origin main

# 2. Deploy to Vercel (REQUIRED — do not skip)
npx vercel --prod --yes
```

Changes appear ~10-30 seconds after Vercel deployment.

## Brand

- **Primary color:** `#2563eb` (professional blue). Changes to brand colors go in `css/namari-color.css`.
- **Chatbot accent:** `#cd7f32` (warm bronze).
- **Chatbot knowledge:** edit the `SYSTEM_PROMPT` constant in `api/chat.js`. Curated with privacy-defense instructions per the brain "What does NOT leave the brain" rule.

## Positioning and tone

- Head of AI at Oasis Protocol.
- Open to full-time opportunities in blockchain and AI projects; not positioned as traditional consultant — prefers embedded long-term roles.
- Professional but authentic. Technical expertise balanced with accessibility.
- Focus areas: Strategy/GTM, Education, Technical Development, Speaking.

## Voice rules (content written FOR the site)

When writing any prose that ships on the site (homepage copy, service descriptions, chatbot system prompt updates), read `~/Documents/Obsidian/brain/reference_marko_writing_patterns.md` first. Marko's voice profile — Persona 1 analytical practitioner for argumentative content — applies to anything carrying his name. The `voice-lint` PostToolUse hook watches `Markos Universe/` for em dashes and AI-tell phrases; violations block the write.

## Compounding rule

Non-obvious implementation findings → add to `ARCHITECTURE.md` under the relevant section. Cross-project signal → `/brain-dump`. Do NOT append session learnings to this file.
