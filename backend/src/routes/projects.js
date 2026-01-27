const express = require('express');
const router = express.Router();
const {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    analyzeProject,
    getProjectStats
} = require('../controllers/projectController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// All routes are protected
router.use(authMiddleware);

router.get('/', getProjects);
router.get('/stats', getProjectStats);
router.get('/:id', getProject);
router.post('/', upload.single('file'), createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.post('/:id/analyze', analyzeProject);

module.exports = router;
