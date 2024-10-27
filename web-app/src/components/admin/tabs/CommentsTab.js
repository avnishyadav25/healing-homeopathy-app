// /src/components/admin/tabs/CommentsTab.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;


const CommentsTab = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(apiUrl+'/comments')
      .then(response => setComments(response.data))
      .catch(error => console.error('Error fetching comments:', error));
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Comments</Typography>
      {comments.map((comment) => (
        <Paper key={comment._id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">{comment.name}</Typography>
          <Typography>{comment.text}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default CommentsTab;
