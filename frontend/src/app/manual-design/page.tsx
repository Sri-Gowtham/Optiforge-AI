"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";

/* ── Parameter groups ── */
const parameterGroups = [
    {
        title: "Geometry",
        icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z",
        params: [
            { label: "Length (mm)", value: "120" },
            { label: "Width (mm)", value: "85" },
            { label: "Height (mm)", value: "40" },
            { label: "Wall Thickness (mm)", value: "3.5" },
        ],
    },
    {
        title: "Material",
        icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
        params: [
            { label: "Material Type", value: "Aluminum 6061-T6" },
            { label: "Density (g/cm³)", value: "2.70" },
            { label: "Yield Strength (MPa)", value: "276" },
            { label: "Elastic Modulus (GPa)", value: "68.9" },
        ],
    },
    {
        title: "Load Conditions",
        icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
        params: [
            { label: "Max Force (N)", value: "500" },
            { label: "Load Direction", value: "Lateral" },
            { label: "Safety Factor", value: "1.5" },
            { label: "Fatigue Cycles", value: "100,000" },
        ],
    },
    {
        title: "Manufacturing",
        icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
        params: [
            { label: "Process", value: "CNC Machining" },
            { label: "Tolerance (mm)", value: "±0.1" },
            { label: "Surface Finish", value: "Ra 1.6" },
            { label: "Batch Size", value: "500" },
        ],
    },
];

/* ── Cost line items ── */
const costBreakdown = [
    { label: "Raw Material", amount: 1240 },
    { label: "Machining", amount: 2850 },
    { label: "Surface Treatment", amount: 480 },
    { label: "Quality Inspection", amount: 320 },
    { label: "Tooling (Amortized)", amount: 560 },
];

export default function ManualDesignPage() {
    const [params, setParams] = useState(
        parameterGroups.map((g) => ({
            ...g,
            params: g.params.map((p) => ({ ...p })),
        }))
    );

    const totalCost = costBreakdown.reduce((sum, c) => sum + c.amount, 0);

    const updateParam = (gi: number, pi: number, value: string) => {
        const updated = [...params];
        updated[gi] = {
            ...updated[gi],
            params: updated[gi].params.map((p, i) => (i === pi ? { ...p, value } : p)),
        };
        setParams(updated);
    };

    return (
        <DashboardLayout title="Manual Design" subtitle="Configure design parameters manually">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                {/* ── Left: Parameter Cards (2 cols) ── */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {params.map((group, gi) => (
                        <div key={group.title} className="bg-white rounded-card shadow-card-soft p-6">
                            <div className="flex items-center gap-2.5 mb-5">
                                <div className="p-1.5 bg-primary-50 rounded-lg text-primary">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d={group.icon} />
                                    </svg>
                                </div>
                                <h2 className="text-sm font-semibold text-text-dark">{group.title}</h2>
                            </div>
                            <div className="space-y-3">
                                {group.params.map((p, pi) => (
                                    <div key={p.label}>
                                        <label className="block text-xs font-medium text-text-medium mb-1.5">{p.label}</label>
                                        <input
                                            type="text"
                                            value={p.value}
                                            onChange={(e) => updateParam(gi, pi, e.target.value)}
                                            className="w-full h-10 px-3 text-sm border border-border rounded-lg bg-bg-page text-text-dark
                        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Right: Cost Estimation Side Panel ── */}
                <div className="space-y-6">
                    <div className="bg-white rounded-card shadow-card-soft p-6">
                        <div className="flex items-center gap-2.5 mb-5">
                            <div className="p-1.5 bg-green-50 rounded-lg text-success">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-sm font-semibold text-text-dark">Cost Estimation</h2>
                        </div>

                        {/* Line items */}
                        <div className="space-y-3 mb-5">
                            {costBreakdown.map((item) => (
                                <div key={item.label} className="flex items-center justify-between">
                                    <span className="text-sm text-text-medium">{item.label}</span>
                                    <span className="text-sm font-medium text-text-dark">
                                        ${item.amount.toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-semibold text-text-dark">Total per Unit</span>
                                <span className="text-lg font-bold text-text-dark">
                                    ${totalCost.toLocaleString()}
                                </span>
                            </div>
                            <p className="text-xs text-text-light">Based on batch size of 500 units</p>
                        </div>

                        {/* Per-unit */}
                        <div className="mt-4 p-3 bg-primary-50 rounded-lg">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-primary">Per-Unit Cost</span>
                                <span className="text-sm font-bold text-primary">
                                    ${(totalCost / 500).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Save button */}
                    <button className="w-full h-12 bg-primary text-white text-sm font-semibold rounded-lg
            hover:bg-primary-dark active:scale-[0.98]
            shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30
            transition-all duration-150 flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        Save Design
                    </button>

                    {/* Quick Stats */}
                    <div className="bg-white rounded-card shadow-card-soft p-6">
                        <h3 className="text-sm font-semibold text-text-dark mb-4">Quick Stats</h3>
                        <div className="space-y-3">
                            {[
                                { label: "Estimated Weight", value: "1.82 kg", icon: "text-primary" },
                                { label: "Volume", value: "674 cm³", icon: "text-text-medium" },
                                { label: "Stress Rating", value: "Good", icon: "text-success" },
                            ].map((s) => (
                                <div key={s.label} className="flex items-center justify-between py-1">
                                    <span className="text-xs text-text-medium">{s.label}</span>
                                    <span className={`text-sm font-semibold ${s.icon}`}>{s.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
