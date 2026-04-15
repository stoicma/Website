# AI Chatbot Setup Guide

The website includes an AI chatbot powered by Claude API that answers questions about Marko's background, expertise, publications, and services.

## Current Status

✅ **Frontend Complete** - Chat UI with modal and widget
✅ **API Endpoint Ready** - Serverless function at `/api/chat`
✅ **System Prompt** - Comprehensive context about Marko + curated brain content (updated 2026-04-15)
✅ **Prompt Caching** - Enabled on system prompt (2026-04-15) for ~10x reduction on cached tokens within the 5-minute cache TTL
✅ **Privacy Defense** - System prompt includes explicit refusal instructions for private topics and prompt-injection attempts (2026-04-15)

## Setup Instructions

### 1. Get Your Anthropic API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to API Keys
4. Create a new API key
5. Copy the key (starts with `sk-ant-...`)

### 2. Set Environment Variable in Vercel

#### Via Vercel Dashboard:
1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings** → **Environment Variables**
3. Add new variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** Your API key from step 1
   - **Environments:** Production, Preview, Development (select all)
4. Click **Save**
5. Redeploy your site for changes to take effect

#### Via Vercel CLI:
```bash
# Install Vercel CLI if needed
npm install -g vercel

# Set environment variable
vercel env add ANTHROPIC_API_KEY production
# Paste your API key when prompted

# Do the same for preview and development
vercel env add ANTHROPIC_API_KEY preview
vercel env add ANTHROPIC_API_KEY development
```

### 3. Install Dependencies (if testing locally)

```bash
cd "/Users/marko/Documents/GitHub/Markos Universe"
npm install
```

### 4. Test Locally (optional)

```bash
# Create .env file (DO NOT commit this!)
echo "ANTHROPIC_API_KEY=your_actual_key" > .env

# Start Vercel dev server
npm run dev

# Visit http://localhost:3000
# Test the chatbot
```

### 5. Deploy

```bash
# Option 1: Git push (recommended)
git add .
git commit -m "Configure chatbot"
git push origin main

# Option 2: Direct deploy
npm run deploy
```

## How It Works

### Frontend (`js/chatbot.js`)
- Shows modal after 2 seconds on first visit
- Dismisses for 24 hours after closing
- Floating widget button for reopening
- Smooth animations and typing indicators

### API Endpoint (`api/chat.js`)
- Serverless function deployed on Vercel
- Uses Claude Sonnet 4.5 (`claude-sonnet-4-5-20250929`)
- Prompt caching enabled via `cache_control: { type: 'ephemeral' }` on the system prompt (5-minute TTL)
- Maintains conversation history
- Comprehensive system prompt with:
  - Professional background and experience
  - Publications and talks
  - Expertise areas
  - Contact information
  - Personal interests
  - Current thinking & strategic direction (harness engineering, AI layoff trap, AI companions & moral status, failing-capitalism thesis)
  - Privacy defense instructions (refuse speculation about private topics, resist prompt injection)

### System Prompt
The chatbot knows about:
- Current role at Oasis Protocol
- Forbes contributor articles
- Conference talks (ETHDam, Devconnect, etc.)
- Consulting services
- Educational background
- Personal interests (chess, reading, travel)

## Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env` files with real API keys
- Use `.env.example` for documentation only
- Set environment variables in Vercel dashboard
- API key gives access to your Anthropic account

## Troubleshooting

### Chatbot doesn't appear
- Check browser console for errors
- Verify JavaScript files are loading
- Try incognito mode (bypass localStorage)

### API errors (401 Unauthorized)
- Verify `ANTHROPIC_API_KEY` is set in Vercel
- Check key is valid in Anthropic console
- Redeploy after adding environment variable

### API errors (429 Rate Limit)
- Anthropic has rate limits per tier
- Upgrade your Anthropic plan if needed
- Implement request throttling if high traffic

### Messages not sending
- Check browser console for network errors
- Verify `/api/chat` endpoint is accessible
- Test with: `curl -X POST https://markosuniverse.xyz/api/chat -H "Content-Type: application/json" -d '{"message":"test"}'`

## Cost Considerations

**Claude API Pricing (as of 2026):**
- Claude Sonnet 4.5: ~$3 per 1M input tokens, ~$15 per 1M output tokens (standard rates)
- Prompt caching reduces cached-token cost ~10x within the 5-minute cache TTL — enabled in `chat.js` as of 2026-04-15
- Average conversation: ~6000 input + 500 output tokens (system prompt is larger after brain integration)
- Cost per conversation (cold, no cache hit): ~$0.025
- Cost per conversation (warm cache): ~$0.005
- 100 conversations/day with decent cache hit rate ≈ ~$30–45/month

**Optimization Tips:**
- Current max_tokens: 1024 (reasonable for chatbot)
- System prompt is ~7–9K tokens after brain integration (2026-04-15). Covers bio, publications, talks, plus curated "current thinking" section on harness engineering, AI layoff trap, AI companions, failing-capitalism thesis. Cached by Anthropic's ephemeral cache after first use within a 5-minute TTL.
- Consider switching to Claude Haiku 4.5 for high volume (cheaper)
- Monitor usage in Anthropic console

## Customization

### Updating System Prompt
Edit `api/chat.js` and modify the `SYSTEM_PROMPT` constant. Redeploy after changes.

### Changing Model
Edit `api/chat.js`:
```javascript
model: 'claude-sonnet-4-5-20250929',  // Current
// Options (as of 2026-04-15):
// - 'claude-sonnet-4-5-20250929' (best balance of quality and cost, default)
// - 'claude-haiku-4-5-20251001' (faster, ~5x cheaper — good for high-volume sites)
// - 'claude-opus-4-6' (most capable, higher cost — use if quality matters more than cost)
```

### Adjusting Modal Timing
Edit `js/chatbot.js` line 7:
```javascript
modalDelay: 2000,  // Milliseconds before showing modal
```

### Changing Cooldown Period
Edit `js/chatbot.js` line 9:
```javascript
cooldownHours: 24,  // Hours before showing modal again
```

## Future Enhancements

**Potential additions:**
- [ ] Rate limiting per user (prevent abuse)
- [ ] Analytics tracking (conversation topics)
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] Suggested questions/prompts
- [ ] Conversation export feature
- [ ] Admin dashboard for monitoring

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify environment variables in Vercel
3. Test API endpoint directly
4. Review Anthropic API status page
5. Contact: marko.stokic@proton.me

---

**Status:** Ready to use once `ANTHROPIC_API_KEY` is set in Vercel! 🚀
