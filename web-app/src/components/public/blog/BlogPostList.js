// src/components/admin/blog/BlogPostList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Chip,
  Pagination,
  AvatarGroup,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import blogService from '../../../services/blogService';
import categoryService from '../../../services/categoryService';

const BlogPostList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState(['All categories']);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
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
          page: currentPage,
          limit: postsPerPage,
          category: selectedCategory !== 'All categories' ? selectedCategory : '',
        });
        setPosts(blogs);
        setFilteredPosts(blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchPosts();
  }, [currentPage, postsPerPage, selectedCategory]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filtered = posts.filter((post) => post.title.toLowerCase().includes(value.toLowerCase()));
    setFilteredPosts(filtered);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <Container maxWidth="lg" sx={{ padding: '24px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <div>
          <Typography variant="h1" gutterBottom>
             Blog
          </Typography>
          <Typography variant="body1">Stay in the loop with the latest about our products</Typography>
        </div>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <OutlinedInput
            id="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search…"
            size="small"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
          <IconButton aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
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
          No blogs found for "{selectedCategory}". Here are all blogs.
        </Typography>
      )}

      <Grid container spacing={2}>
        {filteredPosts.slice(0, postsPerPage).map((post) => (
          <Grid item xs={12} md={4} key={post._id}>
            <Card sx={{ mb: 3 }}>
              <CardMedia
                component="img"
                height="140"
                image={`${process.env.REACT_APP_API_URL}${post.featuredImage}`}
                alt={post.title}
              />
              <CardContent>
                <Typography variant="caption" gutterBottom>
                  {post.category}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  <Link to={`/blogs/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {post.title}
                  </Link>
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {post.author} - {new Date(post.publishTime).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination count={totalPages} page={currentPage} onChange={(event, value) => setCurrentPage(value)} />
      </Box>
    </Container>
  );
};

export default BlogPostList;
