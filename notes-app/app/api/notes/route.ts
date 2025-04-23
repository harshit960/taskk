import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { generateContent } from '@/lib/services/ai-service';
import { getCurrentUser } from '@/lib/server-utils';

// GET all notes
export async function GET(request: NextRequest) {
  try {
    // Get the current user
    const userInfo = await getCurrentUser(request);
    
    if (!userInfo) {
      return NextResponse.json(
        { error: 'Unauthorized: You must be logged in to access notes' },
        { status: 401 }
      );
    }
    
    // Only fetch notes belonging to the current user
    const notes = await prisma.note.findMany({
      where: {
        user_id: userInfo.user_id
      },
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
    // Get the current user
    const userInfo = await getCurrentUser(request);
    
    if (!userInfo) {
      return NextResponse.json(
        { error: 'Unauthorized: You must be logged in to create notes' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    var { title, content, tags = [] } = body;
    
    // Always use the user ID from the auth token, not from the request body
    const user_id = userInfo.user_id;
    
    if (!title || title === "") {
      const aiGenTitle = await generateContent({ 
        prompt: "DON'T GENERATE ANYTHING ELSE, JUST GENERATE A TITLE FOR A NOTE WITH THE FOLLOWING CONTENT: " + content,

      });
      title = aiGenTitle;
    }
    if (!tags || tags.length === 0) {
      const aiGenTags = await generateContent({ 
        prompt: "DON'T GENERATE ANYTHING ELSE, JUST GENERATE A TAGS FOR A NOTE WITH THE FOLLOWING CONTENT: Give me 3 tags for this note. Comma separated Values. " + content,
      });
      tags = aiGenTags.split(',');
    }

    // Create a new note with associated tags
    const note = await prisma.$transaction(async (tx:any) => {
      // Create the note
      const newNote = await tx.note.create({
        data: {
          title,
          content: content || '',
          user_id, // Using the current user's ID from auth
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

