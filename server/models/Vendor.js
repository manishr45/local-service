const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const vendorSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  avatar: {
    type: String,
    default: null
  },

  // Business Information
  businessName: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true,
    maxlength: [100, 'Business name cannot exceed 100 characters']
  },
  businessDescription: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  businessImages: [String],
  
  // Kitchen Details
  kitchenAddress: {
    street: {
      type: String,
      required: [true, 'Kitchen address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
      match: [/^[0-9]{6}$/, 'Please enter a valid 6-digit pincode']
    },
    landmark: String
  },

  // Service Areas
  serviceAreas: [{
    pincode: {
      type: String,
      required: true,
      match: [/^[0-9]{6}$/, 'Please enter a valid 6-digit pincode']
    },
    deliveryCharge: {
      type: Number,
      default: 0,
      min: 0
    }
  }],

  // Menu Items
  menuItems: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: String,
    price: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'snacks'],
      required: true
    },
    cuisineType: String,
    isVegetarian: {
      type: Boolean,
      default: true
    },
    isVegan: {
      type: Boolean,
      default: false
    },
    spiceLevel: {
      type: String,
      enum: ['mild', 'medium', 'spicy'],
      default: 'medium'
    },
    image: String,
    isAvailable: {
      type: Boolean,
      default: true
    },
    preparationTime: {
      type: Number, // in minutes
      default: 30
    }
  }],

  // Subscription Plans
  subscriptionPlans: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    duration: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    mealsIncluded: [{
      type: String,
      enum: ['breakfast', 'lunch', 'dinner']
    }],
    isActive: {
      type: Boolean,
      default: true
    }
  }],

  // Business Settings
  businessHours: {
    monday: { open: String, close: String, isOpen: { type: Boolean, default: true } },
    tuesday: { open: String, close: String, isOpen: { type: Boolean, default: true } },
    wednesday: { open: String, close: String, isOpen: { type: Boolean, default: true } },
    thursday: { open: String, close: String, isOpen: { type: Boolean, default: true } },
    friday: { open: String, close: String, isOpen: { type: Boolean, default: true } },
    saturday: { open: String, close: String, isOpen: { type: Boolean, default: true } },
    sunday: { open: String, close: String, isOpen: { type: Boolean, default: false } }
  },

  // Financial Information
  bankDetails: {
    accountNumber: String,
    ifscCode: String,
    accountHolderName: String,
    bankName: String
  },

  // Status and Verification
  isActive: {
    type: Boolean,
    default: false // Admin needs to approve
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  verificationDocuments: [String],

  // Ratings and Reviews
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },

  // Statistics
  totalOrders: {
    type: Number,
    default: 0
  },
  totalEarnings: {
    type: Number,
    default: 0
  },

  role: {
    type: String,
    enum: ['vendor'],
    default: 'vendor'
  }
}, {
  timestamps: true
});

// Hash password before saving
vendorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
vendorSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update rating when new review is added
vendorSchema.methods.updateRating = function(newRating) {
  const totalRating = (this.rating.average * this.rating.count) + newRating;
  this.rating.count += 1;
  this.rating.average = totalRating / this.rating.count;
  return this.save();
};

module.exports = mongoose.model('Vendor', vendorSchema);