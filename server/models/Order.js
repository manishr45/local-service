const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Order Identification
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },

  // References
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },

  // Order Type
  orderType: {
    type: String,
    enum: ['one-time', 'subscription'],
    required: true
  },

  // Order Items
  items: [{
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    specialInstructions: String
  }],

  // Subscription Details (if applicable)
  subscription: {
    planId: {
      type: mongoose.Schema.Types.ObjectId
    },
    startDate: Date,
    endDate: Date,
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly']
    },
    deliveryDays: [{
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }],
    isActive: {
      type: Boolean,
      default: true
    },
    pausedDates: [Date] // Dates when delivery is paused
  },

  // Delivery Information
  deliveryAddress: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    landmark: String
  },

  // Scheduling
  scheduledDate: {
    type: Date,
    required: true
  },
  scheduledTime: {
    type: String,
    required: true
  },
  deliveryTime: {
    estimated: Date,
    actual: Date
  },

  // Pricing
  itemsTotal: {
    type: Number,
    required: true,
    min: 0
  },
  deliveryCharge: {
    type: Number,
    default: 0,
    min: 0
  },
  taxes: {
    type: Number,
    default: 0,
    min: 0
  },
  discount: {
    amount: {
      type: Number,
      default: 0,
      min: 0
    },
    code: String,
    type: {
      type: String,
      enum: ['percentage', 'fixed']
    }
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },

  // Status Tracking
  status: {
    type: String,
    enum: [
      'pending',      // Order placed, waiting for vendor confirmation
      'confirmed',    // Vendor confirmed the order
      'preparing',    // Food is being prepared
      'ready',        // Food is ready for pickup/delivery
      'out-for-delivery', // Order is out for delivery
      'delivered',    // Order delivered successfully
      'cancelled',    // Order cancelled
      'rejected'      // Order rejected by vendor
    ],
    default: 'pending'
  },

  statusHistory: [{
    status: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    note: String,
    updatedBy: {
      type: String,
      enum: ['user', 'vendor', 'admin', 'system']
    }
  }],

  // Payment Information
  payment: {
    method: {
      type: String,
      enum: ['cash', 'online', 'wallet'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAmount: {
      type: Number,
      default: 0
    },
    paidAt: Date
  },

  // Special Instructions and Notes
  specialInstructions: String,
  vendorNotes: String,
  deliveryNotes: String,

  // Ratings and Reviews
  rating: {
    food: {
      type: Number,
      min: 1,
      max: 5
    },
    delivery: {
      type: Number,
      min: 1,
      max: 5
    },
    overall: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  review: {
    comment: String,
    images: [String],
    reviewDate: Date
  },

  // Cancellation Information
  cancellation: {
    reason: String,
    cancelledBy: {
      type: String,
      enum: ['user', 'vendor', 'admin']
    },
    cancelledAt: Date,
    refundAmount: {
      type: Number,
      default: 0
    },
    refundStatus: {
      type: String,
      enum: ['pending', 'processed', 'failed'],
      default: 'pending'
    }
  }
}, {
  timestamps: true
});

// Generate order number before saving
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `TMS${Date.now()}${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

// Update status history when status changes
orderSchema.pre('save', function(next) {
  if (this.isModified('status') && !this.isNew) {
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date(),
      updatedBy: 'system'
    });
  }
  next();
});

// Calculate total amount
orderSchema.methods.calculateTotal = function() {
  this.itemsTotal = this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  this.totalAmount = this.itemsTotal + this.deliveryCharge + this.taxes - this.discount.amount;
  return this.totalAmount;
};

// Check if order can be cancelled
orderSchema.methods.canBeCancelled = function() {
  const nonCancellableStatuses = ['delivered', 'cancelled', 'rejected'];
  return !nonCancellableStatuses.includes(this.status);
};

module.exports = mongoose.model('Order', orderSchema);