// /backend/controllers/commentController.js
const Comment = require('../models/Comment');

// Fetch all comments by post ID
const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments by post ID' });
  }
};

// Create a new comment
const createComment = async (req, res) => {
  const { name, email, phone, text, postId } = req.body;
  try {
    const newComment = new Comment({ name, email, phone, text, postId });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment' });
  }
};

// Update an existing comment
const updateComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, { text }, { new: true });
    if (!updatedComment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment' });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment' });
  }
};

module.exports = {
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
};
