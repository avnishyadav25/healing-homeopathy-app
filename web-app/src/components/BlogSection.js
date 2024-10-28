// web-app/src/components/BlogSection.js
import React, { useEffect, useState } from 'react';
import blogService from './../services/blogService';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box, Slide, Zoom, Fade } from '@mui/material';

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const latestBlogs = await blogService.fetchLatestBlogs(4);
        setBlogs(latestBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  // Function to extract the first 25 words from content
  const getExcerpt = (content) => {
    return content.split(' ').slice(0, 25).join(' ') + '...';
  };

  return (
    <section className="blog-section" style={{ padding: '40px 0' }}>
      <Container>
        <Fade in timeout={1000}>
          <Typography variant="h4" align="center" gutterBottom>
            Latest from Our Blog
          </Typography>
        </Fade>
        <Grid container spacing={4}>
          {blogs.map((blog, index) => (
            <Grid item xs={12} md={6} key={blog._id}>
              <Slide direction="up" in timeout={1000 + index * 200}>
                <Card sx={{ display: 'flex', height: '100%', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
                  <Zoom in timeout={1000 + index * 200}>
                    <CardMedia
                      component="img"
                      sx={{ width: '40%' }}
                      image={new URL(blog.featuredImage, process.env.REACT_APP_API_URL).href}
                      alt={blog.title}
                    />
                  </Zoom>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
                    <CardContent>
                      <Typography component="h5" variant="h6">
                        {blog.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(blog.publishTime).toLocaleDateString()} by {blog.author}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, mb: 2 }} component="div">
                        <div dangerouslySetInnerHTML={{ __html: getExcerpt(blog.content) }} />
                      </Typography>
                    </CardContent>
                    <Button size="small" color="primary" href={`/blogs/${blog.permalink}`}>
                      Continue Reading
                    </Button>
                  </Box>
                </Card>
              </Slide>
            </Grid>
          ))}
        </Grid>
        
        {/* More Blogs Button */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Fade in timeout={1000}>
            <Button variant="contained" color="primary" href="/blogs">
              More Blogs
            </Button>
          </Fade>
        </Box>
      </Container>
    </section>
  );
};

export default BlogSection;
