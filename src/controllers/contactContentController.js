import { supabase } from '../config/database.js';

// Get all Contact page content (public)
export const getContactContent = async (req, res, next) => {
  try {
    const { data: content, error } = await supabase
      .from('website_content')
      .select('*')
      .eq('section', 'contact')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (error) throw error;

    // Convert array to object for easier access
    const contentObject = {};
    content.forEach(item => {
      let value = item.content_value;
      if (item.content_type === 'json') {
        try {
          value = JSON.parse(value);
        } catch {
          value = item.content_value;
        }
      }
      contentObject[item.content_key] = {
        value,
        type: item.content_type,
        imageUrl: item.image_url
      };
    });

    res.json({
      success: true,
      data: { content: contentObject }
    });
  } catch (error) {
    next(error);
  }
};

// Get all Contact content for admin (including inactive)
export const getAllContactContent = async (req, res, next) => {
  try {
    const { data: content, error } = await supabase
      .from('website_content')
      .select('*')
      .eq('section', 'contact')
      .order('order_index', { ascending: true });

    if (error) throw error;

    res.json({
      success: true,
      data: { content: content || [] }
    });
  } catch (error) {
    next(error);
  }
};

// Bulk update Contact content
export const bulkUpdateContactContent = async (req, res, next) => {
  try {
    const { sections } = req.body; // Array of { sectionKey, contentValue, contentType, imageUrl }

    if (!Array.isArray(sections)) {
      return res.status(400).json({
        success: false,
        message: 'Sections must be an array'
      });
    }

    const updates = sections.map(({ sectionKey, contentValue, contentType, imageUrl }) => {
      const value = contentType === 'json' ? JSON.stringify(contentValue) : contentValue;
      return supabase
        .from('website_content')
        .upsert({
          section: 'contact',
          content_key: sectionKey,
          content_value: value,
          content_type: contentType || 'text',
          image_url: imageUrl || null,
          updated_by: req.admin.id,
          is_active: true
        }, {
          onConflict: 'section,content_key'
        });
    });

    await Promise.all(updates);

    res.json({
      success: true,
      message: 'All content updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

