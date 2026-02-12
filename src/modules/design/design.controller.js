import { sendSuccess } from '../../utils/response.util.js';
import * as designService from './design.service.js';

/**
 * Design Controller
 * Handles HTTP requests for design management
 */

/**
 * Create a new design
 * POST /api/designs
 */
export const createDesign = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const designData = req.body;

        const design = await designService.createDesign(userId, designData);

        return sendSuccess(
            res,
            'Design created successfully',
            { design },
            201
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Get designs for a project
 * GET /api/designs/project/:projectId
 */
export const getProjectDesigns = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const userId = req.user.id;

        const designs = await designService.getProjectDesigns(projectId, userId);

        return sendSuccess(
            res,
            'Designs retrieved successfully',
            { designs, count: designs.length }
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Get a single design
 * GET /api/designs/:id
 */
export const getDesign = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const design = await designService.getDesignById(id, userId);

        return sendSuccess(
            res,
            'Design retrieved successfully',
            { design }
        );
    } catch (error) {
        next(error);
    }
};
