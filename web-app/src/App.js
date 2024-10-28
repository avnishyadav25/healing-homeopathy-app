// /web-app/src/App.js

import React, { useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ServicesPage from './pages/public/ServicesPage';
import BlogPage from './pages/public/BlogPage';
import BlogPostPage from './pages/public/BlogPostPage';
import ContactPage from './pages/public/ContactPage';
import OrderMedicinePage from './pages/public/OrderMedicinePage';
import PersonalizedConsultation from './pages/public/PersonalizedConsultation';
import NaturalRemedies from './pages/public/NaturalRemedies';
import FamilyWellness from './pages/public/FamilyWellness';
import ChronicCondition from './pages/public/ChronicCondition';
import MentalWellbeing from './pages/public/MentalWellbeing';
import ImmuneBoosting from './pages/public/ImmuneBoosting';
import MedicineDelivery from './pages/public/MedicineDelivery';
import NavigationBar from './components/common/NavigationBar';
import TestimonialsPage from './pages/public/TestimonialsPage';
import MedicineDeliveryPage from './pages/public/MedicineDeliveryPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import RoleSelectionPage from './pages/auth/RoleSelectionPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage'; // Import Admin Dashboard
import AllBlogsPage from './pages/admin/blog/AllBlogsPage';
import CreateBlogPage from './pages/admin/blog/CreateBlogPage';
import CommentsPage from './pages/admin/blog/CommentsPage';
import MediaPage from './pages/admin/blog/MediaPage';
import AppointmentPage from './pages/public/BookAppointmentPage';
import AddProductPage from './pages/admin/product/AddProductPage';
import AddBlogPage from './pages/admin/blog/AddBlogPage';
import AddUserPage from './pages/admin/user/AddUserPage';
import AddAppointmentUserPage from './pages/admin/appointment/AddAppointmentUserPage';
import AddNewsletterUserPage from './pages/admin/newsletter/AddNewsletterUserPage';
import AddAppointmentTemplatePage from './pages/admin/appointment/AddAppointmentTemplatePage';
import AddNewsletterTemplatePage from './pages/admin/newsletter/AddNewsletterTemplatePage';
import ServicesTab from './components/admin/tabs/ServicesTab';
import ServiceDetail from './components/admin/services/ServiceDetail';


import Footer from './components/common/Footer';
import ProtectedRoute from './components/ProtectedRoute';

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
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/personalized-consultation" element={<PersonalizedConsultation />} />
          <Route path="/services/natural-remedies" element={<NaturalRemedies />} />
          <Route path="/services/family-wellness" element={<FamilyWellness />} />
          <Route path="/services/chronic-condition" element={<ChronicCondition />} />
          <Route path="/services/mental-wellbeing" element={<MentalWellbeing />} />
          <Route path="/services/immune-boosting" element={<ImmuneBoosting />} />
          <Route path="/services/medicine-delivery" element={<MedicineDelivery />} />
          <Route path="/medicine-delivery" element={<MedicineDeliveryPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogs/:id" element={<BlogPostPage />} />
          <Route path="/book-appointment" element={<AppointmentPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/order-medicine" element={<OrderMedicinePage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/role-selection" element={<RoleSelectionPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/blog/all-blogs" element={<AllBlogsPage />} />
        <Route path="/admin/blog/create-blog" element={<CreateBlogPage />} />
        <Route path="/admin/blogs/create" element={<CreateBlogPage />} />
        <Route path="/admin/blogs/edit" element={<CreateBlogPage />} />
        <Route path="/admin/blog/comments" element={<CommentsPage />} />
        <Route path="/admin/blog/media" element={<MediaPage />} />
        <Route path="/admin/product/add-product" element={<AddProductPage />} />
        <Route path="/admin/blog/create-blog" element={<AddBlogPage />} />

        <Route path="/admin/user/add-user" element={<AddUserPage />} />
        <Route path="/admin/appointment/add-appointment" element={<AddAppointmentUserPage />} />
        <Route path="/admin/newsletter/add-newsletter-user" element={<AddNewsletterUserPage />} />
        <Route path="/admin/appointment/add-appointment-template" element={<AddAppointmentTemplatePage />} />
        <Route path="/admin/newsletter/add-newsletter-template" element={<AddNewsletterTemplatePage />} />
        <Route path="/admin/services" element={<ServicesTab />} />
        <Route path="/admin/services/:id" element={<ServiceDetail />} />
      
      
        {/* Add other routes as needed */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
