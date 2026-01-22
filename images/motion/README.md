# Motion Design Assets

This folder contains assets for the website's motion design and Remotion video.

## Directory Structure

```
motion/
├── speaking/          # Photos for Remotion highlight video
├── interests/         # Personal interest imagery (Chess, Books, Ethereum, etc.)
└── quotes/            # JSON file with quotes and headlines
```

## Required Assets

### Speaking Photos (3-5 images)
Add high-resolution photos to `speaking/`:
- `stage-1.jpg` - Conference presentation
- `stage-2.jpg` - Panel discussion
- `stage-3.jpg` - Keynote moment
- `headshot.jpg` - Professional headshot

**Requirements:**
- Format: JPG or PNG
- Resolution: Minimum 1920x1080
- File size: Under 5MB each

### Interest Images (optional, 1-2 each)
Add to `interests/`:
- `chess.jpg` - Chess-related imagery
- `books.jpg` - Reading/book collection
- `ethereum.png` - Ethereum logo/branding
- `claude.png` - Claude Code branding
- `longevity.jpg` - Health/longevity theme

### Quotes/Headlines
Create `quotes/quotes.json` with structure:
```json
{
  "personal": {
    "motto": "Building the decentralized future",
    "tagline": "TEEs • Agent Infrastructure • Privacy-Preserving Compute"
  },
  "achievements": [
    "35.6K views on Forbes",
    "Spoke at ETHDam 2024",
    "Head of AI at Oasis Protocol"
  ],
  "quotes": [
    "The future of AI is privacy-preserving",
    "Blockchain is infrastructure, not ideology"
  ]
}
```

## Notes
- All images will be optimized for web during the build process
- Photos should have good lighting and high contrast for video overlays
- Avoid busy backgrounds that compete with text overlays
