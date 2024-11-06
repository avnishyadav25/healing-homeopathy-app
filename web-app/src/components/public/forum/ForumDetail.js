// src/components/forum/ForumDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, TextField, Button, Card, CardContent, Alert } from '@mui/material';
import { getQuestionDetails, postReply } from '../../../services/forumService';

const ForumDetail = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const data = await getQuestionDetails(questionId);
        if (data) {
          setQuestion(data);
        } else {
          setError('Question not found or has been removed.');
        }
      } catch (err) {
        setError('Error fetching question details. Please try again later.');
      }
    };
    fetchQuestionDetails();
  }, [questionId]);

  const handleReplySubmit = async () => {
    try {
      await postReply(questionId, { content: replyContent });
      setReplyContent('');
      setQuestion((prev) => ({
        ...prev,
        replies: [...prev.replies, { content: replyContent, createdAt: new Date() }]
      }));
    } catch (err) {
      setError('Error posting reply. Please try again.');
    }
  };

  return (
    <Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {question && (
        <>
          <Typography variant="h4" gutterBottom>{question.title}</Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>{question.content}</Typography>

          <Typography variant="h6" gutterBottom>Replies</Typography>
          <Box>
            {question.replies.map((reply) => (
              <Card key={reply._id} sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="body2">{reply.content}</Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
                    {new Date(reply.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Your Reply</Typography>
            <TextField
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write your reply"
              fullWidth
              multiline
              rows={4}
              sx={{ mt: 2 }}
            />
            <Button onClick={handleReplySubmit} variant="contained" color="primary" sx={{ mt: 2 }}>
              Submit Reply
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ForumDetail;
