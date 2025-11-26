import { supabase } from '../config/database.js';

// Get all active hero slides (public)
export const getHeroSlides = async (req, res, next) => {
  try {
    const { data: slides, error } = await supabase
      .from('hero_slides')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (error) throw error;

    res.json({
      success: true,
      data: { slides: slides || [] }
    });
  } catch (error) {
    next(error);
  }
};

// Get all hero slides (admin)
export const getAllHeroSlides = async (req, res, next) => {
  try {
    const { data: slides, error } = await supabase
      .from('hero_slides')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;

    res.json({
      success: true,
      data: { slides: slides || [] }
    });
  } catch (error) {
    next(error);
  }
};

// Create hero slide (admin)
export const createHeroSlide = async (req, res, next) => {
  try {
    const {
      title,
      highlights,
      description,
      subDescription,
      mediaUrl,
      mediaType,
      primaryCtaLabel,
      primaryCtaIcon,
      orderIndex,
      isActive
    } = req.body;

    const { data: slide, error } = await supabase
      .from('hero_slides')
      .insert([
        {
          title,
          highlights: highlights || [],
          description: description || null,
          sub_description: subDescription || null,
          media_url: mediaUrl,
          media_type: mediaType || 'image',
          primary_cta_label: primaryCtaLabel || null,
          primary_cta_icon: primaryCtaIcon || null,
          order_index: orderIndex || 0,
          is_active: isActive !== undefined ? isActive : true
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Hero slide created successfully',
      data: { slide }
    });
  } catch (error) {
    next(error);
  }
};

// Update hero slide (admin)
export const updateHeroSlide = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      highlights,
      description,
      subDescription,
      mediaUrl,
      mediaType,
      primaryCtaLabel,
      primaryCtaIcon,
      orderIndex,
      isActive
    } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (highlights !== undefined) updateData.highlights = highlights;
    if (description !== undefined) updateData.description = description;
    if (subDescription !== undefined) updateData.sub_description = subDescription;
    if (mediaUrl !== undefined) updateData.media_url = mediaUrl;
    if (mediaType !== undefined) updateData.media_type = mediaType;
    if (primaryCtaLabel !== undefined) updateData.primary_cta_label = primaryCtaLabel;
    if (primaryCtaIcon !== undefined) updateData.primary_cta_icon = primaryCtaIcon;
    if (orderIndex !== undefined) updateData.order_index = orderIndex;
    if (isActive !== undefined) updateData.is_active = isActive;

    const { data: slide, error } = await supabase
      .from('hero_slides')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (!slide) {
      return res.status(404).json({
        success: false,
        message: 'Hero slide not found'
      });
    }

    res.json({
      success: true,
      message: 'Hero slide updated successfully',
      data: { slide }
    });
  } catch (error) {
    next(error);
  }
};

// Delete hero slide (admin)
export const deleteHeroSlide = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('hero_slides')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Hero slide deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Reorder hero slides (admin)
export const reorderHeroSlides = async (req, res, next) => {
  try {
    const { slides } = req.body; // Array of { id, order_index }

    if (!Array.isArray(slides)) {
      return res.status(400).json({
        success: false,
        message: 'Slides must be an array'
      });
    }

    // Update each slide's order
    const updates = slides.map(({ id, order_index }) =>
      supabase
        .from('hero_slides')
        .update({ order_index })
        .eq('id', id)
    );

    await Promise.all(updates);

    res.json({
      success: true,
      message: 'Hero slides reordered successfully'
    });
  } catch (error) {
    next(error);
  }
};

