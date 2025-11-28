// Seed home content with about image
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const homeContent = [
  {
    section: 'home',
    content_key: 'about_image',
    content_value: 'About Section Main Image',
    content_type: 'image',
    image_url: 'https://nzbtynkapsyyromkhhkv.supabase.co/storage/v1/object/public/media/images/board-bring-up-hardware-testing.jpg',
    order_index: 0,
    is_active: true
  },
  {
    section: 'home',
    content_key: 'expertise_badge',
    content_value: 'Our Expertise',
    content_type: 'text',
    order_index: 1,
    is_active: true
  },
  {
    section: 'home',
    content_key: 'expertise_title',
    content_value: 'Comprehensive Solutions',
    content_type: 'text',
    order_index: 2,
    is_active: true
  },
  {
    section: 'home',
    content_key: 'expertise_subtitle',
    content_value: 'From concept to market, we deliver comprehensive solutions across the entire technology stack',
    content_type: 'text',
    order_index: 3,
    is_active: true
  }
];

async function seedHomeContent() {
  console.log('🌱 Seeding home content...\n');

  for (const content of homeContent) {
    try {
      // Check if exists
      const { data: existing } = await supabase
        .from('website_content')
        .select('id')
        .eq('section', content.section)
        .eq('content_key', content.content_key)
        .single();

      if (existing) {
        // Update existing
        const { error } = await supabase
          .from('website_content')
          .update(content)
          .eq('id', existing.id);

        if (error) throw error;
        console.log(`✅ Updated: ${content.content_key}`);
      } else {
        // Insert new
        const { error } = await supabase
          .from('website_content')
          .insert([content]);

        if (error) throw error;
        console.log(`✅ Created: ${content.content_key}`);
      }
    } catch (error) {
      console.error(`❌ Error with ${content.content_key}:`, error.message);
    }
  }

  console.log('\n🎉 Home content seeded successfully!');
}

seedHomeContent()
  .then(() => {
    console.log('\n✨ Seed completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Seed failed:', error);
    process.exit(1);
  });




