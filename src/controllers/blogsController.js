import { supabase } from '../config/database.js';

// Get all published blogs (public)
export const getBlogs = async (req, res, next) => {
  try {
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('is_published', true)
      .order('published_date', { ascending: false })
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }

    if (!blogs || blogs.length === 0) {
      return res.json({
        success: true,
        data: { blogs: [] }
      });
    }

    // Parse JSON fields (JSONB columns may come as objects or strings)
    const blogsWithParsed = blogs.map(blog => {
      let key_points = [];
      let tags = [];
      let full_content = null;

      // Handle key_points
      if (blog.key_points) {
        if (typeof blog.key_points === 'string') {
          try {
            key_points = JSON.parse(blog.key_points);
          } catch (e) {
            console.error('Error parsing key_points:', e);
            key_points = [];
          }
        } else {
          key_points = blog.key_points;
        }
      }

      // Handle tags
      if (blog.tags) {
        if (typeof blog.tags === 'string') {
          try {
            tags = JSON.parse(blog.tags);
          } catch (e) {
            console.error('Error parsing tags:', e);
            tags = [];
          }
        } else {
          tags = blog.tags;
        }
      }

      // Handle full_content
      if (blog.full_content) {
        if (typeof blog.full_content === 'string') {
          try {
            full_content = JSON.parse(blog.full_content);
          } catch (e) {
            console.error('Error parsing full_content:', e);
            full_content = null;
          }
        } else {
          full_content = blog.full_content;
        }
      }

      return {
        ...blog,
        key_points,
        tags,
        full_content
      };
    });

    res.json({
      success: true,
      data: { blogs: blogsWithParsed }
    });
  } catch (error) {
    console.error('Error in getBlogs:', error);
    next(error);
  }
};

// Get single blog by ID (public)
export const getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data: blog, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .eq('is_published', true)
      .single();

    if (error) throw error;

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Parse JSON fields safely
    try {
      blog.key_points = blog.key_points 
        ? (typeof blog.key_points === 'string' ? JSON.parse(blog.key_points) : (Array.isArray(blog.key_points) ? blog.key_points : []))
        : [];
      blog.tags = blog.tags 
        ? (typeof blog.tags === 'string' ? JSON.parse(blog.tags) : (Array.isArray(blog.tags) ? blog.tags : []))
        : [];
      blog.full_content = blog.full_content 
        ? (typeof blog.full_content === 'string' ? JSON.parse(blog.full_content) : blog.full_content)
        : null;
    } catch (e) {
      console.error('Error parsing blog JSON fields:', e);
      blog.key_points = [];
      blog.tags = [];
      blog.full_content = null;
    }

    res.json({
      success: true,
      data: { blog }
    });
  } catch (error) {
    next(error);
  }
};

// Get all blogs (admin)
export const getAllBlogs = async (req, res, next) => {
  try {
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Parse JSON fields (JSONB columns may come as objects or strings)
    const blogsWithParsed = blogs.map(blog => {
      let key_points = [];
      let tags = [];
      let full_content = null;

      // Handle key_points
      if (blog.key_points) {
        if (typeof blog.key_points === 'string') {
          try {
            key_points = JSON.parse(blog.key_points);
          } catch (e) {
            key_points = [];
          }
        } else {
          key_points = Array.isArray(blog.key_points) ? blog.key_points : [];
        }
      }

      // Handle tags
      if (blog.tags) {
        if (typeof blog.tags === 'string') {
          try {
            tags = JSON.parse(blog.tags);
          } catch (e) {
            tags = [];
          }
        } else {
          tags = Array.isArray(blog.tags) ? blog.tags : [];
        }
      }

      // Handle full_content
      if (blog.full_content) {
        if (typeof blog.full_content === 'string') {
          try {
            full_content = JSON.parse(blog.full_content);
          } catch (e) {
            full_content = null;
          }
        } else {
          full_content = blog.full_content;
        }
      }

      return {
        ...blog,
        key_points,
        tags,
        full_content
      };
    });

    res.json({
      success: true,
      data: { blogs: blogsWithParsed || [] }
    });
  } catch (error) {
    next(error);
  }
};

// Get single blog by ID (admin)
export const getBlogByIdAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data: blog, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Parse JSON fields safely
    try {
      blog.key_points = blog.key_points 
        ? (typeof blog.key_points === 'string' ? JSON.parse(blog.key_points) : (Array.isArray(blog.key_points) ? blog.key_points : []))
        : [];
      blog.tags = blog.tags 
        ? (typeof blog.tags === 'string' ? JSON.parse(blog.tags) : (Array.isArray(blog.tags) ? blog.tags : []))
        : [];
      blog.full_content = blog.full_content 
        ? (typeof blog.full_content === 'string' ? JSON.parse(blog.full_content) : blog.full_content)
        : null;
    } catch (e) {
      console.error('Error parsing blog JSON fields:', e);
      blog.key_points = [];
      blog.tags = [];
      blog.full_content = null;
    }

    res.json({
      success: true,
      data: { blog }
    });
  } catch (error) {
    next(error);
  }
};

// Create blog (admin)
export const createBlog = async (req, res, next) => {
  try {
    const {
      title,
      excerpt,
      category,
      card_image,
      cover_image,
      read_time,
      published_date,
      full_content,
      key_points,
      tags,
      order_index,
      is_published
    } = req.body;

    const { data: blog, error } = await supabase
      .from('blogs')
      .insert([
        {
          title,
          excerpt: excerpt || null,
          category: category || null,
          card_image: card_image || null,
          cover_image: cover_image || null,
          read_time: read_time || '5 min read',
          published_date: published_date || new Date().toISOString().split('T')[0],
          full_content: full_content ? (typeof full_content === 'string' ? full_content : JSON.stringify(full_content)) : null,
          key_points: key_points ? (typeof key_points === 'string' ? key_points : JSON.stringify(key_points)) : '[]',
          tags: tags ? (typeof tags === 'string' ? tags : JSON.stringify(tags)) : '[]',
          order_index: order_index || 0,
          is_published: is_published !== undefined ? is_published : false
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: { blog }
    });
  } catch (error) {
    next(error);
  }
};

// Update blog (admin)
export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      excerpt,
      category,
      card_image,
      cover_image,
      read_time,
      published_date,
      full_content,
      key_points,
      tags,
      order_index,
      is_published
    } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (category !== undefined) updateData.category = category;
    if (card_image !== undefined) updateData.card_image = card_image;
    if (cover_image !== undefined) updateData.cover_image = cover_image;
    if (read_time !== undefined) updateData.read_time = read_time;
    if (published_date !== undefined) updateData.published_date = published_date;
    if (full_content !== undefined) {
      updateData.full_content = typeof full_content === 'string' ? full_content : JSON.stringify(full_content);
    }
    if (key_points !== undefined) {
      updateData.key_points = typeof key_points === 'string' ? key_points : JSON.stringify(key_points);
    }
    if (tags !== undefined) {
      updateData.tags = typeof tags === 'string' ? tags : JSON.stringify(tags);
    }
    if (order_index !== undefined) updateData.order_index = order_index;
    if (is_published !== undefined) updateData.is_published = is_published;

    const { data: blog, error } = await supabase
      .from('blogs')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog updated successfully',
      data: { blog }
    });
  } catch (error) {
    next(error);
  }
};

// Delete blog (admin)
export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

