import mongoose from 'mongoose';

/**
 * Transaction Schema - All financial transactions
 */
const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  type: {
    type: String,
    enum: ['deposit', 'withdrawal', 'transfer', 'payment', 'refund', 'fee', 'interest'],
    required: true
  },
  category: {
    type: String,
    enum: ['internal', 'external', 'bill_payment', 'loan', 'investment', 'other'],
    default: 'other'
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD',
    uppercase: true
  },
  exchangeRate: {
    type: Number,
    default: 1
  },
  convertedAmount: Number,
  balanceBefore: {
    type: Number,
    required: true
  },
  balanceAfter: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'reversed'],
    default: 'pending'
  },
  description: String,
  reference: String,
  // For transfers
  recipientAccount: {
    type: String,
    default: null
  },
  recipientUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  // For bill payments
  biller: {
    name: String,
    category: String,
    reference: String
  },
  // Metadata
  metadata: {
    ipAddress: String,
    deviceInfo: String,
    location: String
  },
  // Reversal
  reversedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction'
  },
  reversalReason: String,
  // Timestamps
  processedAt: Date,
  completedAt: Date,
  failedAt: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate transaction ID before saving
transactionSchema.pre('save', async function(next) {
  if (!this.transactionId) {
    const prefix = this.type.charAt(0).toUpperCase();
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.transactionId = `TXN-${prefix}${timestamp}${random}`;
  }
  next();
});

// Update status timestamps
transactionSchema.pre(/^find/, function(next) {
  this.sort({ createdAt: -1 });
  next();
});

// Indexes
transactionSchema.index({ user: 1, createdAt: -1 });
transactionSchema.index({ account: 1, createdAt: -1 });
transactionSchema.index({ transactionId: 1 });
transactionSchema.index({ status: 1 });

export default mongoose.model('Transaction', transactionSchema);
