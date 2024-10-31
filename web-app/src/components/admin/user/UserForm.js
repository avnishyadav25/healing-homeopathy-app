// /src/components/admin/users/UserForm.js
import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Select, MenuItem, Typography, IconButton, Avatar, Snackbar, Alert, Modal } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import JoditEditor from 'jodit-react';
import uploadFile from '../../../services/uploadService';
import { useNavigate } from 'react-router-dom';

const UserForm = ({ initialData = {}, onSubmit, isEditMode = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    username: initialData.username || '',
    email: initialData.email || '',
    password: '',
    role: initialData.role || '',
    profilePhoto: initialData.profilePhoto || '',
    address: initialData.address || { street: '', city: '', state: '', zip: '', country: '' },
    socialLinks: initialData.socialLinks || { facebook: '', twitter: '', linkedin: '', instagram: '' },
    about: initialData.about || '',
    status: initialData.status || 'Pending', // New field for status
    gender: initialData.gender || '',
    age: initialData.age || 0,
    dob: initialData.dob || '',
    tagline: initialData.tagline || '',
    licenseNumber: initialData.licenseNumber || '',
    education: initialData.education || [{ type: '', detail: {} }],
    experience: initialData.experience || [{ type: '', detail: {} }],
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploadedPath = await uploadFile(file, `user/${formData.name.toLowerCase().replace(/ /g, '-')}`);
      setFormData((prev) => ({ ...prev, profilePhoto: uploadedPath }));
      setSnackbar({ open: true, message: 'Profile photo uploaded successfully!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error uploading photo. Please try again.', severity: 'error' });
    }
  };

  const handleDetailChange = (index, field, value, section) => {
    const updatedSection = [...formData[section]];
    updatedSection[index].detail[field] = value;
    setFormData((prev) => ({ ...prev, [section]: updatedSection }));
  };

  const addNewRow = (section) => {
    setFormData((prev) => ({ ...prev, [section]: [...prev[section], { type: '', detail: {} }] }));
  };

  const removeRow = (index, section) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [section]: updatedSection }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} p={3}>
      <Typography variant="h4" gutterBottom>{isEditMode ? 'Edit User' : 'Add New User'}</Typography>
      <Grid container spacing={3}>
        {/* Profile Photo in center */}
        <Grid item xs={12} display="flex" justifyContent="center">
          <Box textAlign="center">
            <Avatar src={formData.profilePhoto} alt="Profile" sx={{ width: 120, height: 120 }} />
            <Button variant="contained" component="label" sx={{ mt: 2 }}>
              Upload Photo
              <input type="file" hidden onChange={handleProfileUpload} />
            </Button>
          </Box>
        </Grid>

        {/* Row 2 */}
        <Grid item xs={8}>
          <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} required />
        </Grid>
        <Grid item xs={4}>
          <Select fullWidth name="gender" value={formData.gender} onChange={handleChange}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </Grid>

        {/* Row 3 */}
        <Grid item xs={8}>
          <TextField fullWidth label="Tagline" name="tagline" value={formData.tagline} onChange={handleChange} />
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth label="Date of Birth" name="dob" type="date" InputLabelProps={{ shrink: true }} value={formData.dob} onChange={handleChange} />
        </Grid>

        {/* Row 4 */}
        <Grid item xs={8}>
          <TextField fullWidth label="Username" name="username" value={formData.username} onChange={handleChange} />
        </Grid>
        <Grid item xs={4}>
          <Select fullWidth name="role" value={formData.role} onChange={handleChange}>
            <MenuItem value="Doctor">Doctor</MenuItem>
            <MenuItem value="Patient">Patient</MenuItem>
            <MenuItem value="Customer">Customer</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Super Admin">Super Admin</MenuItem>
          </Select>
        </Grid>

        {/* Row 5 */}
        <Grid item xs={8}>
          <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} required />
        </Grid>
        <Grid item xs={4} display="flex" alignItems="center">
          <Button variant="outlined" color="primary" onClick={() => setPasswordModalOpen(true)}>
            Change Password
          </Button>
        </Grid>

        {/* Row 6 */}
        <Grid item xs={12}>
          <Typography>About</Typography>
          <JoditEditor value={formData.about} onBlur={(newContent) => setFormData((prev) => ({ ...prev, about: newContent }))} />
        </Grid>

        {/* Row 7 - Status */}
        <Grid item xs={4}>
          <Select fullWidth name="status" value={formData.status} onChange={handleChange}>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </Grid>

        {/* Row 8 */}
        {formData.role === 'Doctor' && (
          <Grid item xs={12}>
            <TextField fullWidth label="License Number" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} />
          </Grid>
        )}

        {/* Row 9 - Address Section */}
        <Grid item xs={12}>
          <Typography variant="h6">Address</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth label="Street" name="street" value={formData.address.street} onChange={(e) => setFormData((prev) => ({ ...prev, address: { ...prev.address, street: e.target.value } }))} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="City" name="city" value={formData.address.city} onChange={(e) => setFormData((prev) => ({ ...prev, address: { ...prev.address, city: e.target.value } }))} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="State" name="state" value={formData.address.state} onChange={(e) => setFormData((prev) => ({ ...prev, address: { ...prev.address, state: e.target.value } }))} />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth label="Zip Code" name="zip" value={formData.address.zip} onChange={(e) => setFormData((prev) => ({ ...prev, address: { ...prev.address, zip: e.target.value } }))} />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth label="Country" name="country" value={formData.address.country} onChange={(e) => setFormData((prev) => ({ ...prev, address: { ...prev.address, country: e.target.value } }))} />
            </Grid>
          </Grid>
        </Grid>

        {/* Row 10 - Social Links */}
        <Grid item xs={12}>
          <Typography>Social Links</Typography>
          {['facebook', 'twitter', 'linkedin', 'instagram'].map((platform) => (
            <TextField
              key={platform}
              fullWidth
              label={platform.charAt(0).toUpperCase() + platform.slice(1)}
              name={platform}
              value={formData.socialLinks[platform]}
              onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, [platform]: e.target.value } })}
              sx={{ mb: 2 }}
            />
          ))}
        </Grid>

        {/* Row 11 - Education */}
        <Grid item xs={12}>
          <Typography variant="h6">Education</Typography>
          <Grid container spacing={2}>
            {formData.education.map((edu, index) => (
              <Grid item xs={12} key={index} display="flex" alignItems="center">
                <TextField fullWidth label="Education Type" value={edu.type} onChange={(e) => handleDetailChange(index, 'type', e.target.value, 'education')} />
                <IconButton color="secondary" onClick={() => removeRow(index, 'education')}>
                  <Delete />
                </IconButton>
              </Grid>
            ))}
          </Grid>
          <Button variant="outlined" onClick={() => addNewRow('education')} startIcon={<Add />} sx={{ mt: 2 }}>
            Add New Row
          </Button>
        </Grid>

        {/* Row 12 - Experience */}
        <Grid item xs={12}>
          <Typography variant="h6">Experience</Typography>
          <Grid container spacing={2}>
            {formData.experience.map((exp, index) => (
              <Grid item xs={12} key={index} display="flex" alignItems="center">
                <TextField fullWidth label="Experience Type" value={exp.type} onChange={(e) => handleDetailChange(index, 'type', e.target.value, 'experience')} />
                <IconButton color="secondary" onClick={() => removeRow(index, 'experience')}>
                  <Delete />
                </IconButton>
              </Grid>
            ))}
          </Grid>
          <Button variant="outlined" onClick={() => addNewRow('experience')} startIcon={<Add />} sx={{ mt: 2 }}>
            Add New Row
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2} mt={3}>
        <Button type="submit" variant="contained" color="primary">{isEditMode ? 'Update User' : 'Save User'}</Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate(`/admin/users`)}>Cancel</Button>
      </Grid>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Change Password Modal */}
      <Modal open={passwordModalOpen} onClose={() => setPasswordModalOpen(false)}>
        <Box p={3} sx={{ backgroundColor: 'white', margin: 'auto', mt: '10%', width: 300 }}>
          <Typography variant="h6" gutterBottom>Change Password</Typography>
          <TextField fullWidth label="New Password" type="password" sx={{ mb: 2 }} />
          <Button variant="contained" color="primary" fullWidth onClick={() => setSnackbar({ open: true, message: 'Password changed successfully!', severity: 'success' })}>
            Save Password
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default UserForm;
