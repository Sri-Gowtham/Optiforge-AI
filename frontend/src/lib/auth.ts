import { User } from '@/types';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

/**
 * Store authentication token in localStorage
 */
export const setToken = (token: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(TOKEN_KEY, token);
    }
};

/**
 * Retrieve authentication token from localStorage
 */
export const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(TOKEN_KEY);
    }
    return null;
};

/**
 * Remove authentication token from localStorage
 */
export const removeToken = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    }
};

/**
 * Store user data in localStorage
 */
export const setCurrentUser = (user: User): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
};

/**
 * Retrieve current user data from localStorage
 */
export const getCurrentUser = (): User | null => {
    if (typeof window !== 'undefined') {
        const userStr = localStorage.getItem(USER_KEY);
        if (userStr) {
            try {
                return JSON.parse(userStr) as User;
            } catch (error) {
                console.error('Error parsing user data:', error);
                return null;
            }
        }
    }
    return null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
    return getToken() !== null;
};

/**
 * Logout user by clearing all auth data
 */
export const logout = (): void => {
    removeToken();
    if (typeof window !== 'undefined') {
        window.location.href = '/login';
    }
};
