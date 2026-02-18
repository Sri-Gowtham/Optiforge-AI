import express from 'express';
import * as projectController from '../controllers/project.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validateProject } from '../../middlewares/validate.middleware.js';

const router = express.Router();

/**
 * Project Routes
 * Base path: /api/projects
 * All routes are protected (require authentication)
 */

// @route   POST /api/projects
// @desc    Create a new project
// @access  Private
router.post('/', authenticate, validateProject, projectController.createProject);

// @route   GET /api/projects
// @desc    Get all user projects
// @access  Private
router.get('/', authenticate, projectController.getProjects);

// @route   GET /api/projects/:id
// @desc    Get a single project
// @access  Private
router.get('/:id', authenticate, projectController.getProject);

// @route   PUT /api/projects/:id
// @desc    Update a project
// @access  Private
router.put('/:id', authenticate, validateProject, projectController.updateProject);

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Private
router.delete('/:id', authenticate, projectController.deleteProject);

export default router;
