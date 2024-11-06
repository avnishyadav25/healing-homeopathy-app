// /backend/src/routes/tagRoutes.js
const express = require('express');
const { createTag, getTags, getTagById, updateTag, deleteTag, createOrUpdateTags } = require('../controllers/tagController');
const router = express.Router();

router.post('/', createTag);
router.get('/', getTags);
router.get('/:id', getTagById);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);
router.post('/createOrUpdate', createOrUpdateTags);


module.exports = router;
