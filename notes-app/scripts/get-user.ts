import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function getUsers() {
  try {
    // Sign in as the user you want to get ID for
    console.log('Enter your Supabase account details to get your user ID:');
    
    // For simplicity, we're using a demo account here
    // In a real scenario, you'd want to prompt for user input
    const email = process.env.TEST_USER_EMAIL || 'test@example.com';
    const password = process.env.TEST_USER_PASSWORD || 'test-password';
    
    console.log(`Attempting to sign in with: ${email}`);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    if (data.user) {
      console.log('✅ User signed in successfully');
      console.log('User ID:', data.user.id);
      console.log('Email:', data.user.email);
      console.log('\nUpdate your seed.ts file with this User ID to link notes to this user.');
      console.log('Update this line in seed.ts:');
      console.log(`const userId = '${data.user.id}'; // Replace placeholder with this real ID`);
    } else {
      console.log('❌ No user data returned');
    }
  } catch (error) {
    console.error('Error getting user:', error);
  } finally {
    process.exit(0);
  }
}

getUsers(); 