import { Request, Response, NextFunction } from 'express';
import * as analysisService from '../../services/analysis.service';

/**
 * POST /api/projects/:projectId/analyses
 * Trigger a new analysis for a project.
 */
export async function runAnalysis(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const userId = req.userId;
        const { projectId } = req.params;

        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized: User ID missing' });
            return;
        }

        const analysis = await analysisService.runAnalysis(projectId, userId);

        res.status(201).json({
            success: true,
            message: 'Analysis completed successfully',
            data: analysis,
        });
    } catch (err) {
        const error = err as Error & { statusCode?: number };
        if (error.statusCode === 404) {
            res.status(404).json({ success: false, message: error.message });
            return;
        }
        next(err);
    }
}

/**
 * GET /api/projects/:projectId/analyses
 * List all analyses for a project.
 */
export async function listAnalyses(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const userId = req.userId;
        const { projectId } = req.params;

        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized: User ID missing' });
            return;
        }

        const analyses = await analysisService.getProjectAnalyses(projectId, userId);

        res.status(200).json({ success: true, data: analyses });
    } catch (err) {
        const error = err as Error & { statusCode?: number };
        if (error.statusCode === 404) {
            res.status(404).json({ success: false, message: error.message });
            return;
        }
        next(err);
    }
}

/**
 * GET /api/analyses/:analysisId
 * Get a specific analysis by its ID.
 */
export async function getAnalysis(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const userId = req.userId;
        const { analysisId } = req.params;

        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized: User ID missing' });
            return;
        }

        const analysis = await analysisService.getAnalysis(analysisId, userId);

        res.status(200).json({ success: true, data: analysis });
    } catch (err) {
        const error = err as Error & { statusCode?: number };
        if (error.statusCode === 404) {
            res.status(404).json({ success: false, message: error.message });
            return;
        }
        next(err);
    }
}
