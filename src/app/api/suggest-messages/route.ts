import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const FALLBACK_SUGGESTIONS = [
  'What is something small that made you smile recently?',
  'What kind of message would make your day better?',
  'What is one thing you are looking forward to right now?',
];

function toSuggestionResponse(messages: string[], source: 'ai' | 'fallback') {
  return new Response(messages.join('||'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Suggestions-Source': source,
    },
  });
}

export async function POST() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY is missing. Returning fallback suggestions.');
    return toSuggestionResponse(FALLBACK_SUGGESTIONS, 'fallback');
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents:
        "Generate exactly three friendly, open-ended questions for an anonymous social messaging platform. Return only one plain string separated by '||'. No bullets, no numbering, no intro text, and no sensitive topics.",
      config: {
        temperature: 0.9,
        maxOutputTokens: 120,
      },
    });

    const content = response.text?.trim();
    if (!content) {
      console.error('Gemini returned empty content. Using fallback suggestions.');
      return toSuggestionResponse(FALLBACK_SUGGESTIONS, 'fallback');
    }

    const normalized = content
      .split('||')
      .map((message) => message.trim())
      .filter(Boolean)
      .slice(0, 3);

    if (normalized.length !== 3) {
      console.error('Gemini returned invalid suggestion format. Using fallback.', {
        content,
      });
      return toSuggestionResponse(FALLBACK_SUGGESTIONS, 'fallback');
    }

    return toSuggestionResponse(normalized, 'ai');
  } catch (error) {
    const providerError = error as {
      status?: number;
      code?: number | string;
      message?: string;
    };

    console.error('Suggest messages provider error:', {
      status: providerError.status,
      code: providerError.code,
      message: providerError.message,
    });

    return toSuggestionResponse(FALLBACK_SUGGESTIONS, 'fallback');
  }
}
