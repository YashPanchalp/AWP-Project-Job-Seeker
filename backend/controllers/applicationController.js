const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');

// Apply for a job
exports.applyForJob = async (req, res) => {
  try {
    const { jobId, extraData, coverLetter } = req.body;

    // Validate job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      userId: req.user.userId,
      jobId,
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Get user profile data
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create application with auto-filled user data
    const application = await Application.create({
      userId: req.user.userId,
      jobId,
      appliedData: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        qualification: user.qualification,
        skills: user.skills,
        experience: user.experience,
        location: user.location,
        extraData: extraData || {},
      },
      coverLetter: coverLetter || '',
    });

    res.status(201).json({
      message: 'Applied for job successfully',
      application,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error applying for job', error: error.message });
  }
};

// Get my applications (for job seeker)
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.userId })
      .populate('jobId', 'title companyName location')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Applications retrieved successfully',
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving applications', error: error.message });
  }
};

// Get applicants for a job (admin only)
exports.getJobApplicants = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check authorization
    if (job.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to view applicants' });
    }

    const applications = await Application.find({ jobId: req.params.jobId })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Applicants retrieved successfully',
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving applicants', error: error.message });
  }
};

// Update application status (admin only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check authorization
    const job = await Job.findById(application.jobId);
    if (job.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }

    if (!['Applied', 'Shortlisted', 'Rejected', 'Accepted'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      message: 'Application status updated successfully',
      application,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating application', error: error.message });
  }
};

// Get all admin's jobs and their applicants count (for admin dashboard)
exports.getAdminJobsWithStats = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.userId });

    const jobStats = await Promise.all(
      jobs.map(async (job) => {
        const applicantsCount = await Application.countDocuments({ jobId: job._id });
        return {
          ...job.toObject(),
          applicantsCount,
        };
      })
    );

    res.status(200).json({
      message: 'Admin jobs retrieved successfully',
      count: jobStats.length,
      jobs: jobStats,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving admin jobs', error: error.message });
  }
};

module.exports = exports;
