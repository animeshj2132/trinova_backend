import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const expertiseCards = [
  {
    title: 'Research & Development',
    description: 'Cutting-edge R&D solutions driving innovation in AI and electronics',
    icon: 'ri-flask-line',
    category: 'expertise',
    is_active: true,
    order_index: 0
  },
  {
    title: 'Hardware Designing',
    description: 'Advanced hardware design from concept to production-ready solutions',
    icon: 'ri-cpu-line',
    category: 'expertise',
    is_active: true,
    order_index: 1
  },
  {
    title: 'Firmware Development',
    description: 'Robust firmware solutions for embedded systems and IoT devices',
    icon: 'ri-code-line',
    category: 'expertise',
    is_active: true,
    order_index: 2
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications with AI integration',
    icon: 'ri-smartphone-line',
    category: 'expertise',
    is_active: true,
    order_index: 3
  },
  {
    title: 'Electronics Manufacturing',
    description: 'End-to-end electronics manufacturing services (EMS) with quality assurance',
    icon: 'ri-settings-3-line',
    category: 'expertise',
    is_active: true,
    order_index: 4
  },
  {
    title: 'Component Sourcing',
    description: 'Strategic component sourcing and procurement for optimal supply chain',
    icon: 'ri-shopping-cart-line',
    category: 'expertise',
    is_active: true,
    order_index: 5
  },
  {
    title: 'Mechanical Design',
    description: 'Precision mechanical design and engineering for complex systems',
    icon: 'ri-tools-line',
    category: 'expertise',
    is_active: true,
    order_index: 6
  },
  {
    title: 'End-to-End Development',
    description: 'Complete product development lifecycle from ideation to market launch',
    icon: 'ri-rocket-line',
    category: 'expertise',
    is_active: true,
    order_index: 7
  }
];

async function seedExpertiseCards() {
  try {
    console.log('🌱 Seeding expertise cards...');

    // Check if cards already exist
    const { data: existing } = await supabase
      .from('services')
      .select('*')
      .eq('category', 'expertise');

    if (existing && existing.length > 0) {
      console.log('⚠️  Expertise cards already exist. Skipping seed.');
      console.log(`Found ${existing.length} existing cards.`);
      return;
    }

    // Insert all cards
    const { data, error } = await supabase
      .from('services')
      .insert(expertiseCards)
      .select();

    if (error) {
      throw error;
    }

    console.log('✅ Successfully seeded expertise cards:');
    data.forEach((card, index) => {
      console.log(`   ${index + 1}. ${card.title} (${card.icon})`);
    });

    // Also seed the expertise section content
    console.log('\n🌱 Seeding expertise section content...');
    
    const expertiseContent = [
      { content_key: 'expertise_badge', content_value: 'Our Services', image_url: null },
      { content_key: 'expertise_title_line1', content_value: 'Our Core', image_url: null },
      { content_key: 'expertise_title_line2', content_value: 'Expertise', image_url: null },
      { content_key: 'expertise_description', content_value: 'From concept to market, we deliver comprehensive solutions across the entire technology stack', image_url: null }
    ];

    for (const content of expertiseContent) {
      // Check if it already exists
      const { data: existingContent } = await supabase
        .from('website_content')
        .select('*')
        .eq('content_key', content.content_key)
        .single();

      if (existingContent) {
        console.log(`   ⚠️  ${content.content_key} already exists, skipping`);
        continue;
      }

      const { error: contentError } = await supabase
        .from('website_content')
        .insert(content);

      if (contentError) {
        console.error(`Error seeding ${content.content_key}:`, contentError);
      } else {
        console.log(`   ✅ ${content.content_key}`);
      }
    }

    console.log('\n✅ All expertise content seeded successfully!');

  } catch (error) {
    console.error('❌ Error seeding expertise cards:', error.message);
    process.exit(1);
  }
}

seedExpertiseCards();

