// src/components/admin/blog/LatestBlog.js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import blogService from '../../../services/blogService';
import { Link } from 'react-router-dom'; // Import Link from react-router


const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const TitleTypography = styled(Typography)(({ theme }) => ({
  position: 'relative',
  textDecoration: 'none',
  '&:hover': { cursor: 'pointer' },
  '& .arrow': {
    visibility: 'hidden',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&:hover .arrow': {
    visibility: 'visible',
    opacity: 0.7,
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '3px',
    borderRadius: '8px',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: '1px',
    bottom: 0,
    left: 0,
    backgroundColor: (theme.vars || theme).palette.text.primary,
    opacity: 0.3,
    transition: 'width 0.3s ease, opacity 0.3s ease',
  },
  '&:hover::before': {
    width: '100%',
  },
}));

function Author({ authors, date }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar key={index} alt={author.name} src={author.avatar} sx={{ width: 24, height: 24 }} />
          ))}
        </AvatarGroup>
        <Typography variant="caption" sx={{ ml: 1 }}>
          {authors.map((author) => author.name).join(', ')}
        </Typography>
      </Box>
      <Typography variant="caption">{date}</Typography>
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
  date: PropTypes.string.isRequired,
};

export default function LatestBlog() {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const { blogs } = await blogService.fetchBlogs({ page: currentPage, limit: postsPerPage, status: 'published' });
        setLatestBlogs(blogs);
      } catch (error) {
        console.error('Error fetching latest blogs:', error);
      }
    };

    fetchLatestBlogs();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ padding: '24px' }}>
      <Typography variant="h2" gutterBottom>
        Latest Blogs
      </Typography>
      <Grid container spacing={4} sx={{ my: 4 }}>
        {latestBlogs.map((blog, index) => (
          <Grid key={index} item xs={12} md={6}>
            <Link to={`/blogs/${blog.permalink}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
              }}
            >
              {/* Image Section - 1/4 */}
              
              <Box
                component="img"
                src={`${process.env.REACT_APP_API_URL}${blog.featuredImage}`}
                alt={blog.title}
                sx={{
                  width: '25%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 1,
                }}
              />
              {/* Content Section - 3/4 */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="textSecondary" gutterBottom>
                  {blog.category || 'General'}
                </Typography>
                <TitleTypography variant="h6" gutterBottom>
                  {blog.title}
                  <NavigateNextRoundedIcon className="arrow" sx={{ fontSize: '1rem' }} />
                </TitleTypography>
                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                  {blog.description}
                </StyledTypography>
                <Author
                  authors={blog.authors || [{ name: blog.author, avatar: '/static/images/avatar/1.jpg' }]}
                  date={new Date(blog.publishTime).toLocaleDateString()}
                />
              </Box>
             
            </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={10} // Adjust this to the actual number of pages
          page={currentPage}
          onChange={handlePageChange}
          boundaryCount={2}
        />
      </Box>
    </Container>
  );
}
