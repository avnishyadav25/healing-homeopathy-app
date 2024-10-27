// /src/pages/admin/newsletter/AddNewsletterUserPage.js
import React from 'react';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import AddNewsletterUser from '../../../components/admin/newsletter/AddNewsletterUser'; // Create AddNewsletterUser component

const AddNewsletterUserPage = () => {
  return (
    <AdminPageTemplate>
      <AddNewsletterUser />
    </AdminPageTemplate>
  );
};

export default AddNewsletterUserPage;
