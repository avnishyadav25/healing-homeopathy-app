// src/components/admin/forum/ViewQuestionForm.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { getQuestionDetails, getRepliesByQuestionId } from '../../../services/forumService';

const ViewQuestionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      const data = await getQuestionDetails(id);
      setQuestion(data);
      const repliesData = await getRepliesByQuestionId(id);
      setReplies(repliesData);
    };
    fetchQuestionDetails();
  }, [id]);

  return (
    <Box sx={{ p: 4 }}>
      <Button variant="contained" onClick={() => navigate(-1)}>
        Back
      </Button>
      <Typography variant="h4">{question?.title}</Typography>
      <Typography variant="body1" dangerouslySetInnerHTML={{ __html: question?.content }} />
      <Typography variant="h6">Replies</Typography>
      <List>
        {replies.map((reply) => (
          <ListItem key={reply._id}>
            <ListItemText primary={reply.content} secondary={`By ${reply.userId.name}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ViewQuestionForm;
