'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import { setToken, setCurrentUser } from '@/lib/auth';
import api from '@/lib/api';

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            // Use mock auth for development (when backend is not running)
            const { mockSignup, shouldUseMockAuth } = await import('@/lib/mockAuth');

            let response;
            if (shouldUseMockAuth()) {
                // Use mock authentication
                const mockResponse = await mockSignup({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });
                response = { data: mockResponse };
            } else {
                // Use real API
                response = await api.post('/auth/signup', {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });
            }

            const { token, user } = response.data;

            setToken(token);
            setCurrentUser(user);
            router.push('/dashboard');
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            setError(error.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/">
                        <h1 className="text-4xl font-bold text-primary mb-2">OptiForge AI</h1>
                    </Link>
                    <p className="text-slate-medium">Create your account</p>
                </div>

                {/* Signup Form */}
                <div className="bg-white rounded-card shadow-lg p-8">
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            label="Full Name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            required
                        />

                        <FormInput
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="you@example.com"
                            required
                        />

                        <FormInput
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Create a password"
                            helperText="Minimum 8 characters"
                            required
                        />

                        <FormInput
                            label="Confirm Password"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            placeholder="Confirm your password"
                            required
                        />

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-warning rounded-lg text-warning text-sm">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full mb-4"
                            disabled={loading}
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </Button>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-slate-medium">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary hover:underline font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <Link href="/" className="text-slate-medium hover:text-primary">
                        ← Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
}
