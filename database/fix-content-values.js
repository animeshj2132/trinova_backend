import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixContentValues() {
  try {
    console.log('🔧 Fixing content values in database...');

    // Get all content
    const { data: allContent, error: fetchError } = await supabase
      .from('website_content')
      .select('*');

    if (fetchError) {
      throw fetchError;
    }

    console.log(`Found ${allContent.length} content items`);

    let fixedCount = 0;

    for (const item of allContent) {
      let fixedValue = item.content_value;
      let needsFix = false;

      // Recursively unwrap nested JSON until we get a plain string
      const unwrapValue = (val) => {
        if (typeof val === 'string') {
          // Try to parse if it looks like JSON
          if (val.startsWith('{') || val.startsWith('"')) {
            try {
              const parsed = JSON.parse(val);
              // Recursively unwrap
              return unwrapValue(parsed);
            } catch {
              // Not valid JSON, return as is
              return val;
            }
          }
          return val;
        } else if (typeof val === 'object' && val !== null) {
          // If it's an object, extract contentValue or value
          if (val.contentValue !== undefined) {
            return unwrapValue(val.contentValue);
          } else if (val.value !== undefined) {
            return unwrapValue(val.value);
          }
          // Otherwise return as JSON string
          return JSON.stringify(val);
        }
        return val;
      };

      try {
        const unwrapped = unwrapValue(item.content_value);
        if (unwrapped !== item.content_value) {
          fixedValue = unwrapped;
          needsFix = true;
        }
      } catch (e) {
        console.error(`Error unwrapping ${item.content_key}:`, e);
      }

      if (needsFix) {
        console.log(`Fixing: ${item.content_key}`);
        console.log(`  Old: ${JSON.stringify(item.content_value).substring(0, 100)}...`);
        console.log(`  New: ${fixedValue}`);

        const { error: updateError } = await supabase
          .from('website_content')
          .update({ content_value: fixedValue })
          .eq('content_key', item.content_key);

        if (updateError) {
          console.error(`Error updating ${item.content_key}:`, updateError);
        } else {
          fixedCount++;
        }
      }
    }

    console.log(`\n✅ Fixed ${fixedCount} content items!`);

  } catch (error) {
    console.error('❌ Error fixing content values:', error.message);
    process.exit(1);
  }
}

fixContentValues();

