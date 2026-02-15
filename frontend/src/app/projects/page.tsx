import React from 'react';
import ProtectedLayout from '@/components/ProtectedLayout';
import ProjectTable from '@/components/ProjectTable';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Link from 'next/link';
import { Project } from '@/types';

export default function ProjectsPage() {
    // Sample data - will be replaced with API calls
    const projects: Project[] = [
        {
            id: '1',
            name: 'Mobile App Redesign',
            description: 'Complete redesign of the mobile application with modern UI patterns',
            status: 'active',
            createdAt: '2026-02-14T10:00:00Z',
            userId: 'user1',
        },
        {
            id: '2',
            name: 'E-commerce Platform',
            description: 'New e-commerce platform with AI-powered recommendations',
            status: 'completed',
            createdAt: '2026-02-12T14:30:00Z',
            userId: 'user1',
        },
        {
            id: '3',
            name: 'Dashboard UI Optimization',
            description: 'Optimize dashboard for better performance and UX',
            status: 'pending',
            createdAt: '2026-02-10T09:15:00Z',
            userId: 'user1',
        },
        {
            id: '4',
            name: 'Marketing Website',
            description: 'New marketing website with landing pages',
            status: 'active',
            createdAt: '2026-02-08T16:45:00Z',
            userId: 'user1',
        },
        {
            id: '5',
            name: 'Product Packaging Design',
            description: 'Sustainable packaging design for new product line',
            status: 'completed',
            createdAt: '2026-02-05T11:20:00Z',
            userId: 'user1',
        },
    ];

    return (
        <ProtectedLayout>
            <div>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-dark">Projects</h1>
                    <Link href="/projects/create">
                        <Button variant="primary">
                            + Create New Project
                        </Button>
                    </Link>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <p className="text-sm text-gray-500 mb-1">Total Projects</p>
                        <p className="text-3xl font-bold text-slate-dark">{projects.length}</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-gray-500 mb-1">Active</p>
                        <p className="text-3xl font-bold text-primary">
                            {projects.filter(p => p.status === 'active').length}
                        </p>
                    </Card>
                    <Card>
                        <p className="text-sm text-gray-500 mb-1">Completed</p>
                        <p className="text-3xl font-bold text-success">
                            {projects.filter(p => p.status === 'completed').length}
                        </p>
                    </Card>
                </div>

                {/* Projects Table */}
                <ProjectTable projects={projects} />
            </div>
        </ProtectedLayout>
    );
}
