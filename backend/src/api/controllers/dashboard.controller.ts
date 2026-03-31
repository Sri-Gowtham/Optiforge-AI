import { Request, Response, NextFunction } from 'express';
import * as dashboardService from '../../services/dashboard.service';

/**
 * GET /api/dashboard
 * Return aggregated statistics for the user.
 */
export async function getDashboardStats(
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

    const stats = await dashboardService.getDashboardStats(userId as string);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (err) {
    next(err);
  }
}
