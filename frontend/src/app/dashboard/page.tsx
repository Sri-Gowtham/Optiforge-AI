"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { dashboardService } from "@/services/dashboard.service";
import { DashboardStats } from "@/types";
import Link from "next/link";

export default function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await dashboardService.getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (isLoading) {
        return (
            <DashboardLayout title="Dashboard" subtitle="Loading your workspace...">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            </DashboardLayout>
        );
    }

    /* ── Metric data mapping ── */
    const metrics = [
        {
            label: "Average Optimization Score",
            value: `${Math.round(stats?.averageScore || 0)}%`,
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            accent: "bg-green-50 text-success",
        },
        {
            label: "Total Projects",
            value: stats?.totalProjects.toString() || "0",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
            ),
            accent: "bg-primary-50 text-primary",
        },
        {
            label: "Total Analyses",
            value: stats?.totalAnalyses.toString() || "0",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            accent: "bg-amber-50 text-amber",
        },
    ];

    return (
        <DashboardLayout title="Dashboard" subtitle="Overview of your design optimization workspace">

            {/* ── Metric Cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {metrics.map((m) => (
                    <div
                        key={m.label}
                        className="bg-white rounded-card shadow-card-soft p-6 flex items-start justify-between"
                    >
                        <div>
                            <p className="text-sm text-text-medium font-medium">{m.label}</p>
                            <p className="text-3xl font-semibold text-text-dark mt-1 tracking-tight">{m.value}</p>
                        </div>
                        <div className={`p-3 rounded-xl ${m.accent}`}>
                            {m.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Recent Analyses + Score Distribution ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                {/* Recent Analyses — 2 cols */}
                <div className="lg:col-span-2 bg-white rounded-card shadow-card-soft">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-text-dark">Recent Analyses</h2>
                        <Link href="/results" className="text-xs text-primary font-medium hover:underline">View All</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Project</th>
                                    <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Score</th>
                                    <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Date</th>
                                    <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats?.recentAnalyses.map((analysis) => (
                                    <tr key={analysis.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-3.5 text-sm text-text-dark font-medium">{analysis.projectName}</td>
                                        <td className="px-6 py-3.5">
                                            <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${
                                                analysis.score > 70 ? "bg-green-50 text-success" : 
                                                analysis.score > 40 ? "bg-amber-50 text-amber" : 
                                                "bg-red-50 text-red-600"
                                            }`}>
                                                {analysis.score}%
                                            </span>
                                        </td>
                                        <td className="px-6 py-3.5 text-sm text-text-medium">
                                            {new Date(analysis.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <Link href={`/results/${analysis.id}`} className="text-xs text-primary font-medium hover:underline">
                                                View Results
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {(!stats?.recentAnalyses || stats.recentAnalyses.length === 0) && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-sm text-text-light italic">
                                            No recent analyses found. Start by running an analysis from a project.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Score Distribution Chart */}
                <div className="bg-white rounded-card shadow-card-soft">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="text-sm font-semibold text-text-dark">Score Distribution</h2>
                        <p className="text-xs text-text-light mt-0.5">Overall analysis health</p>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="space-y-4">
                            {/* High */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-xs font-medium text-text-medium">High (70+)</span>
                                    <span className="text-xs text-text-light">{stats?.scoreDistribution.high} analyses</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full">
                                    <div
                                        className="h-2 bg-success rounded-full transition-all duration-500"
                                        style={{ width: `${(stats?.scoreDistribution.high || 0) / (stats?.totalAnalyses || 1) * 100}%` }}
                                    />
                                </div>
                            </div>
                            {/* Medium */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-xs font-medium text-text-medium">Medium (40-70)</span>
                                    <span className="text-xs text-text-light">{stats?.scoreDistribution.medium} analyses</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full">
                                    <div
                                        className="h-2 bg-amber rounded-full transition-all duration-500"
                                        style={{ width: `${(stats?.scoreDistribution.medium || 0) / (stats?.totalAnalyses || 1) * 100}%` }}
                                    />
                                </div>
                            </div>
                            {/* Low */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-xs font-medium text-text-medium">Low (&lt; 40)</span>
                                    <span className="text-xs text-text-light">{stats?.scoreDistribution.low} analyses</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full">
                                    <div
                                        className="h-2 bg-red-500 rounded-full transition-all duration-500"
                                        style={{ width: `${(stats?.scoreDistribution.low || 0) / (stats?.totalAnalyses || 1) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Summary Info */}
                        <div className="pt-4 border-t border-gray-100">
                            <p className="text-xs text-text-medium leading-relaxed">
                                Your average score is <span className="font-semibold text-text-dark">{Math.round(stats?.averageScore || 0)}%</span> across all {stats?.totalAnalyses} design optimizations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Quick Actions ── */}
            <div className="bg-white rounded-card shadow-card-soft p-6">
                <h2 className="text-sm font-semibold text-text-dark mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/projects" className="p-4 rounded-xl bg-primary-50 text-primary hover:bg-primary-100 transition-colors flex items-center gap-3 group">
                        <div className="p-2 bg-white rounded-lg group-hover:scale-110 transition-transform">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        </div>
                        <span className="text-sm font-semibold">New Project</span>
                    </Link>
                    <Link href="/results" className="p-4 rounded-xl bg-green-50 text-success hover:bg-green-100 transition-colors flex items-center gap-3 group">
                        <div className="p-2 bg-white rounded-lg group-hover:scale-110 transition-transform">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <span className="text-sm font-semibold">View Results</span>
                    </Link>
                    <Link href="/settings" className="p-4 rounded-xl bg-gray-50 text-text-medium hover:bg-gray-100 transition-colors flex items-center gap-3 group">
                        <div className="p-2 bg-white rounded-lg group-hover:scale-110 transition-transform">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                        <span className="text-sm font-semibold">Settings</span>
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
}
