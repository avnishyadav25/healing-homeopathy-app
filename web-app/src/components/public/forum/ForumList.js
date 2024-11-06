// src/components/forum/ForumList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Button, Alert } from '@mui/material';
import { getQuestions } from '../../../services/forumService';

const ForumList = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Community Forum</Typography>
      <Button component={Link} to="/forum/new" variant="contained" color="primary" sx={{ mb: 2 }}>
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
    </Box>
  );
};

export default ForumList;
