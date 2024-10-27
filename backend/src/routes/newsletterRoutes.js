// /backend/routes/newsletterRoutes.js

const express = require('express');
const router = express.Router();
const { subscribeToNewsletter } = require('../controllers/newsletterController');
const { getNewsletterUsers } = require('../controllers/newsletterUserController');


router.post('/subscribe', subscribeToNewsletter);
router.post('/', getNewsletterUsers);

module.exports = router;
