// /src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

const API_URL = process.env.REACT_APP_API_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    console.log('Token found in localStorage:', token);

    if (token) {
      try {
        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched user data:', response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error.response || error);
        logout(); // Clear token if fetch fails
      }
    } else {
      console.log('No token found in localStorage');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      const { token, user: loggedInUser } = response.data;

      localStorage.setItem('token', token);
      setUser(loggedInUser);
      console.log('User logged in successfully:', loggedInUser);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error.response || error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
