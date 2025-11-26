import { supabase } from '../config/database.js';

// Get all content (public)
export const getContent = async (req, res, next) => {
  try {
    const { section } = req.params;

    let query = supabase
      .from('website_content')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (section) {
      query = query.eq('section', section);
    }

    const { data: content, error } = await query;

    if (error) throw error;

    res.json({
      success: true,
      data: { content: content || [] }
    });
  } catch (error) {
    next(error);
  }
};

// Create content (admin)
export const createContent = async (req, res, next) => {
  try {
    const {
      section,
      contentKey,
      contentValue,
      contentType,
      imageUrl,
      orderIndex,
      isActive
    } = req.body;

    const { data: content, error } = await supabase
      .from('website_content')
      .insert([
        {
          section,
          content_key: contentKey,
          content_value: contentValue || null,
          content_type: contentType || 'text',
          image_url: imageUrl || null,
          order_index: orderIndex || 0,
          is_active: isActive !== undefined ? isActive : true,
          updated_by: req.admin.id
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Content created successfully',
      data: { content }
    });
  } catch (error) {
    next(error);
  }
};

// Update content (admin)
export const updateContent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      section,
      contentKey,
      contentValue,
      contentType,
      imageUrl,
      orderIndex,
      isActive
    } = req.body;

    const updateData = {
      updated_by: req.admin.id
    };

    if (section !== undefined) updateData.section = section;
    if (contentKey !== undefined) updateData.content_key = contentKey;
    if (contentValue !== undefined) updateData.content_value = contentValue;
    if (contentType !== undefined) updateData.content_type = contentType;
    if (imageUrl !== undefined) updateData.image_url = imageUrl;
    if (orderIndex !== undefined) updateData.order_index = orderIndex;
    if (isActive !== undefined) updateData.is_active = isActive;

    const { data: content, error } = await supabase
      .from('website_content')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    res.json({
      success: true,
      message: 'Content updated successfully',
      data: { content }
    });
  } catch (error) {
    next(error);
  }
};

// Delete content (admin)
export const deleteContent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('website_content')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

