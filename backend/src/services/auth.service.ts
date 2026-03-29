import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client';
import { env } from '../config/env';

// ─── Types ─────────────────────────────────────────────────

export interface RegisterInput {
    email: string;
    password: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface AuthTokenPayload {
    userId: string;
}

export interface AuthResult {
    token: string;
    user: {
        id: string;
        email: string;
        createdAt: Date;
    };
}

// ─── Helpers ───────────────────────────────────────────────

const SALT_ROUNDS = 12;

function generateToken(userId: string): string {
    return jwt.sign(
        { userId } satisfies AuthTokenPayload,
        env.JWT_SECRET,
        { expiresIn: env.JWT_EXPIRE as jwt.SignOptions['expiresIn'] }
    );
}

// ─── Service Functions ─────────────────────────────────────

/**
 * Register a new user.
 * Throws if email is already taken.
 */
export async function registerUser(input: RegisterInput): Promise<AuthResult> {
    const { email, password } = input;

    // 1. Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        const err = new Error('Email is already registered') as Error & { statusCode: number };
        err.statusCode = 409;
        throw err;
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // 3. Create user
    const user = await prisma.user.create({
        data: { email, password: hashedPassword },
        select: { id: true, email: true, createdAt: true },
    });

    // 4. Generate token
    const token = generateToken(user.id);

    return { token, user };
}

/**
 * Login an existing user.
 * Throws if credentials are invalid.
 */
export async function loginUser(input: LoginInput): Promise<AuthResult> {
    const { email, password } = input;

    // 1. Find user (include password for comparison)
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        const err = new Error('Invalid email or password') as Error & { statusCode: number };
        err.statusCode = 401;
        throw err;
    }

    // 2. Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        const err = new Error('Invalid email or password') as Error & { statusCode: number };
        err.statusCode = 401;
        throw err;
    }

    // 3. Generate token
    const token = generateToken(user.id);

    return {
        token,
        user: { id: user.id, email: user.email, createdAt: user.createdAt },
    };
}
