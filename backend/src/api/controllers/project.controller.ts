import { Request, Response, NextFunction } from 'express';
import * as projectService from '../../services/project.service';

/**
 * Handle POST /projects
 */
export async function create(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const userId = req.userId;
        const { name, description } = req.body as { name?: string; description?: string };

        if (!userId) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized: User ID missing',
            });
            return;
        }

        if (!name) {
            res.status(400).json({
                success: false,
                message: 'Project name is required',
            });
            return;
        }

        const project = await projectService.createProject(userId, name, description);

        res.status(201).json({
            success: true,
            data: project,
        });
    } catch (err) {
        next(err);
    }
}

/**
 * Handle GET /projects
 */
export async function list(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized: User ID missing',
            });
            return;
        }

        const projects = await projectService.getProjects(userId);

        res.status(200).json({
            success: true,
            data: projects,
        });
    } catch (err) {
        next(err);
    }
}

/**
 * Handle GET /projects/:id
 */
export async function getById(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const userId = req.userId;
        const { id } = req.params;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized: User ID missing',
            });
            return;
        }

        const project = await projectService.getProjectById(userId, id as string);

        res.status(200).json({
            success: true,
            data: project,
        });
    } catch (err) {
        // If it's a 404 from service, handle it specifically
        const error = err as Error & { statusCode?: number };
        if (error.statusCode === 404) {
            res.status(404).json({
                success: false,
                message: error.message,
            });
            return;
        }
        next(err);
    }
}
