import express from 'express';
import {
  getEMSContent,
  getAllEMSContent,
  bulkUpdateEMSContent
} from '../controllers/emsContentController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getEMSContent);

// Admin routes
router.get('/admin', authenticate, requireAdmin, getAllEMSContent);
router.put('/admin/bulk', authenticate, requireAdmin, bulkUpdateEMSContent);

export default router;
