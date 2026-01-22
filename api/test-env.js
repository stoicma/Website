export default async function handler(req, res) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  res.status(200).json({
    keyExists: !!apiKey,
    keyLength: apiKey?.length || 0,
    keyType: typeof apiKey,
    keyFirst10: apiKey?.substring(0, 10) || 'undefined',
    keyHasWhitespace: apiKey ? /\s/.test(apiKey) : false,
    keyHasNewline: apiKey ? /\n/.test(apiKey) : false,
    allEnvKeys: Object.keys(process.env).filter(k => k.includes('ANTHROPIC'))
  });
}
