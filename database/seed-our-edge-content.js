import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const ourEdgeContent = [
  // === TAB 1: HERO SECTION ===
  { section: 'our_edge', content_key: 'hero_badge', content_value: 'Competitive Advantage', image_url: null },
  { section: 'our_edge', content_key: 'hero_title_line1', content_value: 'The Unfair Advantage in', image_url: null },
  { section: 'our_edge', content_key: 'hero_title_line2', content_value: 'Intelligent Product', image_url: null },
  { section: 'our_edge', content_key: 'hero_title_line3', content_value: 'Realization', image_url: null },
  { section: 'our_edge', content_key: 'hero_subtitle', content_value: 'Trinova AI is built on a foundation of full-stack technical mastery, unwavering quality standards, and a customer-first methodology, giving your products a decisive edge in the market.', image_url: null },
  { section: 'our_edge', content_key: 'hero_background_image', content_value: '', image_url: 'https://readdy.ai/api/search-image?query=Abstract%20conceptual%20visualization%20of%20competitive%20advantage%20and%20technological%20edge%2C%20sharp%20glowing%20blue%20line%20cutting%20through%20complex%20digital%20terrain%20with%20geometric%20patterns%2C%20dark%20cyberpunk%20aesthetic%20with%20electric%20cyan%20light%20traces%2C%20futuristic%203D%20render%20showing%20convergence%20of%20multiple%20technical%20disciplines%2C%20dramatic%20lighting%20with%20sharp%20angular%20elements%2C%20photorealistic%20composition%20representing%20innovation%20and%20market%20leadership&width=1920&height=1080&seq=edge-competitive-advantage&orientation=landscape' },

  // === TAB 2: CORE STRENGTHS ===
  // Section Header
  { section: 'our_edge', content_key: 'edge_badge', content_value: 'Core Strengths', image_url: null },
  { section: 'our_edge', content_key: 'edge_title_line1', content_value: 'Our Unwavering', image_url: null },
  { section: 'our_edge', content_key: 'edge_title_line2', content_value: 'Edge', image_url: null },
  { section: 'our_edge', content_key: 'edge_description', content_value: 'Four core differentiators that set us apart in the intelligent electronics industry', image_url: null },

  // Core Strengths Cards
  { 
    section: 'our_edge', 
    content_key: 'strength_cards', 
    content_value: JSON.stringify([
      {
        id: 1,
        icon: 'ri-lightbulb-flash-line',
        title: 'Full-Stack Innovation',
        description: 'Our team thrives on pushing the boundaries of technology, ensuring every solution is innovative, reliable, and future-ready, from silicon to cloud.'
      },
      {
        id: 2,
        icon: 'ri-user-heart-line',
        title: 'Customer-Centric Partnership',
        description: 'We believe in delivering tailored solutions that align perfectly with our clients\' strategic goals, ensuring maximum satisfaction and long-term success.'
      },
      {
        id: 3,
        icon: 'ri-stack-line',
        title: 'Comprehensive Expertise (Hardware + AI)',
        description: 'With capabilities across hardware design, embedded firmware, AI integration, and precision manufacturing, we are the single source for all your technology needs.'
      },
      {
        id: 4,
        icon: 'ri-global-line',
        title: 'Global Quality Standards',
        description: 'Our rigorous commitment to quality and precision ensures that your products and solutions meet the highest global regulatory and performance benchmarks.'
      }
    ]), 
    image_url: null 
  },

  // === TAB 3: OUR PROCESS ===
  // Section Header
  { section: 'our_edge', content_key: 'process_badge', content_value: 'Our Process', image_url: null },
  { section: 'our_edge', content_key: 'process_title_line1', content_value: 'Accelerating Innovation:', image_url: null },
  { section: 'our_edge', content_key: 'process_title_line2', content_value: 'Our 5-Step Process', image_url: null },
  { section: 'our_edge', content_key: 'process_description', content_value: 'A proven methodology that transforms ideas into market-ready intelligent products', image_url: null },

  // Process Cards
  { 
    section: 'our_edge', 
    content_key: 'process_cards', 
    content_value: JSON.stringify([
      {
        id: 1,
        order: 1,
        icon: 'ri-lightbulb-line',
        title: 'Ideation',
        description: 'Collaborating closely to understand your vision, goals, and technical requirements.'
      },
      {
        id: 2,
        order: 2,
        icon: 'ri-draft-line',
        title: 'Design',
        description: 'Crafting innovative, robust hardware, firmware, and software architectures to bring your ideas to life.'
      },
      {
        id: 3,
        order: 3,
        icon: 'ri-code-line',
        title: 'Development',
        description: 'Building robust and scalable products through meticulous engineering and integration.'
      },
      {
        id: 4,
        order: 4,
        icon: 'ri-test-tube-line',
        title: 'Testing & Validation',
        description: 'Ensuring functionality, reliability, regulatory compliance, and performance through rigorous testing.'
      },
      {
        id: 5,
        order: 5,
        icon: 'ri-rocket-line',
        title: 'Deployment & Support',
        description: 'Delivering a market-ready product with comprehensive launch and ongoing technical support.'
      }
    ]), 
    image_url: null 
  },

  // === TAB 4: CTA SECTION ===
  { section: 'our_edge', content_key: 'cta_badge', content_value: 'Ready to Experience The Trinova AI Edge?', image_url: null },
  { section: 'our_edge', content_key: 'cta_title_line1', content_value: 'Ready to Experience', image_url: null },
  { section: 'our_edge', content_key: 'cta_title_line2', content_value: 'The Trinova AI Edge?', image_url: null },
  { section: 'our_edge', content_key: 'cta_description', content_value: 'Partner with us to leverage our unfair advantage and transform your innovative ideas into market-leading intelligent products.', image_url: null }
];

async function seedOurEdgeContent() {
  try {
    console.log('Starting Our Edge content seeding...');

    // Delete existing Our Edge content
    const { error: deleteError } = await supabase
      .from('website_content')
      .delete()
      .eq('section', 'our_edge');

    if (deleteError) {
      console.error('Error deleting existing content:', deleteError);
      throw deleteError;
    }

    console.log('Deleted existing Our Edge content');

    // Insert new content
    const { data, error: insertError } = await supabase
      .from('website_content')
      .insert(ourEdgeContent);

    if (insertError) {
      console.error('Error inserting content:', insertError);
      throw insertError;
    }

    console.log('✅ Successfully seeded Our Edge content!');
    console.log(`   - Inserted ${ourEdgeContent.length} content items`);
    console.log('   - Hero section content');
    console.log('   - Core Strengths section with 4 cards');
    console.log('   - Process section with 5 steps');

  } catch (error) {
    console.error('Failed to seed Our Edge content:', error);
    process.exit(1);
  }
}

seedOurEdgeContent();
