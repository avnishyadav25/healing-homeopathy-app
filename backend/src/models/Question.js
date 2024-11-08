// /backend/src/models/Question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: { type: [String] },
  category: { type: [String] },  // Assuming categories are an array of IDs
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
  views: { type: Number, default: 0 },
  urlSlug: { type: String, unique: true, required: true },  // URL slug for the question
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema);


