const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile retrieved successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving profile', error: error.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { 
      name, phone, location, qualification, skills, experience, resume,
      companyName, companyLocation, companyWebsite, companyDescription 
    } = req.body;

    const updateData = {
      name: name || undefined,
      phone: phone || undefined,
      location: location || undefined,
      qualification: qualification || undefined,
      skills: Array.isArray(skills) ? skills : undefined,
      experience: experience || undefined,
      resume: resume || undefined,
      // Company fields for admin users
      companyName: companyName || undefined,
      companyLocation: companyLocation || undefined,
      companyWebsite: companyWebsite || undefined,
      companyDescription: companyDescription || undefined,
    };

    // Remove undefined values
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

module.exports = exports;
