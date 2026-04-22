const express = require('express');
const jobController = require('../controllers/jobController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Public routes
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);

// Admin routes
router.post('/', adminAuth, jobController.createJob);
router.put('/:id', adminAuth, jobController.updateJob);
router.delete('/:id', adminAuth, jobController.deleteJob);

// Admin dashboard - get all their jobs with stats
router.get('/admin/my-jobs/stats', adminAuth, jobController.getAdminJobsWithStats);

module.exports = router;
