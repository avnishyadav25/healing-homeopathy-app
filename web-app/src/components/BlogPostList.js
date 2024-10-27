import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

const apiUrl = process.env.REACT_APP_API_URL;

const BlogPostList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState('All categories');

  const categories = ['All categories', 'Company', 'Product', 'Design', 'Engineering'];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/blogs/all`);

        // Ensure response data is an array before setting state
        if (Array.isArray(response.data)) {
          setPosts(response.data);
          setFilteredPosts(response.data);
        } else {
          console.error('Error: Response data is not an array');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchPosts();
  }, []);

  // Filter posts by category
  useEffect(() => {
    if (selectedCategory === 'All categories') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => post.category === selectedCategory);
      setFilteredPosts(filtered);
    }
  }, [selectedCategory, posts]);

  // Handle search functionality
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered = posts.filter(post => post.title.toLowerCase().includes(value.toLowerCase()));
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Array.isArray(filteredPosts) ? filteredPosts.slice(indexOfFirstPost, indexOfLastPost) : [];
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

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              clickable
              color={selectedCategory === category ? 'primary' : 'default'}
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </Box>
      </Box>

      {/* Display first row with 2 blog cards */}
      <Grid container spacing={2}>
        {currentPosts.slice(0, 2).map(post => (
          <Grid item xs={12} md={6} key={post._id}>
            <Card sx={{ mb: 3 }}>
              <CardMedia
                component="img"
                height="140"
                image={new URL(post.featuredImage, apiUrl).href}
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
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <AvatarGroup max={2}>
                    <Avatar alt={post.author} src="/static/images/avatar/1.jpg" />
                    {/* Add more avatars as needed */}
                  </AvatarGroup>
                  <Typography variant="caption" sx={{ ml: 1 }}>
                    {post.author}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Display second row with 3 blog cards */}
      <Grid container spacing={2}>
        {currentPosts.slice(2, 5).map(post => (
          <Grid item xs={12} md={4} key={post._id}>
            <Card sx={{ mb: 3 }}>
              <CardMedia
                component="img"
                height="140"
                image={new URL(post.featuredImage, apiUrl).href}
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
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <AvatarGroup max={2}>
                    <Avatar alt={post.author} src="/static/images/avatar/1.jpg" />
                    {/* Add more avatars as needed */}
                  </AvatarGroup>
                  <Typography variant="caption" sx={{ ml: 1 }}>
                    {post.author}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Latest Blog Section */}
      <Typography variant="h2" gutterBottom sx={{ mt: 5 }}>
        Latest Blog
      </Typography>
      <Grid container spacing={2}>
        {filteredPosts.slice(5, 8).map(post => (
          <Grid item xs={12} md={4} key={post._id}>
            <Card sx={{ mb: 3 }}>
              <CardMedia
                component="img"
                height="140"
                image={new URL(post.featuredImage, apiUrl).href}
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
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <AvatarGroup max={2}>
                    <Avatar alt={post.author} src="/static/images/avatar/1.jpg" />
                    {/* Add more avatars as needed */}
                  </AvatarGroup>
                  <Typography variant="caption" sx={{ ml: 1 }}>
                    {post.author}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
        />
      </Box>
    </Container>
  );
};

export default BlogPostList;