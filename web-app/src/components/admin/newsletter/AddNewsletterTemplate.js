// /src/components/admin/newsletter/AddNewsletterTemplate.js
import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Grid, Typography, Box } from '@mui/material';
import axios from 'axios';

const AddNewsletterTemplate = () => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const templateData = { subject, content };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/newsletter-templates/add`, templateData);
      alert('Newsletter template added successfully');
    } catch (error) {
      console.error('Error adding newsletter template', error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Add Newsletter Template
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Content"
                variant="outlined"
                multiline
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" color="primary">
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Add Template
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddNewsletterTemplate;
