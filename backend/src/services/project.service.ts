import prisma from '../prisma/client';

/**
 * Create a new project for a user.
 */
export async function createProject(userId: string, name: string, description?: string) {
    return await prisma.project.create({
        data: {
            name,
            description,
            userId,
        },
    });
}

/**
 * Get all projects belonging to a specific user.
 */
export async function getProjects(userId: string) {
    return await prisma.project.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
}

/**
 * Get a specific project by ID, ensuring it belongs to the user.
 */
export async function getProjectById(userId: string, projectId: string) {
    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            userId,
        },
    });

    if (!project) {
        const err = new Error('Project not found or access denied') as Error & { statusCode: number };
        err.statusCode = 404;
        throw err;
    }

    return project;
}
