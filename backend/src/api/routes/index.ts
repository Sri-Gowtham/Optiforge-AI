import { Router, Request, Response } from 'express';

const router = Router();

// Health check
router.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'OK' });
});

// Future route registrations go here
// router.use('/auth', authRoutes);
// router.use('/projects', projectRoutes);

export default router;
