"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { analysisService } from "@/services/analysis.service";
import { Analysis } from "@/types";
import Link from "next/link";

export default function ResultDetailPage({ params }: { params: { id: string } }) {
    const [result, setResult] = useState<Analysis | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const data = await analysisService.getResultById(params.id);
                setResult(data);
            } catch (error) {
                console.error("Error fetching analysis result:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResult();
    }, [params.id]);

    if (isLoading) {
        return (
            <DashboardLayout title="Loading..." subtitle="Processing optimization data">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            </DashboardLayout>
        );
    }

    if (!result) {
        return (
            <DashboardLayout title="Result Not Found" subtitle="Could not locate the optimization report">
                <div className="p-8 text-center bg-white rounded-card shadow-card-soft">
                    <p className="text-text-medium mb-6">The analysis report you are looking for does not exist or you don't have access to it.</p>
                    <Link href="/results" className="text-primary font-medium hover:underline">View All Results</Link>
                </div>
            </DashboardLayout>
        );
    }

    const severityColors = {
        HIGH: "bg-red-50 text-red-600 border-red-100",
        MEDIUM: "bg-amber-50 text-amber border-amber-100",
        LOW: "bg-blue-50 text-primary border-blue-100"
    };

    return (
        <DashboardLayout title="Optimization Report" subtitle={`Report ID: ${result.id}`}>
            
            {/* Summary Header */}
            <div className="bg-white rounded-card shadow-card-soft p-8 mb-8 border border-gray-100">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Score Ring */}
                    <div className="relative w-36 h-36 flex-shrink-0">
                        <svg className="w-36 h-36 -rotate-90" viewBox="0 0 128 128">
                            <circle cx="64" cy="64" r="54" fill="none" stroke="#F3F4F6" strokeWidth="10" />
                            <circle
                                cx="64" cy="64" r="54"
                                fill="none" stroke={result.score > 70 ? "#10B981" : result.score > 40 ? "#F59E0B" : "#EF4444"} strokeWidth="10"
                                strokeDasharray={`${2 * Math.PI * 54}`}
                                strokeDashoffset={`${2 * Math.PI * 54 * (1 - result.score / 100)}`}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-text-dark">{result.score}%</span>
                            <span className="text-xs text-text-light font-medium uppercase tracking-wider">Health</span>
                        </div>
                    </div>

                    {/* Quick Metrics */}
                    <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <div className="p-4 rounded-2xl bg-gray-50/50">
                            <p className="text-xs text-text-medium mb-1 font-medium italic">Project Context</p>
                            <p className="text-lg font-bold text-text-dark truncate">{result.projectName}</p>
                            <p className="text-xs text-text-light mt-1">Validated on {new Date(result.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-gray-50/50">
                            <p className="text-xs text-text-medium mb-1 font-medium italic">Budget Impact</p>
                            <p className="text-lg font-bold text-primary">${result.costEstimate}k <span className="text-xs font-normal text-text-light">Est.</span></p>
                            <p className="text-xs text-text-light mt-1">Estimated monthly overhead</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-gray-50/50">
                            <p className="text-xs text-text-medium mb-1 font-medium italic">System Integrity</p>
                            <p className={`text-lg font-bold ${result.issuesCount > 0 ? "text-amber" : "text-success"}`}>
                                {result.issuesCount} Active {result.issuesCount === 1 ? "Issue" : "Issues"}
                            </p>
                            <p className="text-xs text-text-light mt-1">Requiring immediate attention</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Suggestions Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-lg font-bold text-text-dark">AI-Powered Optimization Suggestions</h2>
                    <span className="text-xs font-semibold text-primary bg-primary-50 px-3 py-1 rounded-full">
                        {result.suggestions?.length || 0} recommendations
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {result.suggestions?.map((s, idx) => (
                        <div 
                            key={idx} 
                            className="bg-white rounded-card shadow-card-soft border border-gray-100 p-6 flex flex-col md:flex-row gap-6 hover:border-primary/20 transition-all group"
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors animate-pulse-subtle">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-base font-bold text-text-dark">{s.title}</h3>
                                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${severityColors[s.severity]}`}>
                                        {s.severity}
                                    </span>
                                </div>
                                <p className="text-sm text-text-medium leading-relaxed mb-4">{s.description}</p>
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="text-text-light font-medium italic">Impact Analysis:</span>
                                    <span className="text-primary font-bold">{s.impact}</span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button className="w-full md:w-auto px-6 py-2.5 bg-primary-50 text-primary text-xs font-bold rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm">
                                    Apply Change
                                </button>
                            </div>
                        </div>
                    ))}
                    {(!result.suggestions || result.suggestions.length === 0) && (
                        <div className="bg-white rounded-card shadow-card-soft p-12 text-center border border-dashed border-gray-200">
                            <p className="text-sm text-text-medium italic">No AI suggestions were generated for this analysis iteration.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Back Link */}
            <div className="mt-12 text-center">
                <Link href={`/projects/${result.projectId}`} className="inline-flex items-center gap-2 text-sm font-medium text-text-light hover:text-primary transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Project Workspace
                </Link>
            </div>
        </DashboardLayout>
    );
}
