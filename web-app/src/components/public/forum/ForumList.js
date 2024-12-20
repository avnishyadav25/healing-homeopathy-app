// src/components/forum/ForumList.js
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Button, Alert, Grid, Modal, Pagination } from '@mui/material';
import { getQuestions } from '../../../services/forumService';
import Sidebar from './Sidebar';
import { AuthContext } from '../../../contexts/AuthContext';
import Ads from '../../common/Ads';

import DOMPurify from 'dompurify';

const ForumList = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const { user, loading, fetchUser } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data, total } = await getQuestions(page, 10); // Fetch 10 questions per page
        setQuestions(data);
        setTotalPages(Math.ceil(total / 10));
        if (data.length === 0) {
          setError('No questions have been asked yet.');
        }
      } catch (err) {
        setError('Error fetching questions. Please try again later.');
      }
    };

    fetchQuestions();

    if (!user && fetchUser) {
      fetchUser();
    }
  }, [page, user, fetchUser]);

  const handleAskQuestionClick = () => {
    if (user) {
      navigate('/forum/questions/new');
    } else {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handlePageChange = (event, value) => {
    setSearchParams({ page: value });
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <>
       <Ads />
    
    <Grid container spacing={2} sx={{ p: 4 }}>
      <Grid item xs={12} md={8}>
        <Typography variant="h4" gutterBottom>Community Forum</Typography>

        {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}
        {questions.map((question) => (
          <Card key={question._id} sx={{ mb: 2 }}>
            <CardContent>
              <Link to={`/forum/questions/${question.urlSlug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h5">{question.title}</Typography>
              </Link>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mt: 1 }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(question.content.substring(0, 100)),
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Typography variant="caption">{question.replies.length} replies</Typography>
                <Link to={`/forum/questions/${question.urlSlug}`} style={{ textDecoration: 'none' }}>
                  <Button size="small" variant="outlined">View Details</Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
        ))}

        {/* Pagination Component */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Grid>

      <Grid item xs={12} md={4}>
        <Button 
          onClick={handleAskQuestionClick}
          variant="contained" 
          color="primary" 
          sx={{ mb: 2 }}
        >
          Ask a Question
        </Button>
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
    <Ads />
   </>
  );
};

export default ForumList;
