import prisma from '../../config/database.js';
import { NotFoundError, ValidationError } from '../../utils/errors.util.js';

/**
 * Analysis Service
 * Business logic for analysis management
 */

/**
 * Create a new analysis report
 */
export const createAnalysis = async (userId, analysisData) => {
    const { score, warnings, costEstimate, designId } = analysisData;

    // Verify design exists and user owns it
    const design = await prisma.design.findUnique({
        where: { id: designId },
        include: {
            project: {
                select: {
                    userId: true,
                },
            },
        },
    });

    if (!design) {
        throw new NotFoundError('Design not found');
    }

    if (design.project.userId !== userId) {
        throw new ValidationError('You do not have access to this design');
    }

    // Check if analysis already exists
    const existingAnalysis = await prisma.analysis.findUnique({
        where: { designId },
    });

    if (existingAnalysis) {
        throw new ValidationError('Analysis already exists for this design. Update instead.');
    }

    // Validate score
    if (score < 0 || score > 100) {
        throw new ValidationError('Score must be between 0 and 100');
    }

    // Create analysis
    const analysis = await prisma.analysis.create({
        data: {
            score,
            warnings: JSON.stringify(warnings || []),
            costEstimate,
            designId,
        },
        include: {
            design: {
                select: {
                    id: true,
                    type: true,
                    projectId: true,
                },
            },
        },
    });

    return {
        ...analysis,
        warnings: JSON.parse(analysis.warnings),
    };
};

/**
 * Get analysis for a design
 */
export const getAnalysisByDesignId = async (designId, userId) => {
    // Verify design exists and user owns it
    const design = await prisma.design.findUnique({
        where: { id: designId },
        include: {
            project: {
                select: {
                    userId: true,
                },
            },
        },
    });

    if (!design) {
        throw new NotFoundError('Design not found');
    }

    if (design.project.userId !== userId) {
        throw new ValidationError('You do not have access to this design');
    }

    const analysis = await prisma.analysis.findUnique({
        where: { designId },
        include: {
            design: {
                select: {
                    id: true,
                    type: true,
                    parameters: true,
                    projectId: true,
                },
            },
        },
    });

    if (!analysis) {
        throw new NotFoundError('Analysis not found for this design');
    }

    return {
        ...analysis,
        warnings: JSON.parse(analysis.warnings),
        design: {
            ...analysis.design,
            parameters: JSON.parse(analysis.design.parameters),
        },
    };
};

/**
 * Update an analysis report
 */
export const updateAnalysis = async (designId, userId, updateData) => {
    // Verify design exists and user owns it
    const design = await prisma.design.findUnique({
        where: { id: designId },
        include: {
            project: {
                select: {
                    userId: true,
                },
            },
        },
    });

    if (!design) {
        throw new NotFoundError('Design not found');
    }

    if (design.project.userId !== userId) {
        throw new ValidationError('You do not have access to this design');
    }

    // Prepare update data
    const dataToUpdate = {};
    if (updateData.score !== undefined) {
        if (updateData.score < 0 || updateData.score > 100) {
            throw new ValidationError('Score must be between 0 and 100');
        }
        dataToUpdate.score = updateData.score;
    }
    if (updateData.warnings !== undefined) {
        dataToUpdate.warnings = JSON.stringify(updateData.warnings);
    }
    if (updateData.costEstimate !== undefined) {
        dataToUpdate.costEstimate = updateData.costEstimate;
    }

    const analysis = await prisma.analysis.update({
        where: { designId },
        data: dataToUpdate,
        include: {
            design: true,
        },
    });

    return {
        ...analysis,
        warnings: JSON.parse(analysis.warnings),
    };
};
