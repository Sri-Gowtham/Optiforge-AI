import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './modules/auth/auth.routes.js';
import projectRoutes from './modules/project/project.routes.js';
import designRoutes from './modules/design/design.routes.js';
import analysisRoutes from './modules/analysis/analysis.routes.js';

// Import middleware
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

/**
 * Security Middleware
 */
app.use(helmet()); // Security headers

/**
 * CORS Configuration
 */
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
}));

/**
 * Rate Limiting
 */
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

/**
 * Body Parsers
 */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/**
 * Health Check Route
 */
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'OptiForge AI API is running',
        timestamp: new Date().toISOString(),
    });
});

/**
 * API Routes
 */
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/analysis', analysisRoutes);

/**
 * Root Route
 */
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to OptiForge AI API',
        version: '1.0.0',
        documentation: '/api/docs',
    });
});

/**
 * Not Found Handler (404)
 */
app.use(notFoundHandler);

/**
 * Global Error Handler
 */
app.use(errorHandler);

export default app;
