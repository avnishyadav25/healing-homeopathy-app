// /backend/src/models/Tag.js
const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  blogCount: { type: Number, default: 0 },  // Count used in blogs
  forumCount: { type: Number, default: 0 }  // Count used in QA/forum
}, { timestamps: true });

module.exports = mongoose.model('Tag', tagSchema);