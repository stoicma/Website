# Remotion Video Integration - Technical Specification

## Project Goal

Create an engaging Remotion video with a compelling storyline and integrate it into the markosuniverse.xyz landing page as an auto-play popup modal or hero section feature.

**Target Outcome:**
- Capture visitor attention immediately upon landing
- Communicate Marko's expertise and value proposition in 15-30 seconds
- Modern, professional aesthetic that matches the site's design language
- Seamless integration without disrupting user experience

---

## Video Storyline Options

### Option 1: "The Privacy Revolution" (Narrative Arc)
**Duration:** 20-25 seconds
**Theme:** Problem → Solution → Call to Action

**Scene Breakdown:**
1. **Problem (0-5s)**: Dark, fragmented visuals showing data breaches, surveillance, AI risks
   - Text: "AI is powerful. But who controls it?"
   - Visual: Glitchy matrix effect, fragmented faces, data flowing

2. **Solution (5-15s)**: Light emerges, Marko appears, expertise keywords animate in
   - Text: "Privacy-preserving AI isn't just possible. It's here."
   - Visual: TEE encryption visualization, Oasis logo, clean geometric patterns
   - Show: "Trusted Execution Environments • Decentralized AI • Agent Infrastructure"

3. **Authority (15-20s)**: Forbes, CoinDesk quotes flash, speaking photos
   - Text: "Trusted by Fortune 500s. Featured in Forbes & CoinDesk."
   - Visual: Publication logos, conference photos

4. **CTA (20-25s)**: Clean, bold call to action
   - Text: "Let's build the future of AI. Together."
   - Visual: Contact info, animated button "Get in Touch"

**Mood:** Cinematic, slightly dystopian → hopeful → confident

---

### Option 2: "The Builder's Journey" (Personal Story)
**Duration:** 20-25 seconds
**Theme:** From Passion → Expertise → Impact

**Scene Breakdown:**
1. **Origins (0-5s)**: Code snippets, blockchain networks forming
   - Text: "From blockchain research..."
   - Visual: Ethereum network visualization, smart contracts deploying

2. **Expertise (5-10s)**: Transition to AI, TEE visualizations
   - Text: "...to AI infrastructure at scale"
   - Visual: Neural networks + encryption layers, Oasis Protocol branding

3. **Impact (10-15s)**: Speaking stages, publications, client logos
   - Text: "Educating leaders. Building products. Shaping the industry."
   - Visual: Conference photos, Forbes/CoinDesk logos, client testimonials

4. **Invitation (15-20s)**: Direct, personal CTA
   - Text: "Your next breakthrough starts here."
   - Visual: Clean contact info, professional photo

**Mood:** Aspirational, authentic, growth-focused

---

### Option 3: "60 Seconds of Expertise" (Rapid-Fire Value)
**Duration:** 30 seconds
**Theme:** Fast-paced showcase of capabilities

**Scene Breakdown:**
1. **Hook (0-3s)**: Bold statement
   - Text: "Privacy + AI = The Future"
   - Visual: Geometric animation, brand colors

2. **Expertise Grid (3-18s)**: 5 quick cards (3s each)
   - Card 1: "Trusted Execution Environments" - Visual: Lock + processor chip
   - Card 2: "Decentralized AI Agents" - Visual: Network of autonomous nodes
   - Card 3: "Blockchain Integration" - Visual: Smart contract execution
   - Card 4: "Zero-Knowledge Proofs" - Visual: Encrypted data verification
   - Card 5: "Production-Ready Solutions" - Visual: Dashboard screenshots

3. **Social Proof (18-24s)**: Logos + quotes
   - Forbes, CoinDesk, conference stages
   - "Leading voice in privacy tech"

4. **CTA (24-30s)**: Clear next step
   - "Book a Call" or "Start Building"
   - Contact info

**Mood:** Energetic, modern, technical-but-accessible

---

## Recommended Approach: Option 1 - "The Privacy Revolution"

**Why:**
- Creates emotional connection (problem → solution arc)
- Positions Marko as the guide/expert who understands the landscape
- Cinematic quality matches modern web design trends
- 20-25s is optimal for attention span without feeling rushed

**Refinements:**
- Use glitch/matrix effects sparingly (avoid cliché)
- Focus on clean, geometric animations for TEE visualization
- Subtle background music with dramatic build
- End with silence/white space for emphasis on CTA

---

## Technical Implementation

### Integration Options

#### Option A: Hero Section Auto-Play (Recommended)
**Description:** Video plays automatically in a modal overlay when user lands on homepage

**User Flow:**
1. User visits markosuniverse.xyz
2. After 1 second delay, modal fades in with video
3. Video auto-plays (muted, with captions)
4. User can:
   - Watch to completion (modal auto-closes after 3s hold on final frame)
   - Click "Skip" button to close immediately
   - Click outside modal to close
