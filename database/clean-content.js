import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function cleanContent() {
  try {
    console.log('🧹 Cleaning all content values...\n');

    // Get all content
    const { data: allContent, error: fetchError } = await supabase
      .from('website_content')
      .select('*');

    if (fetchError) throw fetchError;

    console.log(`Processing ${allContent.length} items...\n`);

    for (const item of allContent) {
      let cleaned = item.content_value;
      
      // Remove any JSON wrapping
      while (typeof cleaned === 'string' && (cleaned.startsWith('{') || cleaned.startsWith('"{'))) {
        try {
          const parsed = JSON.parse(cleaned);
          if (typeof parsed === 'object' && parsed !== null) {
            if (parsed.contentValue) {
              cleaned = parsed.contentValue;
            } else if (parsed.value) {
              cleaned = parsed.value;
            } else {
              break;
            }
          } else {
            cleaned = parsed;
          }
        } catch {
          break;
        }
      }

      // Ensure it's a plain string
      if (typeof cleaned !== 'string') {
        cleaned = String(cleaned || '');
      }

      if (cleaned !== item.content_value) {
        console.log(`✏️  ${item.content_key}:`);
        console.log(`   Before: ${String(item.content_value).substring(0, 80)}...`);
        console.log(`   After:  ${cleaned}`);
        console.log('');

        const { error: updateError } = await supabase
          .from('website_content')
          .update({ content_value: cleaned })
          .eq('content_key', item.content_key);

        if (updateError) {
          console.error(`❌ Error updating ${item.content_key}:`, updateError.message);
        }
      }
    }

    console.log('\n✅ Content cleaning complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

cleanContent();


