"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="min-h-screen bg-bg-page flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary mb-4">
                        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-semibold text-text-dark">Create your account</h1>
                    <p className="text-sm text-text-medium mt-1">Get started with OptiForge AI</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-card border border-gray-200 p-8">
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                        <div>
                            <label className="block text-xs font-medium text-text-medium mb-1.5">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-bg-page text-text-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-text-medium mb-1.5">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@company.com"
                                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-bg-page text-text-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-text-medium mb-1.5">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a strong password"
                                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-bg-page text-text-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
                        >
                            Create Account
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-text-medium mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary font-medium hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
