// src/index.js

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { ThemeProvider } from '@mui/material/styles';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import theme from './theme.js'; // Import the custom theme

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
);
