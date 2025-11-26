import express from 'express';
import {
  getTestimonialsContent,
  getAllTestimonialsContent,
  bulkUpdateTestimonialsContent
} from '../controllers/testimonialsContentController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getTestimonialsContent);

// Admin routes
router.get('/admin', authenticate, requireAdmin, getAllTestimonialsContent);
router.put('/admin/bulk', authenticate, requireAdmin, bulkUpdateTestimonialsContent);

export default router;

