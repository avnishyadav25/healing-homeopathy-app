// /backend/src/models/Question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }],  // Assuming these are string tags
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
  views: { type: Number, default: 0 },  // New field to track question views
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema);
