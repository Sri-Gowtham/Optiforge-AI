import { Router } from 'express';
import * as projectController from '../controllers/project.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

// ─── Project Routes ──────────────────────────────────────────

/**
 * All routes are protected by auth middleware.
 * req.userId is extracted from the JWT token and used for filtering.
 */

// POST /api/projects - Create a new project
router.post('/', authenticate, projectController.create);

// GET /api/projects - List all user projects
router.get('/', authenticate, projectController.list);

// GET /api/projects/:id - Get specific project by ID
router.get('/:id', authenticate, projectController.getById);

export default router;
