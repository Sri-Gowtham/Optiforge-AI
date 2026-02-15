'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout, getCurrentUser } from '@/lib/auth';

const Navbar: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();
    const user = getCurrentUser();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
            {/* Page Title - will be dynamic based on route */}
            <div>
                <h2 className="text-2xl font-semibold text-slate-dark">Dashboard</h2>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
                {/* Notifications Icon */}
                <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <span className="text-2xl">🔔</span>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-warning rounded-full"></span>
                </button>

                {/* User Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center space-x-3 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors"
                    >
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-medium text-slate-dark">
                                {user?.name || 'User'}
                            </p>
                            <p className="text-xs text-gray-500">
                                {user?.email || 'user@example.com'}
                            </p>
                        </div>
                        <span className="text-gray-400">▼</span>
                    </button>

                    {/* Dropdown Menu */}
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                            <button
                                onClick={() => {
                                    setShowDropdown(false);
                                    router.push('/profile');
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-slate-dark"
                            >
                                👤 Profile
                            </button>
                            <button
                                onClick={() => {
                                    setShowDropdown(false);
                                    router.push('/dashboard');
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-slate-dark"
                            >
                                ⚙️ Settings
                            </button>
                            <hr className="my-2 border-gray-200" />
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 hover:bg-warning hover:text-white transition-colors text-warning font-medium"
                            >
                                🚪 Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
