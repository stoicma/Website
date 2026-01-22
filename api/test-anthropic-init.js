import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  try {
    const rawKey = process.env.ANTHROPIC_API_KEY;
    const cleanedKey = rawKey?.replace(/[\s\r\n]+/g, '');

    // Try to initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: cleanedKey,
    });

    // Try to make a simple API call
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 100,
      messages: [{ role: 'user', content: 'Say "test successful" and nothing else.' }],
    });

    res.status(200).json({
      success: true,
      response: message.content[0].text,
      keyInfo: {
        cleaned_length: cleanedKey?.length,
        first10: cleanedKey?.substring(0, 10)
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        name: error.name,
        message: error.message,
        status: error.status,
        type: error.type,
      },
      keyInfo: {
        exists: !!process.env.ANTHROPIC_API_KEY,
        length: process.env.ANTHROPIC_API_KEY?.length,
      }
    });
  }
}
