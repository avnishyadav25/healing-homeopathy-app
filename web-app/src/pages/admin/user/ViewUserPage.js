// src/pages/admin/user/ViewUserPage.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../../../services/userService';
import AdminPageTemplate from '../../../components/admin/AdminPageTemplate';
import { Typography, Box, Divider, Button, Avatar, Grid, Modal, TextField } from '@mui/material';

const ViewUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getUserById(id);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    loadUser();
  }, [id]);

  if (!user) return <p>Loading...</p>;

  // Check if education or experience fields contain valid data
  const hasEducationData = user.education && user.education.some(edu => edu.id && edu.type);
  const hasExperienceData = user.experience && user.experience.some(exp => exp.id && exp.type);

  return (
    <AdminPageTemplate title="View User">
      <Box p={3}>
        {/* Row 1 - Profile Photo */}
        <Box textAlign="center" mb={3}>
          <Avatar
            src={`${process.env.REACT_APP_API_URL}${user.profilePhoto}`}
            alt={user.name}
            sx={{ width: 120, height: 120, mb: 2 }}
          />
        </Box>

        <Grid container spacing={2}>
          {/* Row 2 */}
          <Grid item xs={8}>
            <Typography variant="h6"><strong>Name:</strong> {user.name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6"><strong>Gender:</strong> {user.gender}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6"><strong>Date of Birth:</strong> {user.dob}</Typography>
          </Grid>

          {/* Row 3 */}
          {user.tagline && (
            <Grid item xs={12}>
              <Typography variant="h6"><strong>Tagline:</strong> {user.tagline}</Typography>
            </Grid>
          )}

          {/* Row 4 */}
          <Grid item xs={6}>
            <Typography variant="h6"><strong>Username:</strong> {user.username}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6"><strong>Role:</strong> {user.role}</Typography>
          </Grid>

          {/* Row 5 */}
          <Grid item xs={8}>
            <Typography variant="h6"><strong>Email:</strong> {user.email}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Button variant="outlined" color="primary" onClick={() => setPasswordModalOpen(true)}>Change Password</Button>
          </Grid>

          {/* Row 6 */}
          {user.about && (
            <Grid item xs={12}>
              <Typography variant="h6"><strong>About:</strong></Typography>
              <Typography variant="body1">
              <div dangerouslySetInnerHTML={{ __html: user.about }} />
              </Typography>
            </Grid>
          )}

          {/* Row 7 - Status */}
          <Grid item xs={4}>
            <Typography variant="h6"><strong>Status:</strong> {user.status}</Typography>
          </Grid>

          {/* Row 8 - License Number (Only for Doctor) */}
          {user.role === 'Doctor' && user.licenseNumber && (
            <Grid item xs={12}>
              <Typography variant="h6"><strong>License Number:</strong> {user.licenseNumber}</Typography>
            </Grid>
          )}

          {/* Row 9 - Social Links */}
          <Grid item xs={12}>
            <Typography variant="h6"><strong>Social Links:</strong></Typography>
            <Box ml={2}>
              {user.socialLinks.facebook && <Typography variant="body2">Facebook: {user.socialLinks.facebook}</Typography>}
              {user.socialLinks.instagram && <Typography variant="body2">Instagram: {user.socialLinks.instagram}</Typography>}
              {user.socialLinks.twitter && <Typography variant="body2">Twitter: {user.socialLinks.twitter}</Typography>}
              {user.socialLinks.linkedin && <Typography variant="body2">LinkedIn: {user.socialLinks.linkedin}</Typography>}
            </Box>
          </Grid>

          {/* Row 10 - Education */}
          {hasEducationData && (
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Education</Typography>
              {user.education.map((edu, index) => (
                edu.id && edu.type && (
                  <Box key={index} mb={2}>
                    <Typography variant="body1"><strong>{edu.type}</strong></Typography>
                    <Typography variant="body2">Major: {edu.detail.major}</Typography>
                    <Typography variant="body2">Degree: {edu.detail.degree}</Typography>
                    <Typography variant="body2">Grade: {edu.detail.grade}</Typography>
                    <Typography variant="body2">Start Date: {edu.detail.startdate}</Typography>
                    <Typography variant="body2">End Date: {edu.detail.enddate}</Typography>
                    {edu.detail.remarks && <Typography variant="body2">Remarks: {edu.detail.remarks}</Typography>}
                  </Box>
                )
              ))}
            </Grid>
          )}

          {/* Row 11 - Experience */}
          {hasExperienceData && (
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Experience</Typography>
              {user.experience.map((exp, index) => (
                exp.id && exp.type && (
                  <Box key={index} mb={2}>
                    <Typography variant="body1"><strong>{exp.type}</strong></Typography>
                    <Typography variant="body2">Position: {exp.detail.position}</Typography>
                    <Typography variant="body2">Company: {exp.detail.company}</Typography>
                    <Typography variant="body2">Date of Join: {exp.detail.dateofjoin}</Typography>
                    <Typography variant="body2">Date of Retire: {exp.detail.dateofretire}</Typography>
                    <Typography variant="body2">Location: {exp.detail.location}</Typography>
                    <Typography variant="body2">Description: {exp.detail.description}</Typography>
                    {exp.detail.responsibilities && exp.detail.responsibilities.length > 0 && (
                      <>
                        <Typography variant="body2">Responsibilities:</Typography>
                        {exp.detail.responsibilities.map((resp, i) => (
                          <Typography key={i} variant="body2" sx={{ ml: 2 }}>- {resp}</Typography>
                        ))}
                      </>
                    )}
                  </Box>
                )
              ))}
            </Grid>
          )}
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Buttons */}
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" color="secondary" onClick={() => navigate('/admin/users')}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={() => navigate(`/admin/users/edit/${id}`)}>Edit</Button>
        </Box>

        {/* Change Password Modal */}
        <Modal open={passwordModalOpen} onClose={() => setPasswordModalOpen(false)}>
          <Box p={3} sx={{ backgroundColor: 'white', margin: 'auto', mt: '10%', width: 300 }}>
            <Typography variant="h6" gutterBottom>Change Password</Typography>
            <TextField fullWidth label="New Password" type="password" sx={{ mb: 2 }} />
            <Button variant="contained" color="primary" fullWidth onClick={() => setPasswordModalOpen(false)}>
              Save Password
            </Button>
          </Box>
        </Modal>
      </Box>
    </AdminPageTemplate>
  );
};

export default ViewUserPage;
