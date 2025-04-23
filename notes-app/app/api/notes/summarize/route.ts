import { NextRequest, NextResponse } from 'next/server';
import { generateContent } from '@/lib/services/ai-service';
import { getCurrentUser } from '@/lib/server-utils';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Get the current user
    const userInfo = await getCurrentUser(request);
    
    if (!userInfo) {
      return NextResponse.json(
        { error: 'Unauthorized: You must be logged in to summarize notes' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { content, note_id } = body;

    // If a note ID is provided, verify ownership
    if (note_id) {
      const note = await prisma.note.findUnique({
        where: { id: note_id }
      });
      
      if (!note) {
        return NextResponse.json(
          { error: 'Note not found' },
          { status: 404 }
        );
      }
      
      // Check if the note belongs to the current user
      if (note.user_id !== userInfo.user_id) {
        return NextResponse.json(
          { error: 'Forbidden: You do not have permission to summarize this note' },
          { status: 403 }
        );
      }
    }

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

    // If a note ID was provided, update the note with the summary
    if (note_id) {
      await prisma.note.update({
        where: { id: note_id },
        data: { summary }
      });
    }

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error summarizing content:', error);
    return NextResponse.json(
      { error: 'Error summarizing content' },
      { status: 500 }
    );
  }
} 