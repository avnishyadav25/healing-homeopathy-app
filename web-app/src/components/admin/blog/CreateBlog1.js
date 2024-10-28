import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Modal,
} from '@mui/material';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import JoditEditor from 'jodit-react';
import { useLocation } from 'react-router-dom';
import BlogPostDetail from './../../BlogPostDetail'; // Adjust the path if necessary

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [permalink, setPermalink] = useState('');
  const [author, setAuthor] = useState('Healing Homeopathy');
  const [publishTime, setPublishTime] = useState(new Date());
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const editor = useRef(null);
  const location = useLocation();
  const apiUrl = process.env.REACT_APP_API_URL;

  // Generate permalink from title
  useEffect(() => {
    const generatePermalink = title.toLowerCase().replace(/\s+/g, '-');
    setPermalink(generatePermalink);
  }, [title]);

  // Load blog data if editing
  useEffect(() => {
    if (location.state && location.state.blogData) {
      const blog = location.state.blogData;
      setTitle(blog.title);
      setContent(blog.content);
      setTags(blog.tags.join(', '));
      setCategory(blog.category);
      setPermalink(blog.permalink);
      setAuthor(blog.author);
      setPublishTime(new Date(blog.publishTime));
      if (blog.featuredImage) {
        setFeaturedImage(blog.featuredImage);
      }
    }
  }, [location.state]);

  // Auto-save draft every minute
  useEffect(() => {
    const interval = setInterval(() => {
      handleSaveAsDraft();
    }, 60000); // 60000 ms = 1 minute

    return () => clearInterval(interval); // Clear interval on unmount
  }, [title, content, tags, category, permalink, author, publishTime, featuredImage]);

  // Modified handleSubmit to decide between create and update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (location.state && location.state.blogData) {
      await updateBlog(location.state.blogData._id);
    } else {
      await saveBlog('published');
    }
  };
 
  const handleSaveAsDraft = async () => {
    saveBlog('draft');
  };

  const handleScheduleBlog = async () => {
    saveBlog('scheduled');
  };

  const saveBlog = async (status) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', tags);
    formData.append('category', category);
    formData.append('permalink', permalink);
    formData.append('author', author);
    formData.append('publishTime', publishTime);
    formData.append('status', status);
    if (featuredImage && typeof featuredImage !== 'string') {
      formData.append('featuredImage', featuredImage);
    }

    try {
      const response = await axios.post(`${apiUrl}/blogs/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(`Blog ${status} successfully`, response.data);
    } catch (error) {
      console.error(`Error saving blog as ${status}`, error);
    }
  };

  const updateBlog = async (id) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', tags);
    formData.append('category', category);
    formData.append('permalink', permalink);
    formData.append('author', author);
    formData.append('publishTime', publishTime);
    if (featuredImage && typeof featuredImage !== 'string') {
      formData.append('featuredImage', featuredImage);
    }

    try {
      const response = await axios.put(`${apiUrl}/blogs/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Blog updated successfully', response.data);
    } catch (error) {
      console.error('Error updating blog', error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFeaturedImage(file);

    const formData = new FormData();
    formData.append('image', file);

    axios.post(`${apiUrl}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      const url = response.data.url;
      setContent(content + `<img src="${url}" alt="Uploaded Image" />`);
    })
    .catch(error => {
      console.error('Image upload failed:', error);
    });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="center">
            {/* Title and Buttons */}
            <Grid item xs={8}>
              <Typography variant="h4" gutterBottom>
                {location.state && location.state.blogData ? 'Edit Blog' : 'Create New Blog'}
              </Typography>
              <TextField
                fullWidth
                label="Blog Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button variant="outlined" color="primary" onClick={() => setIsPreviewOpen(true)}>
                Preview
              </Button>
              <Button variant="contained" color="primary" type="submit">
                {location.state && location.state.blogData ? 'Update' : 'Publish'}
              </Button>
            </Grid>

            {/* Content Editor */}
            <Grid item xs={12} md={9}>
              <Box sx={{ border: '1px solid #ddd', padding: '16px', borderRadius: '4px', marginBottom: '20px' }}>
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={{
                    readonly: false,
                    uploader: {
                      insertImageAsBase64URI: false,
                    },
                    buttons: ['bold', 'italic', 'underline', 'link', 'unlink', 'source', 'image', 'paragraph'],
                    height: 800,
                  }}
                  tabIndex={1}
                  onBlur={(newContent) => setContent(newContent)}
                  onChange={() => {}}
                />
              </Box>
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} md={3}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    Upload Featured Image
                    <input
                      type="file"
                      hidden
                      onChange={handleImageUpload}
                    />
                  </Button>
                  {featuredImage && typeof featuredImage === 'string' ? (
                    <CardMedia
                      component="img"
                      image={new URL(featuredImage, apiUrl).href}
                      alt="Featured"
                      sx={{ mt: 2, mb: 2 }}
                    />
                  ) : featuredImage ? (
                    <CardMedia
                      component="img"
                      image={URL.createObjectURL(featuredImage)}
                      alt="Featured"
                      sx={{ mt: 2, mb: 2 }}
                    />
                  ) : null}

                  <TextField
                    fullWidth
                    label="Tags (comma separated)"
                    variant="outlined"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    label="Category"
                    variant="outlined"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    label="Permalink"
                    variant="outlined"
                    value={permalink}
                    onChange={(e) => setPermalink(e.target.value)}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    label="Author"
                    variant="outlined"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    sx={{ mb: 2 }}
                  />

                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Publish Time
                  </Typography>
                  <Datetime
                    value={publishTime}
                    onChange={setPublishTime}
                    inputProps={{ className: 'form-control' }}
                  />
                </CardContent>
              </Card>
              <Button variant="contained" color="secondary" onClick={handleSaveAsDraft} fullWidth sx={{ mb: 2 }}>
                Save as Draft
              </Button>
              <Button variant="contained" color="secondary" onClick={handleScheduleBlog} fullWidth>
                Schedule
              </Button>
            </Grid>

            {/* Footer Buttons */}
            <Grid item xs={12}>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" color="primary" onClick={() => setIsPreviewOpen(true)}>
                  Preview
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  {location.state && location.state.blogData ? 'Update' : 'Publish'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Preview Modal */}
      <Modal open={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', maxWidth: '80%', margin: 'auto', mt: 4, maxHeight: '80vh', overflowY: 'auto' }}>
          <BlogPostDetail
            post={{
              title,
              content,
              author,
              publishTime,
              featuredImage: featuredImage,
              tags: tags.split(',').map((tag) => tag.trim()),
              category,
            }}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default CreateBlog;