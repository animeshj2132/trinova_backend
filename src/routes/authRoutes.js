import express from 'express';
import {
  registerAdmin,
  loginAdmin,
  getCurrentAdmin,
  changePassword
} from '../controllers/authController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { validateLogin, validateRegister, validateChangePassword } from '../utils/validators.js';
import { validate } from '../utils/validators.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public routes
router.post('/register', validate(validateRegister), registerAdmin);
router.post('/login', authLimiter, validate(validateLogin), loginAdmin);

// Protected routes
router.get('/me', authenticate, getCurrentAdmin);
router.put('/change-password', authenticate, validate(validateChangePassword), changePassword);

export default router;

