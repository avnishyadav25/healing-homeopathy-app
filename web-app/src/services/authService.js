// /web-app/src/services/authService.js

import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const login = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/users/login`, { email, password });
    console.log('#### response ', response);

    if (response.data && response.data.token && response.data.role) {
      const { token, role, name, email } = response.data;
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

const authService = {
  apiUrl,
  login,
};

export default authService;
