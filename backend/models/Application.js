const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    status: {
      type: String,
      enum: ['Applied', 'Shortlisted', 'Rejected', 'Accepted'],
      default: 'Applied',
    },
    appliedData: {
      // Auto-filled data from user profile
      name: String,
      email: String,
      phone: String,
      qualification: String,
      skills: [String],
      experience: String,
      location: String,
      // Extra fields submitted by user
      extraData: mongoose.Schema.Types.Mixed,
    },
    coverLetter: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Compound index to prevent duplicate applications
applicationSchema.index({ userId: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
