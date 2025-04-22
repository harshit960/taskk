import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET a single note by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const note = await prisma.note.findUnique({
      where: { id: (await params).id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
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

    return NextResponse.json(transformedNote);
  } catch (error) {
    console.error('Error fetching note:', error);
    return NextResponse.json(
      { error: 'Error fetching note' },
      { status: 500 }
    );
  }
}

// PUT (update) a note by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { title, content, tags = [] } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Check if the note exists
    const existingNote = await prisma.note.findUnique({
      where: { id: (await params).id },
    });

    if (!existingNote) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    // Update the note with transactions
    const updatedNote = await prisma.$transaction(async (tx: { note: { update: (arg0: { where: { id: string; }; data: { title: any; content: any; }; }) => any; findUnique: (arg0: { where: { id: any; }; include: { tags: { include: { tag: boolean; }; }; }; }) => any; }; noteTag: { deleteMany: (arg0: { where: { noteId: string; }; }) => any; create: (arg0: { data: { noteId: any; tagId: any; }; }) => any; }; tag: { upsert: (arg0: { where: { name: any; }; update: {}; create: { name: any; }; }) => any; }; }) => {
      // Update the note
      const note = await tx.note.update({
        where: { id: (await params).id },
        data: {
          title,
          content: content || '',
        },
      });

      // Remove all existing tag connections for this note
      await tx.noteTag.deleteMany({
        where: {
          noteId: (await params).id,
        },
      });

      // Process and reattach tags
      if (tags.length > 0) {
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
              noteId: note.id,
              tagId: tag.id,
            },
          });
        }
      }

      // Return the updated note with its tags
      return tx.note.findUnique({
        where: { id: note.id },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
    });

    if (!updatedNote) {
      return NextResponse.json(
        { error: 'Failed to update note' },
        { status: 500 }
      );
    }

    // Transform the response
    const transformedNote = {
      id: updatedNote.id,
      title: updatedNote.title,
      content: updatedNote.content,
      createdAt: updatedNote.createdAt,
      updatedAt: updatedNote.updatedAt,
      tags: updatedNote.tags.map((noteTag: { tag: { name: any; }; }) => noteTag.tag.name),
    };

    return NextResponse.json(transformedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json(
      { error: 'Error updating note' },
      { status: 500 }
    );
  }
}

// DELETE a note by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check if the note exists
    const existingNote = await prisma.note.findUnique({
      where: { id: (await params).id },
    });

    if (!existingNote) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    // Delete the note (this will cascade delete its tag connections)
    await prisma.note.delete({
      where: { id: (await params).id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json(
      { error: 'Error deleting note' },
      { status: 500 }
    );
  }
} 