import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

/**
 * User Schema Definition
 * Defines the structure of user documents in the MongoDB collection
 */
const userSchema = new mongoose.Schema(
  {
    // User's full name
    name: { 
      type: String, 
      required: [true, 'Name is required'],
      trim: true
    },
    
    // User's email address (must be unique)
    email: { 
      type: String, 
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },

    // Hashed password
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false
    },

    // Password reset token
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    // Email verification
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    emailVerificationToken: String,
    emailVerificationExpire: Date,

    // Refresh token
    refreshToken: String,

    // Soft delete flag
    isActive: {
      type: Boolean,
      default: true
    },

    // Account deactivation date
    deactivatedAt: {
      type: Date,
      default: null
    },

    // User roles
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },

    // Last login timestamp
    lastLogin: {
      type: Date,
      default: null
    }
  }, { 
    timestamps: true,
    toJSON: { 
      virtuals: true,
      transform: function(doc, ret) {
        delete ret.__v;
        delete ret.isActive;
        return ret;
      }
    },
    toObject: { 
      virtuals: true,
      transform: function(doc, ret) {
        delete ret.__v;
        delete ret.isActive;
        return ret;
      }
    }
  }
);

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password reset token
userSchema.methods.getResetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire (10 minutes)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Generate email verification token
userSchema.methods.getEmailVerificationToken = function() {
  // Generate token
  const verificationToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to emailVerificationToken field
  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  // Set expire (24 hours)
  this.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000;

  return verificationToken;
};

// Add text index for search functionality
userSchema.index({ name: 'text', email: 'text' });

// Query middleware to filter out inactive users by default
userSchema.pre(/^find/, function(next) {
  if (this.getFilter().isActive === undefined) {
    this.find({ isActive: { $ne: false } });
  }
  next();
});

// Create and export the User model based on the schema
export default mongoose.model("User", userSchema);
