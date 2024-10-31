// /src/pages/admin/tags/ViewTagFormPage.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTagById } from '../../../services/tagService';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import { Typography, Box, Button, Divider } from '@mui/material';

const ViewTagFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tag, setTag] = useState(null);

  useEffect(() => {
    const loadTag = async () => {
      try {
        const data = await getTagById(id);
        setTag(data);
      } catch (error) {
        console.error('Error fetching tag:', error);
      }
    };
    loadTag();
  }, [id]);

  if (!tag) return <p>Loading...</p>;

  return (
    <AdminPageTemplate title="View Tag">
      <Box p={3}>
        <Typography variant="h6"><strong>Tag Name:</strong> {tag.name}</Typography>
        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button variant="outlined" color="secondary" onClick={() => navigate('/admin/tags')}>Back to Tags</Button>
          <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={() => navigate(`/admin/tags/edit/${id}`)}>Edit Tag</Button>
        </Box>
      </Box>
    </AdminPageTemplate>
  );
};

export default ViewTagFormPage;
