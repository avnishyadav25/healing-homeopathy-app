// /backend/controllers/commentController.js
const Comment = require('../models/Comment');

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments' });
  }
};


// Export the controller function(s)
module.exports = {
    getComments
  };
  