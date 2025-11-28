// Seed script to populate initial hero slides
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const heroSlides = [
  {
    title: 'Your Vision, ',
    highlights: ['Engineered Into Reality.'],
    description: 'We are the full-stack partner, accelerating innovation from concept to market in hardware, firmware, and advanced AI systems.',
    sub_description: 'Unlock reliable, scalable products with our deep expertise in embedded intelligence, secure connectivity, and cloud orchestration.',
    media_url: '/images/slider-1.webp',
    media_type: 'image',
    primary_cta_label: 'Explore Our Services',
    primary_cta_icon: 'ri-arrow-right-line',
    order_index: 0,
    is_active: true
  },
  {
    title: 'Your Vision, ',
    highlights: ['Engineered Into Reality.'],
    description: 'A single partner for research, hardware, firmware, and manufacturing means faster cycles and fewer handoffs.',
    sub_description: 'Our collaborative pods blend R&D rigor with production discipline so every iteration moves you closer to market launch.',
    media_url: '/images/slider-2.webp',
    media_type: 'image',
    primary_cta_label: 'See Our Process',
    primary_cta_icon: 'ri-play-circle-line',
    order_index: 1,
    is_active: true
  },
  {
    title: 'Your Vision, ',
    highlights: ['Engineered Into Reality.'],
    description: 'We fuse predictive analytics, secure OTA, and data orchestration so your products learn, adapt, and scale.',
    sub_description: 'From mobile companion apps to cloud-native control rooms, we help you deliver seamless user experiences and proactive support.',
    media_url: '/images/slider-3.webp',
    media_type: 'image',
    primary_cta_label: 'View Case Studies',
    primary_cta_icon: 'ri-slideshow-3-line',
    order_index: 2,
    is_active: true
  }
];

async function seedHeroSlides() {
  console.log('🌱 Starting hero slides seed...');
  
  try {
    // Check if hero slides already exist
    const { data: existing, error: checkError } = await supabase
      .from('hero_slides')
      .select('id');
    
    if (checkError) throw checkError;
    
    if (existing && existing.length > 0) {
      console.log(`⚠️  Found ${existing.length} existing hero slides. Skipping seed.`);
      console.log('   Run "DELETE FROM hero_slides;" in Supabase if you want to re-seed.');
      return;
    }
    
    // Insert hero slides
    const { data, error } = await supabase
      .from('hero_slides')
      .insert(heroSlides)
      .select();
    
    if (error) throw error;
    
    console.log(`✅ Successfully seeded ${data.length} hero slides!`);
    console.log('   - Slide 1: "Engineered Into Reality" (slider-1.webp)');
    console.log('   - Slide 2: "See Our Process" (slider-2.webp)');
    console.log('   - Slide 3: "View Case Studies" (slider-3.webp)');
    console.log('\n🎉 Hero slides are now available on the homepage!');
    
  } catch (error) {
    console.error('❌ Error seeding hero slides:', error.message);
    process.exit(1);
  }
}

// Run the seed
seedHeroSlides()
  .then(() => {
    console.log('\n✨ Seed completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Seed failed:', error);
    process.exit(1);
  });




