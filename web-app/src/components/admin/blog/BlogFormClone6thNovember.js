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
  Snackbar,
  Alert,
  Autocomplete,
  IconButton,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import Datetime from 'react-datetime';
import uploadFile from '../../../services/uploadService';
import 'react-datetime/css/react-datetime.css';
import {fetchCategories, createCategory, createOrUpdateCategories} from '../../../services/categoryService';
import {fetchTags, createTag, createOrUpdateTags} from '../../../services/tagService';

const apiUrl = process.env.REACT_APP_API_URL;

const BlogForm = ({ blogData = {}, onSubmit, isEditMode = false }) => {
  const navigate = useNavigate();
  
  const [inputValue, setInputValue] = useState(''); // New state for input text 
  const [inputValueTag, setInputValueTag] = useState(''); // New state for input text 
  const [inputValueCategory, setInputValueCategory] = useState(''); // New state for input text 
  const [allCategories, setAllCategories] = useState([]); // All available categories
  const [categories, setCategories] = useState([]); // Selected categories

  const [tags, setTags] = useState(blogData?.tags || []);
  const [allTags, setAllTags] = useState([]);

  const [title, setTitle] = useState(blogData?.title || '');
  const [content, setContent] = useState(blogData?.content || '');
  
  const [permalink, setPermalink] = useState(blogData?.permalink || '');
  const [author, setAuthor] = useState(blogData?.author || 'Healing Homoeopathy');
  const [publishTime, setPublishTime] = useState(blogData?.publishTime || new Date());
  const [featuredImage, setFeaturedImage] = useState(blogData?.featuredImage || null);
  const [status, setStatus] = useState(blogData?.status || 'draft');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const editor = useRef(null);

  useEffect(() => {
    // Auto-generate permalink based on title
    const sanitizedPermalink = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    setPermalink(sanitizedPermalink);
  }, [title]);

  // Fetch tags and categories on component mount
  useEffect(() => {
    const fetchTagsAndCategories = async () => {
      try {
        const fetchedTags = await fetchTags();
        const fetchedCategories = await fetchCategories();
        
        // Ensure fetched data is an array, or set to empty array as a fallback
        setAllTags(Array.isArray(fetchedTags) ? fetchedTags : []);
        setAllCategories(Array.isArray(fetchedCategories) ? fetchedCategories : []);
        
        // Log the fetched data to verify structure
        console.log('Fetched Tags:', fetchedTags);
        console.log('Fetched Categories:', fetchedCategories);
      } catch (error) {
        console.error('Error fetching tags/categories:', error);
        setAllTags([]); // Set empty array on error to avoid issues
        setAllCategories([]);
      }
    };
    fetchTagsAndCategories();
  }, []);
  
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

  // Jodit Editor configuration
  const editorConfig = {
    readonly: false,
    uploader: {
      insertImageAsBase64URI: false,
      url: `${apiUrl}/upload`,
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
     console.log('#### tags1', tags);
     console.log('#### categories1', categories);
    // Ensure all tags are created or updated before submission
       handleCreateOrUpdateTags(tags);
       handleCreateOrUpdateCategories(categories);

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

  // Add input value as a tag if it's not empty
  const addInputValueAsTag = () => {
    if (inputValueTag.trim()) {
      const newTags = inputValueTag.split(',').map(tag => tag.trim()).filter(tag => tag); // Split and filter empty values
      handleCreateOrUpdateTags(newTags); // Send tags to create/update function
      setTags((prevTags) => [...prevTags, ...newTags]); // Add new tags to current tags list
      setInputValueTag(''); // Clear input field
    }
  };
  

   // Function to add current input value as a new category
   const addInputValueAsCategory = () => {
    console.log
    if (inputValueCategory.trim()) {
      const newCategories = inputValueCategory
        .split(',')
        .map((category) => category.trim())
        .filter((category) => category); // Split, trim, and remove empty entries
      handleCreateOrUpdateCategories(newCategories); // Send to API function
      setCategories((prevCategories) => [...prevCategories, ...newCategories]); // Update selected categories
      setInputValueCategory(''); // Clear input
    }
  };


  const handleCreateCategory = async (newCategory) => {
    // Call the category service to create a new category
    const createdCategory = await createCategory({ name: newCategory });
    setAllCategories((prev) => [...prev, createdCategory]);
  };

  const handleCreateTag = async (newTag) => {
    // Call the tag service to create a new tag
    const createdTag = await createTag({ name: newTag });
    setAllTags((prev) => [...prev, createdTag]);
  };

  const handleCreateOrUpdateTags = async (inputTags) => {
    try {
      const updatedTags = await createOrUpdateTags(inputTags);
      setAllTags((prevTags) => [...prevTags, ...updatedTags]); // Add any new tags to allTags
    } catch (error) {
      console.error('Error creating or updating tags:', error);
    }
  };

  // Function to create or update categories in bulk
  const handleCreateOrUpdateCategories = async (inputCategories) => {
    // Implement API call to create or update categories
    try {
      const updatedCategories = await createOrUpdateCategories(inputCategories);
      setAllCategories((prevCategories) => [...prevCategories, ...updatedCategories]); // Add any new categories to allCategories
    } catch (error) {
      console.error('Error creating or updating categories:', error);
    }
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
                  image={typeof featuredImage === 'string' ? `${apiUrl}${featuredImage}` : URL.createObjectURL(featuredImage)}
                  alt="Featured"
                  sx={{ mt: 2 }}
                />
              )}
              <br />
              <Autocomplete
      multiple
      freeSolo
      options={allTags || []}
      getOptionLabel={(option) => option?.name || ""}
      value={tags.map((tag) => allTags.find((item) => item._id === tag) || { _id: tag, name: tag })}
      onChange={(e, newTags) => setTags(newTags.map((tag) => tag._id || tag))}
      inputValue={inputValueTag} // Use controlled input value
      onInputChange={(e, newInputValue) => setInputValueTag(newInputValue)} // Update input value on typing
      renderInput={(params) => (
        <TextField
          {...params}
          label="Tags"
          placeholder="Select or add tags"
          helperText="Enter tags separated by commas"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault(); // Prevent the default behavior
              addInputValueAsTag(); // Add the current input as a tag
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {params.InputProps.endAdornment}
                <IconButton
                  size="small"
                  onClick={addInputValueAsTag} // Call the function to add the tag on button click
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </>
            ),
          }}
        />
      )}
    />
    <br />

<Autocomplete
      multiple
      freeSolo
      options={allCategories || []}
      getOptionLabel={(option) => option?.name || ""}
      value={categories.map((category) => allCategories.find((item) => item._id === category) || { _id: category, name: category })}
      onChange={(e, newCategories) => setCategories(newCategories.map((category) => category._id || category))}
      inputValue={inputValueCategory} // Use controlled input value
      onInputChange={(e, newInputValue) => setInputValueCategory(newInputValue)} // Update input value on typing
      renderInput={(params) => (
        <TextField
          {...params}
          label="Category"
          placeholder="Select or add categories"
          helperText="Enter Categories separated by commas"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault(); // Prevent the default behavior
              addInputValueAsCategory(); // Add the current input as a category
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {params.InputProps.endAdornment}
                <IconButton
                  size="small"
                  onClick={addInputValueAsCategory} // Call the function to add the category on button click
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </>
            ),
          }}
        />
      )}
    />




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
