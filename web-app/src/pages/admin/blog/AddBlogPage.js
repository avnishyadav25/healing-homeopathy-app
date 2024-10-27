// /src/pages/admin/blog/AddBlogPage.js
import React from 'react';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import CreateBlog from '../../../components/admin/blog/CreateBlog';

const AddBlogPage = () => {
  return (
    <AdminPageTemplate>
      <CreateBlog />
    </AdminPageTemplate>
  );
};

export default AddBlogPage;
