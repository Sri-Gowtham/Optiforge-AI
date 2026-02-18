"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";

const statusFilters = ["All", "Completed", "Processing", "Pending", "Failed"];

const reports = [
    {
        id: "a1",
        design: "Optimized Bracket A",
        project: "Automotive Bracket V2",
        status: "completed",
        score: 92,
        warnings: ["High stress point near bolt hole #3"],
        costEstimate: "$1,240",
        date: "Feb 18, 2026",
    },
    {
        id: "a2",
        design: "Base Wing Rib",
        project: "Aerospace Wing Rib",
        status: "completed",
        score: 74,
        warnings: ["Material fatigue risk at junction A", "Weight above target by 12%", "Deformation under load exceeds threshold"],
        costEstimate: "$3,850",
        date: "Feb 16, 2026",
    },
    {
        id: "a3",
        design: "Thermal Shell v3",
        project: "Consumer Electronics Casing",
        status: "processing",
        score: null,
        warnings: [],
        costEstimate: null,
        date: "Feb 15, 2026",
    },
    {
        id: "a4",
        design: "Reinforced Frame",
        project: "Medical Implant Frame",
        status: "pending",
        score: null,
        warnings: [],
        costEstimate: null,
        date: "Feb 14, 2026",
    },
    {
        id: "a5",
        design: "Lightweight Arm",
        project: "Drone Propeller Arm",
        status: "completed",
        score: 95,
        warnings: [],
        costEstimate: "$680",
        date: "Feb 12, 2026",
    },
    {
        id: "a6",
        design: "Gear Housing Shell",
        project: "Industrial Gear Housing",
        status: "failed",
        score: null,
        warnings: ["Mesh generation failed — geometry too complex"],
        costEstimate: null,
        date: "Feb 10, 2026",
    },
];

const statusColors: Record<string, string> = {
    completed: "bg-green-50 text-success",
    processing: "bg-blue-50 text-primary",
    pending: "bg-amber-50 text-amber",
    failed: "bg-red-50 text-warning",
};

function ScoreRing({ score }: { score: number }) {
    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const color = score >= 85 ? "#10B981" : score >= 70 ? "#F59E0B" : "#EF4444";

    return (
        <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r={radius} fill="none" stroke="#F3F4F6" strokeWidth="4" />
                <circle
                    cx="32" cy="32" r={radius}
                    fill="none" stroke={color} strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                />
            </svg>
            <span className="absolute text-sm font-semibold text-text-dark">{score}%</span>
        </div>
    );
}

export default function AnalysisPage() {
    const [activeFilter, setActiveFilter] = useState("All");

    const filtered =
        activeFilter === "All"
            ? reports
            : reports.filter((r) => r.status === activeFilter.toLowerCase());

    return (
        <DashboardLayout title="Analysis" subtitle="Review optimization analysis reports">
            {/* Filters */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    {statusFilters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${activeFilter === f
                                    ? "bg-primary-50 text-primary"
                                    : "text-text-medium hover:bg-gray-100"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <p className="text-xs text-text-medium">{filtered.length} report{filtered.length !== 1 ? "s" : ""}</p>
            </div>

            {/* Report Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filtered.map((report) => (
                    <div
                        key={report.id}
                        className="bg-white rounded-card border border-gray-200 p-6 hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer"
                    >
                        <div className="flex items-start gap-5">
                            {/* Score visualization */}
                            <div className="shrink-0">
                                {report.score !== null ? (
                                    <ScoreRing score={report.score} />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
                                        <span className="text-xs text-text-medium font-medium">N/A</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-sm font-semibold text-text-dark">{report.design}</h3>
                                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${statusColors[report.status]}`}>
                                        {report.status}
                                    </span>
                                </div>
                                <p className="text-xs text-text-medium mb-3">{report.project}</p>

                                {/* Warnings */}
                                {report.warnings.length > 0 && (
                                    <div className="space-y-1 mb-3">
                                        {report.warnings.map((w, i) => (
                                            <div key={i} className="flex items-start gap-1.5">
                                                <svg className="w-3.5 h-3.5 text-amber shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                </svg>
                                                <span className="text-xs text-text-medium">{w}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Footer */}
                                <div className="flex items-center gap-4 text-xs text-text-medium">
                                    {report.costEstimate && (
                                        <span>Est. Cost: <span className="font-semibold text-text-dark">{report.costEstimate}</span></span>
                                    )}
                                    <span>{report.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    );
}
