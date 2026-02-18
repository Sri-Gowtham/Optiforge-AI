"use client";

import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { useState } from "react";

const tabs = ["Designs", "Analysis", "Settings"];

const designs = [
    { id: "d1", type: "ai-generated", name: "Optimized Variant A", score: 92, createdAt: "Feb 18, 2026" },
    { id: "d2", type: "manual", name: "Base Design", score: 74, createdAt: "Feb 16, 2026" },
    { id: "d3", type: "ai-generated", name: "Optimized Variant B", score: 88, createdAt: "Feb 14, 2026" },
    { id: "d4", type: "ai-generated", name: "Lightweight Iteration", score: 95, createdAt: "Feb 12, 2026" },
    { id: "d5", type: "manual", name: "Reinforced Design", score: 81, createdAt: "Feb 10, 2026" },
];

const analyses = [
    { id: "a1", designName: "Optimized Variant A", status: "completed", score: 92, warnings: 1, costEstimate: "$1,240" },
    { id: "a2", designName: "Base Design", status: "completed", score: 74, warnings: 3, costEstimate: "$2,100" },
    { id: "a3", designName: "Lightweight Iteration", status: "processing", score: null, warnings: 0, costEstimate: null },
];

const analysisStatusColors: Record<string, string> = {
    completed: "bg-green-50 text-success",
    processing: "bg-blue-50 text-primary",
    pending: "bg-amber-50 text-amber",
    failed: "bg-red-50 text-warning",
};

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState("Designs");

    return (
        <DashboardLayout title="Automotive Bracket V2" subtitle={`Project ID: ${params.id}`}>
            {/* Project Info Bar */}
            <div className="bg-white rounded-card border border-gray-200 p-6 mb-6">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-green-50 text-success capitalize">active</span>
                            <span className="text-xs text-text-medium">Created on Feb 1, 2026</span>
                        </div>
                        <p className="text-sm text-text-medium max-w-2xl leading-relaxed">
                            Topology optimization for weight reduction of an automotive mounting bracket.
                            Target: 30% weight reduction while maintaining structural integrity.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            Add Design
                        </button>
                        <button className="p-2 text-gray-400 hover:text-text-dark hover:bg-gray-50 rounded-lg transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-gray-200 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                                ? "border-primary text-primary"
                                : "border-transparent text-text-medium hover:text-text-dark"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Designs Tab */}
            {activeTab === "Designs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {designs.map((design) => (
                        <div
                            key={design.id}
                            className="bg-white rounded-card border border-gray-200 overflow-hidden hover:border-primary/30 hover:shadow-sm transition-all"
                        >
                            {/* Placeholder thumbnail */}
                            <div className="h-36 bg-gray-50 flex items-center justify-center border-b border-gray-100">
                                <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-sm font-semibold text-text-dark">{design.name}</h4>
                                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${design.type === "ai-generated"
                                            ? "bg-primary-50 text-primary"
                                            : "bg-gray-100 text-text-medium"
                                        }`}>
                                        {design.type === "ai-generated" ? "AI" : "Manual"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-text-medium">
                                    <span>Score: <span className="font-semibold text-text-dark">{design.score}%</span></span>
                                    <span>{design.createdAt}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Analysis Tab */}
            {activeTab === "Analysis" && (
                <div className="bg-white rounded-card border border-gray-200">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Design</th>
                                <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Status</th>
                                <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Score</th>
                                <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Warnings</th>
                                <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Cost Est.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analyses.map((a) => (
                                <tr key={a.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                                    <td className="px-6 py-3.5 text-sm font-medium text-text-dark">{a.designName}</td>
                                    <td className="px-6 py-3.5">
                                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${analysisStatusColors[a.status]}`}>
                                            {a.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5 text-sm text-text-dark font-medium">{a.score !== null ? `${a.score}%` : "—"}</td>
                                    <td className="px-6 py-3.5 text-sm text-text-medium">{a.warnings > 0 ? <span className="text-amber font-medium">{a.warnings}</span> : "—"}</td>
                                    <td className="px-6 py-3.5 text-sm text-text-medium">{a.costEstimate ?? "—"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Settings Tab */}
            {activeTab === "Settings" && (
                <div className="bg-white rounded-card border border-gray-200 p-6 max-w-2xl">
                    <h3 className="text-sm font-semibold text-text-dark mb-4">Project Settings</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-text-medium mb-1.5">Project Name</label>
                            <input
                                type="text"
                                defaultValue="Automotive Bracket V2"
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-bg-page focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-text-medium mb-1.5">Description</label>
                            <textarea
                                rows={3}
                                defaultValue="Topology optimization for weight reduction of an automotive mounting bracket."
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-bg-page focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                            />
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                            <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">
                                Save Changes
                            </button>
                            <button className="px-4 py-2 text-warning text-sm font-medium rounded-lg border border-red-200 hover:bg-red-50 transition-colors">
                                Delete Project
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
