import mongoose from "mongoose";

/**
 * User Schema Definition
 * Defines the structure of user documents in the MongoDB collection
 */
const userSchema = new mongoose.Schema(
  {
    // User's full name
    name: { 
      type: String, 
      required: [true, 'Name is required']
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

    // Soft delete flag
    isActive: {
      type: Boolean,
      default: true
    },

    // Account deactivation date
    deactivatedAt: {
      type: Date,
      default: null
    }
  },
  { 
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
