const { ProjectModel, AnalysisModel } = require('../models/database');

// Get budget summary for all projects
const getBudgetSummary = async (req, res) => {
    try {
        const projects = await ProjectModel.findByUserId(req.userId);

        let totalBudget = 0;
        let totalEstimated = 0;
        const budgetByProject = [];

        for (const project of projects) {
            const analysis = await AnalysisModel.findByProjectId(project.id);
            const estimatedCost = analysis?.analysis_data?.cost?.costBreakdown?.total || 0;

            totalBudget += project.budget || 0;
            totalEstimated += estimatedCost;

            budgetByProject.push({
                projectId: project.id,
                projectName: project.name,
                budget: project.budget || 0,
                estimated: estimatedCost,
                variance: (project.budget || 0) - estimatedCost,
                status: project.status
            });
        }

        res.json({
            summary: {
                totalBudget,
                totalEstimated,
                totalVariance: totalBudget - totalEstimated,
                projectCount: projects.length
            },
            projects: budgetByProject
        });
    } catch (error) {
        console.error('Get budget summary error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get budget for specific project
const getProjectBudget = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await ProjectModel.findById(projectId, req.userId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const analysis = await AnalysisModel.findByProjectId(projectId);
        const costBreakdown = analysis?.analysis_data?.cost?.costBreakdown || null;

        res.json({
            projectId,
            projectName: project.name,
            budget: project.budget || 0,
            estimated: costBreakdown?.total || 0,
            breakdown: costBreakdown,
            variance: (project.budget || 0) - (costBreakdown?.total || 0)
        });
    } catch (error) {
        console.error('Get project budget error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getBudgetSummary,
    getProjectBudget
};
