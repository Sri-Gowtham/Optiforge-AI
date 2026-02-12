import { sendError } from '../utils/response.util.js';

/**
 * Global Error Handling Middleware
 * Centralized error handling with proper logging and response formatting
 */
export const errorHandler = (err, req, res, next) => {
    // Default error values
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal server error';

    // Log error in development
    if (process.env.NODE_ENV === 'development') {
        console.error('❌ Error:', {
            message: err.message,
            stack: err.stack,
            statusCode,
        });
    }

    // Handle Prisma errors
    if (err.code === 'P2002') {
        statusCode = 409;
        message = 'Resource already exists with this unique field';
    } else if (err.code === 'P2025') {
        statusCode = 404;
        message = 'Resource not found';
    } else if (err.code?.startsWith('P')) {
        statusCode = 400;
        message = 'Database operation failed';
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    } else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }

    // Handle validation errors
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.message;
    }

    // Send error response
    return sendError(res, message, statusCode);
};

/**
 * 404 Not Found Handler
 */
export const notFoundHandler = (req, res, next) => {
    return sendError(res, `Route ${req.originalUrl} not found`, 404);
};
