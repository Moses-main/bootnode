// Import required modules
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

// Initialize Express application
const app = express();

// Parse JSON request bodies
app.use(express.json());

// Define API routes
app.use("/api/users", userRoutes);

// Export the configured Express app
export default app;
