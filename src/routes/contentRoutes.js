import express from 'express';
import {
  getContent,
  createContent,
  updateContent,
  deleteContent
} from '../controllers/contentController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getContent);
router.get('/:section', getContent);

// Admin routes
router.post('/admin', authenticate, requireAdmin, createContent);
router.put('/admin/:id', authenticate, requireAdmin, updateContent);
router.delete('/admin/:id', authenticate, requireAdmin, deleteContent);

export default router;

