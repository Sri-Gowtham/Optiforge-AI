"use client";

import DashboardLayout from "@/components/DashboardLayout";

/* ── Metric data ── */
const metrics = [
    {
        label: "Optimization Score",
        value: "87%",
        change: "+5.2%",
        positive: true,
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        ),
        accent: "bg-green-50 text-success",
    },
    {
        label: "Total Savings",
        value: "$48.2K",
        change: "+12.3%",
        positive: true,
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        accent: "bg-primary-50 text-primary",
    },
    {
        label: "Active Issues",
        value: "12",
        change: "-3",
        positive: true,
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        accent: "bg-amber-50 text-amber",
    },
];

/* ── Issues table data ── */
const issues = [
    { id: "ISS-001", title: "High stress concentration on bracket node", severity: "critical", component: "Automotive Bracket V2", status: "open" },
    { id: "ISS-002", title: "Material thickness below safety margin", severity: "warning", component: "Aerospace Wing Rib", status: "open" },
    { id: "ISS-003", title: "Thermal dissipation inefficiency detected", severity: "warning", component: "Electronics Casing", status: "in-progress" },
    { id: "ISS-004", title: "Weight exceeds target by 8%", severity: "info", component: "Medical Implant Frame", status: "open" },
    { id: "ISS-005", title: "Fatigue cycle count below threshold", severity: "critical", component: "Industrial Gear Housing", status: "resolved" },
];

const severityColors: Record<string, string> = {
    critical: "bg-red-50 text-red-600",
    warning: "bg-amber-50 text-amber",
    info: "bg-blue-50 text-primary",
};

const statusColors: Record<string, string> = {
    open: "bg-red-50 text-red-600",
    "in-progress": "bg-amber-50 text-amber",
    resolved: "bg-green-50 text-success",
};

/* ── AI Suggestions ── */
const suggestions = [
    {
        title: "Reduce bracket node thickness",
        description: "Reducing node thickness by 2mm at junction C3 could lower stress concentration by 18% while maintaining structural integrity.",
        impact: "High",
        impactColor: "text-success",
    },
    {
        title: "Switch to titanium alloy Ti-6Al-4V",
        description: "Material change would reduce weight by 12% and improve fatigue resistance for the implant frame.",
        impact: "Medium",
        impactColor: "text-primary",
    },
    {
        title: "Add thermal vias to casing layout",
        description: "Placing 6 additional thermal vias along the heat sink path improves dissipation efficiency by 22%.",
        impact: "High",
        impactColor: "text-success",
    },
];

/* ── Cost comparison chart placeholder bars ── */
const costData = [
    { label: "Material", before: 85, after: 62 },
    { label: "Manufacturing", before: 72, after: 58 },
    { label: "Assembly", before: 45, after: 32 },
    { label: "Testing", before: 38, after: 30 },
    { label: "Overhead", before: 28, after: 22 },
];

export default function DashboardPage() {
    return (
        <DashboardLayout title="Dashboard" subtitle="Overview of your design optimization workspace">

            {/* ── Metric Cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {metrics.map((m) => (
                    <div
                        key={m.label}
                        className="bg-white rounded-card shadow-card-soft p-6 flex items-start justify-between"
                    >
                        <div>
                            <p className="text-sm text-text-medium font-medium">{m.label}</p>
                            <p className="text-3xl font-semibold text-text-dark mt-1 tracking-tight">{m.value}</p>
                            <p className={`text-xs font-medium mt-2 flex items-center gap-1 ${m.positive ? "text-success" : "text-warning"}`}>
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d={m.positive ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} />
                                </svg>
                                {m.change} from last month
                            </p>
                        </div>
                        <div className={`p-3 rounded-xl ${m.accent}`}>
                            {m.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Issues Table + Cost Comparison ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                {/* Issues Table — 2 cols */}
                <div className="lg:col-span-2 bg-white rounded-card shadow-card-soft">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-text-dark">Active Issues</h2>
                        <span className="text-xs text-text-light">{issues.filter((i) => i.status !== "resolved").length} open</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left text-xs font-medium text-text-medium px-6 py-3">ID</th>
                                    <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Issue</th>
                                    <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Severity</th>
                                    <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Component</th>
                                    <th className="text-left text-xs font-medium text-text-medium px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {issues.map((issue) => (
                                    <tr key={issue.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-3.5 text-xs font-mono text-text-light">{issue.id}</td>
                                        <td className="px-6 py-3.5 text-sm text-text-dark font-medium max-w-[260px] truncate">{issue.title}</td>
                                        <td className="px-6 py-3.5">
                                            <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full capitalize ${severityColors[issue.severity]}`}>
                                                {issue.severity}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3.5 text-sm text-text-medium">{issue.component}</td>
                                        <td className="px-6 py-3.5">
                                            <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full capitalize ${statusColors[issue.status]}`}>
                                                {issue.status.replace("-", " ")}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Cost Comparison Chart Placeholder */}
                <div className="bg-white rounded-card shadow-card-soft">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="text-sm font-semibold text-text-dark">Cost Comparison</h2>
                        <p className="text-xs text-text-light mt-0.5">Before vs After optimization</p>
                    </div>
                    <div className="p-6 space-y-4">
                        {costData.map((item) => (
                            <div key={item.label}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-xs font-medium text-text-medium">{item.label}</span>
                                    <span className="text-xs text-text-light">
                                        ${item.before}K → ${item.after}K
                                    </span>
                                </div>
                                {/* Before bar */}
                                <div className="w-full h-2 bg-gray-100 rounded-full mb-1">
                                    <div
                                        className="h-2 bg-gray-300 rounded-full transition-all duration-500"
                                        style={{ width: `${item.before}%` }}
                                    />
                                </div>
                                {/* After bar */}
                                <div className="w-full h-2 bg-gray-100 rounded-full">
                                    <div
                                        className="h-2 bg-primary rounded-full transition-all duration-500"
                                        style={{ width: `${item.after}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                        {/* Legend */}
                        <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-2 bg-gray-300 rounded-full" />
                                <span className="text-xs text-text-light">Before</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-2 bg-primary rounded-full" />
                                <span className="text-xs text-text-light">After</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── AI Suggestions Panel ── */}
            <div className="bg-white rounded-card shadow-card-soft">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-primary-50 rounded-lg text-primary">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h2 className="text-sm font-semibold text-text-dark">AI Suggestions</h2>
                    </div>
                    <span className="text-xs font-medium text-primary bg-primary-50 px-2.5 py-1 rounded-full">
                        {suggestions.length} new
                    </span>
                </div>
                <div className="divide-y divide-gray-100">
                    {suggestions.map((s, i) => (
                        <div key={i} className="px-6 py-4 flex items-start gap-4 hover:bg-gray-50/50 transition-colors">
                            <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center text-xs font-bold">
                                {i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-sm font-semibold text-text-dark">{s.title}</h3>
                                    <span className={`text-xs font-medium ${s.impactColor}`}>
                                        {s.impact} Impact
                                    </span>
                                </div>
                                <p className="text-xs text-text-medium leading-relaxed">{s.description}</p>
                            </div>
                            <button className="flex-shrink-0 px-3 py-1.5 text-xs font-medium text-primary bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                                Apply
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
