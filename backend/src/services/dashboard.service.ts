import prisma from '../prisma/client';

export interface DashboardStats {
  totalProjects: number;
  totalAnalyses: number;
  averageScore: number;
  recentAnalyses: {
    id: string;
    projectName: string;
    score: number;
    createdAt: Date;
  }[];
  scoreDistribution: {
    high: number;
    medium: number;
    low: number;
  };
}

/**
 * Fetch aggregated dashboard statistics for a specific user.
 */
export async function getDashboardStats(userId: string): Promise<DashboardStats> {
  const [
    totalProjects,
    totalAnalyses,
    avgResult,
    recentAnalysesRaw,
    highCount,
    mediumCount,
    lowCount,
  ] = await Promise.all([
    prisma.project.count({ where: { userId } }),
    prisma.analysis.count({ where: { project: { userId } } }),
    prisma.analysis.aggregate({
      where: { project: { userId } },
      _avg: { score: true },
    }),
    prisma.analysis.findMany({
      where: { project: { userId } },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { project: { select: { name: true } } },
    }),
    prisma.analysis.count({
      where: { project: { userId }, score: { gt: 70 } },
    }),
    prisma.analysis.count({
      where: { project: { userId }, score: { gte: 40, lte: 70 } },
    }),
    prisma.analysis.count({
      where: { project: { userId }, score: { lt: 40 } },
    }),
  ]);

  return {
    totalProjects,
    totalAnalyses,
    averageScore: avgResult._avg.score || 0,
    recentAnalyses: recentAnalysesRaw.map((a) => ({
      id: a.id,
      projectName: a.project.name,
      score: a.score,
      createdAt: a.createdAt,
    })),
    scoreDistribution: {
      high: highCount,
      medium: mediumCount,
      low: lowCount,
    },
  };
}
