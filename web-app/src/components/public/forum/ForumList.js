// src/components/forum/ForumList.js
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Button, Alert, Grid, Modal } from '@mui/material';
import { getQuestions } from '../../../services/forumService';
import Sidebar from './Sidebar';
import { AuthContext } from '../../../contexts/AuthContext';

const ForumList = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const { user } = useContext(AuthContext); // Check if user is logged in
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestions();
        setQuestions(data);
        if (data.length === 0) {
          setError('No questions have been asked yet.');
        }
      } catch (err) {
        setError('Error fetching questions. Please try again later.');
      }
    };
    fetchQuestions();
  }, []);

  const handleAskQuestionClick = () => {
    if (user) {
      navigate('/forum/new');
    } else {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Grid container spacing={2} sx={{ p: 4 }}>
      <Grid item xs={12} md={8}>
        <Typography variant="h4" gutterBottom>Community Forum</Typography>
        <Button 
          onClick={handleAskQuestionClick}
          variant="contained" 
          color="primary" 
          sx={{ mb: 2 }}
        >
          Ask a Question
        </Button>
        {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}
        {questions.map((question) => (
          <Card key={question._id} sx={{ mb: 2 }}>
            <CardContent>
              <Link to={`/forum/questions/${question._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h5">{question.title}</Typography>
              </Link>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {question.content.substring(0, 100)}...
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Typography variant="caption">{question.replies.length} replies</Typography>
                <Link to={`/forum/questions/${question._id}`} style={{ textDecoration: 'none' }}>
                  <Button size="small" variant="outlined">View Details</Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Grid>
      <Grid item xs={12} md={4}>
        <Sidebar />
      </Grid>

      {/* Modal for login/register prompt */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper', 
          boxShadow: 24, 
          p: 4, 
          borderRadius: 2
        }}>
          <Typography variant="h6" gutterBottom>
            Please Register or Login
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            You need to be logged in to ask a question.
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            sx={{ mr: 2 }}
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
          <Button 
            variant="outlined"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
};

export default ForumList;
