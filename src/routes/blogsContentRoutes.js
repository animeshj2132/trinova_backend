import express from 'express';
import {
  getBlogsContent,
  getAllBlogsContent,
  bulkUpdateBlogsContent
} from '../controllers/blogsContentController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getBlogsContent);

// Admin routes
router.get('/admin', authenticate, requireAdmin, getAllBlogsContent);
router.put('/admin/bulk', authenticate, requireAdmin, bulkUpdateBlogsContent);

export default router;


