import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validators/validation.middleware.js';
import * as blogController from '../controllers/blog.controller.js';
import { protect } from '../utils/jwt.js';

const router = express.Router();

// Validation rules
const postRules = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('category').notEmpty().withMessage('Category is required')
];

const categoryRules = [
  body('name').trim().notEmpty().withMessage('Category name is required')
];

const commentRules = [
  body('content').trim().notEmpty().withMessage('Comment content is required')
];

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Blog posts management
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of posts
 */
router.get('/', blogController.getPosts);

/**
 * @swagger
 * /posts/featured:
 *     get:
 *       summary: Get featured posts
 *       tags: [Posts]
 *       responses:
 *         200:
 *           description: Featured posts
 */
router.get('/featured', blogController.getFeaturedPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get post by ID or slug
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: idOrSlug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post details
 */
router.get('/:idOrSlug', blogController.getPost);

/**
 * @swagger
 * /posts/{id}/related:
 *   get:
 *     summary: Get related posts
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Related posts
 */
router.get('/:id/related', blogController.getRelatedPosts);

// Protected routes
router.post('/', protect, validate(postRules), blogController.createPost);
router.put('/:id', protect, validate(postRules), blogController.updatePost);
router.delete('/:id', protect, blogController.deletePost);

// Comments
router.get('/:postId/comments', blogController.getComments);
router.post('/:postId/comments', protect, validate(commentRules), blogController.createComment);
router.delete('/comments/:id', protect, blogController.deleteComment);

export default router;
