const express = require('express');
const profileController = require('../controllers/profileController');
const auth = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.get('/', auth, profileController.getProfile);
router.put('/', auth, profileController.updateProfile);

module.exports = router;
