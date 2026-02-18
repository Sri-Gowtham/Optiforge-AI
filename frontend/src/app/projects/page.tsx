"use client";

import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

const projects = [
    { id: "1", name: "Automotive Bracket V2", description: "Topology optimization for weight reduction of an automotive mounting bracket.", status: "active", designs: 8, analyses: 14, updatedAt: "Feb 18, 2026" },
    { id: "2", name: "Aerospace Wing Rib", description: "Structural analysis and optimization of a composite wing rib assembly.", status: "completed", designs: 12, analyses: 22, updatedAt: "Feb 15, 2026" },
    { id: "3", name: "Consumer Electronics Casing", description: "Thermal and mechanical optimization for a handheld device enclosure.", status: "active", designs: 5, analyses: 8, updatedAt: "Feb 12, 2026" },
    { id: "4", name: "Medical Implant Frame", description: "Biocompatibility and strength optimization for a titanium implant frame.", status: "pending", designs: 3, analyses: 2, updatedAt: "Feb 10, 2026" },
    { id: "5", name: "Industrial Gear Housing", description: "Vibration and fatigue analysis on a high-RPM gear housing.", status: "active", designs: 7, analyses: 11, updatedAt: "Feb 8, 2026" },
    { id: "6", name: "Drone Propeller Arm", description: "Lightweight structural optimization for a quadcopter propeller arm.", status: "completed", designs: 9, analyses: 16, updatedAt: "Feb 5, 2026" },
];

const statusColors: Record<string, string> = {
    active: "bg-green-50 text-success",
    completed: "bg-blue-50 text-primary",
    pending: "bg-amber-50 text-amber",
};

export default function ProjectsPage() {
    return (
        <DashboardLayout title="Projects" subtitle="Manage your design optimization projects">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <button className="px-3 py-1.5 text-sm font-medium text-primary bg-primary-50 rounded-lg">All</button>
                    <button className="px-3 py-1.5 text-sm font-medium text-text-medium hover:bg-gray-100 rounded-lg transition-colors">Active</button>
                    <button className="px-3 py-1.5 text-sm font-medium text-text-medium hover:bg-gray-100 rounded-lg transition-colors">Completed</button>
                    <button className="px-3 py-1.5 text-sm font-medium text-text-medium hover:bg-gray-100 rounded-lg transition-colors">Pending</button>
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    New Project
                </button>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        className="bg-white rounded-card border border-gray-200 p-6 hover:border-primary/30 hover:shadow-sm transition-all group"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="text-sm font-semibold text-text-dark group-hover:text-primary transition-colors">
                                {project.name}
                            </h3>
                            <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full capitalize ${statusColors[project.status]}`}>
                                {project.status}
                            </span>
                        </div>
                        <p className="text-xs text-text-medium leading-relaxed mb-4 line-clamp-2">
                            {project.description}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-4 text-xs text-text-medium">
                                <span className="flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                                    </svg>
                                    {project.designs} designs
                                </span>
                                <span className="flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6" />
                                    </svg>
                                    {project.analyses} analyses
                                </span>
                            </div>
                            <span className="text-xs text-gray-400">{project.updatedAt}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </DashboardLayout>
    );
}
