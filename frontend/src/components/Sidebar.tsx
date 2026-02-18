'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar: React.FC = () => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: '📊' },
        { name: 'Projects', path: '/projects', icon: '📁' },
        { name: 'Manual Design', path: '/manual-design', icon: '✏️' },
        { name: 'AI Generator', path: '/ai-generator', icon: '🤖' },
        { name: 'Analysis', path: '/analysis', icon: '📈' },
        { name: 'Results', path: '/results', icon: '✅' },
        { name: 'Profile', path: '/profile', icon: '👤' },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <div className="h-screen w-64 bg-slate-dark text-white fixed left-0 top-0 flex flex-col shadow-xl">
            {/* Logo/Brand */}
            <div className="p-6 border-b border-gray-700">
                <Link href="/dashboard">
                    <h1 className="text-2xl font-bold text-primary">OptiForge AI</h1>
                    <p className="text-sm text-slate-medium mt-1">Design Optimization</p>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6">
                <ul className="space-y-2 px-4">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                href={item.path}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive(item.path)
                                    ? 'bg-primary text-white shadow-md'
                                    : 'hover:bg-slate-medium text-gray-200 hover:text-white'
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700">
                <p className="text-xs text-gray-400 text-center">
                    © 2026 OptiForge AI
                </p>
            </div>
        </div>
    );
};

export default Sidebar;
