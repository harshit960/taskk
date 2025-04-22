import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// ============= CONFIGURATION =============
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
// These values can be hardcoded for demo purposes or read from ENV
const testUserEmail = process.env.TEST_USER_EMAIL || '';
const testUserPassword = process.env.TEST_USER_PASSWORD || '';
// ========================================

// Make sure we have Supabase credentials
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Supabase URL or Anon Key is missing in the .env file.');
  process.exit(1);
}

// Make sure we have test user credentials
if (!testUserEmail || !testUserPassword) {
  console.error('Error: TEST_USER_EMAIL and TEST_USER_PASSWORD must be set in .env file.');
  console.error('Add the following to your .env file:');
  console.error('TEST_USER_EMAIL=your-test-email@example.com');
  console.error('TEST_USER_PASSWORD=your-test-password');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupDatabase() {
  try {
    console.log('🚀 Starting database setup...');
    
    // 1. Run Prisma migration
    console.log('\n📊 Running Prisma migrations...');
    try {
      execSync('npx prisma migrate dev --name add_notes_user_id_and_summary', { stdio: 'inherit' });
    } catch (error) {
      console.error('❌ Migration failed. You may need to try it manually.');
      console.error('Run: npx prisma migrate dev --name add_notes_user_id_and_summary');
      // Continue with the script to get the user ID
    }
    
    // 2. Get user ID from Supabase
    console.log('\n🔐 Getting Supabase user ID...');
    console.log(`Attempting to sign in with: ${testUserEmail}`);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: testUserEmail,
      password: testUserPassword,
    });

    if (error) {
      console.error('❌ Error authenticating with Supabase:', error.message);
      process.exit(1);
    }

    if (!data.user) {
      console.error('❌ No user data returned from Supabase');
      process.exit(1);
    }

    const userId = data.user.id;
    console.log('✅ Successfully got user ID:', userId);
    
    // 3. Update the seed.ts file with the user ID
    console.log('\n📝 Updating seed file with user ID...');
    const seedPath = path.join(process.cwd(), 'prisma', 'seed.ts');
    
    if (!fs.existsSync(seedPath)) {
      console.error(`❌ Seed file not found at ${seedPath}`);
      process.exit(1);
    }
    
    let seedContent = fs.readFileSync(seedPath, 'utf8');
    seedContent = seedContent.replace(
      /const userId = ['"].*['"]/,
      `const userId = '${userId}'`
    );
    fs.writeFileSync(seedPath, seedContent);
    
    console.log('✅ Successfully updated seed.ts with user ID');
    
    // 4. Run the seed
    console.log('\n🌱 Running database seed...');
    try {
      execSync('npx prisma db seed', { stdio: 'inherit' });
      console.log('✅ Database seeded successfully');
    } catch (error) {
      console.error('❌ Seeding failed. You may need to try it manually.');
      console.error('Run: npx prisma db seed');
    }
    
    console.log('\n🎉 Setup complete! Your database has been migrated and seeded.');
  } catch (error) {
    console.error('Error during setup:', error);
    process.exit(1);
  }
}

setupDatabase(); 