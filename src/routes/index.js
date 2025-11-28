import express from 'express';
import authRoutes from './authRoutes.js';
import inquiriesRoutes from './inquiriesRoutes.js';
import heroSlidesRoutes from './heroSlidesRoutes.js';
import servicesRoutes from './servicesRoutes.js';
import testimonialsRoutes from './testimonialsRoutes.js';
import uploadRoutes from './uploadRoutes.js';
import siteConfigRoutes from './siteConfigRoutes.js';
import contentRoutes from './contentRoutes.js';
import homeContentRoutes from './homeContentRoutes.js';
import servicesContentRoutes from './servicesContentRoutes.js';
import emsContentRoutes from './emsContentRoutes.js';
import aiContentRoutes from './aiContentRoutes.js';
import ourEdgeContentRoutes from './ourEdgeContentRoutes.js';
import testimonialsContentRoutes from './testimonialsContentRoutes.js';
import contactContentRoutes from './contactContentRoutes.js';
import blogsContentRoutes from './blogsContentRoutes.js';
import blogsRoutes from './blogsRoutes.js';

const router = express.Router();

// API routes
router.use('/auth', authRoutes);
router.use('/contact', inquiriesRoutes);
router.use('/inquiries', inquiriesRoutes);
router.use('/hero-slides', heroSlidesRoutes);
router.use('/services', servicesRoutes);
router.use('/testimonials', testimonialsRoutes);
router.use('/upload', uploadRoutes);
router.use('/media', uploadRoutes);
router.use('/site-config', siteConfigRoutes);
router.use('/content', contentRoutes);
router.use('/home-content', homeContentRoutes);
router.use('/services-content', servicesContentRoutes);
router.use('/ems-content', emsContentRoutes);
router.use('/ai-content', aiContentRoutes);
router.use('/our-edge-content', ourEdgeContentRoutes);
router.use('/testimonials-content', testimonialsContentRoutes);
router.use('/contact-content', contactContentRoutes);
router.use('/blogs-content', blogsContentRoutes);
router.use('/blogs', blogsRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Trinova AI Backend API is running',
    timestamp: new Date().toISOString()
  });
});

export default router;

