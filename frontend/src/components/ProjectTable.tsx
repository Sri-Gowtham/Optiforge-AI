import React from 'react';
import Link from 'next/link';
import { Project } from '@/types';

interface ProjectTableProps {
    projects: Project[];
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-primary text-white';
            case 'completed':
                return 'bg-success text-white';
            case 'pending':
                return 'bg-amber text-white';
            default:
                return 'bg-gray-300 text-gray-700';
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-card shadow-md">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Project Name
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Description
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Created
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {projects.map((project) => (
                        <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                                <Link href={`/projects/${project.id}`} className="text-primary hover:underline font-medium">
                                    {project.name}
                                </Link>
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                                {project.description.substring(0, 50)}
                                {project.description.length > 50 ? '...' : ''}
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-600 text-sm">
                                {formatDate(project.createdAt)}
                            </td>
                            <td className="px-6 py-4">
                                <Link
                                    href={`/projects/${project.id}`}
                                    className="text-primary hover:text-primary-dark font-medium text-sm"
                                >
                                    View →
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {projects.length === 0 && (
                <div className="text-center py-12 bg-white">
                    <p className="text-gray-500">No projects found</p>
                </div>
            )}
        </div>
    );
};

export default ProjectTable;
