import { Request, Response, NextFunction } from 'express';
import * as resultsService from '../../services/results.service';

/**
 * GET /api/results
 * Returns all results for the authenticated user.
 */
export async function getResults(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized: No user ID found' });
      return;
    }

    const data = await resultsService.getUserResults(userId as string);

    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/results/:id
 * Returns a specific result by ID.
 */
export async function getResultById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.userId;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized: No user ID found' });
      return;
    }

    const data = await resultsService.getResultById(userId as string, id as string);

    if (!data) {
      res.status(404).json({ success: false, message: 'Result not found' });
      return;
    }

    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
}
