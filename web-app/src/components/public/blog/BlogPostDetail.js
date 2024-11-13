// web-app/src/components/BlogPostDetail.js
import React from 'react';
import { Box, Typography, Paper, Grid, Container } from '@mui/material';
import SectionDivider from '../common/SectionDivider';
import Categories from '../../common/Categories';
import Tags from '../../common/Tags';
import RecentPosts from '../../common/RecentPosts';
import PopularPosts from '../../common/PopularPosts';
import Ads from '../../common/Ads';
import Comments from '../../common/Comments';
import AuthProvider from '../../../contexts/AuthContext';


const apiUrl = process.env.REACT_APP_API_URL; // Use API URL from environment variables

const BlogPostDetail = ({ post }) => {
  return (
    <Container
      maxWidth={false} // This ensures full width of the page
      disableGutters // Disable default padding
    >
      {/* Featured Image as Cover Section */}
      {post.featuredImage && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '70vh', // Height can be adjusted as needed
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            textAlign: 'center',
            backgroundImage: `url(${new URL(post.featuredImage, apiUrl).href})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mb: 4, // Margin bottom for spacing below the image
          }}
        >
          {/* Overlay to darken the background image */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darken the image with an overlay
              zIndex: 1,
            }}
          />

          <Container sx={{ position: 'relative', zIndex: 2 }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: '3rem',
                fontWeight: 'bold',
                mb: 2,
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)', // Add text shadow for better readability
              }}
            >
              {post.title}
            </Typography>
            <Typography
              variant="h5"
              component="p"
              sx={{
                mb: 4,
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)', // Add text shadow for better readability
              }}
            >
              By {post.author} | {new Date(post.publishTime).toLocaleDateString()}
            </Typography>
          </Container>
        </Box>
      )}

      <Container
        sx={{
          maxWidth: { xs: '100%', md: '960px', lg: '1200px' }, // Responsive max-width
          mx: 'auto', // Centering the container horizontally
          px: { xs: 2, sm: 3, lg: '24px' }, // Responsive padding
        }}
      >
        <Paper sx={{ p: 3, mt: 2 }}>
          {/* Title and Meta Info Below Image */}
          <Typography variant="h4" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            <em>By {post.author} | {new Date(post.publishTime).toLocaleDateString()}</em>
          </Typography>

          {/* Section Divider */}
          <SectionDivider />

          {/* Main Content and Sidebar */}
          <Grid container spacing={2}>
            {/* Main Content (2/3) */}
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" component="div">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </Typography>
              </Box>
            </Grid>

            {/* Sidebar (1/3) */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 2 }}>
                <Tags tags={post.tags} />
                <SectionDivider />
                <Categories category={post.category} />
                <SectionDivider />
                <Ads />
                <SectionDivider />
                <RecentPosts />
                <SectionDivider />
                <PopularPosts />
              </Box>
            </Grid>
          </Grid>

          {/* Section Divider */}
          <SectionDivider />
          <AuthProvider>

          {/* Comments Section */}
          <Comments postId={post._id} />
          </AuthProvider>
        </Paper>
      </Container>
    </Container>
  );
};

export default BlogPostDetail;