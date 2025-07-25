const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Vendor = require('../models/Vendor');
const Admin = require('../models/Admin');

// Verify JWT token
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    let user;
    switch (decoded.role) {
      case 'user':
        user = await User.findById(decoded.id).select('-password');
        break;
      case 'vendor':
        user = await Vendor.findById(decoded.id).select('-password');
        break;
      case 'admin':
      case 'super-admin':
        user = await Admin.findById(decoded.id).select('-password');
        break;
      default:
        return res.status(401).json({ message: 'Invalid token role' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Role-based authorization
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Access denied. Please login.' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Access denied. Insufficient permissions.' 
      });
    }

    next();
  };
};

// Check if user owns the resource or is admin
const authorizeOwnerOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Access denied. Please login.' });
  }

  const userId = req.params.userId || req.params.id;
  const isOwner = req.user._id.toString() === userId;
  const isAdmin = ['admin', 'super-admin'].includes(req.user.role);

  if (!isOwner && !isAdmin) {
    return res.status(403).json({ 
      message: 'Access denied. You can only access your own resources.' 
    });
  }

  next();
};

// Check vendor verification status
const requireVerifiedVendor = (req, res, next) => {
  if (req.user.role !== 'vendor') {
    return res.status(403).json({ message: 'Access denied. Vendor access required.' });
  }

  if (!req.user.isVerified || req.user.verificationStatus !== 'approved') {
    return res.status(403).json({ 
      message: 'Access denied. Vendor account not verified.' 
    });
  }

  next();
};

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id, 
      role: user.role,
      email: user.email 
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

module.exports = {
  authenticate,
  authorize,
  authorizeOwnerOrAdmin,
  requireVerifiedVendor,
  generateToken
};