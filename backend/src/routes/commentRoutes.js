// /backend/routes/commentRoutes.js
const express = require('express');
const { getCommentsByPostId, createComment, updateComment, deleteComment } = require('../controllers/commentController');
const router = express.Router();

router.get('/:postId', getCommentsByPostId);
router.post('/', createComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

module.exports = router;
