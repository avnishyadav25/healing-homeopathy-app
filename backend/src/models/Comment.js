// /backend/models/Comment.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  name: String,
  text: String,
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
