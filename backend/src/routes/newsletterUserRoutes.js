// /backend/routes/serviceRoutes.js
const express = require('express');
const { getNewsletterUsers } = require('../controllers/newsletterUserController');
const router = express.Router();

router.get('/', getNewsletterUsers);

module.exports = router;
