import prisma from '../prisma/client';

export interface UserResult {
  id: string;
  projectName: string;
  score: number;
  costEstimate: number;
  issuesCount: number;
  createdAt: Date;
}

/**
 * Get all analyses for a specific user.
 */
export async function getUserResults(userId: string): Promise<UserResult[]> {
  const analyses = await prisma.analysis.findMany({
    where: {
      project: {
        userId: userId,
      },
    },
    include: {
      project: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return analyses.map((a) => ({
    id: a.id,
    projectName: a.project.name,
    score: a.score,
    costEstimate: a.costEstimate,
    issuesCount: a.issuesCount,
    createdAt: a.createdAt,
  }));
}

/**
 * Get a specific analysis result by ID, ensuring it belongs to the user.
 */
export async function getResultById(userId: string, analysisId: string) {
  const analysis = await prisma.analysis.findFirst({
    where: {
      id: analysisId,
      project: {
        userId: userId,
      },
    },
    include: {
      suggestions: true,
      project: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!analysis) {
    return null;
  }

  return {
    ...analysis,
    projectName: analysis.project.name,
  };
}
