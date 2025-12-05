-- Seed Hero Slides with existing content from old frontend
-- Run this in Supabase SQL Editor to populate hero slides

INSERT INTO hero_slides (
  title,
  highlights,
  description,
  sub_description,
  media_url,
  media_type,
  primary_cta_label,
  primary_cta_icon,
  order_index,
  is_active
) VALUES
(
  'Your Vision, ',
  '["Engineered Into Reality."]'::jsonb,
  'We are the full-stack partner, accelerating innovation from concept to market in hardware, firmware, and advanced AI systems.',
  'Unlock reliable, scalable products with our deep expertise in embedded intelligence, secure connectivity, and cloud orchestration.',
  '/images/slider-1.webp',
  'image',
  'Explore Our Services',
  'ri-arrow-right-line',
  0,
  true
),
(
  'Your Vision, ',
  '["Engineered Into Reality."]'::jsonb,
  'A single partner for research, hardware, firmware, and manufacturing means faster cycles and fewer handoffs.',
  'Our collaborative pods blend R&D rigor with production discipline so every iteration moves you closer to market launch.',
  '/images/slider-2.webp',
  'image',
  'See Our Process',
  'ri-play-circle-line',
  1,
  true
),
(
  'Your Vision, ',
  '["Engineered Into Reality."]'::jsonb,
  'We fuse predictive analytics, secure OTA, and data orchestration so your products learn, adapt, and scale.',
  'From mobile companion apps to cloud-native control rooms, we help you deliver seamless user experiences and proactive support.',
  '/images/slider-3.webp',
  'image',
  'View Case Studies',
  'ri-slideshow-3-line',
  2,
  true
)
ON CONFLICT DO NOTHING;





