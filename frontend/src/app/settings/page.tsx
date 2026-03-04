"use client";

import DashboardLayout from "@/components/DashboardLayout";

export default function SettingsPage() {
    return (
        <DashboardLayout title="Settings" subtitle="Manage your account and preferences">
            <div className="max-w-3xl space-y-6">
                {/* Profile */}
                <div className="bg-white rounded-card border border-gray-200 p-6">
                    <h2 className="text-sm font-semibold text-text-dark mb-4">Profile Information</h2>
                    <div className="flex items-center gap-5 mb-6">
                        <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center text-primary font-semibold text-xl">
                            JD
                        </div>
                        <div>
                            <p className="text-sm font-medium text-text-dark">John Doe</p>
                            <p className="text-xs text-text-medium mt-0.5">john@optiforge.ai</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-text-medium mb-1.5">Full Name</label>
                            <input
                                type="text"
                                defaultValue="John Doe"
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-bg-page focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-text-medium mb-1.5">Email Address</label>
                            <input
                                type="email"
                                defaultValue="john@optiforge.ai"
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-bg-page focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-text-medium mb-1.5">Role</label>
                            <input
                                type="text"
                                defaultValue="Design Engineer"
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-bg-page focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-text-medium mb-1.5">Company</label>
                            <input
                                type="text"
                                defaultValue="OptiForge Inc."
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-bg-page focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                    </div>
                    <div className="mt-5">
                        <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">
                            Save Profile
                        </button>
                    </div>
                </div>

                {/* Password */}
                <div className="bg-white rounded-card border border-gray-200 p-6">
                    <h2 className="text-sm font-semibold text-text-dark mb-4">Change Password</h2>
                    <div className="space-y-4 max-w-md">
                        <div>
                            <label className="block text-xs font-medium text-text-medium mb-1.5">Current Password</label>
                            <input
                                type="password"
                                placeholder="Enter current password"
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-bg-page focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-text-medium mb-1.5">New Password</label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-bg-page focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-text-medium mb-1.5">Confirm New Password</label>
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-bg-page focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                    </div>
                    <div className="mt-5">
                        <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">
                            Update Password
                        </button>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-card border border-gray-200 p-6">
                    <h2 className="text-sm font-semibold text-text-dark mb-4">Notification Preferences</h2>
                    <div className="space-y-4">
                        {[
                            { label: "Analysis Complete", desc: "Receive notifications when an analysis finishes", defaultOn: true },
                            { label: "Weekly Digest", desc: "Get a weekly summary of your project activity", defaultOn: true },
                            { label: "Design Comments", desc: "Notify when teammates comment on your designs", defaultOn: false },
                            { label: "System Updates", desc: "Receive platform update and maintenance notices", defaultOn: false },
                        ].map((pref) => (
                            <div key={pref.label} className="flex items-center justify-between py-2">
                                <div>
                                    <p className="text-sm font-medium text-text-dark">{pref.label}</p>
                                    <p className="text-xs text-text-medium mt-0.5">{pref.desc}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked={pref.defaultOn} className="sr-only peer" />
                                    <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"></div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
