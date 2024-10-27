const express = require('express');
const router = express.Router();
const { createContact } = require('../controllers/contactUsController');

router.post('/contact-us', createContact);

module.exports = router;
