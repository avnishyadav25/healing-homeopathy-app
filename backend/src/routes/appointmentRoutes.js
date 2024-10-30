// /backend/routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment,
  updateAppointment,
} = require('../controllers/appointmentController');

router.post('/create', createAppointment);
router.get('/', getAppointments);
router.put('/status/:id', updateAppointmentStatus); // Update status route
router.put('/:id', updateAppointment); // Full update of appointment details
router.delete('/:id', deleteAppointment); // Delete appointment by ID
router.get('/:id', getAppointmentById); // Fetch appointment by ID


module.exports = router;
