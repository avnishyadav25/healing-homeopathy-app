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
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const { user, loading, fetchUser } = useContext(AuthContext) || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await getCategories();
        const fetchedTags = await getTags();
        setAvailableCategories(fetchedCategories.map(cat => ({ label: cat.name, value: cat._id })));
        setAvailableTags(fetchedTags.map(tag => ({ label: tag.name, value: tag._id })));
      } catch (error) {
        console.error('Error fetching categories or tags:', error);
      }
    };
    fetchData();

    if (!user && !loading) {
      fetchUser();
    }
  }, [user, loading, fetchUser]);

  const handleSubmit = () => {
    const question = {
      title,
      content,
      categories: selectedCategories.map(cat => cat.value),
      tags: selectedTags.map(tag => tag.value),
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
          <CategorySelector
            options={availableCategories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </Grid>
        <Grid item xs={6}>
          <TagSelector
            options={availableTags}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
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
