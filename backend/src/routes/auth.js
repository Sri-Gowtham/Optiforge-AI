const express = require('express');
const router = express.Router();
const { signup, login, getCurrentUser, signupValidation, loginValidation } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

// Protected routes
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;
