import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes';
import projectRoutes from './project.routes';
import analysisRoutes from './analysis.routes';
import resultsRoutes from './results.routes';
import dashboardRoutes from './dashboard.routes';
import { authenticate } from '../../middleware/auth.middleware';
import * as analysisController from '../controllers/analysis.controller';

const router = Router();

// ─── Health Check ─────────────────────────────────────────
router.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ─── Auth Routes ──────────────────────────────────────────
router.use('/auth', authRoutes);

// ─── Project Routes ───────────────────────────────────────
router.use('/projects', projectRoutes);

// ─── Analysis Routes (nested under projects) ──────────────
// POST /api/projects/:projectId/analyses  — run new analysis
// GET  /api/projects/:projectId/analyses  — list analyses for project
router.use('/projects/:projectId/analyses', analysisRoutes);

// ─── Standalone Analysis Lookup ───────────────────────────
// GET /api/analyses/:analysisId  — get single analysis by ID
router.get('/analyses/:analysisId', authenticate, analysisController.getAnalysis);

// ─── Results Routes ───────────────────────────────────────
// GET /api/results  — list analysis results for user
// GET /api/results/:id  — get single result by ID
router.use('/results', resultsRoutes);

// ─── Dashboard Routes ──────────────────────────────────────
// GET /api/dashboard  — fetch aggregated dashboard statistics
router.use('/dashboard', dashboardRoutes);

export default router;

