'use client';

import React, { useState } from 'react';
import ProtectedLayout from '@/components/ProtectedLayout';
import Card from '@/components/Card';
import Button from '@/components/Button';

interface GeneratedDesign {
    description: string;
    specifications: {
        material: string;
        dimensions: string;
        weight: string;
        color: string;
    };
}

export default function AIGeneratorPage() {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [generatedDesign, setGeneratedDesign] = useState<GeneratedDesign | null>(null);

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
        // API call will be connected to backend
        setTimeout(() => {
            setGeneratedDesign({
                description: 'AI-generated design based on your prompt',
                specifications: {
                    material: 'Recycled Aluminum',
                    dimensions: '120mm x 180mm',
                    weight: '300g',
                    color: 'Matte Silver',
                },
            });
            setLoading(false);
        }, 2000);
    };

    return (
        <ProtectedLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-dark mb-8">AI Design Generator</h1>

                <Card className="mb-8">
                    <h2 className="text-xl font-semibold text-slate-dark mb-4">
                        Describe Your Design Idea
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Let AI generate design specifications based on your description
                    </p>

                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe your product design idea... (e.g., 'A modern, eco-friendly water bottle with ergonomic grip')"
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all mb-4"
                    />

                    <Button
                        variant="primary"
                        onClick={handleGenerate}
                        disabled={loading || !prompt.trim()}
                        className="w-full md:w-auto"
                    >
                        {loading ? '🤖 Generating...' : '🤖 Generate Design'}
                    </Button>
                </Card>

                {generatedDesign && (
                    <Card>
                        <h2 className="text-xl font-semibold text-slate-dark mb-4">
                            ✨ Generated Design
                        </h2>
                        <p className="text-gray-600 mb-6">{generatedDesign.description}</p>

                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <h3 className="font-semibold text-slate-dark mb-4">Specifications</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(generatedDesign.specifications).map(([key, value]) => (
                                    <div key={key}>
                                        <p className="text-sm text-gray-500 capitalize">{key}</p>
                                        <p className="font-medium text-slate-dark">{value as string}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <Button variant="primary">
                                Submit for Analysis →
                            </Button>
                            <Button variant="secondary">
                                Edit Manually
                            </Button>
                            <Button variant="secondary">
                                Regenerate
                            </Button>
                        </div>
                    </Card>
                )}
            </div>
        </ProtectedLayout>
    );
}
