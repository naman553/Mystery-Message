import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({});

export async function POST() {
  try {
    console.log('POST /api/suggest-messages called');

    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is missing');
      return NextResponse.json(
        { message: 'GEMINI_API_KEY is not configured' },
        { status: 500 }
      );
    }

    const model =  'gemini-3-flash-preview';
    const prompt =
      "Create exactly three open-ended, friendly questions for an anonymous social messaging platform. Return them as a single string separated only by '||'. Do not use bullet points, numbering, or extra text. Avoid sensitive or deeply personal topics.";

    console.log('Trying Gemini model:', model);

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    console.log('Gemini SDK raw response:', JSON.stringify(response));

    const content = response.text?.trim() ?? '';
    console.log('Gemini suggestion content:', content);

    if (!content) {
      console.error('Suggest messages returned empty content');
      return NextResponse.json(
        { message: 'Failed to generate suggested messages' },
        { status: 500 }
      );
    }

    return new Response(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Unexpected error in suggest-messages:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
