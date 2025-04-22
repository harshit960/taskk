import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // This user ID should match a Supabase auth user ID
  // You'll need to replace this with a real user ID from your Supabase auth
  const userId = 'replace-with-real-supabase-user-id';
  
  // Create three test notes for the user
  const note1 = await prisma.note.create({
    data: {
      user_id: userId,
      title: 'Getting Started with Next.js',
      content: 'Next.js is a React framework that enables server-side rendering, static site generation, and more. It provides a great developer experience with features like hot module replacement and automatic routing.\n\nTo get started, install Next.js with npm: `npm install next react react-dom`',
      summary: 'An introduction to Next.js features and setup',
      tags: {
        create: [
          {
            tag: {
              connectOrCreate: {
                where: { name: 'nextjs' },
                create: { name: 'nextjs' },
              }
            }
          },
          {
            tag: {
              connectOrCreate: {
                where: { name: 'react' },
                create: { name: 'react' },
              }
            }
          }
        ]
      }
    },
  });

  const note2 = await prisma.note.create({
    data: {
      user_id: userId,
      title: 'Prisma with Next.js',
      content: 'Prisma is a next-generation ORM that makes database access easy with an auto-generated query builder for TypeScript & Node.js.\n\nHere\'s how to use Prisma with Next.js:\n1. Install Prisma: `npm install @prisma/client`\n2. Initialize Prisma: `npx prisma init`\n3. Define your models in schema.prisma\n4. Run migration: `npx prisma migrate dev`',
      summary: 'Setting up and using Prisma ORM with Next.js',
      tags: {
        create: [
          {
            tag: {
              connectOrCreate: {
                where: { name: 'prisma' },
                create: { name: 'prisma' },
              }
            }
          },
          {
            tag: {
              connectOrCreate: {
                where: { name: 'nextjs' },
                create: { name: 'nextjs' },
              }
            }
          },
          {
            tag: {
              connectOrCreate: {
                where: { name: 'database' },
                create: { name: 'database' },
              }
            }
          }
        ]
      }
    },
  });

  const note3 = await prisma.note.create({
    data: {
      user_id: userId,
      title: 'Authentication with Supabase',
      content: 'Supabase provides a simple and powerful authentication system that works great with Next.js applications.\n\nTo implement Supabase Auth:\n1. Create a Supabase project\n2. Install Supabase client: `npm install @supabase/supabase-js`\n3. Initialize the client with your project URL and public key\n4. Use the auth methods like signUp, signIn, signOut',
      summary: 'Implementing authentication in Next.js with Supabase',
      tags: {
        create: [
          {
            tag: {
              connectOrCreate: {
                where: { name: 'supabase' },
                create: { name: 'supabase' },
              }
            }
          },
          {
            tag: {
              connectOrCreate: {
                where: { name: 'auth' },
                create: { name: 'auth' },
              }
            }
          }
        ]
      }
    },
  });

  console.log({ note1, note2, note3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 