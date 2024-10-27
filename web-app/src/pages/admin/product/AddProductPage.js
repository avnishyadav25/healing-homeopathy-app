// /src/pages/admin/product/AddProductPage.js
import React from 'react';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import AddProduct from '../../../components/admin/product/AddProduct'; // Create AddProduct component

const AddProductPage = () => {
  return (
    <AdminPageTemplate>
      <AddProduct />
    </AdminPageTemplate>
  );
};

export default AddProductPage;
