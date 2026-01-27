import React, { useState, useEffect } from 'react';
import { budgetAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../pages/Dashboard.css';

const BudgetPage = () => {
    const [budgetData, setBudgetData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBudget();
    }, []);

    const fetchBudget = async () => {
        try {
            const response = await budgetAPI.getSummary();
            setBudgetData(response.data);
        } catch (error) {
            console.error('Failed to fetch budget:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading-container"><div className="spinner"></div></div>;
    }

    return (
        <div className="dashboard-layout">
            <Navbar />
            <div className="dashboard-container">
                <Sidebar />
                <main className="dashboard-main">
                    <div className="dashboard-header">
                        <h1>Budget Tracking</h1>
                    </div>

                    {/* Summary Cards */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">💰</div>
                            <div className="stat-content">
                                <div className="stat-value">${budgetData.summary.totalBudget.toLocaleString()}</div>
                                <div className="stat-label">Total Budget</div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">📊</div>
                            <div className="stat-content">
                                <div className="stat-value">${budgetData.summary.totalEstimated.toLocaleString()}</div>
                                <div className="stat-label">Estimated Cost</div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">
                                {budgetData.summary.totalVariance >= 0 ? '✅' : '⚠️'}
                            </div>
                            <div className="stat-content">
                                <div className="stat-value" style={{ color: budgetData.summary.totalVariance >= 0 ? '#10b981' : '#ef4444' }}>
                                    ${Math.abs(budgetData.summary.totalVariance).toLocaleString()}
                                </div>
                                <div className="stat-label">
                                    {budgetData.summary.totalVariance >= 0 ? 'Under Budget' : 'Over Budget'}
                                </div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">📁</div>
                            <div className="stat-content">
                                <div className="stat-value">{budgetData.summary.projectCount}</div>
                                <div className="stat-label">Projects</div>
                            </div>
                        </div>
                    </div>

                    {/* Projects Table */}
                    <div className="card">
                        <h2 className="card-title">Project Budget Breakdown</h2>
                        <div className="table-container">
                            <table className="projects-table">
                                <thead>
                                    <tr>
                                        <th>Project</th>
                                        <th>Budget</th>
                                        <th>Estimated</th>
                                        <th>Variance</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {budgetData.projects.map((project) => (
                                        <tr key={project.projectId}>
                                            <td>{project.projectName}</td>
                                            <td>${project.budget.toLocaleString()}</td>
                                            <td>${project.estimated.toLocaleString()}</td>
                                            <td style={{ color: project.variance >= 0 ? '#10b981' : '#ef4444' }}>
                                                ${Math.abs(project.variance).toLocaleString()}
                                            </td>
                                            <td>
                                                <span className={`badge badge-${project.status === 'completed' ? 'success' : 'info'}`}>
                                                    {project.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BudgetPage;
