# Notes App

A simple and elegant solution to organize your thoughts, ideas, and important information.

## Tech Stack

- Next.js with TypeScript
- TailwindCSS for styling
- Shadcn UI for components
- TanStack React Query for state management
- Prisma ORM with PostgreSQL database
- Local storage for fallback persistence

## Features

- Create, read, update, and delete notes
- Tag notes for organization
- Clean and intuitive user interface
- Responsive design

## React Query Implementation

This application uses TanStack React Query for efficient state management. Here's how it's implemented:

### Setup

- `QueryClientProvider` is set up at the root level in `app/providers.tsx`
- A custom hook `useQueryClient` is used to initialize the client with proper configuration
- React Query Devtools are included in development mode

### Key Features

1. **Query Keys**: Organized in a dedicated utility file for consistency
2. **API Integration**: React Query hooks for working with the REST API
3. **Custom Hooks**:
   - `useNotes()` - Fetches all notes
   - `useNote(id)` - Fetches a single note by ID
   - `useAddNote()` - Adds a new note
   - `useUpdateNote()` - Updates an existing note
   - `useDeleteNote()` - Deletes a note

### Benefits

- Automatic caching and invalidation
- Loading and error states are handled automatically
- Optimistic updates for a better user experience
- Devtools for debugging

## Database Setup

This application uses Prisma ORM with PostgreSQL. Here's how it's implemented:

### Setup

1. **PostgreSQL Database**: The application connects to a PostgreSQL database
2. **Prisma Schema**: Database models are defined in `prisma/schema.prisma`
3. **Environment Variables**: Database connection string is stored in `.env`

### Models

- **Note**: Stores note data (title, content, timestamps)
- **Tag**: Stores unique tag names
- **NoteTag**: Junction table for the many-to-many relationship between notes and tags

### API Routes

The application exposes RESTful API endpoints:

- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a new note
- `GET /api/notes/[id]` - Get a note by ID
- `PUT /api/notes/[id]` - Update a note
- `DELETE /api/notes/[id]` - Delete a note

## Setup Instructions

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

```bash
# Install dependencies
npm install

# Set up your database connection in .env
# Example: DATABASE_URL="postgresql://username:password@localhost:5432/notesapp?schema=public"

# Push the schema to your database
npm run db:push

# Generate Prisma Client
npm run generate

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Database Management

```bash
# Open Prisma Studio to manage your database
npm run db:studio
```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
