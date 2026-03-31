import { Router } from 'express';
import * as dashboardController from '../controllers/dashboard.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

// Apply auth middleware to all dashboard routes
router.use(authenticate);

// GET /api/dashboard - Fetch aggregated stats
router.get('/', dashboardController.getDashboardStats);

export default router;
