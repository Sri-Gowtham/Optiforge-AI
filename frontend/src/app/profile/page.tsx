'use client';

import React, { useState } from 'react';
import ProtectedLayout from '@/components/ProtectedLayout';
import Card from '@/components/Card';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import { getCurrentUser } from '@/lib/auth';

export default function ProfilePage() {
    const user = getCurrentUser();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        company: '',
        phone: '',
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Profile update:', formData);
        // API call will be connected to backend
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        console.log('Password change');
        // API call will be connected to backend
    };

    return (
        <ProtectedLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-dark mb-8">Profile Settings</h1>

                {/* Profile Information */}
                <Card className="mb-8">
                    <h2 className="text-xl font-semibold text-slate-dark mb-6">Profile Information</h2>
                    <form onSubmit={handleProfileUpdate}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput
                                label="Full Name"
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="John Doe"
                            />

                            <FormInput
                                label="Email Address"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="you@example.com"
                            />

                            <FormInput
                                label="Company"
                                type="text"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                placeholder="Company Name"
                            />

                            <FormInput
                                label="Phone Number"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>

                        <div className="flex justify-end mt-6">
                            <Button type="submit" variant="primary">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Card>

                {/* Change Password */}
                <Card className="mb-8">
                    <h2 className="text-xl font-semibold text-slate-dark mb-6">Change Password</h2>
                    <form onSubmit={handlePasswordChange}>
                        <FormInput
                            label="Current Password"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                            placeholder="Enter current password"
                        />

                        <FormInput
                            label="New Password"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            placeholder="Enter new password"
                            helperText="Minimum 8 characters"
                        />

                        <FormInput
                            label="Confirm New Password"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            placeholder="Confirm new password"
                        />

                        <div className="flex justify-end mt-6">
                            <Button type="submit" variant="primary">
                                Update Password
                            </Button>
                        </div>
                    </form>
                </Card>

                {/* Account Settings */}
                <Card>
                    <h2 className="text-xl font-semibold text-slate-dark mb-6">Account Settings</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                            <div>
                                <p className="font-medium text-slate-dark">Email Notifications</p>
                                <p className="text-sm text-slate-medium">Receive email updates about your projects</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                            <div>
                                <p className="font-medium text-slate-dark">Two-Factor Authentication</p>
                                <p className="text-sm text-slate-medium">Add an extra layer of security</p>
                            </div>
                            <Button variant="secondary" size="sm">
                                Enable
                            </Button>
                        </div>

                        <div className="flex justify-between items-center py-3">
                            <div>
                                <p className="font-medium text-warning">Delete Account</p>
                                <p className="text-sm text-slate-medium">Permanently delete your account and all data</p>
                            </div>
                            <Button variant="danger" size="sm">
                                Delete
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </ProtectedLayout>
    );
}
