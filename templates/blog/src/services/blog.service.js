import Post from '../models/post.model.js';
import Category from '../models/category.model.js';
import Comment from '../models/comment.model.js';

/**
 * Post Service - Business logic for posts
 */
export const postService = {
  /**
   * Get all posts with pagination and filtering
   */
  async getAllPosts({ page = 1, limit = 10, category, status = 'published', search }) {
    const query = {};
    
    if (status) query.status = status;
    if (category) query.category = category;
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      Post.find(query)
        .populate('author', 'name email avatar')
        .populate('category', 'name slug')
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit),
      Post.countDocuments(query)
    ]);

    return {
      posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  },

  /**
   * Get single post by ID or slug
   */
  async getPostById(idOrSlug) {
    const query = mongoose.Types.ObjectId.isValid(idOrSlug) 
      ? { _id: idOrSlug } 
      : { slug: idOrSlug };
    
    const post = await Post.findOne(query)
      .populate('author', 'name email avatar bio')
      .populate('category', 'name slug');
    
    if (post) {
      // Increment view count
      post.viewCount += 1;
      await post.save();
    }
    
    return post;
  },

  /**
   * Create new post
   */
  async createPost(data) {
    const post = await Post.create(data);
    return post.populate('author', 'name email');
  },

  /**
   * Update post
   */
  async updatePost(id, data) {
    const post = await Post.findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .populate('author', 'name email');
    return post;
  },

  /**
   * Delete post (soft delete)
   */
  async deletePost(id) {
    return Post.findByIdAndUpdate(id, { status: 'archived' });
  },

  /**
   * Get featured posts
   */
  async getFeaturedPosts(limit = 5) {
    return Post.find({ status: 'published', isFeatured: true })
      .populate('author', 'name avatar')
      .populate('category', 'name slug')
      .sort({ publishedAt: -1 })
      .limit(limit);
  },

  /**
   * Get related posts
   */
  async getRelatedPosts(postId, limit = 3) {
    const post = await Post.findById(postId);
    if (!post) return [];

    return Post.find({
      _id: { $ne: postId },
      category: post.category,
      status: 'published'
    })
      .populate('author', 'name avatar')
      .sort({ publishedAt: -1 })
      .limit(limit);
  }
};

/**
 * Category Service
 */
export const categoryService = {
  /**
   * Get all categories
   */
  async getAllCategories() {
    return Category.find({ isActive: true })
      .sort({ name: 1 });
  },

  /**
   * Get category by ID or slug
   */
  async getCategoryById(idOrSlug) {
    const query = mongoose.Types.ObjectId.isValid(idOrSlug) 
      ? { _id: idOrSlug } 
      : { slug: idOrSlug };
    return Category.findOne(query);
  },

  /**
   * Create category
   */
  async createCategory(data) {
    return Category.create(data);
  },

  /**
   * Update category
   */
  async updateCategory(id, data) {
    return Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },

  /**
   * Delete category
   */
  async deleteCategory(id) {
    return Category.findByIdAndUpdate(id, { isActive: false });
  }
};

/**
 * Comment Service
 */
export const commentService = {
  /**
   * Get comments for a post
   */
  async getCommentsByPost(postId, { page = 1, limit = 20 }) {
    const skip = (page - 1) * limit;
    
    const [comments, total] = await Promise.all([
      Comment.find({ post: postId, parentComment: null })
        .populate('author', 'name email avatar')
        .populate({
          path: 'replies',
          populate: { path: 'author', select: 'name email avatar' }
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Comment.countDocuments({ post: postId, parentComment: null })
    ]);

    return {
      comments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  },

  /**
   * Create comment
   */
  async createComment(data) {
    const comment = await Comment.create(data);
    return comment.populate('author', 'name email avatar');
  },

  /**
   * Delete comment
   */
  async deleteComment(id) {
    return Comment.findByIdAndUpdate(id, { isDeleted: true });
  },

  /**
   * Approve comment
   */
  async approveComment(id) {
    return Comment.findByIdAndUpdate(id, { isApproved: true });
  }
};

import mongoose from 'mongoose';
