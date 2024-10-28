// src/components/admin/blog/BlogForm.js
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
} from '@mui/material';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const apiUrl = process.env.REACT_APP_API_URL + '/';

const BlogForm = ({ blogData, onSubmit, onSaveDraft, onImageUpload }) => {
  const [title, setTitle] = useState(blogData?.title || '');
  const [content, setContent] = useState(blogData?.content || '');
  const [tags, setTags] = useState(blogData?.tags.join(', ') || '');
  const [category, setCategory] = useState(blogData?.category || '');
  const [permalink, setPermalink] = useState(blogData?.permalink || '');
  const [author, setAuthor] = useState(blogData?.author || 'Healing Homeopathy');
  const [publishTime, setPublishTime] = useState(blogData?.publishTime || new Date());
  const [featuredImage, setFeaturedImage] = useState(blogData?.featuredImage || null);
  const [status, setStatus] = useState(blogData?.status || 'draft');
  const editor = useRef(null);

  useEffect(() => {
    setPermalink(title.toLowerCase().replace(/\s+/g, '-'));
  }, [title]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFeaturedImage(file);
    onImageUpload(file);
  };

  const handleSubmit = () => {
    onSubmit({
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
      category,
      permalink,
      author,
      publishTime,
      featuredImage,
      status,
    });
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
              config={{ readonly: false }}
              tabIndex={1}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Button variant="contained" component="label" fullWidth>
                Upload Featured Image
                <input type="file" hidden onChange={handleImageChange} />
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
                onChange={(e) => setPermalink(e.target.value)}
                sx={{ mt: 2 }}
              />

              {/* Status Dropdown */}
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
            onClick={() => handleSubmit('published')}
          >
            Publish
          </Button>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => handleSubmit('draft')}
          >
            Save as Draft
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BlogForm;
