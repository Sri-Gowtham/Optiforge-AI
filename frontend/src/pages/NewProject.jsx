import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { projectsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../pages/Dashboard.css';
import './NewProject.css';

const NewProject = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        intendedUse: '',
        budget: '',
        timeline: ''
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg'],
            'application/pdf': ['.pdf']
        },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0]);
            setError('');
        }
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name) {
            setError('Project name is required');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('intendedUse', formData.intendedUse);
            data.append('budget', formData.budget);
            data.append('timeline', formData.timeline);
            if (file) data.append('file', file);

            const response = await projectsAPI.create(data);
            const projectId = response.data.project.id;

            // Trigger analysis
            await projectsAPI.analyze(projectId);

            navigate(`/projects/${projectId}`);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-layout">
            <Navbar />
            <div className="dashboard-container">
                <Sidebar />
                <main className="dashboard-main">
                    <div className="dashboard-header">
                        <h1>Create New Project</h1>
                    </div>

                    {error && <div className="alert alert-error">{error}</div>}

                    <div className="card">
                        <form onSubmit={handleSubmit}>
                            {/* File Upload */}
                            <div className="form-group">
                                <label className="form-label">Design File</label>
                                <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                                    <input {...getInputProps()} />
                                    {file ? (
                                        <div>
                                            <p className="file-name">📄 {file.name}</p>
                                            <p className="file-size">{(file.size / 1024).toFixed(2)} KB</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="dropzone-text">
                                                {isDragActive ? 'Drop file here...' : 'Drag & drop your design file, or click to browse'}
                                            </p>
                                            <p className="dropzone-hint">Supports JPG, PNG, PDF (Max 10MB)</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Project Details */}
                            <div className="form-group">
                                <label className="form-label">Project Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    placeholder="e.g., Water Bottle Design v2"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea
                                    name="description"
                                    className="form-textarea"
                                    placeholder="Brief description of your design..."
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Intended Use</label>
                                <input
                                    type="text"
                                    name="intendedUse"
                                    className="form-input"
                                    placeholder="e.g., Consumer product, Prototype, Production"
                                    value={formData.intendedUse}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid grid-2">
                                <div className="form-group">
                                    <label className="form-label">Budget (USD)</label>
                                    <input
                                        type="number"
                                        name="budget"
                                        className="form-input"
                                        placeholder="5000"
                                        value={formData.budget}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Timeline</label>
                                    <input
                                        type="text"
                                        name="timeline"
                                        className="form-input"
                                        placeholder="e.g., 2 weeks, 1 month"
                                        value={formData.timeline}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={loading}>
                                {loading ? '⚡ Analyzing...' : '🚀 Create & Analyze Project'}
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default NewProject;
