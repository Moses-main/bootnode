import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validators/validation.middleware.js';
import {
  register,
  login,
  logout,
  getMe,
  refreshToken,
  verifyEmail
} from '../controllers/auth.controller.js';
import { protect } from '../utils/jwt.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Apply stricter rate limiting to auth endpoints
router.use(authLimiter);

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and session management
 */

// Validation rules
const registerRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please include a valid email'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[^a-zA-Z0-9]/).withMessage('Password must contain at least one special character')
];

const loginRules = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please include a valid email'),
  body('password')
    .notEmpty().withMessage('Password is required')
];

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Invalid input or duplicate user
 *       429:
 *         description: Too many requests
 */
router.post('/register', validate(registerRules), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user and issue access/refresh tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       429:
 *         description: Too many requests
 */
router.post('/login', validate(loginRules), login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout current user and clear refresh token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Not authorized
 */
router.post('/logout', protect, logout);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get currently authenticated user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user details
 *       401:
 *         description: Not authorized
 */
router.get('/me', protect, getMe);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token using refresh token cookie
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Missing or invalid refresh token
 *       429:
 *         description: Too many requests
 */
router.post('/refresh-token', refreshToken);

/**
 * @swagger
 * /auth/verify-email/{token}:
 *   get:
 *     summary: Verify email with a verification token
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Email verification token
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired token
 */
router.get('/verify-email/:token', verifyEmail);

export default router;
