import validator from 'validator';
import { ValidationError } from '../utils/errors.util.js';

/**
 * Request Validation Middleware
 * Extensible validation structure for request data
 */

/**
 * Validate email format
 */
export const validateEmail = (email) => {
    if (!email || !validator.isEmail(email)) {
        throw new ValidationError('Please provide a valid email address');
    }
    return true;
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
    if (!password || password.length < 6) {
        throw new ValidationError('Password must be at least 6 characters long');
    }
    return true;
};

/**
 * Validate required fields
 */
export const validateRequired = (fields, data) => {
    const missingFields = [];

    fields.forEach((field) => {
        if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
            missingFields.push(field);
        }
    });

    if (missingFields.length > 0) {
        throw new ValidationError(`Missing required fields: ${missingFields.join(', ')}`);
    }

    return true;
};

/**
 * Registration validation middleware
 */
export const validateRegistration = (req, res, next) => {
    try {
        const { email, password } = req.body;

        validateRequired(['email', 'password'], req.body);
        validateEmail(email);
        validatePassword(password);

        next();
    } catch (error) {
        next(error);
    }
};

/**
 * Login validation middleware
 */
export const validateLogin = (req, res, next) => {
    try {
        const { email, password } = req.body;

        validateRequired(['email', 'password'], req.body);
        validateEmail(email);

        next();
    } catch (error) {
        next(error);
    }
};

/**
 * Project validation middleware
 */
export const validateProject = (req, res, next) => {
    try {
        const { name } = req.body;

        validateRequired(['name'], req.body);

        if (name.length < 3) {
            throw new ValidationError('Project name must be at least 3 characters long');
        }

        next();
    } catch (error) {
        next(error);
    }
};
