// Create media bucket in Supabase Storage
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function createBucket() {
  console.log('🚀 Creating media bucket in Supabase Storage...\n');

  try {
    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ Error listing buckets:', listError);
      throw listError;
    }

    const mediaExists = buckets.find(b => b.name === 'media');
    
    if (mediaExists) {
      console.log('✅ Media bucket already exists!');
      console.log(`   ID: ${mediaExists.id}`);
      console.log(`   Public: ${mediaExists.public}`);
      return;
    }

    // Create the bucket
    const { data, error } = await supabase.storage.createBucket('media', {
      public: true,
      fileSizeLimit: 52428800 // 50MB
    });

    if (error) {
      console.error('❌ Error creating bucket:', error);
      throw error;
    }

    console.log('✅ Media bucket created successfully!');
    console.log('   Name: media');
    console.log('   Public: true');
    console.log('   Size limit: 100MB');
    console.log('   Allowed: images & videos');
    
  } catch (error) {
    console.error('\n💥 Failed to create bucket:', error.message);
    console.log('\n📝 Please create the bucket manually:');
    console.log('   1. Go to: https://supabase.com/dashboard/project/nzbtynkapsyyromkhhkv/storage/buckets');
    console.log('   2. Click "New bucket"');
    console.log('   3. Name: media');
    console.log('   4. Public: Yes');
    console.log('   5. File size limit: 100MB');
    console.log('   6. Allowed MIME types: image/*, video/*');
    throw error;
  }
}

createBucket()
  .then(() => {
    console.log('\n✨ Setup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Setup failed');
    process.exit(1);
  });

