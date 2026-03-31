// Type definitions for OptiForge AI

export interface User {
    id: string;
    name?: string;
    email: string;
    createdAt: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    userId: string;
}

export interface AISuggestion {
    title: string;
    description: string;
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
    impact: string;
}

export interface Analysis {
    id: string;
    projectId: string;
    projectName: string;
    score: number;
    costEstimate: number;
    issuesCount: number;
    createdAt: string;
    suggestions?: AISuggestion[];
}

export interface DashboardStats {
    totalProjects: number;
    totalAnalyses: number;
    averageScore: number;
    recentAnalyses: {
        id: string;
        projectName: string;
        score: number;
        createdAt: string;
    }[];
    scoreDistribution: {
        high: number;
        medium: number;
        low: number;
    };
}

export interface AuthResponse {
    success: boolean;
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
