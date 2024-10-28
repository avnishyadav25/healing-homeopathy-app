// src/pages/admin/blog/CreateBlogPage.js
import React from 'react';
import CreateBlog from '../../../components/admin/blog/CreateBlog';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';

const CreateBlogPage = () => {
  return (
    <AdminPageTemplate>
      <CreateBlog />
    </AdminPageTemplate>
  );
};

export default CreateBlogPage;
