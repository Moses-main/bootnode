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
      required: [true, 'Name is required'] // Name is a required field
    },
    
    // User's email address (must be unique)
    email: { 
      type: String, 
      required: [true, 'Email is required'],
      unique: true,  // Ensures no duplicate emails in the database
      lowercase: true, // Convert email to lowercase
      trim: true     // Remove any whitespace
    },
  },
  { 
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true 
  }
);

// Create and export the User model based on the schema
export default mongoose.model("User", userSchema);
