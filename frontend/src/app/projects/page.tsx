"use client";

import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

/* ── Project data ── */
const projects = [
    {
        id: "1",
        name: "Automotive Bracket V2",
        description: "Topology optimization for weight reduction of an automotive mounting bracket.",
        status: "active",
        designs: 8,
        analyses: 14,
        score: 92,
        updatedAt: "Feb 18, 2026",
    },
    {
        id: "2",
        name: "Aerospace Wing Rib",
        description: "Structural analysis and optimization of a composite wing rib assembly.",
        status: "completed",
        designs: 12,
        analyses: 22,
        score: 97,
        updatedAt: "Feb 15, 2026",
    },
    {
        id: "3",
        name: "Consumer Electronics Casing",
        description: "Thermal and mechanical optimization for a handheld device enclosure.",
        status: "active",
        designs: 5,
        analyses: 8,
        score: 78,
        updatedAt: "Feb 12, 2026",
    },
    {
        id: "4",
        name: "Medical Implant Frame",
        description: "Biocompatibility and strength optimization for a titanium implant frame.",
        status: "pending",
        designs: 3,
        analyses: 2,
        score: 45,
        updatedAt: "Feb 10, 2026",
    },
    {
        id: "5",
        name: "Industrial Gear Housing",
        description: "Vibration and fatigue analysis on a high-RPM gear housing.",
        status: "active",
        designs: 7,
        analyses: 11,
        score: 84,
        updatedAt: "Feb 8, 2026",
    },
    {
        id: "6",
        name: "Drone Propeller Arm",
        description: "Lightweight structural optimization for a quadcopter propeller arm.",
        status: "completed",
        designs: 9,
        analyses: 16,
        score: 95,
        updatedAt: "Feb 5, 2026",
    },
];

const statusConfig: Record<string, { bg: string; dot: string; label: string }> = {
    active: { bg: "bg-green-50 text-success", dot: "bg-success", label: "Active" },
    completed: { bg: "bg-blue-50 text-primary", dot: "bg-primary", label: "Completed" },
    pending: { bg: "bg-amber-50 text-amber", dot: "bg-amber", label: "Pending" },
};

export default function ProjectsPage() {
    return (
        <DashboardLayout title="Projects" subtitle="Manage your design optimization projects">

            {/* ── Header Row ── */}
            <div className="flex items-center justify-between mb-8">
                {/* Tabs */}
                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                    <button className="px-4 py-2 text-sm font-medium text-primary bg-white rounded-md shadow-sm transition-all">
                        All
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-text-medium hover:text-text-dark rounded-md transition-colors">
                        Active
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-text-medium hover:text-text-dark rounded-md transition-colors">
                        Completed
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-text-medium hover:text-text-dark rounded-md transition-colors">
                        Pending
                    </button>
                </div>

                {/* Create Project Button */}
                <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg
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
                {projects.map((project) => {
                    const status = statusConfig[project.status];
                    return (
                        <Link
                            key={project.id}
                            href={`/projects/${project.id}`}
                            className="bg-white rounded-card shadow-card-soft p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-sm font-semibold text-text-dark group-hover:text-primary transition-colors leading-snug">
                                    {project.name}
                                </h3>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${status.bg}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                                    {status.label}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-xs text-text-medium leading-relaxed mb-5 line-clamp-2">
                                {project.description}
                            </p>

                            {/* Score Bar */}
                            <div className="mb-5">
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-xs font-medium text-text-medium">Optimization Score</span>
                                    <span className="text-xs font-semibold text-text-dark">{project.score}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-100 rounded-full">
                                    <div
                                        className={`h-1.5 rounded-full transition-all duration-500 ${project.score >= 90
                                                ? "bg-success"
                                                : project.score >= 70
                                                    ? "bg-primary"
                                                    : "bg-amber"
                                            }`}
                                        style={{ width: `${project.score}%` }}
                                    />
                                </div>
                            </div>

                            {/* Footer Stats */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-4 text-xs text-text-medium">
                                    <span className="flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5 text-text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                                        </svg>
                                        {project.designs} designs
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5 text-text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6" />
                                        </svg>
                                        {project.analyses} analyses
                                    </span>
                                </div>
                                <span className="text-xs text-text-light">{project.updatedAt}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </DashboardLayout>
    );
}
