import prisma from '../../config/database.js';
import { NotFoundError, ValidationError } from '../../utils/errors.util.js';

/**
 * Design Service
 * Business logic for design management
 */

/**
 * Create a new design
 */
export const createDesign = async (userId, designData) => {
    const { type, parameters, projectId } = designData;

    // Verify project exists and user owns it
    const project = await prisma.project.findUnique({
        where: { id: projectId },
    });

    if (!project) {
        throw new NotFoundError('Project not found');
    }

    if (project.userId !== userId) {
        throw new ValidationError('You do not have access to this project');
    }

    // Validate design type
    if (!['manual', 'ai-generated'].includes(type)) {
        throw new ValidationError('Design type must be either "manual" or "ai-generated"');
    }

    // Create design
    const design = await prisma.design.create({
        data: {
            type,
            parameters: JSON.stringify(parameters),
            projectId,
        },
        include: {
            project: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    // Parse parameters back to object
    return {
        ...design,
        parameters: JSON.parse(design.parameters),
    };
};

/**
 * Get designs for a project
 */
export const getProjectDesigns = async (projectId, userId) => {
    // Verify project exists and user owns it
    const project = await prisma.project.findUnique({
        where: { id: projectId },
    });

    if (!project) {
        throw new NotFoundError('Project not found');
    }

    if (project.userId !== userId) {
        throw new ValidationError('You do not have access to this project');
    }

    const designs = await prisma.design.findMany({
        where: { projectId },
        include: {
            analysis: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    // Parse parameters for each design
    return designs.map((design) => ({
        ...design,
        parameters: JSON.parse(design.parameters),
        analysis: design.analysis
            ? {
                ...design.analysis,
                warnings: JSON.parse(design.analysis.warnings),
            }
            : null,
    }));
};

/**
 * Get a single design by ID
 */
export const getDesignById = async (designId, userId) => {
    const design = await prisma.design.findUnique({
        where: { id: designId },
        include: {
            project: {
                select: {
                    id: true,
                    name: true,
                    userId: true,
                },
            },
            analysis: true,
        },
    });

    if (!design) {
        throw new NotFoundError('Design not found');
    }

    if (design.project.userId !== userId) {
        throw new ValidationError('You do not have access to this design');
    }

    return {
        ...design,
        parameters: JSON.parse(design.parameters),
        analysis: design.analysis
            ? {
                ...design.analysis,
                warnings: JSON.parse(design.analysis.warnings),
            }
            : null,
    };
};
