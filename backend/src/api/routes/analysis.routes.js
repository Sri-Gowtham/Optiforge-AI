import express from 'express';
import * as analysisController from '../controllers/analysis.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * Analysis Routes
 * Base path: /api/analysis
 * All routes are protected (require authentication)
 */

// @route   POST /api/analysis
// @desc    Create a new analysis report
// @access  Private
router.post('/', authenticate, analysisController.createAnalysis);

// @route   GET /api/analysis/design/:designId
// @desc    Get analysis for a specific design
// @access  Private
router.get('/design/:designId', authenticate, analysisController.getAnalysis);

// @route   PUT /api/analysis/design/:designId
// @desc    Update an analysis report
// @access  Private
router.put('/design/:designId', authenticate, analysisController.updateAnalysis);

export default router;
