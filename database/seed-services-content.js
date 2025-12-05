import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const servicesContent = [
  // Hero Section
  { section: 'services', content_key: 'hero_badge', content_value: 'Our Services', image_url: null },
  { section: 'services', content_key: 'hero_title_line1', content_value: 'Comprehensive Solutions for', image_url: null },
  { section: 'services', content_key: 'hero_title_line2', content_value: 'Intelligent Electronics', image_url: null },
  { section: 'services', content_key: 'hero_subtitle', content_value: 'From deep R&D and hardware engineering to high-volume manufacturing and AI integration, Trinova AI is your full-stack product realization partner.', image_url: null },
  
  // Core Services Section
  { section: 'services', content_key: 'core_badge', content_value: 'Technology Stack', image_url: null },
  { section: 'services', content_key: 'core_title_line1', content_value: 'Our End-to-End', image_url: null },
  { section: 'services', content_key: 'core_title_line2', content_value: 'Technology Stack', image_url: null },
  { section: 'services', content_key: 'core_description', content_value: 'Comprehensive solutions spanning the entire product development lifecycle', image_url: null },

  // Service 1: R&D
  { section: 'services', content_key: 'service_1_badge', content_value: 'R&D Excellence', image_url: null },
  { section: 'services', content_key: 'service_1_title_line1', content_value: 'Research &', image_url: null },
  { section: 'services', content_key: 'service_1_title_line2', content_value: 'Development', image_url: null },
  { section: 'services', content_key: 'service_1_description', content_value: 'Advanced R&D for innovative solutions in hardware and firmware. Expertise in prototyping and testing for market-ready products. Focus on enhancing performance and sustainability.', image_url: null },
  { section: 'services', content_key: 'service_1_feature_1', content_value: 'Innovation Focus', image_url: null },
  { section: 'services', content_key: 'service_1_feature_2', content_value: 'Rapid Prototyping', image_url: null },

  // Service 2: End-to-End
  { section: 'services', content_key: 'service_2_badge', content_value: 'Full Lifecycle', image_url: null },
  { section: 'services', content_key: 'service_2_title_line1', content_value: 'End-to-End Product', image_url: null },
  { section: 'services', content_key: 'service_2_title_line2', content_value: 'Development', image_url: null },
  { section: 'services', content_key: 'service_2_description', content_value: 'Concept-to-market solutions under one roof. Collaboration across design, development, and manufacturing. Rapid prototyping and iterative product improvement.', image_url: null },
  { section: 'services', content_key: 'service_2_feature_1', content_value: 'Cross-functional Teams', image_url: null },
  { section: 'services', content_key: 'service_2_feature_2', content_value: 'Iterative Improvement', image_url: null },

  // Service 3: Hardware Design
  { section: 'services', content_key: 'service_3_badge', content_value: 'Hardware Excellence', image_url: null },
  { section: 'services', content_key: 'service_3_title_line1', content_value: 'Hardware', image_url: null },
  { section: 'services', content_key: 'service_3_title_line2', content_value: 'Designing', image_url: null },
  { section: 'services', content_key: 'service_3_description', content_value: 'Custom hardware solutions from schematic capture to final layout. Expertise in PCB design, multi-layer boards, high-speed circuits, power electronics, RF design, and embedded systems.', image_url: null },
  { section: 'services', content_key: 'service_3_feature_1', content_value: 'PCB Design', image_url: null },
  { section: 'services', content_key: 'service_3_feature_2', content_value: 'Circuit Optimization', image_url: null },

  // Service 4: Firmware
  { section: 'services', content_key: 'service_4_badge', content_value: 'Embedded Systems', image_url: null },
  { section: 'services', content_key: 'service_4_title_line1', content_value: 'Firmware', image_url: null },
  { section: 'services', content_key: 'service_4_title_line2', content_value: 'Development', image_url: null },
  { section: 'services', content_key: 'service_4_description', content_value: 'Development of robust and optimized firmware for embedded systems. Seamless integration of hardware and software for superior performance. Expertise in BLE, AI integration, and power management solutions.', image_url: null },
  { section: 'services', content_key: 'service_4_feature_1', content_value: 'BLE Integration', image_url: null },
  { section: 'services', content_key: 'service_4_feature_2', content_value: 'Power Management', image_url: null },

  // Industries Section
  { section: 'services', content_key: 'industries_badge', content_value: 'Sectors We Serve', image_url: null },
  { section: 'services', content_key: 'industries_title_line1', content_value: 'Industries We', image_url: null },
  { section: 'services', content_key: 'industries_title_line2', content_value: 'Transform', image_url: null },
  { section: 'services', content_key: 'industries_description', content_value: 'Delivering cutting-edge solutions across diverse sectors with specialized expertise', image_url: null },

  // Industry 1: Consumer Electronics
  { section: 'services', content_key: 'industry_1_title', content_value: 'Consumer Electronics', image_url: null },
  { section: 'services', content_key: 'industry_1_description', content_value: 'Smart home devices, wearables, and personal gadgets.', image_url: null },

  // Industry 2: Industrial Automation
  { section: 'services', content_key: 'industry_2_title', content_value: 'Industrial Automation', image_url: null },
  { section: 'services', content_key: 'industry_2_description', content_value: 'Intelligent control systems and predictive maintenance solutions.', image_url: null },

  // Industry 3: Medical Devices
  { section: 'services', content_key: 'industry_3_title', content_value: 'Medical Devices', image_url: null },
  { section: 'services', content_key: 'industry_3_description', content_value: 'Advanced monitoring systems and diagnostic tools.', image_url: null },

  // Industry 4: IoT Solutions
  { section: 'services', content_key: 'industry_4_title', content_value: 'IoT Solutions', image_url: null },
  { section: 'services', content_key: 'industry_4_description', content_value: 'End-to-end IoT ecosystems for connected environments.', image_url: null },
];

async function seedServicesContent() {
  console.log('🌱 Seeding services page content...\n');

  try {
    for (const item of servicesContent) {
      // Check if exists
      const { data: existing } = await supabase
        .from('website_content')
        .select('*')
        .eq('section', item.section)
        .eq('content_key', item.content_key)
        .single();

      if (existing) {
        console.log(`⚠️  ${item.content_key} already exists, skipping`);
        continue;
      }

      // Insert new content
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
      }
    }

    console.log('\n✅ Services content seeded successfully!');

  } catch (error) {
    console.error('❌ Error seeding services content:', error.message);
    process.exit(1);
  }
}

seedServicesContent();





