import express from 'express';
import {
  getServices,
  getAllServices,
  createService,
  updateService,
  deleteService
} from '../controllers/servicesController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { validateService } from '../utils/validators.js';
import { validate } from '../utils/validators.js';

const router = express.Router();

// Public route
router.get('/', getServices);

// Admin routes
router.get('/admin', authenticate, requireAdmin, getAllServices);
router.post('/admin', authenticate, requireAdmin, validate(validateService), createService);
router.put('/admin/:id', authenticate, requireAdmin, validate(validateService), updateService);
router.delete('/admin/:id', authenticate, requireAdmin, deleteService);

export default router;

