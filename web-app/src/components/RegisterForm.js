// /web-app/src/components/RegisterForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FaGoogle } from 'react-icons/fa';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Patient');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [problem, setProblem] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const requestData = {
      name,
      email,
      password,
      role,
      ...(role === 'Doctor' && { licenseNumber }),
      ...(role === 'Patient' && { problem }),
      ...(role === 'Customer' && { reason }),
    };

    try {
      const response = await axios.post(`${apiUrl}/users/register`, requestData);
      setSuccess('Registration successful! Please check your email to verify your account.');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setLicenseNumber('');
      setProblem('');
      setReason('');
      setTimeout(() => navigate('/login'), 5000);
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 2,
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Button
          fullWidth
          variant="contained"
          color="error"
          startIcon={<FaGoogle />}
          onClick={handleGoogleLogin}
          sx={{ mb: 3 }}
        >
          Register with Google
        </Button>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          select
          required
          fullWidth
          label="Registering As"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="Doctor">Doctor</MenuItem>
          <MenuItem value="Patient">Patient</MenuItem>
          <MenuItem value="Customer">Customer</MenuItem>
        </TextField>

        {role === 'Doctor' && (
          <TextField
            margin="normal"
            required
            fullWidth
            label="License Number"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
          />
        )}

        {role === 'Patient' && (
          <TextField
            margin="normal"
            required
            fullWidth
            label="Problem or Reason for Consultation"
            multiline
            rows={4}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />
        )}

        {role === 'Customer' && (
          <TextField
            margin="normal"
            required
            fullWidth
            label="Reason for Registration"
            multiline
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        )}

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Register
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Link href="/login" variant="body2">
              {"Already have an account? Log In"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default RegisterForm;
