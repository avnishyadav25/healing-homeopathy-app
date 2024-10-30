// /web-app/src/App.js

import React, { useMemo, useState, createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ServicesPage from './pages/public/ServicesPage';
import BookAppointmentPage from './pages/public/BookAppointmentPage';
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
import EditBlogPage from './pages/admin/blog/EditBlogPage';
import CommentsPage from './pages/admin/blog/CommentsPage';
import MediaPage from './pages/admin/blog/MediaPage';
import BlogPreviewPage from './pages/admin/blog/BlogPreviewPage';

import CompanyPage from './pages/admin/CompanyPage';

import AppointmentListPage from './pages/admin/appointment/AppointmentListPage';
import AddAppointmentUserPage from './pages/admin/appointment/AddAppointmentUserPage';
import EditAppointmentUserPage from './pages/admin/appointment/EditAppointmentUserPage';
import ViewAppointmentUserPage from './pages/admin/appointment/ViewAppointmentUserPage'

import AllCommentListPage from './pages/admin/comment/AllCommentListPage';
import CommentListPage from './pages/admin/comment/CommentListPage';
import AddCommentPage from './pages/admin/comment/AddCommentPage';
import EditCommentPage from './pages/admin/comment/EditCommentPage';
import ViewCommentPage from './pages/admin/comment/ViewCommentPage';


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
            {/* Public Routes - wrapped with the Template component directly in each page */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/book-appointment" element={<BookAppointmentPage />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blogs/:id" element={<BlogPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/order-medicine" element={<OrderMedicinePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/role-selection" element={<RoleSelectionPage />} />

            {/* Admin Routes with AdminPageTemplate */}
            <Route element={<ProtectedRoute requiredRole="Super Admin" />}>
             {/*} <Route element={<AdminPageTemplate />}>*/}
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/admin/blogs" element={<AllBlogsPage />} />
                <Route path="/admin/blogs/create" element={<CreateBlogPage />} />
                <Route path="/admin/blogs/edit/:id" element={<EditBlogPage />} />
                <Route path="/admin/blogs/comments" element={<CommentsPage />} />
                <Route path="/admin/blogs/media" element={<MediaPage />} />
                <Route path="/admin/blog/preview" element={<BlogPreviewPage />} />

                <Route path="/admin/appointments" element={<AppointmentListPage />} />
                <Route path="/admin/appointments/create" element={<AddAppointmentUserPage />} />
                <Route path="/admin/appointments/view/:id" element={<ViewAppointmentUserPage />} />
                <Route path="/admin/appointments/edit/:id" element={<EditAppointmentUserPage />} />

                <Route path="/admin/comments" element={<AllCommentListPage />} />
                <Route path="/admin/comments/post/:postId" element={<CommentListPage />} />
                <Route path="/admin/comments/add" element={<AddCommentPage />} />
                <Route path="/admin/comments/edit/:id" element={<EditCommentPage />} />
                <Route path="/admin/comments/view/:id" element={<ViewCommentPage />} />

                <Route path="/admin/company" element={<CompanyPage />} />

             {/* </Route>*/}
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
