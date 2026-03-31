import { Router } from 'express';
import * as analysisController from '../controllers/analysis.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router({ mergeParams: true });

// ─── Analysis Routes ──────────────────────────────────────────
// All routes are protected by JWT authentication.

// POST   /api/projects/:projectId/analyses  — trigger new analysis
router.post('/', authenticate, analysisController.runAnalysis);

// GET    /api/projects/:projectId/analyses  — list all analyses for project
router.get('/', authenticate, analysisController.listAnalyses);

export default router;
