import express from 'express';
import {
  getContactContent,
  getAllContactContent,
  bulkUpdateContactContent
} from '../controllers/contactContentController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getContactContent);

// Admin routes
router.get('/admin', authenticate, requireAdmin, getAllContactContent);
router.put('/admin/bulk', authenticate, requireAdmin, bulkUpdateContactContent);

export default router;

