const { ProjectModel, AnalysisModel } = require('../models/database');
const { runAnalysis } = require('../utils/aiEngine');
const path = require('path');

// Get all projects for user
const getProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.findByUserId(req.userId);
        res.json({ projects });
    } catch (error) {
        console.error('Get projects error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get single project
const getProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await ProjectModel.findById(id, req.userId);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Get analysis if exists
        const analysis = await AnalysisModel.findByProjectId(id);

        res.json({
            project,
            analysis
        });
    } catch (error) {
        console.error('Get project error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Create new project
const createProject = async (req, res) => {
    try {
        const { name, description, intendedUse, budget, timeline } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Project name is required' });
        }

        const filePath = req.file ? req.file.path : null;

        const projectId = await ProjectModel.create(req.userId, {
            name,
            description,
            filePath,
            intendedUse,
            budget: budget ? parseFloat(budget) : null,
            timeline
        });

        const project = await ProjectModel.findById(projectId, req.userId);

        res.status(201).json({
            message: 'Project created successfully',
            project
        });
    } catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update project
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, intendedUse, budget, timeline } = req.body;

        const project = await ProjectModel.findById(id, req.userId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        await ProjectModel.update(id, req.userId, {
            name: name || project.name,
            description: description || project.description,
            intendedUse: intendedUse || project.intended_use,
            budget: budget ? parseFloat(budget) : project.budget,
            timeline: timeline || project.timeline
        });

        const updatedProject = await ProjectModel.findById(id, req.userId);
        res.json({
            message: 'Project updated successfully',
            project: updatedProject
        });
    } catch (error) {
        console.error('Update project error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete project
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await ProjectModel.findById(id, req.userId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        await ProjectModel.delete(id, req.userId);

        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Delete project error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Analyze project
const analyzeProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await ProjectModel.findById(id, req.userId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Update status to analyzing
        await ProjectModel.updateStatus(id, 'analyzing');

        // Run AI analysis (this takes 10-15 seconds)
        const analysisResult = await runAnalysis(id);

        // Save analysis to database
        const analysisId = await AnalysisModel.create(id, analysisResult);

        // Update project status to completed
        await ProjectModel.updateStatus(id, 'completed');

        // Get the saved analysis
        const analysis = await AnalysisModel.findByProjectId(id);

        res.json({
            message: 'Analysis completed successfully',
            analysis
        });
    } catch (error) {
        console.error('Analyze project error:', error);

        // Revert status on error
        if (req.params.id) {
            await ProjectModel.updateStatus(req.params.id, 'pending');
        }

        res.status(500).json({ error: 'Analysis failed' });
    }
};

// Get project stats
const getProjectStats = async (req, res) => {
    try {
        const stats = await ProjectModel.getStats(req.userId);
        const avgScore = await AnalysisModel.getAverageScore(req.userId);

        res.json({
            ...stats,
            averageScore: avgScore
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    analyzeProject,
    getProjectStats
};
