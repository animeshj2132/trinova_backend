import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const emsContent = [
  // === TAB 1: HERO SECTION ===
  { section: 'ems', content_key: 'hero_background_image', content_value: '', image_url: null },
  { section: 'ems', content_key: 'hero_badge', content_value: 'Electronic Manufacturing Services', image_url: null },
  { section: 'ems', content_key: 'hero_title_line1', content_value: 'Precision Manufacturing for', image_url: null },
  { section: 'ems', content_key: 'hero_title_line2', content_value: 'the AI Era', image_url: null },
  { section: 'ems', content_key: 'hero_subtitle', content_value: 'Trinova AI provides end-to-end Electronic Manufacturing Services, ensuring your intelligent products are built to perfection with unparalleled quality and precision.', image_url: null },

  // === TAB 2: PRODUCTION PIPELINE ===
  // Section Header
  { section: 'ems', content_key: 'pipeline_badge', content_value: 'Production Pipeline', image_url: null },
  { section: 'ems', content_key: 'pipeline_title_line1', content_value: 'Our Integrated', image_url: null },
  { section: 'ems', content_key: 'pipeline_title_line2', content_value: 'PCB Production Pipeline', image_url: null },
  { section: 'ems', content_key: 'pipeline_description', content_value: 'From concept to completion, our comprehensive manufacturing process ensures precision at every step', image_url: null },

  // Step 1: PCB Design & Layout
  { section: 'ems', content_key: 'step_1_image', content_value: '', image_url: null },
  { section: 'ems', content_key: 'step_1_badge', content_value: 'Step 1', image_url: null },
  { section: 'ems', content_key: 'step_1_badge_icon', content_value: 'ri-compasses-2-line', image_url: null },
  { section: 'ems', content_key: 'step_1_title_line1', content_value: 'PCB Design &', image_url: null },
  { section: 'ems', content_key: 'step_1_title_line2', content_value: 'Layout', image_url: null },
  { section: 'ems', content_key: 'step_1_focus', content_value: 'Optimized, high-performance layouts focusing on manufacturability (DFM) and functionality.', image_url: null },
  { section: 'ems', content_key: 'step_1_service_1', content_value: 'Custom Layouts tailored to product specifications', image_url: null },
  { section: 'ems', content_key: 'step_1_service_1_icon', content_value: 'ri-settings-line', image_url: null },
  { section: 'ems', content_key: 'step_1_service_2', content_value: 'Complex Designs: High-density interconnects (HDI) and multi-layer designs', image_url: null },
  { section: 'ems', content_key: 'step_1_service_2_icon', content_value: 'ri-stack-line', image_url: null },

  // Step 2: PCB Fabrication
  { section: 'ems', content_key: 'step_2_image', content_value: '', image_url: null },
  { section: 'ems', content_key: 'step_2_badge', content_value: 'Step 2', image_url: null },
  { section: 'ems', content_key: 'step_2_badge_icon', content_value: 'ri-hammer-line', image_url: null },
  { section: 'ems', content_key: 'step_2_title_line1', content_value: 'PCB', image_url: null },
  { section: 'ems', content_key: 'step_2_title_line2', content_value: 'Fabrication', image_url: null },
  { section: 'ems', content_key: 'step_2_focus', content_value: 'Complete fabrication services from single-sided to complex multi-layer boards, ensuring high durability and precise electrical performance.', image_url: null },
  { section: 'ems', content_key: 'step_2_service_1', content_value: 'Single-Sided & Double-Sided PCBs', image_url: null },
  { section: 'ems', content_key: 'step_2_service_1_icon', content_value: 'ri-circuit-line', image_url: null },
  { section: 'ems', content_key: 'step_2_service_2', content_value: 'Multi-Layer PCBs for complex electronics', image_url: null },
  { section: 'ems', content_key: 'step_2_service_2_icon', content_value: 'ri-stack-line', image_url: null },
  { section: 'ems', content_key: 'step_2_service_3', content_value: 'Rigid & Flexible PCBs for versatile product designs', image_url: null },
  { section: 'ems', content_key: 'step_2_service_3_icon', content_value: 'ri-flex-line', image_url: null },

  // Step 3: PCB Stencil
  { section: 'ems', content_key: 'step_3_image', content_value: '', image_url: null },
  { section: 'ems', content_key: 'step_3_badge', content_value: 'Step 3', image_url: null },
  { section: 'ems', content_key: 'step_3_badge_icon', content_value: 'ri-artboard-line', image_url: null },
  { section: 'ems', content_key: 'step_3_title_line1', content_value: 'PCB', image_url: null },
  { section: 'ems', content_key: 'step_3_title_line2', content_value: 'Stencil', image_url: null },
  { section: 'ems', content_key: 'step_3_focus', content_value: 'Custom, precision-cut PCB stencils for accurate solder paste application during assembly.', image_url: null },
  { section: 'ems', content_key: 'step_3_service_1', content_value: 'Laser-Cut Stencils for precise paste deposition', image_url: null },
  { section: 'ems', content_key: 'step_3_service_1_icon', content_value: 'ri-focus-3-line', image_url: null },
  { section: 'ems', content_key: 'step_3_service_2', content_value: 'Reusable Stencils to reduce costs', image_url: null },
  { section: 'ems', content_key: 'step_3_service_2_icon', content_value: 'ri-recycle-line', image_url: null },
  { section: 'ems', content_key: 'step_3_service_3', content_value: 'Fine Pitch Stencils for high-density boards with small components', image_url: null },
  { section: 'ems', content_key: 'step_3_service_3_icon', content_value: 'ri-grid-line', image_url: null },

  // Step 4: PCB Assembly
  { section: 'ems', content_key: 'step_4_image', content_value: '', image_url: null },
  { section: 'ems', content_key: 'step_4_badge', content_value: 'Step 4', image_url: null },
  { section: 'ems', content_key: 'step_4_badge_icon', content_value: 'ri-tools-line', image_url: null },
  { section: 'ems', content_key: 'step_4_title_line1', content_value: 'PCB', image_url: null },
  { section: 'ems', content_key: 'step_4_title_line2', content_value: 'Assembly', image_url: null },
  { section: 'ems', content_key: 'step_4_focus', content_value: 'Covers low-volume and high-volume production runs. Handling Surface Mount Technology (SMT), Through-Hole Technology (THT), and Mixed Technology Assembly.', image_url: null },
  { section: 'ems', content_key: 'step_4_service_1', content_value: 'SMT & THT Assembly for small and large components', image_url: null },
  { section: 'ems', content_key: 'step_4_service_1_icon', content_value: 'ri-cpu-line', image_url: null },
  { section: 'ems', content_key: 'step_4_service_2', content_value: 'Automated and Manual Assembly to ensure precision', image_url: null },
  { section: 'ems', content_key: 'step_4_service_2_icon', content_value: 'ri-robot-line', image_url: null },
  { section: 'ems', content_key: 'step_4_service_3', content_value: 'Testing & Quality Assurance throughout the assembly process', image_url: null },
  { section: 'ems', content_key: 'step_4_service_3_icon', content_value: 'ri-shield-check-line', image_url: null },

  // Step 5: Board Bring-Up & Hardware Testing
  { section: 'ems', content_key: 'step_5_image', content_value: '', image_url: null },
  { section: 'ems', content_key: 'step_5_badge', content_value: 'Step 5', image_url: null },
  { section: 'ems', content_key: 'step_5_badge_icon', content_value: 'ri-test-tube-line', image_url: null },
  { section: 'ems', content_key: 'step_5_title_line1', content_value: 'Board Bring-Up &', image_url: null },
  { section: 'ems', content_key: 'step_5_title_line2', content_value: 'Hardware Testing', image_url: null },
  { section: 'ems', content_key: 'step_5_focus', content_value: 'We provide comprehensive Board Bring-Up and Hardware Testing services to ensure your electronic designs move seamlessly from prototype to production. Our experienced engineering team thoroughly validates every aspect of your PCB, guaranteeing optimal performance, high reliability, and full compliance with your product requirements.', image_url: null },
  { section: 'ems', content_key: 'step_5_service_1', content_value: 'Initial Power-On and Basic Functionality Testing', image_url: null },
  { section: 'ems', content_key: 'step_5_service_1_icon', content_value: 'ri-flashlight-line', image_url: null },
  { section: 'ems', content_key: 'step_5_service_2', content_value: 'Signal Integrity and Power Integrity Analysis', image_url: null },
  { section: 'ems', content_key: 'step_5_service_2_icon', content_value: 'ri-radar-line', image_url: null },
  { section: 'ems', content_key: 'step_5_service_3', content_value: 'Firmware Integration and System Validation', image_url: null },
  { section: 'ems', content_key: 'step_5_service_3_icon', content_value: 'ri-settings-3-line', image_url: null },
  { section: 'ems', content_key: 'step_5_service_4', content_value: 'Comprehensive Test Reports and Documentation', image_url: null },
  { section: 'ems', content_key: 'step_5_service_4_icon', content_value: 'ri-file-list-3-line', image_url: null },

  // === TAB 3: FOUNDATION ===
  // Section Header
  { section: 'ems', content_key: 'commitment_badge', content_value: 'Foundation', image_url: null },
  { section: 'ems', content_key: 'commitment_title_line1', content_value: 'Our Commitment &', image_url: null },
  { section: 'ems', content_key: 'commitment_title_line2', content_value: 'Foundation', image_url: null },

  // Our Mission
  { section: 'ems', content_key: 'commitment_mission_title', content_value: 'Our Mission', image_url: null },
  { section: 'ems', content_key: 'commitment_mission_text', content_value: 'To offer industry-leading PCB design, fabrication, and assembly services, ensuring the highest standards of performance and quality in every intelligent product.', image_url: null },

  // Core Values Header
  { section: 'ems', content_key: 'commitment_values_title', content_value: 'Core Values', image_url: null },
  { section: 'ems', content_key: 'commitment_values_description', content_value: 'The principles that guide our commitment to excellence in every project', image_url: null },

  // Core Value Cards
  { section: 'ems', content_key: 'value_1_title', content_value: 'Precision', image_url: null },
  { section: 'ems', content_key: 'value_1_text', content_value: 'Focused on delivering flawless designs and manufacturing.', image_url: null },
  { section: 'ems', content_key: 'value_1_icon', content_value: 'ri-focus-3-line', image_url: null },

  { section: 'ems', content_key: 'value_2_title', content_value: 'Quality', image_url: null },
  { section: 'ems', content_key: 'value_2_text', content_value: 'Committed to top-tier product standards through rigorous testing and inspection.', image_url: null },
  { section: 'ems', content_key: 'value_2_icon', content_value: 'ri-award-line', image_url: null },

  { section: 'ems', content_key: 'value_3_title', content_value: 'Reliability', image_url: null },
  { section: 'ems', content_key: 'value_3_text', content_value: 'Ensuring timely delivery and consistent product performance.', image_url: null },
  { section: 'ems', content_key: 'value_3_icon', content_value: 'ri-shield-check-line', image_url: null },

  { section: 'ems', content_key: 'value_4_title', content_value: 'Customer-Centric', image_url: null },
  { section: 'ems', content_key: 'value_4_text', content_value: 'Offering tailored solutions for every unique project.', image_url: null },
  { section: 'ems', content_key: 'value_4_icon', content_value: 'ri-customer-service-line', image_url: null },

  // === TAB 4: QUALITY ASSURANCE ===
  // Section Header
  { section: 'ems', content_key: 'quality_badge', content_value: 'Quality Assurance', image_url: null },
  { section: 'ems', content_key: 'quality_title_line1', content_value: 'Rigorous Quality Control', image_url: null },
  { section: 'ems', content_key: 'quality_title_line2', content_value: 'Processes', image_url: null },
  { section: 'ems', content_key: 'quality_description', content_value: 'We are dedicated to ensuring that every PCB we manufacture meets the highest standards of quality. From design and fabrication to assembly and inspection, we maintain rigorous quality control measures to guarantee your products perform flawlessly.', image_url: null },

  // Quality Process Cards
  { section: 'ems', content_key: 'quality_process_1_title', content_value: 'Material Inspection', image_url: null },
  { section: 'ems', content_key: 'quality_process_1_text', content_value: 'Ensuring all raw materials meet required standards.', image_url: null },
  { section: 'ems', content_key: 'quality_process_1_icon', content_value: 'ri-search-line', image_url: null },

  { section: 'ems', content_key: 'quality_process_2_title', content_value: 'Functional Testing', image_url: null },
  { section: 'ems', content_key: 'quality_process_2_text', content_value: 'Verifying the functionality of every board during and after assembly.', image_url: null },
  { section: 'ems', content_key: 'quality_process_2_icon', content_value: 'ri-test-tube-line', image_url: null },

  { section: 'ems', content_key: 'quality_process_3_title', content_value: 'Automated Optical Inspection (AOI)', image_url: null },
  { section: 'ems', content_key: 'quality_process_3_text', content_value: 'Detecting any defects in PCB assembly to ensure quality.', image_url: null },
  { section: 'ems', content_key: 'quality_process_3_icon', content_value: 'ri-eye-line', image_url: null },

  { section: 'ems', content_key: 'quality_process_4_title', content_value: 'Final Inspection', image_url: null },
  { section: 'ems', content_key: 'quality_process_4_text', content_value: 'Detecting any defects in PCB assembly to ensure final quality.', image_url: null },
  { section: 'ems', content_key: 'quality_process_4_icon', content_value: 'ri-checkbox-circle-line', image_url: null },

  // === TAB 5: CTA (READY TO MANUFACTURE) ===
  { section: 'ems', content_key: 'cta_badge', content_value: 'Ready to Manufacture?', image_url: null },
  { section: 'ems', content_key: 'cta_title_line1', content_value: "Let's Build Your", image_url: null },
  { section: 'ems', content_key: 'cta_title_line2', content_value: 'Next Innovation', image_url: null },
  { section: 'ems', content_key: 'cta_description', content_value: 'Partner with Trinova AI for precision electronic manufacturing that brings your intelligent products to market', image_url: null },
];

async function seedEMSContent() {
  console.log('🌱 Seeding EMS page content...\n');

  try {
    let insertedCount = 0;
    let skippedCount = 0;

    for (const item of emsContent) {
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

    console.log(`\n✅ EMS content seeded successfully!`);
    console.log(`   Inserted: ${insertedCount} items`);
    console.log(`   Skipped: ${skippedCount} items (already exist)`);
    console.log(`\n📝 Note: Upload images for pipeline steps and hero section from admin panel`);

  } catch (error) {
    console.error('❌ Error seeding EMS content:', error.message);
    process.exit(1);
  }
}

seedEMSContent();





