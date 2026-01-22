# AI Chatbot Setup Guide

The website includes an AI chatbot powered by Claude API that answers questions about Marko's background, expertise, publications, and services.

## Current Status

✅ **Frontend Complete** - Chat UI with modal and widget
✅ **API Endpoint Ready** - Serverless function at `/api/chat`
✅ **System Prompt** - Comprehensive context about Marko
⚠️ **Missing:** API key environment variable

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
- Uses Claude 3.5 Sonnet model
- Maintains conversation history
- Comprehensive system prompt with:
  - Professional background and experience
  - Publications and talks
  - Expertise areas
  - Contact information
  - Personal interests

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
- Claude 3.5 Sonnet: ~$3 per 1M input tokens, ~$15 per 1M output tokens
- Average conversation: ~2000 input + 500 output tokens
- Cost per conversation: ~$0.015 (1.5 cents)
- 100 conversations/day = ~$45/month

**Optimization Tips:**
- Current max_tokens: 1024 (reasonable for chatbot)
- System prompt is ~2500 tokens (cached by Anthropic after first use)
- Consider switching to Claude 3 Haiku for high volume (cheaper)
- Monitor usage in Anthropic console

## Customization

### Updating System Prompt
Edit `api/chat.js` and modify the `SYSTEM_PROMPT` constant. Redeploy after changes.

### Changing Model
Edit `api/chat.js` line 308:
```javascript
model: 'claude-3-5-sonnet-20241022',  // Current
// Options:
// - 'claude-3-5-sonnet-20241022' (best quality)
// - 'claude-3-5-haiku-20241022' (faster, cheaper)
// - 'claude-opus-4-20250514' (most capable)
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
