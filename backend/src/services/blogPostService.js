const BlogPost = require('../models/BlogPost');

const createPost = async (postData) => {
  const post = new BlogPost(postData);
  await post.save();
  return post;
};

const getAllPosts = async () => {
  return await BlogPost.find().populate('author', 'name');
};

const getPostById = async (postId) => {
  return await BlogPost.findById(postId).populate('author', 'name');
};

const updatePost = async (postId, updateData) => {
  return await BlogPost.findByIdAndUpdate(postId, updateData, { new: true });
};

const deletePost = async (postId) => {
  await BlogPost.findByIdAndDelete(postId);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
