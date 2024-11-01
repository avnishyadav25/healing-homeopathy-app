// /backend/src/controllers/tagController.js
const Tag = require('../models/Tag');

// Create a new tag
const createTag = async (req, res) => {
  try {
    const tag = new Tag(req.body);
    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ message: 'Error creating tag', error });
  }
};

// Get all tags with pagination
const getTags = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and 10 tags per page

  try {
    const tags = await Tag.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalTags = await Tag.countDocuments(); // Total count of tags for pagination

    res.status(200).json({
      tags,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalTags / limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tags', error });
  }
};

// Get tag by ID
const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tag', error });
  }
};

// Update tag
const updateTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json({ message: 'Error updating tag', error });
  }
};

// Delete tag
const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tag', error });
  }
};

module.exports = { createTag, getTags, getTagById, updateTag, deleteTag };
