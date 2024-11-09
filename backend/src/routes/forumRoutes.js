// /backend/src/routes/forumRoutes.js
const express = require('express');
const {
  postQuestion,
  getQuestions,
  postReply,
  likeReply,
  approveReply,
  deleteReply,
  getPopularQuestions,
  getRecentQuestions,
  getTags,
  getQuestionBySlug,
  getRepliesByQuestionId,
  getTagsWithCount,
  getCategoriesWithCount,
  getCategories,
  getQuestionByIdentifier
} = require('../controllers/forumController');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

// Question Routes
router.post('/questions', auth, postQuestion); // Protected route for posting a question
router.get('/questions', getQuestions); // Get all questions

// Reply Routes
router.post('/replies/:questionId', auth, postReply); // Protected route for posting a reply
router.put('/replies/:replyId/like', likeReply); // Like a reply
router.put('/replies/:replyId/approve', approveReply); // Approve reply (admin only)
router.delete('/replies/:replyId', deleteReply); // Delete reply (admin only)

// Additional Routes
router.get('/popular-questions', getPopularQuestions);
router.get('/recent-questions', getRecentQuestions);
router.get('/tags', getTags);
//router.get('/questions/:slug', getQuestionBySlug); // New route to get question by slug
router.get('/questions/:identifier', getQuestionByIdentifier);


router.get('/replies/:id', getRepliesByQuestionId); // New route to get question by slug

router.get('/tags', getTags);
router.get('/categories', getCategories);

router.get('/tags-with-count', getTagsWithCount);
router.get('/categories-with-count', getCategoriesWithCount);
 
module.exports = router;
