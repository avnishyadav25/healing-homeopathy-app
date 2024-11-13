import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid, TextField, Card, CardContent, Snackbar, Alert, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { getQuestionBySlug, postReply, getRepliesByQuestionId } from '../../../services/forumService';
import RichTextEditorPublic from '../../shared/RichTextEditorPublic';
import { AuthContext } from '../../../contexts/AuthContext';

const QuestionView = () => {
  const { slug } = useParams();
  const [question, setQuestion] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [replies, setReplies] = useState([]);
  const [error, setError] = useState(null);
  const { user, loading, fetchUser } = useContext(AuthContext) || {};
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const data = await getQuestionBySlug(slug);
        setQuestion(data);
        // Fetch replies for the question
        console.log('### data._id = ', data._id);
        const fetchedReplies = await getRepliesByQuestionId(data._id);
        console.log('### fetchedReplies = ', fetchedReplies);
        setReplies(fetchedReplies);
      } catch (err) {
        setError('Error fetching question details.');
      }
    };
    
    fetchQuestion();

    if (!user && fetchUser) {
      fetchUser();
    }
  }, [slug, user, fetchUser]);

  const handlePostReply = async () => {
    if (!user) {
      setSnackbar({ open: true, message: 'Please log in to post a reply.', severity: 'warning' });
      return;
    }

    try {
      await postReply(question._id, { content: replyContent, userId: user._id });
      setReplyContent('');
      // Refresh replies after posting a new one
      const updatedReplies = await getRepliesByQuestionId(question._id);
      setReplies(updatedReplies);
      setSnackbar({ open: true, message: 'Reply posted successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error posting reply:', error);
      setSnackbar({ open: true, message: 'Failed to post reply. Please try again later.', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (error) return <Typography>{error}</Typography>;
  if (!question || loading) return <Typography>Loading...</Typography>;

  return (
    <>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4">{question.title}</Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            dangerouslySetInnerHTML={{ __html: question.content }}
          />
          <Typography variant="caption" color="textSecondary" sx={{ mt: 2, display: 'block' }}>
            {replies.length} replies
          </Typography>
        </CardContent>
      </Card>
      
      {/* Reply Box */}
      <Card sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          {user ? 'Post a Reply' : 'Login or Register to Post a Reply'}
        </Typography>
        <RichTextEditorPublic
          value={replyContent}
          onChange={setReplyContent}
          disabled={!user}
        />
        
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Name"
              value={user?.name || ''}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              value={user?.email || ''}
              disabled
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, textAlign: 'right' }}>
          {user ? (
            <Button variant="contained" color="primary" onClick={handlePostReply}>
              Post Reply
            </Button>
          ) : (
            <>
              <Button variant="contained" color="secondary" sx={{ mr: 2 }} onClick={() => navigate('/register')}>
                Register
              </Button>
              <Button variant="outlined" onClick={() => navigate('/login')}>
                Login
              </Button>
            </>
          )}
        </Box>
      </Card>

      {/* Display replies */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Replies</Typography>
       

{replies.map((reply, index) => (
   <Card key={reply._id} sx={{ mt: 2 }}>
            <CardContent>
        <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
          <Avatar sx={{ mr: 2 }}>
            <AccountCircleIcon />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              {reply.userId?.name} - {new Date(reply.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
            <div dangerouslySetInnerHTML={{ __html: reply.content }} />
            </Typography>
          </Box>
        </Box>
        </CardContent>
        </Card>
      ))}

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
    </>
  );
};

export default QuestionView;
