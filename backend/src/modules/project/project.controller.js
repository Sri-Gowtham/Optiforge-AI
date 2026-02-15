import { sendSuccess } from '../../utils/response.util.js';
import * as projectService from './project.service.js';

/**
 * Project Controller
 * Handles HTTP requests for project management
 */

/**
 * Create a new project
 * POST /api/projects
 */
export const createProject = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const projectData = req.body;

        const project = await projectService.createProject(userId, projectData);

        return sendSuccess(
            res,
            'Project created successfully',
            { project },
            201
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Get all user projects
 * GET /api/projects
 */
export const getProjects = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const projects = await projectService.getUserProjects(userId);

        return sendSuccess(
            res,
            'Projects retrieved successfully',
            { projects, count: projects.length }
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Get a single project
 * GET /api/projects/:id
 */
export const getProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const project = await projectService.getProjectById(id, userId);

        return sendSuccess(
            res,
            'Project retrieved successfully',
            { project }
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Update a project
 * PUT /api/projects/:id
 */
export const updateProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const updateData = req.body;

        const project = await projectService.updateProject(id, userId, updateData);

        return sendSuccess(
            res,
            'Project updated successfully',
            { project }
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Delete a project
 * DELETE /api/projects/:id
 */
export const deleteProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        await projectService.deleteProject(id, userId);

        return sendSuccess(
            res,
            'Project deleted successfully',
            null
        );
    } catch (error) {
        next(error);
    }
};
