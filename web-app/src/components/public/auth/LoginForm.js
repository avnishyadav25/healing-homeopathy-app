// /web-app/src/components/LoginForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Avatar, Grid, Link, Alert, FormControlLabel, Checkbox, useTheme } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FaGoogle } from 'react-icons/fa';
import authService from '../../../services/authService';

const LoginForm = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { token, role } = await authService.login(email, password);
      console.log('#### token ', token);
      console.log('#### role ', role);

      if (rememberMe) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('role', role);
      }

      if (role === 'Admin' || role === 'Super Admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please check your credentials and try again.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${authService.apiUrl}/auth/google`;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.background.default, // Theme-based background color
        color: theme.palette.text.primary, // Theme-based text color
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Button
          fullWidth
          variant="contained"
          color="error"
          startIcon={<FaGoogle />}
          onClick={handleGoogleLogin}
          sx={{ mb: 3 }}
        >
          Login with Google
        </Button>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            input: { color: theme.palette.text.primary },
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            input: { color: theme.palette.text.primary },
          }}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2" color="primary">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/register" variant="body2" color="primary">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginForm;
