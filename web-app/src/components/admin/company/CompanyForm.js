import React, { useState, useRef } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import JoditEditor from 'jodit-react';

const apiUrl = process.env.REACT_APP_API_URL;

const CompanyForm = ({ initialData, onSubmit }) => {
  const editor = useRef(null);
  const [isEditMode, setIsEditMode] = useState(!initialData);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    tagline: initialData?.tagline || '',
    description: initialData?.description || '',
    shortDescription: initialData?.shortDescription || '',
    address: initialData?.address || '',
    logo: initialData?.logo || null,
    images: initialData?.images || [],
    timezone: initialData?.timezone || '',
    language: initialData?.language || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    socialLinks: initialData?.socialLinks || {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    }
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'images' ? Array.from(files) : files[0]
    }));
  };

  const handleEditorChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setIsEditMode(false); // Exit edit mode if save is successful
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Error saving company information. Please try again.');
    }
  };

  return (
    <Box p={4} borderRadius={2} boxShadow={2} bgcolor="background.paper">
      <Typography variant="h4" textAlign="center" gutterBottom>
        Company Profile
      </Typography>
      {error && (
        <Typography color="error" textAlign="center" gutterBottom>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Company Name */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Company Name
            </Typography>
            {isEditMode ? (
              <TextField
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter company name"
              />
            ) : (
              <Typography>{formData.name}</Typography>
            )}
          </Grid>

          {/* Tagline */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Tagline
            </Typography>
            {isEditMode ? (
              <TextField
                fullWidth
                name="tagline"
                value={formData.tagline}
                onChange={handleInputChange}
                placeholder="Enter tagline"
              />
            ) : (
              <Typography>{formData.tagline}</Typography>
            )}
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Description
            </Typography>
            {isEditMode ? (
              <JoditEditor
                ref={editor}
                value={formData.description}
                tabIndex={1}
                onBlur={(newContent) => handleEditorChange('description', newContent)}
              />
            ) : (
              <Typography dangerouslySetInnerHTML={{ __html: formData.description }}></Typography>
            )}
          </Grid>

          {/* Short Description */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Short Description
            </Typography>
            {isEditMode ? (
              <JoditEditor
                ref={editor}
                value={formData.shortDescription}
                tabIndex={1}
                onBlur={(newContent) => handleEditorChange('shortDescription', newContent)}
              />
            ) : (
              <Typography dangerouslySetInnerHTML={{ __html: formData.shortDescription }}></Typography>
            )}
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Address
            </Typography>
            {isEditMode ? (
              <JoditEditor
                ref={editor}
                value={formData.address}
                tabIndex={1}
                onBlur={(newContent) => handleEditorChange('address', newContent)}
              />
            ) : (
              <Typography dangerouslySetInnerHTML={{ __html: formData.address }}></Typography>
            )}
          </Grid>

          {/* Logo */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Logo
            </Typography>
            {isEditMode ? (
              <TextField
                type="file"
                name="logo"
                onChange={handleFileChange}
                inputProps={{ accept: 'image/*' }}
              />
            ) : (
              formData.logo && <img src={`${apiUrl}${formData.logo}`} alt="Company Logo" style={{ height: '64px' }} />
            )}
          </Grid>

          {/* Additional Images */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Additional Images
            </Typography>
            {isEditMode ? (
              <TextField
                type="file"
                name="images"
                onChange={handleFileChange}
                inputProps={{ accept: 'image/*', multiple: true }}
              />
            ) : (
              formData.images.map((image, index) => (
                <img key={index} src={`${apiUrl}${image}`} alt="Company" style={{ height: '64px', marginRight: '8px' }} />
              ))
            )}
          </Grid>

          {/* Other Fields */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight="bold">
              Timezone
            </Typography>
            {isEditMode ? (
              <TextField
                fullWidth
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                placeholder="e.g., UTC+5:30"
              />
            ) : (
              <Typography>{formData.timezone}</Typography>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight="bold">
              Language
            </Typography>
            {isEditMode ? (
              <TextField
                fullWidth
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                placeholder="e.g., English"
              />
            ) : (
              <Typography>{formData.language}</Typography>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight="bold">
              Phone
            </Typography>
            {isEditMode ? (
              <TextField
                fullWidth
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Company phone"
              />
            ) : (
              <Typography>{formData.phone}</Typography>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight="bold">
              Email
            </Typography>
            {isEditMode ? (
              <TextField
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Company email"
              />
            ) : (
              <Typography>{formData.email}</Typography>
            )}
          </Grid>

          {/* Social Links */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Social Links
            </Typography>
            <Grid container spacing={2}>
              {/* Facebook */}
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Facebook
                </Typography>
                <TextField
                  fullWidth
                  name="facebook"
                  value={formData.socialLinks.facebook}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      socialLinks: { ...prevData.socialLinks, facebook: e.target.value },
                    }))
                  }
                  placeholder="Facebook URL"
                  disabled={!isEditMode}
                />
              </Grid>

              {/* Twitter */}
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Twitter
                </Typography>
                <TextField
                  fullWidth
                  name="twitter"
                  value={formData.socialLinks.twitter}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      socialLinks: { ...prevData.socialLinks, twitter: e.target.value },
                    }))
                  }
                  placeholder="Twitter URL"
                  disabled={!isEditMode}
                />
              </Grid>

              {/* LinkedIn */}
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" fontWeight="bold">
                  LinkedIn
                </Typography>
                <TextField
                  fullWidth
                  name="linkedin"
                  value={formData.socialLinks.linkedin}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      socialLinks: { ...prevData.socialLinks, linkedin: e.target.value },
                    }))
                  }
                  placeholder="LinkedIn URL"
                  disabled={!isEditMode}
                />
              </Grid>

              {/* Instagram */}
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Instagram
                </Typography>
                <TextField
                  fullWidth
                  name="instagram"
                  value={formData.socialLinks.instagram}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      socialLinks: { ...prevData.socialLinks, instagram: e.target.value },
                    }))
                  }
                  placeholder="Instagram URL"
                  disabled={!isEditMode}
                />
              </Grid>
            </Grid>
          </Grid>

        </Grid>

        {/* Buttons */}
        {isEditMode && (
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button variant="outlined" onClick={() => setIsEditMode(false)} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
          </Box>
        )}
        {!isEditMode && (
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button variant="contained" color="primary" onClick={() => setIsEditMode(true)}>
              Edit
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
};

export default CompanyForm;
