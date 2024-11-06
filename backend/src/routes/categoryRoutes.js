// /backend/src/routes/categoryRoutes.js
const express = require('express');
const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory, createOrUpdateCategories } = require('../controllers/categoryController');
const router = express.Router();

router.post('/', createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);
router.post('/createOrUpdate', createOrUpdateCategories);

module.exports = router;
