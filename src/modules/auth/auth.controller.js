import { sendSuccess } from '../../utils/response.util.js';
import * as authService from './auth.service.js';

/**
 * Authentication Controller
 * Handles HTTP requests for authentication
 */

/**
 * Register a new user
 * POST /api/auth/register
 */
export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await authService.registerUser(email, password);

        return sendSuccess(
            res,
            'User registered successfully',
            result,
            201
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Login user
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await authService.loginUser(email, password);

        return sendSuccess(
            res,
            'Login successful',
            result
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Get current user profile
 * GET /api/auth/me
 */
export const getMe = async (req, res, next) => {
    try {
        return sendSuccess(
            res,
            'User profile retrieved successfully',
            { user: req.user }
        );
    } catch (error) {
        next(error);
    }
};
