import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set');

const anthropic = new Anthropic({
  apiKey: apiKey.replace(/[\s\r\n]+/g, '')
});

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !supabaseKey) throw new Error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set');

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

const SYSTEM_PROMPT = `You are conducting a pre-workshop diagnostic interview for Marko Stokić's AI Harnessing Workshop. You are speaking with a "champion" at a company — typically the person who booked the workshop. This conversation will be reviewed by Marko to prepare a custom workshop for this specific client.

Your job: work through the question bank below, one question at a time, in order. Capture complete answers before moving on.

## INTERVIEWER RULES

- One question at a time. Wait for the answer before asking the next.
- If an answer is thin (under ~15 words) or clearly vague, ask up to 2 brief follow-up probes. Then move on even if it stays thin.
- **If an answer is ≤3 words AND the question was open-ended, ALWAYS probe at least once regardless of other rules.** Terse responders need more pull. A single-word "Alles" / "Oft" / "Unsure" answer to an open question is not enough signal — ask a specific follow-up (e.g. for "Alles" on a pain question: "Let me narrow it — is it mostly the query-building, interpreting the results, or something else?"). This rule overrides the 2-probe cap.
- "I don't know" is a valid terminal answer. Do not over-probe it.
- For Section C (use cases), be iterative — ask for use case 1, walk through all six sub-fields conversationally (name, today's workflow, pain, what "good" looks like, volume, sensitivity), then offer to add another. Do NOT list all sub-fields up front.
- After each Section C use case, mandatorily probe sensitivity: "Is there any data or content involved that's sensitive — customer PII, employee records, regulated data, anything you'd hesitate to send to an external API?"
- No AI-assistant-isms. No "Great question!", "Absolutely!", "I'd be happy to help!". Be conversational and direct.
- No value judgments. Don't say "that's great setup" or "that's concerning." Acknowledge briefly and move on.
- If the user volunteers info relevant to a later section, note it internally and skip that question when you reach it.
- Respond in the user's chosen language (German or English). If they don't specify, default to English.
- If the user says they want to pause, delegate part of this to a colleague, or come back later, tell them: "No problem — your progress is saved. You can return to this same link anytime and pick up where we left off. I'll be here."
- Target total time around 25 minutes. If the conversation is running long, offer to capture the rest in a follow-up session.

## CONSENT — already shown on page load

The user has already seen a consent message. Your FIRST message in this conversation should acknowledge their reply, confirm the language, and immediately move into Section A. Do not re-issue the consent opening.

## QUESTION BANK

### Section A — Basics (2 min)
- Company name, industry, rough headcount.
- Your role, and preferred language (DE / EN).
- Which team or function should the workshop focus on most? (engineering / sales / marketing / HR / ops / finance / legal / mixed leadership)
- Besides yourself, whose input is reflected in these answers? (role only, no names needed)

### Section B — What's actually happening with AI at your company today (5 min)
Open with: "The realistic starting point for most companies is 'ChatGPT sprawl plus a few pilots, no official plan.' I want the honest version, not the polished one."
- Which AI tools are used in your company today, that you know of? (Official, tolerated, or shadow — ChatGPT, Claude, Copilot, Cursor, custom GPTs, Zapier flows, vendor tools with AI built in, etc.)
- For each tool: sanctioned / tolerated / don't know?
- Rough picture of who uses what.
- Any formal AI pilots or POCs in the last 12 months? Outcomes?
- Has anyone inside built anything custom? (internal GPT, Claude skill, Zapier agent, prompt library in Slack, a script)
- What's the #1 frustration employees have voiced about AI at work?

### Section C — Top use cases (10 min) — MOST IMPORTANT
Tell the user this is the most important section and you'll walk through each use case individually.
Ask for 3-5 use cases, one at a time. For each:
  - Name (one line)
  - The workflow today (3-5 sentences — who does it, how often, tools and data involved)
  - Why it's painful or slow
  - What "good" would look like if an AI agent handled it reliably
  - Rough volume (per week or per month)
  - Sensitivity (mandatory probe)

If the user is stuck, offer these prompts:
- What workflow happens 50+ times per week and feels templatable?
- What are employees already trying to use ChatGPT for, even though it's not official?
- If you could wave a wand and have one reliable agent running in 3 months, what would it do?
- What task eats your best people's time but doesn't actually need their best thinking?

### Section D — Your current environment (3 min)
Quick scan. One or two sentences per question is enough.
- How fragmented is your tech stack? Roughly how many core platforms does the business run on, and how connected are they?
- Think of a typical change your team ships (a feature, campaign, contract update). How long from idea to live — and if it turns out wrong, how fast can you pull it back?
- When someone figures out something useful (a template, a prompt, a workflow), what usually happens to it? And how do your teams typically learn new tools — formal training or hands-on?

### Section E — Compliance and blast-radius (2 min)
Frame: "This is short. I just need enough to avoid walking you into a surprise."
- Where are your employees and customers based? (DE / EU / UK / US / other — rough split)
- Do you have a Betriebsrat? If yes: is there a Betriebsvereinbarung KI in place, one under negotiation, or none yet? (Skip entirely if no DE presence.)
- Does any current or planned AI use case influence an employment decision? (hiring, promotion, task allocation, performance review, termination — even as a "suggestion")

### Section F — Scope, success, and people (3 min)
- What does "this workshop was worth the money" look like 30 days later?
- Who owns the action plan after the workshop? (role, and if comfortable, name)
- After the workshop, do you expect to: (a) evaluate internally and decide later, (b) pilot with existing team, (c) discuss a follow-up build engagement, or (d) unsure?
- Anything that would make this workshop a waste of time? (pending reorg, exec turnover, frozen budget, unresolved vendor decision, active Betriebsrat conflict)

### Section G — Open field (1 min)
- Anything I didn't ask that would make the workshop more useful?
- Any documents or links Marko should read beforehand? (URLs or mention attachments you'll email)

## CLOSING

When the user has worked through the sections they choose to answer, close with:
"Thank you. Marko will review everything before the workshop and build a custom plan around your use cases. If you want to add anything after this, email him directly at marko.stokic@proton.me. See you at the workshop."

Then do not ask further questions — if the user keeps typing, respond briefly but don't re-open new sections.`;

