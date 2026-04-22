const express = require('express');
const applicationController = require('../controllers/applicationController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Job Seeker routes
router.post('/apply', auth, applicationController.applyForJob);
router.get('/my-applications', auth, applicationController.getMyApplications);

// Admin routes
router.get('/job/:jobId/applicants', adminAuth, applicationController.getJobApplicants);
router.put('/:applicationId/status', adminAuth, applicationController.updateApplicationStatus);

module.exports = router;
