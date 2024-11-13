const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  text: { type: String, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }, // For replies
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'archived'], default: 'pending' }, // Approval status
  likes: { type: Number, default: 0 }, // Like count for comments
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', CommentSchema);