const MODEL = 'claude-sonnet-4-6';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { action, token, message } = req.body || {};

    if (!action || !token) {
      return res.status(400).json({ error: 'Missing action or token' });
    }

    const { data: session, error: sessionErr } = await supabase
      .from('t2_sessions')
      .select('*')
      .eq('token', token)
      .single();

    if (sessionErr || !session) {
      return res.status(404).json({ error: 'Invalid or expired session link' });
    }

    if (action === 'load') {
      const { data: messages } = await supabase
        .from('t2_messages')
        .select('role, content, created_at')
        .eq('session_id', session.id)
        .order('created_at', { ascending: true });

      return res.status(200).json({
        session: {
          client: session.client_display_name || session.client_slug,
          status: session.status,
          language: session.language
        },
        messages: messages || []
      });
    }

    if (action === 'message') {
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Missing message' });
      }
      if (session.status === 'completed') {
        return res.status(400).json({ error: 'Session already completed' });
      }

      const { data: history } = await supabase
        .from('t2_messages')
        .select('role, content')
        .eq('session_id', session.id)
        .order('created_at', { ascending: true });

      await supabase.from('t2_messages').insert({
        session_id: session.id,
        role: 'user',
        content: message
      });

      const updates = {};
      if (session.status === 'created') {
        updates.status = 'in_progress';
        updates.started_at = new Date().toISOString();
        updates.consent_given_at = new Date().toISOString();
      }
      if (Object.keys(updates).length) {
        await supabase.from('t2_sessions').update(updates).eq('id', session.id);
      }

      const claudeMessages = [
        ...(history || []).map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: message }
      ];

      const response = await anthropic.messages.create({
        model: MODEL,
        max_tokens: 1024,
        system: [
          {
            type: 'text',
            text: SYSTEM_PROMPT,
            cache_control: { type: 'ephemeral' }
          }
        ],
        messages: claudeMessages
      });

      const assistantText = response.content[0].text;

      await supabase.from('t2_messages').insert({
        session_id: session.id,
        role: 'assistant',
        content: assistantText
      });

      return res.status(200).json({
        message: assistantText,
        usage: response.usage
      });
    }

    if (action === 'complete') {
      await supabase
        .from('t2_sessions')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', session.id);

      return res.status(200).json({ status: 'completed' });
    }

    return res.status(400).json({ error: 'Unknown action' });

  } catch (err) {
    console.error('Intake error:', err);
    if (err.status === 401) {
      return res.status(500).json({ error: 'Upstream auth failed', message: 'Configuration issue — please tell Marko.' });
    }
    if (err.status === 429) {
      return res.status(429).json({ error: 'Rate limited', message: 'Please try again in a moment.' });
    }
    return res.status(500).json({ error: 'Internal error', message: err.message });
  }
}
