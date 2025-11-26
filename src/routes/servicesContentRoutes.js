import express from 'express';
import {
  getServicesContent,
  getAllServicesContent,
  bulkUpdateServicesContent
} from '../controllers/servicesContentController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getServicesContent);

// Admin routes
router.get('/admin', authenticate, requireAdmin, getAllServicesContent);
router.put('/admin/bulk', authenticate, requireAdmin, bulkUpdateServicesContent);

export default router;

