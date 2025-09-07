// Import the User model
import User from "../models/user.model.js";
import mongoose from 'mongoose';

/**
 * Get all users with optional pagination and filtering
 * @route GET /api/users
 * @query {number} [page=1] - Page number for pagination
 * @query {number} [limit=10] - Number of items per page
 * @query {string} [search] - Search term for name/email
 * @returns {Object} Paginated list of users with metadata
 */
export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Build query for search if search term is provided
    const searchQuery = req.query.search 
      ? { $text: { $search: req.query.search } }
      : {};
    
    // Get total count for pagination
    const total = await User.countDocuments(searchQuery);
    
    // Fetch paginated users
    const users = await User.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    res.json({
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

/**
 * Get a single user by ID
 * @route GET /api/users/:id
 * @param {string} req.params.id - User ID
 * @returns {Object} User object
 */
export const getUserById = async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

/**
 * Create a new user
 * @route POST /api/users
 * @param {string} req.body.name - User's name
 * @param {string} req.body.email - User's email (must be unique)
 * @returns {Object} The created user object
 */
export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Check if user with email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors (e.g., invalid email format)
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: 'Validation error', errors: messages });
    }
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

/**
 * Update a user's details
 * @route PATCH /api/users/:id
 * @param {string} req.params.id - User ID to update
 * @param {string} [req.body.name] - New name (optional)
 * @param {string} [req.body.email] - New email (optional, must be unique)
 * @returns {Object} Updated user object
 */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    
    // Check if email is being updated and if it's already in use
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: id } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { name, email } },
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(updatedUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: 'Validation error', errors: messages });
    }
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

/**
 * Soft delete a user (deactivate)
 * @route DELETE /api/users/:id
 * @param {string} req.params.id - User ID to deactivate
 * @returns {Object} Success message
 */
export const deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    
    const user = await User.findByIdAndUpdate(
      id,
      { isActive: false, deactivatedAt: Date.now() },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User deactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deactivating user', error: error.message });
  }
};

/**
 * Permanently delete a user
 * @route DELETE /api/users/:id/permanent
 * @param {string} req.params.id - User ID to delete
 * @returns {Object} Success message
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

/**
 * Search users by name or email
 * @route GET /api/users/search
 * @query {string} q - Search query
 * @returns {Array} Array of matching users
 */
export const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const users = await User.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error searching users', error: error.message });
  }
};
