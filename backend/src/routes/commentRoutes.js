// /backend/routes/commentRoutes.js
const express = require('express');
const {
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
  getCommentsWithPostInfo,
  updateCommentStatus,
  likeComment,
} = require('../controllers/commentController');
const router = express.Router();

router.get('/withPostInfo', getCommentsWithPostInfo);  // Fetch comments with post information
router.get('/:postId', getCommentsByPostId);           // Fetch comments by post ID
router.post('/', createComment);                       // Create a new comment or reply
router.put('/:id', updateComment);                     // Update comment text or status
router.delete('/:id', deleteComment);                  // Delete comment and replies
router.put('/:id/status', updateCommentStatus); // Route for updating comment status
router.put('/:id/like', likeComment);           // Route for liking a comment


module.exports = router;
