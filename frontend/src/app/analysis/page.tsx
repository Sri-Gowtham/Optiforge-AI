'use client';

import React, { useEffect, useState } from 'react';
import ProtectedLayout from '@/components/ProtectedLayout';
import Card from '@/components/Card';
import LoadingSpinner from '@/components/LoadingSpinner';

const ANALYSIS_STEPS = [
    'Initializing analysis...',
    'Processing design specifications...',
    'Analyzing structural integrity...',
    'Evaluating material efficiency...',
    'Calculating cost optimization...',
    'Generating recommendations...',
    'Finalizing results...',
];

export default function AnalysisPage() {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState('Initializing...');

    useEffect(() => {
        // Simulate analysis progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    // Redirect to results page
                    setTimeout(() => {
                        window.location.href = '/results';
                    }, 1000);
                    return 100;
                }
                return prev + 2;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Update current step based on progress
        const stepIndex = Math.floor((progress / 100) * ANALYSIS_STEPS.length);
        if (stepIndex < ANALYSIS_STEPS.length) {
            setCurrentStep(ANALYSIS_STEPS[stepIndex]);
        }
    }, [progress]);

    return (
        <ProtectedLayout>
            <div className="max-w-2xl mx-auto mt-12">
                <Card className="text-center">
                    <h1 className="text-3xl font-bold text-slate-dark mb-4">
                        Analyzing Your Design
                    </h1>
                    <p className="text-slate-medium mb-8">
                        Our AI is analyzing your design specifications. This may take a few moments.
                    </p>

                    <div className="mb-8">
                        <LoadingSpinner size="lg" />
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                            <div
                                className="bg-primary h-3 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className="text-sm font-medium text-slate-dark">{progress}% Complete</p>
                    </div>

                    {/* Current Step */}
                    <div className="bg-primary/10 rounded-lg p-4 mb-8">
                        <p className="text-primary font-medium">{currentStep}</p>
                    </div>

                    {/* Analysis Stages */}
                    <div className="text-left">
                        <h3 className="font-semibold text-slate-dark mb-4">Analysis Stages:</h3>
                        <div className="space-y-2">
                            {ANALYSIS_STEPS.map((step, index) => {
                                const stepProgress = (index / ANALYSIS_STEPS.length) * 100;
                                const isComplete = progress > stepProgress;
                                const isCurrent = currentStep === step;

                                return (
                                    <div
                                        key={index}
                                        className={`flex items-center space-x-3 p-2 rounded ${isCurrent ? 'bg-primary/10' : ''
                                            }`}
                                    >
                                        <span className="text-xl">
                                            {isComplete ? '✅' : '⏳'}
                                        </span>
                                        <span className={isComplete ? 'text-success font-medium' : 'text-slate-medium'}>
                                            {step}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Card>
            </div>
        </ProtectedLayout>
    );
}
