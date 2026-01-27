const express = require('express');
const router = express.Router();
const { getBudgetSummary, getProjectBudget } = require('../controllers/budgetController');
const authMiddleware = require('../middleware/auth');

// All routes are protected
router.use(authMiddleware);

router.get('/', getBudgetSummary);
router.get('/:projectId', getProjectBudget);

module.exports = router;
