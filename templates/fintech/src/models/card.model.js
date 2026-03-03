import mongoose from 'mongoose';

/**
 * Card Schema - Debit/Credit cards
 */
const cardSchema = new mongoose.Schema({
  cardNumber: {
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
    enum: ['debit', 'credit', 'virtual'],
    required: true
  },
  brand: {
    type: String,
    enum: ['visa', 'mastercard', 'verve'],
    required: true
  },
  cardholderName: {
    type: String,
    required: true
  },
  expiryMonth: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  expiryYear: {
    type: Number,
    required: true
  },
  cvv: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'blocked', 'expired', 'cancelled'],
    default: 'active'
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  dailyLimit: {
    type: Number,
    default: 5000
  },
  monthlyLimit: {
    type: Number,
    default: 20000
  },
  currentSpend: {
    type: Number,
    default: 0
  },
  pin: {
    type: String,
    default: null
  },
  atmLimit: {
    type: Number,
    default: 1000
  },
  internationalEnabled: {
    type: Boolean,
    default: false
  },
  onlineEnabled: {
    type: Boolean,
    default: true
  },
  contactlessEnabled: {
    type: Boolean,
    default: true
  },
  blockedAt: Date,
  activatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for masked card number
cardSchema.virtual('maskedNumber').get(function() {
  if (!this.cardNumber) return null;
  return '**** **** **** ' + this.cardNumber.slice(-4);
});

// Generate card details before saving
cardSchema.pre('save', async function(next) {
  if (!this.cardNumber) {
    // Generate card number (16 digits)
    const prefix = this.type === 'visa' ? '4' : 
                   this.brand === 'mastercard' ? '51' : '5';
    let number = prefix;
    while (number.length < 15) {
      number += Math.floor(Math.random() * 10);
    }
    // Add Luhn check digit
    number += calculateLuhnCheckDigit(number);
    this.cardNumber = number;
  }
  if (!this.cvv) {
    this.cvv = Math.floor(100 + Math.random() * 900).toString();
  }
  next();
});

function calculateLuhnCheckDigit(number) {
  let sum = 0;
  let isEven = false;
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i]);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return (10 - (sum % 10)) % 10;
}

export default mongoose.model('Card', cardSchema);
