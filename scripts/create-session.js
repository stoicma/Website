#!/usr/bin/env node
/**
 * Create a new T2 intake session and print the shareable URL.
 *
 * Usage:
 *   node scripts/create-session.js \
 *     --client acme \
 *     --name "Acme GmbH" \
 *     --email champion@acme.example \
 *     --language en \
 *     --base https://stokic.ai
 *
 * Required env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 * Optional env: INTAKE_BASE_URL (defaults to https://stokic.ai)
 */

import { createClient } from '@supabase/supabase-js';
import { randomBytes } from 'crypto';

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  return process.argv[i + 1];
}

const clientSlug = arg('client');
const displayName = arg('name', clientSlug);
const email = arg('email');
const language = arg('language', 'en');
const baseUrl = arg('base', process.env.INTAKE_BASE_URL || 'https://www.stokic.ai');

if (!clientSlug) {
  console.error('Usage: create-session.js --client <slug> [--name "Display Name"] [--email x@y] [--language en|de] [--base https://...]');
  process.exit(1);
}

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.');
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false }
});

const token = randomBytes(24).toString('base64url');

const { data, error } = await supabase
  .from('t2_sessions')
  .insert({
    token,
    client_slug: clientSlug,
    client_display_name: displayName,
    champion_email: email || null,
    language,
    status: 'created'
  })
  .select()
  .single();

if (error) {
  console.error('Failed to create session:', error.message);
  process.exit(1);
}

const link = `${baseUrl.replace(/\/$/, '')}/intake?token=${token}`;

console.log('');
console.log('T2 intake session created.');
console.log('  Client:  ', displayName);
console.log('  Email:   ', email || '(none)');
console.log('  Language:', language);
console.log('  Session: ', data.id);
console.log('');
console.log('Share this link with the champion:');
console.log('  ' + link);
console.log('');
console.log('Review transcript anytime via Supabase MCP:');
console.log(`  "show public.t2_messages for session ${data.id}, ordered by created_at"`);
