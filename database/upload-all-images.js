// Upload ALL frontend images to Supabase Storage and register in media table
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { readFileSync, statSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const imagesToUpload = [
  // Hero slider images (already uploaded, but will re-register in media table)
  {
    localPath: '../../Trinova/public/images/slider-1.webp',
    storagePath: 'images/slider-1.webp',
    category: 'hero',
    description: 'Hero Slide 1 - Innovation'
  },
  {
    localPath: '../../Trinova/public/images/slider-2.webp',
    storagePath: 'images/slider-2.webp',
    category: 'hero',
    description: 'Hero Slide 2 - Full Stack'
  },
  {
    localPath: '../../Trinova/public/images/slider-3.webp',
    storagePath: 'images/slider-3.webp',
    category: 'hero',
    description: 'Hero Slide 3 - Intelligent Ops'
  },
  // Other images
  {
    localPath: '../../Trinova/public/images/board-bring-up-hardware-testing.jpg',
    storagePath: 'images/board-bring-up-hardware-testing.jpg',
    category: 'general',
    description: 'Board Bring Up Hardware Testing'
  },
  {
    localPath: '../../Trinova/public/logo.png',
    storagePath: 'images/logo.png',
    category: 'general',
    description: 'Trinova AI Logo'
  },
  {
    localPath: '../../Trinova/src/assets/images/Research &Development.webp',
    storagePath: 'images/research-and-development.webp',
    category: 'general',
    description: 'Research & Development'
  }
];

async function uploadImages() {
  console.log('🚀 Starting upload of ALL frontend images to Supabase Storage...\n');
  
  let uploadedCount = 0;
  let registeredCount = 0;
  let skippedCount = 0;

  for (const image of imagesToUpload) {
    try {
      const fullPath = join(__dirname, image.localPath);
      const fileName = basename(image.storagePath);
      
      console.log(`📤 Processing: ${fileName}...`);
      
      // Read the file
      const fileBuffer = readFileSync(fullPath);
      const fileStats = statSync(fullPath);
      const fileSize = fileStats.size;
      
      // Determine MIME type
      const ext = fileName.split('.').pop().toLowerCase();
      const mimeTypes = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'webp': 'image/webp',
        'gif': 'image/gif'
      };
      const mimeType = mimeTypes[ext] || 'image/jpeg';
      
      // Upload to Supabase Storage (upsert = true to overwrite if exists)
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(image.storagePath, fileBuffer, {
          contentType: mimeType,
          upsert: true
        });
      
      if (uploadError && uploadError.message !== 'The resource already exists') {
        console.error(`❌ Error uploading ${fileName}:`, uploadError.message);
        continue;
      }
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('media')
        .getPublicUrl(image.storagePath);
      
      const publicUrl = urlData.publicUrl;
      
      if (uploadError && uploadError.message === 'The resource already exists') {
        console.log(`⏭️  Already exists in storage: ${fileName}`);
        skippedCount++;
      } else {
        console.log(`✅ Uploaded to storage: ${fileName}`);
        uploadedCount++;
      }
      
      console.log(`   URL: ${publicUrl}`);
      
      // Check if already in media table
      const { data: existing, error: checkError } = await supabase
        .from('media')
        .select('id')
        .eq('file_url', publicUrl)
        .single();
      
      if (existing) {
        console.log(`   ℹ️  Already in media table\n`);
        continue;
      }
      
      // Insert into media table
      const { error: insertError } = await supabase
        .from('media')
        .insert([{
          filename: fileName,
          original_name: fileName,
          file_path: image.storagePath,
          file_url: publicUrl,
          file_size: fileSize,
          mime_type: mimeType,
          category: image.category,
          uploaded_by: null // System upload
        }]);
      
      if (insertError) {
        console.error(`   ⚠️  Could not add to media table:`, insertError.message);
      } else {
        console.log(`   ✅ Added to media table\n`);
        registeredCount++;
      }
      
    } catch (error) {
      console.error(`❌ Error processing ${image.storagePath}:`, error.message, '\n');
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Upload Summary:');
  console.log('='.repeat(60));
  console.log(`✅ Newly uploaded to storage: ${uploadedCount}`);
  console.log(`⏭️  Already in storage (skipped): ${skippedCount}`);
  console.log(`📝 Registered in media table: ${registeredCount}`);
  console.log(`📁 Total processed: ${imagesToUpload.length}`);
  console.log('='.repeat(60));
  console.log('\n🎉 All images are now in Supabase Storage!');
  console.log('🖼️  You can view them in the Admin Panel > Media tab');
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





