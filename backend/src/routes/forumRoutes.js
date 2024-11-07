const express = require('express');
const { postQuestion, 
    getQuestions, 
    postReply, 
    likeReply, 
    approveReply, 
    deleteReply,
    getPopularQuestions,
    getRecentQuestions,
    getTags, } = require('../controllers/forumController');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');


// Question Routes
router.post('/questions', auth, postQuestion); // Protected route

router.get('/questions', getQuestions); // Get all questions

// Reply Routes
router.post('/replies/:questionId', auth, postReply); // Protected route
router.put('/replies/:replyId/like', likeReply); // Like a reply
router.put('/replies/:replyId/approve', approveReply); // Approve reply (admin only)
router.delete('/replies/:replyId', deleteReply); // Delete reply (admin only)
router.get('/popular-questions', getPopularQuestions);
router.get('/recent-questions', getRecentQuestions);
router.get('/tags', getTags);

module.exports = router;
