// /src/components/admin/newsletter/AddNewsletterUser.js
import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Grid, Typography, Box } from '@mui/material';
import axios from 'axios';

const AddNewsletterUser = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newsletterData = { email };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/newsletter/add`, newsletterData);
      alert('Newsletter user added successfully');
    } catch (error) {
      console.error('Error adding newsletter user', error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Add Newsletter User
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" color="primary">
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Add User
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddNewsletterUser;
