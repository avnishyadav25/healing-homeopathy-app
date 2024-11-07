// src/components/forum/Sidebar.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { getPopularQuestions, getRecentQuestions, getTags } from '../../../services/forumService';

const Sidebar = () => {
  const [recentQuestions, setRecentQuestions] = useState([]);
  const [popularQuestions, setPopularQuestions] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchSidebarData = async () => {
      const [recentData, popularData, tagsData] = await Promise.all([
        getRecentQuestions(),
        getPopularQuestions(),
        getTags()
      ]);
      setRecentQuestions(recentData);
      setPopularQuestions(popularData);
      setTags(tagsData);
    };
    fetchSidebarData();
  }, []);

  return (
    <Box sx={{ p: 2, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h6" gutterBottom>Ad Space</Typography>
      <Box sx={{ mb: 2, height: 100, bgcolor: 'grey.300' }} /> {/* Placeholder for Ad space */}

      <Typography variant="h6" gutterBottom>Popular Questions</Typography>
      <List>
        {popularQuestions.map((question) => (
          <ListItem key={question._id} button>
            <ListItemText primary={question.title} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>Recent Questions</Typography>
      <List>
        {recentQuestions.map((question) => (
          <ListItem key={question._id} button>
            <ListItemText primary={question.title} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>Tags</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {tags.map((tag) => (
          <Typography key={tag._id} variant="caption" sx={{ bgcolor: 'primary.light', p: 0.5, borderRadius: 1 }}>
            {tag.name}
          </Typography>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>Categories</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {tags.map((tag) => (
          <Typography key={tag._id} variant="caption" sx={{ bgcolor: 'secondary.light', p: 0.5, borderRadius: 1 }}>
            {tag.name}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
