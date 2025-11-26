import express from 'express';
import {
  uploadImage,
  uploadMultipleImages,
  getAllMedia,
  deleteMedia
} from '../controllers/uploadController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { uploadSingle, uploadMultiple, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

// Note: Images are served directly from Supabase Storage public URLs
// No need for a serve route since Supabase handles it

// Admin routes
router.post('/admin', authenticate, requireAdmin, uploadSingle, handleUploadError, uploadImage);
router.post('/admin/multiple', authenticate, requireAdmin, uploadMultiple, handleUploadError, uploadMultipleImages);
router.get('/admin/media', authenticate, requireAdmin, getAllMedia);
router.delete('/admin/media/:id', authenticate, requireAdmin, deleteMedia);

export default router;

