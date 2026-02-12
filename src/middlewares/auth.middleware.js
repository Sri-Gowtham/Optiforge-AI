import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.js';
import { AuthError } from '../utils/errors.util.js';

/**
 * JWT Authentication Middleware
 * Verifies JWT token and attaches user info to request
 */
export const authenticate = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AuthError('No token provided. Please login to continue.');
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, jwtConfig.secret);

        // Attach user info to request
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        };

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            next(new AuthError('Invalid token. Please login again.'));
        } else if (error.name === 'TokenExpiredError') {
            next(new AuthError('Token expired. Please login again.'));
        } else {
            next(error);
        }
    }
};

/**
 * Role-based Authorization Middleware
 * @param {...String} roles - Allowed roles
 */
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new AuthError('Authentication required'));
        }

        if (!roles.includes(req.user.role)) {
            return next(new AuthError('You do not have permission to perform this action'));
        }

        next();
    };
};
