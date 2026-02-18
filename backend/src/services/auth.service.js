import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';
import { jwtConfig } from '../config/jwt.js';
import { ValidationError, ConflictError, AuthError } from '../utils/errors.util.js';

/**
 * Authentication Service
 * Business logic for user authentication and token management
 */

/**
 * Register a new user
 */
export const registerUser = async (email, password) => {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new ConflictError('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role: 'user',
        },
        select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });

    // Generate JWT token
    const token = generateToken(user);

    return { user, token };
};

/**
 * Login user
 */
export const loginUser = async (email, password) => {
    // Find user by email
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new AuthError('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new AuthError('Invalid email or password');
    }

    // Generate JWT token
    const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
};

/**
 * Generate JWT token
 */
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
    );
};
