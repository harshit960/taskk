import { GoogleGenAI } from '@google/genai';

interface AiGenerateOptions {
  prompt: string;
  onChunk?: (text: string) => void;
}

// Generate content using Google's Gemini AI
export const generateContent = async ({ prompt, onChunk }: AiGenerateOptions): Promise<string> => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not defined');
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    responseMimeType: 'text/plain',
  };

  const model = 'gemini-2.0-flash-lite';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullText = '';
  for await (const chunk of response) {
    if (onChunk && chunk.text) {
      onChunk(chunk.text);
    }
    fullText += chunk.text || '';
  }

  return fullText;
}; 