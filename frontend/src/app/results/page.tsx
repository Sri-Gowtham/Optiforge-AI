import React from 'react';
import ProtectedLayout from '@/components/ProtectedLayout';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function ResultsPage() {
    // Sample analysis results - will be replaced with API data
    const results = {
        overallScore: 8.5,
        analysisDate: '2026-02-15',
        projectName: 'Mobile App Redesign',
        insights: [
            {
                category: 'Structural Integrity',
                score: 9.2,
                status: 'Excellent',
                description: 'Design shows strong structural integrity with optimal weight distribution.',
            },
            {
                category: 'Material Efficiency',
                score: 7.8,
                status: 'Good',
                description: 'Material usage is efficient but could be optimized for cost reduction.',
            },
            {
                category: 'Cost Optimization',
                score: 8.1,
                status: 'Very Good',
                description: 'Production costs are well-optimized with room for minor improvements.',
            },
            {
                category: 'Sustainability',
                score: 9.0,
                status: 'Excellent',
                description: 'Excellent use of eco-friendly materials and sustainable design practices.',
            },
        ],
        recommendations: [
            'Consider using recycled materials to improve sustainability score',
            'Optimize wall thickness to reduce material costs by 15%',
            'Incorporate modular design for easier assembly and maintenance',
        ],
    };

    const getScoreColor = (score: number) => {
        if (score >= 8.5) return 'text-success';
        if (score >= 7) return 'text-primary';
        if (score >= 5) return 'text-amber';
        return 'text-warning';
    };

    return (
        <ProtectedLayout>
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-dark mb-2">Analysis Results</h1>
                        <p className="text-slate-medium">{results.projectName} • {results.analysisDate}</p>
                    </div>
                    <div className="flex space-x-3">
                        <Button variant="secondary">Download Report</Button>
                        <Button variant="primary">New Analysis</Button>
                    </div>
                </div>

                {/* Overall Score */}
                <Card className="mb-8 text-center">
                    <h2 className="text-xl font-semibold text-slate-dark mb-4">Overall Score</h2>
                    <div className={`text-7xl font-bold ${getScoreColor(results.overallScore)} mb-2`}>
                        {results.overallScore}
                    </div>
                    <p className="text-slate-medium">out of 10</p>
                </Card>

                {/* Detailed Insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {results.insights.map((insight, index) => (
                        <Card key={index}>
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg font-semibold text-slate-dark">{insight.category}</h3>
                                <span className={`text-2xl font-bold ${getScoreColor(insight.score)}`}>
                                    {insight.score}
                                </span>
                            </div>
                            <div className="mb-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${insight.score >= 8.5 ? 'bg-success text-white' :
                                    insight.score >= 7 ? 'bg-primary text-white' :
                                        'bg-amber text-white'
                                    }`}>
                                    {insight.status}
                                </span>
                            </div>
                            <p className="text-slate-medium text-sm">{insight.description}</p>
                        </Card>
                    ))}
                </div>

                {/* Recommendations */}
                <Card>
                    <h2 className="text-xl font-semibold text-slate-dark mb-4">💡 Recommendations</h2>
                    <ul className="space-y-3">
                        {results.recommendations.map((recommendation, index) => (
                            <li key={index} className="flex items-start space-x-3">
                                <span className="text-primary text-xl">→</span>
                                <p className="text-slate-dark">{recommendation}</p>
                            </li>
                        ))}
                    </ul>
                </Card>

                {/* Action Buttons */}
                <div className="mt-8 flex justify-center space-x-4">
                    <Button variant="secondary">Share Results</Button>
                    <Button variant="secondary">Save to Project</Button>
                    <Button variant="primary">Apply Recommendations</Button>
                </div>
            </div>
        </ProtectedLayout>
    );
}
