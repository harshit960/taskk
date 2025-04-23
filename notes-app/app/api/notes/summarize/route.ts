import { NextRequest, NextResponse } from 'next/server';
import { generateContent } from '@/lib/services/ai-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content } = body;

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required and must be a string' },
        { status: 400 }
      );
    }

    // Generate a summary using the AI service
    const summary = await generateContent({
      prompt: "Summarize the following note content in a concise way. Dont return anything else except the summary. \n Content: " + content,
    });

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error summarizing content:', error);
    return NextResponse.json(
      { error: 'Error summarizing content' },
      { status: 500 }
    );
  }
} 