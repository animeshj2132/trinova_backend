// Upload hero slide images to Supabase Storage and update database
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const imagesToUpload = [
  {
    localPath: '../../Trinova/public/images/slider-1.webp',
    storagePath: 'images/slider-1.webp',
    slideTitle: 'Your Vision, '
  },
  {
    localPath: '../../Trinova/public/images/slider-2.webp',
    storagePath: 'images/slider-2.webp',
    slideTitle: 'Your Vision, '
  },
  {
    localPath: '../../Trinova/public/images/slider-3.webp',
    storagePath: 'images/slider-3.webp',
    slideTitle: 'Your Vision, '
  }
];

async function uploadImages() {
  console.log('🚀 Starting hero images upload to Supabase Storage...\n');

  for (const image of imagesToUpload) {
    try {
      const fullPath = join(__dirname, image.localPath);
      
      console.log(`📤 Uploading ${image.storagePath}...`);
      
      // Read the file
      const fileBuffer = readFileSync(fullPath);
      
      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(image.storagePath, fileBuffer, {
          contentType: 'image/webp',
          upsert: true // Overwrite if exists
        });
      
      if (uploadError) {
        console.error(`❌ Error uploading ${image.storagePath}:`, uploadError.message);
        continue;
      }
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('media')
        .getPublicUrl(image.storagePath);
      
      const publicUrl = urlData.publicUrl;
      console.log(`✅ Uploaded: ${publicUrl}`);
      
      // Update hero slide in database
      const { error: updateError } = await supabase
        .from('hero_slides')
        .update({ media_url: publicUrl })
        .eq('media_url', `/images/${image.storagePath.split('/')[1]}`)
        .eq('title', image.slideTitle);
      
      if (updateError) {
        console.error(`⚠️  Warning: Could not update database for ${image.storagePath}:`, updateError.message);
      } else {
        console.log(`✅ Database updated for ${image.storagePath}\n`);
      }
      
    } catch (error) {
      console.error(`❌ Error processing ${image.storagePath}:`, error.message);
    }
  }
  
  console.log('\n🎉 All hero images uploaded to Supabase Storage!');
  console.log('📝 Hero slides database updated with Supabase URLs');
}

uploadImages()
  .then(() => {
    console.log('\n✨ Upload completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Upload failed:', error);
    process.exit(1);
  });


