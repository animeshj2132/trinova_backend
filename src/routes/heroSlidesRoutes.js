import express from 'express';
import {
  getHeroSlides,
  getAllHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  reorderHeroSlides
} from '../controllers/heroSlidesController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { validateHeroSlide } from '../utils/validators.js';
import { validate } from '../utils/validators.js';

const router = express.Router();

// Public route
router.get('/', getHeroSlides);

// Admin routes
router.get('/admin', authenticate, requireAdmin, getAllHeroSlides);
router.post('/admin', authenticate, requireAdmin, validate(validateHeroSlide), createHeroSlide);
router.put('/admin/:id', authenticate, requireAdmin, validate(validateHeroSlide), updateHeroSlide);
router.delete('/admin/:id', authenticate, requireAdmin, deleteHeroSlide);
router.put('/admin/reorder', authenticate, requireAdmin, reorderHeroSlides);

export default router;

