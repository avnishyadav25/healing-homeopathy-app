// /src/pages/admin/categories/ViewCategoryFormPage.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryById } from '../../../services/categoryService';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import { Typography, Box, Divider, Button } from '@mui/material';

const ViewCategoryFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const loadCategory = async () => {
      const data = await getCategoryById(id);
      setCategory(data);
    };
    loadCategory();
  }, [id]);

  if (!category) return <p>Loading...</p>;

  return (
    <AdminPageTemplate title="View Category">
      <Box p={3}>
        <Typography variant="h6"><strong>Category Name:</strong> {category.name}</Typography>
        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button variant="outlined" color="secondary" onClick={() => navigate('/admin/categories')}>Back to Categories</Button>
          <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={() => navigate(`/admin/categories/edit/${id}`)}>Edit Category</Button>
        </Box>
      </Box>
    </AdminPageTemplate>
  );
};

export default ViewCategoryFormPage;
