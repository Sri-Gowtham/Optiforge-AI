'use client';

import React, { useState } from 'react';
import ProtectedLayout from '@/components/ProtectedLayout';
import Card from '@/components/Card';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';

export default function ManualDesignPage() {
    const [formData, setFormData] = useState({
        projectName: '',
        width: '',
        height: '',
        material: '',
        color: '',
        weight: '',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Manual design data:', formData);
        // API call will be connected to backend
    };

    return (
        <ProtectedLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-dark mb-8">Manual Design Input</h1>

                <Card>
                    <p className="text-gray-600 mb-6">
                        Enter your product design specifications manually for analysis
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput
                                label="Project Name"
                                type="text"
                                value={formData.projectName}
                                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                                placeholder="Enter project name"
                                required
                            />

                            <FormInput
                                label="Material"
                                type="text"
                                value={formData.material}
                                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                                placeholder="e.g., Aluminum, Plastic, Wood"
                                required
                            />

                            <FormInput
                                label="Width (mm)"
                                type="number"
                                value={formData.width}
                                onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                                placeholder="100"
                                required
                            />

                            <FormInput
                                label="Height (mm)"
                                type="number"
                                value={formData.height}
                                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                placeholder="150"
                                required
                            />

                            <FormInput
                                label="Color"
                                type="text"
                                value={formData.color}
                                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                placeholder="e.g., Blue, Red, Metallic"
                            />

                            <FormInput
                                label="Weight (g)"
                                type="number"
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                placeholder="250"
                            />
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-slate-dark mb-2">
                                Additional Notes
                            </label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                placeholder="Any additional design specifications or requirements..."
                                rows={4}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="flex justify-end space-x-4 mt-8">
                            <Button type="button" variant="secondary">
                                Save as Draft
                            </Button>
                            <Button type="submit" variant="primary">
                                Submit for Analysis →
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </ProtectedLayout>
    );
}
