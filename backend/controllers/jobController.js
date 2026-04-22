const Job = require('../models/Job');

// Get all jobs with filters
exports.getAllJobs = async (req, res) => {
  try {
    const { role, company, skills, location } = req.query;

    // Build filter object
    let filter = { isActive: true };
    if (role) filter.title = new RegExp(role, 'i');
    if (company) filter.companyName = new RegExp(company, 'i');
    if (location) filter.location = new RegExp(location, 'i');
    if (skills) {
      // Filter jobs that contain the searched skill
      filter.skillsRequired = { $in: [new RegExp(skills, 'i')] };
    }

    const jobs = await Job.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Jobs retrieved successfully',
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving jobs', error: error.message });
  }
};

// Get job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('createdBy', 'name email');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({
      message: 'Job retrieved successfully',
      job,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving job', error: error.message });
  }
};

// Create new job (admin only)
exports.createJob = async (req, res) => {
  try {
    const { title, companyName, description, skillsRequired, location, salary, jobType, extraFields } = req.body;

    // Validation
    if (!title || !companyName || !description || !skillsRequired || !location) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const job = await Job.create({
      title,
      companyName,
      description,
      skillsRequired: Array.isArray(skillsRequired) ? skillsRequired : [skillsRequired],
      location,
      salary: salary || 'Not specified',
      jobType: jobType || 'Full-time',
      createdBy: req.user.userId,
      extraFields: extraFields || {},
    });

    res.status(201).json({
      message: 'Job created successfully',
      job,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error: error.message });
  }
};

// Update job (admin only)
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check authorization
    if (job.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    // Update fields
    const { title, companyName, description, skillsRequired, location, salary, jobType, extraFields, isActive } = req.body;

    if (title) job.title = title;
    if (companyName) job.companyName = companyName;
    if (description) job.description = description;
    if (skillsRequired) job.skillsRequired = Array.isArray(skillsRequired) ? skillsRequired : [skillsRequired];
    if (location) job.location = location;
    if (salary) job.salary = salary;
    if (jobType) job.jobType = jobType;
    if (extraFields) job.extraFields = extraFields;
    if (isActive !== undefined) job.isActive = isActive;

    await job.save();

    res.status(200).json({
      message: 'Job updated successfully',
      job,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating job', error: error.message });
  }
};

// Delete job (admin only)
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check authorization
    if (job.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Job deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error: error.message });
  }
};

// Get admin's jobs with applicant statistics
exports.getAdminJobsWithStats = async (req, res) => {
  try {
    const Application = require('../models/Application');
    
    // Get all jobs created by this admin
    const jobs = await Job.find({ createdBy: req.user.userId });

    // Get applicant count for each job
    const jobsWithStats = await Promise.all(
      jobs.map(async (job) => {
        const applicantCount = await Application.countDocuments({ jobId: job._id });
        return {
          ...job.toObject(),
          applicantCount,
        };
      })
    );

    res.status(200).json({
      message: 'Admin jobs retrieved successfully',
      jobCount: jobsWithStats.length,
      jobs: jobsWithStats,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving admin jobs', error: error.message });
  }
};

module.exports = exports;
