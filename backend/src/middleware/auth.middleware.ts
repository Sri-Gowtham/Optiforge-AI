import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import type { AuthTokenPayload } from '../services/auth.service';

// ─── Extend Express Request ────────────────────────────────
// Augment the global Express namespace so `req.userId` is
// available type-safely in any downstream handler.

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

// ─── Middleware ────────────────────────────────────────────

export function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
            success: false,
            message: 'Authorization token is missing or malformed',
        });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as AuthTokenPayload;
        req.userId = decoded.userId;
        next();
    } catch {
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
        });
    }
}
