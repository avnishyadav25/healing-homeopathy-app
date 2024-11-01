import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Alert,
  Modal,
  Grow,
  Slide,
  useTheme,
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
//require('dotenv').config();

const AppointmentForm = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState('');
  const [problem, setProblem] = useState('');
  const [captcha, setCaptcha] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;
  const siteKeyV2 = '6Lf4SisqAAAAAIUFbcSMgV0KK1-OQkeFvPCoiBKX';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!captcha) {
      setError('Please verify the captcha');
      return;
    }

    const appointmentData = { name, email, mobile, location, problem };

    try {
      await axios.post(`${apiUrl}/appointments/create`, appointmentData);
      setSuccess(true);
      setOpen(true);
    } catch (error) {
      setError('Error booking appointment. Please try again.');
    }
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  return (
    <Grow in={true} timeout={1000}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          textAlign: 'center',
          backgroundColor: isDarkMode ? '#424242' : '#f5f5f5',
          color: isDarkMode ? '#ffffff' : '#000000',
          mt: 8,  // Increased top margin to avoid overlap with header
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: isDarkMode ? 'primary.main' : 'secondary.main' }}>
          <EventAvailableIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Book an Appointment
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{ style: { color: isDarkMode ? '#ffffff' : '#000000' } }}
            InputProps={{
              style: {
                color: isDarkMode ? '#ffffff' : '#000000',
                backgroundColor: isDarkMode ? '#616161' : '#ffffff',
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: isDarkMode ? '#ffffff' : '#000000' } }}
            InputProps={{
              style: {
                color: isDarkMode ? '#ffffff' : '#000000',
                backgroundColor: isDarkMode ? '#616161' : '#ffffff',
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            InputLabelProps={{ style: { color: isDarkMode ? '#ffffff' : '#000000' } }}
            InputProps={{
              style: {
                color: isDarkMode ? '#ffffff' : '#000000',
                backgroundColor: isDarkMode ? '#616161' : '#ffffff',
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            InputLabelProps={{ style: { color: isDarkMode ? '#ffffff' : '#000000' } }}
            InputProps={{
              style: {
                color: isDarkMode ? '#ffffff' : '#000000',
                backgroundColor: isDarkMode ? '#616161' : '#ffffff',
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Problem or Reason for Appointment"
            multiline
            rows={4}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            InputLabelProps={{ style: { color: isDarkMode ? '#ffffff' : '#000000' } }}
            InputProps={{
              style: {
                color: isDarkMode ? '#ffffff' : '#000000',
                backgroundColor: isDarkMode ? '#616161' : '#ffffff',
              },
            }}
          />
          <ReCAPTCHA
            sitekey={siteKeyV2}
            onChange={setCaptcha}
            sx={{ mt: 2, mb: 3 }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Book Appointment
          </Button>
        </Box>
        <Modal open={open} onClose={handleClose}>
          <Slide direction="down" in={open} mountOnEnter unmountOnExit>
            <Box sx={{ mt: '15%', ml: '25%', mr: '25%', p: 4, backgroundColor: 'white', textAlign: 'center' }}>
              <Typography variant="h6">
                Congratulations! Your appointment is booked. Our team will reach out soon.
              </Typography>
              <Button variant="contained" color="primary" onClick={handleClose} sx={{ mt: 2 }}>
                Close
              </Button>
            </Box>
          </Slide>
        </Modal>
      </Paper>
    </Grow>
  );
};

export default AppointmentForm;