5. Cookie/localStorage prevents showing again for 7 days

**Pros:**
- Immediate impact, high visibility
- Modern trend in portfolio/agency sites
- Controlled narrative experience

**Cons:**
- Can feel intrusive if done poorly
- Must respect user preferences (autoplay with sound is bad UX)
- Needs cookie consent consideration

**Implementation Details:**
```javascript
// Pseudocode
if (!localStorage.getItem('videoShown_v1')) {
  setTimeout(() => {
    showVideoModal();
    localStorage.setItem('videoShown_v1', Date.now());
  }, 1000);
}

function showVideoModal() {
  // Create modal overlay
  // Embed video with autoplay, muted
  // Add skip button
  // Handle close events
}
```

---

#### Option B: Hero Section Inline Video
**Description:** Video replaces or sits alongside hero content as primary focal point

**User Flow:**
1. User lands on homepage
2. Video is embedded in hero section, auto-plays (muted)
3. Loops continuously or pauses on final frame
4. User scrolls naturally to rest of content

**Pros:**
- Less intrusive, feels integrated
- Always visible to every visitor
- Can loop for repeated reinforcement

**Cons:**
- Competes with hero text/CTA
- May increase page load time
- Autoplay restrictions on mobile

**Implementation Details:**
- Use `<video>` tag with `autoplay muted playsinline loop`
- Provide poster frame for loading state
- Lazy load if user scrolls past quickly

---

#### Option C: "Watch Video" CTA Button
**Description:** Video plays in modal only when user clicks a prominent CTA

**User Flow:**
1. User lands on homepage
2. Sees hero section with "Watch Introduction Video" button
3. Clicks button → modal opens with video
4. Video plays, user closes when done

**Pros:**
- Respects user agency
- No autoplay concerns
- Can track engagement intentionally

**Cons:**
- Lower view rate (only engaged users watch)
- Requires compelling button copy/design

---

### Recommended: Option A (Auto-Play Modal) with Refinements

**Key UX Enhancements:**
- Muted autoplay (unmute button available)
- Captions displayed by default
- Smooth fade-in animation (0.4s ease-out)
- Glassmorphism backdrop (matches site design)
- Prominent but subtle "Skip" button (top-right corner)
- Click-outside-to-close
- Keyboard accessible (ESC to close)
- Only shows once per session (or 7-day cookie)
- Mobile: Delay longer (2s) to ensure page is loaded

---

## Design System Integration

### Visual Consistency
- **Color Palette:**
  - Primary: `#2563eb` (professional blue)
  - Accent: `#cd7f32` (bronze, matches chatbot)
  - Background: `#f9f9f8` (warm neutral)
  - Text: `#2c2c2c` (dark gray)

- **Typography:**
  - Headlines: Inter (600-700 weight)
  - Body: Open Sans
  - Match existing site font stack

- **Animation Style:**
  - Spring physics (consistent with Motion One micro-interactions)
  - Blur-to-focus reveals
  - Smooth easing curves
  - Duration: 0.4-1.0s for transitions

### Modal Design
```css
.video-modal-overlay {
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(12px);
  animation: fadeIn 0.4s ease-out;
}

.video-modal-container {
  max-width: 900px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## Remotion Video Structure

### File Organization
```
remotion-video/
├── src/
│   ├── Root.tsx                 # Composition registry
│   ├── Video.tsx                # Main composition wrapper
│   ├── scenes/
│   │   ├── Scene1_Problem.tsx   # 0-5s: Problem statement
│   │   ├── Scene2_Solution.tsx  # 5-15s: Solution showcase
│   │   ├── Scene3_Authority.tsx # 15-20s: Social proof
│   │   └── Scene4_CTA.tsx       # 20-25s: Call to action
│   ├── components/
│   │   ├── AnimatedText.tsx     # Reusable text reveal
│   │   ├── GlitchEffect.tsx     # Matrix/glitch visuals
│   │   ├── TEEVisualization.tsx # Encryption animation
│   │   └── QuoteCard.tsx        # Forbes/CoinDesk quotes
│   ├── assets/
│   │   ├── fonts/               # Inter, Open Sans
│   │   ├── images/              # Speaking photos, logos
│   │   └── audio/               # Background music
│   └── utils/
│       ├── spring-configs.ts    # Reusable spring presets
│       └── colors.ts            # Brand color palette
├── public/
│   └── og-image.png             # Thumbnail for sharing
└── package.json
```

### Composition Configuration
```typescript
// Root.tsx
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="IntroVideo"
        component={Video}
        durationInFrames={750}  // 25 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          titleText: "Marko Stokić",
          subtitle: "Privacy-Preserving AI & Blockchain",
        }}
      />
    </>
  );
};
```

### Key Animation Techniques
- **Spring Physics:** Use `spring()` for natural motion
- **Interpolation:** `interpolate()` for smooth value transitions
- **useCurrentFrame():** Sync animations to timeline
- **Sequences:** Stagger scene entrances with `<Sequence>`
- **Audio:** `<Audio>` with volume ramping for music
- **AbsoluteFill:** Full-screen layouts for each scene

---

## Site Integration

### Files to Modify

#### 1. `index.html`
Add video modal markup and script reference:
```html
<!-- Video Modal (hidden by default) -->
<div id="intro-video-modal" class="video-modal hidden">
  <div class="video-modal-overlay"></div>
  <div class="video-modal-container">
    <button class="video-modal-close" aria-label="Close video">
      <i class="fa fa-times"></i>
    </button>
    <video id="intro-video" autoplay muted playsinline>
      <source src="videos/intro-video.mp4" type="video/mp4">
      <track kind="captions" src="videos/intro-video.vtt" srclang="en" label="English">
    </video>
  </div>
