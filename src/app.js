import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import routes from './routes/index.js';
import { testConnection } from './config/database.js';

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration - Allow frontend to access API
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  process.env.CLIENT_URL
].filter(Boolean); // Remove undefined/null values

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use('/api/', apiLimiter);

// API routes
app.use('/api', routes);

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Trinova AI Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      docs: 'API documentation coming soon'
    }
  });
});

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Test database connection on startup
testConnection().catch(console.error);

export default app;

