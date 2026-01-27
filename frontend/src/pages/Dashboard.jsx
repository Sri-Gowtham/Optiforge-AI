import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [stats, setStats] = useState({ total: 0, completed: 0, analyzing: 0, averageScore: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [projectsRes, statsRes] = await Promise.all([
                projectsAPI.getAll(),
                projectsAPI.getStats()
            ]);
            setProjects(projectsRes.data.projects);
            setStats(statsRes.data);
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
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
                        <h1>Welcome back, {user?.name}! 👋</h1>
                        <Link to="/projects/new" className="btn btn-primary">
                            ➕ New Project
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">📁</div>
                            <div className="stat-content">
                                <div className="stat-value">{stats.total}</div>
                                <div className="stat-label">Total Projects</div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">✅</div>
                            <div className="stat-content">
                                <div className="stat-value">{stats.completed}</div>
                                <div className="stat-label">Completed</div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">⚡</div>
                            <div className="stat-content">
                                <div className="stat-value">{stats.analyzing}</div>
                                <div className="stat-label">Analyzing</div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">📊</div>
                            <div className="stat-content">
                                <div className="stat-value">{stats.averageScore}/100</div>
                                <div className="stat-label">Avg Score</div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Projects */}
                    <div className="card">
                        <h2 className="card-title">Recent Projects</h2>

                        {projects.length === 0 ? (
                            <div className="empty-state">
                                <p>No projects yet. Create your first project to get started!</p>
                                <Link to="/projects/new" className="btn btn-primary mt-md">
                                    Create Project
                                </Link>
                            </div>
                        ) : (
                            <div className="table-container">
                                <table className="projects-table">
                                    <thead>
                                        <tr>
                                            <th>Project Name</th>
                                            <th>Status</th>
                                            <th>Budget</th>
                                            <th>Created</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.slice(0, 5).map((project) => (
                                            <tr key={project.id}>
                                                <td>{project.name}</td>
                                                <td>
                                                    <span className={`badge badge-${project.status === 'completed' ? 'success' : project.status === 'analyzing' ? 'warning' : 'info'}`}>
                                                        {project.status}
                                                    </span>
                                                </td>
                                                <td>${project.budget?.toLocaleString() || 'N/A'}</td>
                                                <td>{new Date(project.created_at).toLocaleDateString()}</td>
                                                <td>
                                                    <Link to={`/projects/${project.id}`} className="btn btn-sm btn-secondary">
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
