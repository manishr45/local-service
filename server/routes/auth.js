const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Vendor = require('../models/Vendor');
const Admin = require('../models/Admin');
const { generateToken, authenticate } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const validateRegistration = [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('phone').matches(/^[0-9]{10}$/).withMessage('Please provide a valid 10-digit phone number'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// @route   POST /api/auth/register/user
// @desc    Register a new user
// @access  Public
router.post('/register/user', validateRegistration, handleValidationErrors, async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists with this email or phone number'
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      phone,
      password
    });

    await user.save();

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    console.error('User registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// @route   POST /api/auth/register/vendor
// @desc    Register a new vendor
// @access  Public
router.post('/register/vendor', [
  ...validateRegistration,
  body('businessName').trim().isLength({ min: 2, max: 100 }).withMessage('Business name must be between 2 and 100 characters'),
  body('kitchenAddress.street').notEmpty().withMessage('Kitchen address is required'),
  body('kitchenAddress.city').notEmpty().withMessage('City is required'),
  body('kitchenAddress.state').notEmpty().withMessage('State is required'),
  body('kitchenAddress.pincode').matches(/^[0-9]{6}$/).withMessage('Please provide a valid 6-digit pincode'),
], handleValidationErrors, async (req, res) => {
  try {
    const { name, email, phone, password, businessName, businessDescription, kitchenAddress } = req.body;

    // Check if vendor already exists
    const existingVendor = await Vendor.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingVendor) {
      return res.status(400).json({
        message: 'Vendor already exists with this email or phone number'
      });
    }

    // Create new vendor
    const vendor = new Vendor({
      name,
      email,
      phone,
      password,
      businessName,
      businessDescription,
      kitchenAddress
    });

    await vendor.save();

    // Generate token
    const token = generateToken(vendor);

    res.status(201).json({
      message: 'Vendor registered successfully. Please wait for admin approval.',
      token,
      vendor: {
        id: vendor._id,
        name: vendor.name,
        email: vendor.email,
        phone: vendor.phone,
        businessName: vendor.businessName,
        role: vendor.role,
        verificationStatus: vendor.verificationStatus
      }
    });
  } catch (error) {
    console.error('Vendor registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// @route   POST /api/auth/login
// @desc    Login user/vendor/admin
// @access  Public
router.post('/login', validateLogin, handleValidationErrors, async (req, res) => {
  try {
    const { email, password, userType = 'user' } = req.body;

    let user;
    let Model;

    // Determine which model to use based on userType
    switch (userType) {
      case 'user':
        Model = User;
        break;
      case 'vendor':
        Model = Vendor;
        break;
      case 'admin':
        Model = Admin;
        break;
      default:
        return res.status(400).json({ message: 'Invalid user type' });
    }

    // Find user and include password for comparison
    user = await Model.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if account is locked (for admin)
    if (userType === 'admin' && user.isLocked) {
      return res.status(423).json({ 
        message: 'Account temporarily locked due to too many failed login attempts' 
      });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      // Increment login attempts for admin
      if (userType === 'admin') {
        await user.incLoginAttempts();
      }
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }

    // Reset login attempts and update last login for admin
    if (userType === 'admin') {
      await user.resetLoginAttempts();
      user.lastLogin = new Date();
      await user.save();
    }

    // Generate token
    const token = generateToken(user);

    // Prepare user data (exclude sensitive information)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    };

    // Add role-specific data
    if (userType === 'vendor') {
      userData.businessName = user.businessName;
      userData.verificationStatus = user.verificationStatus;
      userData.isVerified = user.isVerified;
    }

    res.json({
      message: 'Login successful',
      token,
      user: userData
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', authenticate, async (req, res) => {
  try {
    const userData = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role,
      avatar: req.user.avatar,
      isActive: req.user.isActive
    };

    // Add role-specific data
    if (req.user.role === 'user') {
      userData.addresses = req.user.addresses;
      userData.preferences = req.user.preferences;
      userData.emailVerified = req.user.emailVerified;
      userData.phoneVerified = req.user.phoneVerified;
    } else if (req.user.role === 'vendor') {
      userData.businessName = req.user.businessName;
      userData.businessDescription = req.user.businessDescription;
      userData.verificationStatus = req.user.verificationStatus;
      userData.isVerified = req.user.isVerified;
      userData.rating = req.user.rating;
      userData.totalOrders = req.user.totalOrders;
    } else if (['admin', 'super-admin'].includes(req.user.role)) {
      userData.permissions = req.user.permissions;
      userData.lastLogin = req.user.lastLogin;
    }

    res.json({
      message: 'Profile retrieved successfully',
      user: userData
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/change-password
// @desc    Change user password
// @access  Private
router.post('/change-password', [
  authenticate,
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long'),
], handleValidationErrors, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    let user;
    switch (req.user.role) {
      case 'user':
        user = await User.findById(req.user._id).select('+password');
        break;
      case 'vendor':
        user = await Vendor.findById(req.user._id).select('+password');
        break;
      case 'admin':
      case 'super-admin':
        user = await Admin.findById(req.user._id).select('+password');
        break;
      default:
        return res.status(400).json({ message: 'Invalid user role' });
    }

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user (client-side token removal)
// @access  Private
router.post('/logout', authenticate, (req, res) => {
  // In a stateless JWT system, logout is handled client-side by removing the token
  // This endpoint exists for consistency and potential future server-side token blacklisting
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;