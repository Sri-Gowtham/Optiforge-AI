import { sendSuccess } from '../../utils/response.util.js';
import * as analysisService from '../../services/analysis.service.js';

/**
 * Analysis Controller
 * Handles HTTP requests for analysis management
 */

/**
 * Create a new analysis report
 * POST /api/analysis
 */
export const createAnalysis = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const analysisData = req.body;

        const analysis = await analysisService.createAnalysis(userId, analysisData);

        return sendSuccess(
            res,
            'Analysis created successfully',
            { analysis },
            201
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Get analysis for a design
 * GET /api/analysis/design/:designId
 */
export const getAnalysis = async (req, res, next) => {
    try {
        const { designId } = req.params;
        const userId = req.user.id;

        const analysis = await analysisService.getAnalysisByDesignId(designId, userId);

        return sendSuccess(
            res,
            'Analysis retrieved successfully',
            { analysis }
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Update an analysis report
 * PUT /api/analysis/design/:designId
 */
export const updateAnalysis = async (req, res, next) => {
    try {
        const { designId } = req.params;
        const userId = req.user.id;
        const updateData = req.body;

        const analysis = await analysisService.updateAnalysis(designId, userId, updateData);

        return sendSuccess(
            res,
            'Analysis updated successfully',
            { analysis }
        );
    } catch (error) {
        next(error);
    }
};
