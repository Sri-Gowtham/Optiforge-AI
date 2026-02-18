// Mock Authentication API for Development
// This allows testing the frontend without a running backend

interface MockUser {
    id: string;
    email: string;
    name: string;
    createdAt: string;
}

interface MockAuthResponse {
    token: string;
    user: MockUser;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate a mock JWT token
const generateMockToken = (): string => {
    const randomString = Math.random().toString(36).substring(2);
    return `mock_token_${randomString}_${Date.now()}`;
};

// Get stored users from localStorage
const getStoredUsers = (): Record<string, MockUser & { password: string }> => {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem('mock_users');
    return stored ? JSON.parse(stored) : {};
};

// Save users to localStorage
const saveUsers = (users: Record<string, MockUser & { password: string }>) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('mock_users', JSON.stringify(users));
    }
};

/**
 * Mock signup API call
 */
export const mockSignup = async (data: {
    name: string;
    email: string;
    password: string;
}): Promise<MockAuthResponse> => {
    await delay(800); // Simulate network delay

    const users = getStoredUsers();

    // Check if user already exists
    if (users[data.email]) {
        throw {
            response: {
                status: 400,
                data: { message: 'User already exists with this email' },
            },
        };
    }

    // Create new user
    const newUser: MockUser & { password: string } = {
        id: `user_${Date.now()}`,
        email: data.email,
        name: data.name,
        password: data.password, // In real app, this would be hashed
        createdAt: new Date().toISOString(),
    };

    // Save user
    users[data.email] = newUser;
    saveUsers(users);

    // Return response without password
    const { password, ...userWithoutPassword } = newUser;
    return {
        token: generateMockToken(),
        user: userWithoutPassword,
    };
};

/**
 * Mock login API call
 */
export const mockLogin = async (data: {
    email: string;
    password: string;
}): Promise<MockAuthResponse> => {
    await delay(800); // Simulate network delay

    const users = getStoredUsers();
    const user = users[data.email];

    // Check if user exists
    if (!user) {
        throw {
            response: {
                status: 401,
                data: { message: 'Invalid email or password' },
            },
        };
    }

    // Check password
    if (user.password !== data.password) {
        throw {
            response: {
                status: 401,
                data: { message: 'Invalid email or password' },
            },
        };
    }

    // Return response without password
    const { password, ...userWithoutPassword } = user;
    return {
        token: generateMockToken(),
        user: userWithoutPassword,
    };
};

/**
 * Check if we should use mock API (when backend is not available)
 */
export const shouldUseMockAuth = (): boolean => {
    // Always use mock auth in development if NEXT_PUBLIC_USE_MOCK_AUTH is not set to 'false'
    return process.env.NEXT_PUBLIC_USE_MOCK_AUTH !== 'false';
};
