"use client";

import DashboardLayout from "@/components/DashboardLayout";

/* ── Savings breakdown ── */
const savingsBreakdown = [
    { category: "Material Cost", before: 18400, after: 12800, icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
    { category: "Manufacturing", before: 32500, after: 24200, icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35" },
    { category: "Assembly Labor", before: 8600, after: 5100, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857" },
    { category: "Testing & QA", before: 5200, after: 4100, icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622" },
];

/* ── Issues resolved ── */
const resolvedIssues = [
    { id: "ISS-001", title: "High stress concentration on bracket node", severity: "critical", fix: "Increased fillet radius by 2mm" },
    { id: "ISS-002", title: "Material thickness below safety margin", severity: "critical", fix: "Added reinforcement rib at junction A" },
    { id: "ISS-003", title: "Thermal dissipation inefficiency", severity: "warning", fix: "Added 6 thermal vias along heat path" },
    { id: "ISS-004", title: "Weight exceeds target by 8%", severity: "warning", fix: "Switched to Al-7075 alloy, reduced wall thickness" },
    { id: "ISS-005", title: "Fatigue cycle count below threshold", severity: "critical", fix: "Material grade upgrade to Ti-6Al-4V" },
];

const severityColors: Record<string, string> = {
    critical: "bg-red-50 text-red-600",
    warning: "bg-amber-50 text-amber",
};

export default function ResultsPage() {
    const totalBefore = savingsBreakdown.reduce((s, c) => s + c.before, 0);
    const totalAfter = savingsBreakdown.reduce((s, c) => s + c.after, 0);
    const totalSaved = totalBefore - totalAfter;
    const savingsPercent = ((totalSaved / totalBefore) * 100).toFixed(1);

    return (
        <DashboardLayout title="Results" subtitle="Optimization results and recommendations">

            {/* ── Score Header ── */}
            <div className="bg-white rounded-card shadow-card-soft p-8 mb-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Score Ring */}
                    <div className="relative w-32 h-32 flex-shrink-0">
                        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
                            <circle cx="64" cy="64" r="52" fill="none" stroke="#F3F4F6" strokeWidth="8" />
                            <circle
                                cx="64" cy="64" r="52"
                                fill="none" stroke="#10B981" strokeWidth="8"
                                strokeDasharray={`${2 * Math.PI * 52}`}
                                strokeDashoffset={`${2 * Math.PI * 52 * (1 - 0.92)}`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-text-dark">92%</span>
                            <span className="text-xs text-text-light">Score</span>
                        </div>
                    </div>

                    {/* Summary Stats */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: "Optimization Score", value: "92%", sub: "+18% from baseline", color: "text-success" },
                            { label: "Total Savings", value: `$${(totalSaved / 1000).toFixed(1)}K`, sub: `${savingsPercent}% cost reduction`, color: "text-primary" },
                            { label: "Issues Resolved", value: `${resolvedIssues.length}/${resolvedIssues.length}`, sub: "All issues fixed", color: "text-success" },
                            { label: "Time Saved", value: "14 days", sub: "vs. manual optimization", color: "text-primary" },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className="text-xs text-text-medium mb-1">{stat.label}</p>
                                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                                <p className="text-xs text-text-light mt-0.5">{stat.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Savings Breakdown + Issues Resolved ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                {/* Savings Breakdown */}
                <div className="bg-white rounded-card shadow-card-soft">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="text-sm font-semibold text-text-dark">Savings Breakdown</h2>
                        <p className="text-xs text-text-light mt-0.5">Cost comparison before & after optimization</p>
                    </div>
                    <div className="p-6 space-y-5">
                        {savingsBreakdown.map((item) => {
                            const saved = item.before - item.after;
                            const pct = ((saved / item.before) * 100).toFixed(0);
                            return (
                                <div key={item.category}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1 bg-primary-50 rounded text-primary">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-text-dark">{item.category}</span>
                                        </div>
                                        <span className="text-xs font-semibold text-success">-{pct}%</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1">
                                            <div className="w-full h-2 bg-gray-100 rounded-full mb-1">
                                                <div className="h-2 bg-gray-300 rounded-full" style={{ width: `${(item.before / 35000) * 100}%` }} />
                                            </div>
                                            <div className="w-full h-2 bg-gray-100 rounded-full">
                                                <div className="h-2 bg-primary rounded-full" style={{ width: `${(item.after / 35000) * 100}%` }} />
                                            </div>
                                        </div>
                                        <div className="text-right w-20">
                                            <p className="text-xs text-text-light line-through">${item.before.toLocaleString()}</p>
                                            <p className="text-xs font-semibold text-text-dark">${item.after.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {/* Total */}
                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-sm font-semibold text-text-dark">Total Saved</span>
                            <span className="text-lg font-bold text-success">${totalSaved.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Issues Resolved */}
                <div className="bg-white rounded-card shadow-card-soft">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-text-dark">Issues Resolved</h2>
                        <span className="text-xs font-medium text-success bg-green-50 px-2.5 py-1 rounded-full">
                            {resolvedIssues.length}/{resolvedIssues.length} Fixed
                        </span>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {resolvedIssues.map((issue) => (
                            <div key={issue.id} className="px-6 py-4">
                                <div className="flex items-start gap-3">
                                    {/* Check icon */}
                                    <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-success flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-mono text-text-light">{issue.id}</span>
                                            <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full capitalize ${severityColors[issue.severity]}`}>
                                                {issue.severity}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-text-dark mb-1">{issue.title}</p>
                                        <p className="text-xs text-text-medium">
                                            <span className="font-medium text-success">Fix:</span> {issue.fix}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Action Buttons ── */}
            <div className="flex items-center gap-4">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded-lg
          hover:bg-primary-dark active:scale-[0.98]
          shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30
          transition-all duration-150"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Apply All Fixes
                </button>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-text-dark text-sm font-semibold rounded-lg
          border border-border hover:bg-gray-50 active:scale-[0.98]
          transition-all duration-150"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Report
                </button>
            </div>
        </DashboardLayout>
    );
}
