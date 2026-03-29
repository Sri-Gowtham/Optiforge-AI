import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes';

const router = Router();

// ─── Health Check ─────────────────────────────────────────
router.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ─── Auth Routes ──────────────────────────────────────────
router.use('/auth', authRoutes);

// ─── Future Routes ────────────────────────────────────────
// router.use('/projects', projectRoutes);
// router.use('/analysis', analysisRoutes);

export default router;

