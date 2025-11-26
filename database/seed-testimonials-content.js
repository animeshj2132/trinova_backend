import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const testimonialsContent = [
  // === TAB 1: HERO SECTION ===
  { section: 'testimonials', content_key: 'hero_badge', content_value: 'Client Success Stories', image_url: null },
  { section: 'testimonials', content_key: 'hero_title_line1', content_value: 'Trusted by Industry', image_url: null },
  { section: 'testimonials', content_key: 'hero_title_line2', content_value: 'Leaders Worldwide', image_url: null },
  { section: 'testimonials', content_key: 'hero_subtitle', content_value: 'Discover how Trinova AI has transformed businesses across industries with cutting-edge intelligent electronics and AI solutions.', image_url: null },
  { section: 'testimonials', content_key: 'hero_background_image', content_value: '', image_url: null },
  
  // Hero Stats
  { section: 'testimonials', content_key: 'hero_stat_1_value', content_value: '150+', image_url: null },
  { section: 'testimonials', content_key: 'hero_stat_1_label', content_value: 'Happy Clients', image_url: null },
  { section: 'testimonials', content_key: 'hero_stat_2_value', content_value: '98%', image_url: null },
  { section: 'testimonials', content_key: 'hero_stat_2_label', content_value: 'Client Satisfaction', image_url: null },
  { section: 'testimonials', content_key: 'hero_stat_3_value', content_value: '25+', image_url: null },
  { section: 'testimonials', content_key: 'hero_stat_3_label', content_value: 'Countries Served', image_url: null },

  // === TAB 2: FEATURED REVIEWS ===
  // Section Header
  { section: 'testimonials', content_key: 'featured_badge', content_value: 'Featured Reviews', image_url: null },
  { section: 'testimonials', content_key: 'featured_title_line1', content_value: 'What Our Clients', image_url: null },
  { section: 'testimonials', content_key: 'featured_title_line2', content_value: 'Say About Us', image_url: null },

  // Review Cards (3 existing testimonials from the page)
  {
    section: 'testimonials',
    content_key: 'review_cards',
    content_value: JSON.stringify([
      {
        id: 1,
        rating: 5,
        testimonial: 'Trinova AI transformed our smart home product line with their exceptional AI integration. Their team\'s expertise in both hardware and software development made our vision a reality.',
        name: 'Rajesh Sharma',
        designation: 'CTO',
        company: 'SmartTech Solutions'
      },
      {
        id: 2,
        rating: 5,
        testimonial: 'Outstanding PCB design and manufacturing services. The quality and precision of their work exceeded our expectations. Highly recommend for complex electronics projects.',
        name: 'Maria Patel',
        designation: 'Lead Engineer',
        company: 'MedDevice Corp'
      },
      {
        id: 3,
        rating: 5,
        testimonial: 'Their AI-powered robotics solutions revolutionized our manufacturing process. The team\'s technical expertise and customer support are truly exceptional.',
        name: 'David Kim',
        designation: 'Operations Director',
        company: 'AutoTech Industries'
      }
    ]),
    image_url: null
  },

  // === TAB 3: INDUSTRY RECOGNITION ===
  // Section Header
  { section: 'testimonials', content_key: 'recognition_badge', content_value: 'Industry Recognition', image_url: null },
  { section: 'testimonials', content_key: 'recognition_title_line1', content_value: 'Trusted Across', image_url: null },
  { section: 'testimonials', content_key: 'recognition_title_line2', content_value: 'Multiple Industries', image_url: null },
  { section: 'testimonials', content_key: 'recognition_description', content_value: 'From startups to Fortune 500 companies, we\'ve delivered exceptional results across diverse sectors', image_url: null },

  // Industry Cards (4 existing stats from the page)
  {
    section: 'testimonials',
    content_key: 'industry_cards',
    content_value: JSON.stringify([
      {
        id: 1,
        icon: 'ri-home-line',
        number: '45+',
        label: 'Smart Home Projects'
      },
      {
        id: 2,
        icon: 'ri-smartphone-line',
        number: '30+',
        label: 'Medical Devices'
      },
      {
        id: 3,
        icon: 'ri-robot-line',
        number: '25+',
        label: 'Robotics Solutions'
      },
      {
        id: 4,
        icon: 'ri-global-line',
        number: '50+',
        label: 'IoT Deployments'
      }
    ]),
    image_url: null
  },

  // === TAB 4: CTA SECTION ===
  { section: 'testimonials', content_key: 'cta_badge', content_value: 'Ready to Join Our Success Stories?', image_url: null },
  { section: 'testimonials', content_key: 'cta_title_line1', content_value: 'Ready to Join Our', image_url: null },
  { section: 'testimonials', content_key: 'cta_title_line2', content_value: 'Success Stories?', image_url: null },
  { section: 'testimonials', content_key: 'cta_description', content_value: 'Let\'s discuss how Trinova AI can transform your business with cutting-edge intelligent electronics and AI solutions.', image_url: null }
];

async function seedTestimonialsContent() {
  try {
    console.log('Starting Testimonials content seeding...');

    // Delete existing Testimonials content
    const { error: deleteError } = await supabase
      .from('website_content')
      .delete()
      .eq('section', 'testimonials');

    if (deleteError) {
      console.error('Error deleting existing content:', deleteError);
      throw deleteError;
    }

    console.log('Deleted existing Testimonials content');

    // Insert new content
    const { data, error: insertError } = await supabase
      .from('website_content')
      .insert(testimonialsContent);

    if (insertError) {
      console.error('Error inserting content:', insertError);
      throw insertError;
    }

    console.log('✅ Successfully seeded Testimonials content!');
    console.log(`   - Inserted ${testimonialsContent.length} content items`);
    console.log('   - Hero section with stats');
    console.log('   - Featured Reviews section with 3 review cards');
    console.log('   - Industry Recognition section with 4 cards');

  } catch (error) {
    console.error('Failed to seed Testimonials content:', error);
    process.exit(1);
  }
}

seedTestimonialsContent();

