import { supabase } from '../config/database.js';

// Get all active services (public)
export const getServices = async (req, res, next) => {
  try {
    const { data: services, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (error) throw error;

    res.json({
      success: true,
      data: { services: services || [] }
    });
  } catch (error) {
    next(error);
  }
};

// Get all services (admin)
export const getAllServices = async (req, res, next) => {
  try {
    const { data: services, error } = await supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;

    res.json({
      success: true,
      data: { services: services || [] }
    });
  } catch (error) {
    next(error);
  }
};

// Create service (admin)
export const createService = async (req, res, next) => {
  try {
    const {
      title,
      description,
      icon,
      category,
      imageUrl,
      orderIndex,
      isActive
    } = req.body;

    const { data: service, error } = await supabase
      .from('services')
      .insert([
        {
          title,
          description: description || null,
          icon: icon || null,
          category: category || null,
          image_url: imageUrl || null,
          order_index: orderIndex || 0,
          is_active: isActive !== undefined ? isActive : true
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: { service }
    });
  } catch (error) {
    next(error);
  }
};

// Update service (admin)
export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      icon,
      category,
      imageUrl,
      orderIndex,
      isActive
    } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (icon !== undefined) updateData.icon = icon;
    if (category !== undefined) updateData.category = category;
    if (imageUrl !== undefined) updateData.image_url = imageUrl;
    if (orderIndex !== undefined) updateData.order_index = orderIndex;
    if (isActive !== undefined) updateData.is_active = isActive;

    const { data: service, error } = await supabase
      .from('services')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: { service }
    });
  } catch (error) {
    next(error);
  }
};

// Delete service (admin)
export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

