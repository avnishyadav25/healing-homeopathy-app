// /backend/src/controllers/categoryController.js
const Category = require('../models/Category');

// Create a new category
const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: 'Error creating category', error });
  }
};

// Get all categories with pagination
const getCategories = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 categories per page

  try {
    const categories = await Category.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalCategories = await Category.countDocuments(); // Total count of categories

    res.status(200).json({
      categories,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCategories / limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: 'Error updating category', error });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};

const createOrUpdateCategories = async (req, res) => {
  const { categories } = req.body; // Categories array from frontend

  if (!Array.isArray(categories)) {
    return res.status(400).json({ error: 'Invalid categories format. Expected an array.' });
  }

  try {
    const promises = categories.map(async (categoryName) => {
      let category = await Category.findOne({ name: categoryName }); // Updated to Category
      if (!category) {
        category = await Category.create({ name: categoryName });
      }
      return category;
    });

    const updatedCategories = await Promise.all(promises); // Wait for all categories to be processed
    res.status(200).json({ categories: updatedCategories }); // Updated to 'categories'
  } catch (error) {
    console.error('Error creating or updating categories:', error);
    res.status(500).json({ error: 'Server error in creating or updating categories' });
  }
};




module.exports = { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory, createOrUpdateCategories };
