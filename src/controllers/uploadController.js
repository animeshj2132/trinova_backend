import { supabase } from '../config/database.js';
import { MEDIA_CATEGORIES } from '../config/constants.js';
import { randomUUID } from 'crypto';

// Upload single file (image or video) to Supabase Storage (admin)
export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const file = req.file;
    const category = req.body.category || MEDIA_CATEGORIES.GENERAL;
    const isVideo = file.mimetype.startsWith('video/');

    // Generate unique filename
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${randomUUID()}.${fileExt}`;
    const folder = isVideo ? 'videos' : 'images';
    const filePath = `${folder}/${fileName}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    const fileUrl = urlData.publicUrl;

    // Save to database
    const { data: media, error } = await supabase
      .from('media')
      .insert([
        {
          filename: fileName,
          original_name: file.originalname,
          file_path: filePath,
          file_url: fileUrl,
          file_size: file.size,
          mime_type: file.mimetype,
          category,
          uploaded_by: req.admin.id
        }
      ])
      .select()
      .single();

    if (error) {
      // Delete from storage if database insert fails
      await supabase.storage.from('media').remove([filePath]);
      throw error;
    }

    res.status(201).json({
      success: true,
      message: isVideo ? 'Video uploaded successfully' : 'Image uploaded successfully',
      data: {
        media: {
          id: media.id,
          filename: media.filename,
          originalName: media.original_name,
          url: media.file_url,
          size: media.file_size,
          category: media.category,
          mimeType: media.mime_type,
          isVideo: isVideo
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Upload multiple files (images or videos) to Supabase Storage (admin)
export const uploadMultipleImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const files = req.files;
    const category = req.body.category || MEDIA_CATEGORIES.GENERAL;

    const mediaItems = [];

    for (const file of files) {
      const isVideo = file.mimetype.startsWith('video/');
      const fileExt = file.originalname.split('.').pop();
      const fileName = `${randomUUID()}.${fileExt}`;
      const folder = isVideo ? 'videos' : 'images';
      const filePath = `${folder}/${fileName}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      const fileUrl = urlData.publicUrl;

      // Save to database
      const { data: media, error } = await supabase
        .from('media')
        .insert([
          {
            filename: fileName,
            original_name: file.originalname,
            file_path: filePath,
            file_url: fileUrl,
            file_size: file.size,
            mime_type: file.mimetype,
            category,
            uploaded_by: req.admin.id
          }
        ])
        .select()
        .single();

      if (error) {
        // Delete from storage if database insert fails
        await supabase.storage.from('media').remove([filePath]);
        throw error;
      }

      mediaItems.push({
        id: media.id,
        filename: media.filename,
        originalName: media.original_name,
        url: media.file_url,
        size: media.file_size,
        category: media.category,
        mimeType: media.mime_type,
        isVideo: isVideo
      });
    }

    res.status(201).json({
      success: true,
      message: `${files.length} file(s) uploaded successfully`,
      data: { media: mediaItems }
    });
  } catch (error) {
    next(error);
  }
};

// Get all media (admin)
export const getAllMedia = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 50 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let query = supabase
      .from('media')
      .select('*', { count: 'exact' })
      .order('uploaded_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    query = query.range(offset, offset + parseInt(limit) - 1);

    const { data: media, error, count } = await query;

    if (error) throw error;

    res.json({
      success: true,
      data: {
        media: media || [],
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: Math.ceil(count / parseInt(limit))
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Delete media (admin)
export const deleteMedia = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Get media info first
    const { data: media, error: fetchError } = await supabase
      .from('media')
      .select('file_path')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found'
      });
    }

    // Delete from Supabase Storage
    const { error: storageError } = await supabase.storage
      .from('media')
      .remove([media.file_path]);

    if (storageError) {
      console.error('Error deleting from storage:', storageError);
      // Continue with database deletion even if storage deletion fails
    }

    // Delete from database
    const { error: deleteError } = await supabase
      .from('media')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    res.json({
      success: true,
      message: 'Media deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

