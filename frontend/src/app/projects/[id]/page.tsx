"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { projectService } from "@/services/project.service";
import { analysisService } from "@/services/analysis.service";
import { Project, Analysis } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
    const [project, setProject] = useState<Project | null>(null);
    const [analyses, setAnalyses] = useState<Analysis[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectData, analysesData] = await Promise.all([
                    projectService.getProjectById(params.id),
                    analysisService.getResults().then(results => results.filter(a => a.projectId === params.id))
                ]);
                setProject(projectData);
                setAnalyses(analysesData);
            } catch (error) {
                console.error("Error fetching project data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [params.id]);

    const handleRunAnalysis = async () => {
        setIsAnalyzing(true);
        try {
            const newAnalysis = await analysisService.runAnalysis(params.id);
            setAnalyses([newAnalysis, ...analyses]);
            // Optional: Redirect to result page
            // router.push(`/results/${newAnalysis.id}`);
        } catch (error) {
            console.error("Error running analysis:", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    if (isLoading) {
        return (
            <DashboardLayout title="Loading..." subtitle="Fetching project details">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            </DashboardLayout>
        );
    }

    if (!project) {
        return (
            <DashboardLayout title="Project Not Found" subtitle="Could not locate the requested project">
                <div className="p-8 text-center bg-white rounded-card shadow-card-soft">
                    <p className="text-text-medium mb-6">The project you are looking for does not exist or you don't have access to it.</p>
                    <Link href="/projects" className="text-primary font-medium hover:underline">Back to Projects</Link>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title={project.name} subtitle={`Created on ${new Date(project.createdAt).toLocaleDateString()}`}>
            
            {/* Project Header Card */}
            <div className="bg-white rounded-card shadow-card-soft p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                        <p className="text-sm text-text-medium leading-relaxed max-w-3xl">
                            {project.description}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleRunAnalysis}
                            disabled={isAnalyzing}
                            className={`inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg shadow-md shadow-primary/20 hover:bg-primary-dark transition-all ${isAnalyzing ? "opacity-70 cursor-not-allowed" : ""}`}
                        >
                            <svg className={`w-4 h-4 ${isAnalyzing ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            {isAnalyzing ? "Analyzing..." : "Trigger AI Analysis"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Analysis History */}
            <div className="bg-white rounded-card shadow-card-soft overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-text-dark">Analysis History</h2>
                    <span className="text-xs text-text-light">{analyses.length} total</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left text-xs font-medium text-text-medium px-6 py-3">ID</th>
                                <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Score</th>
                                <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Issues</th>
                                <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Cost Est.</th>
                                <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Date</th>
                                <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analyses.map((a) => (
                                <tr key={a.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-3.5 text-xs font-mono text-text-light truncate max-w-[100px]">{a.id}</td>
                                    <td className="px-6 py-3.5">
                                        <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${
                                            a.score > 70 ? "bg-green-50 text-success" : 
                                            a.score > 40 ? "bg-amber-50 text-amber" : 
                                            "bg-red-50 text-red-600"
                                        }`}>
                                            {a.score}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        {a.issuesCount > 0 ? (
                                            <span className="text-sm font-medium text-amber">{a.issuesCount} issues</span>
                                        ) : (
                                            <span className="text-sm text-success">Clean</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-3.5 text-sm text-text-dark font-medium">${a.costEstimate}k</td>
                                    <td className="px-6 py-3.5 text-xs text-text-medium">
                                        {new Date(a.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <Link href={`/results/${a.id}`} className="text-xs text-primary font-medium hover:underline">
                                            View Report
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {analyses.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-sm text-text-light italic">
                                        No analyses performed yet. Click the button above to start your first optimization.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
