'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedLayout from '@/components/ProtectedLayout';
import Card from '@/components/Card';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';

export default function CreateProjectPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // API call will be connected to backend
            // await api.post('/projects', formData);

            // Simulate API delay
            setTimeout(() => {
                router.push('/projects');
            }, 1000);
        } catch (error) {
            console.error('Error creating project:', error);
            setLoading(false);
        }
    };

    return (
        <ProtectedLayout>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-dark mb-8">Create New Project</h1>

                <Card>
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            label="Project Name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter project name"
                            helperText="A descriptive name for your project"
                            required
                        />

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-dark mb-2">
                                Project Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Describe your project..."
                                rows={5}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        <div className="flex justify-end space-x-4 mt-6">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => router.push('/projects')}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Project'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </ProtectedLayout>
    );
}