</div>

<!-- Video Modal Script -->
<script src="js/video-modal.js"></script>
```

#### 2. `css/video-modal.css` (new file)
Create dedicated stylesheet for video modal:
```css
/* Video Modal Styles */
.video-modal {
  position: fixed;
  inset: 0;
  z-index: 10001; /* Above chatbot */
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-modal.hidden {
  display: none;
}

.video-modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(12px);
  animation: fadeIn 0.4s ease-out;
}

.video-modal-container {
  position: relative;
  max-width: 900px;
  width: 90%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 1;
}

.video-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  transition: all 0.2s;
}

.video-modal-close:hover {
  background: #fff;
  transform: scale(1.1);
}

#intro-video {
  width: 100%;
  height: auto;
  display: block;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .video-modal-container {
    width: 95%;
    max-width: 100%;
  }
}
```

#### 3. `js/video-modal.js` (new file)
Handle modal behavior and user preferences:
```javascript
(function() {
  'use strict';

  const STORAGE_KEY = 'intro_video_shown';
  const SHOW_DELAY = 1000; // 1 second delay
  const COOKIE_DAYS = 7;

  function hasSeenVideo() {
    const lastShown = localStorage.getItem(STORAGE_KEY);
    if (!lastShown) return false;

    const daysSince = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
    return daysSince < COOKIE_DAYS;
  }

  function markVideoShown() {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  }

  function showVideoModal() {
    const modal = document.getElementById('intro-video-modal');
    const video = document.getElementById('intro-video');

    modal.classList.remove('hidden');
    video.play().catch(err => console.log('Autoplay prevented:', err));

    // Mark as shown
    markVideoShown();
  }

  function closeVideoModal() {
    const modal = document.getElementById('intro-video-modal');
    const video = document.getElementById('intro-video');

    video.pause();
    modal.classList.add('hidden');
  }

  function initVideoModal() {
    // Don't show if already seen recently
    if (hasSeenVideo()) return;

    // Show after delay
    setTimeout(() => {
      showVideoModal();
    }, SHOW_DELAY);

    // Close handlers
    const closeBtn = document.querySelector('.video-modal-close');
    const overlay = document.querySelector('.video-modal-overlay');

    closeBtn.addEventListener('click', closeVideoModal);
    overlay.addEventListener('click', closeVideoModal);

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeVideoModal();
    });

    // Auto-close after video ends (with 3s delay on final frame)
    const video = document.getElementById('intro-video');
    video.addEventListener('ended', () => {
      setTimeout(closeVideoModal, 3000);
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoModal);
  } else {
    initVideoModal();
  }
})();
```

#### 4. Update `CLAUDE.md`
Document the video modal integration in the project overview.

---

## Video Rendering & Optimization

### Remotion Build Command
```bash
cd remotion-video
npm run build -- --codec h264 --crf 18 --preset slow
```

**Output Settings:**
- Format: MP4 (H.264)
- Resolution: 1920x1080
- Frame Rate: 30fps
- Bitrate: ~8 Mbps (target <5MB file size)
- Audio: AAC, 128kbps

### File Optimization
After rendering, compress further:
```bash
ffmpeg -i out/video.mp4 -vcodec h264 -crf 23 -preset slow -c:a aac -b:a 128k videos/intro-video.mp4
```

**Target:** <3MB for fast loading

### Captions (VTT)
Create `videos/intro-video.vtt` for accessibility:
```
WEBVTT

00:00.000 --> 00:05.000
AI is powerful. But who controls it?

00:05.000 --> 00:15.000
Privacy-preserving AI isn't just possible. It's here.

00:15.000 --> 00:20.000
Trusted by Fortune 500s. Featured in Forbes & CoinDesk.

