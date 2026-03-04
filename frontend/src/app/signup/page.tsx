"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();

    return (
        <div className="min-h-screen bg-bg-page flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-[420px]">

                {/* ── Logo & Brand ── */}
                <div className="flex flex-col items-center mb-10">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary shadow-lg shadow-primary/20 mb-5">
                        <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-semibold text-text-dark tracking-tight">
                        Create your account
                    </h1>
                    <p className="text-sm text-text-light mt-1.5">
                        Get started with OptiForge AI
                    </p>
                </div>

                {/* ── Card ── */}
                <div className="bg-white rounded-card shadow-card-soft p-8 sm:p-10">
                    <form onSubmit={(e) => { e.preventDefault(); router.push("/dashboard"); }} className="space-y-5">

                        {/* Full Name */}
                        <div>
                            <label
                                htmlFor="signup-name"
                                className="block text-[13px] font-medium text-text-medium mb-2"
                            >
                                Full Name
                            </label>
                            <input
                                id="signup-name"
                                type="text"
                                autoComplete="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full h-11 px-3.5 text-sm border border-border rounded-lg bg-bg-page text-text-dark placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                  transition-all duration-150"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="signup-email"
                                className="block text-[13px] font-medium text-text-medium mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                id="signup-email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@company.com"
                                className="w-full h-11 px-3.5 text-sm border border-border rounded-lg bg-bg-page text-text-dark placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                  transition-all duration-150"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="signup-password"
                                className="block text-[13px] font-medium text-text-medium mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="signup-password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a strong password"
                                    className="w-full h-11 px-3.5 pr-10 text-sm border border-border rounded-lg bg-bg-page text-text-dark placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                    transition-all duration-150"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-text-medium transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="signup-confirm"
                                className="block text-[13px] font-medium text-text-medium mb-2"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="signup-confirm"
                                    type={showConfirm ? "text" : "password"}
                                    autoComplete="new-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter your password"
                                    className="w-full h-11 px-3.5 pr-10 text-sm border border-border rounded-lg bg-bg-page text-text-dark placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                    transition-all duration-150"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-text-medium transition-colors"
                                    aria-label={showConfirm ? "Hide password" : "Show password"}
                                >
                                    {showConfirm ? (
                                        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full h-11 bg-primary text-white text-sm font-semibold rounded-lg
                hover:bg-primary-dark active:scale-[0.98]
                shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30
                transition-all duration-150 mt-1"
                        >
                            Create Account
                        </button>
                    </form>
                </div>

                {/* ── Footer ── */}
                <p className="text-center text-sm text-text-light mt-8">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-primary font-semibold hover:text-primary-dark transition-colors"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
