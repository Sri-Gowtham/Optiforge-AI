import React from 'react';
import ProtectedLayout from '@/components/ProtectedLayout';
import DashboardCards from '@/components/DashboardCards';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Link from 'next/link';

export default function DashboardPage() {
    // Sample data - will be replaced with API calls
    const stats = [
        { title: 'Total Projects', value: '12', icon: '📁', trend: { value: '+3 this month', isPositive: true } },
        { title: 'Active Analyses', value: '5', icon: '📊', trend: { value: '+2 this week', isPositive: true } },
        { title: 'Completed', value: '24', icon: '✅', trend: { value: '+8 this month', isPositive: true } },
        { title: 'In Progress', value: '3', icon: '⏳', trend: { value: 'Same as last week', isPositive: false } },
    ];

    const recentProjects = [
        { id: '1', name: 'Mobile App Redesign', status: 'active', date: '2026-02-14' },
        { id: '2', name: 'E-commerce Platform', status: 'completed', date: '2026-02-12' },
        { id: '3', name: 'Dashboard UI', status: 'pending', date: '2026-02-10' },
    ];

    return (
        <ProtectedLayout>
            <div>
                <h1 className="text-3xl font-bold text-slate-dark mb-8">Welcome back! 👋</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <DashboardCards key={index} {...stat} />
                    ))}
                </div>

                {/* Quick Actions */}
                <Card className="mb-8">
                    <h2 className="text-xl font-semibold text-slate-dark mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href="/projects/create">
                            <Button variant="primary" className="w-full">
                                📁 New Project
                            </Button>
                        </Link>
                        <Link href="/manual-design">
                            <Button variant="secondary" className="w-full">
                                ✏️ Manual Design
                            </Button>
                        </Link>
                        <Link href="/ai-generator">
                            <Button variant="secondary" className="w-full">
                                🤖 AI Generator
                            </Button>
                        </Link>
                    </div>
                </Card>

                {/* Recent Projects */}
                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-slate-dark">Recent Projects</h2>
                        <Link href="/projects" className="text-primary hover:underline text-sm font-medium">
                            View all →
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {recentProjects.map((project) => (
                            <div key={project.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <div>
                                    <Link href={`/projects/${project.id}`} className="font-medium text-slate-dark hover:text-primary">
                                        {project.name}
                                    </Link>
                                    <p className="text-sm text-slate-medium">{project.date}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === 'active' ? 'bg-primary text-white' :
                                    project.status === 'completed' ? 'bg-success text-white' :
                                        'bg-amber text-white'
                                    }`}>
                                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </ProtectedLayout>
    );
}
