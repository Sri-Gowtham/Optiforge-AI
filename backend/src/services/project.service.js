import prisma from '../config/database.js';
import { NotFoundError, ForbiddenError } from '../utils/errors.util.js';

/**
 * Project Service
 * Business logic for project management
 */

/**
 * Create a new project
 */
export const createProject = async (userId, projectData) => {
    const { name, description } = projectData;

    const project = await prisma.project.create({
        data: {
            name,
            description,
            userId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                },
            },
        },
    });

    return project;
};

/**
 * Get all projects for a user
 */
export const getUserProjects = async (userId) => {
    const projects = await prisma.project.findMany({
        where: { userId },
        include: {
            designs: {
                select: {
                    id: true,
                    type: true,
                    createdAt: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return projects;
};

/**
 * Get a single project by ID
 */
export const getProjectById = async (projectId, userId) => {
    const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: {
            designs: {
                include: {
                    analysis: true,
                },
            },
            user: {
                select: {
                    id: true,
                    email: true,
                },
            },
        },
    });

    if (!project) {
        throw new NotFoundError('Project not found');
    }

    // Check ownership
    if (project.userId !== userId) {
        throw new ForbiddenError('You do not have access to this project');
    }

    return project;
};

/**
 * Update a project
 */
export const updateProject = async (projectId, userId, updateData) => {
    // Check if project exists and user owns it
    const existingProject = await prisma.project.findUnique({
        where: { id: projectId },
    });

    if (!existingProject) {
        throw new NotFoundError('Project not found');
    }

    if (existingProject.userId !== userId) {
        throw new ForbiddenError('You do not have permission to update this project');
    }

    // Update project
    const project = await prisma.project.update({
        where: { id: projectId },
        data: updateData,
        include: {
            designs: true,
        },
    });

    return project;
};

/**
 * Delete a project
 */
export const deleteProject = async (projectId, userId) => {
    // Check if project exists and user owns it
    const existingProject = await prisma.project.findUnique({
        where: { id: projectId },
    });

    if (!existingProject) {
        throw new NotFoundError('Project not found');
    }

    if (existingProject.userId !== userId) {
        throw new ForbiddenError('You do not have permission to delete this project');
    }

    // Delete project (cascade will handle designs and analyses)
    await prisma.project.delete({
        where: { id: projectId },
    });

    return { message: 'Project deleted successfully' };
};
