import mongoose from 'mongoose';

/**
 * Post Schema
 */
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  excerpt: {
    type: String,
    maxlength: [500, 'Excerpt cannot exceed 500 characters']
  },
  featuredImage: {
    type: String,
    default: null
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: {
    type: Date,
    default: null
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  viewCount: {
    type: Number,
    default: 0
  },
  seoTitle: {
    type: String,
    maxlength: 70
  },
  seoDescription: {
    type: String,
    maxlength: 160
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate slug before saving
postSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

// Text index for search
postSchema.index({ title: 'text', content: 'text', tags: 'text' });

// Virtual for comments
postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
});

export default mongoose.model('Post', postSchema);
