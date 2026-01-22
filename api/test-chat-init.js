export default async function handler(req, res) {
  const rawKey = process.env.ANTHROPIC_API_KEY;
  const cleanedKey = rawKey?.replace(/[\s\r\n]+/g, '');

  res.status(200).json({
    raw: {
      exists: !!rawKey,
      length: rawKey?.length || 0,
      first10: rawKey?.substring(0, 10),
      hasWhitespace: rawKey ? /\s/.test(rawKey) : false,
      hasNewline: rawKey ? /\n/.test(rawKey) : false,
    },
    cleaned: {
      exists: !!cleanedKey,
      length: cleanedKey?.length || 0,
      first10: cleanedKey?.substring(0, 10),
      hasWhitespace: cleanedKey ? /\s/.test(cleanedKey) : false,
      hasNewline: cleanedKey ? /\n/.test(cleanedKey) : false,
    },
    same: rawKey === cleanedKey
  });
}
