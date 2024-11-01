const Blog = require('../models/Blog');
const mongoose = require('mongoose');

// Helper function to format permalink
const formatPermalink = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Create a new blog
const createBlog = async (req, res) => {
  try {
    const { title, content, tags, category, permalink, author, publishTime, status, featuredImage } = req.body;
    const blogUrl = permalink || formatPermalink(title);

    const newBlog = new Blog({
      title,
      content,
      tags: tags ? tags : [],
      category,
      permalink: blogUrl,
      author,
      publishTime,
      featuredImage,
      status
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Error creating blog', error });
  }
};

// Update an existing blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('#### id =', id);
    const { title, content, tags, category, permalink, author, publishTime, status, featuredImage } = req.body;
    console.log('#### req.body =', req.body);
    const blog = await Blog.findById(id);
    console.log('#### req.blog =', blog);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const blogUrl = permalink || formatPermalink(title);

    // Update blog fields
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.tags = tags ? tags : blog.tags;
    blog.category = category || blog.category;
    blog.permalink = blogUrl;
    blog.author = author || blog.author;
    blog.publishTime = publishTime || blog.publishTime;
    blog.status = status || blog.status;
    blog.featuredImage = featuredImage || blog.featuredImage;
    blog.updatedAt = Date.now();

    await blog.save();
    res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    console.log('#### error =', error);
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Error updating blog', error });
  }
};

// Get all blogs with optional status, category, and pagination
const getBlogs = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, category } = req.query;
    const query = {};

    if (status) query.status = status;
    if (category) query.category = category;

    const blogs = await Blog.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .exec();

    const totalBlogs = await Blog.countDocuments(query);

    res.status(200).json({
      blogs,
      currentPage: Number(page),
      totalPages: Math.ceil(totalBlogs / limit),
      totalBlogs,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
};

// Get a single blog by ID or permalink
const getBlogByIdOrPermalink = async (req, res) => {
  const { identifier } = req.params;
  try {
    let blog = mongoose.Types.ObjectId.isValid(identifier)
      ? await Blog.findById(identifier)
      : await Blog.findOne({ permalink: identifier });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    await blog.remove();
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error });
  }
};

// Archive a blog
const archiveBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, { archived: true }, { new: true });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog archived successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Error archiving blog', error });
  }
};

module.exports = {
  createBlog,
  updateBlog,
  getBlogs,
  getBlogByIdOrPermalink,
  deleteBlog,
  archiveBlog,
};
