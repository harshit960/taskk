# Notes App

A modern, feature-rich note-taking application built with Next.js, Supabase, and Prisma.

## Features

- **User Authentication**: Secure user signup and login via Supabase Auth
- **CRUD Operations**: Create, read, update, and delete notes
- **Note Organization**: Tag-based note categorization system
- **Rich Text Editing**: Enhanced note editing experience
- **Automatic Summarization**: AI-powered note summarization using Google's Gemini API
- **Responsive Design**: Mobile-friendly UI with Shadcn components
- **Real-time Updates**: Immediate UI updates when adding or modifying notes
- **Data Persistence**: PostgreSQL database with Prisma ORM
- **Google Calendar Integration**: Integration with Google Calendar for scheduling and reminders

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: TailwindCSS, Shadcn UI components
- **State Management**: TanStack React Query
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **AI Integration**: Google Gemini API for note summarization

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (or a Supabase account)
- Google Gemini API key (optional, for summarization feature)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/harshit960/taskk.git
cd notes-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory with the following variables:

```
# Database connection
DATABASE_URL="postgresql://username:password@host:port/database"

# Supabase configuration
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Gemini API (for AI summarization)
GEMINI_API_KEY="your-gemini-api-key"
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma db push



### 5. Start the development server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

- **/app** - Next.js app router pages and API routes
- **/components** - React components organized by feature
- **/lib** - Utility functions and shared code
- **/prisma** - Database schema and migrations
- **/types** - TypeScript type definitions

## Database Schema

The application uses three main models:

1. **Note** - Stores note content with user association
2. **Tag** - Defines categories for organizing notes
3. **NoteTag** - Junction table for the many-to-many relationship

## API Routes

- `GET /api/notes` - Retrieve all notes for the authenticated user
- `POST /api/notes` - Create a new note
- `GET /api/notes/[id]` - Get a specific note by ID
- `PUT /api/notes/[id]` - Update an existing note
- `DELETE /api/notes/[id]` - Delete a note
- `POST /api/notes/summarize` - Generate AI summary for note content

## Authentication

The app uses Supabase Authentication with:
- Email/password authentication
- Protected routes requiring authentication
- User-specific note access and management

## Development

### Running Tests

```bash
npm run test
```

### Database Management

```bash
# Open Prisma Studio to manage your database
npx prisma studio
```

## License

MIT

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Prisma](https://www.prisma.io/)
- [Shadcn UI](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query) 
