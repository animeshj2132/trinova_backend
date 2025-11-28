import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seedBlogsContent() {
  console.log('Seeding Blogs Page Content...');

  const blogsContent = [
    // Hero Section
    { section: 'blogs', content_key: 'hero_title_line1', content_value: 'Exploring the', content_type: 'text', order_index: 1 },
    { section: 'blogs', content_key: 'hero_title_line2', content_value: 'Frontiers of Tech', content_type: 'text', order_index: 2 },
    { section: 'blogs', content_key: 'hero_description', content_value: 'Discover the latest trends, innovations, and expert perspectives in AI, electronics, and manufacturing.', content_type: 'text', order_index: 3 }
  ];

  for (const item of blogsContent) {
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
        await supabase
          .from('website_content')
          .update({
            content_value: item.content_value,
            content_type: item.content_type,
            order_index: item.order_index,
            is_active: true
          })
          .eq('id', existing.id);
        console.log(`✓ Updated: ${item.content_key}`);
      } else {
        // Insert new
        await supabase.from('website_content').insert([item]);
        console.log(`✓ Created: ${item.content_key}`);
      }
    } catch (error) {
      console.error(`✗ Error with ${item.content_key}:`, error.message);
    }
  }
}

async function seedBlogArticles() {
  console.log('\nSeeding Blog Articles...');

  const blogArticles = [
    {
      title: 'The Future of AI in Manufacturing',
      excerpt: 'How artificial intelligence is revolutionizing production lines, predicting maintenance needs, and optimizing supply chains for unprecedented efficiency.',
      category: 'Artificial Intelligence',
      card_image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070',
      cover_image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070',
      read_time: '5 min read',
      published_date: '2023-10-15',
      is_published: true,
      order_index: 0,
      full_content: JSON.stringify({
        sections: [
          {
            type: 'paragraph',
            text: 'How artificial intelligence is revolutionizing production lines, predicting maintenance needs, and optimizing supply chains for unprecedented efficiency.'
          },
          {
            type: 'paragraph',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'The Evolution of Technology'
          },
          {
            type: 'paragraph',
            text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          },
          {
            type: 'blockquote',
            text: 'Innovation distinguishes between a leader and a follower. The future belongs to those who prepare for it today.'
          },
          {
            type: 'paragraph',
            text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
          },
          {
            type: 'paragraph',
            text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
          }
        ]
      }),
      key_points: JSON.stringify([
        'Understanding the core principles of modern engineering.',
        'Leveraging AI for predictive maintenance and optimization.',
        'Building sustainable ecosystems for long-term growth.'
      ]),
      tags: JSON.stringify(['Technology', 'Innovation', 'Future', 'Engineering'])
    },
    {
      title: 'Sustainable Electronics: A Green Revolution',
      excerpt: 'Exploring the shift towards eco-friendly materials and energy-efficient designs in the electronics industry to combat e-waste and carbon footprints.',
      category: 'Sustainability',
      card_image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2013',
      cover_image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2013',
      read_time: '4 min read',
      published_date: '2023-11-02',
      is_published: true,
      order_index: 1,
      full_content: JSON.stringify({
        sections: [
          {
            type: 'paragraph',
            text: 'Exploring the shift towards eco-friendly materials and energy-efficient designs in the electronics industry to combat e-waste and carbon footprints.'
          },
          {
            type: 'paragraph',
            text: 'The electronics industry is undergoing a transformative shift towards sustainability. Companies are now prioritizing eco-friendly materials, reducing energy consumption, and implementing circular economy principles to minimize environmental impact.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Sustainable Materials Revolution'
          },
          {
            type: 'paragraph',
            text: 'Innovative materials like bioplastics, recycled metals, and biodegradable components are replacing traditional manufacturing inputs. This shift not only reduces waste but also decreases the carbon footprint of electronic devices throughout their lifecycle.'
          },
          {
            type: 'blockquote',
            text: 'The future of electronics lies not just in what we create, but in how sustainably we create it. Every component, every process, and every product must be designed with the planet in mind.'
          },
          {
            type: 'paragraph',
            text: 'Energy-efficient designs are becoming standard practice, with manufacturers optimizing power consumption at every level - from individual components to complete systems.'
          }
        ]
      }),
      key_points: JSON.stringify([
        'Reducing e-waste through sustainable design practices.',
        'Adopting renewable energy sources in manufacturing.',
        'Creating circular economy models for electronics.'
      ]),
      tags: JSON.stringify(['Sustainability', 'Green Technology', 'Environment'])
    },
    {
      title: 'Embedded Systems in the IoT Era',
      excerpt: 'Deep dive into how advanced embedded systems are powering the Internet of Things, enabling smarter homes, cities, and industries.',
      category: 'Embedded Systems',
      card_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070',
      cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070',
      read_time: '6 min read',
      published_date: '2023-11-20',
      is_published: true,
      order_index: 2,
      full_content: JSON.stringify({
        sections: [
          {
            type: 'paragraph',
            text: 'Deep dive into how advanced embedded systems are powering the Internet of Things, enabling smarter homes, cities, and industries.'
          },
          {
            type: 'paragraph',
            text: 'The Internet of Things has transformed how we interact with technology. At the heart of this revolution are sophisticated embedded systems that process data, communicate seamlessly, and make intelligent decisions in real-time.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Smart Homes and Cities'
          },
          {
            type: 'paragraph',
            text: 'Embedded systems enable homes to learn from user behavior, optimize energy consumption, and provide unprecedented convenience. Cities are becoming smarter through interconnected sensors and intelligent infrastructure management.'
          },
          {
            type: 'list',
            ordered: false,
            items: [
              'Real-time data processing and analytics',
              'Seamless device communication protocols',
              'Predictive maintenance capabilities',
              'Enhanced security and privacy measures'
            ]
          },
          {
            type: 'paragraph',
            text: 'The integration of AI with embedded systems is creating truly intelligent environments that adapt, learn, and optimize continuously.'
          }
        ]
      }),
      key_points: JSON.stringify([
        'Connecting devices for seamless automation.',
        'Enhancing efficiency through intelligent systems.',
        'Building scalable IoT infrastructure.'
      ]),
      tags: JSON.stringify(['IoT', 'Embedded Systems', 'Automation'])
    },
    {
      title: 'Cybersecurity for Connected Devices',
      excerpt: 'Why security must be a priority in hardware design and how to protect connected devices from emerging threats in an increasingly digital world.',
      category: 'Security',
      card_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070',
      cover_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070',
      read_time: '7 min read',
      published_date: '2023-12-05',
      is_published: true,
      order_index: 3,
      full_content: JSON.stringify({
        sections: [
          {
            type: 'paragraph',
            text: 'Why security must be a priority in hardware design and how to protect connected devices from emerging threats in an increasingly digital world.'
          },
          {
            type: 'paragraph',
            text: 'As devices become more connected and data-driven, security vulnerabilities are multiplying. Hardware-level security is no longer optional—it\'s fundamental to protecting user privacy, preventing data breaches, and maintaining system integrity.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Building Security from the Ground Up'
          },
          {
            type: 'paragraph',
            text: 'Security must be integrated at every stage of hardware development, from chip design to firmware implementation. Hardware security modules, secure boot processes, and encrypted communication protocols form the foundation of protected systems.'
          },
          {
            type: 'blockquote',
            text: 'In cybersecurity, prevention is infinitely better than cure. Designing secure hardware from the start eliminates vulnerabilities before they can be exploited.'
          },
          {
            type: 'heading',
            level: 2,
            text: 'Emerging Threats and Solutions'
          },
          {
            type: 'paragraph',
            text: 'New attack vectors emerge constantly, from side-channel attacks to firmware manipulation. Staying ahead requires continuous innovation in security protocols, regular firmware updates, and comprehensive threat monitoring.'
          },
          {
            type: 'list',
            ordered: false,
            items: [
              'Hardware security modules for key management',
              'Secure boot and attestation mechanisms',
              'End-to-end encryption protocols',
              'Regular security audits and penetration testing'
            ]
          }
        ]
      }),
      key_points: JSON.stringify([
        'Implementing hardware-level security features.',
        'Protecting against evolving cyber threats.',
        'Ensuring data privacy in connected ecosystems.'
      ]),
      tags: JSON.stringify(['Security', 'Cybersecurity', 'Data Protection'])
    }
  ];

  for (const article of blogArticles) {
    try {
      // Check if exists by title
      const { data: existing } = await supabase
        .from('blogs')
        .select('id')
        .eq('title', article.title)
        .single();

      if (existing) {
        // Update existing
        await supabase
          .from('blogs')
          .update(article)
          .eq('id', existing.id);
        console.log(`✓ Updated: ${article.title}`);
      } else {
        // Insert new
        await supabase.from('blogs').insert([article]);
        console.log(`✓ Created: ${article.title}`);
      }
    } catch (error) {
      console.error(`✗ Error with ${article.title}:`, error.message);
    }
  }
}

async function main() {
  try {
    await seedBlogsContent();
    await seedBlogArticles();
    console.log('\n✅ Blog seeding completed successfully!');
  } catch (error) {
    console.error('\n❌ Error seeding blogs:', error);
    process.exit(1);
  }
}

main();

