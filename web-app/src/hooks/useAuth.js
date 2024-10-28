// src/hooks/useAuth.js
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext'; // Assumes you have an AuthContext set up

export const useAuth = () => {
  return useContext(AuthContext);
};
