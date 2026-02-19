"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";

/* ── Filters ── */
const timeFilters = ["7 Days", "30 Days", "90 Days", "All Time"];
const typeFilters = ["All", "Structural", "Thermal", "Cost", "Weight"];

/* ── Bottleneck data ── */
const bottlenecks = [
    {
        id: "b1",
        title: "High stress concentration at bracket node C3",
        component: "Automotive Bracket V2",
        severity: "critical",
        impact: "Potential failure under peak load — safety factor drops to 0.9×",
        recommendation: "Increase fillet radius by 2mm or add reinforcement rib",
    },
    {
        id: "b2",
        title: "Thermal dissipation below target threshold",
        component: "Electronics Casing",
        severity: "warning",
        impact: "Internal temperature exceeds 85°C under sustained operation",
        recommendation: "Add 6 thermal vias along heat sink path",
    },
    {
        id: "b3",
        title: "Material weight 12% above constraint",
        component: "Aerospace Wing Rib",
        severity: "warning",
        impact: "Total assembly weight exceeds spec by 1.4kg",
        recommendation: "Switch to carbon fiber composite layup or reduce wall thickness",
    },
    {
        id: "b4",
        title: "Manufacturing tolerance too tight for batch production",
        component: "Medical Implant Frame",
        severity: "info",
        impact: "Current ±0.02mm tolerance increases rejection rate by 15%",
        recommendation: "Relax tolerance to ±0.05mm on non-critical surfaces",
    },
    {
        id: "b5",
        title: "Fatigue cycle count below rated lifetime",
        component: "Industrial Gear Housing",
        severity: "critical",
        impact: "Predicted failure at 72,000 cycles vs. 100,000 requirement",
        recommendation: "Increase wall thickness at stress riser or change material grade",
    },
];

const severityConfig: Record<string, { bg: string; dot: string; label: string; border: string }> = {
    critical: { bg: "bg-red-50", dot: "bg-red-500", label: "Critical", border: "border-red-200" },
    warning: { bg: "bg-amber-50", dot: "bg-amber", label: "Warning", border: "border-amber-200" },
    info: { bg: "bg-blue-50", dot: "bg-primary", label: "Info", border: "border-blue-200" },
};

/* ── Chart data ── */
const performanceData = [
    { label: "Structural Integrity", value: 88, max: 100 },
    { label: "Thermal Efficiency", value: 72, max: 100 },
    { label: "Weight Optimization", value: 65, max: 100 },
    { label: "Cost Efficiency", value: 81, max: 100 },
    { label: "Manufacturability", value: 90, max: 100 },
];

const trendData = [
    { month: "Sep", score: 68 },
    { month: "Oct", score: 72 },
    { month: "Nov", score: 75 },
    { month: "Dec", score: 79 },
    { month: "Jan", score: 83 },
    { month: "Feb", score: 87 },
];

export default function AnalysisPage() {
    const [activeTime, setActiveTime] = useState("30 Days");
    const [activeType, setActiveType] = useState("All");

    return (
        <DashboardLayout title="Analysis" subtitle="Performance analysis and bottleneck detection">

            {/* ── Filters ── */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                {/* Type Filters */}
                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                    {typeFilters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveType(f)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeType === f
                                    ? "text-primary bg-white shadow-sm"
                                    : "text-text-medium hover:text-text-dark"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Time Filter */}
                <div className="flex items-center gap-2">
                    {timeFilters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveTime(f)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${activeTime === f
                                    ? "bg-primary-50 text-primary"
                                    : "text-text-medium hover:bg-gray-100"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Charts Row ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                {/* Performance Breakdown Chart */}
                <div className="bg-white rounded-card shadow-card-soft p-6">
                    <h2 className="text-sm font-semibold text-text-dark mb-5">Performance Breakdown</h2>
                    <div className="space-y-4">
                        {performanceData.map((item) => (
                            <div key={item.label}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-xs font-medium text-text-medium">{item.label}</span>
                                    <span className="text-xs font-semibold text-text-dark">{item.value}%</span>
                                </div>
                                <div className="w-full h-2.5 bg-gray-100 rounded-full">
                                    <div
                                        className={`h-2.5 rounded-full transition-all duration-700 ${item.value >= 85 ? "bg-success" : item.value >= 70 ? "bg-primary" : "bg-amber"
                                            }`}
                                        style={{ width: `${item.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Score Trend Chart */}
                <div className="bg-white rounded-card shadow-card-soft p-6">
                    <h2 className="text-sm font-semibold text-text-dark mb-5">Optimization Score Trend</h2>
                    <div className="flex items-end justify-between h-48 px-2">
                        {trendData.map((item) => {
                            const height = (item.score / 100) * 100;
                            return (
                                <div key={item.month} className="flex flex-col items-center gap-2 flex-1">
                                    <span className="text-xs font-semibold text-text-dark">{item.score}</span>
                                    <div className="w-full max-w-[36px] bg-gray-100 rounded-t-lg relative" style={{ height: "160px" }}>
                                        <div
                                            className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg transition-all duration-700"
                                            style={{ height: `${height}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-text-light">{item.month}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Severity Summary ── */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                    { label: "Critical", count: bottlenecks.filter((b) => b.severity === "critical").length, color: "text-red-600", bg: "bg-red-50" },
                    { label: "Warning", count: bottlenecks.filter((b) => b.severity === "warning").length, color: "text-amber", bg: "bg-amber-50" },
                    { label: "Info", count: bottlenecks.filter((b) => b.severity === "info").length, color: "text-primary", bg: "bg-blue-50" },
                ].map((s) => (
                    <div key={s.label} className={`${s.bg} rounded-card p-4 flex items-center gap-3`}>
                        <div className={`text-2xl font-bold ${s.color}`}>{s.count}</div>
                        <div>
                            <p className={`text-sm font-semibold ${s.color}`}>{s.label}</p>
                            <p className="text-xs text-text-medium">issues detected</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Bottleneck Cards ── */}
            <div className="bg-white rounded-card shadow-card-soft">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-text-dark">Detected Bottlenecks</h2>
                    <span className="text-xs text-text-light">{bottlenecks.length} issues</span>
                </div>
                <div className="divide-y divide-gray-100">
                    {bottlenecks.map((b) => {
                        const sev = severityConfig[b.severity];
                        return (
                            <div key={b.id} className="px-6 py-5 hover:bg-gray-50/50 transition-colors">
                                <div className="flex items-start gap-4">
                                    {/* Severity Indicator */}
                                    <div className={`mt-1 flex-shrink-0 w-2.5 h-2.5 rounded-full ${sev.dot}`} />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-sm font-semibold text-text-dark">{b.title}</h3>
                                            <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${sev.bg} ${sev.border} border`}>
                                                {sev.label}
                                            </span>
                                        </div>
                                        <p className="text-xs text-text-light mb-2">{b.component}</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="bg-bg-page rounded-lg p-3">
                                                <p className="text-[10px] font-semibold text-text-medium uppercase tracking-wide mb-1">Impact</p>
                                                <p className="text-xs text-text-dark">{b.impact}</p>
                                            </div>
                                            <div className="bg-bg-page rounded-lg p-3">
                                                <p className="text-[10px] font-semibold text-text-medium uppercase tracking-wide mb-1">Recommendation</p>
                                                <p className="text-xs text-text-dark">{b.recommendation}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </DashboardLayout>
    );
}
