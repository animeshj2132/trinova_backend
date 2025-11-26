import express from 'express';
import {
  getHomeContent,
  getAllHomeContent,
  updateHomeContent,
  bulkUpdateHomeContent
} from '../controllers/homeContentController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getHomeContent);

// Admin routes
router.get('/admin', authenticate, requireAdmin, getAllHomeContent);
router.put('/admin', authenticate, requireAdmin, updateHomeContent);
router.put('/admin/bulk', authenticate, requireAdmin, bulkUpdateHomeContent);

export default router;

