import { Router } from 'express';
import * as resultsController from '../controllers/results.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

// All results routes require authentication
router.use(authenticate);

// GET /api/results - List all results for user
router.get('/', resultsController.getResults);

// GET /api/results/:id - Get specific result by ID
router.get('/:id', resultsController.getResultById);

export default router;
