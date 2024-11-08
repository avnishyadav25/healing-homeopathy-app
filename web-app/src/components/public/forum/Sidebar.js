// src/components/forum/Sidebar.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, TextField, Button } from '@mui/material';
import { getPopularQuestions, getRecentQuestions, getTagsWithCount, getCategoriesWithCount } from '../../../services/forumService';

const Sidebar = () => {
  const [search, setSearch] = useState('');
  const [recentQuestions, setRecentQuestions] = useState([]);
  const [popularQuestions, setPopularQuestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAllTags, setShowAllTags] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    const fetchSidebarData = async () => {
      const [recentData, popularData, tagsData, categoriesData] = await Promise.all([
        getRecentQuestions(),
        getPopularQuestions(),
        getTagsWithCount(),
        getCategoriesWithCount()
      ]);
      setRecentQuestions(recentData);
      setPopularQuestions(popularData);
      setTags(tagsData);
      setCategories(categoriesData);
    };
    fetchSidebarData();
  }, []);

  const filteredTags = showAllTags ? tags : tags.slice(0, 10);
  const filteredCategories = showAllCategories ? categories : categories.slice(0, 10);

  return (
    <Box sx={{ p: 2, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

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
        {filteredTags.map((tag) => (
          <Typography key={tag._id} variant="caption" sx={{ bgcolor: 'primary.light', p: 0.5, borderRadius: 1 }}>
            {tag.name} ({tag.count})
          </Typography>
        ))}
      </Box>
      {tags.length > 10 && (
        <Button size="small" onClick={() => setShowAllTags(!showAllTags)}>
          {showAllTags ? 'Show Less' : 'Show More'}
        </Button>
      )}

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>Categories</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {filteredCategories.map((category) => (
          <Typography key={category._id} variant="caption" sx={{ bgcolor: 'secondary.light', p: 0.5, borderRadius: 1 }}>
            {category.name} ({category.count})
          </Typography>
        ))}
      </Box>
      {categories.length > 10 && (
        <Button size="small" onClick={() => setShowAllCategories(!showAllCategories)}>
          {showAllCategories ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </Box>
  );
};

export default Sidebar;
