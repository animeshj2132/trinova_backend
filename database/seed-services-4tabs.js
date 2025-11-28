import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const servicesContent = [
  // === TAB 1: HERO SECTION ===
  { section: 'services', content_key: 'hero_background_image', content_value: '', image_url: null },
  { section: 'services', content_key: 'hero_badge', content_value: 'Our Services', image_url: null },
  { section: 'services', content_key: 'hero_title_line1', content_value: 'Comprehensive Solutions for', image_url: null },
  { section: 'services', content_key: 'hero_title_line2', content_value: 'Intelligent Electronics', image_url: null },
  { section: 'services', content_key: 'hero_subtitle', content_value: 'From deep R&D and hardware engineering to high-volume manufacturing and AI integration, Trinova AI is your full-stack product realization partner.', image_url: null },

  // === TAB 2: TECHNOLOGY STACK ===
  // Section Header
  { section: 'services', content_key: 'tech_stack_badge', content_value: 'Technology Stack', image_url: null },
  { section: 'services', content_key: 'tech_stack_title_line1', content_value: 'Our End-to-End', image_url: null },
  { section: 'services', content_key: 'tech_stack_title_line2', content_value: 'Technology Stack', image_url: null },
  { section: 'services', content_key: 'tech_stack_description', content_value: 'Comprehensive solutions spanning the entire product development lifecycle', image_url: null },
  { section: 'services', content_key: 'tech_stack_header_image', content_value: '', image_url: null },

  // Service Card 1: R&D
  { section: 'services', content_key: 'service_1_image', content_value: '', image_url: 'https://nzbtynkapsyyromkhhkv.supabase.co/storage/v1/object/public/media/public/media/services/services-rd-innovation.webp' },
  { section: 'services', content_key: 'service_1_badge', content_value: 'R&D Excellence', image_url: null },
  { section: 'services', content_key: 'service_1_badge_icon', content_value: 'ri-flask-line', image_url: null },
  { section: 'services', content_key: 'service_1_title_line1', content_value: 'Research &', image_url: null },
  { section: 'services', content_key: 'service_1_title_line2', content_value: 'Development', image_url: null },
  { section: 'services', content_key: 'service_1_description', content_value: 'Advanced R&D for innovative solutions in hardware and firmware. Expertise in prototyping and testing for market-ready products. Focus on enhancing performance and sustainability.', image_url: null },
  { section: 'services', content_key: 'service_1_feature_1', content_value: 'Innovation Focus', image_url: null },
  { section: 'services', content_key: 'service_1_feature_1_icon', content_value: 'ri-lightbulb-line', image_url: null },
  { section: 'services', content_key: 'service_1_feature_2', content_value: 'Rapid Prototyping', image_url: null },
  { section: 'services', content_key: 'service_1_feature_2_icon', content_value: 'ri-test-tube-line', image_url: null },

  // Service Card 2: End-to-End
  { section: 'services', content_key: 'service_2_image', content_value: '', image_url: null },
  { section: 'services', content_key: 'service_2_badge', content_value: 'Full Lifecycle', image_url: null },
  { section: 'services', content_key: 'service_2_badge_icon', content_value: 'ri-rocket-line', image_url: null },
  { section: 'services', content_key: 'service_2_title_line1', content_value: 'End-to-End Product', image_url: null },
  { section: 'services', content_key: 'service_2_title_line2', content_value: 'Development', image_url: null },
  { section: 'services', content_key: 'service_2_description', content_value: 'Concept-to-market solutions under one roof. Collaboration across design, development, and manufacturing. Rapid prototyping and iterative product improvement.', image_url: null },
  { section: 'services', content_key: 'service_2_feature_1', content_value: 'Cross-functional Teams', image_url: null },
  { section: 'services', content_key: 'service_2_feature_1_icon', content_value: 'ri-team-line', image_url: null },
  { section: 'services', content_key: 'service_2_feature_2', content_value: 'Iterative Improvement', image_url: null },
  { section: 'services', content_key: 'service_2_feature_2_icon', content_value: 'ri-refresh-line', image_url: null },

  // Service Card 3: Hardware
  { section: 'services', content_key: 'service_3_image', content_value: '', image_url: null },
  { section: 'services', content_key: 'service_3_badge', content_value: 'Hardware Excellence', image_url: null },
  { section: 'services', content_key: 'service_3_badge_icon', content_value: 'ri-cpu-line', image_url: null },
  { section: 'services', content_key: 'service_3_title_line1', content_value: 'Hardware', image_url: null },
  { section: 'services', content_key: 'service_3_title_line2', content_value: 'Designing', image_url: null },
  { section: 'services', content_key: 'service_3_description', content_value: 'Custom hardware solutions from schematic capture to final layout. Expertise in PCB design, multi-layer boards, high-speed circuits, power electronics, RF design, and embedded systems.', image_url: null },
  { section: 'services', content_key: 'service_3_feature_1', content_value: 'PCB Design', image_url: null },
  { section: 'services', content_key: 'service_3_feature_1_icon', content_value: 'ri-circuit-line', image_url: null },
  { section: 'services', content_key: 'service_3_feature_2', content_value: 'Circuit Optimization', image_url: null },
  { section: 'services', content_key: 'service_3_feature_2_icon', content_value: 'ri-speed-line', image_url: null },

  // Service Card 4: Firmware
  { section: 'services', content_key: 'service_4_image', content_value: '', image_url: null },
  { section: 'services', content_key: 'service_4_badge', content_value: 'Embedded Systems', image_url: null },
  { section: 'services', content_key: 'service_4_badge_icon', content_value: 'ri-code-line', image_url: null },
  { section: 'services', content_key: 'service_4_title_line1', content_value: 'Firmware', image_url: null },
  { section: 'services', content_key: 'service_4_title_line2', content_value: 'Development', image_url: null },
  { section: 'services', content_key: 'service_4_description', content_value: 'Development of robust and optimized firmware for embedded systems. Seamless integration of hardware and software for superior performance. Expertise in BLE, AI integration, and power management solutions.', image_url: null },
  { section: 'services', content_key: 'service_4_feature_1', content_value: 'BLE Integration', image_url: null },
  { section: 'services', content_key: 'service_4_feature_1_icon', content_value: 'ri-bluetooth-line', image_url: null },
  { section: 'services', content_key: 'service_4_feature_2', content_value: 'Power Management', image_url: null },
  { section: 'services', content_key: 'service_4_feature_2_icon', content_value: 'ri-battery-charge-line', image_url: null },

  // === TAB 3: READY TO START ===
  { section: 'services', content_key: 'ready_badge', content_value: 'Ready to Start?', image_url: null },
  { section: 'services', content_key: 'ready_title_line1', content_value: "Let's Build Your Next", image_url: null },
  { section: 'services', content_key: 'ready_title_line2', content_value: 'Intelligent Product', image_url: null },
  { section: 'services', content_key: 'ready_description', content_value: 'Partner with Trinova AI for comprehensive technology solutions that bring your vision to life', image_url: null },

  // === TAB 4: INDUSTRIES ===
  // Section Header
  { section: 'services', content_key: 'industries_badge', content_value: 'Industry Focus', image_url: null },
  { section: 'services', content_key: 'industries_title_line1', content_value: 'Industries We', image_url: null },
  { section: 'services', content_key: 'industries_title_line2', content_value: 'Transform', image_url: null },
  { section: 'services', content_key: 'industries_description', content_value: 'Delivering cutting-edge solutions across diverse sectors with specialized expertise', image_url: null },

  // Industry Cards (6 total)
  { section: 'services', content_key: 'industry_1_image', content_value: '', image_url: null },
  { section: 'services', content_key: 'industry_1_title', content_value: 'Consumer Electronics', image_url: null },
  { section: 'services', content_key: 'industry_1_description', content_value: 'Smart home devices, wearables, and personal gadgets.', image_url: null },

  { section: 'services', content_key: 'industry_2_image', content_value: '', image_url: null },
  { section: 'services', content_key: 'industry_2_title', content_value: 'Industrial Automation', image_url: null },
  { section: 'services', content_key: 'industry_2_description', content_value: 'Intelligent control systems and predictive maintenance solutions.', image_url: null },

  { section: 'services', content_key: 'industry_3_image', content_value: '', image_url: null },
  { section: 'services', content_key: 'industry_3_title', content_value: 'Medical Devices', image_url: null },
  { section: 'services', content_key: 'industry_3_description', content_value: 'Advanced monitoring systems and diagnostic tools.', image_url: null },

  { section: 'services', content_key: 'industry_4_image', content_value: '', image_url: null },
  { section: 'services', content_key: 'industry_4_title', content_value: 'IoT Solutions', image_url: null },
  { section: 'services', content_key: 'industry_4_description', content_value: 'End-to-end IoT ecosystems for connected environments.', image_url: null },

  { section: 'services', content_key: 'industry_5_image', content_value: '', image_url: null },
  { section: 'services', content_key: 'industry_5_title', content_value: 'Defense & Aerospace', image_url: null },
  { section: 'services', content_key: 'industry_5_description', content_value: 'High-reliability systems for critical operations.', image_url: null },

  { section: 'services', content_key: 'industry_6_image', content_value: '', image_url: null },
  { section: 'services', content_key: 'industry_6_title', content_value: 'Energy & Utilities', image_url: null },
  { section: 'services', content_key: 'industry_6_description', content_value: 'Smart metering and energy-efficient technologies.', image_url: null },
];

async function seedServicesContent() {
  console.log('🌱 Seeding services page content (4-tab structure)...\n');

  try {
    let insertedCount = 0;
    let skippedCount = 0;

    for (const item of servicesContent) {
      const { data: existing } = await supabase
        .from('website_content')
        .select('*')
        .eq('section', item.section)
        .eq('content_key', item.content_key)
        .single();

      if (existing) {
        console.log(`⚠️  ${item.content_key} already exists, skipping`);
        skippedCount++;
        continue;
      }

      const { error } = await supabase
        .from('website_content')
        .insert({
          ...item,
          is_active: true,
          content_type: 'text'
        });

      if (error) {
        console.error(`❌ Error inserting ${item.content_key}:`, error.message);
      } else {
        console.log(`✅ ${item.content_key}`);
        insertedCount++;
      }
    }

    console.log(`\n✅ Services content seeded successfully!`);
    console.log(`   Inserted: ${insertedCount} items`);
    console.log(`   Skipped: ${skippedCount} items (already exist)`);

  } catch (error) {
    console.error('❌ Error seeding services content:', error.message);
    process.exit(1);
  }
}

seedServicesContent();




