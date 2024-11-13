// /web-app/src/components/Comments.js
import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Button, TextField, Avatar, Grid, Snackbar, Alert } from '@mui/material';
import { fetchCommentsByPostId, createComment } from '../../services/commentService';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RichTextEditorPublic from '../shared/RichTextEditorPublic';
import { AuthContext } from '../../contexts/AuthContext';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const { user, fetchUser } = useContext(AuthContext) || {};

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await fetchCommentsByPostId(postId);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();

    // Autofill name, email, and phone if user is logged in
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsLoggedIn(true);
    } else {
      fetchUser();
      setName(localStorage.getItem('name') || sessionStorage.getItem('name') || '');
      setEmail(localStorage.getItem('email') || sessionStorage.getItem('email') || '');
      setPhone(localStorage.getItem('phone') || sessionStorage.getItem('phone') || '');
    }
  }, [postId, user, fetchUser]);

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    const commentData = { name, email, phone, text: commentText, postId };

    try {
      const newComment = await createComment(commentData);
      setComments([...comments, newComment]); // Append new comment to list
      setCommentText(''); // Clear comment text after submission
      setSnackbar({ open: true, message: 'Comment added successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error submitting comment:', error);
      setSnackbar({ open: true, message: 'Failed to add comment. Please try again.', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
            <Typography variant="body1">
            <div dangerouslySetInnerHTML={{ __html: comment.text }} />
            </Typography>
          </Box>
        </Box>
      ))}

      <Box component="form" sx={{ mt: 3 }}>
        {/* Comment editor */}
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Your Comment</Typography>
        <RichTextEditorPublic value={commentText} onChange={setCommentText} />

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={4}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              disabled={isLoggedIn} // Disable if logged in
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              disabled={isLoggedIn} // Disable if logged in
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={handleCommentSubmit}
          sx={{ mt: 3 }}
        >
          Add Comment
        </Button>
      </Box>

      {/* Snackbar for success and error messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Comments;
