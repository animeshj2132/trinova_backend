import express from 'express';
import {
  getOurEdgeContent,
  getAllOurEdgeContent,
  bulkUpdateOurEdgeContent
} from '../controllers/ourEdgeContentController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getOurEdgeContent);

// Admin routes
router.get('/admin', authenticate, requireAdmin, getAllOurEdgeContent);
router.put('/admin/bulk', authenticate, requireAdmin, bulkUpdateOurEdgeContent);

export default router;

