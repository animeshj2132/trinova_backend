import express from 'express';
import {
  submitInquiry,
  getAllInquiries,
  getInquiry,
  updateInquiry,
  deleteInquiry,
  exportInquiries
} from '../controllers/inquiriesController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { validateContactForm } from '../utils/validators.js';
import { validate } from '../utils/validators.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public route
router.post('/', contactLimiter, validate(validateContactForm), submitInquiry);

// Admin routes
router.get('/admin', authenticate, requireAdmin, getAllInquiries);
router.get('/admin/:id', authenticate, requireAdmin, getInquiry);
router.put('/admin/:id', authenticate, requireAdmin, updateInquiry);
router.delete('/admin/:id', authenticate, requireAdmin, deleteInquiry);
router.get('/admin/export/csv', authenticate, requireAdmin, exportInquiries);

export default router;

