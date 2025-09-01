// Import required modules
import express from "express";
import { getUsers, createUser } from "../controllers/user.controller.js";

// Create a new router instance
const router = express.Router();

// Define routes for user operations
// GET / - Retrieve all users
router.get("/", getUsers);

// POST / - Create a new user
router.post("/", createUser);

// Export the router for use in other files
export default router;
