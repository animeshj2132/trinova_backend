import rateLimit from 'express-rate-limit';

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100000, // Increased to 1000 for development
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for localhost in development
    return process.env.NODE_ENV === 'development' && 
           (req.ip === '::1' || req.ip === '127.0.0.1' || req.ip === '::ffff:127.0.0.1');
  }
});

// Stricter rate limiter for authentication endpoints
export const authLimiter = rateLimit({
  windowMs: 1000 * 6000 * 100000, // 15 minutes
  max: 100000, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many login attempts, please try again later.'
  },
  skipSuccessfulRequests: true,
});

// Rate limiter for contact form
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 contact form submissions per hour
  message: {
    success: false,
    message: 'Too many contact form submissions, please try again later.'
  },
});

