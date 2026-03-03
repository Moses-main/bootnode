import { postService, categoryService, commentService } from '../services/blog.service.js';
import asyncHandler from 'express-async-handler';

// =======================
// POST CONTROLLERS
// =======================

/**
 * @desc    Get all posts
 * @route   GET /api/v1/posts
 * @access  Public
 */
export const getPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, category, search } = req.query;
  const result = await postService.getAllPosts({
    page: parseInt(page),
    limit: parseInt(limit),
    category,
    search
  });
  
  res.json(result);
});

/**
 * @desc    Get single post
 * @route   GET /api/v1/posts/:idOrSlug
 * @access  Public
 */
export const getPost = asyncHandler(async (req, res) => {
  const post = await postService.getPostById(req.params.idOrSlug);
  
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  res.json(post);
});

/**
 * @desc    Create new post
 * @route   POST /api/v1/posts
 * @access  Private
 */
export const createPost = asyncHandler(async (req, res) => {
  const post = await postService.createPost({
    ...req.body,
    author: req.user._id
  });
  
  res.status(201).json(post);
});

/**
 * @desc    Update post
 * @route   PUT /api/v1/posts/:id
 * @access  Private
 */
export const updatePost = asyncHandler(async (req, res) => {
  const post = await postService.updatePost(req.params.id, req.body);
  
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  res.json(post);
});

/**
 * @desc    Delete post
 * @route   DELETE /api/v1/posts/:id
 * @access  Private
 */
export const deletePost = asyncHandler(async (req, res) => {
  const post = await postService.deletePost(req.params.id);
  
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  res.json({ message: 'Post deleted successfully' });
});

/**
 * @desc    Get featured posts
 * @route   GET /api/v1/posts/featured
 * @access  Public
 */
export const getFeaturedPosts = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const posts = await postService.getFeaturedPosts(limit);
  res.json(posts);
});

/**
 * @desc    Get related posts
 * @route   GET /api/v1/posts/:id/related
 * @access  Public
 */
export const getRelatedPosts = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 3;
  const posts = await postService.getRelatedPosts(req.params.id, limit);
  res.json(posts);
});

// ==========================
// CATEGORY CONTROLLERS
// ==========================

/**
 * @desc    Get all categories
 * @route   GET /api/v1/categories
 * @access  Public
 */
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.json(categories);
});

/**
 * @desc    Get single category
 * @route   GET /api/v1/categories/:idOrSlug
 * @access  Public
 */
export const getCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.idOrSlug);
  
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  
  res.json(category);
});

/**
 * @desc    Create category
 * @route   POST /api/v1/categories
 * @access  Private/Admin
 */
export const createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(201).json(category);
});

/**
 * @desc    Update category
 * @route   PUT /api/v1/categories/:id
 * @access  Private/Admin
 */
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.updateCategory(req.params.id, req.body);
  
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  
  res.json(category);
});

/**
 * @desc    Delete category
 * @route   DELETE /api/v1/categories/:id
 * @access  Private/Admin
 */
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.deleteCategory(req.params.id);
  
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  
  res.json({ message: 'Category deleted successfully' });
});

// ==========================
// COMMENT CONTROLLERS
// ==========================

/**
 * @desc    Get comments for a post
 * @route   GET /api/v1/posts/:postId/comments
 * @access  Public
 */
export const getComments = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const result = await commentService.getCommentsByPost(req.params.postId, {
    page: parseInt(page),
    limit: parseInt(limit)
  });
  
  res.json(result);
});

/**
 * @desc    Create comment
 * @route   POST /api/v1/posts/:postId/comments
 * @access  Private
 */
export const createComment = asyncHandler(async (req, res) => {
  const comment = await commentService.createComment({
    ...req.body,
    post: req.params.postId,
    author: req.user._id
  });
  
  res.status(201).json(comment);
});

/**
 * @desc    Delete comment
 * @route   DELETE /api/v1/comments/:id
 * @access  Private
 */
export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await commentService.deleteComment(req.params.id);
  
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }
  
  res.json({ message: 'Comment deleted successfully' });
});
