// /backend/src/routes/questionRoutes.js
const express = require('express');

const { postQuestion, getQuestions, getQuestionBySlug } = require('../controllers/questionController');
const router = express.Router();

router.post('/', postQuestion);
router.get('/', getQuestions);
router.get('/:slug', getQuestionBySlug); // New route to get question by slug

module.exports = router;
