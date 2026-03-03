import mongoose from 'mongoose';

/**
 * Account Schema - Bank accounts, wallets
 */
const accountSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['checking', 'savings', 'investment', 'wallet'],
    required: true
  },
  currency: {
    type: String,
    default: 'USD',
    uppercase: true
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  availableBalance: {
    type: Number,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'frozen', 'closed'],
    default: 'active'
  },
  bankName: {
    type: String,
    default: 'BootNode Bank'
  },
  branchCode: String,
  isPrimary: {
    type: Boolean,
    default: false
  },
  dailyLimit: {
    type: Number,
    default: 10000
  },
  monthlyLimit: {
    type: Number,
    default: 50000
  },
  interestRate: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate account number before saving
accountSchema.pre('save', async function(next) {
  if (!this.accountNumber) {
    this.accountNumber = '2' + Math.floor(1000000000 + Math.random() * 9000000000);
  }
  next();
});

// Index for queries
accountSchema.index({ user: 1, type: 1 });
accountSchema.index({ accountNumber: 1 });

export default mongoose.model('Account', accountSchema);
