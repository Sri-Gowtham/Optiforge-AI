"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { projectService } from "@/services/project.service";
import { Project } from "@/types";
import Link from "next/link";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectDesc, setNewProjectDesc] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await projectService.getProjects();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreating(true);
        try {
            const project = await projectService.createProject({
                name: newProjectName,
                description: newProjectDesc,
            });
            setProjects([project, ...projects]);
            setIsCreateModalOpen(false);
            setNewProjectName("");
            setNewProjectDesc("");
        } catch (error) {
            console.error("Error creating project:", error);
        } finally {
            setIsCreating(false);
        }
    };

    if (isLoading) {
        return (
            <DashboardLayout title="Projects" subtitle="Loading your workspace...">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Projects" subtitle="Manage your design optimization projects">

            {/* ── Header Row ── */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-sm font-semibold text-text-dark">
                    All Projects ({projects.length})
                </h2>

                {/* Create Project Button */}
                <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg
                        hover:bg-primary-dark active:scale-[0.98]
                        shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30
                        transition-all duration-150"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Create Project
                </button>
            </div>

            {/* ── Project Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        className="bg-white rounded-card shadow-card-soft p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group flex flex-col justify-between"
                    >
                        <div>
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-sm font-semibold text-text-dark group-hover:text-primary transition-colors leading-snug">
                                    {project.name}
                                </h3>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-green-50 text-success">
                                    <span className="w-1.5 h-1.5 rounded-full bg-success" />
                                    Active
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-xs text-text-medium leading-relaxed mb-5 line-clamp-2">
                                {project.description}
                            </p>
                        </div>

                        {/* Footer Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className="text-xs text-text-light">
                                Created {new Date(project.createdAt).toLocaleDateString()}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
                                View Details
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
                {projects.length === 0 && (
                    <div className="col-span-full bg-white rounded-card shadow-card-soft p-12 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-semibold text-text-dark">No projects yet</h3>
                        <p className="text-xs text-text-medium mt-1 mb-6">Create your first design optimization project to get started.</p>
                        <button 
                            onClick={() => setIsCreateModalOpen(true)}
                            className="text-white bg-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                        >
                            Create Project
                        </button>
                    </div>
                )}
            </div>

            {/* ── Create Project Modal ── */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCreateModalOpen(false)}></div>
                    <div className="relative w-full max-w-md bg-white rounded-card shadow-modal overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-text-dark">New Project</h3>
                            <button onClick={() => setIsCreateModalOpen(false)} className="text-text-light hover:text-text-dark transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <form onSubmit={handleCreateProject} className="p-6 space-y-4">
                            <div>
                                <label className="block text-[13px] font-medium text-text-medium mb-2">Project Name</label>
                                <input 
                                    required
                                    type="text" 
                                    value={newProjectName}
                                    onChange={(e) => setNewProjectName(e.target.value)}
                                    placeholder="e.g. Engine Valve Optimization"
                                    className="w-full h-11 px-3.5 text-sm border border-border rounded-lg bg-bg-page focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-medium text-text-medium mb-2">Description</label>
                                <textarea 
                                    required
                                    rows={3}
                                    value={newProjectDesc}
                                    onChange={(e) => setNewProjectDesc(e.target.value)}
                                    placeholder="Briefly describe the project goals..."
                                    className="w-full px-3.5 py-3 text-sm border border-border rounded-lg bg-bg-page focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={isCreating}
                                className={`w-full h-11 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-all mt-2 ${isCreating ? "opacity-70 cursor-not-allowed" : ""}`}
                            >
                                {isCreating ? "Creating..." : "Create Project"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
