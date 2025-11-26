import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const aiContent = [
  // === TAB 1: HERO SECTION ===
  { section: 'ai', content_key: 'hero_background_image', content_value: '', image_url: null },
  { section: 'ai', content_key: 'hero_badge', content_value: 'AI-Powered Innovation', image_url: null },
  { section: 'ai', content_key: 'hero_title_line1', content_value: 'Intelligent Systems:', image_url: null },
  { section: 'ai', content_key: 'hero_title_line2', content_value: 'The AI Core of', image_url: null },
  { section: 'ai', content_key: 'hero_title_line3', content_value: 'Future Electronics', image_url: null },
  { section: 'ai', content_key: 'hero_subtitle', content_value: 'Trinova AI leverages advanced AI, Machine Learning, and Computer Vision to revolutionize Robotics, Medical Electronics, and Home Automation—enhancing efficiency and user experience across critical industries.', image_url: null },
  
  // Hero Stats
  { section: 'ai', content_key: 'hero_stat_1_value', content_value: '50+', image_url: null },
  { section: 'ai', content_key: 'hero_stat_1_label', content_value: 'AI Models Deployed', image_url: null },
  { section: 'ai', content_key: 'hero_stat_2_value', content_value: '99.8%', image_url: null },
  { section: 'ai', content_key: 'hero_stat_2_label', content_value: 'AI Accuracy Rate', image_url: null },
  { section: 'ai', content_key: 'hero_stat_3_value', content_value: '3', image_url: null },
  { section: 'ai', content_key: 'hero_stat_3_label', content_value: 'Key Industries', image_url: null },

  // === TAB 2: AI APPLICATIONS ===
  // Section Header
  { section: 'ai', content_key: 'applications_badge', content_value: 'AI Applications', image_url: null },
  { section: 'ai', content_key: 'applications_title_line1', content_value: 'Revolutionizing Key Industries', image_url: null },
  { section: 'ai', content_key: 'applications_title_line2', content_value: 'with AI', image_url: null },
  { section: 'ai', content_key: 'applications_description', content_value: 'Transforming critical sectors through intelligent automation and advanced AI integration', image_url: null },

  // Application 1: AI in Home Automation
  { section: 'ai', content_key: 'app_1_image', content_value: '', image_url: null },
  { section: 'ai', content_key: 'app_1_badge', content_value: 'Smart Living', image_url: null },
  { section: 'ai', content_key: 'app_1_title_line1', content_value: 'AI in Home Automation:', image_url: null },
  { section: 'ai', content_key: 'app_1_title_line2', content_value: 'Smarter Homes, Seamless Living', image_url: null },
  { section: 'ai', content_key: 'app_1_description', content_value: 'Transform your living space into an intelligent ecosystem that anticipates your needs and responds intuitively to your lifestyle.', image_url: null },
  { section: 'ai', content_key: 'app_1_feature_1', content_value: 'Voice & Gesture Control - Natural interaction with smart devices', image_url: null },
  { section: 'ai', content_key: 'app_1_feature_1_icon', content_value: 'ri-voice-recognition-line', image_url: null },
  { section: 'ai', content_key: 'app_1_feature_2', content_value: 'Smart Climate Control - Adaptive temperature management', image_url: null },
  { section: 'ai', content_key: 'app_1_feature_2_icon', content_value: 'ri-home-line', image_url: null },
  { section: 'ai', content_key: 'app_1_feature_3', content_value: 'Advanced Security - AI-powered threat detection', image_url: null },
  { section: 'ai', content_key: 'app_1_feature_3_icon', content_value: 'ri-shield-check-line', image_url: null },
  { section: 'ai', content_key: 'app_1_feature_4', content_value: 'Intelligent Lighting - Adaptive lighting optimization', image_url: null },
  { section: 'ai', content_key: 'app_1_feature_4_icon', content_value: 'ri-lightbulb-line', image_url: null },

  // Application 2: AI in Medical Electronics
  { section: 'ai', content_key: 'app_2_image', content_value: '', image_url: null },
  { section: 'ai', content_key: 'app_2_badge', content_value: 'Healthcare Innovation', image_url: null },
  { section: 'ai', content_key: 'app_2_title_line1', content_value: 'AI in Medical Electronics:', image_url: null },
  { section: 'ai', content_key: 'app_2_title_line2', content_value: 'Precision Healthcare through AI', image_url: null },
  { section: 'ai', content_key: 'app_2_description', content_value: 'Enhancing diagnostic accuracy and patient care through AI-powered medical devices that deliver real-time insights and predictive analytics.', image_url: null },
  { section: 'ai', content_key: 'app_2_feature_1', content_value: 'AI-Powered Diagnostics - Early disease detection with high accuracy', image_url: null },
  { section: 'ai', content_key: 'app_2_feature_1_icon', content_value: 'ri-heart-pulse-line', image_url: null },
  { section: 'ai', content_key: 'app_2_feature_2', content_value: 'Remote Patient Monitoring - Continuous health tracking and alerts', image_url: null },
  { section: 'ai', content_key: 'app_2_feature_2_icon', content_value: 'ri-user-line', image_url: null },
  { section: 'ai', content_key: 'app_2_feature_3', content_value: 'Predictive Analytics - Anticipating health trends and risks', image_url: null },
  { section: 'ai', content_key: 'app_2_feature_3_icon', content_value: 'ri-brain-line', image_url: null },
  { section: 'ai', content_key: 'app_2_feature_4', content_value: 'Personalized Treatment - AI-driven therapy recommendations', image_url: null },
  { section: 'ai', content_key: 'app_2_feature_4_icon', content_value: 'ri-smartphone-line', image_url: null },

  // Application 3: AI in Robotics & Automation
  { section: 'ai', content_key: 'app_3_image', content_value: '', image_url: null },
  { section: 'ai', content_key: 'app_3_badge', content_value: 'Smart Automation', image_url: null },
  { section: 'ai', content_key: 'app_3_title_line1', content_value: 'AI in Robotics & Automation:', image_url: null },
  { section: 'ai', content_key: 'app_3_title_line2', content_value: 'Optimizing Operations with Intelligent Robotics', image_url: null },
  { section: 'ai', content_key: 'app_3_description', content_value: 'Revolutionizing industrial operations through intelligent robotics that enhance precision, flexibility, and efficiency across automation scenarios.', image_url: null },
  { section: 'ai', content_key: 'app_3_feature_1', content_value: 'Collaborative Robots (Cobots) - Safe human-robot collaboration in manufacturing', image_url: null },
  { section: 'ai', content_key: 'app_3_feature_1_icon', content_value: 'ri-cpu-line', image_url: null },
  { section: 'ai', content_key: 'app_3_feature_2', content_value: 'Industrial Robots - High-precision automated manufacturing systems', image_url: null },
  { section: 'ai', content_key: 'app_3_feature_2_icon', content_value: 'ri-settings-3-line', image_url: null },
  { section: 'ai', content_key: 'app_3_feature_3', content_value: 'Quality Control - AI-powered inspection and defect detection', image_url: null },
  { section: 'ai', content_key: 'app_3_feature_3_icon', content_value: 'ri-eye-line', image_url: null },
  { section: 'ai', content_key: 'app_3_feature_4', content_value: 'Predictive Maintenance - AI-driven equipment health monitoring', image_url: null },
  { section: 'ai', content_key: 'app_3_feature_4_icon', content_value: 'ri-database-line', image_url: null },
  { section: 'ai', content_key: 'app_3_feature_5', content_value: 'Autonomous Mobile Robots (AMRs) - Intelligent navigation and material handling', image_url: null },
  { section: 'ai', content_key: 'app_3_feature_5_icon', content_value: 'ri-speed-line', image_url: null },

  // === TAB 3: OUR ADVANTAGES ===
  // Section Header
  { section: 'ai', content_key: 'advantage_badge', content_value: 'Our Advantage', image_url: null },
  { section: 'ai', content_key: 'advantage_title_line1', content_value: 'The Trinova AI', image_url: null },
  { section: 'ai', content_key: 'advantage_title_line2', content_value: 'Advantage', image_url: null },
  { section: 'ai', content_key: 'advantage_description', content_value: 'Why industry leaders choose Trinova AI for their intelligent electronics solutions', image_url: null },

  // Advantage Cards
  { section: 'ai', content_key: 'advantage_1_title', content_value: 'Innovative AI Integration', image_url: null },
  { section: 'ai', content_key: 'advantage_1_description', content_value: 'Focus on cutting-edge solutions for functionality and efficiency', image_url: null },
  { section: 'ai', content_key: 'advantage_1_icon', content_value: 'ri-lightbulb-line', image_url: null },

  { section: 'ai', content_key: 'advantage_2_title', content_value: 'Customer-Centric Approach', image_url: null },
  { section: 'ai', content_key: 'advantage_2_description', content_value: 'Focus on custom-built systems meeting unique industry needs', image_url: null },
  { section: 'ai', content_key: 'advantage_2_icon', content_value: 'ri-heart-line', image_url: null },

  { section: 'ai', content_key: 'advantage_3_title', content_value: 'Scalable & Reliable', image_url: null },
  { section: 'ai', content_key: 'advantage_3_description', content_value: 'Focus on AI-powered products designed for long-term scalability and reliability', image_url: null },
  { section: 'ai', content_key: 'advantage_3_icon', content_value: 'ri-award-line', image_url: null },

  { section: 'ai', content_key: 'advantage_4_title', content_value: 'End-to-End Support', image_url: null },
  { section: 'ai', content_key: 'advantage_4_description', content_value: 'Focus on comprehensive services from AI development through manufacturing, integration, and post-launch support', image_url: null },
  { section: 'ai', content_key: 'advantage_4_icon', content_value: 'ri-shield-check-line', image_url: null },

  // === TAB 4: CTA SECTION ===
  { section: 'ai', content_key: 'cta_badge', content_value: 'Ready to Transform Your Industry with AI?', image_url: null },
  { section: 'ai', content_key: 'cta_title_line1', content_value: 'Ready to Transform Your', image_url: null },
  { section: 'ai', content_key: 'cta_title_line2', content_value: 'Industry with AI?', image_url: null },
  { section: 'ai', content_key: 'cta_description', content_value: 'Partner with Trinova AI to develop intelligent electronics that revolutionize your business and enhance user experiences.', image_url: null },
];

async function seedAIContent() {
  console.log('🌱 Seeding AI page content...\n');

  try {
    let insertedCount = 0;
    let skippedCount = 0;

    for (const item of aiContent) {
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

    console.log(`\n✅ AI content seeded successfully!`);
    console.log(`   Inserted: ${insertedCount} items`);
    console.log(`   Skipped: ${skippedCount} items (already exist)`);
    console.log(`\n📝 Note: Upload images for AI applications and hero section from admin panel`);

  } catch (error) {
    console.error('❌ Error seeding AI content:', error.message);
    process.exit(1);
  }
}

seedAIContent();


