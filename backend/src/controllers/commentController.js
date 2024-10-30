// /backend/controllers/commentController.js
const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

// Fetch comments with associated post information
const getCommentsWithPostInfo = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('postId', 'title')           // Populate 'title' from Blog model
      .sort({ createdAt: -1 });              // Sort by latest comments first

    const formattedComments = comments.map((comment) => ({
      _id: comment._id,
      text: comment.text,
      postName: comment.postId.title,
      name: comment.name,
      status: comment.status,
      createdAt: comment.createdAt,
      postId: comment.postId._id,
    }));
    
    res.status(200).json(formattedComments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments with post info' });
  }
};

// Fetch all comments by post ID, including replies and post name
const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    // Find comments for the post and populate both the parent comment (if a reply) and the post title
    const comments = await Comment.find({ postId })
      .populate('parentId', 'name text email')  // Populates parent comment fields
      .populate('postId', 'title')              // Populates post title from Blog model
      .sort({ createdAt: -1 });                 // Sort by latest comments first

    // Format the response to include the post title as postName
    const formattedComments = comments.map((comment) => ({
      _id: comment._id,
      name: comment.name,
      email: comment.email,
      phone: comment.phone,
      text: comment.text,
      postId: comment.postId._id,
      postName: comment.postId.title,           // Add post name here
      parentId: comment.parentId?._id || null,  // Include parentId for replies
      parentComment: comment.parentId?.text || null, // Include parent comment text if a reply
      status: comment.status,
      createdAt: comment.createdAt,
      likes: comment.likes || 0,                // Include likes if the schema has a likes field
    }));

    res.status(200).json(formattedComments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments by post ID', error });
  }
};

// Create a new comment or reply
const createComment = async (req, res) => {
  const { name, email, phone, text, postId, parentId = null, status = 'pending' } = req.body;
  try {
    const newComment = new Comment({ name, email, phone, text, postId, parentId, status });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment' });
  }
};

// Update an existing comment
const updateComment = async (req, res) => {
  const { id } = req.params;
  const { text, status } = req.body;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, { text, status }, { new: true });
    if (!updatedComment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment' });
  }
};

// Delete a comment and its replies
const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.deleteMany({ parentId: id }); // Delete all replies to this comment
    const deletedComment = await Comment.findByIdAndDelete(id); // Delete the comment itself
    if (!deletedComment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json({ message: 'Comment and its replies deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment' });
  }
};

// Update comment status
const updateCommentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedComment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment status' });
  }
};

// Like a comment
const likeComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    comment.likes = (comment.likes || 0) + 1; // Increment likes or initialize to 1 if undefined
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error liking comment' });
  }
};

module.exports = {
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
  getCommentsWithPostInfo,
  updateCommentStatus,
  likeComment,
};
