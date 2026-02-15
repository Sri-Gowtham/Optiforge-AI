import express from 'express';
import * as designController from './design.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * Design Routes
 * Base path: /api/designs
 * All routes are protected (require authentication)
 */

// @route   POST /api/designs
// @desc    Create a new design
// @access  Private
router.post('/', authenticate, designController.createDesign);

// @route   GET /api/designs/project/:projectId
// @desc    Get all designs for a project
// @access  Private
router.get('/project/:projectId', authenticate, designController.getProjectDesigns);

// @route   GET /api/designs/:id
// @desc    Get a single design
// @access  Private
router.get('/:id', authenticate, designController.getDesign);

export default router;
