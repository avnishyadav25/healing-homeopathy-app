// /src/components/admin/blog/BlogForm.js
import React, { useState, useEffect, useRef } from 'react';
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
import JoditEditor from 'jodit-react';
import Datetime from 'react-datetime';
import uploadFile from '../../../services/uploadService'; // Import the upload service
import 'react-datetime/css/react-datetime.css';

const apiUrl = process.env.REACT_APP_API_URL;

const BlogForm = ({ blogData = {}, onSubmit, isEditMode = false }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(blogData?.title || '');
  const [content, setContent] = useState(blogData?.content || '');
  const [tags, setTags] = useState(blogData?.tags ? blogData.tags.join(', ') : '');
  const [category, setCategory] = useState(blogData?.category || '');
  const [permalink, setPermalink] = useState(blogData?.permalink || '');
  const [author, setAuthor] = useState(blogData?.author || 'Healing Homoeopathy');
  const [publishTime, setPublishTime] = useState(blogData?.publishTime || new Date());
  const [featuredImage, setFeaturedImage] = useState(blogData?.featuredImage || null);
  const [status, setStatus] = useState(blogData?.status || 'draft');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const editor = useRef(null);

  // Auto-generate permalink based on title, avoiding special characters
  useEffect(() => {
    const sanitizedPermalink = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    setPermalink(sanitizedPermalink);
  }, [title]);

  // Image upload with validation for title and permalink
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
        const imageName = `${permalink}.${fileExtension}`;//`${permalink}.${fileExtension}`;
        const folderPath = `blog/${permalink}`;
        const imageUrl = await uploadFile(file, folderPath, imageName);
        setFeaturedImage(imageUrl);
        setSnackbar({ open: true, message: 'Image uploaded successfully!', severity: 'success' });
      } catch (error) {
        setSnackbar({ open: true, message: 'Error uploading image. Please try again.', severity: 'error' });
      }
    }
  };

  // Jodit Editor configuration with custom upload logic
  const editorConfig = {
    readonly: false,
    uploader: {
      insertImageAsBase64URI: false,
      url: `${apiUrl}/upload`, // Adjust to your API's upload route if needed
      isSuccess: (resp) => resp.success,
      process: async (files) => {
        const file = files[0];
        if (!title || !permalink) {
          setSnackbar({
            open: true,
            message: 'Please provide a title and permalink before uploading media.',
            severity: 'warning',
          });
          return;
        }

        try {
          const fileExtension = file.type.split('/')[1];
          const fileName = `${permalink}-${Date.now()}.${fileExtension}`;
          const folderPath = `blog/${permalink}`;
          const fileUrl = await uploadFile(file, folderPath, fileName);
          return {
            success: true,
            message: 'File uploaded successfully',
            data: {
              files: [{ url: `${apiUrl}${fileUrl}` }],
            },
          };
        } catch (error) {
          console.error('Error uploading media:', error);
          return {
            success: false,
            message: 'Error uploading file.',
          };
        }
      },
    },
    events: {
      afterUpload(response) {
        if (response.success) {
          const { url } = response.data.files[0];
          editor.current?.selection.insertImage(url, null, 300);
        } else {
          setSnackbar({
            open: true,
            message: response.message || 'Failed to upload media',
            severity: 'error',
          });
        }
      },
    },
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
      tags: tags.split(',').map((tag) => tag.trim()),
      category,
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
          <Box sx={{ border: '1px solid #ddd', mt: 2 }}>
            <JoditEditor
              ref={editor}
              value={content}
              onBlur={(newContent) => setContent(newContent)}
              config={editorConfig}
              tabIndex={1}
            />
          </Box>
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
                  image={
                    typeof featuredImage === 'string'
                      ? `${apiUrl}${featuredImage}`
                      : URL.createObjectURL(featuredImage)
                  }
                  alt="Featured"
                  sx={{ mt: 2 }}
                />
              )}
              <TextField
                fullWidth
                label="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{ mt: 2 }}
              />
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
              <Box sx={{ mt: 2 }}>
                <Datetime value={publishTime} onChange={setPublishTime} />
              </Box>
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
