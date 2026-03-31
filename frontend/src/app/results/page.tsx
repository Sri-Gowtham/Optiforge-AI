"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { analysisService } from "@/services/analysis.service";
import { Analysis } from "@/types";
import Link from "next/link";

export default function ResultsPage() {
    const [results, setResults] = useState<Analysis[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await analysisService.getResults();
                setResults(data);
            } catch (error) {
                console.error("Error fetching analysis results:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, []);

    if (isLoading) {
        return (
            <DashboardLayout title="Results" subtitle="Loading your optimization history...">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Analysis History" subtitle="Explore your past design optimization iterations">
            
            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {results.map((result) => (
                    <Link
                        key={result.id}
                        href={`/results/${result.id}`}
                        className="bg-white rounded-card shadow-card-soft p-6 border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-200 group flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-[10px] font-mono text-text-light uppercase tracking-widest">{result.id.slice(0, 8)}</span>
                                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                                    result.score > 70 ? "bg-green-50 text-success" : 
                                    result.score > 40 ? "bg-amber-50 text-amber" : 
                                    "bg-red-50 text-red-600"
                                }`}>
                                    {result.score}% Score
                                </span>
                            </div>
                            <h3 className="text-sm font-bold text-text-dark group-hover:text-primary transition-colors leading-tight mb-2">
                                {result.projectName}
                            </h3>
                            <div className="flex items-center gap-4 text-xs text-text-medium mb-6">
                                <span className="flex items-center gap-1.5 font-medium">
                                    <svg className="w-3.5 h-3.5 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    {result.issuesCount} Active
                                </span>
                                <span className="flex items-center gap-1.5 font-medium">
                                    <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    ${result.costEstimate}k Est.
                                </span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-[11px] text-text-light font-medium italic">
                                {new Date(result.createdAt).toLocaleDateString()}
                            </span>
                            <div className="text-xs text-primary font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                View Report
                                <svg className="w-3.5 h-3.5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}

                {results.length === 0 && (
                    <div className="col-span-full bg-white rounded-card shadow-card-soft p-16 text-center border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-base font-bold text-text-dark">No optimization results yet</h3>
                        <p className="text-sm text-text-medium mt-2 mb-8 max-w-sm mx-auto leading-relaxed">Run your first analysis from any project workspace to see results here.</p>
                        <Link href="/projects" className="text-white bg-primary px-6 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-primary/20 hover:bg-primary-dark transition-all">
                            Go to Projects
                        </Link>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
