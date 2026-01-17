// models/Blog.ts - MongoDB Blog model
import mongoose, { Schema } from 'mongoose';

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;