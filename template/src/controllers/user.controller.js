// Import the User model
import User from "../models/user.model.js";

/**
 * Get all users from the database
 * @route GET /api/users
 * @returns {Array} Array of user objects
 */
export const getUsers = async (req, res) => {
  // Fetch all users from the database
  const users = await User.find();
  // Send the users as a JSON response
  res.json(users);
};

/**
 * Create a new user
 * @route POST /api/users
 * @param {string} req.body.name - User's name
 * @param {string} req.body.email - User's email (must be unique)
 * @returns {Object} The created user object
 */
export const createUser = async (req, res) => {
  // Extract name and email from request body
  const { name, email } = req.body;
  
  // Create a new user in the database
  const user = await User.create({ name, email });
  
  // Return the created user with 201 status code
  res.status(201).json(user);
};
