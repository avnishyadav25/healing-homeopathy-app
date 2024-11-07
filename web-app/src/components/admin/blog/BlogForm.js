// src/components/admin/blog/BlogForm.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Datetime from 'react-datetime';
import uploadFile from '../../../services/uploadService';
import TagSelector from '../../shared/TagSelector';
import CategorySelector from '../../shared/CategorySelector';
import RichTextEditor from '../../shared/RichTextEditor';
import 'react-datetime/css/react-datetime.css';

const apiUrl = process.env.REACT_APP_API_URL;

const BlogForm = ({ blogData = {}, onSubmit, isEditMode = false }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(blogData?.title || '');
  const [content, setContent] = useState(blogData?.content || '');
  const [tags, setTags] = useState(blogData?.tags || []);
  const [categories, setCategories] = useState(blogData?.category || []);
  const [permalink, setPermalink] = useState(blogData?.permalink || '');
  const [author, setAuthor] = useState(blogData?.author || 'Healing Homoeopathy');
  const [publishTime, setPublishTime] = useState(blogData?.publishTime || new Date());
  const [featuredImage, setFeaturedImage] = useState(blogData?.featuredImage || null);
  const [status, setStatus] = useState(blogData?.status || 'draft');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const sanitizedPermalink = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    setPermalink(sanitizedPermalink);
  }, [title]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!title || !permalink) {
      setSnackbar({
        open: true,
        message: 'Please provide a title and permalink before uploading an image.',
        severity: 'warning',
      });
      return;
    }

    if (file) {
      try {
        const fileExtension = file.type.split('/')[1];
        const imageName = `${permalink}.${fileExtension}`;
        const folderPath = `blog/${permalink}`;
        const imageUrl = await uploadFile(file, folderPath, imageName);
        setFeaturedImage(imageUrl);
        setSnackbar({ open: true, message: 'Image uploaded successfully!', severity: 'success' });
      } catch (error) {
        setSnackbar({ open: true, message: 'Error uploading image. Please try again.', severity: 'error' });
      }
    }
  };

  const handleSubmit = () => {
    if (!title || !permalink) {
      setSnackbar({
        open: true,
        message: 'Blog Title and Permalink are required.',
        severity: 'error',
      });
      return;
    }

    const blogData = {
      title,
      content,
      tags,
      category: categories,
      permalink,
      author,
      publishTime,
      featuredImage,
      status,
    };

    onSubmit(blogData);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            label="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br />   <br />
          <RichTextEditor content={content} setContent={setContent} title={title} permalink={permalink} />
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Button variant="contained" component="label" fullWidth>
                Upload Featured Image
                <input type="file" hidden onChange={handleImageUpload} />
              </Button>
              {featuredImage && (
                <CardMedia
                  component="img"
                  image={typeof featuredImage === 'string' ? `${apiUrl}${featuredImage}` : URL.createObjectURL(featuredImage)}
                  alt="Featured"
                  sx={{ mt: 2 }}
                />
              )}
              <br />
              
              <Box sx={{ mt: 2 }}>
                <Datetime value={publishTime} onChange={setPublishTime} />
              </Box>
              <br />
              <TagSelector tags={tags} setTags={setTags} />
              <br />
              <CategorySelector categories={categories} setCategories={setCategories} />
              <br />

              <TextField
                fullWidth
                label="Permalink"
                value={permalink}
                onChange={(e) => setPermalink(e.target.value.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'))}
                sx={{ mt: 2 }}
                required
              />

              <TextField
                select
                fullWidth
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                sx={{ mt: 2 }}
              >
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="scheduled">Scheduled</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                sx={{ mt: 2 }}
              />
              
            </CardContent>
          </Card>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            {isEditMode ? 'Update Blog' : 'Publish Blog'}
          </Button>
        </Grid>
      </Grid>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default BlogForm;
