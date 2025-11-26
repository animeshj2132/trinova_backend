import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

async function uploadImage(localPath, storagePath) {
  try {
    console.log(`📤 Uploading ${localPath}...`);
    
    const fileBuffer = fs.readFileSync(localPath);
    const fileName = path.basename(localPath);
    const fileExt = path.extname(fileName).toLowerCase();
    
    let contentType = 'image/jpeg';
    if (fileExt === '.png') contentType = 'image/png';
    else if (fileExt === '.webp') contentType = 'image/webp';
    else if (fileExt === '.gif') contentType = 'image/gif';
    
    const { data, error } = await supabase.storage
      .from('media')
      .upload(storagePath, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (error) {
      throw error;
    }

    const { data: urlData } = supabase.storage
      .from('media')
      .getPublicUrl(storagePath);

    console.log(`✅ Uploaded: ${urlData.publicUrl}`);
    return urlData.publicUrl;
  } catch (error) {
    console.error(`❌ Error uploading ${localPath}:`, error.message);
    return null;
  }
}

async function updateContentImageUrl(contentKey, imageUrl) {
  try {
    const { error } = await supabase
      .from('website_content')
      .update({ image_url: imageUrl })
      .eq('section', 'ems')
      .eq('content_key', contentKey);

    if (error) throw error;
    console.log(`✅ Updated ${contentKey} with image URL`);
  } catch (error) {
    console.error(`❌ Error updating ${contentKey}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting EMS images upload to Supabase...\n');

  // Define the image
  const oldFrontendPath = path.resolve(__dirname, '../../trinova_old/Trinova/public');
  const imagePath = path.join(oldFrontendPath, 'images/board-bring-up-hardware-testing.jpg');
  
  if (fs.existsSync(imagePath)) {
    const url = await uploadImage(
      imagePath,
      'public/media/ems/board-bring-up-hardware-testing.jpg'
    );
    
    if (url) {
      await updateContentImageUrl('step_5_image', url);
    }
  } else {
    console.log(`⚠️  Image not found: ${imagePath}`);
  }

  console.log('\n✅ EMS images upload completed!');
  console.log('\n📝 Note: Other images use external URLs or should be uploaded via admin panel');
}

main();


