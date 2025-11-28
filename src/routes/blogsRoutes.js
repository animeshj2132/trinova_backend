import express from 'express';
import {
  getBlogs,
  getBlogById,
  getAllBlogs,
  getBlogByIdAdmin,
  createBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blogsController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getBlogs);
router.get('/:id', getBlogById);

// Admin routes
router.get('/admin/all', authenticate, requireAdmin, getAllBlogs);
router.get('/admin/:id', authenticate, requireAdmin, getBlogByIdAdmin);
router.post('/admin', authenticate, requireAdmin, createBlog);
router.put('/admin/:id', authenticate, requireAdmin, updateBlog);
router.delete('/admin/:id', authenticate, requireAdmin, deleteBlog);

export default router;

