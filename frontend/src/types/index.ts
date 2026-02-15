// Type definitions for OptiForge AI

export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'completed' | 'pending';
    createdAt: string;
    userId: string;
}

export interface Design {
    id: string;
    projectId: string;
    type: 'manual' | 'ai-generated';
    specifications: Record<string, unknown>;
    createdAt: string;
}

export interface Analysis {
    id: string;
    projectId: string;
    designId: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    results: Record<string, unknown>;
    createdAt: string;
    completedAt?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials {
    name: string;
    email: string;
    password: string;
}
