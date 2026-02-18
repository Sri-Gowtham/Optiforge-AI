"use client";

import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

const stats = [
    {
        label: "Total Projects",
        value: "24",
        change: "+3 this month",
        positive: true,
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
        ),
    },
    {
        label: "Active Designs",
        value: "58",
        change: "+12 this week",
        positive: true,
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
            </svg>
        ),
    },
    {
        label: "Analyses Run",
        value: "142",
        change: "+28 this month",
        positive: true,
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
    {
        label: "Optimization Score",
        value: "87%",
        change: "+5% improvement",
        positive: true,
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        ),
    },
];

const recentProjects = [
    { id: "1", name: "Automotive Bracket V2", status: "active", designs: 8, lastUpdated: "2 hours ago" },
    { id: "2", name: "Aerospace Wing Rib", status: "completed", designs: 12, lastUpdated: "1 day ago" },
    { id: "3", name: "Consumer Electronics Casing", status: "active", designs: 5, lastUpdated: "3 days ago" },
    { id: "4", name: "Medical Implant Frame", status: "pending", designs: 3, lastUpdated: "5 days ago" },
    { id: "5", name: "Industrial Gear Housing", status: "active", designs: 7, lastUpdated: "1 week ago" },
];

const recentActivity = [
    { action: "Analysis completed", project: "Automotive Bracket V2", time: "2 hours ago", type: "success" },
    { action: "New design uploaded", project: "Aerospace Wing Rib", time: "4 hours ago", type: "info" },
    { action: "Optimization failed", project: "Medical Implant Frame", time: "1 day ago", type: "error" },
    { action: "Project created", project: "Industrial Gear Housing", time: "2 days ago", type: "info" },
];

const statusColors: Record<string, string> = {
    active: "bg-green-50 text-success",
    completed: "bg-blue-50 text-primary",
    pending: "bg-amber-50 text-amber",
};

export default function DashboardPage() {
    return (
        <DashboardLayout title="Dashboard" subtitle="Overview of your design optimization workspace">
            {/* Quick Actions */}
            <div className="flex items-center gap-3 mb-8">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    New Project
                </Link>
                <Link
                    href="/analysis"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-text-dark text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10" />
                    </svg>
                    Run Analysis
                </Link>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white rounded-card border border-gray-200 p-6"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-text-medium font-medium">{stat.label}</p>
                                <p className="text-2xl font-semibold text-text-dark mt-1">{stat.value}</p>
                            </div>
                            <div className="p-2 bg-primary-50 text-primary rounded-lg">
                                {stat.icon}
                            </div>
                        </div>
                        <p className="text-xs text-success font-medium mt-3 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            {stat.change}
                        </p>
                    </div>
                ))}
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Projects — spans 2 cols */}
                <div className="lg:col-span-2 bg-white rounded-card border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-text-dark">Recent Projects</h2>
                        <Link href="/projects" className="text-xs text-primary font-medium hover:underline">
                            View all
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Project</th>
                                    <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Status</th>
                                    <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Designs</th>
                                    <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentProjects.map((project) => (
                                    <tr key={project.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-3.5">
                                            <Link href={`/projects/${project.id}`} className="text-sm font-medium text-text-dark hover:text-primary transition-colors">
                                                {project.name}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full capitalize ${statusColors[project.status]}`}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3.5 text-sm text-text-medium">{project.designs}</td>
                                        <td className="px-6 py-3.5 text-sm text-text-medium">{project.lastUpdated}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-card border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-sm font-semibold text-text-dark">Recent Activity</h2>
                    </div>
                    <div className="p-4 space-y-1">
                        {recentActivity.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div
                                    className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${item.type === "success"
                                            ? "bg-success"
                                            : item.type === "error"
                                                ? "bg-warning"
                                                : "bg-primary"
                                        }`}
                                />
                                <div className="min-w-0">
                                    <p className="text-sm text-text-dark font-medium">{item.action}</p>
                                    <p className="text-xs text-text-medium mt-0.5">{item.project}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
