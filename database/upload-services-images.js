import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Services page images to upload
const servicesImages = [
  {
    localPath: '../../trinova_old/Trinova/src/assets/images/Research &Development.webp',
    fileName: 'services-rd-innovation.webp',
    category: 'services',
    description: 'Research & Development service image'
  },
  {
    localPath: '../../Trinova/public/images/product-development.webp',
    fileName: 'services-product-development.webp',
    category: 'services',
    description: 'End-to-End Product Development image',
    fallback: true // This might not exist, will use placeholder
  },
  {
    localPath: '../../Trinova/public/images/hardware-design.webp',
    fileName: 'services-hardware-design.webp',
    category: 'services',
    description: 'Hardware Design service image',
    fallback: true
  },
  {
    localPath: '../../Trinova/public/images/firmware-development.webp',
    fileName: 'services-firmware-development.webp',
    category: 'services',
    description: 'Firmware Development service image',
    fallback: true
  },
  {
    localPath: '../../Trinova/public/images/consumer-electronics.webp',
    fileName: 'industries-consumer-electronics.webp',
    category: 'industries',
    description: 'Consumer Electronics industry image',
    fallback: true
  },
  {
    localPath: '../../Trinova/public/images/industrial-automation.webp',
    fileName: 'industries-industrial-automation.webp',
    category: 'industries',
    description: 'Industrial Automation industry image',
    fallback: true
  },
  {
    localPath: '../../Trinova/public/images/medical-devices.webp',
    fileName: 'industries-medical-devices.webp',
    category: 'industries',
    description: 'Medical Devices industry image',
    fallback: true
  },
  {
    localPath: '../../Trinova/public/images/iot-solutions.webp',
    fileName: 'industries-iot-solutions.webp',
    category: 'industries',
    description: 'IoT Solutions industry image',
    fallback: true
  },
];

async function uploadServicesImages() {
  console.log('📤 Uploading services page images to Supabase...\n');

  const uploadedImages = [];

  for (const imageInfo of servicesImages) {
    try {
      const absolutePath = path.resolve(__dirname, imageInfo.localPath);
      
      // Check if file exists
      if (!fs.existsSync(absolutePath)) {
        if (imageInfo.fallback) {
          console.log(`⚠️  Skipping ${imageInfo.fileName} (file not found, will use external URL)`);
          continue;
        } else {
          console.error(`❌ File not found: ${absolutePath}`);
          continue;
        }
      }

      console.log(`📤 Uploading ${imageInfo.fileName}...`);

      // Read file
      const fileBuffer = fs.readFileSync(absolutePath);
      const fileExt = path.extname(imageInfo.fileName);
      const contentType = fileExt === '.webp' ? 'image/webp' : 
                         fileExt === '.jpg' || fileExt === '.jpeg' ? 'image/jpeg' :
                         fileExt === '.png' ? 'image/png' : 'image/webp';

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(`public/media/${imageInfo.category}/${imageInfo.fileName}`, fileBuffer, {
          contentType,
          upsert: true
        });

      if (uploadError) {
        console.error(`❌ Error uploading ${imageInfo.fileName}:`, uploadError.message);
        continue;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(`public/media/${imageInfo.category}/${imageInfo.fileName}`);

      console.log(`✅ Uploaded: ${publicUrl}`);

      // Register in media table
      const { error: dbError } = await supabase
        .from('media')
        .insert({
          title: imageInfo.description,
          url: publicUrl,
          category: imageInfo.category,
          media_type: 'image',
          uploaded_by: null // System upload
        });

      if (dbError && dbError.code !== '23505') { // Ignore duplicate errors
        console.error(`⚠️  Could not register in database:`, dbError.message);
      }

      uploadedImages.push({
        fileName: imageInfo.fileName,
        url: publicUrl,
        category: imageInfo.category
      });

    } catch (error) {
      console.error(`❌ Error processing ${imageInfo.fileName}:`, error.message);
    }
  }

  console.log(`\n✅ Upload complete! Uploaded ${uploadedImages.length} images.\n`);

  // Show all URLs
  console.log('📋 Uploaded image URLs:\n');
  uploadedImages.forEach(img => {
    console.log(`${img.fileName}:`);
    console.log(`  ${img.url}\n`);
  });

  return uploadedImages;
}

uploadServicesImages().catch(console.error);





