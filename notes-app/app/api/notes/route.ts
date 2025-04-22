import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET all notes
export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    // Transform the response to match our front-end data structure
    const transformedNotes = notes.map((note: { id: any; title: any; content: any; createdAt: any; updatedAt: any; tags: any[]; }) => ({
      id: note.id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
      tags: note.tags.map((noteTag) => noteTag.tag.name),
    }));

    return NextResponse.json(transformedNotes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json(
      { error: 'Error fetching notes' },
      { status: 500 }
    );
  }
}

// POST a new note
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content,user_id, tags = [] } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Create a new note with associated tags
    const note = await prisma.$transaction(async (tx:any) => {
      // Create the note
      const newNote = await tx.note.create({
        data: {
          title,
          content: content || '',
          user_id, // Converting user_id to string to match schema type
        },
      });

      // Process tags
      if (tags.length > 0) {
        // Create tags that don't exist yet and connect them to the note
        for (const tagName of tags) {
          // Find or create the tag
          const tag = await tx.tag.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName },
          });

          // Connect the tag to the note
          await tx.noteTag.create({
            data: {
              noteId: newNote.id,
              tagId: tag.id,
            },
          });
        }
      }

      // Return the created note with its tags
      return tx.note.findUnique({
        where: { id: newNote.id },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
    });

    if (!note) {
      return NextResponse.json(
        { error: 'Failed to create note' },
        { status: 500 }
      );
    }

    // Transform the response
    const transformedNote = {
      id: note.id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
      tags: note.tags.map((noteTag: { tag: { name: any; }; }) => noteTag.tag.name),
    };

    return NextResponse.json(transformedNote, { status: 201 });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json(
      { error: 'Error creating note' },
      { status: 500 }
    );
  }
} 