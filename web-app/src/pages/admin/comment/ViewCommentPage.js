// /src/pages/admin/comment/ViewCommentPage.js
import React, { useEffect, useState } from 'react';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import { fetchCommentById } from '../../../services/commentService';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const ViewCommentPage = () => {
  const { id } = useParams();
  const [comment, setComment] = useState(null);

  useEffect(() => {
    const loadComment = async () => {
      const data = await fetchCommentById(id);
      setComment(data);
    };
    loadComment();
  }, [id]);

  return (
    <AdminPageTemplate>
      {comment ? (
        <Box p={4}>
          <Typography variant="h4">Comment Details</Typography>
          <Typography>Name: {comment.name}</Typography>
          <Typography>Email: {comment.email}</Typography>
          <Typography>Phone: {comment.phone}</Typography>
          <Typography>Comment: {comment.text}</Typography>
          <Typography>Created At: {new Date(comment.createdAt).toLocaleString()}</Typography>
        </Box>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </AdminPageTemplate>
  );
};

export default ViewCommentPage;
