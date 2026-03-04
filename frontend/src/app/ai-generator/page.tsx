"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";

/* ── Sample output metrics ── */
const sampleMetrics = [
    { label: "Structural Score", value: "94%", color: "text-success" },
    { label: "Weight Reduction", value: "32%", color: "text-primary" },
    { label: "Cost Savings", value: "$4.2K", color: "text-success" },
    { label: "Stress Margin", value: "1.8x", color: "text-amber" },
];

/* ── Constraint presets ── */
const constraintPresets = [
    { label: "Max Weight (kg)", defaultValue: "2.5" },
    { label: "Min Safety Factor", defaultValue: "1.5" },
    { label: "Max Cost ($)", defaultValue: "5000" },
    { label: "Material", defaultValue: "Aluminum 6061-T6" },
];

export default function AIGeneratorPage() {
    const [prompt, setPrompt] = useState("");
    const [constraints, setConstraints] = useState(
        constraintPresets.map((c) => ({ ...c, value: c.defaultValue }))
    );
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasResult, setHasResult] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setHasResult(true);
        }, 2000);
    };

    return (
        <DashboardLayout title="AI Generator" subtitle="Generate optimized designs using AI">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                {/* ── Left: Input Panel ── */}
                <div className="space-y-6">

                    {/* Prompt */}
                    <div className="bg-white rounded-card shadow-card-soft p-6">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="p-1.5 bg-primary-50 rounded-lg text-primary">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h2 className="text-sm font-semibold text-text-dark">Design Prompt</h2>
                        </div>
                        <textarea
                            rows={6}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe the design you want to optimize. E.g., 'Generate a lightweight mounting bracket for automotive use that can withstand 500N lateral load while minimizing material usage...'"
                            className="w-full px-4 py-3 text-sm border border-border rounded-lg bg-bg-page text-text-dark placeholder-gray-400 resize-none
                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150"
                        />
                        <p className="text-xs text-text-light mt-2">
                            Be specific about load conditions, material preferences, and dimensional constraints.
                        </p>
                    </div>

                    {/* Constraints */}
                    <div className="bg-white rounded-card shadow-card-soft p-6">
                        <h2 className="text-sm font-semibold text-text-dark mb-4">Constraints</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {constraints.map((c, i) => (
                                <div key={c.label}>
                                    <label className="block text-xs font-medium text-text-medium mb-1.5">{c.label}</label>
                                    <input
                                        type="text"
                                        value={c.value}
                                        onChange={(e) => {
                                            const updated = [...constraints];
                                            updated[i] = { ...updated[i], value: e.target.value };
                                            setConstraints(updated);
                                        }}
                                        className="w-full h-10 px-3 text-sm border border-border rounded-lg bg-bg-page text-text-dark
                      focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full h-12 bg-primary text-white text-sm font-semibold rounded-lg
              hover:bg-primary-dark active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed
              shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30
              transition-all duration-150 flex items-center justify-center gap-2"
                    >
                        {isGenerating ? (
                            <>
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Generating Design...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Generate Design
                            </>
                        )}
                    </button>
                </div>

                {/* ── Right: Output Preview Panel ── */}
                <div className="space-y-6">

                    {/* Preview Card */}
                    <div className="bg-white rounded-card shadow-card-soft overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-text-dark">Design Preview</h2>
                            {hasResult && (
                                <span className="text-xs font-medium text-success bg-green-50 px-2.5 py-1 rounded-full">Generated</span>
                            )}
                        </div>
                        <div className="h-72 bg-gray-50 flex items-center justify-center">
                            {hasResult ? (
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-primary-50 flex items-center justify-center">
                                        <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-medium text-text-dark">Optimized Bracket v1</p>
                                    <p className="text-xs text-text-light mt-1">AI-generated • Just now</p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-sm text-text-light">No design generated yet</p>
                                    <p className="text-xs text-gray-400 mt-1">Enter a prompt and click Generate</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Metrics Summary */}
                    {hasResult && (
                        <div className="bg-white rounded-card shadow-card-soft p-6">
                            <h2 className="text-sm font-semibold text-text-dark mb-4">Metrics Summary</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {sampleMetrics.map((m) => (
                                    <div key={m.label} className="bg-bg-page rounded-lg p-4">
                                        <p className="text-xs text-text-medium mb-1">{m.label}</p>
                                        <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-3 mt-5 pt-5 border-t border-gray-100">
                                <button className="flex-1 h-10 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">
                                    Save Design
                                </button>
                                <button className="flex-1 h-10 bg-white text-text-dark text-sm font-medium rounded-lg border border-border hover:bg-gray-50 transition-colors">
                                    Regenerate
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
