# Required Assets for Brand Video

This document lists all the images and assets needed to render the 90-second brand video.

## Images Needed

### Act 1: The Wilderness
- [ ] `motion/Nihilist Penguin Picture.webp` - Lone penguin in Antarctic wilderness (for opening scene)
- [ ] `motion/logos/Ethereum Logo.png` - Ethereum logo

### Act 3: The Journey
Company/Partner Logos:
- [ ] Bocconi University logo
- [ ] Wayra logo
- [ ] NEAR Protocol logo
- [ ] Gnosis logo
- [ ] Aleph Zero logo
- [ ] Oasis Protocol logo

### Act 4: Thought Leader
Screenshots:
- [ ] `motion/Screenshot Forbes Profile.png` - Your Forbes contributor profile page
- [ ] `motion/Screenshot Forbes AI Memory.png` - "Why Crypto Needs Portable AI Memory" article
- [ ] `motion/Screenshot Coindesk Trust AI Agents.png` - "Can We Ever Trust AI Agents?" article
- [ ] `motion/Screenshot Decrypt AI Doctor.png` - "The AI Doctor Will See All of You Now" article

Speaking Photos:
- [ ] `motion/speaking/MS_Nebular Summit.jpg` - Speaking at Nebular Summit
- [ ] `motion/speaking/Speaker Image OpenAGI Summit.png` - OpenAGI Summit
- [ ] `motion/speaking/MS_SpeakerTUM.jpg` - Speaking at TUM
- [ ] `motion/speaking/MS_DeAI_Panel_Wayra.JPG` - DeAI Panel at Wayra

## Image Specifications

All images should be:
- **Format:** PNG, JPG, or WebP
- **Resolution:** At least 1920x1080 for full-screen scenes
- **Quality:** High resolution, web-optimized
- **Logos:** Transparent background PNG preferred

## Where to Place Assets

Place all assets in:
```
/Users/marko/Documents/GitHub/Markos Universe/images/motion/
```

Organized as:
```
images/motion/
├── Nihilist Penguin Picture.webp
├── Screenshot Forbes Profile.png
├── Screenshot Forbes AI Memory.png
├── Screenshot Coindesk Trust AI Agents.png
├── Screenshot Decrypt AI Doctor.png
├── logos/
│   ├── Ethereum Logo.png
│   ├── Bocconi.png
│   ├── Wayra.png
│   ├── NEAR.png
│   ├── Gnosis.png
│   ├── Aleph Zero.png
│   └── Oasis.png
└── speaking/
    ├── MS_Nebular Summit.jpg
    ├── Speaker Image OpenAGI Summit.png
    ├── MS_SpeakerTUM.jpg
    └── MS_DeAI_Panel_Wayra.JPG
```

## Placeholder Strategy

Until real assets are provided, the video will use:
- Solid color backgrounds with text labels
- Generic icons from web fonts
- Placeholder rectangles indicating image dimensions

## Next Steps

1. Gather all images from your archives
2. Organize them in the structure above
3. Run `npm start` in remotion-video/ to preview
4. Iterate on timing and animations
5. Run `npm run build` to render final video