00:20.000 --> 00:25.000
Let's build the future of AI. Together.
```

---

## Success Metrics

### Engagement Tracking
Add analytics to `js/video-modal.js`:
```javascript
// Track video modal shown
if (window._paq) {
  _paq.push(['trackEvent', 'Video', 'Modal Shown', 'Intro Video']);
}

// Track video completion
video.addEventListener('ended', () => {
  if (window._paq) {
    _paq.push(['trackEvent', 'Video', 'Completed', 'Intro Video']);
  }
});

// Track skip/close
closeBtn.addEventListener('click', () => {
  if (window._paq) {
    _paq.push(['trackEvent', 'Video', 'Skipped', 'Intro Video']);
  }
  closeVideoModal();
});
```

### KPIs to Monitor
- **View Rate:** % of visitors who see the modal
- **Completion Rate:** % who watch to end vs skip
- **Bounce Rate Impact:** Does video reduce/increase bounces?
- **CTA Click-Through:** Do viewers click "Get in Touch" more?

---

## Development Phases

### Phase 1: Video Creation (3-5 hours)
1. Set up Remotion project structure
2. Design and implement Scene 1 (Problem)
3. Design and implement Scene 2 (Solution)
4. Design and implement Scene 3 (Authority)
5. Design and implement Scene 4 (CTA)
6. Add background music and audio mixing
7. Render and optimize final video

### Phase 2: Site Integration (2-3 hours)
1. Create `css/video-modal.css`
2. Create `js/video-modal.js`
3. Update `index.html` with modal markup
4. Test autoplay behavior across browsers
5. Test localStorage cookie logic
6. Add accessibility features (captions, keyboard nav)
7. Mobile testing and adjustments

### Phase 3: Testing & Refinement (1-2 hours)
1. Cross-browser testing (Chrome, Safari, Firefox)
2. Mobile testing (iOS Safari, Chrome Android)
3. Performance testing (Lighthouse scores)
4. A/B test modal timing (1s vs 2s delay)
5. Gather feedback from test users
6. Iterate on design/copy

### Phase 4: Deployment (30 min)
1. Deploy video file to `/videos/`
2. Deploy captions to `/videos/`
3. Commit all changes
4. Push to GitHub
5. Deploy to Vercel production
6. Verify live site behavior

**Total Estimated Time:** 6-10 hours

---

## Alternative Considerations

### Lazy Loading
If video file is large (>3MB), lazy load:
```javascript
// Only load video when modal is about to show
function loadVideo() {
  const video = document.getElementById('intro-video');
  video.src = 'videos/intro-video.mp4';
  video.load();
}

setTimeout(() => {
  loadVideo();
  showVideoModal();
}, SHOW_DELAY);
```

### Thumbnail/Poster Frame
Add poster attribute to video tag:
```html
<video id="intro-video" autoplay muted playsinline poster="images/video-poster.jpg">
```

### Progressive Enhancement
Provide fallback for no-JS users:
```html
<noscript>
  <div class="video-fallback">
    <img src="images/intro-graphic.jpg" alt="Marko Stokić - Blockchain & AI Expert">
  </div>
</noscript>
```

---

## Next Steps

1. **Decide on storyline:** Approve Option 1, 2, or 3 (or hybrid)
2. **Review integration approach:** Confirm auto-play modal vs inline vs CTA button
3. **Gather assets:**
   - Speaking photos (high-res)
   - Publication logos (Forbes, CoinDesk)
   - Background music (royalty-free or licensed)
   - Company/client logos (if applicable)
4. **Begin Remotion development:** Set up project, create scene components
5. **Parallel site integration:** Prepare CSS/JS while video is being created
6. **Test and iterate:** Get feedback before final deployment

---

## Open Questions

1. **Video Length:** 20s, 25s, or 30s? (Recommend 20-25s)
2. **Music:** Do you have preferred music style? (Cinematic, tech, minimal?)
3. **Voiceover:** Text-only or add voiceover narration?
4. **Branding:** Should Oasis Protocol logo appear prominently?
5. **Mobile First-Visit:** Should video show on mobile, or desktop-only?
6. **Accessibility:** Hard-code captions in video or use VTT sidecar file?
7. **Future Updates:** Plan to update video seasonally or keep evergreen?

---

## Resources

- **Remotion Docs:** https://www.remotion.dev/docs
- **Remotion Templates:** https://github.com/remotion-dev/template
- **Spring Animations:** https://www.remotion.dev/docs/spring
- **Audio in Remotion:** https://www.remotion.dev/docs/using-audio
- **Video Optimization:** https://web.dev/fast/#optimize-your-videos
- **Royalty-Free Music:** Epidemic Sound, Artlist, AudioJungle

---

**Last Updated:** 2026-01-23
**Status:** Ready for review and approval
