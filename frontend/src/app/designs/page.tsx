"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";

const filters = ["All", "Manual", "AI-Generated"];

const designs = [
    { id: "d1", name: "Optimized Bracket A", type: "ai-generated", project: "Automotive Bracket V2", score: 92, date: "Feb 18, 2026" },
    { id: "d2", name: "Base Wing Rib", type: "manual", project: "Aerospace Wing Rib", score: 74, date: "Feb 16, 2026" },
    { id: "d3", name: "Thermal Shell v3", type: "ai-generated", project: "Consumer Electronics Casing", score: 88, date: "Feb 14, 2026" },
    { id: "d4", name: "Reinforced Frame", type: "manual", project: "Medical Implant Frame", score: 81, date: "Feb 12, 2026" },
    { id: "d5", name: "Lightweight Arm", type: "ai-generated", project: "Drone Propeller Arm", score: 95, date: "Feb 10, 2026" },
    { id: "d6", name: "Gear Housing Shell", type: "manual", project: "Industrial Gear Housing", score: 78, date: "Feb 8, 2026" },
    { id: "d7", name: "Composite Rib v2", type: "ai-generated", project: "Aerospace Wing Rib", score: 91, date: "Feb 6, 2026" },
    { id: "d8", name: "Bracket Iteration C", type: "ai-generated", project: "Automotive Bracket V2", score: 89, date: "Feb 4, 2026" },
];

export default function DesignsPage() {
    const [activeFilter, setActiveFilter] = useState("All");

    const filtered =
        activeFilter === "All"
            ? designs
            : designs.filter((d) =>
                activeFilter === "Manual" ? d.type === "manual" : d.type === "ai-generated"
            );

    return (
        <DashboardLayout title="Designs" subtitle="Browse and manage all design iterations">
            {/* Filters */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    {filters.map((f) => (
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
                <p className="text-xs text-text-medium">{filtered.length} design{filtered.length !== 1 ? "s" : ""}</p>
            </div>

            {/* Design Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filtered.map((design) => (
                    <div
                        key={design.id}
                        className="bg-white rounded-card border border-gray-200 overflow-hidden hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer"
                    >
                        {/* Thumbnail placeholder */}
                        <div className="h-32 bg-gray-50 flex items-center justify-center border-b border-gray-100">
                            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-1.5">
                                <h4 className="text-sm font-semibold text-text-dark">{design.name}</h4>
                                <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full uppercase tracking-wide ${design.type === "ai-generated"
                                        ? "bg-primary-50 text-primary"
                                        : "bg-gray-100 text-text-medium"
                                    }`}>
                                    {design.type === "ai-generated" ? "AI" : "Manual"}
                                </span>
                            </div>
                            <p className="text-xs text-text-medium mb-3">{design.project}</p>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-text-medium">
                                    Score: <span className="font-semibold text-text-dark">{design.score}%</span>
                                </span>
                                <span className="text-gray-400">{design.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    );
}
