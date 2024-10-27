const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send-email', async (req, res) => {
  const { to, subject, body } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USERNAME, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      text: body,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Failed to send email' });
  }
});

module.exports = router;
