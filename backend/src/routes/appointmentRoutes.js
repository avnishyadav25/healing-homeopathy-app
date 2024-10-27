// /backend/routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const { createAppointment } = require('../controllers/appointmentController');
const { getAppointments } = require('../controllers/appointmentController');



console.log("##### createAppointment = ",createAppointment);  // Should log the function definition

router.post('/create', createAppointment);
router.get('/', getAppointments);


module.exports = router; 

