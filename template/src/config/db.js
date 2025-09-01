import mongoose from "mongoose";

/**
 * Establishes a connection to MongoDB using the connection string from environment variables
 * @throws {Error} If connection to MongoDB fails
 */
export const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    // Log error and exit the application if connection fails
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};
