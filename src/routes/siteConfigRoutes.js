import express from 'express';
import {
  getSiteConfig,
  updateSiteConfig
} from '../controllers/siteConfigController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getSiteConfig);

// Admin route
router.put('/admin', authenticate, requireAdmin, updateSiteConfig);

export default router;

