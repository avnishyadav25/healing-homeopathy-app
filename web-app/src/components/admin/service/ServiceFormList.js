// /src/components/admin/services/ServiceFormList.js
import React, { useEffect, useState } from 'react';
import { fetchServices, deleteService } from '../../../services/serviceService';
import { Box, Tabs, Tab, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button, Select, MenuItem, Typography } from '@mui/material';
import { Edit, Visibility, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ServiceFormList = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [tabValue, setTabValue] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const loadServices = async () => {
      const data = await fetchServices();
      setServices(data);
      setFilteredServices(data);
    };
    loadServices();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setCurrentPage(1); // Reset to the first page on tab change
    if (newValue === 'all') setFilteredServices(services);
    else setFilteredServices(services.filter((service) => service.status === newValue));
  };

  const handleDelete = async (id) => {
    await deleteService(id);
    setServices((prev) => prev.filter((service) => service._id !== id));
    setFilteredServices((prev) => prev.filter((service) => service._id !== id));
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const paginatedServices = filteredServices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleItemsPerPageChange = (event) => setItemsPerPage(event.target.value);

  return (
    <Box p={4}>
      <Box mb={2} display="flex" justifyContent="flex-end" alignItems="center">
      <Button variant="contained" color="primary" onClick={() => navigate('/admin/services/add')}>
                Create New Service
            </Button>
      </Box>
        <Box mb={2} display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant="body1" mr={1}>Items per page:</Typography>
            <Select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            {[10, 20, 50, 100].map((count) => (
                <MenuItem key={count} value={count}>{count}</MenuItem>
            ))}
            </Select>
            
            
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
          <Tab label="All" value="all" />
          <Tab label="Published" value="published" />
          <Tab label="Draft" value="draft" />
          <Tab label="Archived" value="archived" />
        </Tabs>
        
      </Box>

      

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Link</TableCell>
            <TableCell>Short Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedServices.map((service) => (
            <TableRow key={service._id}>
              <TableCell>
                <img src={`${process.env.REACT_APP_API_URL}${service.image}`} alt={service.title} width="50" />
              </TableCell>
              <TableCell>{service.title}</TableCell>
              <TableCell>{service.status}</TableCell>
              <TableCell>{service.link}</TableCell>
              <TableCell>{service.shortDescription}</TableCell>
              <TableCell>
                <IconButton onClick={() => navigate(`/admin/services/view/${service._id}`)}><Visibility /></IconButton>
                <IconButton onClick={() => navigate(`/admin/services/edit/${service._id}`)}><Edit /></IconButton>
                <IconButton color="error" onClick={() => handleDelete(service._id)}><Delete /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
        <Button onClick={handlePrevious} disabled={currentPage === 1}>Previous</Button>
        <Typography>{`Page ${currentPage} of ${totalPages}`}</Typography>
        <Button onClick={handleNext} disabled={currentPage === totalPages}>Next</Button>
      </Box>
    </Box>
  );
};

export default ServiceFormList;
