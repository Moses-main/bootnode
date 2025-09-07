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

const router = express.Router();

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

// Routes
router.post('/register', validate(registerRules), register);
router.post('/login', validate(loginRules), login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.post('/refresh-token', refreshToken);
router.get('/verify-email/:token', verifyEmail);

export default router;
