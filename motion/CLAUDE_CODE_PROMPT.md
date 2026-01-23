# Claude Code Prompt for Remotion Video

## Setup Instructions

First, set up your Remotion project:

```bash
# Create new Remotion project
npx create-video@latest marko-journey && cd marko-journey

# Install Remotion Agent Skills (gives Claude deep Remotion knowledge)
npx skills add remotion-dev/skills

# Copy your assets into the public folder
cp -r /path/to/your/motion/* public/assets/
```

---

## THE PROMPT

Copy and paste this prompt into Claude Code once your project is set up:

---

### PROMPT START

Create a 90-second cinematic personal brand video for Marko Stokic using Remotion. The video tells the story of an unconventional journey from abandoning gap year plans in 2017 to becoming Head of AI at Oasis Protocol and a Forbes contributor.

**VIDEO STRUCTURE (5 Acts):**

**ACT 1: THE WILDERNESS (0-25 seconds)**
- Open with the image `motion/Nihilist Penguin Picture.webp` - a lone penguin walking into vast Antarctic wilderness
- Slow Ken Burns zoom effect
- Fade in text "2017" then subtitle "Sometimes the path forward means walking alone."
- Transition to animated text: "Gap year plans: CANCELLED" → "New destination: The blockchain wilderness"
- Show "Parents' basement. Munich." with floating code snippets and the Ethereum logo (`motion/logos/Ethereum Logo.png`)
- Subtitle: "Reading every whitepaper. Learning to code. Building conviction."

**ACT 2: THE DOUBTERS (25-45 seconds)**
- Animate speech bubbles appearing with skeptic quotes:
  - "It's a bubble"
  - "You're wasting your time"
  - "It's a scam"
  - "Get a real job"
- Shatter/dissolve the bubbles
- Reveal counter-text: "But I saw something different."
- Show growing network visualization for "Small blockchain meetups. Big ideas."
- Warm colors emerging as passion ignites

**ACT 3: THE JOURNEY (45-75 seconds)**
- **Bocconi University (45-52s):** Show Milan/university aesthetic, text "Research Lead - Blockchain & Cryptocurrencies Association"
- **Wayra (52-58s):** Corporate world, "Investment Analyst" title, subtitle "Crypto investments? Not yet... but I planted seeds."
- **Fractal ID & idOS (58-65s):** "Decentralized Identity" with partners NEAR, Gnosis, Aleph Zero appearing
- **Oasis Protocol (65-75s):** Big reveal - "Head of AI" with neural network overlay merging crypto + AI worlds

**ACT 4: THOUGHT LEADER (75-95 seconds)**
- Show Forbes profile screenshot (`motion/Screenshot Forbes Profile.png`) with zoom
- Cycle through article headlines with newspaper print animation:
  - "Why Crypto Needs Portable AI Memory" (`motion/Screenshot Forbes AI Memory.png`)
  - "Can We Ever Trust AI Agents?" (`motion/Screenshot Coindesk Trust AI Agents.png`)
  - "The AI Doctor Will See All of You Now" (`motion/Screenshot Decrypt AI Doctor.png`)
- Speaking montage with smooth transitions between:
  - `motion/speaking/MS_Nebular Summit.jpg`
  - `motion/speaking/Speaker Image OpenAGI Summit.png`
  - `motion/speaking/MS_SpeakerTUM.jpg`
  - `motion/speaking/MS_DeAI_Panel_Wayra.JPG`
- Text: "Global stages. Important conversations."

**ACT 5: CLOSING (95-105 seconds)**
- Return to penguin image, but with subtle indication of community (slight warmth)
- Text: "The contrarians eventually become the builders."
- Final card:
  - **MARKO STOKI**
  - Head of AI @ Oasis Protocol
  - Forbes Contributor
  - @markowifk
  - markosuniverse.xyz
  - Tagline: "Privacy × AI × Web3"

**TECHNICAL SPECIFICATIONS:**
- Resolution: 1920x1080 (16:9)
- Frame rate: 30fps
- Duration: ~105 seconds (3150 frames)

**DESIGN SYSTEM:**
- Color palette: Deep blues (#0A192F, #112240), warm amber accents (#F59E0B), clean whites
- Typography: Inter or Space Grotesk for headlines, clean sans-serif for body
- Dark mode aesthetic
- Smooth ease-in-out transitions
- Parallax effects on photos
- Staggered text reveals

**ANIMATIONS:**
- Use Remotion's `interpolate()` for smooth motion
- Spring animations for energetic elements
- Sequence components for timeline control
- `<Img>` component for all images with proper sizing

**COMPONENT STRUCTURE:**
Create these components:
1. `WildernessScene` - Penguin opening with Ken Burns effect
2. `DoubtersScene` - Speech bubbles and shattering animation
3. `JourneyTimeline` - Career progression with logo reveals
4. `ThoughtLeaderMontage` - Forbes and speaking compilation
5. `ClosingCard` - Final branding with social links

Use `<Series>` to sequence the acts and `<AbsoluteFill>` for layered compositions.

### PROMPT END

---

## ALTERNATIVE SHORTER PROMPT

If you want a more concise prompt for Claude Code:

---

Create a 90-second Remotion video for Marko Stokic's personal brand. Story arc:

1. **Opening (0-25s):** Lone penguin image (`Nihilist Penguin Picture.webp`) representing going against the grain in 2017 - abandoning gap year to dive into crypto from parents' basement in Munich.

2. **Doubters (25-45s):** Animated speech bubbles with "It's a scam", "It's a bubble" that shatter. Counter: "But I saw something different."

3. **Journey (45-75s):** Career timeline - Bocconi University (blockchain club) → Wayra (tried crypto investments) → Fractal ID/idOS (decentralized identity with NEAR, Gnosis, Aleph Zero) → Oasis Protocol (Head of AI).

4. **Thought Leader (75-95s):** Forbes contributor showcase with article screenshots + speaking photo montage from `/speaking` folder.

5. **Closing (95-105s):** Return to penguin metaphor. Final card: MARKO STOKIC, Head of AI @ Oasis, @markowifk, markosuniverse.xyz, "Privacy × AI × Web3"

Assets in `public/assets/`. Dark mode aesthetic, deep blues + amber accents, smooth transitions, 1920x1080 30fps.

---

## POST-GENERATION

After Claude Code creates the video:

```bash
# Preview the video
npx remotion preview

# Render the final video
npx remotion render src/index.ts MainVideo --output=out/marko-journey.mp4

# For higher quality
npx remotion render src/index.ts MainVideo --output=out/marko-journey.mp4 --codec=h264 --crf=18
```

---

## TIPS FOR BEST RESULTS

1. **Be specific about timing** - Tell Claude exactly when each scene should start/end
2. **Reference actual file names** - Use the exact paths to your assets
3. **Iterate** - Ask Claude to adjust specific scenes or timings after the first version
4. **Request previews** - Ask Claude to run `npx remotion preview` so you can see the result
5. **Component-first** - If something isn't working, ask Claude to focus on one component at a time
