// /web-app/src/App.js

import React, { useMemo, useState, createContext, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ServicesPage from './pages/public/ServicesPage';
import BlogPage from './pages/public/BlogPage';
import BlogPostPage from './pages/public/BlogPostPage';
import ContactPage from './pages/public/ContactPage';
import OrderMedicinePage from './pages/public/OrderMedicinePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import RoleSelectionPage from './pages/auth/RoleSelectionPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';

import AllBlogsPage from './pages/admin/blog/AllBlogsPage';
import CreateBlogPage from './pages/admin/blog/CreateBlogPage';
import CommentsPage from './pages/admin/blog/CommentsPage';
import MediaPage from './pages/admin/blog/MediaPage';

import Footer from './components/common/Footer';
import NavigationBar from './components/common/NavigationBar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPageTemplate from './components/admin/AdminPageTemplate';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () => createTheme({ palette: { mode } }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Public Routes with Header and Footer */}
            <Route element={<><NavigationBar /><Footer /></>}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/blogs" element={<BlogPage />} />
              <Route path="/blogs/:id" element={<BlogPostPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/order-medicine" element={<OrderMedicinePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/role-selection" element={<RoleSelectionPage />} />
            </Route>

            {/* Admin Routes with AdminPageTemplate */}
            <Route element={<ProtectedRoute requiredRole="Super Admin" />}>
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/admin/blog/all-blogs" element={<AllBlogsPage />} />
                <Route path="/admin/blog/create-blog" element={<CreateBlogPage />} />
                <Route path="/admin/blog/comments" element={<CommentsPage />} />
                <Route path="/admin/blog/media" element={<MediaPage />} />
            </Route>

            {/* Catch-all for unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
