// src/routes/blogPostRoutes.js

const express = require('express');
const blogPostController = require('../controllers/blogPostController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/posts', authMiddleware, blogPostController.createPost);
router.get('/posts', blogPostController.getAllPosts);
router.get('/posts/:id', blogPostController.getPostById);
router.put('/posts/:id', authMiddleware, blogPostController.updatePost);
router.delete('/posts/:id', authMiddleware, blogPostController.deletePost);

module.exports = router;
