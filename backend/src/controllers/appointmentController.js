// /backend/controllers/appointmentController.js


const Appointment = require('../models/Appointment');
const nodemailer = require('nodemailer');

const createAppointment = async (req, res) => {
  try {
    const { name, email, mobile, location, problem } = req.body;

    // Save appointment data to database
    const appointment = new Appointment({
      name,
      email,
      mobile,
      location,
      problem,
    });
    await appointment.save();

    // Send email to company and customer
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
      text: `Dear ${name},\n\nYour appointment has been successfully booked.\n\nProblem: ${problem}\n\nLocation: ${location}\n\nWe will contact you shortly.\n\nBest regards,\nHealing Homeopathy`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('#### Error sending email:', error);
      } else {
        console.log('### Email sent:', info.response);
      }
    });

    res.status(200).json({ message: 'Appointment booked successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment' +JSON.stringify(error)});
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

module.exports = {
  createAppointment,
  getAppointments
};

