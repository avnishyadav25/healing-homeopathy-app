// /backend/controllers/appointmentController.js
const Appointment = require('../models/Appointment');
const nodemailer = require('nodemailer');

// Create a new appointment
const createAppointment = async (req, res) => {
  try {
    const { name, email, mobile, location, problem, appointmentDate } = req.body;

    const appointment = new Appointment({
      name,
      email,
      mobile,
      location,
      problem,
      appointmentDate,
    });
    await appointment.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: `${email}, aavnishyadav25@gmail.com`,
      subject: 'Appointment Booked',
      text: `Dear ${name},\n\nYour appointment has been successfully booked on ${new Date(appointmentDate).toLocaleString()}.\n\nProblem: ${problem}\n\nLocation: ${location}\n\nWe will contact you shortly.\n\nBest regards,\nHealing Homoeopathy`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(200).json({ message: 'Appointment booked successfully!', appointment });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Error booking appointment', error });
  }
};

// Fetch all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status, notes },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment status updated successfully', appointment });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({ message: 'Error updating appointment status', error });
  }
};

// Update full appointment details
const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const appointment = await Appointment.findByIdAndUpdate(id, updatedData, { new: true });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment updated successfully', appointment });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Error updating appointment', error });
  }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: 'Error deleting appointment', error });
  }
};

// Fetch appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error fetching appointment by ID:', error);
    res.status(500).json({ message: 'Error fetching appointment by ID', error });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  updateAppointment,
  deleteAppointment,
  getAppointmentById
};
