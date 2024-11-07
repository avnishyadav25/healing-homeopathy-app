// /web-app/src/App.js

import React, { useMemo, useState, createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import HomePage from './pages/public/home/HomePage';
import AboutPage from './pages/public/about/AboutPage';
import ServicesPage from './pages/public/services/ServicesPage';
import BookAppointmentPage from './pages/public/appointment/BookAppointmentPage';
import BlogPage from './pages/public/blog/BlogPage';
import BlogPostPage from './pages/public/blog/BlogPostPage';
import ContactPage from './pages/public/contact/ContactPage';
import OrderMedicinePage from './pages/public/services/OrderMedicinePage';

import ProductPage from './pages/public/product/ProductPage';
import ForumFormPage from './pages/public/forum/ForumFormPage';
import ForumListPage from './pages/public/forum/ForumListPage';
import QuestionViewPage from './pages/public/forum/QuestionViewPage';

import LoginPage from './pages/public/auth/LoginPage';
import RegisterPage from './pages/public/auth/RegisterPage';
import RoleSelectionPage from './pages/public/auth/RoleSelectionPage';
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

import ServiceFormListPage from './pages/admin/service/ServiceFormListPage';
import AddServicePage from './pages/admin/service/AddServicePage';
import EditServicePage from './pages/admin/service/EditServicePage';
import ViewServicePage from './pages/admin/service/ViewServicePage';

// Import User management pages
import UserFormListPage from './pages/admin/user/UserFormListPage';
import AddUserPage from './pages/admin/user/AddUserPage';
import EditUserPage from './pages/admin/user/EditUserPage';
import ViewUserPage from './pages/admin/user/ViewUserPage';

import TagListPage from './pages/admin/tags/TagListPage';
import AddTagFormPage from './pages/admin/tags/AddTagFormPage';
import EditTagFormPage from './pages/admin/tags/EditTagFormPage';
import ViewTagFormPage from './pages/admin/tags/ViewTagFormPage';
import CategoryListPage from './pages/admin/categories/CategoryListPage';
import AddCategoryFormPage from './pages/admin/categories/AddCategoryFormPage';
import EditCategoryFormPage from './pages/admin/categories/EditCategoryFormPage';
import ViewCategoryFormPage from './pages/admin/categories/ViewCategoryFormPage';


import ProtectedRoute from './components/public/auth/ProtectedRoute';
import AdminPageTemplate from './components/admin/AdminPageTemplate';
import AuthProvider from './contexts/AuthContext';


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
            <Route path="/forum" element={<ForumListPage />} />
            <Route path="/forum/questions/new" element={<ForumFormPage />} />
            <Route path="/forum/questions/:slug" element={<QuestionViewPage />} />
            <Route path="/products" element={<ProductPage />} />
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

                <Route path="/admin/services" element={<ServiceFormListPage />} />
                <Route path="/admin/services/add" element={<AddServicePage />} />
                <Route path="/admin/services/edit/:id" element={<EditServicePage />} />
                <Route path="/admin/services/view/:id" element={<ViewServicePage />} />

                {/* User Management Routes */}
              <Route path="/admin/users" element={<UserFormListPage />} />
              <Route path="/admin/users/add" element={<AddUserPage />} />
              <Route path="/admin/users/edit/:id" element={<EditUserPage />} />
              <Route path="/admin/users/view/:id" element={<ViewUserPage />} />

              <Route path="/admin/tags" element={<TagListPage />} />
              <Route path="/admin/tags/add" element={<AddTagFormPage />} />
              <Route path="/admin/tags/edit/:id" element={<EditTagFormPage />} />
              <Route path="/admin/tags/view/:id" element={<ViewTagFormPage />} />
              <Route path="/admin/categories" element={<CategoryListPage />} />
              <Route path="/admin/categories/add" element={<AddCategoryFormPage />} />
              <Route path="/admin/categories/edit/:id" element={<EditCategoryFormPage />} />
              <Route path="/admin/categories/view/:id" element={<ViewCategoryFormPage />} />
      

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
