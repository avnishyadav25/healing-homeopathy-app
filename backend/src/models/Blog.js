// /backend/models/Blog.js

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String] },
  category: { type: [String] },
  featuredImage: { type: String },
  permalink: { type: String, unique: true },
  author: { type: String, default: 'Healing Homoeopathy' },
  publishTime: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  archived: { type: Boolean, default: false },
  status: { type: String, enum: ['draft', 'published', 'scheduled', 'archived'], default: 'draft' }, // New field for status
  scheduledTime: { type: Date } // New field for scheduled publish time
});

module.exports = mongoose.model('Blog', blogSchema);