// src/components/forum/ForumForm.js
import React, { useState, useContext, useEffect } from 'react';
import { Box, Grid, Typography, TextField, Button, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CategorySelector from '../../shared/CategorySelector';
import TagSelector from '../../shared/TagSelector';
import Sidebar from './Sidebar';
import RichTextEditorPublic from '../../shared/RichTextEditorPublic';
import { AuthContext } from '../../../contexts/AuthContext';
import { createOrUpdateCategories, createOrUpdateTags, createQuestion } from '../../../services/forumService';

const ForumForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const { user, loading, fetchUser } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      fetchUser();
    }
  }, [user, loading, fetchUser]);

  const handlePostSubmit = async () => {
    if (user) {
      console.log('### user ', user);
      try {
        // Create or update tags and categories
        const updatedCategories = await createOrUpdateCategories(categories);
        const updatedTags = await createOrUpdateTags(tags);

        // Prepare question data
        const questionData = {
          title,
          content,
          categories: updatedCategories.map((cat) => cat.name),
          tags: updatedTags.map((tag) => tag.name),
          userId: user._id,
        };

        // Post the question to the backend
        await createQuestion(questionData);

        setModalOpen(false);
        navigate('/forum');
      } catch (error) {
        console.error("Error creating question:", error);
      }
    } else {
      setModalOpen(true);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Grid container spacing={2} sx={{ p: 4 }}>
      <Grid item xs={12} md={8}>
        <Box sx={{ p: 2, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Ask a Question
          </Typography>

          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* Use the RichTextEditorPublic component */}
          <RichTextEditorPublic
            value={content}
            onChange={setContent}
          />

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <CategorySelector categories={categories} setCategories={setCategories} />
            </Grid>
            <Grid item xs={6}>
              <TagSelector tags={tags} setTags={setTags} />
            </Grid>
          </Grid>

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

          <Button
            variant="contained"
            color="primary"
            onClick={handlePostSubmit}
            sx={{ mt: 3 }}
          >
            Post
          </Button>

          <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
            <Box sx={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2
            }}>
              <Typography variant="h6" gutterBottom>Confirm Post</Typography>
              {user ? (
                <Typography>Are you sure you want to post this question?</Typography>
              ) : (
                <>
                  <Typography>Please log in or register to post your question.</Typography>
                  <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => navigate('/register')}>Register</Button>
                  <Button variant="outlined" sx={{ mt: 1 }} onClick={() => navigate('/login')}>Login</Button>
                </>
              )}
            </Box>
          </Modal>
        </Box>
      </Grid>

      <Grid item xs={12} md={4}>
        <Sidebar />
      </Grid>
    </Grid>
  );
};

export default ForumForm;
