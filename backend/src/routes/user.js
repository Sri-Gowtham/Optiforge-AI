const express = require('express');
const router = express.Router();
const { updateProfile, changePassword } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// All routes are protected
router.use(authMiddleware);

router.put('/profile', updateProfile);
router.put('/password', changePassword);

module.exports = router;
