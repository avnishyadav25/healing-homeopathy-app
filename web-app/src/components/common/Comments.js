// web-app/src/components/Comments.js
import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import JoditEditor from 'jodit-react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const Comments = ({ postId }) => {
  const [editorContent, setEditorContent] = useState('');
  const [comments, setComments] = useState([]); // Assuming you will load comments from the server

  const handleCommentSubmit = async () => {
    if (!editorContent) return;

    try {
      const response = await axios.post(`${apiUrl}/comments`, { postId, content: editorContent });
      setComments([...comments, response.data]); // Append new comment to list
      setEditorContent(''); // Clear editor after submission
    } catch (error) {
      console.error('Error submitting comment', error);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>Comments</Typography>
      {comments.map((comment, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {comment.author} - {new Date(comment.date).toLocaleDateString()}
          </Typography>
          <Typography variant="body1">{comment.content}</Typography>
        </Box>
      ))}
      <JoditEditor
        value={editorContent}
        onChange={newContent => setEditorContent(newContent)}
        config={{ readonly: false, height: 150 }}
      />
      <Button variant="contained" color="primary" onClick={handleCommentSubmit} sx={{ mt: 2 }}>
        Add Comment
      </Button>
    </Box>
  );
};

export default Comments; 