const express = require('express');
const { postQuestion, getQuestions, postReply, likeReply, approveReply, deleteReply } = require('../controllers/forumController');
const router = express.Router();

// Question Routes
router.post('/questions', postQuestion); // Public or logged-in users
router.get('/questions', getQuestions); // Get all questions

// Reply Routes
router.post('/replies/:questionId', postReply); // Post reply to a question
router.put('/replies/:replyId/like', likeReply); // Like a reply
router.put('/replies/:replyId/approve', approveReply); // Approve reply (admin only)
router.delete('/replies/:replyId', deleteReply); // Delete reply (admin only)

module.exports = router;
