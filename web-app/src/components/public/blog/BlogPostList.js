// src/components/admin/blog/BlogPostList.js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  IconButton,
  Typography,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import blogService from '../../../services/blogService';
import categoryService from '../../../services/categoryService';

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

function Author({ authors }) {
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <AvatarGroup max={3}>
        {authors.map((author, index) => (
          <Avatar key={index} alt={author.name} src={author.avatar} sx={{ width: 24, height: 24 }} />
        ))}
      </AvatarGroup>
      <Typography variant="caption">{authors.map((author) => author.name).join(', ')}</Typography>
    </Box>
  );
}

Author.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const BlogPostList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState(['All categories']);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await categoryService.fetchCategories();
        setCategories(['All categories', ...fetchedCategories.map((cat) => cat.name)]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { blogs } = await blogService.fetchBlogs({
          page: 1,
          limit: 6,
          category: selectedCategory !== 'All categories' ? selectedCategory : '',
        });
        setPosts(blogs);
        setFilteredPosts(blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchPosts();
  }, [selectedCategory]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filtered = posts.filter((post) => post.title.toLowerCase().includes(value.toLowerCase()));
    setFilteredPosts(filtered);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Container maxWidth="lg" sx={{ padding: '24px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <div>
          <Typography variant="h1" gutterBottom>
            Blog
          </Typography>
          <Typography variant="body1">Stay in the loop with the latest about our products</Typography>
        </div>
        <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
          <OutlinedInput
            id="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search…"
            size="small"
            startAdornment={
              <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                <SearchRoundedIcon fontSize="small" />
              </InputAdornment>
            }
          />
          <IconButton aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            clickable
            color={selectedCategory === category ? 'primary' : 'default'}
            onClick={() => handleCategoryChange(category)}
          />
        ))}
      </Box>

      {filteredPosts.length === 0 && (
        <Typography variant="h6" color="textSecondary" textAlign="center" mt={4}>
          No blogs found for "{selectedCategory}". Showing all blogs.
        </Typography>
      )}

      <Grid container spacing={2}>
        {filteredPosts.map((post) => (
          <Grid item xs={12} md={4} key={post._id}>
            <SyledCard>
              <CardMedia
                component="img"
                height="140"
                image={`${process.env.REACT_APP_API_URL}${post.featuredImage}`}
                alt={post.title}
              />
              <SyledCardContent>
                <Typography variant="caption" gutterBottom>
                  {post.category}
                </Typography>
                <Typography variant="h6" component="div">
                  <Link to={`/blogs/${post.permalink}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {post.title}
                  </Link>
                </Typography>
                <StyledTypography variant="body2" color="text.secondary">
                  {post.description}
                </StyledTypography>
              </SyledCardContent>
              <Author authors={[{ name: post.author, avatar: '/static/images/avatar/1.jpg' }]} />
            </SyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogPostList;
