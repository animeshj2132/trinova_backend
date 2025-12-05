import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seedContactContent() {
  console.log('Seeding Contact Page Content...');

  const contactContent = [
    // Hero Section
    { section: 'contact', content_key: 'hero_badge', content_value: 'Get In Touch', content_type: 'text', order_index: 1 },
    { section: 'contact', content_key: 'hero_title_line1', content_value: "Let's Build the", content_type: 'text', order_index: 2 },
    { section: 'contact', content_key: 'hero_title_line2', content_value: 'Future Together', content_type: 'text', order_index: 3 },
    { section: 'contact', content_key: 'hero_subtitle', content_value: 'Ready to transform your ideas into intelligent products? Connect with our team of experts and discover how Trinova AI can accelerate your innovation journey.', content_type: 'text', order_index: 4 },
    { section: 'contact', content_key: 'hero_background_image', content_value: '', content_type: 'image', order_index: 5 },

    // Contact Form
    { section: 'contact', content_key: 'form_title', content_value: 'Start Your Project', content_type: 'text', order_index: 6 },
    { section: 'contact', content_key: 'form_description', content_value: 'Tell us about your project and we\'ll get back to you within 24 hours.', content_type: 'text', order_index: 7 },
    {
      section: 'contact',
      content_key: 'form_fields',
      content_value: JSON.stringify([
        { id: 'field_1', label: 'First Name', name: 'firstName', type: 'text', placeholder: 'Enter your first name', required: true },
        { id: 'field_2', label: 'Last Name', name: 'lastName', type: 'text', placeholder: 'Enter your last name', required: true },
        { id: 'field_3', label: 'Email Address', name: 'email', type: 'email', placeholder: 'Enter your email address', required: true },
        { id: 'field_4', label: 'Phone Number', name: 'phone', type: 'tel', placeholder: 'Enter your phone number', required: false },
        { id: 'field_5', label: 'Company', name: 'company', type: 'text', placeholder: 'Enter your company name', required: false },
        { id: 'field_6', label: 'Service Interest', name: 'service', type: 'select', placeholder: 'Select a service', required: true, options: ['AI Solutions', 'EMS Services', 'Hardware Design', 'Firmware Development', 'Full Product Development', 'Consultation'] },
        { id: 'field_7', label: 'Project Details', name: 'message', type: 'textarea', placeholder: 'Tell us about your project requirements, timeline, and any specific needs...', required: true }
      ]),
      content_type: 'json',
      order_index: 8
    },

    // Innovation Hub
    { section: 'contact', content_key: 'innovation_title_line1', content_value: 'Visit Our', content_type: 'text', order_index: 9 },
    { section: 'contact', content_key: 'innovation_title_line2', content_value: 'Innovation Hub', content_type: 'text', order_index: 10 },
    { section: 'contact', content_key: 'innovation_description', content_value: 'Located in the heart of Bangalore\'s Electronic City, our state-of-the-art facility is equipped with cutting-edge technology and innovation labs.', content_type: 'text', order_index: 11 },
    { section: 'contact', content_key: 'innovation_google_maps_url', content_value: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.2!2d77.6648!3d12.8456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUwJzQ0LjIiTiA3N8KwMzknNTMuMyJF!5e0!3m2!1sen!2sin!4v1234567890', content_type: 'text', order_index: 12 },

    // Contact Information Section
    { section: 'contact', content_key: 'contact_info_title_line1', content_value: 'Connect with', content_type: 'text', order_index: 13 },
    { section: 'contact', content_key: 'contact_info_title_line2', content_value: 'Our Experts', content_type: 'text', order_index: 14 },
    { section: 'contact', content_key: 'contact_info_description', content_value: 'Our team is ready to discuss your project requirements and provide tailored solutions for your intelligent electronics needs.', content_type: 'text', order_index: 15 }
  ];

  for (const item of contactContent) {
    try {
      // Check if exists
      const { data: existing } = await supabase
        .from('website_content')
        .select('id')
        .eq('section', item.section)
        .eq('content_key', item.content_key)
        .single();

      if (existing) {
        // Update existing
        const { error } = await supabase
          .from('website_content')
          .update(item)
          .eq('id', existing.id);

        if (error) throw error;
        console.log(`✓ Updated ${item.content_key}`);
      } else {
        // Insert new
        const { error } = await supabase
          .from('website_content')
          .insert([item]);

        if (error) throw error;
        console.log(`✓ Created ${item.content_key}`);
      }
    } catch (error) {
      console.error(`Error with ${item.content_key}:`, error.message);
    }
  }
}

async function seedSiteConfig() {
  console.log('\nSeeding Site Configuration...');

  const siteConfigItems = [
    // Contact Information
    { config_key: 'phone_number', config_value: '+91 83106 94003', config_type: 'text' },
    { config_key: 'phone_availability', config_value: 'Available Monday - Friday, 9 AM - 6 PM IST', config_type: 'text' },
    { config_key: 'email_address', config_value: 'technical@trinovaaitech.com', config_type: 'text' },
    { config_key: 'email_response_time', config_value: 'We respond within 24 hours', config_type: 'text' },
    { config_key: 'office_address_line1', config_value: 'No-1461, 2nd floor, 14th cross road,', config_type: 'text' },
    { config_key: 'office_address_line2', config_value: 'Ananth Nagar phase2, Electronic City,', config_type: 'text' },
    { config_key: 'office_address_line3', config_value: 'Bangalore - 560100, India', config_type: 'text' },
    { config_key: 'office_address_note', config_value: 'Visit us for in-person consultations', config_type: 'text' },

    // Social Media
    { config_key: 'instagram_url', config_value: '', config_type: 'text' },
    { config_key: 'facebook_url', config_value: '', config_type: 'text' },
    { config_key: 'twitter_url', config_value: '', config_type: 'text' },
    { config_key: 'linkedin_url', config_value: '', config_type: 'text' },
    { config_key: 'youtube_url', config_value: '', config_type: 'text' },
    { config_key: 'whatsapp_url', config_value: '', config_type: 'text' },

    // Branding
    { config_key: 'header_logo_url', config_value: '', config_type: 'image' },
    { config_key: 'favicon_url', config_value: '', config_type: 'image' },
    { config_key: 'footer_logo_url', config_value: '', config_type: 'image' },
    { config_key: 'footer_description', config_value: 'Pioneering the future of intelligent electronics and AI solutions through innovative hardware design, advanced R&D, and end-to-end product development.', config_type: 'text' }
  ];

  for (const item of siteConfigItems) {
    try {
      // Upsert each config item
      const { error } = await supabase
        .from('site_config')
        .upsert(item, { onConflict: 'config_key' });

      if (error) throw error;
      console.log(`✓ Seeded ${item.config_key}`);
    } catch (error) {
      console.error(`Error with ${item.config_key}:`, error.message);
    }
  }
}

async function main() {
  console.log('=== Contact & Settings Seed Script ===\n');
  
  await seedContactContent();
  await seedSiteConfig();
  
  console.log('\n=== Seeding Complete! ===');
}

main().catch(console.error);
