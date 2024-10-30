// /web-app/src/components/Comments.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Avatar } from '@mui/material';
import {fetchCommentsByPostId, createComment} from '../../services/commentService';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [text, setText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch comments for the post
    const fetchComments = async () => {
      try {
        const commentsData = await fetchCommentsByPostId(postId);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();

    // Autofill name and email if user is logged in
    const savedName = localStorage.getItem('name') || sessionStorage.getItem('name');
    const savedEmail = localStorage.getItem('email') || sessionStorage.getItem('email');
    if (savedName) {
      setName(savedName);
      setIsLoggedIn(true);
    }
    if (savedEmail) setEmail(savedEmail);
  }, [postId]);

  const handleCommentSubmit = async () => {
    if (!text) return;

    const commentData = { name, email, phone, text, postId };

    try {
      const newComment = await createComment(commentData);
      setComments([...comments, newComment]); // Append new comment to list
      setText(''); // Clear comment text after submission
    } catch (error) {
      console.error('Error submitting comment', error);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
        Comments
      </Typography>

      {comments.map((comment, index) => (
        <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
          <Avatar sx={{ mr: 2 }}>
            <AccountCircleIcon />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              {comment.name} - {new Date(comment.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">{comment.text}</Typography>
          </Box>
        </Box>
      ))}

      <Box component="form" sx={{ mt: 3 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          disabled={isLoggedIn} // Disable if logged in
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          disabled={isLoggedIn} // Disable if logged in
        />
        <TextField
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={4}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
          Add Comment
        </Button>
      </Box>
    </Box>
  );
};

export default Comments;
