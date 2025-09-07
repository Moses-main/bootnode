// Import required modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import swaggerDocs from "./config/swagger.js";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

// Initialize Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/users", userRoutes);

// Swagger Documentation
const PORT = process.env.PORT || 5000;
swaggerDocs(app, PORT);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Handle validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: messages
    });
  }

  // Handle duplicate key errors
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate field value entered',
      error: err.message
    });
  }

  // Handle ObjectId format errors
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format',
      error: err.message
    });
  }

  // Default to 500 server error
  res.status(500).json({
    success: false,
    message: 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

// Export the configured Express app
export default app;
