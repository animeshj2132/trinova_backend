import { supabase } from '../config/database.js';

// Get published testimonials (public)
export const getTestimonials = async (req, res, next) => {
  try {
    const { data: testimonials, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('order_index', { ascending: true });

    if (error) throw error;

    res.json({
      success: true,
      data: { testimonials: testimonials || [] }
    });
  } catch (error) {
    next(error);
  }
};

// Get all testimonials (admin)
export const getAllTestimonials = async (req, res, next) => {
  try {
    const { data: testimonials, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;

    res.json({
      success: true,
      data: { testimonials: testimonials || [] }
    });
  } catch (error) {
    next(error);
  }
};

// Create testimonial (admin)
export const createTestimonial = async (req, res, next) => {
  try {
    const {
      clientName,
      company,
      designation,
      message,
      rating,
      imageUrl,
      orderIndex,
      isPublished
    } = req.body;

    const { data: testimonial, error } = await supabase
      .from('testimonials')
      .insert([
        {
          client_name: clientName,
          company: company || null,
          designation: designation || null,
          message,
          rating: rating || null,
          image_url: imageUrl || null,
          order_index: orderIndex || 0,
          is_published: isPublished !== undefined ? isPublished : false
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      data: { testimonial }
    });
  } catch (error) {
    next(error);
  }
};

// Update testimonial (admin)
export const updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      clientName,
      company,
      designation,
      message,
      rating,
      imageUrl,
      orderIndex,
      isPublished
    } = req.body;

    const updateData = {};
    if (clientName !== undefined) updateData.client_name = clientName;
    if (company !== undefined) updateData.company = company;
    if (designation !== undefined) updateData.designation = designation;
    if (message !== undefined) updateData.message = message;
    if (rating !== undefined) updateData.rating = rating;
    if (imageUrl !== undefined) updateData.image_url = imageUrl;
    if (orderIndex !== undefined) updateData.order_index = orderIndex;
    if (isPublished !== undefined) updateData.is_published = isPublished;

    const { data: testimonial, error } = await supabase
      .from('testimonials')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    res.json({
      success: true,
      message: 'Testimonial updated successfully',
      data: { testimonial }
    });
  } catch (error) {
    next(error);
  }
};

// Delete testimonial (admin)
export const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

