import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../pages/Dashboard.css';
import './ProjectDetails.css';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [analyzing, setAnalyzing] = useState(false);

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        try {
            const response = await projectsAPI.getOne(id);
            setProject(response.data.project);
            setAnalysis(response.data.analysis);
        } catch (error) {
            console.error('Failed to fetch project:', error);
            navigate('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleAnalyze = async () => {
        setAnalyzing(true);
        try {
            await projectsAPI.analyze(id);
            await fetchProject();
        } catch (error) {
            alert('Analysis failed. Please try again.');
        } finally {
            setAnalyzing(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 85) return '#10b981';
        if (score >= 70) return '#fbbf24';
        return '#ef4444';
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
                        <h1>{project.name}</h1>
                        {project.status !== 'completed' && (
                            <button onClick={handleAnalyze} className="btn btn-primary" disabled={analyzing}>
                                {analyzing ? '⚡ Analyzing...' : '🤖 Run Analysis'}
                            </button>
                        )}
                    </div>

                    {/* Project Info */}
                    <div className="card mb-lg">
                        <div className="grid grid-2">
                            <div>
                                <p><strong>Description:</strong> {project.description || 'N/A'}</p>
                                <p><strong>Intended Use:</strong> {project.intended_use || 'N/A'}</p>
                            </div>
                            <div>
                                <p><strong>Budget:</strong> ${project.budget?.toLocaleString() || 'N/A'}</p>
                                <p><strong>Timeline:</strong> {project.timeline || 'N/A'}</p>
                                <p><strong>Status:</strong> <span className={`badge badge-${project.status === 'completed' ? 'success' : 'info'}`}>{project.status}</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Analysis Results */}
                    {analysis ? (
                        <>
                            {/* Overall Score */}
                            <div className="score-card">
                                <h2>Overall Score</h2>
                                <div className="overall-score" style={{ color: getScoreColor(analysis.overall_score) }}>
                                    {analysis.overall_score}/100
                                </div>
                                <p className="score-label">
                                    {analysis.overall_score >= 85 ? 'Excellent' : analysis.overall_score >= 70 ? 'Good' : 'Needs Improvement'}
                                </p>
                            </div>

                            {/* 5 Agent Scores */}
                            <div className="agents-grid">
                                <div className="agent-card">
                                    <h3>🎨 Visual Design</h3>
                                    <div className="score-bar">
                                        <div className="score-fill" style={{ width: `${analysis.visual_score}%`, background: getScoreColor(analysis.visual_score) }}></div>
                                    </div>
                                    <p className="score-text">{analysis.visual_score}/100</p>
                                </div>

                                <div className="agent-card">
                                    <h3>⚡ Performance</h3>
                                    <div className="score-bar">
                                        <div className="score-fill" style={{ width: `${analysis.performance_score}%`, background: getScoreColor(analysis.performance_score) }}></div>
                                    </div>
                                    <p className="score-text">{analysis.performance_score}/100</p>
                                </div>

                                <div className="agent-card">
                                    <h3>🔧 Materials</h3>
                                    <div className="score-bar">
                                        <div className="score-fill" style={{ width: `${analysis.materials_score}%`, background: getScoreColor(analysis.materials_score) }}></div>
                                    </div>
                                    <p className="score-text">{analysis.materials_score}/100</p>
                                </div>

                                <div className="agent-card">
                                    <h3>💰 Cost</h3>
                                    <div className="score-bar">
                                        <div className="score-fill" style={{ width: `${analysis.cost_score}%`, background: getScoreColor(analysis.cost_score) }}></div>
                                    </div>
                                    <p className="score-text">{analysis.cost_score}/100</p>
                                </div>

                                <div className="agent-card">
                                    <h3>🏭 Feasibility</h3>
                                    <div className="score-bar">
                                        <div className="score-fill" style={{ width: `${analysis.feasibility_score}%`, background: getScoreColor(analysis.feasibility_score) }}></div>
                                    </div>
                                    <p className="score-text">{analysis.feasibility_score}/100</p>
                                </div>
                            </div>

                            {/* Recommendations */}
                            <div className="card">
                                <h2 className="card-title">Recommendations</h2>
                                <ul className="recommendations-list">
                                    {analysis.recommendations?.map((rec, index) => (
                                        <li key={index}>{rec}</li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    ) : (
                        <div className="card text-center">
                            <p>No analysis available yet.</p>
                            <button onClick={handleAnalyze} className="btn btn-primary mt-md" disabled={analyzing}>
                                {analyzing ? '⚡ Analyzing...' : '🤖 Run Analysis Now'}
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProjectDetails;
