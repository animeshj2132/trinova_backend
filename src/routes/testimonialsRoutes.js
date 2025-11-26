import express from 'express';
import {
  getTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonialsController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { validateTestimonial } from '../utils/validators.js';
import { validate } from '../utils/validators.js';

const router = express.Router();

// Public route
router.get('/', getTestimonials);

// Admin routes
router.get('/admin', authenticate, requireAdmin, getAllTestimonials);
router.post('/admin', authenticate, requireAdmin, validate(validateTestimonial), createTestimonial);
router.put('/admin/:id', authenticate, requireAdmin, validate(validateTestimonial), updateTestimonial);
router.delete('/admin/:id', authenticate, requireAdmin, deleteTestimonial);

export default router;

