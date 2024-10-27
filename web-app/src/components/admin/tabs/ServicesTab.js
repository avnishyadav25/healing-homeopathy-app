// /src/components/admin/tabs/ServicesTab.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const ServicesTab = () => {
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${apiUrl}/services`)
      .then(response => setServices(response.data))
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  const handleRowClick = (id) => {
    navigate(`/admin/services/${id}`); // Navigate to the detail page
  };

  const handleEditClick = (id) => {
    navigate(`/admin/services/edit/${id}`); // Navigate to the edit page
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>Services</Typography>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Patients</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((service) => (
              <TableRow key={service._id} hover onClick={() => handleRowClick(service._id)}>
                <TableCell component="th" scope="row">
                  <Button onClick={() => handleRowClick(service._id)}>{service.title}</Button>
                </TableCell>
                <TableCell>{service.link}</TableCell>
                <TableCell>{service.patients}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={(event) => {
                    event.stopPropagation(); // Prevent triggering row click
                    handleEditClick(service._id);
                  }}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={services.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default ServicesTab;