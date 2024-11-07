// /web-app/src/services/authService.js
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Login function using the new auth endpoint
const login = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, { email, password }); // Updated endpoint
    console.log('#### response ', response);

    if (response.data && response.data.token && response.data.user) {
      const {token, user} = response.data; 
      console.log('#### user ', user);
      const { role, name, email } = response.data.user;
      return { token, role, name, email };
    } else {
      throw new Error('Login failed. No token or role received.');
    }
  } catch (error) {
    console.log('#### error ', error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Login failed. Please check your credentials and try again.');
    }
  }
};

// Fetch user profile using the auth token
const getProfile = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('### auth me ', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

const authService = {
  login,
  getProfile, // Expose the new getProfile function for fetching user data
};

export default authService;
