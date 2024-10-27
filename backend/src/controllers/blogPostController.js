const blogPostService = require('../services/blogPostService');

const createPost = async (req, res) => {
  try {
    const post = await blogPostService.createPost({ ...req.body, author: req.user.userId });
    res.status(201).json({ message: 'Blog post created', post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await blogPostService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await blogPostService.getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await blogPostService.updatePost(req.params.id, req.body);
    res.status(200).json({ message: 'Post updated', post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    await blogPostService.deletePost(req.params.id);
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
