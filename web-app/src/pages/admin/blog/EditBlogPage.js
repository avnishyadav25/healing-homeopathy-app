// /web-app/src/pages/admin/blog/EditBlogPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogService from '../../../services/blogService';
import EditBlog from '../../../components/admin/blog/EditBlog';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';

const EditBlogPage = () => {
  const { id } = useParams(); // Retrieve the blog ID from the URL
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const data = await blogService.fetchBlogByIdOrPermalink(id);
        setBlogData(data);
      } catch (error) {
        console.error('Error fetching blog data for editing:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  return (
    <AdminPageTemplate>
      {loading ? (
        <div>Loading...</div>
      ) : blogData ? (
        <EditBlog blogData={blogData} />
      ) : (
        <div>Error loading blog data.</div>
      )}
    </AdminPageTemplate>
  );
};

export default EditBlogPage;
