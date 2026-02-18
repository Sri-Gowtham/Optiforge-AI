'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import ProtectedLayout from '@/components/ProtectedLayout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Link from 'next/link';

export default function ProjectDetailPage() {
    const params = useParams();
    const projectId = params.id as string;

    // Sample data - will be replaced with API call
    const project = {
        id: projectId,
        name: 'Mobile App Redesign',
        description: 'Complete redesign of the mobile application with modern UI patterns and improved user experience',
        status: 'active',
        createdAt: '2026-02-14T10:00:00Z',
    };

    return (
        <ProtectedLayout>
            <div>
                <div className="mb-8">
                    <Link href="/projects" className="text-primary hover:underline mb-2 inline-block">
                        ← Back to Projects
                    </Link>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-dark mb-2">{project.name}</h1>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === 'active' ? 'bg-primary text-white' :
                                project.status === 'completed' ? 'bg-success text-white' :
                                    'bg-amber text-white'
                                }`}>
                                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </span>
                        </div>
                        <Button variant="secondary">Edit Project</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Project Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <h2 className="text-xl font-semibold text-slate-dark mb-4">Project Details</h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-slate-medium">Description</p>
                                    <p className="text-slate-dark">{project.description}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-medium">Created</p>
                                    <p className="text-slate-dark">
                                        {new Date(project.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-medium">Project ID</p>
                                    <p className="text-slate-dark font-mono text-sm">{project.id}</p>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <h2 className="text-xl font-semibold text-slate-dark mb-4">Design Files</h2>
                            <div className="text-center py-8 text-slate-medium">
                                <p>No design files uploaded yet</p>
                                <Button variant="primary" className="mt-4">
                                    Upload Design
                                </Button>
                            </div>
                        </Card>
                    </div>

                    {/* Actions Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <h2 className="text-xl font-semibold text-slate-dark mb-4">Actions</h2>
                            <div className="space-y-3">
                                <Link href="/manual-design">
                                    <Button variant="primary" className="w-full">
                                        ✏️ Manual Design
                                    </Button>
                                </Link>
                                <Link href="/ai-generator">
                                    <Button variant="secondary" className="w-full">
                                        🤖 AI Generator
                                    </Button>
                                </Link>
                                <Link href="/analysis">
                                    <Button variant="secondary" className="w-full">
                                        📊 View Analysis
                                    </Button>
                                </Link>
                            </div>
                        </Card>

                        <Card>
                            <h2 className="text-xl font-semibold text-slate-dark mb-4">Project Stats</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-medium">Analyses</span>
                                    <span className="font-semibold">3</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-medium">Designs</span>
                                    <span className="font-semibold">5</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-medium">Team Members</span>
                                    <span className="font-semibold">2</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </ProtectedLayout>
    );
}
