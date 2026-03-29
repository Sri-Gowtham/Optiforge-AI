import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from '../../services/auth.service';

// ─── POST /api/auth/register ───────────────────────────────

export async function register(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { email, password } = req.body as { email?: string; password?: string };

        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'Email and password are required',
            });
            return;
        }

        if (password.length < 6) {
            res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters',
            });
            return;
        }

        const result = await registerUser({ email: email.toLowerCase().trim(), password });

        res.status(201).json({
            success: true,
            data: {
                token: result.token,
                user: result.user,
            },
        });
    } catch (err) {
        next(err);
    }
}

// ─── POST /api/auth/login ──────────────────────────────────

export async function login(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { email, password } = req.body as { email?: string; password?: string };

        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'Email and password are required',
            });
            return;
        }

        const result = await loginUser({ email: email.toLowerCase().trim(), password });

        res.status(200).json({
            success: true,
            data: {
                token: result.token,
                user: result.user,
            },
        });
    } catch (err) {
        next(err);
    }
}
