// src/components/admin/forum/QuestionForm.js
import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { createQuestion, getTags, getCategories } from '../../../services/forumService';
import { AuthContext } from '../../../contexts/AuthContext';
import RichTextEditorPublic from '../../shared/RichTextEditorPublic';
import CategorySelector from '../../shared/CategorySelector';
import TagSelector from '../../shared/TagSelector';

const QuestionForm = ({ questionData, onSubmit }) => {
  const [title, setTitle] = useState(questionData?.title || '');
  const [content, setContent] = useState(questionData?.content || '');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await getCategories();
      const fetchedTags = await getTags();
      setCategories(fetchedCategories);
      setTags(fetchedTags);
    };
    fetchData();
  }, []);

  const handleSubmit = () => {
    const question = {
      title,
      content,
      categories,
      tags,
      userId: user._id,
    };
    onSubmit(question);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Ask a Question</Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <RichTextEditorPublic value={content} onChange={setContent} />
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <CategorySelector categories={categories} setCategories={setCategories} />
        </Grid>
        <Grid item xs={6}>
          <TagSelector tags={tags} setTags={setTags} />
        </Grid>
      </Grid>
      <TextField label="Name" value={user?.name || ''} fullWidth disabled sx={{ mt: 2 }} />
      <TextField label="Email" value={user?.email || ''} fullWidth disabled sx={{ mt: 2 }} />
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 3 }}>
        Post
      </Button>
    </Box>
  );
};

export default QuestionForm;
