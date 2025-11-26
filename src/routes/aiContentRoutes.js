import express from 'express';
import {
  getAIContent,
  getAllAIContent,
  bulkUpdateAIContent
} from '../controllers/aiContentController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getAIContent);

// Admin routes
router.get('/admin', authenticate, requireAdmin, getAllAIContent);
router.put('/admin/bulk', authenticate, requireAdmin, bulkUpdateAIContent);

export default router;

